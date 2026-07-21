# IMS Industry Pages — System Build Brief (Doc 1 of 2)

**Project:** 10 industry landing pages + hub on intelmadesimple.com
**Executor:** Claude Code (senior developer mode)
**Architect:** This document is the source of truth. Doc 2 (`02-IMS-Industry-Content-Pack.md`) contains all content, copy, synthetic data, and per-industry demo scripts. Doc 1 builds the machine; Doc 2 fills it.

---

## 0. How to execute this brief

1. Work tickets in ID order. Dependencies are listed; never start a ticket whose deps aren't done.
2. Every ticket has Acceptance Criteria (AC). A ticket is not done until every AC passes.
3. After each EPIC, run: `pnpm tsc --noEmit && pnpm lint --max-warnings 0 && pnpm build`. Zero errors, zero warnings, or stop and fix.
4. Doc 2 tickets (IND-000 → IND-012) begin after IMS-050 is complete.
5. Never mark the project done until every gate in EPIC F passes.

---

## 1. Architecture decisions (locked — do not revisit)

- **AD-1 Config-driven pages.** One page template at `/industries/[slug]`, driven entirely by typed config objects. Zero per-industry JSX. Ten pages = ten config files.
- **AD-2 Build-time content validation.** All configs validated with Zod during build. Invalid content fails the build. This is the "no errors on the site" mechanism.
- **AD-3 Demos are deterministic simulations.** No live AI calls, no real file uploads, no network requests. Every demo is a scripted state machine keyed to a sample-file ID. Instant, free, cannot fail, cannot hallucinate.
- **AD-4 No real data ingestion on the marketing site.** Drag-and-drop accepts only the provided synthetic sample chips. A visible badge on every demo: "Synthetic demonstration data". This is a GDPR decision, not a styling one.
- **AD-5 Static generation.** All industry pages are SSG (`generateStaticParams`). Interactive components are client islands (`"use client"`) mounted inside server-rendered pages.
- **AD-6 Stack additions kept minimal.** Tailwind + Framer Motion + Zod + schema-dts. No UI kit unless one already exists in the repo.
- **AD-7 Accessibility is scoped in, not bolted on.** Keyboard operation, `prefers-reduced-motion`, `aria-live` on demo results, visible focus states. Tickets include these in AC.
- **AD-8 UK English everywhere.** Optimise, personalised, £.
- **AD-9 Honest compliance language.** "GDPR-safe architecture", "identifiers never reach the AI model". Never "fully GDPR compliant" as an absolute claim. Doc 2 contains the approved copy — do not improvise stronger claims.

---

## 2. Route & file map (target state)

```
app/
  industries/
    page.tsx                    # Hub (IMS-054)
    [slug]/
      page.tsx                  # Template (IMS-050)
      opengraph-image.tsx       # Per-slug OG image (IMS-053)
  sitemap.ts                    # Updated (IMS-055)
lib/industries/
  types.ts                      # IMS-010
  schema.ts                     # Zod (IMS-011)
  index.ts                      # Loader + registry (IMS-012)
  data/
    mortgage-brokers.ts         # IND-001 … one file per industry
    …(10 files)
  demo-data/
    generate.ts                 # IND-000 dataset generator
    *.json                      # Generated synthetic result payloads
components/industry/
  SectionShell.tsx  IndustryHero.tsx  StatChips.tsx  PainGrid.tsx
  ToolGrid.tsx  ToolCard.tsx  FlowInfographic.tsx  ResultsBlock.tsx
  PackageBlock.tsx  FAQAccordion.tsx  CTASection.tsx  JsonLd.tsx
  PrivacyShield.tsx  TokenizationToggle.tsx
  demo/
    useDemoMachine.ts  SampleFileChip.tsx  DropZone.tsx
    PipelineRail.tsx  ResultsPanel.tsx  LiveDemoPlayer.tsx
lib/analytics.ts                # IMS-004
tests/e2e/industries.spec.ts    # IMS-060
```

---

## 3. Design system (locked direction)

**Concept: "Ledger & Signal."** These pages sell the ability to find money hidden in professional firms' books. The design encodes that: calm, paper-precise content surfaces (the ledger) wrapped around dark instrument panels where the demos run (the signal). The contrast between the two IS the message: your business on paper vs. what the machine sees in it.

