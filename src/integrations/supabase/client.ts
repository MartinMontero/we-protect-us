import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Configuration is read from build-time environment variables so the app can be
// pointed at any Supabase project without code changes. The values below are the
// project's *public* anon key + URL (safe to ship — access is governed by RLS),
// used as a fallback so the app still runs out of the box.
//
// To deploy against your own backend, set in a `.env` file (see `.env.example`):
//   VITE_SUPABASE_URL=...
//   VITE_SUPABASE_ANON_KEY=...
const FALLBACK_SUPABASE_URL = 'https://sedwmymsmgykmunpqmdy.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlZHdteW1zbWd5a211bnBxbWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MzIwNTUsImV4cCI6MjA2NTUwODA1NX0.Jo9k0CuHreRd1fDOvjsPFb5A9YqvOkf7i_lY9DJc00A';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? FALLBACK_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? FALLBACK_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
  );
}

if (
  import.meta.env.PROD &&
  (SUPABASE_URL === FALLBACK_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_URL)
) {
  // Help operators notice they shipped without their own backend configured.
  console.warn(
    '[supabase] Using the bundled default project. Set VITE_SUPABASE_URL / ' +
      'VITE_SUPABASE_ANON_KEY to point at your own Supabase project before launch.',
  );
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
