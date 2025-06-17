
-- Add missing avatar_url column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Update the handle_new_user function to work correctly
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