- **Palette (fallback if repo tokens are absent — IMS-002 decides):**
  - `--paper` #F7F6F2 (content background)
  - `--ink` #101418 (demo panels, footer)
  - `--line` #D8D5CC (hairlines on paper)
  - `--signal` per-industry accent (from config `accent`; used ONLY for live data, counters, result highlights — never decoration)
  - `--positive` #1F8A5D (recovered-revenue figures)
- **Type:** Display — Space Grotesk (600/500, tight tracking, used sparingly: H1, section H2s, big counters). Body — Inter (400/500). Data/counters — JetBrains Mono with `font-variant-numeric: tabular-nums` (non-negotiable for animated numbers; proportional digits jitter).
- **Signature element (spend all boldness here):** the **Pipeline Rail** — the demo's horizontal stage track with a moving progress head and mono counters ticking up, sitting inside the dark panel like trading-desk instrumentation. Everything else stays quiet and disciplined.
- **Motion rules:** one orchestrated moment per section max. Demo animations are functional (they show processing), not decorative. Scroll reveals: fade+8px rise, 300ms, once. All motion gated behind `prefers-reduced-motion` (reduced = skip to final states, counters render final values instantly).
- **Numbers style:** £ figures always mono, always tabular, positive findings in `--positive`. Numbers are the heroes of these pages; treat them typographically as such.
- **What to avoid:** cream+serif+terracotta template look, near-black+acid-green template look, gradient text, glassmorphism, decorative numbered markers where order carries no meaning.

---

## EPIC A — Foundation

### IMS-001 · Repo audit & integration plan — P0 · 2pts · deps: none
**Context:** intelmadesimple.com already exists. This build integrates; it does not replace.
**Do:** Inventory framework (expect Next.js App Router on Vercel), Tailwind version and config, existing fonts/design tokens, existing components worth reusing (nav, footer, buttons), routing conventions, analytics already installed. Write findings to `docs/industry-pages-audit.md` with an explicit integration decision list.
**AC:** ☐ Audit doc exists ☐ Decision recorded for: token reuse vs. §3 fallback, nav/footer reuse, analytics reuse ☐ If the repo is NOT App Router, stop and produce a migration note before continuing.

### IMS-002 · Design tokens — P0 · 3pts · deps: IMS-001
**Do:** Merge §3 into the repo's system. Extend `tailwind.config` with `paper/ink/line/positive` + a `signal` color map keyed by industry accent names (amber, emerald, indigo, violet, sky, rose, teal, orange, cyan, fuchsia). Load Space Grotesk + Inter + JetBrains Mono via `next/font` (subset latin, `display: swap`). Add utility class `.num` (mono + tabular-nums).
**AC:** ☐ Tokens compile ☐ Fonts load with zero CLS ☐ A `/dev/tokens` scratch page renders palette + type scale for visual check (delete before launch).

### IMS-003 · Dependencies & strictness — P0 · 1pt · deps: IMS-001
**Do:** Add `framer-motion`, `zod`, `schema-dts`. Ensure `"strict": true` in tsconfig. ESLint configured to fail on warnings. Add scripts: `"validate:content": "tsx lib/industries/validate-run.ts"`, and chain it into `"build"`.
**AC:** ☐ `pnpm build` runs validation first ☐ Strict mode on with zero suppressions added.

### IMS-004 · Analytics events — P1 · 1pt · deps: IMS-001
**Do:** `lib/analytics.ts` exposing `track(event, props)` wired to whatever the audit found (Vercel Analytics / Plausible / GA4). Events used across the build: `demo_armed`, `demo_file_dropped`, `demo_completed`, `tool_card_view`, `privacy_toggle_used`, `package_cta_clicked`, `book_call_clicked`, `sample_report_requested`. Include `{ industry, tool }` props.
**AC:** ☐ Events fire in dev console stub ☐ No-ops safely if no provider present.

---

## EPIC B — Content system

### IMS-010 · Type system — P0 · 2pts · deps: IMS-003
**Do:** Create `lib/industries/types.ts` exactly:

