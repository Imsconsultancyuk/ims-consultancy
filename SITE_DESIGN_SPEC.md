# SITE DESIGN SPEC — IMS Consultancy (flagship)

> **Status 2026-10-29: independently scored, 41.5/50, gate V4 cleared narrowly.** §0 rows 1 to 7, §1 to §4 and §6 (except the independent-score row) are written from the design pass of 2026-10-28. §5 is scored by a reviewer who did not produce the work (kernel C2): independent pass 3 on 2026-10-29 scored 41.5/50, after pass 1 at 36/50 and pass 2 at 37/50 (an older score of 34/50 predates both). Confidence 70%, plus or minus 2.5, so the lower bound sits just under the gate.

> **Addendum 2026-11-13 (live at main 781d1ee).** Since the 41.5/50 pass the site gained a 6-step contact funnel, a gated /solutions page (replacing /tools), a glass header with a mauve "Price it" pill, a GSAP footer, and post-enquiry Telegram and WhatsApp links. See §4 (Contact, Solutions, Header and footer). An independent re-score of /solutions, header and footer returned 41.5/50 (gate 40). The /contact sky note, recap card and chat links have **not** been independently scored. Treat the 41.5 as covering everything except those.

> **This is the mandatory design artifact for every IMS web build.** Same filename in every project: `SITE_DESIGN_SPEC.md`, at the project root beside `PROJECT.md`. Kernel §10 gate **V4** blocks "done" on any web build without it completed and independently scored.
>
> **Provenance.** Extracted from `Projects/ah-architects/SITE_PLAN_B_DESIGN.md`, the highest-quality design artifact IMS has produced. Before this template existed, four projects had a design document (1032 / 190 / 120 / 62 lines, three different filenames, three different structures) and four had none. Output quality tracked document depth almost linearly.
>
> **Rule of use.** Delete no section. A section that does not apply is answered "N/A because <reason>", never removed. An empty section is an unmade decision, and unmade decisions are what produce template-looking output.

---

## §0 · SKILL CHAIN — evidence of invocation, not intent

**Naming a skill is not invoking it.** This has now cost three rejected designs. Each row below requires a concrete artifact produced by that step. "Considered" is not an artifact. A row without evidence fails the gate.

