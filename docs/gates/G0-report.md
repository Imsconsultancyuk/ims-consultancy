GATE: G0 Discovery & Scope   TIER: T1 (one T2 touchpoint: contact form)   DATE: 2026-07-24

## Problem statement (one paragraph)
IMS Consultancy's site has the right words ("get the manual work off your team," "quiet systems," honest published pricing) but no body: it ranks for almost nothing, its Insights section is three dead "coming soon" stubs, it has no individual case-study pages, no trust/compliance hub, and three internal inconsistencies (two service taxonomies, two pricing structures, an Industries sub-brand that visually diverges). A prior full redesign was rejected for copying an external product's aesthetic. Who hurts: IMS — every week the site fails to convert senior-operator buyers who now shortlist vendors via AI answer engines the site isn't cited by. Cost: the entire top-of-funnel.

## Users & roles
- Prospect / senior operator (primary) — reads, evaluates, books a call. No account.
- Answer engines / AI crawlers (secondary "reader") — GPTBot, ClaudeBot, PerplexityBot, Google-Extended — must be able to cite IMS.
- IMS (owner) — edits content, publishes Insights.
No authenticated app roles introduced by this scope. Existing `/dev/*` routes untouched (IMS-064).

## Success metrics (measurable)
- Every route returns 200; every internal link 200 (acceptance gate).
- Indexable surface area up: +5 `/work/[slug]`, +1 `/trust`, +N `/insights/[slug]` (from 0 real posts today).
- Full schema coverage (Organization/Service/FAQPage/Article/BreadcrumbList) validating in Rich Results Test.
- `llms.txt` + AI-crawler allow-list live.
- Cinematic scroll-world hero shipped with DOM-text fallback (H1 + poster visible with JS off / reduced-motion).
- Design direction passes the installed skill chain and a user checkpoint — not self-graded.

## Non-goals (scope fence)
- No production hosting change — stays on Netlify (IMS-064).
- No GSC sitemap submission (IMS-064).
- No deletion/alteration of `/dev/tokens` or `/dev/demo` (IMS-064).
- No new auth, no new personal-data store, no SaaS/platform features.
- Scroll-world is hero + one chapter only — NOT whole-site (would kill SEO/AEO/GEO).
- No external aesthetic copied — direction grounded in IMS's own mauve/paper identity.

## Data sensitivity classification → tier
- Site is marketing + content. The only personal data touched is the existing contact form (name, email) → already built, unchanged in scope.
- Classification: **T1** overall, contact form is the single **T2** touchpoint. No special-category data. → Lightweight gates, reviews still mandatory (00 §4).

## Constraints
- Stack fixed: Next.js 16 + React 19 + Tailwind 4 + Motion + GSAP + Lenis + R3F (installed). New dep: Remotion (ADR-001, pending).
- Assets: fal.ai (images + video) via `fal-ai` MCP — registered, awaiting FAL_KEY.
- Design: must clear the AH Architecture internal quality floor; route through design-taste-frontend → ui-ux-pro-max → emil-design-eng → impeccable.
- Deliverable spec of record: `SITE_PLAN.md`.

## Skeptic challenge (top 3)
1. "Whole-site scroll-world was asked for" → answered: baking text into video forfeits the SEO/AEO/GEO asked for in the same sentence; hero-first keeps both. Disposition: accepted, documented in SITE_PLAN §3.2.
2. "Another redesign risks another rejection" → answered: direction grounded in IMS's own identity first (design-taste-frontend), user checkpoint after the FIRST visible milestone, never self-graded. Disposition: gate rules 1/4/5 binding.
3. "fal.ai + Remotion + GSAP + Motion is over-tooled" → answered: each owns a distinct, non-overlapping job (fal=cinematic art, Remotion=exact-brand motion, GSAP=scrub, Motion=micro). Disposition: accepted; Remotion is the only ADR-worthy addition.

## Open risks carried forward
- FAL_KEY not set (blocks asset renders only).
- Scroll-world hero art-direction effort/time (mitigated by single-scene-first sequencing + fal.ai escape models).
- `/about` face decision unresolved (human).

## Human approval
- Required: YES. Design direction (post design-taste-frontend), `/about` face call, time-box priority. Flagged at top of status report this session. Approval channel: this conversation.

EXIT STATUS: G0 brief filed. Awaiting design-direction pass + user approval to exit to G1.
