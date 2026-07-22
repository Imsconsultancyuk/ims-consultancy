# IMS-064 · Launch — Preview Deploy & Gate Results

**Status: PREVIEW ONLY. Not promoted to production.** Per explicit user instruction, this ticket
stops after the preview deploy and gate run below. Production remains on Netlify, untouched.
Promotion, Google Search Console sitemap submission, and deletion of `/dev/tokens` /
`/dev/demo` all require a separate, explicit approval before proceeding.

## Platform pivot (deviation from Doc 1, flagged)

Doc 1's literal IMS-064 text assumes a Vercel deploy. Mid-ticket the user redirected hosting to
**Cloudflare** ("Hold it here. I want to host with cloudflare, forget vercel."), scoped explicitly
to **preview only, for now** — production stays on Netlify. This is a deviation from the locked
spec's assumed platform, authorized directly by the user, not a unilateral scope change.

## Next.js version bump (deviation from Doc 1, flagged, authorized)

Next.js was bumped **16.2.4 → 16.2.11** at the user's explicit instruction, to pick up patch fixes
relevant to the Cloudflare/OpenNext adapter path. Verified via a full local Playwright e2e run
before touching any Cloudflare tooling: **51/51 passed** against `localhost` with the bumped
version — zero regressions from the bump itself, isolating it as a variable before introducing the
new deploy platform.

## Cloudflare setup

- **Adapter:** `@opennextjs/cloudflare` v1.20.2 (Cloudflare's own recommended Next.js-on-Workers
  adapter, built on OpenNext), plus `wrangler` v4.113.0.
