# Industry Pages — Ticket Progress

Branch: `feat/industry-pages`. Source docs: `01-IMS-Industry-Pages-System-Build.md`, `02-IMS-Industry-Content-Pack.md`. One commit per ticket. IND tickets begin only after IMS-050 passes.

## EPIC A — Foundation
- [x] IMS-001 · Repo audit & integration plan (`docs/industry-pages-audit.md`)
- [x] IMS-002 · Design tokens (`app/globals.css` additive tokens, `app/dev/tokens/page.tsx` verification page — delete before IMS-064)
- [x] IMS-003 · Dependencies & strictness (zod/schema-dts/tsx installed; `typecheck`/`validate:content` scripts added; `validate:content` chained ahead of `next build`; placeholder `lib/industries/validate-run.ts` to be replaced by IMS-011)
- [x] IMS-004 · Analytics events (`lib/analytics.ts`, no-op-safe stub per audit §5)

**Gate A:** `tsc --noEmit && lint --max-warnings 0 && build` — ✅ green (2026-07-21). Lint scoped to files this feature touched (`app/layout.tsx`, `app/dev/tokens/page.tsx`, `lib/analytics.ts`, `lib/industries/validate-run.ts`) — full-repo `eslint --max-warnings 0` fails on 15 pre-existing errors/2 warnings in unrelated files (`NoiseField.tsx`, `Testimonials.tsx`, `case-studies/page.tsx`, `AnimatedBackground.tsx`, `Authority.tsx`, `AutomationSystems.tsx`, `ConversionHub.tsx`, `Results.tsx`) that predate this ticket and are out of scope per rule 6. Documented, not fixed.

**npm audit:** installing zod/schema-dts/tsx surfaced 5 vulnerabilities. 3 fixed via plain `npm audit fix` (`@babel/core`, `brace-expansion`, `js-yaml`). 2 remain (`next`, `postcss`) — only fixable via `npm audit fix --force`, which bumps the pinned `next@16.2.4` to `16.2.10`, outside the stated dependency range and outside this ticket's scope. Left unforced; flagged here as a known, deferred item.

## EPIC B — Content system
- [x] IMS-010 · Type system (`lib/industries/types.ts`)
- [x] IMS-011 · Zod schema + build gate (`lib/industries/schema.ts`; refinements verified against a deliberately-broken fixture — 8/8 expected issues caught with clear paths+messages, exit 1; reverted to empty registry, exit 0)
- [x] IMS-012 · Registry & loader (`lib/industries/index.ts` — empty `industries[]` until IND tickets land, `getIndustry`/`industrySlugs` exported)

**Gate B:** `tsc --noEmit && lint --max-warnings 0 && validate:content && build` — ✅ green (2026-07-21). Same lint scoping as Gate A: full-repo `eslint --max-warnings 0` still fails on the same 15 pre-existing errors/2 warnings in unrelated files (documented in Gate A) — clean on every file this EPIC touched (`lib/industries/{types,schema,validate-run,index}.ts`).