| Order | Tool / skill | What it must produce here | Evidence (fill in) |
|---|---|---|---|
| 1 | `open-design` MCP | 3 named reference systems from the 139 installed, and what specifically is being taken from each | 2026-10-28. The MCP exposes design systems only as resources, so the DESIGN.md files were read from disk (`C:/Users/Admin/Downloads/Claude Code Assets/open-design/design-systems/<name>/DESIGN.md`, 140 directories present, the template's "139" is stale). Three read: **stripe** (Fintech): taken, display type at light weight with negative tracking and deep-tinted headings instead of pure black, which matches the tinted-ink rule here (`--color-ink` is plum-tinted, never #000); rejected, the purple gradient accents and blue-tinted multi-layer shadows (kernel O3, and amber is the only accent). **wise** (Fintech): taken, plain-language trust over decoration, one bright accent against near-black/neutral, pill buttons with a physical press (now `scale(0.97)` on `:active`); rejected, the oversized billboard display scale (wrong register for a regulated-practice buyer). **warm-editorial** (Starter): taken, one accent per screen, top-biased heroes that are never vertically centred (the leak line sits above a left-aligned h1), two elevation levels only, no shadow on the hero; rejected, the terracotta serif palette (kernel O3 ban on beige/brass, and the site is one-family Schibsted Grotesk). |
| 2 | Real-screen evidence (Mobbin if licensed, else competitor teardown) | 3+ real products in this category, what each does well, what each gets wrong | 2026-10-28. No Mobbin licence, so competitor teardown by WebFetch of the live home pages. **Limit:** WebFetch returned page text as markdown, so palette, typeface and spacing could NOT be confirmed for any of the three; findings below are structure, copy and CTA pattern only. **faculty.ai** (UK applied-AI): does well, named public-sector proof (NHS, Dstl) and an endorsement from a major lab as trust signals; gets wrong, the headline ("Frontier AI for the frontlines of the world") never says what is sold, "Get started" repeats as the CTA with no path by buyer type, and a "Featured" section rendered broken. **thoughtworks.com** (global consultancy): does well, a stacked text statement ("We don't just do AI / We do AI that works") with a single text-link CTA, restrained; gets wrong, analyst and partner badges stand in for proof, US spelling and no UK signals for a UK regulated buyer. **cognizant.com/uk** (large SI): does well, named UK client tiles (NatWest, AVEVA, OUP) as case proof; gets wrong, H1 "We're an AI Builder" is a label not an offer, four image-led cards with no sector path, and the services enquiry sits behind Alumni and Career Seeker options in the contact form, so a buyer must self-sort past a recruiting menu. **Taken for IMS:** say plainly what is sold in the h1, route by sector ("I am a..." picker and /industries spine), one amber CTA, UK spelling. **Not taken:** badge walls and image-led card quartets. |
| 3 | `design-taste-frontend` | The Design Read: archetype, audience, anti-references | 2026-10-28, Skill tool run (design-taste-frontend). **Design Read:** "Reading this as: B2B consultancy flagship for UK regulated-practice owners (law, accountancy, IFA, brokers), with a dark-plum editorial language with one amber action colour, leaning toward native CSS + Tailwind 4 tokens + restrained scroll motion." Dials: VARIANCE 7, MOTION 5, DENSITY 4 (trust-first lowers motion, marketing page keeps variance). **Mechanical pre-flight run by grep/Playwright against :3200:** em-dash count in app pages and flagship html = 0 (pass); Inter not the face, Schibsted Grotesk is (pass); accent lock = amber CTA, cobalt supporting only (pass); radius lock = 14px containers, round buttons, written rule (pass); nav single line, 64px (pass, seen at 1360 and 390); button contrast and tap targets measured in a11y.js (pass, see §2.1 and §6); three-equal-card rows removed on about, services, ServiceDetail (fixed this pass). **Findings it raised that are NOT fixed:** (a) EYEBROW RESTRAINT fails on /pricing: 6 of 6 sections open with an uppercase tracked label (app/pricing/page.tsx lines 110, 136, 190, 268, 352, 390) against a limit of ceil(6/3)=2; removing them is a text-copy change outside this agent's brief, so it is left for the owner; (b) /case-studies has 8 uppercase labels over 3 sections and /industries 7 over 3, same class; (c) the flagship hero photo slab is a real image in an immutable bundle. Screenshots: scratchpad/design2/after/ (pricing-1360-0.png, services-1360-*.png, about-1360-*.png, home1360-0.png). |
| 4 | `ui-ux-pro-max` | Palette, type pairing, grid, applicable UX rules | 2026-10-28. Skill tool run, then the real CLI: `python scripts/search.py "B2B consultancy professional services trust editorial dark plum amber" --design-system -p "IMS"`, `--domain ux "focus touch reduced motion contrast"`, `--domain typography "grotesk professional services"` (raw output in scratchpad/design2/evidence/uiux-*.txt). **It returned:** pattern Enterprise Gateway (path selection by industry and role, trust signals prominent, Contact Sales primary); style Trust & Authority (credentials, case studies with metrics); palette navy #0F172A + blue CTA #0369A1; type Poppins / Open Sans; avoid "AI purple/pink gradients, hidden credentials". **Taken:** the industry-path selection pattern (already the site's /industries spine and the "I am a..." picker); the checklist. **Rejected, with reason:** blue CTA and navy (the owner rule is amber is the only CTA colour and the brand is plum; a blue CTA would also collide with the cobalt supporting accent); Poppins/Open Sans (a template pairing the search returns for every corporate query; Schibsted Grotesk is kept, it is not Inter and the tool offered no grotesk better suited). **UX rules checked against the live site, measured (a11y.js, Playwright against :3200, 2026-10-28):** (1) contrast 4.5:1, light: 0 failures on /, /pricing, /services, /about, /contact, /faq, minimum ratios 5.51, 5.0, 4.75, 3.04 (about, the 3.04 node is large display text, so the 3:1 bar), 5.51, 5.51; dark: 0 failures on the same six, minima 5.4, 5.79, 4.75, 3.04, 7.96, 7.32. (2) Focus states: ring visible on 12 of 12 tabbed stops on /, /pricing, /services, /about, /contact, /faq, /tools, /industries/law-firms (was 11 of 12 before the skip-link outline fix). (3) Touch 44px at 390 wide: 0 under-44 targets on /pricing, /services, /contact, /faq, /tools, /industries/law-firms; the 2 remaining are the home range slider (324x22, native control) and an in-sentence text link on /about (74x16), both exempt under WCAG 2.5.8; touch spacing 8px not separately measured. (4) No horizontal overflow at 390 on all eight pages. (5) Reduced motion: 0 running animations on seven pages; `/` still reports 1 non-infinite animation, source not identified. **Violations that remain:** on /tools (237 flagged light, 189 dark) and /industries/law-firms (8) the walker flags `dt` metric labels and the `stage-dot num` numerals at 1.44 to 1.62:1. Probe of the ancestor chain: the `dt` sits inside `.t-result` at opacity 0.28 inside `.demo.is-armed`, the flagship's pre-run dim state that resolves to full opacity when the demo plays on scroll. So it is a real state a visitor can see before the demo runs, not a measuring artefact, and I did not fix it because the reveal is set inside an immutable bundle and raising it to a passing level would remove the dim-to-lit reveal itself. Counted as an open finding. |
| 5 | `emil-design-eng` | Motion and interaction governance, Before/After pass | 2026-10-28. Skill tool run, then its review checklist applied by grep over app/globals.css, app/chrome.css, public/flagship/cobalt.css, app/**/*.tsx and components/**. **Frequency test:** header, footer and CTAs are seen constantly, so they get colour and 97% press only, no entrance motion; the leak-line coin plays once per page load (rare, explanatory) and is inside `prefers-reduced-motion: no-preference`. **Before/After table:** (1) `transition-all duration-300` with default ease on 20+ amber CTAs and cobalt outline buttons (app/about, ai-policy, industries, pricing, process, reviews, services/*) → `transition-property: background-color, border-color, color, transform; 180ms cubic-bezier(0.23,1,0.32,1)`, one rule in app/globals.css (unlayered, so it beats the Tailwind utility); measured on /pricing: computed `transition-property` was `all`/`color, background-color, ...` at 0.3s, now `background-color, border-color, color, transform` at 0.18s. (2) No `:active` state on those buttons → `transform: scale(0.97)` on `:active`; measured by holding the mouse down on the first CTA on /pricing: computed transform `matrix(0.97, 0, 0, 0.97, 0, 0)`. (3) Header buttons: `.fx-btn:active, .fx-theme:active { scale(0.97) }` already present in app/chrome.css, `--fx-ease: cubic-bezier(0.23,1,0.32,1)` already the house curve; kept. (4) Hover rules in chrome.css and cobalt.css already sit inside `@media (hover: hover) and (pointer: fine)`; kept. (5) Reduced motion: chrome.css transitions off, leak coin and dept-rail draw gated; reduced-motion probe shows 0 running animations on seven of eight pages, `/` shows 1 unidentified. **Not changed, noted:** `.group:hover` rim and `.ims-flip-card:hover` sweep at app/globals.css lines 846 to 908 sit outside the hover media query, so touch devices get a sticky hover on those cards; the `transition-all duration-500` on the `group` cards in reviews and services/* (decorative, occasional, 500ms) exceeds the 300ms guidance; both left because changing 7 card templates is wider than this pass. Easing curves: Tailwind default `ease` on text links remains (hover colour change, the framework's recommended case). |
| 6 | `impeccable` | Final holistic UI pass | 2026-10-28. Skill tool run with `polish layout typeset` as the target, plus its detector CLI: `npx impeccable` v4.8.0 over the repo (raw: scratchpad/design2/impeccable-cli.json, 75 findings, taken 2026-10-27 before the fixes in this pass). **Disclosure:** no PRODUCT.md and no DESIGN.md exist in this repo, so the skill's setup gate (product context) failed and its `teach` step needs the owner; per the brief this was a report-only critique, not a `craft` run. **CLI findings by type:** bounce-easing advisory 1 (app/globals.css chart wobble, an idle SVG path wobble at 3.5s ease-in-out, inside the reduced-motion gate; not bounce, left); decorative grid-line background advisory 1 (app/globals.css; `.ims-glass-cinema` gradient-text class, grep shows it is referenced by no tsx file, dead CSS, left); hero-eyebrow-chip warning 5 (flagship 404, contact, faq and two more; the tracked-caps label above the h1 is the same copy-owned class as the eyebrow finding in row 3, left for the owner); cramped-padding warning 13 and undersized-ui-text warning 30 and tight-leading warning 19 (all in public/flagship/*.html, compiled bundle CSS, immutable); numbered-section-labels advisory 4, marquee warning 1, marketing-buzzword warning 1 (flagship copy and bundle, not in this agent's scope). **Applied from the skill's layout and typeset passes, seen in screenshots:** card monotony replaced by featured-first grids and ruled lists on /about, /services, ServiceDetail; hero rhythm with the leak line on 9 page types; tap-target and focus fixes; the ladder of display, lead and body kept (Schibsted Grotesk, display 1.5x or more over body). **What I see in the after shots (scratchpad/design2/after/hero_*.png, *-1360.png, *-390.png):** /process hero is left-aligned plum with a thin amber line dropping to a dot above the eyebrow, h1 in two lines, then the step rail with a large amber 01; /industries hero at 1360 leaves the right half of the plum band empty (no image or object), which reads sparse; /reviews at 390 reads cleanly, h1 two lines, card below the fold line; a Next.js dev-tools "N" badge appears bottom-left in every dev screenshot (development only, absent in production). **Open:** the /industries hero empty right half is a composition gap I did not fill, because filling it needs either new copy or a new asset. |
| 7 | Component sources (`~/.claude/UI_COMPONENTS.md`) | For every component in §3: the pasted `shadcn search`/`view` output or registry item path it came from. Hand-builds carry an exemption line in §3. Nothing is written from memory | 2026-10-23. `npx shadcn@latest search @shadcn -q stepper` and `-q timeline`: no stepper or timeline item in the @shadcn registry. `npx shadcn@latest search @react-bits -q step`, `-q scroll`: Stepper, ScrollStack, ScrollReveal, ScrollFloat, Stack found (installable as `@react-bits/<Name>-TS-TW`). Not installed: Stepper is a click-through wizard with its own state, ScrollStack stacks cards over each other and hides earlier steps, which fails the rule that all seven steps stay readable. Ideas taken from both: a progress rail that fills with scroll, and one active step at a time with the others still readable. See §3 exemption. 2026-11-12 (/solutions and /contact funnel): `npx shadcn@latest search @shadcn -q accordion` returned 2 items (@shadcn/accordion ui, @shadcn/accordion-demo example). `npx shadcn@latest search @react-bits -q counter` returned 232 items (Counter-TS-TW among them). Not installed. Accordion: hand-built GSAP Disclosure instead, because the body must stay in the DOM for SEO and screen readers and its height is tweened by GSAP with a reduced-motion fallback. ToolDemo (staged run), LeakBars (charts, each with role=img, aria-label and an sr-only table) and TokenGuard are hand-built because no registry item models a staged file run or the IMS Mono leak chart. SpotlightCard rejected (hex surfaces, rounded-3xl break the shape lock). Counter optional and unused. 2026-11-13 (/solutions staged funnel, header Price it, footer FX): `npx shadcn@latest search @react-bits -q shiny` returned 176 items (ShinyText is text-only; no button cue), `-q pulse` 218 (PulseHeart is a like button, rest are sound effects), `-q ripple` 164 (RippleGrid and RippleDistortion are full-bleed backgrounds, not a button halo). `npx shadcn@latest search @shadcn -q button` returned 33 items (button, button-group, demos; no attention cue). Not installed. MotionCue (amber pill, two GSAP rings, arrow bob; reduced-motion static) hand-built to the shape lock and amber-is-CTA rule. Stage images are existing site assets (`/img/tools-gears-1000.webp`, `/images/industries/*.jpg`), so V4b generation is not triggered. |

**Reference systems chosen:** stripe, wise, warm-editorial · **Why these:** stripe for tinted-ink and display-type discipline in a trust-sold category; wise for plain-language trust with one accent and a physical press; warm-editorial for the one-accent, top-biased, two-elevation composition rules. Competitor set for contrast: faculty.ai, thoughtworks.com, cognizant.com/uk.

---

## §1 · DIRECTION

### 1.1 Archetype
One sentence. Must be specific enough to exclude things. "Clean and modern" is not a direction, it is the absence of one.

> Direction: plum-editorial consultancy for UK regulated-practice owners (law, accountancy, IFA, brokers). Deep plum bands alternate with warm paper, one amber action colour, cobalt kept for links and focus only, one grotesque family doing all the work by weight and scale. Plain-spoken, evidence-led, sold by sector path rather than by capability list. Authored diagrams and a live demo widget over photography.

### 1.2 Anti-references
Name what this must NOT look like. Concrete and specific.

- The faculty.ai pattern: an abstract headline that never says what is sold, with "Get started" repeated as the only CTA.
- The cognizant.com/uk pattern: "We're an AI Builder" as H1, four image-led cards, and an enquiry form that hides the services route behind a recruiting menu.
- The thoughtworks.com pattern: analyst and partner badges standing in for proof, US spelling for a UK buyer.
- The template consultancy with a purple or indigo gradient hero, a glass card grid and an emoji feature row (kernel O3), and the "navy plus blue CTA" corporate default that ui-ux-pro-max returns for every B2B query.
- The beige-and-brass "premium" palette: paper here is a cool-pink off-white (hue 340), not cream, and amber is a CTA fill, not a trim colour.

### 1.3 The signature move
**One decision no competitor has made.** This is the difference between a £2k site and a £10k one.

> Signature: the leak line. A 1px amber hairline hangs from the header into the hero and ends in a 9px amber coin directly above the eyebrow, played once per page load (900ms, `cubic-bezier(0.23,1,0.32,1)`, 350ms delay, only under `prefers-reduced-motion: no-preference`). It is the home hero's rail carried onto nine inner page types through one component (`app/_components/LeakLine.tsx`, CSS `.ims-leak` and `.ims-leak-coin` in `app/globals.css`).> Why it belongs to this client specifically: IMS sells finding where a practice leaks time and money and stopping it. A line dropping to a coin is that sentence drawn, and a rival selling generic "AI transformation" has no leak to draw. It is also one hairline and one dot in the single CTA colour, so it cannot be mistaken for a gradient, blob or glass effect.

**Build order rule.** The signature move is built in the **first** build phase, not the last. Every IMS build that scheduled distinctiveness last and stopped early shipped tokens with no character. Invert it.

### 1.4 O3 compliance
Confirm none of the kernel §13 O3 banned defaults are present: purple/indigo gradient hero · glassmorphism cards · floating-blob backgrounds · emoji feature grids · unmodified shadcn/Inter look · invented social proof.

- [x] Verified absent, 2026-10-28, by grep and by looking at the after screenshots. Evidence: no `backdrop-filter` in app/globals.css, app/chrome.css or public/flagship/cobalt.css (count 0 each); no emoji in app/ or components/ tsx; hero gradients: none (the only linear-gradient on a live element is the 1px leak hairline); Inter is not loaded (Schibsted Grotesk via next/font); no invented social proof added in this pass (no copy was edited). **Caveats, stated rather than hidden:** (1) `.ims-cinema-*`, `.ims-glass-cinema` and `.band-transition` in app/globals.css contain radial-gradient auras and a gradient-text rule, but grep finds them referenced in no tsx, flagship html or lib file, so they are dead CSS and render nowhere; they are left in place because deleting them was outside this pass, and the owner should remove them. (2) Plum (OKLCH hue 322) is a purple-family hue; it is used as a flat band colour and never as a gradient. (3) The flagship hero in public/flagship/index.html carries a real grey photo slab from the immutable bundle, which I could not inspect for compliance beyond seeing it in the screenshots.

---

## §2 · FOUNDATIONS

### 2.1 Colour
Tokens in OKLCH. Every colour states its **job**, not just its value. A colour with no semantic job is decoration and should be cut.

| Token | Value | Job | Where it may appear | Where it may not |
|---|---|---|---|---|
| `--color-paper` / `-soft` / `-pure` | oklch(0.966 0.006 340) / (0.928 0.012 335) / (0.985 0.004 340); dark: 0.2 / 0.255 / 0.235 at hue 320 | Page surface, alternate surface, raised surface | Light bands, cards | Behind amber text |
| `--color-deep` / `-soft` / `-veil` | oklch(0.285 0.05 322) / 0.34 / 0.4 | The plum band: hero, CTA and proof bands. Constant in both themes | Hero, dark bands, footer | Body background in light theme |
| `--color-ink` / `-soft` | oklch(0.255 0.014 320) / (0.44 0.022 320); dark 0.95 / 0.79 | Text. Tinted toward plum, never #000 | All body and headings on paper | On plum bands (use paper-ink) |
| `--color-paper-ink` / `-soft` | oklch(0.965 0.008 330) / (0.84 0.022 325) | Text on plum bands | Inside `.ims-band-dark`, `.bg-deep` | On paper |
| `--color-mauve-50..900` | 50 (0.945) to 900 (0.255), hue 320 to 335 | Borders, rules, quiet labels, muted fills. 50/100/500/700/900 flip in dark; 200/300 stay constant for plum bands | Hairlines, eyebrows, secondary text | As a CTA fill |
| `--color-accent-500` | oklch(0.835 0.171 81.6) | The one call-to-action fill and the leak line. Text on it is `--color-on-amber` oklch(0.24 0.03 70) | Primary buttons, leak line and coin, focus ring on plum | Headings, card borders, decorative fills |
| `--color-accent-700` | oklch(0.5 0.11 75); dark: oklch(0.84 0.15 80) | Amber as text on paper (the readable form) | Eyebrow or figure accents on paper | Button fill |
| `--color-cobalt-*` (`--color-link`, `--color-info`) | link #1e3ea6 light / #8aa9ff dark; info #2a54d4 / #5f86f7 | Quiet supporting accent: inline links, secondary outline buttons, keyboard focus ring on paper, active-nav underline, "sample data" chips | Informational affordances | Any background fill, heading, eyebrow, card border, or CTA |
| `--color-line` | oklch(0.85 0.026 325); dark 0.37 0.03 322 | Table and list rules | Dividers | Text |
| `--color-positive` | #1f8a5d | Result delta in demo | Success figures | Brand accents |
| `--color-signal-*` | ten legacy hues for industry-page charts | Series colour in the industry demo only | Charts | Anywhere else. Legacy tokens kept additive for the industry pages (per the comment in app/globals.css); `signal-fuchsia` #c026d3 and `signal-emerald` are not in the palette's hue family and should be reviewed by the owner |

**Contrast verification (WCAG 2.2 AA):** body text ≥ 4.5:1, large text ≥ 3:1, UI/graphics ≥ 3:1. Record measured ratios, not intentions.

Measured 2026-10-28 with scratchpad/design2/a11y.js (Playwright against :3200, every visible text node, computed colour normalised through canvas, ancestor background resolved). Lowest ratio per page:

| Pair | Measured | Pass |
|---|---|---|
| `/` light, minimum text node | 5.51 | Pass, 0 failures |
| `/pricing` light | 5.0 | Pass, 0 failures |
| `/services` light | 4.75 | Pass, 0 failures |
| `/about` light | 3.04 (large display text, 3:1 bar) | Pass, 0 failures |
| `/contact` light, `/faq` light | 5.51, 5.51 | Pass, 0 failures |
| `/`, `/pricing`, `/services`, `/about`, `/contact`, `/faq` dark | 5.4, 5.79, 4.75, 3.04, 7.96, 7.32 | Pass, 0 failures |
| Focus ring on paper: cobalt #2a54d4 light, #5f86f7 dark; on plum: amber | 5.7:1 light, 5.4:1 dark per the comment in globals.css (not re-measured here) | Pass on the source's own figure |
| `/tools` light 237 nodes, dark 189 nodes; `/industries/law-firms` 8 nodes (`dt` labels and stage numerals) | 1.44 to 1.62 | **FAIL, open.** Real pre-run dim state (opacity 0.28 on `.t-result` inside `.demo.is-armed`), set in the immutable flagship bundle and resolving to full opacity when the demo plays. Not fixed: raising it removes the reveal |

**Theme:** both. Light is the default paper; dark is chosen by the visitor (toggle, key `ims-theme`, applied before first paint by an inline script in app/layout.tsx so there is no flash) or by `prefers-color-scheme`. Dark is not an inversion: surface tokens (paper, ink, mauve 50/100/500/700/900, accent-700, link, info) are re-valued at hue 320, band tokens stay put, so the plum bands read the same in both themes. The reason dark exists is the audience: practice owners reading late, not a house default.

**Contrast verification (WCAG 2.2 AA):** body text ≥ 4.5:1, large text ≥ 3:1, UI/graphics ≥ 3:1. Record measured ratios, not intentions.

| Pair | Measured | Pass |
|---|---|---|
| | | |

**Theme:** light / dark / both. If both, state how each is intentional. Kernel: never default to dark automatically.

### 2.2 Typography

| Item | Decision | Reason |
|---|---|---|
| Family 1 | Schibsted Grotesk, variable 400 to 900 plus italic (`--font-schibsted`, `next/font/google`) | A grotesque with some editorial character; not Inter, not the Poppins/Open Sans pair ui-ux-pro-max returned for every corporate query |
| Family 2 (or "none, and why") | None. `--font-display`, `--font-serif`, `--font-sans` and `--font-industry-display` all point at Schibsted. `--font-mono` is a system stack, used for data only | A second family would add a load cost and a pairing to defend; contrast comes from weight and scale |
| Pairing strategy | One family, three jobs: weight 700 with negative tracking for display, 500 to 600 for subheads, 400 for body. Uppercase tracked 11px labels for eyebrows (limited, see §0 row 3 finding) | Matches the flagship static pages, so Next routes and static pages read as one site |
| Loading (`font-display`, preload, subset) | `display: "swap"`, `subsets: ["latin"]`, `next/font` self-hosts and preloads | No invisible text; latin only is enough for UK copy |

**Scale** — fluid `clamp()`, wide contrast between display and body. Uniform emphasis is what makes a page look templated.

| Step | Value | Use |
|---|---|---|
Values below are the ones used in the page files (grep of `text-[clamp(...)]` in app/page.tsx, pricing, about, services). There is no single global type-scale token set; sizes are set per page, which is a weakness noted in the could-not-fix list.

| Step | Value | Use |
|---|---|---|
| display | `clamp(4.5rem, 10vw, 8rem)` (one use); hero h1 `clamp(2.5rem, 6vw, 4.5rem)` | The 4.5rem to 8rem clamp is a single large-figure use; the 2.5rem to 4.5rem clamp is the /pricing hero h1 (weight 700, leading 1.05, tracking -0.018em) |
| h1 | `clamp(2.5rem, 5.4vw, 4.25rem)` | Inner-page hero headings |
| h2 | `clamp(1.875rem, 3.6vw, 2.75rem)` and `clamp(1.75rem, 3.4vw, 2.5rem)` (seven uses) | Section headings, weight 600 to 700 |
| h3 | `clamp(1.5rem, 2.8vw, 2rem)` | Sub-section and card headings, weight 600, leading 1.15, tracking -0.012em |
| lead | `clamp(1.0625rem, 1.4vw, 1.1875rem)` | Intro paragraph under a heading, measure `max-w-[52ch]` or `[44ch]` |
| body | 16px, leading ~1.5 to 1.6 | Prose |
| small | 14 to 15px | Footer copy (15px, 1.55), card detail |
| micro | 11px uppercase, tracking 0.22em, weight 500 (eyebrow); 12.5px footer fine print | Eyebrows and legal |

**Weight, tracking, line-height, measure:** display and headings carry negative tracking (-0.012em to -0.018em) and tight leading (1.05 to 1.15); body is untouched tracking at normal leading; eyebrows are the only wide-tracked text. Hero h1 is 2.5x body at the 390 floor (40px over 16px) and 4.5x at desktop (72px). Measure is capped with `ch` units on lead paragraphs (44 to 52ch) and containers at 1160px or `max-w-6xl`. Known weakness: the 11px eyebrow is small and appears on every section of /pricing.

### 2.3 Spacing and rhythm
Intentionally uneven. Section gaps large, component gaps tight. Uniform padding everywhere reads as a template.

| Token | Value | Use |
|---|---|---|
| Page gutter | `px-6` (24px) on every band; header and footer inner `padding: 0 40px` | Constant side margin, so bands align |
| Section gap | `py-20 sm:py-24 lg:py-28` (80 / 96 / 112px) on content bands | Large, deliberately |
| Hero top | `pt-36 sm:pt-44 lg:pt-48` (144 / 176 / 192px), `pb-16 sm:pb-20 lg:pb-24` | Room for the 64px fixed header and the leak line, which sits in this padding |
| Heading to body | 16 to 28px (`mt-4`, `mt-5`, `mt-7` seen) | Tight inside a unit |
| Component gap | `gap-6` to `gap-8`, 40px in the footer grid | Tighter than section gaps |
| Tap target floor | 44px at 820px and below (`min-h-[44px]`, 44x44 menu button) | Touch |

The rhythm is uneven by design: 144 to 192px above a hero, 80 to 112px between bands, 16 to 28px inside a unit. Within a page, grids are not uniform: about and services use a featured-first layout and a ruled list rather than equal cards (changed this pass).

### 2.4 Radius, elevation, borders
Soft, with one written rule: containers are 14px (`--radius-lg` through `--radius-4xl` all equal 14px, so no component can drift), buttons, chips and the menu button are fully round (999px), small controls such as the focus ring on nav links are 4px. Soft suits the direction because the site is selling calm, plain-spoken help to non-technical owners, not engineering severity.

Elevation has two levels. Level 0: flat, 1px `--color-mauve-100` border (cards, header bottom edge). Level 1: one tinted shadow, `0 18px 40px -22px rgba(25,20,26,0.45)`, used on the header dropdown panel. Hero and cards carry no shadow. Dead CSS in globals.css (`.ims-cinema-frame`, `.ims-cinema-stage`) defines two more shadow recipes but nothing references them.

### 2.5 Motion

| Token | Value | Use |
|---|---|---|
| duration-micro | 160 to 180ms | Button press and hover (`transform 160ms`, colour 180 to 200ms); amber CTA and cobalt outline buttons set in one rule at the end of app/globals.css |
| duration-transition | 180ms | Header dropdown panel opacity and transform; chevron rotate 200ms |
| duration-page | 900ms with 350ms delay, once | Leak-line coin drop; the only page-level motion added. Scroll reveals (`Reveal`, `[data-reveal]`) are separate, pre-existing, and honour reduced motion in the component |
| easing | `--fx-ease: cubic-bezier(0.23, 1, 0.32, 1)` (chrome.css, header, CTAs, leak coin) and `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` (globals.css) | Two ease-out curves in the same family, no bounce, no ease-in on UI. A single token would be tidier; not merged this pass |

**Rules:** compositor-friendly properties only (`transform`, `opacity`, `clip-path`). `prefers-reduced-motion` honoured. **Entrance animation never gates visibility** — content renders visible in SSR and with JS disabled, enhancement adds the reveal, and a safety timer force-applies the end state (`LESSONS.md` #2).

### 2.6 Imagery and iconography
Ruling (2026-10-28): no photography of people, offices or the client's work is added or generated. Visuals are authored inline SVG (flow infographic, department map, chart series) and the live demo widget. Icons are inline SVG; `app/_components/BrandIcons.tsx` holds Simple Icons (CC0) paths for Gmail, Outlook, Sheets, Slack, Notion and HubSpot, used to name tools in the demo. No emoji, no icon-font. The one raster on the flagship home hero is a grey photo slab inside the compiled bundle (`public/assets/*`), outside this pass; I could not replace it. No generative image was produced in this pass, so `MEDIA_MANIFEST.md` has nothing to record for it.

Note on the template line below: the site has no client "work" to photograph, since IMS sells a service and a method, so the integrity rule is satisfied by not showing any. Partner logos carry no alt or metadata by the owner's rule.

Original guidance: Photography direction, or the explicit decision not to use photography. Icon set and stroke discipline. In technical verticals, prefer authored inline SVG diagrams: machine-readable, theme-aware, weightless, and they signal competence in a way stock imagery cannot.

**Integrity rule:** generative and stock imagery is for atmosphere, abstract and texture only. Anything presented as the client's actual work must be the client's real photography.

**This section decides; `MEDIA_MANIFEST.md` executes.** Record here the direction and the ruling — photography or not, icon set, diagram strategy. Then run **`/media`**, which enumerates every slot, classifies each one against the integrity rule *before* anything is generated, writes the prompts through the `image-prompt-engine` skill so they inherit §1.1 register, §1.2 anti-references and §2.1 palette, routes each to a verified fal.ai model, and records prompt plus seed per asset.

Two decisions belong here rather than in the manifest, because they constrain the layout and not just the asset:

| Decision | Recorded here |
|---|---|
| Does any slot require the client's real photography? | No slot requires it. The /industries hero's right half at 1360 is empty and reads sparse; it is not waiting on a photograph, it needs a decision (new asset or copy) from the owner. |
| Does this vertical want authored SVG instead of imagery? | Yes. Diagrams and the demo widget carry the visuals, which removes the integrity risk. |

A prompt written without §1.2 in front of it returns the model's average of the category, which is the same average every competitor's prompt returns.

### 2.7 Grid and breakpoints
Container widths: header and footer inner 1240px; page content `max-w-[1160px]` (five uses) or `max-w-6xl` (1152px), hero copy `max-w-4xl`, narrow reading `max-w-3xl`. Gutter: 24px on bands, 40px in header and footer. Footer is a five-column grid `1.5fr 1fr 1fr 1fr 1fr`, 40px gap, collapsing at 820px. Tailwind default breakpoints are used in pages (`sm` 640, `md` 768, `lg` 1024); chrome.css switches the header to the menu button at 820px and tightens the CTA at 400px; globals.css has a 640px rule for the leak line. Tested viewports in this pass: 1360 and 390 wide, both light and dark, no horizontal overflow on `/`, `/pricing`, `/services`, `/about`, `/contact`, `/faq`, `/tools`, `/industries/law-firms`. 320, 768, 1440 and 1920 were not screenshotted.

---

## §3 · COMPONENTS

For each component: **every** state. Happy-path-only specs are how unfinished UI ships.

Registry sources: none of these were installed from shadcn, 21st or react-bits in this pass; see §0 row 7 for the searches run and the MethodSequence exemption. All are repo-authored components, so the "Source" column is the file path.

| Component | Source (registry item / path) | default | hover | focus-visible | active | disabled | loading | empty | error |
|---|---|---|---|---|---|---|---|---|---|
| Amber CTA (`a/button.bg-accent-500`) | utility classes on each page; transition rule at end of app/globals.css | Amber fill, `--color-on-amber` text, round | Colour step (Tailwind `hover:` is inside the hover media query) | 2px cobalt outline, offset 3px, on plum 2px amber | `scale(0.97)`, 180ms (measured: matrix(0.97...)) | N/A, links not disabled | N/A, navigation only | N/A | N/A |
| Cobalt outline button (`a.border-cobalt-300`) | same rule | Transparent, cobalt border and text | Colour and border change (state not re-inspected visually) | Same global ring | `scale(0.97)` | N/A | N/A | N/A | N/A |
| Header (`TrophyHeader`, `.fx-*`) | app/_components/TrophyHeader.tsx, app/chrome.css | 64px fixed, paper, 1px bottom rule | Inside `@media (hover: hover) and (pointer: fine)` | 2px cobalt, 4px radius | `.fx-btn:active, .fx-theme:active` scale(0.97) | N/A | N/A | N/A | N/A. Active page: ink text plus 2px cobalt underline via `aria-current="page"`; Company button uses `data-active` (changed this pass). Menu button 44x44 below 820px |
| Header, glass (`TrophyHeader`, flagship nav) | cobalt.css, app/chrome.css | Blurred translucent bar, 1px rule | Link colour; "Price it" pill lifts | Cobalt ring | Press scale | N/A | N/A | N/A | N/A. `prefers-reduced-transparency`: solid fill |
| Skip link | `.fx-skip`, flagship `.skip` | Off-screen | N/A | Slides in with 2px amber / accent-500 outline (added this pass) | N/A | N/A | N/A | N/A | N/A |
| Footer (`TrophyFooter`) | app/_components/TrophyFooter.tsx, chrome.css | Five-column grid | Link colour | Cobalt ring | N/A | N/A | N/A | N/A | N/A |
| LeakLine | app/_components/LeakLine.tsx | Hairline plus 9px coin, `aria-hidden` | N/A (decorative) | N/A | N/A | N/A | Plays once, 900ms | N/A | N/A. Reduced motion: static line and dot |
| FAQAccordion | components/industry/FAQAccordion.tsx | Native `<details>`, first item open, 44px summary | Colour | Global `summary:focus-visible` ring | Native toggle | N/A | N/A | N/A | N/A |
| ToolCard, PackageBlock, DepartmentMap, TokenizationToggle | components/industry/ | Card with 14px radius, 1px rule | Rim on `.group:hover` (outside hover media query, known gap) | Global ring | 44px min targets (changed this pass) | N/A | N/A | N/A | N/A |
| IndustryCard | app/industries/page.tsx | 14px card | Hover and focus both move (changed this pass) | Ring | Press | N/A | N/A | N/A | N/A |
| SampleFileChip | components/industry/demo/SampleFileChip.tsx | 44px chip, cobalt "sample data" labelling | Colour | Ring | Press | N/A | N/A | N/A | N/A |
| LiveDemoPlayer | components/industry/demo/LiveDemoPlayer.tsx, useDemoMachine.ts | Status `idle` | N/A | Ring | N/A | N/A | `armed` shows dim state (opacity .28), `processing` runs stages | `idle` | `complete` shows results; the machine has no error status (not specified in the reducer) |

Not exercised in this pass: forms. The only forms (contact) are in the flagship static HTML bundle, so input, validation and error states there could not be specified or changed.

**Layer discipline:** shadcn/ui supplies the accessible skeleton (ARIA, keyboard, focus management). Charts come from the IMS Mono registry with demo data replaced by props. 21st and react-bits supply drafts and motion. The direction above supplies the look. **Never ship a shadcn default unstyled** (§13 O3). Source rules: `~/.claude/UI_COMPONENTS.md`.

**Hand-build exemptions** (one line each: component · terms searched in sources 1 to 4 · why nothing fit · review date; the signature move qualifies by definition):
- `MethodSequence` (app/_components/MethodSequence.tsx) · shadcn `stepper`, `timeline`; react-bits `step`, `scroll` (Stepper, ScrollStack, ScrollReveal) · no shadcn item exists; react-bits Stepper is a click-through wizard and ScrollStack hides earlier steps behind later ones, neither shows seven readable steps with a scroll-filled rail · review 2026-10-23

---

## §4 · PAGE COMPOSITION

Per template, desktop and mobile. Grid-breaking or editorial composition where it earns its place. Uniform card grids are a banned default.

Written from the after screenshots in scratchpad/design2/after/ (1360 and 390 wide). Statements describe what is seen, not a rating.

### Home (public/flagship/index.html, flagship bundle plus cobalt.css)
- **Job of this page:** route a practice owner to their sector and show the product working.
- **Desktop:** plum hero with left copy and a grey photo slab on the right, sector picker ("I am a..."), live demo, FAQ, footer. Layout lives in the compiled bundle; this pass changed only a hero veil mask, link, button and focus styling, and the phone behaviour of the concierge bubble.
- **Mobile:** single column; the concierge bubble is hidden on phone until it is invoked (`.guiding`) and fades out with a scroll timeline, with 136px of bottom padding on the footer bar so it never covers links.
- **Hierarchy:** h1, then picker, then demo.
- **The moment:** the demo playing on scroll.

### Pricing (app/pricing/page.tsx)
- **Job of this page:** let a buyer self-select a tier without a call.
- **Desktop:** plum hero (leak line, eyebrow, up to 72px h1) running into a second plum band, then alternating paper, plum, paper, plum bands (band classes seen at lines 104 to 386 of the file). Six sections, each opens with an uppercase label.
- **Mobile:** stacked bands; links are 44px.
- **Hierarchy:** h1, then the second plum band, then the paper tier band.
- **The moment:** the leak line dropping onto the h1 eyebrow.

### Services and service detail (app/services/page.tsx, app/_components/ServiceDetail.tsx)
- **Job of this page:** show three ways in and the service steps.
- **Desktop:** "Three ways in" is a featured-first grid with offsets (replaced equal cards); tool examples are a ruled list; ServiceDetail steps are a numbered grid with a ring.
- **Mobile:** single column; links 44px.
- **Hierarchy:** hero h1, the featured way in, the other two, tool examples.
- **The moment:** the featured way in, larger than its siblings.

### About (app/about/page.tsx)
- **Job of this page:** establish who is behind IMS and the commitments.
- **Desktop:** plum hero with leak line, commitments as a numbered ordered list, price-bar track.
- **Mobile:** single column. One in-sentence link is 74x16 and exempt.
- **Hierarchy:** hero, commitments, price bar.
- **The moment:** the commitments list set as numbered rows rather than a card grid.

### Process, Reviews, Case studies, Insights, Industries (app/*/page.tsx)
- **Job of these pages:** /process shows the seven-step method; /reviews shows testimonials (text untouched by rule); /case-studies and /insights are lists; /industries is the sector index.
- **Desktop:** each hero is left-aligned plum with the leak line above the eyebrow (seen in hero_*-1360.png). /process continues into the step rail with a large amber 01 (MethodSequence). /industries: the hero's right half is empty at 1360.
- **Mobile:** hero h1 wraps to two lines at 390 on /process and /reviews; no horizontal overflow.
- **Hierarchy:** h1, then the content list or rail.
- **The moment:** /process, the scroll-filled step rail. /industries, none yet (open).

