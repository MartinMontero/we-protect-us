
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Fail-closed: this integration is experimental and insecure as written
  // (see SECURITY.md). It stays disabled unless an operator explicitly opts in.
  if (Deno.env.get('ENABLE_EXPERIMENTAL_OAUTH') !== 'true') {
    return new Response(
      JSON.stringify({ error: 'This integration is disabled.' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 },
    )
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { action, identifier, password } = await req.json()

    if (action === 'authenticate') {
      // Bluesky uses AT Protocol authentication
      const authResponse = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: identifier,
          password: password
        })
      })

      if (!authResponse.ok) {
        const error = await authResponse.json()
        throw new Error(`Bluesky auth failed: ${error.message || 'Authentication failed'}`)
      }

      const authData = await authResponse.json()

      // Get user profile from Bluesky
      const profileResponse = await fetch('https://bsky.social/xrpc/com.atproto.repo.describe', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authData.accessJwt}`
        }
      })

      let profileData = { handle: identifier, displayName: identifier }
      if (profileResponse.ok) {
        profileData = await profileResponse.json()
      }

      // Create or sign in user in Supabase
      const { data: authUser, error: authError } = await supabaseClient.auth.admin.createUser({
        email: `${profileData.handle}@bsky.placeholder`, // Synthetic email
        user_metadata: {
          provider: 'bluesky',
          bluesky_handle: profileData.handle,
          full_name: profileData.displayName || profileData.handle,
          bluesky_access_token: authData.accessJwt,
          bluesky_refresh_token: authData.refreshJwt
        }
      })

      if (authError && !authError.message.includes('already registered')) {
        throw authError
      }

      // If user already exists, sign them in
      let finalUser = authUser?.user
      if (authError?.message.includes('already registered')) {
        const { data: signInData, error: signInError } = await supabaseClient.auth.admin.getUserById(
          // We need to find the user by email
          `${profileData.handle}@bsky.placeholder`
        )
        if (signInError) throw signInError
        finalUser = signInData.user
      }

      return new Response(
        JSON.stringify({ 
          user: finalUser,
          session: {
            access_token: authData.accessJwt,
            refresh_token: authData.refreshJwt
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action. Use "authenticate" with identifier and password.' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )

  } catch (error) {
    console.error('Bluesky OAuth error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
