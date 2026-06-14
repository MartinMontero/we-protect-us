# We Protect Us

A web platform for **mutual aid, community defense, solidarity economy, and
democratic organizing** — built by and for communities practicing collective
care. Members can request and offer help, coordinate disaster response, run time
banks and tool libraries, organize tenants, and govern themselves democratically.

> Built with privacy and safety as first-class concerns: the user base includes
> tenants, organizers, elders, and other people for whom a data leak is not an
> abstract risk. See [`SECURITY.md`](./SECURITY.md).

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **Supabase** (Postgres, Auth, Realtime, Row Level Security, Edge Functions)
- **TanStack Query**, **React Router**, **react-i18next**, **Leaflet**, **Recharts**
- **Vitest** + **Testing Library** for tests

## Quick start

```sh
# 1. Install dependencies (Node 18+ recommended)
npm install

# 2. Configure your Supabase project
cp .env.example .env
#   then edit .env with your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# 3. Run the dev server
npm run dev
```

The app runs at http://localhost:8080.

If you don't set environment variables, the client falls back to a bundled
public demo project so the app still boots — but you should point it at your own
backend before launch (see [`DEPLOYMENT.md`](./DEPLOYMENT.md)).

## Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the dev server                         |
| `npm run build`     | Production build to `dist/`                  |
| `npm run preview`   | Preview the production build locally         |
| `npm run lint`      | ESLint (zero errors expected)                |
| `npm run typecheck` | TypeScript type checking                     |
| `npm test`          | Run the Vitest test suite                    |

## Project structure

```
src/
  components/        Feature components grouped by domain (mutual-aid, wealth,
                     defense, disaster, garden, eldercare, admin, …) + ui/
  contexts/          Auth, Theme, Language providers
  hooks/             Data hooks (Supabase queries, realtime, offline sync)
  integrations/      Supabase client + generated types
  lib/               navigation config, i18n, utils
  pages/             Route-level pages
supabase/
  migrations/        SQL schema + RLS policies (run in order)
  functions/         Deno Edge Functions (OAuth — experimental)
public/
  _headers           Security headers + CSP (Netlify / Cloudflare Pages)
  _redirects         SPA history fallback
  sw.js              Offline service worker (privacy-aware)
```

## Documentation

- [`SECURITY.md`](./SECURITY.md) — threat model, RLS, headers, reporting.
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) — backend setup, env, hosting, headers.
- [`PRODUCTION_READINESS.md`](./PRODUCTION_READINESS.md) — what is production-grade
  today, what is still demo/educational content, and the roadmap.

## License

This project is intended for community use. Add a license of your choosing before
public distribution.