### Sector page (app/industries/[slug]/page.tsx, e.g. law-firms)
- **Job of this page:** show one sector's tools running on sample files.
- **Desktop:** hero, sample-file chip grid (44px chips, "sample data" in cobalt), live demo with stage dots, FAQ.
- **Mobile:** chips wrap; no overflow measured.
- **Hierarchy:** hero, demo, FAQ.
- **The moment:** the demo running. Before it runs, 8 labelled nodes sit at 1.44 to 1.62:1 (see §2.1).

### Contact (public/flagship/contact.html, contact-funnel.js, funnel.css)
- **Job of this page:** turn a visit into a booked call, in six short steps, without a wall of fields.
- **Desktop and mobile:** a mascot car scene above the form card; each step is one question group, a "You came from" pill sits under the H1 (CTA param, else referrer, else direct) and is also written to the hidden `from` field. On a finished enquiry the car drives off, the sun descends, and a sky note reads "Thanks, <first>. Got it. Adam will call you on <phone> ..." with phone and time in amber (`.fn-tk`), signed "Speak soon, Adam" with an amber rule and italic. The card keeps "Sent, <first>.", a recap (name, phone, call time) and the post-enquiry chat row. Mobile done-scene is 420px tall.
- **Anti-spam, by design:** Telegram and WhatsApp links are not in the served HTML. A script builds them after a valid submit, only when the honeypot is empty and the visitor spent 10s or more on the page. Each link prefills the first name and a ref code (IMS-XXXXX, also in the hidden `ref` field and the lead email). The WhatsApp number is assembled from parts inside the post-submit href and is never page text.
- **The moment:** the car leaving and the sun setting behind the thank-you note.
- **Not yet scored independently:** sky note, recap card, chat row.