```ts
export type Regulator = "FCA" | "SRA" | "CQC" | "ICO";
export type Accent = "amber"|"emerald"|"indigo"|"violet"|"sky"|"rose"|"teal"|"orange"|"cyan"|"fuchsia";

export interface Stat { value: string; label: string }
export interface Pain { title: string; cost: string; line: string }

export interface DemoStage {
  key: "ingest" | "detect" | "score" | "draft";
  label: string;        // shown on the pipeline rail
  detail: string;       // one-line sub-caption while running
  durationMs: number;   // 1200–2200 typical
}
export interface DemoMetric { label: string; value: string; emphasis?: boolean }
export interface DemoScript {
  sampleFile: { id: string; label: string; type: "csv" | "pdf"; meta: string };
  stages: [DemoStage, DemoStage, DemoStage, DemoStage];
  result: { headline: string; metrics: [DemoMetric, DemoMetric, DemoMetric]; solution: string };
}
export interface Tool {
  id: string; name: string;
  problem: string;      // one line, ≤110 chars
  outcome: string;      // one line, ≤110 chars
  demo: DemoScript;
}
export interface Faq { q: string; a: string }

export interface Industry {
  slug: string; name: string; shortName: string;
  regulator: Regulator; regulatorLine: string;
  accent: Accent;
  meta: { title: string; description: string };
  hero: { h1: string; sub: string; stats: [Stat, Stat, Stat] };
  pains: [Pain, Pain, Pain];
  tools: [Tool, Tool, Tool];
  results: { heading: string; before: string; after: string; metrics: [DemoMetric, DemoMetric, DemoMetric] };
  package: { heading: string; includes: string[]; timeline: string; anchor: string };
  faqs: [Faq, Faq, Faq, Faq, Faq];
  related: [string, string];
}
```
**AC:** ☐ Compiles under strict ☐ Tuple types used as shown (they enforce content completeness at compile time).

### IMS-011 · Zod schema + build gate — P0 · 2pts · deps: IMS-010
**Do:** Mirror the interfaces in `lib/industries/schema.ts` with refinements: slug is kebab-case; meta.title ≤ 60 chars; meta.description 120–160 chars; problem/outcome ≤ 110 chars; every `related` slug exists in the registry; total stage duration 5–9s; all 10 accents unique across industries. `validate-run.ts` parses every config and exits non-zero with a readable table of failures.
**AC:** ☐ Deliberately broken config fails `pnpm build` with a clear message ☐ All refinements above implemented.

### IMS-012 · Registry & loader — P0 · 1pt · deps: IMS-011
**Do:** `lib/industries/index.ts` exports `industries: Industry[]` (import all data files), `getIndustry(slug)`, `industrySlugs`. Wire `generateStaticParams` usage notes for IMS-050.
**AC:** ☐ Registry typed, ordered as listed in Doc 2 ☐ Unknown slug → `notFound()` behaviour documented for the page ticket.

---

## EPIC C — Component library
Every component: server component unless stated; props typed from IMS-010; mobile-first; visible focus states; no fixed heights that break with longer strings.

### IMS-020 · SectionShell — P0 · 1pt · deps: IMS-002
Standalone section wrapper giving every block its own identity: `id`, optional eyebrow, H2, max-w-6xl, consistent vertical rhythm (py-16 mobile / py-24 desktop), optional `tone="paper" | "ink"`. All sections on the page render inside SectionShell — this is what makes each section standalone and anchor-linkable.
**AC:** ☐ Anchors scroll correctly under any sticky nav ☐ Ink tone flips text tokens automatically.

### IMS-021 · IndustryHero + StatChips — P0 · 2pts · deps: IMS-020
H1 (Space Grotesk, max 2 lines), sub, primary CTA "See it run on sample data" (smooth-scrolls to demo zone), secondary "Book 20 minutes". Three StatChips: `.num` values, small labels, subtle rise-in on load.
**AC:** ☐ LCP element is the H1 text, not an image ☐ CTA scroll works with keyboard focus moved to target.

### IMS-022 · PainGrid — P0 · 1pt · deps: IMS-020
Three cards: title, cost figure (mono, `--signal`), one line. No icons unless the repo already has a set — hairline-ruled cards on paper.
**AC:** ☐ Equal-height without fixed heights ☐ Stacks to single column <640px.

### IMS-023 · ToolCard + ToolGrid — P0 · 2pts · deps: IMS-020
Each tool = one card: name, problem line, outcome line, "See it run →" button which (a) scrolls to the demo zone, (b) pre-arms that tool's sample file via demo context. Cards carry `id={tool.id}` for deep links and H3s for SEO. Fires `tool_card_view` on first intersection.
**AC:** ☐ Deep link `/industries/x#maturity-radar` lands on the card ☐ Pre-arm wiring verified with IMS-042.

