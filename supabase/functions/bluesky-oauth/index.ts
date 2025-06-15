
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

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { action, code, state } = await req.json()

    if (action === 'initiate') {
      // Generate OAuth state and code verifier
      const oauthState = crypto.randomUUID()
      const codeVerifier = crypto.randomUUID()
      const redirectUri = `${Deno.env.get('SUPABASE_URL')}/functions/v1/bluesky-oauth`
      
      // Store state in database
      await supabaseClient.from('oauth_states').insert({
        state: oauthState,
        provider: 'bluesky',
        redirect_url: redirectUri,
        code_verifier: codeVerifier
      })

      // Bluesky OAuth URL (AT Protocol)
      const authUrl = `https://bsky.social/xrpc/com.atproto.server.createSession?` +
        `client_id=${Deno.env.get('BLUESKY_CLIENT_ID')}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `state=${oauthState}&` +
        `scope=read`

      return new Response(
        JSON.stringify({ authUrl }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    if (action === 'callback' && code && state) {
      // Verify state
      const { data: stateData } = await supabaseClient
        .from('oauth_states')
        .select('*')
        .eq('state', state)
        .eq('provider', 'bluesky')
        .single()

      if (!stateData) {
        throw new Error('Invalid OAuth state')
      }

      // Exchange code for token with Bluesky
      const tokenResponse = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: code, // Bluesky uses identifier instead of traditional OAuth
          password: stateData.code_verifier
        })
      })

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange code for token')
      }

      const tokenData = await tokenResponse.json()

      // Get user info from Bluesky
      const userResponse = await fetch('https://bsky.social/xrpc/com.atproto.repo.getRecord', {
        headers: {
          'Authorization': `Bearer ${tokenData.accessJwt}`
        }
      })

      const userData = await userResponse.json()

      // Create user in Supabase
      const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
        email: `${userData.handle}@bsky.social`, // Synthetic email
        user_metadata: {
          provider: 'bluesky',
          bluesky_handle: userData.handle,
          full_name: userData.displayName || userData.handle,
          avatar_url: userData.avatar
        }
      })

      if (authError) {
        throw authError
      }

      // Clean up OAuth state
      await supabaseClient.from('oauth_states').delete().eq('state', state)

      return new Response(
        JSON.stringify({ user: authData.user }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
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
