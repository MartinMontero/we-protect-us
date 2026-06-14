# Production Readiness

An honest accounting of what this codebase is today, what was hardened, and what
remains. The app began as an AI-generated conceptual prototype; this document
distinguishes production-grade surfaces from demo/educational content so you can
launch responsibly.

## ✅ Done in this pass

**Build & deployability**
- Fixed deploy-blocking dependency conflicts (`react-leaflet` 5→4 for React 18,
  `date-fns` 4→3 for `react-day-picker`). A clean `npm install` now succeeds.
- Route-level code splitting + vendor chunking: the initial payload dropped from
  ~505 KB gzip (one 1.9 MB chunk) to ~212 KB gzip; heavy libs (charts, maps)
  load on demand.
- `npm run lint` → 0 errors. `npm run typecheck` → clean. `npm run build` → green.
- Added a Vitest + Testing Library harness with boot/navigation/404 smoke tests
  (the project previously had no tests).

**Security** (details in `SECURITY.md`)
- Removed the public "create admin" backdoor component.
- New `security_hardening` migration: RLS on `oauth_states` (was leaking OAuth
  secrets), non-recursive role policies via `SECURITY DEFINER` helpers, a secure
  `assign_user_role` RPC (previously referenced but undefined), safe super-admin
  bootstrap, and profile privacy (no anonymous exposure of precise location /
  vulnerability factors).
- Externalized Supabase config to env vars; CSP + security headers; SPA fallback;
  a privacy-aware service worker; production log stripping.

**Correctness & integrity**
- Fixed dead navigation (settings menu, `/profile`, `/community`) and wired all
  real feature pages into routes + a 404 catch-all + an `ErrorBoundary`.
- Turned the dashboard into a real feature-discovery hub.
- Replaced fabricated admin metrics (`Math.random`, hardcoded "+12%") with real
  queries in the admin dashboard, realtime dashboard, and analytics.

## 🟢 Feature surfaces backed by real data (Supabase)

These query/insert/update real tables with RLS and are functionally complete
enough to use, pending your own data and testing:

- **Mutual Aid** — posts, map, realtime updates.
- **Community Garden** — plots, waitlist, plantings, harvest sharing.
- **Elder Care** — elder/volunteer profiles, matching, visit coordination.
- **Tool Library** — tools, reservations, categories.
- **Food Security** — food assets, knowledge base, recipes (some stat cards static).
- **Childcare Co-op** — care requests, care points, group activities.
- **Disaster Preparedness** — check-ins, emergency alerts (realtime), offline.
- **Community Defense / tenant tools** — rent tracking, repair requests.
- **Auth, Profiles, Admin** (users, roles, content moderation, analytics).

## 🟡 Demo / educational / partially-wired

These render polished UI but are **not** backed by live data, or only partially.
They are safe to ship as educational content, but should be labeled as such or
finished before being presented as live tools:

- **Organizing** (events list is hardcoded), **Community Map** (`/community` is a
  visualization placeholder), **Reports** (illustrative scores), **Notifications
  Center** (in-memory), **Time Bank** participant lists (hardcoded), parts of
  **Energy Democracy**, **Sovereignty**, **Community Wealth**, **Security
  training/scenarios**, and the **Skills marketplace** (the skills table is not
  created, returns empty).

## 🔴 Do not enable as-is

- **Mastodon / Bluesky OAuth Edge Functions** — insecure/broken conceptual flows
  (wildcard CORS, no real Supabase session, Bluesky accepts a password). Leave
  undeployed. Primary auth does not depend on them.

## Known tech debt (non-blocking)

- ~100 ESLint warnings remain (mostly `@typescript-eslint/no-explicit-any` from
  the generated Supabase types, plus a few `react-hooks/exhaustive-deps`). These
  are warnings, not errors, and are safe to address incrementally.
- `tsconfig` runs with loose strictness (`strictNullChecks: false`,
  `noImplicitAny: false`). Tightening it is recommended but will surface many
  type issues to work through.
- The `MutualAid` route chunk is large (~130 KB gzip) because it bundles both
  maps and charts; further intra-route splitting is possible.
- Several `SECURITY DEFINER` SQL functions from earlier migrations could have
  their `search_path` pinned (the hardening migration pins the security-critical
  ones).

## Suggested next steps

1. Decide, per 🟡 feature, whether to (a) finish the backend, or (b) clearly
   label it "preview/educational" in the UI.
2. Add CI running `lint`, `typecheck`, `test`, and `build` on every PR.
3. Wire an error-reporting service (privacy-respecting) if desired.
4. Rework or remove the experimental social-login Edge Functions.
5. Tighten `tsconfig` strictness incrementally and burn down `any` usage.