### IMS-024 · FlowInfographic — P1 · 2pts · deps: IMS-020
The "how it works" diagram, generic across industries: five nodes (Your book → Tokenise → AI engine → Findings → Revenue actions) connected by an animated dashed flow line (SVG, `stroke-dashoffset` loop, paused off-screen, disabled under reduced motion). Zero paragraphs — node labels only.
**AC:** ☐ Pure SVG/CSS, no canvas ☐ Legible at 360px wide (nodes stack vertically).

### IMS-025 · ResultsBlock — P1 · 1pt · deps: IMS-020
Before/after strip + three metrics from `results`. Metrics use `.num`, count up on first view (600ms, reduced-motion → instant).
**AC:** ☐ Counts run once, not per scroll ☐ Screen readers get final values only (`aria-hidden` on animator, static value in `sr-only`).

### IMS-026 · PackageBlock + lead magnet — P1 · 2pts · deps: IMS-020, IMS-004
Includes list, delivery timeline, price anchor line, primary CTA (book call link from repo config), secondary: "Email me the sample report" → inline email field → POST `/api/sample-report` → Resend sends the industry PDF (PDFs are a post-launch asset; endpoint returns success and logs for now, flagged with TODO). Honeypot field + basic rate limit.
**AC:** ☐ `sample_report_requested` tracked ☐ Endpoint validates email server-side ☐ No layout shift when field opens.

### IMS-027 · FAQAccordion — P0 · 1pt · deps: IMS-020
Native `<details>/<summary>` styled — no JS state. Content from config; must mirror JSON-LD (IMS-052) exactly.
**AC:** ☐ Keyboard + screen-reader clean ☐ First item open by default.

### IMS-028 · CTASection — P0 · 1pt · deps: IMS-020
Ink panel: "This was synthetic data. Yours will be better." + book-call CTA + one reassurance line (from GDPR master copy). Fires `book_call_clicked`.
**AC:** ☐ Contrast AA on ink ☐ Single link target sitewide (config constant).

### IMS-029 · PrivacyShield + TokenizationToggle — P0 · 3pts · deps: IMS-020
The GDPR section (sits directly after the demo zone). Left: approved copy from Doc 2 §3 + regulator line from config + four trust chips. Right: the animated vault sequence — a record card with obviously-fictional fields (Jane Exampleton · jane@sample.demo · DOB 04/1981 · POLICY-88213) slides into a "Tokenisation Vault" lock, fields flip to `CLIENT_0047 / EMAIL_0047 / DOB_0047 / POLICY_0047`, tokenised card exits to "AI engine", loops. **TokenizationToggle:** a two-state switch "Your view / What the AI sees" that flips the card raw↔tokenised; fires `privacy_toggle_used`.
**AC:** ☐ Loop pauses off-screen ☐ Reduced motion → static two-card comparison ☐ Copy matches Doc 2 verbatim (no improvised claims) ☐ Toggle keyboard-operable.

### IMS-030 · IndustryNav (sticky section nav) — P2 · 1pt · deps: IMS-020
Slim sticky bar appearing after hero: Tools · Live demo · Data protection · Results · Package · FAQ. Highlights active section (IntersectionObserver).
**AC:** ☐ Doesn't overlap anchors ☐ Hidden <768px (mobile gets more scroll room).

---

## EPIC D — Demo engine (the product's centrepiece)

### IMS-040 · useDemoMachine — P0 · 3pts · deps: IMS-010
**Do:** A reducer-based hook, one instance per page, provided via context so ToolCards can pre-arm it.

States & transitions:
```
idle ──ARM(toolId)──▶ armed ──DROP/RUN──▶ processing ──stages complete──▶ complete
armed ──DISARM──▶ idle          complete ──RESET──▶ armed (same tool)
processing: advances through stages[0..3] on timers (durationMs each);
            exposes { stageIndex, stageProgress 0–1 } for the rail
```
Rules: ignore ARM/DROP while processing; timers cleaned on unmount; `reducedMotion` flag collapses all durations to 0 and jumps to complete; every transition calls `track()` (IMS-004).
**AC:** ☐ Unit-tested reducer (vitest): happy path, double-drop ignored, reset, reduced-motion path ☐ No timer leaks (assert with fake timers).

