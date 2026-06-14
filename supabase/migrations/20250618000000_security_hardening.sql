-- ============================================================================
-- SECURITY HARDENING MIGRATION
-- ----------------------------------------------------------------------------
-- Consolidates and corrects authorization + privacy controls for production.
-- Safe to run once, AFTER all prior migrations. Each statement is guarded so
-- re-running is harmless.
--
-- Fixes:
--   1. oauth_states had NO row-level security -> anyone holding the public anon
--      key could read stored OAuth client secrets. Locked to service_role only.
--   2. user_roles RLS policies referenced user_roles inside their own USING
--      clause -> Postgres "infinite recursion detected in policy" at runtime.
--      Replaced with SECURITY DEFINER helper functions.
--   3. assign_user_role() was called by the app but never existed. Added, with
--      authorization derived from auth.uid() (never from a client-supplied id).
--   4. profiles were world-readable, exposing precise GPS coordinates and
--      vulnerability_factors of a deliberately vulnerable user base. Restricted
--      to authenticated users; anonymous access removed; a safe public view is
--      provided for cross-member display.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Lock down oauth_states (leaks OAuth client secrets without RLS)
-- ----------------------------------------------------------------------------
ALTER TABLE public.oauth_states ENABLE ROW LEVEL SECURITY;
-- No policies are created: with RLS enabled and no policies, anon/authenticated
-- get zero rows. Edge functions use the service_role key, which bypasses RLS.
REVOKE ALL ON public.oauth_states FROM anon, authenticated;

-- Make sure the cleanup helper has a pinned search_path (defense in depth).
CREATE OR REPLACE FUNCTION public.cleanup_expired_oauth_states()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.oauth_states WHERE expires_at < NOW();
END;
$$;

-- ----------------------------------------------------------------------------
-- 2. Role helper functions (SECURITY DEFINER bypasses RLS -> no recursion)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'super_admin')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = 'super_admin'
  );
$$;

-- ----------------------------------------------------------------------------
-- 3. Replace the self-recursive user_roles policies
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view their own roles"     ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles"          ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can manage all roles"  ON public.user_roles;
DROP POLICY IF EXISTS "Super admins manage roles"          ON public.user_roles;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Writes go exclusively through assign_user_role(); this policy is a backstop
-- so that only super admins can ever mutate the table directly.
CREATE POLICY "Super admins manage roles"
  ON public.user_roles FOR ALL
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- 4. Secure role-assignment RPC (was referenced by the UI but never defined)
--    Authorization is derived from auth.uid() — NEVER from the client-supplied
--    assigner_id — to prevent forging the caller identity.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.assign_user_role(
  target_user_id uuid,
  new_role text,
  assigner_id uuid DEFAULT auth.uid()  -- kept for call-site compatibility; ignored for authz
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller uuid := auth.uid();
BEGIN
  IF v_caller IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF new_role NOT IN ('super_admin', 'admin', 'moderator', 'user') THEN
    RAISE EXCEPTION 'Invalid role: %', new_role;
  END IF;

  -- Only admins/super admins may assign any role at all.
  IF NOT public.is_admin(v_caller) THEN
    RAISE EXCEPTION 'Insufficient permissions to assign roles';
  END IF;

  -- Only super admins may grant the privileged admin/super_admin roles.
  IF new_role IN ('admin', 'super_admin') AND NOT public.is_super_admin(v_caller) THEN
    RAISE EXCEPTION 'Only super admins may grant admin roles';
  END IF;

  -- Single effective role per user: clear then set.
  DELETE FROM public.user_roles WHERE user_id = target_user_id;
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (target_user_id, new_role, v_caller);
END;
$$;

REVOKE ALL ON FUNCTION public.assign_user_role(uuid, text, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.assign_user_role(uuid, text, uuid) TO authenticated;

-- ----------------------------------------------------------------------------
-- 5. Bootstrap the first super admin without a backdoor.
--    Set the env/SQL value below to your own user id, or call manually once:
--      INSERT INTO public.user_roles (user_id, role, assigned_by)
--      VALUES ('<your-auth-uid>', 'super_admin', '<your-auth-uid>')
--      ON CONFLICT (user_id, role) DO NOTHING;
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.bootstrap_super_admin(_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  v_uid uuid;
  v_existing int;
BEGIN
  -- Refuse to run if a super admin already exists (prevents takeover).
  SELECT COUNT(*) INTO v_existing FROM public.user_roles WHERE role = 'super_admin';
  IF v_existing > 0 THEN
    RAISE EXCEPTION 'A super admin already exists; bootstrap is disabled';
  END IF;

  SELECT id INTO v_uid FROM auth.users WHERE email = _email LIMIT 1;
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'No user found with email %', _email;
  END IF;

  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (v_uid, 'super_admin', v_uid)
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;
-- Only the service_role / SQL editor should call this. Do not grant to clients.
REVOKE ALL ON FUNCTION public.bootstrap_super_admin(text) FROM PUBLIC, anon, authenticated;

-- ----------------------------------------------------------------------------
-- 6. Profile privacy: stop exposing precise location + vulnerability_factors
--    to the anonymous public. The whole app is auth-gated, so authenticated
--    access is sufficient for community features.
-- ----------------------------------------------------------------------------
-- Remove the world-readable policy from the very first migration if present.
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Ensure the canonical owner/admin policies exist (idempotent).
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Authenticated members may see other members (needed for the map, posts, etc.)
DROP POLICY IF EXISTS "Authenticated members can view profiles" ON public.profiles;
CREATE POLICY "Authenticated members can view profiles"
  ON public.profiles FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Belt-and-suspenders: the anonymous role can never read the most sensitive
-- columns even if a future policy is added by mistake.
REVOKE SELECT (location_lat, location_lng, vulnerability_factors)
  ON public.profiles FROM anon;

-- A safe, minimal view for displaying other members (no location/vulnerability).
-- Prefer querying this view for cross-member display; reserve the base table for
-- the owner's own record.
CREATE OR REPLACE VIEW public.public_profiles
WITH (security_invoker = true) AS
  SELECT
    id,
    pseudonym,
    bio,
    avatar_url,
    trust_score,
    created_at
  FROM public.profiles;

GRANT SELECT ON public.public_profiles TO anon, authenticated;
