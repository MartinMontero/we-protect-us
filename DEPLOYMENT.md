# Deployment

## 1. Backend (Supabase)

1. Create a Supabase project (or self-host).
2. Apply the migrations in `supabase/migrations/` **in filename order**. The last
   one, `20250618000000_security_hardening.sql`, fixes RLS recursion, locks down
   `oauth_states`, adds the role RPCs, and tightens profile privacy.
   - With the Supabase CLI: `supabase db push`
   - Or paste each file into the SQL editor in order.
3. Create your first admin (run once in the SQL editor):
   ```sql
   select public.bootstrap_super_admin('you@example.org');
   ```
4. In **Authentication → Providers**, enable Email and (optionally) Google /
   GitHub. Set the site URL and redirect URLs to your domain + `/onboarding`.
5. In **Authentication → Settings**, enable email confirmation and
   leaked-password protection.

> Do **not** deploy the Mastodon/Bluesky Edge Functions as-is — see `SECURITY.md`.

## 2. Frontend build

```sh
cp .env.example .env   # set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm ci
npm run build          # outputs dist/
```

Verify locally:

```sh
npm run preview
npm test
```

## 3. Hosting

The output in `dist/` is a static SPA. It needs two things from the host:

1. **History fallback** — serve `index.html` for unknown paths so deep links work.
2. **Security headers** — see `public/_headers`.

### Cloudflare Pages (recommended)

This repo is set up for Cloudflare Pages out of the box: `public/_headers`
(security headers + caching) and `public/_redirects` (SPA history fallback) are
copied into `dist/` and honored as-is, `wrangler.toml` declares the build output
dir, and `.nvmrc` pins Node 20 for the build.

**Option A — connect the GitHub repo (simplest):**
1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Build command: `npm run build`. Build output directory: `dist`.
3. Environment variables (Production **and** Preview):
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - `NODE_VERSION = 20` (or rely on `.nvmrc`)
4. Every push builds and deploys; PRs get preview URLs automatically.

**Option B — CLI / CI:**
```sh
npm run build
npx wrangler pages deploy dist --project-name we-protect-us
```

**Custom domain:** Pages → your project → Custom domains → add your domain;
Cloudflare provisions TLS and enables HTTP/3 + Brotli automatically. Turn on
"Always Use HTTPS". The build injects a `<link rel="preconnect">` to whatever
`VITE_SUPABASE_URL` you set, so the first auth call skips a DNS+TLS round-trip.

> After deploy, verify headers at https://securityheaders.com (expect an A).
> The `connect-src` CSP already allows `*.supabase.co` over https + wss.

### Netlify
Same `_headers` / `_redirects` apply. Build command `npm run build`, publish dir
`dist`, and set the two `VITE_` env vars.

### Vercel
Add a `vercel.json` (headers + SPA rewrite), since Vercel ignores `_headers`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    }
  ]
}
```
Copy the full `Content-Security-Policy` value from `public/_headers`.

### nginx
```nginx
location / { try_files $uri /index.html; }
add_header Content-Security-Policy "<copy from public/_headers>" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
```

## 4. Custom Supabase domain / CSP

If your Supabase project is reached via a custom domain, update the
`connect-src` directive in `public/_headers` (and your host config) to include
that origin over both `https:` and `wss:` (realtime).

## 5. Post-deploy verification

- [ ] Sign up, confirm email, complete onboarding.
- [ ] Create a mutual aid post; confirm it appears on the map.
- [ ] Visit `/admin` as the bootstrapped admin; confirm metrics load.
- [ ] Confirm a logged-out deep link (e.g. `/dashboard`) redirects to `/auth`.
- [ ] Run a header scan (securityheaders.com) and confirm an A grade.