### IMS-041 · SampleFileChip — P0 · 2pts · deps: IMS-040
Draggable chip per tool: file icon, `label`, `meta` ("240 clients"), badge "Synthetic sample". Desktop: HTML5 drag (`draggable`, sets `dataTransfer` with sampleFile.id). Mobile/touch + keyboard: chip is a button — tap/Enter = ARM then RUN (no drag needed). Armed chip gets `--signal` ring.
**AC:** ☐ Works with drag on desktop Chrome/Safari/Firefox ☐ Tap-to-run on iOS Safari ☐ Enter/Space runs via keyboard ☐ Badge always visible.

### IMS-042 · DropZone + PipelineRail — P0 · 3pts · deps: IMS-041
DropZone: dashed target, "Drop a sample file to watch the tool work", highlights on dragover, accepts only known sampleFile ids (anything else → shake + "Use one of the sample files provided — we never take real data here"). On valid drop: RUN.
PipelineRail (the signature): horizontal 4-stage track inside the ink panel; progress head moves per `stageProgress`; active stage label + detail line; a mono counter ticks (records processed) synced to stage timing; subtle scanline shimmer on the active segment only.
**AC:** ☐ Real OS files rejected with the exact message above (and never read) ☐ `dragover` default prevented so the browser never opens files ☐ 60fps on mid-range mobile (transform/opacity only) ☐ `aria-live="polite"` announces stage labels.

### IMS-043 · ResultsPanel — P0 · 2pts · deps: IMS-042
On complete: panel slides up inside the ink theatre — result.headline (Space Grotesk), three metrics (mono count-up 600ms, `emphasis` metric in `--positive`), solution line, then two CTAs: "Book 20 minutes — run it on your book" (primary, `book_call_clicked`) + "Run another tool" (RESET, returns focus to chips). Synthetic-data badge persists in the corner.
**AC:** ☐ Focus moves to headline on reveal ☐ `aria-live` announces headline + metrics once ☐ Metrics exactly match Doc 2 numbers (validated content, no hardcoding).

### IMS-044 · LiveDemoPlayer — P0 · 2pts · deps: IMS-043
The auto-running loop shown above the drag-drop zone: cycles tools[0→1→2] continuously — chip glides into the zone, pipeline runs (compressed 0.6× durations), results flash 2.5s, next tool. Pauses off-screen (IntersectionObserver) and on hover/focus. Caption: "Live demonstration — synthetic data. Drag a file below to drive it yourself." Reduced motion: static composite showing one finished result per tool in tabs.
**AC:** ☐ Never runs off-screen (battery) ☐ User interaction with the manual zone pauses the player ☐ Zero interference between player state and user machine state (separate instances).

### IMS-045 · Demo a11y & touch hardening — P0 · 1pt · deps: IMS-041–044
Full keyboard pass; contrast on ink ≥ AA; hit targets ≥44px; iOS Safari + Android Chrome manual pass; `prefers-reduced-motion` verified end-to-end.
**AC:** ☐ Checklist in ticket completed and recorded in `docs/qa-demo-a11y.md`.

---

## EPIC E — Page assembly & SEO

### IMS-050 · Industry page template — P0 · 3pts · deps: EPIC C+D complete
Assemble `/industries/[slug]/page.tsx` in this exact section order (each in SectionShell):
1 Hero → 2 The Leaks (PainGrid) → 3 Tool Grid → 4 Live Demo (LiveDemoPlayer) → 5 Drag-and-Drop Zone → 6 **Data Protection (PrivacyShield)** → 7 FlowInfographic → 8 ResultsBlock → 9 PackageBlock → 10 FAQ → 11 CTASection.
`generateStaticParams` from registry; unknown slug → `notFound()`.
**AC:** ☐ Renders fully from one config with zero page-level conditionals per industry ☐ Section order exactly as above ☐ All anchors present: `#tools #demo #data-protection #results #package #faq`.

### IMS-051 · Metadata — P0 · 1pt · deps: IMS-050
`generateMetadata` from config: title, description, canonical `https://intelmadesimple.com/industries/[slug]`, OpenGraph + Twitter card pointing at IMS-053 image.
**AC:** ☐ Unique title/description per page (Zod already enforces lengths) ☐ Canonicals absolute.

