# Security

We Protect Us serves communities for whom privacy is a safety issue — tenants
facing eviction, organizers, undocumented people, elders, survivors. Security is
treated as a product requirement, not an afterthought.

## Reporting a vulnerability

Please report security issues privately to the maintainers before public
disclosure. Do not open a public issue for an exploitable vulnerability.

## Architecture & controls

### Authentication
- Email/password and OAuth (Google, GitHub) via Supabase Auth.
- Sessions are stored by the Supabase client with automatic token refresh.
- All feature routes are behind `ProtectedRoute`; `/disaster-preparedness` is
  intentionally public so it works in an emergency without an account.

### Authorization (roles)
- Roles live in `public.user_roles` (`user`, `moderator`, `admin`, `super_admin`).
- Role checks use **`SECURITY DEFINER`** functions (`has_role`, `is_admin`,
  `is_super_admin`) so RLS policies never query `user_roles` recursively.
- Role changes go through `assign_user_role()`, which derives the caller from
  `auth.uid()` (never a client-supplied id) and enforces:
  - only admins/super admins may assign roles;
  - only super admins may grant `admin`/`super_admin`.
- The first super admin is created with `bootstrap_super_admin(email)`, which
  refuses to run once any super admin exists. **There is no in-app backdoor for
  creating admins.**

### Row Level Security
- RLS is enabled on application tables; access is enforced in the database, not
  just the UI.
- `oauth_states` (which holds OAuth client secrets) has RLS enabled with **no
  policies** — only the `service_role` used by Edge Functions can read it.
- `profiles`: precise location (`location_lat`/`location_lng`) and
  `vulnerability_factors` are **not exposed anonymously**. Authenticated members
  see other members for community features; a `public_profiles` view exposes only
  safe display fields. Prefer it for cross-member display.

> The consolidated fixes live in
> `supabase/migrations/20250618000000_security_hardening.sql`. Run it after the
> earlier migrations.

### Secrets
- The Supabase **anon** key is public by design (protected by RLS) and may ship
  in the client bundle. Configure it via `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
- **Never** put a `service_role` key in the frontend or in `.env` files that are
  bundled. It belongs only in Supabase Edge Function secrets.
- `.env` / `.env.*` are git-ignored (except `.env.example`).

### Transport & browser hardening
`public/_headers` sets, for static hosts that honor it (Netlify, Cloudflare Pages):
- A restrictive **Content-Security-Policy** (self + Supabase over https/wss +
  OpenStreetMap tiles + leaflet CDN icons only).
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `Strict-Transport-Security`, a locked-down `Permissions-Policy`, and COOP.

For hosts that don't read `_headers` (Vercel, nginx, …), replicate these headers
in the host config — see `DEPLOYMENT.md`.

### Service worker / offline
- The service worker (`public/sw.js`) caches **only** the static app shell and
  the offline page. Authenticated Supabase responses are **never** written to
  the cache, so personal data does not persist on shared or seized devices.

### Logging
- `console.log`/`debug`/`info` are stripped from production builds (they included
  user ids). `console.warn`/`error` are kept for diagnostics. No analytics or
  third-party error reporting is wired up by default.

## Experimental / not production-ready

- **Mastodon & Bluesky OAuth Edge Functions** (`supabase/functions/*-oauth`) are
  conceptual. They use wildcard CORS and do not mint real Supabase sessions; the
  Bluesky flow accepts a user password. **Do not enable these in production** as
  written. Primary auth (email + Google/GitHub) does not depend on them.

## Hardening checklist before launch

- [ ] Point `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` at your own project.
- [ ] Run all SQL migrations, including the security hardening migration.
- [ ] Create the first admin via `bootstrap_super_admin('you@example.org')`.
- [ ] Confirm RLS is enabled on every table you expose (`supabase` dashboard →
      Authentication → Policies; the linter flags tables without RLS).
- [ ] Verify the security headers are actually served (e.g. securityheaders.com).
- [ ] Enable email confirmation + leaked-password protection in Supabase Auth.
- [ ] Leave the Mastodon/Bluesky functions undeployed unless reworked.