### Solutions (app/solutions/page.tsx, components/solutions/*, lib/industries/solutions.ts)
- **Job of this page:** let a practice owner pick their industry and see only the tools that apply, then open later stages one at a time.
- **Flow:** short hero with an animated "Choose your industry" cue (MotionCue, HeroCue) and image tiles; a pick reveals that industry's three closed tool rows; "Next:" buttons open stage 2 (leak chart), 3 (white label), 4 (free scan). Nothing auto-expands. FAQ and all-industries are closed rows (SolutionsMore). /tools and /tools.html 301 here.
- **Known gaps (2026-11-13):** the White label band is flat; about 150px of space above "All solutions at a glance"; cost block width on the desktop finale.

### Header and footer (all pages)
- **Header:** glass recipe (backdrop blur over the page, 1px rule, reduced-transparency fallback to a solid fill) in cobalt.css for flagship pages and chrome.css for Next pages. The mauve "Price it" pill replaces the theme toggle; the toggle lives in the More panel. This was Adam's explicit request. It sits beside the O3 ban on glassmorphism **cards**: the banned default is cards, and the one glass surface here is the fixed header, which has to read over changing content. Flagged for the next independent pass.
- **Footer:** non-particle GSAP motion from public/flagship/footer-fx.js (ten drifting contour rows plus the brand figure-of-eight with two travelling runs). Decorative, aria-hidden, paused off screen, held still under reduced motion. On a phone the loop sits above the link lists.