### IMS-052 · JSON-LD — P0 · 2pts · deps: IMS-050
`JsonLd.tsx` using `schema-dts`, injected per page: `Service` (name = "AI Revenue Recovery for {industry}", provider = IMS `Organization`, areaServed GB), `FAQPage` (mirrors the five FAQs verbatim), `BreadcrumbList` (Home → Industries → {industry}).
**AC:** ☐ Validates in Google Rich Results test with zero errors ☐ FAQ text is single-sourced from config (impossible to drift).

### IMS-053 · OG images — P1 · 2pts · deps: IMS-051
`opengraph-image.tsx` per slug via `next/og`: ink background, industry name in Space Grotesk, one headline metric from the first tool's result, IMS wordmark, accent bar in the industry's signal colour. 1200×630.
**AC:** ☐ Renders <1s at build ☐ Text never overflows for the longest industry name.

### IMS-054 · Hub page `/industries` — P0 · 2pts · deps: IMS-050
Intro block (copy in Doc 2 §IND-011), grid of 10 industry cards (name, one-line leak statement, top-tool chip, accent edge), each linking to its page. Its own metadata + `CollectionPage` JSON-LD.
**AC:** ☐ All 10 present in registry order ☐ Card links crawlable `<a>` elements.

### IMS-055 · Sitemap, robots, internal links — P0 · 1pt · deps: IMS-054
Add hub + 10 slugs to `sitemap.ts`. Footer gains an "Industries" column (all 10). Each industry page links its two `related` industries in the CTA section footer line.
**AC:** ☐ `curl /sitemap.xml` lists 11 new URLs ☐ Related links render from config.

### IMS-056 · Performance budget — P0 · 2pts · deps: IMS-050
Budgets: LCP < 2.5s mobile, CLS < 0.05, JS on industry route < 180KB gz. Dynamic-import LiveDemoPlayer, DropZone, PrivacyShield, FlowInfographic (all below fold) with sized skeletons. Fonts preloaded via `next/font`. No images above the fold (type-led hero).
**AC:** ☐ `next build` route size within budget ☐ Skeletons prevent CLS (verified in Lighthouse trace).

---

## EPIC F — QA & launch gates (all P0)

### IMS-060 · Playwright smoke suite — 3pts · deps: IMS-050, IND-001…010
For every slug: page 200s; H1 matches config; console has zero errors/warnings; click first tool's "See it run" → demo zone armed; trigger RUN → results headline appears with the config's exact text; FAQ toggles; all anchor links resolve. One extra spec: dropping a fake OS file shows the rejection message.
**AC:** ☐ `pnpm test:e2e` green across all 10 slugs + hub ☐ Runs in CI before deploy.

### IMS-061 · Lighthouse CI — 2pts
Mobile emulation on 3 representative slugs + hub: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
**AC:** ☐ Scores recorded in `docs/lighthouse-report.md`.

### IMS-062 · Schema & meta validation — 1pt
Rich Results test all three JSON-LD types on 3 slugs; verify unique titles/descriptions across all 11 pages (script it: crawl build output, assert uniqueness).
**AC:** ☐ Zero schema errors ☐ Uniqueness script green.

### IMS-063 · Cross-device manual pass — 2pts
Matrix: iOS Safari, Android Chrome, desktop Chrome/Safari/Firefox at 360/768/1280/1536. Focus areas: chip tap-to-run on touch, drag on desktop, reduced-motion mode, ink-section contrast, no horizontal scroll at 360px.
**AC:** ☐ Matrix table completed in `docs/qa-device-matrix.md`, all cells pass.

### IMS-064 · Launch — 1pt
Preview deploy → run F gates against preview → promote to production → submit updated sitemap in Google Search Console → verify all 11 URLs return 200 in production → delete `/dev/tokens`.
**AC:** ☐ All boxes ticked, launch note written in `docs/launch.md`.

---

## Global Definition of Done
- `tsc --noEmit`, `lint --max-warnings 0`, `validate:content`, `build`, `test:e2e` — all green.
- Every AC in every ticket checked.
- No TODOs left except the flagged sample-report PDFs (IMS-026).
- Every visible demo carries the synthetic-data badge; compliance copy matches Doc 2 verbatim.

*End of Doc 1. Proceed to Doc 2 for all content, data, and per-industry implementation tickets.*
