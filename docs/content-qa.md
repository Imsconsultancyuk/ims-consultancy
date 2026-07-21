# IND-012 · Final content QA

Recorded 2026-07-21, against all 10 registered industries (`lib/industries/data/*.ts`) plus the hub page (`app/industries/page.tsx` / `lib/industries/config.ts`). Source of truth for wording: `docs/build/02-IMS-Industry-Content-Pack.md` (Doc 2).

## 1. UK-English spellcheck

- [x] Grepped `lib/industries/`, `app/industries/`, `components/industry/` for common US spellings (`tokenize(d)`, `optimize(d)`, `personalize(d)`, `color`, `organize(d)`, `analyze(d)`, `behavior`, `center`, `license`, `defense`, `customize(d)`, `labeled`, `modeling`, `traveled`, `fulfillment`, `recognize`).
- Result: every hit was a CSS/Tailwind class name or a legitimate DOM/CSS API property (`style.color`, `justifyContent`, `ScrollIntoViewOptions.behavior`), never prose copy. Zero US spellings in user-facing text.
- Confirmed 38 correct UK-spelled `"tokenised"` occurrences across the 10 data files.

## 2. Number-consistency audit

Each industry's `results.metrics[0]` (the emphasised total) was checked against the sum of its three tools' `demo.result.metrics` emphasis values, excluding non-monetary emphasis metrics (counts/times) where the industry total is itself monetary — this mirrors the worked example in Doc 2 IND-012 item 2 (mortgage-brokers: 43,400+29,150+24,850=£97,400).

| Industry | Tool emphasis values | Sum | Results total | Match |
|---|---|---|---|---|
| mortgage-brokers | £43,400 + £29,150 + £24,850 | £97,400 | £97,400 | ✓ |
| ifas-wealth-managers | £38,400/yr + £57,200 + (£9.6m AUM, excluded — assets, not fee opportunity) | £95,600 | £95,600 | ✓ |
| law-firms | £186,300 + £47,200 + £83,600 | £317,100 | £317,100 | ✓ |
| executive-search-recruitment | £54,000 + (27, count, excluded) + (4 min, excluded) | £54,000 | £54,000+ | ✓ (`+` correctly signals partial-tool coverage) |
| commercial-insurance-brokers | £74,000 + £52,300 + (6 min, excluded) | £126,300 | £126,300 | ✓ |
| ma-advisory-business-brokers | 67 + 38 + 12 (all counts, no monetary emphasis) | 117 | 117 | ✓ |
| commercial-property | £96,400 + (23, count, excluded) + (90 sec, excluded) | £96,400 | £96,400+ | ✓ (`+` correctly signals partial-tool coverage) |
| accountancy-firms | £142,000 + £38,200 + (11→3 days, excluded) | £180,200 | £180,200 | ✓ |
| b2b-saas | £186,000 + £23,400 + £96,000 | £305,400 | £305,400 | ✓ |
| private-healthcare-groups | £96,000 + £8,550 + (14, count, excluded) | £104,550 | £104,550 | ✓ |

- [x] All ten Results-block totals verified as internally consistent derivations of their tool results.

## 3. Claims audit

- [x] Grepped for banned absolute-compliance language (`fully gdpr compliant`, `guarantee(d)`, `rank(ing) on google`, `#1 on google`, `top of google`, promised AI-search rankings) across all industry copy and the hub — zero matches.
- [x] `GDPR_COPY` (`lib/industries/config.ts`) compared line-by-line against Doc 2 §3 master copy — eyebrow, heading, body, toggle labels, trust chips (4), and footnote all match verbatim, including the preserved em dash in the body line.
- [x] All 10 `regulatorLine` values compared against Doc 2 §3's four regulator lines (FCA/SRA/CQC/ICO) — every industry's line matches its regulator's canonical text verbatim, correctly paired (FCA: mortgage-brokers, ifas-wealth-managers, commercial-insurance-brokers; SRA: law-firms; CQC: private-healthcare-groups; ICO: executive-search-recruitment, commercial-property, accountancy-firms, b2b-saas, ma-advisory-business-brokers).

