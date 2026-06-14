# Code Review, QA & Optimization

A whole-codebase review across three dimensions (correctness, duplication/dead
code, performance), with each finding verified before acting. This documents
what was fixed, what was a false positive, and what remains as recommendations.

## Method

Three systematic sweeps were run over `src/` (~323 files, ~55k LOC), then every
finding was verified by reading the code (several agent findings were wrong —
see "False positives"). Changes were made in small batches, each kept behind a
green gate: `typecheck` (strict null checks + noImplicitAny), `lint` (0 errors),
`vitest`, and `vite build`.

---

## Fixed

### Correctness bugs (HIGH)
- **Admin panel rendered blank.** `AdminLayout` has an `<Outlet/>` and sidebar
  links to `/admin/users`, `/admin/analytics`, … but `App.tsx` only mounted
  `/admin/*` → `AdminPage` with no child routes, so every admin sub-route showed
  an empty main area. `AdminPage` now defines nested routes (dashboard index +
  users/roles/analytics/insights/realtime/security/settings) under the layout.
- **Admin i18n labels showed raw keys.** Components used `t('admin.x')` but the
  keys live in the `admin` namespace while `defaultNS` is `common`, so labels
  rendered as `"admin.dashboard"`. Verified with an isolated i18next test, then
  switched to the `t('admin:x')` namespace separator across 4 files.
- **`useRealtime` re-subscribed every render.** Inline handler props were in the
  effect dependency array, so passing inline callbacks (as `RealtimeDashboard`
  does) tore down and recreated the channel on every render. Handlers are now
  kept in a ref; the effect depends only on `table/event/filter`.
- **`useWebRTC` leaked connections.** The unmount cleanup iterated the `peers`
  Map captured at mount (always empty), never closing peer connections added
  later. `peers` is now mirrored into a ref used by the cleanup.

### Performance
- **MutualAid route chunk 478 KB → 48 KB.** The leaflet map and recharts
  projections (and trust/library tabs) are now `React.lazy` + `Suspense`, so
  recharts (107 KB gz) no longer loads unless the Projections tab is opened.
- **`ThemeContext`** provider value is memoized (was a new object every render,
  re-rendering all consumers); dropped a `console.log` that echoed theme state.
- **`PostCard`** static colour maps + formatters hoisted to module scope and the
  component wrapped in `React.memo`; the parent's `onViewDetails` is memoized so
  cards don't re-render when the selected post changes.
- **`useMutualAidPosts`** posts query was unbounded; added `.limit(200)`.

### Refactor / cleanup
- Extracted `src/components/ui/spinner.tsx` (`Spinner` + `LoadingState`) and
  replaced 12 copy-pasted inline `animate-spin` spinners; removed a dead import.

---

## False positives (verified, not changed)

Honest review means rejecting bad findings:

- **"`getStatusColor` is duplicated 13×, consolidate it."** Verified the copies
  map *different, conflicting* status vocabularies (`'active'` → red in
  CrisisResponse, green in ProductionPlanning). They are same-named domain
  functions, **not** duplication; merging them would change the UI. Left as-is.
- **"`useOfflineSync` leaks `online`/`offline` listeners every render."** The
  effect depends on `toast`, which is a stable module-level function in the
  shadcn toast implementation, so the effect runs once. No leak.
- **"`src/components/ui/use-toast.ts` is a duplicate hook."** It's a 3-line
  re-export shim of `src/hooks/use-toast.ts` (shadcn convention). Not a problem.
- **"8 admin pages are dead code."** They are not dead — they are the missing
  nested-route targets (fixed above), now reachable.

---

## Known, intentionally-deferred (recommendations)

These are real but were judged lower-ROI / higher-risk than the time budget,
and are safe to leave:

- **26 `react-hooks/exhaustive-deps` warnings** are benign: each is a
  fetch-on-mount/param function that is recreated every render with a fresh
  closure, and the effect re-runs on its real deps (`[user]` / `[]`). No stale
  data results. Cleaning them idiomatically means `useCallback` + reordering in
  ~24 files; deferred. (`useWebRTC`, the one real case, was fixed.)
- **5 hooks use manual `useState`+`useEffect`** (`useProfile`, `useRoles`,
  `useTrustRelations`, `useMutualAidPosts`, `useIntegrations`) while ~85
  components use TanStack Query. Migrating them would unify caching/loading and
  remove the manual race handling, but changes their public return shape.
- **Admin analytics fetch whole tables and aggregate client-side**
  (`AnalyticsCharts`, parts of `AdminDashboard`). For real scale, move the
  group-by/count-distinct into Postgres RPCs. The date-bucketing is also O(n²)
  and can be a single O(n) pass with a date→count map.
- **Inline mock/demo data** (ResourceDirectory, CelebrationReminders, AIInsights,
  TrustGraph, …) should move to a `src/lib/mockData/` module or be replaced with
  real backends; see `PRODUCTION_READINESS.md` for the real-vs-demo inventory.
- **11 `react-refresh/only-export-components` warnings** come from context files
  exporting hooks alongside providers — harmless.

---

## Verification

`npm run typecheck` · `npm run lint` (0 errors) · `npm test` (10 passing) ·
`npm run build` — all green after every batch. Lint warnings unchanged at 37
(the deferred items above), down from 106 before the earlier type-safety pass.
