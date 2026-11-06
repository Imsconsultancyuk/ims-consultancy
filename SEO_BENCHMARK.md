# SEO_BENCHMARK: Intel Made Simple (intelmadesimple.com)

Status: COMPLETE for the maker pass, 2026-10-28 (SERP evidence, scorecard, gap plan, gate cell, owner-input list). Awaiting the independent scoring pass.
Gate V5 cell: **BLOCKED (independent pass 2026-10-28): Us 3.38 vs strongest competitor 3.65 to 3.70, delta -0.27 to -0.32, gate needs +0.50 (>= 4.15 to 4.20). Hard-fail flag on unverifiable social proof (see §10).** Scores in §3 remain "maker estimate" and carry no verdict authority (kernel §9A C2); the verdict authority is §10.
Run date: 2026-10-28. Market: UK, language en-GB.

## §0 Scope

| Item | Value |
|---|---|
| Client | Intel Made Simple (UK revenue recovery and AI consultancy for professional firms) |
| Domain | https://intelmadesimple.com |
| Dev server measured | http://localhost:3200 (dev mode inflates timings; production numbers will be better) |
| Routes in scope | /, /services/*, /industries/*, /insights/*, /guides/* (new), /pricing, /process, /tools, /faq, /about, /case-studies, /reviews, /contact, /ai-policy, /privacy, /terms |
| Previous independent pass | 3.05 (us) vs 3.45 (strongest competitor), gap -0.40. Gate needs +0.50. |

## §1 Target query set (16 queries, UK Bing, cc=GB, setlang=en-GB)

Informational: 9 of 16 (56%, above the 40% floor). Commercial: 7.

| # | Query | Intent |
|---|---|---|
| 1 | unbilled WIP law firm UK | informational |
| 2 | what are lock-up days law firm | informational |
| 3 | how to reduce lock-up days professional services UK | informational |
| 4 | revenue leakage professional services firm | informational |
| 5 | chasing late invoices UK late payment interest professional firm | informational |
| 6 | UK GDPR AI client data law firm ICO | informational |
| 7 | AI billing review unbilled time capture law firm | informational |
| 8 | revenue leakage accountancy practice UK unbilled WIP | informational |
| 9 | how to recover unpaid invoices UK business late payment act | informational |
| 10 | revenue recovery consultancy UK professional firms | commercial (niche) |
| 11 | law firm WIP recovery consultant UK | commercial (niche) |
| 12 | AI readiness audit UK small business | commercial |
| 13 | AI consultant for law firms UK | commercial |
| 14 | AI second opinion consultant review AI quote small business UK | commercial |
| 15 | AI training for staff workshop UK professional services firm | commercial |
| 16 | AI enquiry response law firm leads speed to lead UK | commercial |

## §2 Competitor set, by actual SERP position

Method: Playwright against Bing (cc=GB, setlang=en-GB), top 10 organic results per query, Bing redirect `u` parameter base64-decoded to the real URL. Raw data: scratchpad `seo3/serp.json` (16 queries, 160 result rows). Google was not scrapeable; Bing is a proxy and is also the index behind several AI answer engines.

### Top 3 per query (verbatim from serp.json)

| Query | #1 | #2 | #3 |
|---|---|---|---|
| unbilled WIP law firm UK | writford.co.uk/platform/wip-report | accountantsforsolicitors.co.uk/law-firm-lockup-guide | firmrix.com/learn/legal/unbilled-wip |
| what are lock-up days law firm | lawware.co.uk/blog/lock-up-are-you-cracking-the-wip | avenueconsulting.uk/lock-up-days-and-why-they-matter | ilfm.org.uk (lockup management in law firms) |
| reduce lock-up days professional services UK | adfin.com (reduce lock-up and debtor days) | lawfirmambition.co.uk (utilisation and lock-up) | ilfm.org.uk |
| revenue leakage professional services firm | infinitygroup.co.uk (hidden cost of revenue leakage) | mca.org.uk (5 ways to identify leaks) | birdviewpsa.com |
| chasing late invoices UK | tinytax.co.uk/guides/late-payment-charges | xero.com/uk/guides/late-payment-interest | tinytax.co.uk/guides/chasing-late-payments |
| UK GDPR AI client data law firm ICO | ico.org.uk (guidance on AI and data protection) | ico.org.uk (AI hub) | adliora.com |
| AI billing review unbilled time capture | chronexa.io | aimadefor.com | miranow.ai |
| revenue leakage accountancy UK WIP | brightsg.com | patronaccounting.com | accountingforeveryone.com |
| recover unpaid invoices UK | franklins-sols.co.uk | legallift.co.uk | drnlaw.co.uk |
| revenue recovery consultancy UK professional firms | recoverprofit.co.uk/about | recoverprofit.co.uk | revenuebase.ai directory |
| law firm WIP recovery consultant UK | recoveryfirst.co.uk (insolvency practitioner) | recoveryfirst.co.uk news | stewartslaw.com |
| AI readiness audit UK small business | augustova.co.uk | fekitech.co.uk | learn.bluecanvas.ai |
| AI consultant for law firms UK | aiconsultation.co.uk | theaiconsultancy.ai | clintonai.co.uk |
| AI second opinion / review AI quote | expertsure.com | septemai.com | lilachbullock.com |
| AI training workshop UK professional services | ip-four.co.uk | generativ.co.uk | aielevate.co.uk |
| AI enquiry response law firm speed to lead | auctaai.co.uk | lexsentinel.ai | imsupporting.com |

Not present in any top 10 of any of the 16 queries: intelmadesimple.com. Bing's index also still holds retired brand titles for the domain (checked in the harvest), so new titles need recrawl time.

### Observations that shape the plan

1. The informational head terms (lock-up, WIP, late payment) are owned by practitioner bodies and niche advisers (ILFM, Kreston Reeves, Writford, Accounts for Lawyers) plus GOV.UK. Beating them needs original, UK-specific, source-cited depth, not thin posts.
2. The niche commercial query "revenue recovery consultancy UK professional firms" returns only generic profit-recovery, debt-collection and directory pages. No direct competitor ranks. This is the open lane and the reason the guides and service pages target it.
3. "AI consultant for law firms UK" is crowded with AI consultancies and "best of" listicles; we do not compete on that term with listicle volume.

### Scored competitor set (key pages fetched and measured)

Pages were fetched live with Playwright on 2026-10-28 (metrics in scratchpad `seo3/comp.json`). Chosen because they are the strongest ranking pages on the lock-up / WIP / GDPR-for-law-firms cluster that our guides target.

| ID | Page | Words | H2s | JSON-LD types | Author schema | Published / modified | CLS | LCP (ms) | llms.txt | Scripts |
|---|---|---|---|---|---|---|---|---|---|---|
| A | ilfm.org.uk lock-up management blog | 993 | 4 | none | n/a | no date | 0.199 | 1348 | 404 | 12 |
| B | accountsforlawyers.co.uk lock-up reduction | 1962 | 20 | Organization, WebSite, BlogPosting, WebPage, FAQPage, BreadcrumbList | Organization @id | 2026-04-01 / same | 0.120 | 400 | 200 | 59 |
| C | writford.co.uk UK GDPR and AI guide | 1707 | 6 | Organization, WebSite, Article, WebPage, BreadcrumbList, FAQPage | Organization @id | 2026-05-19 / 2026-08-07 | 0 | 1180 | 200 | 35 |
| C2 | writford.co.uk WIP report (product page) | 762 | 6 | Organization, WebSite, WebPage, BreadcrumbList, FAQPage | none | none | 0 | 364 | 200 | 29 |
| D | infinitygroup.co.uk revenue leakage | 3301 | 40 | Article, WebPage, WebSite, Organization, Person | Person | 2026-10-12 / 2026-10-15 | 0 | 208 | 200 | 37 |
| E | krestonreeves.com lock-up management | 2457 | 32 | Article, WebPage, BreadcrumbList, AccountingService, Person | Person | 2026-06-04 | 0 | 1332 | 200 | 51 |
| F | lawware.co.uk lock-up and cracking the WIP | 727 | 14 | Article, WebPage, BreadcrumbList, Organization, Person | Person | 2023-03-01 / 2025-06-02 | 0.001 | 1408 | 200 | 44 |

Competitor facts worth acting on:
- Only B and C ship hreflang en-GB. Only B, C and C2 define an Organization with a stable @id and reference it from the Article author.
- Authority links: A 0, B 0, C 0, D 0, E 0, F 1 outbound link to a named authority (lawsociety.org.uk). Every competitor page here cites almost nothing. Original guides that cite 5 to 10 primary sources (GOV.UK, SRA, ICO, legislation.gov.uk, NBER) beat the whole set on E-E-A-T citation without any invented credentials.
- Depth: D (3301) and E (2457) are the depth ceiling; A (993) and F (727) are thin. Our 1,200-1,800 word guides sit in the middle of the field by length and must win on sourcing and structure.
- Raw CWV: all measured pages are production sites; our dev-mode numbers are not comparable (see §7).

## §3 Scorecard (maker estimate, no verdict authority)

Scale 0 to 5 per dimension; weighted total = sum(weight x score) / 100, so the result is also 0 to 5. Competitor scores come from the measured pages in §2 (comp.json), not from assumption. Us scores come from the 58-page live audit of http://localhost:3200 (after3.json). Scored by the same pass that made the fixes, so every number below is intent-adjacent and must be re-scored independently (§9A C2).

| Dimension | Wt | Us | A ilfm | B accts4lawyers | C writford | D infinity | E kreston | Evidence for Us |
|---|---|---|---|---|---|---|---|---|
| Technical foundation | 10 | 4.0 | 3.0 | 4.0 | 4.0 | 4.0 | 4.0 | 58/58 canonical, hreflang en-GB, og:image, no noindex, real 404 status, sitemap 58/58 with lastmod, robots states AI crawlers allowed, llms.txt. Held at 4 because production indexing is unverified and flagship pages are static HTML. |
| Core Web Vitals | 10 | 3.0 | 2.5 | 3.0 | 4.0 | 4.5 | 3.5 | Dev-mode Lighthouse mobile: home perf 55 (LCP 3.7 s, TBT 1250 ms, CLS 0.015), guide page perf 85 (LCP 0.9 s, TBT 540 ms, CLS 0). Dev inflates both; production not measured. Scored on the unverified side. |
| Structured data | 10 | 4.5 | 1.0 | 4.0 | 4.0 | 4.0 | 4.0 | One graph per page, one Organization node (`#organization`, ProfessionalService as extra type) on 58/58 pages, 0 alternateName, 300 nodes, 0 orphan refs, 0 invalid JSON-LD blocks. Article + nested BreadcrumbList on all 5 guides, author = Organization @id, `citation` arrays. FAQ/HowTo 99/99 items match visible text. |
| Topical coverage | 15 | 3.5 | 3.5 | 3.0 | 3.5 | 3.0 | 3.0 | 5 guides + hub (WIP, lock-up, late payment law, AI billing review, UK GDPR and AI), 20 sourced insight summaries, 10 industry pages, 7 service pages. Covers 8 of the 9 informational queries in §1 with a dedicated page. Zero SERP presence yet, so held at 3.5. |
| Content depth / E-E-A-T | 15 | 3.0 | 2.0 | 3.5 | 3.0 | 4.5 | 4.0 | Guides are 1,254 to 1,498 words and cite 3 to 9 primary sources each (GOV.UK, legislation, regulators, studies); competitors cite 0 to 1. Depth ceiling is D (3,301 words) and E (2,457). No named human author, bio or credentials (blocked, §5), so author E-E-A-T is capped. |
| AEO / GEO | 15 | 3.5 | 1.5 | 3.5 | 3.5 | 3.5 | 3.0 | llms.txt with guides block, AI crawlers allowed on all public pages, 14 FAQPage pages with visible-match answers, one HowTo, dated guides with `dateModified`, cited sources. Not 4+ because no AI-engine citation of the domain has been observed. |
| Internal linking | 10 | 4.0 | 3.0 | 3.0 | 3.5 | 3.0 | 3.5 | Hub-and-spoke from `lib/seo/links.ts`: every industry and service page links to 2 insights, 1 guide, a tool anchor, /pricing and /guides; every insight links to its spokes; sitemap and llms.txt list the guides. links.mjs reports no orphans. |
| Accessibility | 5 | 4.0 | 3.0 | 3.0 | 3.0 | 3.0 | 3.0 | Lighthouse a11y 100 on the sampled guide; home not scored by the maker pass. |
| Conversion | 5 | 4.0 | 2.0 | 3.0 | 4.0 | 3.5 | 4.0 | Published prices, free Leak Scan CTA on every page, contact path from every spoke. |
| Entity / off-page | 5 | 1.5 | 4.5 | 3.0 | 3.0 | 3.5 | 4.0 | Absent from the top 10 of all 16 queries; no sameAs, no founder bio, testimonials without named sources (§5). |

| Weighted total (maker estimate) | Us | A | B | C | D | E |
|---|---|---|---|---|---|---|
| Score | **3.53** | 2.48 | 3.35 | 3.55 | **3.70** | 3.55 |

Arithmetic for Us: 40 + 30 + 45 + 52.5 + 45 + 52.5 + 40 + 20 + 20 + 7.5 = 352.5, divided by 100 = 3.53. Arithmetic for D: 40 + 45 + 40 + 45 + 67.5 + 52.5 + 30 + 15 + 17.5 + 17.5 = 370 = 3.70.

Strongest competitor: D (infinitygroup.co.uk, revenue leakage) at 3.70. Required for the gate: Us >= 4.20. Maker-estimate gap: -0.17. Gap to gate: 0.67.

Movement against the previous independent pass (Us 3.05, strongest 3.45): Us +0.48 on the maker's scale; competitors were re-measured on seven fetched pages this run, which raised the strongest competitor from 3.45 to 3.70. Part of the closing gap is therefore a re-baselined bar, not only our progress.

## §4 Notes on method and limits

1. Bing stands in for Google (Google was not scrapeable from this machine). Position claims about Google are not made.
2. All Us timings are dev-mode (`next dev` on :3200). Dev compiles on demand and ships unminified bundles, so home TBT 1250 ms and LCP 3.7 s overstate production. No production Lighthouse run exists yet; run one after deploy and re-score the CWV row.
3. Third-party JS: there is none to defer. The only external requests on the sampled pages are Google Fonts (1 stylesheet, 2 font files, about 95 KB); there are no analytics, chat, tag-manager or pixel scripts. The home page TBT is first-party bundle cost, which the SEO pass did not change (no component edits allowed).
4. Lighthouse 13.6.0 mobile emulation, Playwright Chromium 1248. The `render-blocking-resources` audit key no longer exists in Lighthouse 13, so that audit was not read.
5. The /faq and /contact "no WebPage node" lines in the validator are a regex limitation: those pages publish FAQPage and ContactPage nodes in the same graph.
6. `public/flagship/{index,tools,faq,contact}.html` carry title, hreflang and Organization-node edits made by hand. These four pages are produced by a sync script (`C:/Users/Admin/Documents/Projects (IMS Consultancy)/homepage-redesign/flagship-preview/build/sync-to-live.mjs`, outside this repo, not edited by this pass). If the sync source is run again, the same edits must exist in its templates or the title, hreflang and unified Organization node revert. Mirror them before the next sync.

## §5 Gap plan and blocked-by-owner-input

Fixes completed this pass are listed in §8. What still separates Us from the gate:

| Gap | Blocked by | Score impact (maker estimate) | Action |
|---|---|---|---|
| Founder bio, photo and credentials on /about and in the `#founder` Person node | Owner supplies facts | Depth/E-E-A-T +0.5 (x15 = +0.075), Entity +0.5 (x5 = +0.025): about +0.10 | Add a visible bio, link `author` of guides to the Person after approval |
| sameAs profiles (LinkedIn, Google Business Profile, Companies House) | Owner supplies URLs and confirms they exist | Entity +1.5 (x5 = +0.075), Structured data +0.25 (x10 = +0.025): about +0.10 | Add to the single Organization node; nothing is invented |
| Named sources for the testimonials on /reviews | Owner supplies names, roles, consent | Depth/E-E-A-T +0.25 (x15 = +0.04), Entity +0.5 (x5 = +0.025): about +0.06 | Add `Review` schema only with named, visible sources |
| Production CWV evidence | Deploy and a Lighthouse run | CWV +1.0 if production passes (x10 = +0.10) | Re-measure after deploy |
| SERP presence and AI-engine citations | Time and recrawl | Topical +0.5 (x15 = +0.075), AEO +0.5 (x15 = +0.075), Entity +0.5 (x5 = +0.025): about +0.18 | Re-run serp.mjs 4 to 6 weeks after indexing |

If all five land in full: 3.53 + 0.10 + 0.10 + 0.06 + 0.10 + 0.18 = 4.07, which is still below 4.20. Closing the rest needs depth the field does not have: an original UK data asset (for example a sourced benchmark built from real client or public data) that moves Depth and Topical to 4.5. That is a content decision for the owner, not something to invent.

## §6 Gate cell (kernel §10 V5)

| Check | Maker reading | Gate |
|---|---|---|
| Competitors identified by actual SERP position | Yes, 16 queries, 160 rows | pass condition met |
| Our weighted score >= strongest competitor + 0.5 | 3.53 vs 3.70, gap -0.17 | NOT met on the maker estimate |
| Any dimension scoring 0 | None (lowest: Entity 1.5) | clear |
| Technical foundation >= 4 | 4.0 | clear (at the floor) |
| Fabricated entity | None added; sameAs, reviews, bios left out | clear |
| Thin programmatic pages | 58 pages; shortest guide 1,254 words; insights are 20 individually sourced summaries | clear on the maker read |

**Gate V5: BLOCKED, see §10 for the independent verdict.** (Superseded text follows.) On the maker estimate the score condition fails; the independent pass should expect to confirm a fail unless the owner-input items in §5 and a production CWV run land first.

## §8 Changes this pass: before and after (audit of http://localhost:3200)

| Measure | Before | After |
|---|---|---|
| Pages audited (HTTP 200) | 52 | 58 |
| /guides hub and 5 guides | /guides returned 404 | 200, 6 pages |
| Titles outside 45-60 chars | 40 of 52 | 0 of 58 |
| Descriptions outside 120-160 chars | 20 of 52 | 0 of 58 |
| Duplicate titles / descriptions | 0 / 0 | 0 / 0 |
| Pages without hreflang en-GB | 52 of 52 | 0 of 58 |
| Pages without canonical, og:image, or with noindex | 0 / 0 / 0 | 0 / 0 / 0 |
| Sitemap lastmod | 52 pages, one identical date | 58 pages, 3 real dates (2026-10-23 pages, 2026-10-27 guides, 2026-10-28 link additions) |
| Organization definitions per page | 1 (already one @id); 52 definitions across 52 pages | 1 on 58 of 58 pages; ProfessionalService as extra @type; 0 alternateName |
| Invalid JSON-LD blocks | 0 | 0 |
| JSON-LD nodes (graph total) | not tallied | 300 across 58 pages |
| FAQ/HowTo items not matching visible text | 0 | 0 of 99 |
| Pillar guides | 0 | 5 (1,498 / 1,254 / 1,357 / 1,254 / 1,408 words) |
| Spoke links added to service and industry pages | none | 7 service + 10 industry pages carry RelatedReading |
| 404 status for unknown route | 404 | 404 |
| `tsc --noEmit` | not run | exit 0, no output |

Guides (published 2026-10-27, Article + BreadcrumbList, author = Organization, sources are primary):

| Slug | Words | Sources cited |
|---|---|---|
| /guides/unbilled-wip-uk-law-firms | 1,498 | 4 |
| /guides/lock-up-days-explained | 1,254 | 3 (ILFM, GOV.UK late payment, GOV.UK interest) |
| /guides/chasing-late-invoices-uk-late-payment-law | 1,357 | 9 |
| /guides/ai-billing-review-professional-firms | 1,254 | 4 |
| /guides/uk-gdpr-ai-client-data | 1,408 | 9 |

Changed files (project-relative):

| File | Change |
|---|---|
| `lib/guides/guides.ts`, `app/guides/page.tsx`, `app/guides/[slug]/page.tsx`, `app/guides/GuideBody.tsx` | NEW: guides data, hub, article route |
| `lib/seo/links.ts`, `app/_components/RelatedReading.tsx`, `lib/insights/spokes.ts` | NEW: hub-and-spoke link map, component, insight spokes |
| `app/_components/JsonLd.tsx`, `components/industry/JsonLd.tsx` | Unified Organization graph, WebPage with nested breadcrumb |
| `app/_components/ServiceDetail.tsx`, `app/industries/[slug]/page.tsx`, `app/services/{ai-automation,seo,custom-software,strategic-advisory}/page.tsx`, `app/insights/[slug]/page.tsx` | Related-reading sections, titles |
| `app/layout.tsx`, `app/page.tsx`, `app/faq/page.tsx`, and 22 other page files under `app/` | Titles, descriptions, OG titles, canonical + `languages: en-GB` |
| `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt` | Real lastmod, guides entries, AI-crawler policy comment, guides block |
| `lib/services/catalog.ts`, `lib/insights/posts.ts`, `lib/industries/data/{commercial-insurance-brokers,private-healthcare-groups}.ts` | Title and description rewrites |
| `public/flagship/{index,tools,faq,contact}.html` | Title, hreflang, unified Organization node (see §4 item 6) |

Process disclosure: several mechanical bulk edits to existing files (the hreflang `languages` insertion across 25 page files, insight title shortening) were applied by node, sed and one earlier python read-modify-write script rather than the Edit tool.

## §9 Verdict

Maker estimate: Us 3.53 against 3.70 for the strongest competitor, short of the 4.20 gate by 0.67. Confidence 75% that the independent pass also reports a fail, because the largest open levers (entity signals, founder identity, production CWV, SERP presence) depend on owner input or on time and are not in the code. Confidence 85% that technical, structured-data and internal-linking rows hold under independent scoring, since they rest on counted audit output. The niche commercial lane (revenue recovery consultancy for UK professional firms) has no direct competitor in the top 10, which is the realistic place to gain rank once the pages are indexed.

## §7 Evidence log

| Artifact | Location |
|---|---|
| UK Bing SERP harvest, 16 queries | scratchpad `seo3/serp.json`, script `seo3/serp.mjs` |
| Competitor page metrics | scratchpad `seo3/comp.json`, script `seo3/measure.mjs` |
| Baseline audit of our pages (before) | scratchpad `seo3/before.json`, script `seo3/audit.mjs` |


## §10 Independent V5 pass (kernel §9A C2), 2026-10-28

Scorer: independent pass, did not make the site or write §1 to §9. Target: production build at http://localhost:3100. Evidence scripts live in the session scratchpad `seo-indep/` (crawl.mjs, links.mjs, comp.mjs, cwv.cjs, axe.cjs, sim.mjs).

### Gate cell

| Item | Result |
|---|---|
| Independent weighted score, Us | **3.38** |
| Strongest competitor | **3.65** (Kreston Reeves, independently fetched and scored). Infinity Group (maker's D) is 3.70 on the maker's figures; my fetch of its blog returned 403, so I could not re-verify it and carry it as the conservative bar. |
| Delta | **-0.27** vs Kreston Reeves, **-0.32** vs Infinity (maker figure). Gate needs +0.50. Shortfall to gate: 0.77 to 0.82. |
| Hard fail: any dimension 0 | None (lowest is Entity at 1.5) |
| Hard fail: technical foundation below 4 | Clear, at the 4.0 floor |
| Hard fail: fabricated entity | **FLAG, treated as fail until resolved.** /reviews publishes six unnamed testimonials while /about says "We will not invent client logos, reviews or case studies", /case-studies and llms.txt say none of the cases are clients, and the identity relaunched 2026-05-22. The home hero says "Trusted by top partners for big-brand work" with no named partner. /tools says "Registered with the ICO" for every sector with no registration number. None is verifiable from the site. 70% confidence these are leftover or unverifiable copy rather than provable fabrication. |
| Hard fail: thin programmatic pages | Not a fail, a risk. 20 insight pages run 250 to 320 words (each a distinct credited third-party source, honestly labelled). 10 industry pages are about 1,600 words with sector-specific tools: acceptable. |
| **Gate V5** | **BLOCKED.** Score condition fails and the fabricated-entity flag is open. Confidence 90%. |

### Independent scorecard (0 to 5)

| # | Dimension | Wt | Us | Kreston Reeves | Avenue | Evidence |
|---|---|---|---|---|---|---|
| 1 | Technical foundation | 10 | 4.0 | 4.0 | 3.5 | 58/58 URLs 200; titles 45-60 and descriptions 120-160 on 58/58; 0 duplicates; self-canonical and hreflang en-GB 58/58; one H1 each; 0 invalid JSON-LD; real 404 route; 0 orphans; depth max 3. Held at 4.0: sitemap has only 3 distinct lastmod dates, four flagship pages are static HTML synced from outside the repo, and the live domain is stale (production sitemap 29 URLs, /guides 404), so indexability of this build is unproven. |
| 2 | Core Web Vitals | 10 | 3.5 | 3.5 | 3.0 | Playwright on the production build, unthrottled localhost, 5 routes: LCP 76 to 1,276 ms, CLS 0 to 0.017, 280 to 543 KB. Local lab flatters LCP; no INP, no throttle, no field data. Competitor figures are the maker's fetches. |
| 3 | Structured data | 10 | 4.0 | 4.0 | 3.5 | One `#organization` node (Organization + ProfessionalService) on 58/58, `#founder` Person, WebSite, WebPage, Article + BreadcrumbList with `citation` arrays on guides, FAQPage on 14, no Review or AggregateRating. Docked: no `sameAs`, locality-only address, guide author is the Organization. |
| 4 | Topical coverage | 15 | 3.5 | 3.5 | 3.0 | 5 guides + hub, 20 insights, 10 industry, 7 service pages. Covers WIP, lock-up, late payment, AI billing review, UK GDPR. Missing: accountancy debtor-days/WIP guide, renewal-leakage guides for brokers/IFAs, a revenue-leakage pillar, a benchmark. |
| 5 | Depth and E-E-A-T | 15 | 2.5 | 4.0 | 3.0 | All 24 unique outbound sources return 200 (legislation.gov.uk, GOV.UK, SRA, ICO, NBER, HBS, ILFM, Legal Futures); late-payment figures match the Act. Docked hard: no named author or reviewer on any guide, no founder bio or credentials, six anonymous testimonials that contradict the site's own integrity claims, 20 short summaries of other publishers. KR: named partner author, regulated firm, 2,301 words, dated. |
| 6 | AEO / GEO | 15 | 3.5 | 3.0 | 3.0 | llms.txt live, AI crawlers allowed, definitional lead paragraph per guide, worked examples with assumptions. Docked: 0 tables across the 5 guides, topic-label H2s not questions, no FAQ block on guides, llms.txt carries stale generic boilerplate. KR: 4 tables. Avenue: no llms.txt. |
| 7 | Internal linking | 10 | 4.0 | 3.5 | 3.0 | 0 orphans, depth 0/1/2/3 = 1/14/37/6 pages, guides have 5 to 22 inbound links, RelatedReading on 17 pages. Weak: /services/seo, /services/custom-software, /industries/private-healthcare-groups have 1 inbound link each. |
| 8 | Accessibility | 5 | 3.0 | 3.0 | 3.0 | axe-core (wcag2a/aa, 2.1 aa, 2.2 aa), 14 pages: 9 clean; serious on 5: `listitem` on /pricing (10 nodes), /about (8), /services/ai-readiness-audit (4); `aria-hidden-focus` on /tools (4); `color-contrast` on /industries/law-firms (8), /case-studies (5), /services/ai-readiness-audit (1). Competitors untested, neutral 3.0. |
| 9 | Conversion path | 5 | 3.5 | 4.0 | 3.5 | Free Leak Scan CTA on every page, published prices, qualifying contact form. No analytics or conversion tracking; form submission not exercised by this pass. |
| 10 | Entity and off-page | 5 | 1.5 | 4.5 | 3.0 | No sameAs, no Google Business Profile evidence, no founder page, absent from every SERP observed. KR is an established regional firm. |

| Weighted total | Us | Kreston Reeves | Avenue |
|---|---|---|---|
| Score | **3.38** | **3.65** | **3.13** |

Arithmetic (weight x score): Us 40 + 35 + 40 + 52.5 + 37.5 + 52.5 + 40 + 15 + 17.5 + 7.5 = 337.5. Kreston Reeves 40 + 35 + 40 + 52.5 + 60 + 45 + 35 + 15 + 20 + 22.5 = 365. Avenue 35 + 30 + 35 + 45 + 45 + 45 + 30 + 15 + 17.5 + 15 = 312.5.

Difference from the maker's 3.53: E-E-A-T 3.0 to 2.5, CWV 3.0 to 3.5 (measured on the production build), structured data 4.5 to 4.0, accessibility 4.0 to 3.0 (axe), conversion 4.0 to 3.5.

### SERP observations (this pass)

Method: WebSearch (US-based) for 6 queries plus Bing UK (cc=GB) for 4; two Bing queries returned junk and are not used.

| Query | Domains observed |
|---|---|
| unbilled WIP law firm UK | vjmglobal.com, leanlaw.co, lawscot.org.uk, userdocs.wolterskluwer.co.uk |
| lock-up days law firm | swgroup.com, oddr.com, legl.com, lawgazette.co.uk, ilfm.org.uk, legalbusiness.co.uk, law.com |
| what are lock-up days law firm (Bing UK) | lawware.co.uk, avenueconsulting.uk, ilfm.org.uk, lawfirmambition.co.uk, alto-accounting.com, krestonreeves.com, swgroup.com, lawsociety.org.uk |
| revenue recovery professional services UK | foulger-underwood, begbies-traynor, wilkinsonread.co.uk, accountancyage.com |
| revenue recovery consultancy UK professional firms (Bing UK) | recoverprofit.co.uk, revenuebase.ai, caatalyst.com, commercialrecoverybureau.co.uk, basisrecovery.com, profitconnect.co.uk: generic profit-recovery and debt firms, none serving professional firms specifically |
| chasing late invoices UK late payment | crunch.co.uk, tinytax.co.uk, novuna.co.uk, gocardless.com, shuttleglobal.com, moneyweek.com |
| AI billing review unbilled time capture law firm | enterprisedna.co, pointone.com, alanet.org, caretlegal.com, timesolv.com |
| accountancy practice debtor days WIP revenue leakage UK | accountingweb.co.uk, accountancyage.com, content.iris.co.uk, lexisnexis.com, xero.com |

intelmadesimple.com appeared in none of them. My lock-up query corroborates the maker's §2 harvest (lawware, avenueconsulting, ilfm, krestonreeves, swgroup). The niche "revenue recovery for UK professional firms" has no direct competitor in the top 10, which is the real opening, and it is unproven because the live domain does not yet serve this build.

Competitor pages fetched: krestonreeves.com lock-up (2,301 words, 4 tables, named author, Person + AccountingService schema, llms.txt 200, 0 authority links); avenueconsulting.uk lock-up (2,752 words, 11 H2, BlogPosting, author "admin_mary", no llms.txt). Measured, not scored in full: oddr.com (2,254 words, 7 tables, FAQPage), swgroup.com (994 words, no schema), ilfm.org.uk (898 words, 10 authority links), lawware.co.uk (1,234 words, dated 2023).

### Fixes ranked

Code or copy, no owner input (about +0.39, to about 3.77):
1. Remove or noindex /reviews and the six anonymous testimonials; delete "Trusted by top partners for big-brand work"; drop "Registered with the ICO" until a number exists. Clears the hard-fail flag (+0.04).
2. Guides: question-shaped H2s, a key-figures table and an FAQ block each, refresh llms.txt (+0.08).
3. Publish 4 to 5 sourced guides (accountancy debtor days and WIP, renewal leakage for brokers and IFAs, a revenue-leakage pillar) and deepen the five existing ones past 2,000 words (+0.12).
4. Fix the five axe-failing pages (+0.05).
5. Real per-page lastmod, inbound links to the three low-inbound pages, merge or noindex the 20 thin insights into a few analysed pieces (+0.05).
6. Visible byline or reviewer block reusing the existing founder name, no invented credentials.
7. Deploy, then run throttled Lighthouse on production (+0.05).
8. Conversion tracking if consent policy allows (+0.025).

Blocked on owner input (about +0.65 to +0.70): founder bio, photo and credentials with a personal byline (+0.15 to +0.20); sameAs, Google Business Profile, Companies House (+0.15); named and consented testimonials, or confirmation the current ones are real (+0.08); an original sourced UK data asset such as a lock-up benchmark (+0.20); backlinks and SERP presence over time (+0.08).

Code-only ceiling is about 3.75 to 3.80, still about 0.4 short of the gate. Both groups together reach about 4.4, which clears it.
