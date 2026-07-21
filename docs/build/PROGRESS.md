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
- [ ] IMS-020 · SectionShell
- [ ] IMS-021 · IndustryHero + StatChips
- [ ] IMS-022 · PainGrid
- [ ] IMS-023 · ToolCard + ToolGrid
- [ ] IMS-024 · FlowInfographic
- [ ] IMS-025 · ResultsBlock
- [ ] IMS-026 · PackageBlock + lead magnet (Resend decision: proceeding with net-new minimal integration per user authorization — reconfirm at implementation)
- [ ] IMS-027 · FAQAccordion
- [ ] IMS-028 · CTASection
- [ ] IMS-029 · PrivacyShield + TokenizationToggle
- [ ] IMS-030 · IndustryNav (sticky section nav)

**Gate C:** `tsc --noEmit && lint --max-warnings 0 && build` — ☐ green

## EPIC D — Demo engine
- [ ] IMS-040 · useDemoMachine
- [ ] IMS-041 · SampleFileChip
- [ ] IMS-042 · DropZone + PipelineRail
- [ ] IMS-043 · ResultsPanel
- [ ] IMS-044 · LiveDemoPlayer
- [ ] IMS-045 · Demo a11y & touch hardening (`docs/qa-demo-a11y.md`)

**Gate D:** `tsc --noEmit && lint --max-warnings 0 && build` + vitest unit tests — ☐ green

## EPIC E — Page assembly & SEO
- [ ] IMS-050 · Industry page template ← unlocks IND tickets
- [ ] IMS-051 · Metadata
- [ ] IMS-052 · JSON-LD
- [ ] IMS-053 · OG images
- [ ] IMS-054 · Hub page `/industries`
- [ ] IMS-055 · Sitemap, robots, internal links
- [ ] IMS-056 · Performance budget

**Gate E:** `tsc --noEmit && lint --max-warnings 0 && validate:content && build` — ☐ green

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
- **IMS-026 Resend path:** proceeding with (a) net-new minimal Resend integration using `RESEND_API_KEY`, per "follow everything to the T" authorization. Not yet an explicit "(a)" confirmation from Adam — flag again when this ticket is reached.
- **netlify.toml vs Vercel:** flagged for confirmation only before IMS-064 preview deploy.