## EPIC C — Component library
- [x] IMS-020 · SectionShell
- [x] IMS-021 · IndustryHero + StatChips
- [x] IMS-022 · PainGrid
- [x] IMS-023 · ToolCard + ToolGrid
- [x] IMS-024 · FlowInfographic
- [x] IMS-025 · ResultsBlock
- [x] IMS-026 · PackageBlock + lead magnet (`app/api/sample-report/route.ts` — validates + rate-limits + logs; no Resend/RESEND_API_KEY wiring, see resolved decision below)
- [x] IMS-027 · FAQAccordion
- [x] IMS-028 · CTASection
- [x] IMS-029 · PrivacyShield + TokenizationToggle
- [x] IMS-030 · IndustryNav (sticky section nav; not in Doc 1 §2's file map — added to `components/industry/` alongside its EPIC C siblings, flagged as a spec omission in the IMS-030 commit)

**Gate C:** `tsc --noEmit && lint --max-warnings 0 && validate:content && build` — ✅ green (2026-07-21). Lint scoped to all 22 files this feature has touched through EPIC C (same out-of-scope pre-existing errors as Gate A/B, undisturbed). `validate:content` reports 0 industries — expected, `lib/industries/data/` doesn't exist yet (IND tickets not started, correctly gated behind IMS-050 per rule 2).

## EPIC D — Demo engine
- [x] IMS-040 · useDemoMachine
- [x] IMS-041 · SampleFileChip
- [x] IMS-042 · DropZone + PipelineRail
- [x] IMS-043 · ResultsPanel
- [x] IMS-044 · LiveDemoPlayer
- [x] IMS-045 · Demo a11y & touch hardening (`docs/qa-demo-a11y.md`)

**Gate D:** `tsc --noEmit && lint --max-warnings 0 && build` + vitest unit tests — ✅ green (2026-07-21). Lint scoped to all EPIC D files (`components/industry/demo/`, `app/dev/`). Vitest: 1 file, 7 tests passing (`useDemoMachine.test.ts`, from IMS-040). `validate:content` still reports 0 industries — expected, unchanged from Gate C (IND tickets not started). IMS-045's live QA findings, one fixed touch-target defect, and two out-of-scope contrast observations recorded in `docs/qa-demo-a11y.md`.

## EPIC E — Page assembly & SEO
- [x] IMS-050 · Industry page template ← unlocks IND tickets
- [x] IMS-051 · Metadata
- [x] IMS-052 · JSON-LD
- [x] IMS-053 · OG images
- [x] IMS-054 · Hub page `/industries` (`app/industries/page.tsx`; added `leakLine: string` to `Industry` type/schema, flagged as a spec-required deviation in the IMS-054 commit — Doc 1 unambiguously requires a per-card one-line leak statement distinct from `pains[0].line`)
- [x] IMS-055 · Sitemap, robots, internal links (`app/sitemap.ts` hub + dynamic `industrySlugs`, `TrophyFooter.tsx` Industries column, `CTASection.tsx` `related` prop) — both AC are config-driven and satisfied structurally now (`industries`/`industrySlugs` still empty pending IND tickets); will complete numerically once IND-001…010 land, consistent with the IMS-054 precedent
- [x] IMS-056 · Performance budget (`next/dynamic` + sized skeletons for `LiveDemoPlayer`, `DropZone`, `PrivacyShield`, `FlowInfographic`; confirmed separate chunk files; fonts already preloaded via `next/font`; no above-fold images) — numeric route-size budget and CLS trace deferred to IMS-061 per the ticket plan

**Gate E:** `tsc --noEmit && lint --max-warnings 0 && validate:content && build` — ✅ green (2026-07-21). Lint scoped to all files this feature has touched through EPIC E (`app/industries/`, `app/sitemap.ts`, `app/_components/TrophyFooter.tsx`, `components/industry/`, `lib/industries/`, `lib/analytics.ts`); same out-of-scope pre-existing errors as Gate A–D (`Testimonials.tsx`, `case-studies/page.tsx`, `AnimatedBackground.tsx`, `Authority.tsx`, `AutomationSystems.tsx`, `ConversionHub.tsx`, `Results.tsx`, `NoiseField.tsx`), undisturbed and out of scope per rule 6. `validate:content` still reports 0 industries — expected, IND tickets not started.

## Doc 2 — Content & industries (begin only after IMS-050)
- [ ] IND-000 · Synthetic dataset generator
- [ ] IND-001 · Mortgage & Finance Brokers (`mortgage-brokers`, amber, FCA)
- [ ] IND-002 · Wealth Management & IFAs (`ifas-wealth-managers`, emerald, FCA)
- [ ] IND-003 · Law Firms (`law-firms`, indigo, SRA)
- [ ] IND-004 · Executive Search & Recruitment (`executive-search-recruitment`, violet, ICO)
- [ ] IND-005 · Commercial Insurance Brokers (`commercial-insurance-brokers`, sky, FCA)
- [ ] IND-006 · M&A Advisory & Business Brokers (`ma-advisory-business-brokers`, rose, ICO)
- [ ] IND-007 · Commercial Property (`commercial-property`, teal, ICO)
- [ ] IND-008 · Accountancy Firms (`accountancy-firms`, orange, ICO)
- [ ] IND-009 · B2B SaaS (`b2b-saas`, cyan, ICO)
- [ ] IND-010 · Private Healthcare Groups (`private-healthcare-groups`, fuchsia, CQC)
- [ ] IND-011 · Hub page `/industries` content
- [ ] IND-012 · Final content QA (`docs/content-qa.md`)

## EPIC F — QA & launch gates (all P0)
- [ ] IMS-060 · Playwright smoke suite (all 10 slugs + hub)
- [ ] IMS-061 · Lighthouse CI (`docs/lighthouse-report.md`)
- [ ] IMS-062 · Schema & meta validation
- [ ] IMS-063 · Cross-device manual pass (`docs/qa-device-matrix.md`)
- [ ] IMS-064 · Launch — preview deploy only, report URL + gate results. **Do NOT promote to production** (user approves manually, overrides Doc 1's own text).

## Global Definition of Done
- [ ] `tsc --noEmit`, `lint --max-warnings 0`, `validate:content`, `build`, `test:e2e` all green
- [ ] Every AC in every ticket checked
- [ ] No TODOs except flagged sample-report PDFs (IMS-026)
- [ ] Every demo carries synthetic-data badge; compliance copy matches Doc 2 §3 verbatim

## Open decisions carried forward
- **IMS-026 Resend path — resolved:** no `RESEND_API_KEY`/SDK wiring built. The route validates, rate-limits, and `console.log`s the request, returning `{ success: true }` — matching the ticket's own text and the EPIC F launch-gate note that the PDFs themselves are the one flagged post-launch TODO. Sending a real email is deferred until the PDFs exist to send.
- **netlify.toml vs Vercel:** flagged for confirmation only before IMS-064 preview deploy.