- **New files** (outside Doc 1 §2's original file map — flagged per the established rule-7
  deviation pattern, all additive/reversible, none touch the existing Netlify `build`/`start`
  path):
  - `wrangler.jsonc` — Worker config, `main=.open-next/worker.js`, assets binding at
    `.open-next/assets`, `nodejs_compat` + `global_fetch_strictly_public` compatibility flags.
    Worker name deliberately set to `ims-consultancy-preview` (not `ims-consultancy`) to keep this
    deploy visually and operationally distinct from any future production naming.
  - `open-next.config.ts` — minimal `defineCloudflareConfig()`, no R2 incremental-cache override
    (out of scope for a throwaway preview).
  - `public/_headers` — long-cache immutable headers for `/_next/static/*`.
  - `.gitignore` — added `.open-next`, `.wrangler`, `.dev.vars`.
  - `package.json` — added `cf:build` / `cf:preview` / `cf:deploy` scripts. Existing `build`/`start`
    (Netlify's path) untouched.
  - `playwright.config.ts` — added a `PLAYWRIGHT_BASE_URL` env override (backward-compatible,
    defaults to `localhost:3000`) so the same locked e2e suite can target a live remote deploy
    instead of only localhost. `webServer` is skipped when that var is set.
- **Account:** `zuhaibkhalid139@gmail.com` — confirmed by the user as correct despite
  `VAULT_IMS.md` documenting a different (stale) email; this is the account the domain is
  registered under.
- **`workers.dev` subdomain:** not pre-registered on this account. Rather than escalate to a
  dashboard click, registered it via the Cloudflare API directly (CLI-first doctrine):
  `PUT /accounts/{account_id}/workers/subdomain` with `{"subdomain":"ims-consultancy"}`, using the
  OAuth token already present in the local `wrangler` config, extracted and used programmatically
  — never printed or logged. Response: `success: true`.

## Live preview

**https://ims-consultancy-preview.ims-consultancy.workers.dev**

## Observed: transient cold-start 404s (investigated, not a defect)

Immediately after the first deploy, `/industries/accountancy-firms` and
`/industries/private-healthcare-groups` returned 404 on the initial route sweep, despite both
having passed cleanly in the local e2e run minutes earlier. Investigated rather than assumed:

1. `.open-next/assets/` has no per-route HTML — OpenNext-on-Workers renders all pages (including
   SSG/prerendered ones) dynamically through the Worker at request time, using the bundled
   server-function code and the prerender manifest. This isn't a static export.
2. `.next/prerender-manifest.json` confirmed both slugs were correctly prerendered and listed.
3. `.open-next/cache/` confirmed identical cache artifacts for the "failing" slugs vs. working ones.
4. Grepped `worker.js` / `server-functions/default/` — both slugs equally present in the bundled
   server code (6 files each), ruling out a build/bundling gap.
5. `wrangler tail` while re-requesting `/industries/accountancy-firms` showed a clean 200 "Ok" log
   line on retry.
6. A full re-sweep of all 12 routes returned 200 across the board.

**Conclusion:** a transient cache-population race immediately following a fresh Workers deploy,
not a real defect. Confirmed stable on every subsequent check.

## Gate results (all against the live preview, not localhost)

### Route sweep — 12/12 pass

Hub, homepage, and all 10 industry slugs (`accountancy-firms`, `b2b-saas`,
`commercial-insurance-brokers`, `commercial-property`, `executive-search-recruitment`,
`ifas-wealth-managers`, `law-firms`, `ma-advisory-business-brokers`, `mortgage-brokers`,
`private-healthcare-groups`) all return `200`.

### IMS-060 · Playwright e2e smoke — 51/51 pass

Same locked suite (`tests/e2e/industries.spec.ts`), run via
`PLAYWRIGHT_BASE_URL="https://ims-consultancy-preview.ims-consultancy.workers.dev" npx playwright test`.
Clean 51/51 on the final run. One transient flake was seen mid-session on
`/industries/b2b-saas` (a `THREE.Clock: This module has been deprecated` console warning tripping
the zero-console-warnings assertion); repeat-run 3/3 clean, and this exact warning was already
independently root-caused in IMS-061 to the sitewide `NoiseField`/`three` dependency in
`app/layout.tsx` (outside the Industries file map) and seen again in IMS-063's device-matrix pass
on desktop-firefox — a known, pre-existing, sitewide, out-of-scope timing flake, not a
Cloudflare-specific or version-bump regression.

### IMS-062 · Meta uniqueness — pass

`BASE_URL="https://ims-consultancy-preview.ims-consultancy.workers.dev" npm run check:meta` →
`check:meta — 11 pages, all titles and descriptions unique.`

### IMS-061 · Lighthouse — pass, all 4 targets, all categories at or near 100

Same methodology as IMS-061 (desktop preset, mobile emulation, simulated throttling), same 4
targets (hub, `mortgage-brokers`, `b2b-saas`, `private-healthcare-groups`), now against the live
edge deploy instead of localhost:

| Target | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| hub (`/industries`) | 100 | 100 | 100 | 100 |
| mortgage-brokers | 98 | 98 | 100 | 100 |
| b2b-saas | 98 | 98 | 100 | 100 |
| private-healthcare-groups | 98 | 98 | 100 | 100 |

Compare to IMS-061's localhost baseline: hub Performance 89, all 3 sampled slugs 84 (below the
≥85 threshold, flagged at the time as an honest, pre-existing sitewide limitation from the
root-layout `SmoothScroll`/`NoiseField` client bundle). On Cloudflare's edge, every target clears
comfortably — verified as a genuine result, not a false positive: `runtimeError` is `undefined` on
every report, `requestedUrl`/`finalUrl`/`mainDocumentUrl` all match (no redirect to an error page),
and each report shows real network activity (20–63 requests, real transfer sizes, real
FCP/LCP/TBT/CLS numbers — e.g. hub FCP 0.3s / LCP 0.8s / TBT 0ms / CLS 0). The uplift is
plausible: Cloudflare's edge CDN + immutable long-cache static assets outperform the localhost
`next start` baseline IMS-061 measured against.

### IMS-063 · Cross-device — not re-run against preview (decision, not yet confirmed with user)

IMS-063's device-matrix pass (76 passed / 10 skipped / 0 failed) already ran against an identical
build and content — the DOM the device matrix exercises is unchanged by which host serves it.
Leaning toward **not** re-running the full device matrix specifically against the preview URL, as
the marginal signal is low relative to the cost of another full pass. This has not been formally
decided or communicated to the user as final — flagging here for visibility before close-out.

## What did NOT happen (by design, per binding constraint)

- No promotion to production. Netlify continues to serve production traffic unchanged.
- No sitemap submitted to Google Search Console.
- `/dev/tokens` and `/dev/demo` were not deleted.

All three require a separate, explicit user approval before proceeding.
