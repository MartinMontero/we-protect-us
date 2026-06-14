
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

    const { action, code, state, instance, client_id, client_secret } = await req.json()

    if (action === 'initiate') {
      const mastodonInstance = instance || 'mastodon.social'
      const oauthState = crypto.randomUUID()
      const redirectUri = `${Deno.env.get('SUPABASE_URL')}/functions/v1/mastodon-oauth`
      
      // Register application with Mastodon instance
      const appResponse = await fetch(`https://${mastodonInstance}/api/v1/apps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_name: 'We Protect Us',
          redirect_uris: redirectUri,
          scopes: 'read:accounts',
          website: `${Deno.env.get('SUPABASE_URL')}`
        })
      })

      if (!appResponse.ok) {
        const errorData = await appResponse.json()
        throw new Error(`Failed to register app: ${errorData.error || 'Unknown error'}`)
      }

      const appData = await appResponse.json()

      // Store OAuth state temporarily (you might want to use a more persistent storage)
      const { error: stateError } = await supabaseClient
        .from('oauth_states')
        .insert({
          state: oauthState,
          provider: 'mastodon',
          redirect_url: redirectUri,
          code_verifier: JSON.stringify({
            instance: mastodonInstance,
            client_id: appData.client_id,
            client_secret: appData.client_secret
          })
        })

      if (stateError) {
        console.error('Error storing OAuth state:', stateError)
      }

      // Build OAuth URL
      const authUrl = `https://${mastodonInstance}/oauth/authorize?` +
        `client_id=${appData.client_id}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=read:accounts&` +
        `state=${oauthState}`

      return new Response(
        JSON.stringify({ 
          authUrl,
          state: oauthState,
          instance: mastodonInstance
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    if (action === 'callback' && code && state) {
      // Verify state and get stored data
      const { data: stateData, error: stateError } = await supabaseClient
        .from('oauth_states')
        .select('*')
        .eq('state', state)
        .eq('provider', 'mastodon')
        .single()

      if (stateError || !stateData) {
        throw new Error('Invalid OAuth state')
      }

      const { instance, client_id: storedClientId, client_secret: storedClientSecret } = JSON.parse(stateData.code_verifier)
      const redirectUri = stateData.redirect_url

      // Exchange code for token
      const tokenResponse = await fetch(`https://${instance}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: storedClientId,
          client_secret: storedClientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
          code: code,
          scope: 'read:accounts'
        })
      })

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json()
        throw new Error(`Failed to exchange code for token: ${errorData.error || 'Unknown error'}`)
      }

      const tokenData = await tokenResponse.json()

      // Get user info from Mastodon
      const userResponse = await fetch(`https://${instance}/api/v1/accounts/verify_credentials`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      })

      if (!userResponse.ok) {
        throw new Error('Failed to get user info from Mastodon')
      }

      const userData = await userResponse.json()

      // Create user in Supabase
      const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
        email: `${userData.username}@${instance}`, // Synthetic email
        user_metadata: {
          provider: 'mastodon',
          mastodon_handle: `@${userData.username}@${instance}`,
          mastodon_instance: instance,
          full_name: userData.display_name || userData.username,
          avatar_url: userData.avatar,
          username: userData.username,
          mastodon_access_token: tokenData.access_token
        }
      })

      if (authError && !authError.message.includes('already registered')) {
        throw authError
      }

      // Clean up OAuth state
      await supabaseClient.from('oauth_states').delete().eq('state', state)

      return new Response(
        JSON.stringify({ 
          user: authData?.user,
          session: {
            access_token: tokenData.access_token,
            token_type: tokenData.token_type
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action. Use "initiate" or "callback".' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )

  } catch (error) {
    console.error('Mastodon OAuth error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
