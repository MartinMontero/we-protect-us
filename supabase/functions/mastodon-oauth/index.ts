
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

    const { action, code, state, instance } = await req.json()

    if (action === 'initiate') {
      const mastodonInstance = instance || 'mastodon.social'
      const oauthState = crypto.randomUUID()
      const redirectUri = `${Deno.env.get('SUPABASE_URL')}/functions/v1/mastodon-oauth`
      
      // Store state in database
      await supabaseClient.from('oauth_states').insert({
        state: oauthState,
        provider: 'mastodon',
        redirect_url: redirectUri,
        code_verifier: mastodonInstance
      })

      // Register application with Mastodon instance if needed
      const appResponse = await fetch(`https://${mastodonInstance}/api/v1/apps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_name: 'We Protect Us',
          redirect_uris: redirectUri,
          scopes: 'read:accounts',
          website: Deno.env.get('SUPABASE_URL')
        })
      })

      const appData = await appResponse.json()

      if (!appResponse.ok) {
        throw new Error(`Failed to register app: ${appData.error}`)
      }

      // Build OAuth URL
      const authUrl = `https://${mastodonInstance}/oauth/authorize?` +
        `client_id=${appData.client_id}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=read:accounts&` +
        `state=${oauthState}`

      return new Response(
        JSON.stringify({ authUrl, clientId: appData.client_id, clientSecret: appData.client_secret }),
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
        .eq('provider', 'mastodon')
        .single()

      if (!stateData) {
        throw new Error('Invalid OAuth state')
      }

      const mastodonInstance = stateData.code_verifier // We stored the instance here
      const redirectUri = stateData.redirect_url

      // First, we need to get the client credentials for token exchange
      // In a production app, you'd store these from the initiate step
      const appResponse = await fetch(`https://${mastodonInstance}/api/v1/apps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_name: 'We Protect Us',
          redirect_uris: redirectUri,
          scopes: 'read:accounts',
          website: Deno.env.get('SUPABASE_URL')
        })
      })

      const appData = await appResponse.json()

      // Exchange code for token
      const tokenResponse = await fetch(`https://${mastodonInstance}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: appData.client_id,
          client_secret: appData.client_secret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
          code: code,
          scope: 'read:accounts'
        })
      })

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange code for token')
      }

      const tokenData = await tokenResponse.json()

      // Get user info from Mastodon
      const userResponse = await fetch(`https://${mastodonInstance}/api/v1/accounts/verify_credentials`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      })

      if (!userResponse.ok) {
        throw new Error('Failed to get user info')
      }

      const userData = await userResponse.json()

      // Create user in Supabase
      const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
        email: `${userData.username}@${mastodonInstance}`, // Synthetic email
        user_metadata: {
          provider: 'mastodon',
          mastodon_handle: `@${userData.username}@${mastodonInstance}`,
          mastodon_instance: mastodonInstance,
          full_name: userData.display_name || userData.username,
          avatar_url: userData.avatar,
          username: userData.username
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
