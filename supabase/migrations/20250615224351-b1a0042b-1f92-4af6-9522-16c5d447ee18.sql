
-- First, let's ensure we have a proper profiles table that works with the existing auth system
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pseudonym TEXT NOT NULL,
  bio TEXT,
  skills TEXT[],
  vulnerability_factors TEXT[],
  location_lat NUMERIC,
  location_lng NUMERIC,
  time_bank_hours NUMERIC DEFAULT 0,
  trust_score NUMERIC DEFAULT 5.0,
  care_points_balance INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  full_name TEXT,
  avatar_url TEXT,
  PRIMARY KEY (id)
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role IN ('admin', 'super_admin')
    )
  );

-- Update the handle_new_user function to work with the current schema
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, pseudonym, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'pseudonym', NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1), 'Anonymous'),
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fix the get_user_role function to actually work
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid DEFAULT auth.uid())
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT COALESCE(
    (SELECT role FROM public.user_roles WHERE user_roles.user_id = $1 ORDER BY 
      CASE role 
        WHEN 'super_admin' THEN 1
        WHEN 'admin' THEN 2  
        WHEN 'moderator' THEN 3
        ELSE 4
      END
      LIMIT 1
    ),
    'user'
  );
$$;

-- Create a function to get users with their profiles for admin use
CREATE OR REPLACE FUNCTION public.get_users_with_profiles()
RETURNS TABLE(
  id uuid,
  pseudonym text,
  bio text,
  trust_score numeric,
  care_points_balance integer,
  created_at timestamp with time zone,
  role text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT 
    p.id,
    p.pseudonym,
    p.bio,
    p.trust_score,
    p.care_points_balance,
    p.created_at,
    COALESCE(ur.role, 'user') as role
  FROM public.profiles p
  LEFT JOIN public.user_roles ur ON p.id = ur.user_id
  ORDER BY p.created_at DESC;
$$;