---

## §5 · SCORECARD — the gate

Score each 0-5 with **evidence**, not assertion. Kernel §10 **V4** requires this scored by a reviewer who did not produce the design, in a separate pass. Self-grading in the same turn as producing the work is banned.

| # | Dimension | Score 0-5 | Evidence |
|---|---|---|---|
| 1 | Hierarchy through scale contrast | 4 | Display h1 at 56-72px weight 700 against 16-17px body on every inner hero; /pricing now leads with one loud featured Leak Scan card ('Free' at display size) before four quieter rungs; inner heroes carry a ledger figure column. Weakest tier is still 11px tracked eyebrows and 13px chart labels. Shot: C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/pricing-1360-light_t0.png, C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/pricing-1360-dark_t0.png |
| 2 | Intentional rhythm, not uniform padding | 4 | Fixed: /pricing is featured full-width card plus 2x2 rungs (no five identical stacks); /services carries an eyebrow on the hero and one band only; /case-studies hero only, case labels sentence case. Still uniform: /reviews 3x2 equal grid, /guides equal 2-col grid of 9, and /services/ai-readiness-audit has a tracked-caps eyebrow on all 6 bands. Shot: C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/pricing-1360-light_t1.png, C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/mob_m1.png, C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/mob_m2.png |
| 3 | Depth or layering (overlap, surfaces, motion) | 3.5 | Inner heroes now layer a ledger panel over the ruled field (/services, /about, /industries, /guides); /services project cards step down in a staggered stack; home keeps photographic plates, sunburst and the scroll-drawn coin line. Hero right on /pricing, /process, /reviews is still only the faint ruled panel. Shot: C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/services-1360-dark_t1.png, C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/homegrid_0.png |
| 4 | Typography with a real pairing strategy | 3.5 | One family (Schibsted Grotesk) as a weight hierarchy, mono reserved for money figures (/industries cards, law-firms stats). Inconsistent: /case-studies Case 02 figures set in mono while cases 01 and 05 are grotesk. No second voice, sizes still set per page. Shot: C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/case-studies-1360-light_t1.png, C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/mob_m3.png |
| 5 | Colour used semantically, not decoratively | 4.5 | /pricing bars amber for a first step and mauve for a project, with a key under the chart, in both themes; amber is CTA and leak only, cobalt is links and outline buttons. Outline buttons on plum now compute rgb(179,201,255) text and border, legible. Residual: hero eyebrow is amber on /industries, /guides, /case-studies, /insights and mauve elsewhere, with no rule behind the split. Shot: C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/pricing-1360-dark_t0.png |
| 6 | Hover / focus / active states that feel designed | 4.5 | Header CTA now lifts: y 11.5 to 10, transform matrix(1,0,0,1,0,-1.5), background lab 80.9 to 76.7; in-page amber CTAs lift -1.5px; industry cards lift with an amber rim; FAQ rows toggle with an amber minus; focus ring 2px cobalt. Consistent across all three probed routes. Shot: C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/hover_header.png |
| 7 | Composition that breaks the default grid where it earns it | 4 | /about now has one left edge (headings at x 167/168, was three). Featured cards on /pricing and /industries and the staggered project row on /services break the grid on purpose. Remaining: /pricing headings sit on three edges (x 104, 232, 296); /reviews and /guides are default equal grids. Shot: C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/about-1360-light_t0.png, C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/industries-1360-light_t0.png |
| 8 | Texture or atmosphere where the direction calls for it | 3.5 | Home, /faq hero and /industries photographic card headers carry light and grain; /contact has a photographic plate. Most inner heroes are still flat plum with a ruled panel, now with data in it rather than atmosphere. Shot: C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/homegrid_1.png, C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/mob_m2.png |
| 9 | Motion that clarifies rather than distracts | 3.5 | Leak line and coin explain the page; reveals render after a scroll walk with 0 hidden headings or paragraphs and no horizontal overflow on all 60 route, width and theme combinations. Home at 1360: the concierge bubble ('Press it. I'll drive.') and Contact us pill sit over the footer brand paragraph. Shot: C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/homegrid_2.png |
| 10 | The signature move is present, built, and specific to this client | 4.5 | LeakLine (amber hairline ending in a coin, entering from the header edge) is on every inner hero checked, at 1360 and 390, light and dark; home carries the full scroll-drawn infinity coin line. A leak-recovery firm's metaphor, not transplantable. -0.5: absent on /faq and /contact (and /tools, compiled flagship, accepted). Shot: C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/mob_m1.png, C:/Users/Admin/AppData/Local/Temp/claude/c--Users-Admin/434aca60-6bc0-4019-8293-77e53a5d500b/scratchpad/v4pass3/mob_m3.png |

**Total: 41.5 / 50** (4+4+3.5+3.5+4.5+4.5+4+3.5+3.5+4.5 = 41.5). Independent pass 3, 2026-10-29, fresh scorer, production build on :3100, 15 routes at 1360 and 390 wide, light and dark, scroll-walked, plus a home viewport walk and hover probes. History: pass 1 scored 36/50, pass 2 (2026-10-28) scored 37/50. All six defects named by pass 2 are fixed in the render. Confidence 70%, plus or minus 2.5. **Verdict: 40 or above. Gate V4 cleared, narrowly: the lower bound of the confidence range (39) sits under the gate, so the ranked remainder in the scorer report should be closed before calling it settled.** No hard-fail trigger proven: no purple gradient hero, glass cards, blobs, emoji grids or default shadcn/Inter seen. Unverified risk (not scored as a fail): the home logo strip (Marriott International, Visit Scotland, Healthspan, Kress and others) is an owner-supplied item the owner says is real; the six anonymised /reviews quotes (freight forwarder, B2B SaaS and others) could not be verified and are invented social proof if the owner cannot evidence them (O3, V5). /about states "We will not invent client logos, reviews or case studies", which raises the cost of either item being unevidenced. The "Registered with the ICO" line was not verified either.

### Thresholds
| Score | Verdict |
|---|---|
| < 32 | **Blocked.** Below the 8/10 delivery floor. Rework, do not ship. |
| 32–39 | Ships only with a written lift plan to 45+ agreed with the client |
| 40–50 | Ships |

**Hard fail regardless of total:** dimension 10 scores 0, or any O3 banned default is present, or §0 has a row without evidence.

---

## §6 · SIGN-OFF

| Check | Result | By | Date |
|---|---|---|---|
| §0 skill chain, all seven rows have evidence | Rows filled with artifacts (rows 1 and 2 with the caveat that competitor palette and type could not be extracted from fetched text) | Design agent (not a grade) | 2026-10-28 |
| Contrast measured, WCAG 2.2 AA | Measured on 6 pages in both themes: 0 failures. Open: /tools 237 light / 189 dark, /industries/law-firms 8, a pre-run dim state in the immutable bundle | Design agent | 2026-10-28 |
| All component states specified | Specified for the components touched; forms (contact) and demo error state are not specified (no such state in code or in static HTML) | Design agent | 2026-10-28 |
| Signature move built and live | Built: leak line on 9 page types via LeakLine.tsx, seen in hero_*.png; live on dev server :3200, not deployed | Design agent | 2026-10-28 |
| Scorecard ≥ 40, scored in an independent pass | **41.5/50, met (narrowly).** Independent pass 3 (fresh scorer) 2026-10-29; history 36/50 (pass 1), 37/50 (pass 2, 2026-10-28). Confidence 70%, plus or minus 2.5. Social-proof items remain unverified risk, see §5 Total | Independent design scorer (not the maker), third pass | 2026-10-29 |
| O3 banned defaults absent | Verified by grep and screenshots; dead gradient/glass-named CSS remains unreferenced (see §1.4) | Design agent | 2026-10-28 |