## 4. Synthetic-fiction audit

- [x] Scanned all 10 data files for plausible real company-name patterns (`... LLP/Ltd/Group/Partners/Associates/& Co`) — zero matches. No named individuals or specific real companies appear anywhere in hero/pain/tool/demo/FAQ copy; all figures are counts/values with no attached fictional identity, so Doc 2 §1 rule 9 ("fictional names must be unmistakably fictional") has nothing to violate by construction.
- [x] "What data do you need?" / "Does it work with our systems?" FAQ answers reference only real third-party product/system names as genuine integration points (Stripe, LinkedIn Recruiter, Dentally, SOE Exact, Pabau, Semble) — expected and correct, not fictional demo entities.
- [x] Synthetic-data badge confirmed present on every demo surface: `LiveDemoPlayer` ("Live demonstration — synthetic data" strap + "Synthetic demonstration data" badge, rendered twice for pre/post states), `ResultsPanel` ("Synthetic demonstration data"), `SampleFileChip` ("Synthetic sample"), `CTASection` ("This was synthetic data. Yours will be better."), and the hub's reassurance line. These are shared components rendered identically for all 10 industries, so coverage is structural, not per-file.

## 5. Meta audit

Automated length + uniqueness check across all 10 industry `meta.title`/`meta.description` plus the hub's `HUB_COPY.meta`:

| Page | Title (≤60) | Description (120–160) |
|---|---|---|
| accountancy-firms | 57 ✓ | 159 ✓ |
| b2b-saas | 50 ✓ | 143 ✓ |
| commercial-insurance-brokers | 59 ✓ | 140 ✓ |
| commercial-property | 58 ✓ | 149 ✓ |
| executive-search-recruitment | 58 ✓ | 146 ✓ |
| ifas-wealth-managers | 55 ✓ | 158 ✓ |
| law-firms | 51 ✓ | 159 ✓ |
| ma-advisory-business-brokers | 54 ✓ | 148 ✓ |
| mortgage-brokers | 58 ✓ | 155 ✓ |
| private-healthcare-groups | 60 ✓ | 159 ✓ |
| industries hub | 56 ✓ | 150 ✓ |

- [x] All 11 titles unique, all 11 descriptions unique (script cross-checked with `Set` dedup, zero collisions).
- [x] All 11 within Zod's enforced bounds (`meta.title` ≤60, `meta.description` 120–160 inclusive; hub isn't Zod-validated since it's outside `IndustrySchema`, so this manual pass is its only gate).

## 6. Read-aloud pass

- [x] Grepped every hero `h1`/`sub` and every `results.heading`/`package.heading` for Doc 2 §1's banned verbs (`leverage`, `unlock`, `supercharge`) — zero matches across all 10 industries and the hub.
- [x] Grepped for exclamation marks across all data files and config — zero matches (Doc 2 §1 rule 1).
- [x] Spot-read every hero `h1` line: all ten are sentence case, name what the reader controls (client book, renewal book, candidate database, diary system, etc.), and lead with the reader's own numbers rather than adjectives — consistent with rules 2, 4, 5, 10.
- [x] Spot-read every `results.heading`/`package.heading`: sentence case throughout, no filler ("What a 350-client base gave back", "The Practice package") — no word that doesn't earn its place.

## Zod + generator equality check

- [x] `npm run typecheck` — clean.
- [x] `npx eslint lib/industries app/industries components/industry --max-warnings 0` — clean.
- [x] `npm run validate:content` — "validate:content — 10 industries valid."
- [x] `npx vitest run` — 12/12 passing.
- [x] `npm run build` — clean; statically generates all 10 `/industries/[slug]` routes + 10 `/industries/[slug]/opengraph-image` routes via `generateStaticParams`, plus `/industries` hub, undisturbed alongside the rest of the site.

**IND-012 status: all six audits pass, zero findings requiring a content fix.**
