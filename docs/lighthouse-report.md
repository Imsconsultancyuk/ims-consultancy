# IMS-061 · Lighthouse CI

**AC:** Mobile emulation on 3 representative slugs + hub — Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Scores recorded here.

**Method:** `npx lighthouse` against a production build (`npm run build && npm run start`, not `next dev`), mobile form factor (default Lighthouse mobile emulation: 4x CPU throttle, simulated slow-4G), `--only-categories=performance,accessibility,best-practices,seo`. Targets: `/industries` (hub) + 3 representative slugs — `mortgage-brokers`, `b2b-saas`, `private-healthcare-groups` (chosen to span the shortest/longest content and different tool-demo shapes). Raw JSON per target in `docs/lighthouse-raw/`.

## Results

| Target | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/industries` (hub) | **89** ✅ | **100** ✅ | 100 ✅ | 100 ✅ |
| `/industries/mortgage-brokers` | **84** ❌ | 98 ✅ | 100 ✅ | 100 ✅ |
| `/industries/b2b-saas` | **84** ❌ | 98 ✅ | 100 ✅ | 100 ✅ |
| `/industries/private-healthcare-groups` | **84** ❌ | 98 ✅ | 100 ✅ | 100 ✅ |

Thresholds: Performance ≥85, Accessibility ≥95, Best Practices ≥95, SEO ≥95.

## Accessibility — fixed in this ticket (hub 93 → 100)

Two defects in `app/industries/page.tsx` (in Doc 1 §2's file map, in scope), both fixed:

1. **`landmark-one-main`** (was scoring 0): the hub returned a bare `<>` fragment with two `<section>`s and no `<main>` landmark, and the shared root layout doesn't supply one either. Fixed by wrapping the page's content in `<main>`.
2. **`color-contrast`** (was scoring 0): the industry-card tool-name text used the raw per-industry `--color-signal-*` accent as its text color directly on `--color-paper` (#f5eff3). Lighthouse sampled one failing instance (`rose` #e11d48, 4.14:1 measured, needs 4.5:1), but checking WCAG contrast for all 10 accent tokens against `--color-paper` shows only `indigo` (5.55:1) and `violet` (5.03:1) actually clear 4.5:1 — the other 8 (`amber` 2.81, `emerald` 3.33, `sky` 3.61, `rose` 4.14, `teal` 3.30, `orange` 3.14, `cyan` 3.25, `fuchsia` 4.16) all fail. This was a systemic issue across every card, not a single-industry fluke. Fixed by dropping the accent color from that text run and using the existing `text-ink-soft` token (7.08:1, already used elsewhere on the same page) instead — the accent color identity is preserved via the card's left border, which was untouched.

Re-ran Lighthouse after the fix: hub Accessibility 93 → 100, all four hub categories now clear threshold. The 3 slug pages were already at 98 (unaffected by this file, since `[slug]/page.tsx` doesn't share this card markup) and remain there.

## Performance — root-caused, confirmed out of this ticket's scope

The 3 sampled slugs land at 84, one point under the 85 threshold (hub, which has less inherited page weight relative to its content, clears it at 89). Diagnostics for `mortgage-brokers` (representative of all three — same template):

- `total-blocking-time`: 240ms (score 0.86), `interactive`: 5.3s (score 0.73), `max-potential-fid`: 170ms (score 0.77) — all main-thread-contention symptoms.
- `bootup-time`: ~0.9s JS execution, `mainthread-work-breakdown`: 844ms script evaluation, concentrated in `_next/static/chunks/0a0upl61isdar.js` (241KB transferred, 133KB/240KB flagged unused) and a second ~71KB chunk.
- `largest-contentful-paint`: displayValue "3.9s" (score 0.54) is Lighthouse's Lantern-simulated throttled estimate used for scoring; the Insights `lcp-breakdown-insight` audit's own sub-timings for the same element (the page `<h1>`, present in server-rendered HTML) sum to ~102ms observed (8ms TTFB + 93ms render delay) at native machine speed. These are two different measurement models within the same run (simulated-throttled scoring metric vs. observed trace diagnostic) — not a contradiction, but it means the *content* isn't slow; the *simulated CPU-constrained environment* is, because of main-thread contention from unrelated JS competing to execute during first render.

**Traced to source:** `grep`-verified zero heavy client-side dependencies (`gsap`, `framer-motion`/`motion`, `@react-three/*`, `lenis`, `embla-carousel`) anywhere under `app/industries/` or `components/industry/` — the Industries feature itself adds no heavy JS of its own. The weight is inherited from the **root layout**, which unconditionally mounts on every route in the site:

- `app/_components/SmoothScroll.tsx` — imports `lenis` + `gsap` + `gsap/ScrollTrigger`
- `app/_components/NoiseField.tsx` — imports `three` + `@react-three/fiber`
- `app/_components/SiteCursor.tsx`

all wired into `app/layout.tsx` (`<SmoothScroll /><NoiseField /><SiteCursor />{children}`), which is **not** in Doc 1 §2's route/file map for this build. Under Lighthouse's mobile 4x-CPU-throttle simulation, evaluating/executing that bundle delays interactivity and the LCP element's paint sitewide — this is a pre-existing architectural characteristic of the whole site (confirmed present before this build started), not something the Industries pages introduced, and fixing it (code-splitting/deferring `SmoothScroll`/`NoiseField` via `next/dynamic`, or gating `NoiseField`'s Three.js canvas behind an idle/viewport trigger) would mean editing `app/layout.tsx` and `app/_components/*` — outside this ticket's authorized integration scope, and a sitewide change affecting every page, not just the 11 new ones.

**Verdict:** IMS-061's Accessibility/Best Practices/SEO gates pass cleanly on all 4 sampled targets (Accessibility fix applied and verified in this ticket). The Performance gate does **not** literally clear ≥85 on the 3 slugs (84/85, a 1-point miss caused entirely by sitewide, pre-existing root-layout JS weight, confirmed via dependency grep and bundle diagnostics — not by anything added in this build). Recommendation: open a follow-up ticket against `app/layout.tsx`/`app/_components/*` to defer/code-split `SmoothScroll` and `NoiseField` (e.g. `next/dynamic({ ssr: false })` + mount after first paint/idle), independent of the Industries Pages build. Flagging this explicitly rather than silently shipping a passing-looking report, per the scope boundary in Doc 1 §2 and the instruction to never weaken or misstate a gate result.
