-- Add columns the mutual aid UI already collects and displays but that were
-- missing from the table, so inserts/updates from CreatePostDialog succeed.
ALTER TABLE public.mutual_aid_posts
  ADD COLUMN IF NOT EXISTS contact_info TEXT,
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
