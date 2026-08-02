# IMS Consultancy — New Site Plan

*Grounded in the current live site's own content and tokens. Cinematic where it earns attention, crawlable everywhere it needs traffic. Built on the stack already installed (GSAP + Lenis + Motion + R3F) plus one new dependency (Remotion) and the `scroll-world` skill.*

**Status:** Plan only. Nothing here builds until an explicit go-word and Gate G0 (`ims-build-system`). Production stays on Netlify (IMS-064). `/dev/tokens` and `/dev/demo` are never touched.

**Non-negotiable process note:** This plan does **not** self-grade design quality. Every visual milestone routes through the installed skill chain — `design-taste-frontend` → `ui-ux-pro-max` → `emil-design-eng` → `impeccable` — and gets a user checkpoint after the *first* structurally-visible milestone, not after eight. This is the direct correction from the 2026-07-23 rejected redesign (see `AGENTS.md` DESIGN QUALITY GATE). The direction below is **evolved from IMS's own current identity**, never copied from an external product.

---

## 0. The one-paragraph thesis

IMS sells the removal of quiet, invisible manual work. The site should *show* that: a hero where a business's cluttered manual day — inboxes, spreadsheets, sticky notes, duplicated data — flows through the screen and resolves into calm, connected, automated motion as you scroll. That single continuous fly-through is the "wow." Everything below it is honest, keyword-dense, answer-engine-ready HTML that turns the wow into pipeline. The current site already has the *words* for this ("Get the manual work off your team," "quiet systems," "AI runs in the background, not in the way") — we are giving those words a body.

---

## 1. What we keep, what we fix (grounded audit)

From the live site (`app/` current state, post-revert). **Reuse the strengths, resolve the three real inconsistencies.**

### Keep (these are genuine assets — do not touch the substance)
- **The Decide → Build → Compound framework.** It's a real, ownable三-act structure. It becomes the spine of the scroll narrative.
- **Real published pricing** (£6k / £24k / £6k-mo) and the five pricing principles ("first 2 weeks funded by IMS," half/half, milestone-miss discount). This is rare, trust-building honesty — feature it, don't hide it.
- **The footer brand line** — *"A small private consultancy from London. We help senior operators decide, build, and compound — quietly and with discipline."* This is the north-star voice. Every new word must sit next to it without clashing.
- **The case-study template** (Situation / Decision / Build / Outcome + one headline number, e.g. *"Eighty-two minutes per person per day, returned."*). Strong. We expand it, not replace it.
- **Objection-led FAQ** (12 Q&As) and the **compliance/standards lists** (ISO 27001/42001, NIST AI RMF, Cyber Essentials, OWASP LLM Top 10, UK GDPR). These are AEO gold — see §7.
- **Current design tokens** — warm mauve/paper light band + "jewellery-box dark" (`--color-paper #f5eff3`, `--color-deep #1a1620`, mauve 50–900), Cormorant Garamond display over Inter body. **This is the identity we evolve.** Not a dark-void copy. Not a font swap for its own sake.

### Fix (three real problems the audit surfaced)
1. **Two service taxonomies.** `/services` hub uses Decide/Build/Compound; the four subpages are AI Automation / Custom Software / SEO / Strategic Advisory. → **Resolve:** Decide/Build/Compound stays the *narrative* framing (verbs, outcomes); the four services become the *catalogue* underneath it ("what that looks like in practice"). One page, two altitudes, no contradiction.
2. **Two pricing structures.** Main `/pricing` = 3 tiers; Industries pages = per-page "Build from £6,500 · from £3,000/month." → **Resolve:** the 3 tiers are the canonical answer; Industries pages show an *industry-anchored example* that maps explicitly to a tier ("this is a Professional revamp, from £24k"). Cross-link, don't diverge.
3. **Industries sub-brand mismatch.** `/industries` uses Space Grotesk + a separate 10-hue "signal" palette + a punchier, stat-heavy voice — visibly not the same site. → **Resolve:** keep the 10 signal hues (they're useful content-differentiation and genuinely earned), but re-derive them against the shared background and bring the *type and chrome* back onto the main system so it reads as one site with a data-rich wing, not a bolted-on microsite. The punchy voice is actually good for that section's job (regulated-industry buyers want the leak-line stat) — keep the voice, unify the shell.

### Fill (gaps that cost pipeline)
- **Insights is vaporware** (3 "coming soon" stubs, dead `/#newsletter` anchor). This is the single biggest SEO/AEO miss — see §6/§7. It becomes the content engine.
- **No individual case-study pages.** Five anonymised cases live on one page with anchors. → Give each a real `/work/[slug]` route (indexable, schema'd, internally linked). Anonymised is fine; un-indexed is not.
- **No trust/security hub** despite heavy standards messaging → one `/trust` page consolidating the compliance posture (AEO-critical, §7).
- **No persona/ICP or "is this us?" page** → a qualification page that doubles as long-tail SEO ("AI automation for [law firms / brokers / wealth managers]").

---

## 2. Information architecture (new)

```
/                     Home — scroll-world hero + Decide/Build/Compound narrative + proof
/services             Hub (Decide/Build/Compound narrative → 4-service catalogue)
  /services/ai-automation
  /services/custom-software
  /services/seo                 (rename intent: "AI & Answer-Engine Visibility")
  /services/strategic-advisory
/industries           Hub + 10 [slug] pages (unified shell, kept voice, mapped pricing)
/work                 Case studies index (was /case-studies)
  /work/[slug]        NEW — 5 individual indexable case pages
/pricing              3 canonical tiers + principles (unchanged substance)
/process              7-step methodology (feeds the hero's scroll beats)
/insights             NEW content engine — pillar + cluster articles (was 3 dead stubs)
  /insights/[slug]
/trust                NEW — consolidated security/compliance/AI-governance hub
/about                Small firm, high judgement (unchanged substance; add a real face — see §8 risk)
/faq                  12 Q&A (expanded, marked up as FAQPage schema)
/contact              info@intelmadesimple.com
/ai-policy /privacy /terms
/dev/demo /dev/tokens          UNTOUCHED (IMS-064)
```

Every route above is real crawlable HTML. Only the home hero and one home chapter are scroll-world video.

---

## 3. The scroll-world hero — concept, scope, and how it's actually built

### 3.1 Concept: "The day the manual work left"
A single continuous camera flight (no cuts) through **six connected scenes** that mirror IMS's own Decide → Build → Compound story and the `/process` seven steps. As the camera flies forward, each scene **transforms from manual chaos to quiet automation** — the literal product promise.

| # | Scene (the diorama / space) | Manual state → automated state | Copy beat (from IMS's real content) |
|---|---|---|---|
| 1 | **The overloaded desk** — inbox tower, spreadsheets, sticky notes, a person buried | papers mid-air, chaotic | Eyebrow: *Strategy · Build · Automate* — Title: **"Get the manual work off your team."** |
| 2 | **The audit** — the same desk, now mapped: glowing lines trace where the time goes | chaos being *measured*, lines drawing in | **"We audit what eats your week."** (01 Decide) |
| 3 | **The build** — a quiet workshop; systems assemble themselves along the traced lines | scaffolding into clean modules | **"Code that ships and stays shipped."** (02 Build) |
| 4 | **The connection** — tools link up: Gmail, Sheets, Slack, HubSpot, Notion nodes wiring together | nodes connecting, work flowing between them | **"AI runs in the background, not in the way."** |
| 5 | **The compound** — the desk again, now calm; work moves on its own, the person is *doing the real job* | steady, self-running flow | **"Quiet automation, loud results."** (03 Compound) |
| 6 | **The payoff / CTA** — the whole system as one calm connected object, breathing | resolved | **"Ready to make a clearer move?"** → *Start a conversation* |

This is not invented — it is scenes 1→6 of the Decide/Build/Compound + process content the site already ships, given a camera.

### 3.2 Scope decision (and why)
- **Scroll-world runs on:** the home hero (scenes 1–6 above) and **one** mid-home chapter (the "Where AI actually fits" band, id `momentum` — scenes 4-style, tool-connection fly-through).
- **Everything else is GSAP/Motion HTML.** Reason stated in the thesis: answer engines and Google can't read text baked into video. A whole-site scroll-world would trade the entire SEO/AEO/GEO ask (which you made in the same sentence) for motion. Hero-first keeps both.
- **Degradation:** per `LESSONS.md #2` and the scroll-world engine's own reduced-motion path — the hero **renders the scene stills + real H1 text in the DOM on load**, video is progressive enhancement. No JS / reduced-motion / crawler → sees the poster image and the real headline, never a blank frame. This is mandatory, not optional.

### 3.3 How it's built — fal.ai for the visuals, Remotion for the branded motion, one scrub engine to play it
The `scroll-world` skill defaults to Higgsfield. **We use our fal.ai creator instead** (confirmed direction — the fal.ai account is already provisioned in `VAULT_IMS.md`; the Higgsfield-vs-fal.ai question was resolved in favour of fal.ai in `REPOS.md`). The three motion technologies you asked for each own a distinct, non-overlapping job — this is what makes GSAP + Motion + Remotion + fal.ai cohere instead of being four buzzwords:

- **fal.ai = the cinematic image + video creator** (per your instruction — the sole generator for pictures and film):
  - **Stills** → `fal-ai/nano-banana-pro` (high-fidelity finals) with `fal-ai/nano-banana-2` for cheap prompt iteration. These are the six scene stills (§5.2) — cinematic, on-palette, used both as the video start-frames *and* as the DOM poster/lazy-load fallbacks.
  - **The fly-through video legs** → `fal-ai/seedance-1-0-pro` (image-to-video, strong motion) as primary, `fal-ai/kling-video/v3/pro` and `fal-ai/veo-3` as alternates for any leg that needs a different look or the NSFW-filter escape. We use scroll-world **architecture A (continuous forward take)**: each leg's start-frame = the previous leg's actual last frame, *no end-image needed* — which sidesteps frame-lock entirely and is the correct grammar for a grounded walkthrough anyway (scroll-world SKILL Step 4).
  - **Discipline (your rule):** every fal.ai prompt is written for high-quality *cinematic* output only — the shared preamble (§5.1) and per-leg camera grammar enforce this; no flat, no cheap, no generic stock look.
- **Remotion = the branded, deterministic motion layer** (still in the stack, as you asked, but scoped to what it's genuinely best at): the data-motion overlays that fal.ai shouldn't hallucinate — the real UI motifs animating (a spreadsheet resolving, tool nodes wiring up, the headline numbers counting), the looping ambient background for the dark chapters, and the `/work` case-study highlight reel. Remotion renders these as pixel-exact MP4s using the real mauve/paper tokens — the parts that must be *precise brand*, not *generated art*. fal.ai supplies the cinematic world; Remotion supplies the exact brand motion composited over/around it.
- **`scroll-world`'s scrub engine** (`references/scrub-engine.js`, vanilla, blob-seek, seam crossfade, reduced-motion, mobile hardening) *plays* the fal.ai video legs by scroll position. Keep the engine, adapt into a Next.js client component (`HeroScrollWorld.tsx`) rather than its standalone HTML.
- **GSAP ScrollTrigger + Lenis** owns the *pinning and scrubbing choreography* (pin the section, map scroll → `video.currentTime`, drive per-beat text reveals). Lenis is already wired to ScrollTrigger in `SmoothScroll.tsx` — reuse verbatim. gsap-master's `scroll-system` pattern (batch reveal + parallax + progress bar) is the reference for the sections *below* the hero.
- **Motion (Framer v12)** owns component-level entrance and micro-interaction (cards, nav, buttons, CTA) — existing `Reveal`/`SplitReveal` split stays; text is never gated invisible behind it.

**Seam-locking on the fal.ai chain:** architecture A means we extract each leg's actual last frame (ffmpeg) and feed it as the next leg's `image_url` — frame-identical seams with a small crossfade, exactly as the skill's pipeline does, no end-image required.

### 3.4 New dependency
`remotion` + `@remotion/cli` + `@remotion/player` — the only new npm packages. Rendered MP4s (both fal.ai's and Remotion's) are consumed as static `<video>` assets, so Remotion is a *build-time* dependency, not shipped to every page load. Scoped as its own EPIC.

**fal.ai access:** generation runs through the `fal-ai` MCP server (`fal-ai-media` skill). **That server is not connected in this session** — it must be added to `~/.claude.json` with the `FAL_KEY` from `VAULT_IMS.md` (key never pasted in chat), then loaded in an interactive session, before any real generation fires. Until then, §5 ships ready-to-run fal.ai calls, not burned credits.

---

## 4. Design system — evolve IMS's own identity (not a repaint)

The rejected redesign failed because it copied an external "dark-void" product. This one moves the *existing* mauve/paper + jewellery-box system forward. Direction is set by `design-taste-frontend` against IMS's own brand voice **before any token is written** — the notes below are the brief for that pass, not a finished verdict.

- **Palette:** keep the warm mauve/paper light band and the jewellery-box dark band — this *is* the "light to dark journey" the site already locked. Push contrast and discipline: one confident mauve accent (`--color-mauve-500 #786478`), the dark band reserved for the hero and the two cinematic chapters (so darkness signals "the deep work"), light for the honest content (pricing, FAQ, trust). The 10 industry "signal" hues survive, re-derived for contrast on both bands.
- **Type:** keep **Cormorant Garamond** display (it's the editorial/senior-operator register — correct for this brand, wrong to swap out) over **Inter** body. Retire the genuinely-dead `Cinzel` and `JetBrains Mono`-as-unused; promote a single **Space Grotesk** usage *only* for data/stat callouts so the Industries wing reads as intentional, not divergent. Two-and-a-half families, each with a reason.
- **Motion tokens:** existing easings (`--ease-out-expo`, `--ease-in-out-quart`) are correct — keep. Add the scroll-world scrub timing + per-beat reveal stagger.
- **Depth:** the current site is fairly flat. Add restrained layering — the hero clip sits *behind* pinned copy; content cards float on the paper band with real (not default) shadow; the dark chapters use the mauve glow already in `globals.css` keyframes.

**Reference-gathering already run (real, not narrated):** 21st `search` returned production scroll-cinematic heroes to study for choreography — `Hero Scrub` (GSAP ScrollTrigger, canvas image-sequence, pin-based, reduced-motion aware — the closest existing analogue to our engine), `Scroll Choreography`, and `Scroll Morph Hero`. Use these as *choreography references*, not paste targets (`LESSONS.md #11`). `emil-design-eng` runs the Before/After pass on the built hero.

---

## 5. Asset plan — ready-to-run generation prompts

All generation runs through **our fal.ai creator** (per your instruction). Every prompt below is written for high-quality cinematic output only. Ready to paste into the `fal-ai` MCP once the server is connected (§3.4). fal.ai model IDs (from the `fal-ai-media` skill):

| Asset | fal.ai model | Notes |
|---|---|---|
| Scene stills (finals) | `fal-ai/nano-banana-pro` | high fidelity, `image_size: landscape_4_3` (≈3:2), `guidance_scale ~7.5` |
| Scene stills (iteration) | `fal-ai/nano-banana-2` | cheap prompt-tuning before finals; lock a `seed` when a look is right |
| Fly-through legs | `fal-ai/seedance-1-0-pro` | image-to-video, `image_url` = prev leg's last frame, `duration: "5s"`, `aspect_ratio: "16:9"` |
| Alternate / escape legs | `fal-ai/kling-video/v3/pro`, `fal-ai/veo-3` | different look, or NSFW-filter fallback on a stubborn leg |
| Ambient / branded motion | Remotion (not fal.ai) | exact-brand data-motion, §3.3 |

**Workflow:** iterate the still on `nano-banana-2` → lock the seed → render final on `nano-banana-pro` → `estimate_cost` before any video → image-to-video the leg on `seedance-1-0-pro` → extract last frame → next leg. Check `estimate_cost` before each video run (skill's cost note).

### 5.1 Shared style preamble (byte-identical across every still — this is what makes the world cohere)
```
Cinematic isometric 3D diorama of a modern professional workspace as a small floating
island on a plain solid warm off-white (#f5eff3) background with a soft contact shadow.
Soft matte clay-and-glass render, rounded restrained shapes, warm studio lighting, long
soft shadows, tilt-shift miniature look. Muted palette: warm mauve #786478, plum #1a1620,
paper #f5eff3, with one calm signal accent. Editorial, quiet, high-end consultancy feel —
Architectural Digest meets a systems diagram. Highly detailed, centered, absolutely no
text, no letters, no numbers, no logos. 3:2.
```

### 5.2 Per-scene still prompts (append to the preamble)
1. **Overloaded desk:** `Subject: a single desk overwhelmed with manual work — a tower of paper inboxes, open spreadsheets, sticky notes scattered mid-air, tangled cables, a small figure buried at the centre. Cluttered but tasteful, the chaos legible.`
2. **The audit:** `Subject: the same desk, now with glowing thin mauve lines tracing across it like a map, measuring where time is spent; sticky notes lifting and organising into a clean flow-diagram above the desk. Order emerging from clutter.`
3. **The build:** `Subject: a quiet miniature workshop where clean modular software blocks assemble themselves along the glowing lines — small scaffolds, neat server shapes, a calm engineer figure guiding it. Precision, restraint.`
4. **The connection:** `Subject: floating app nodes — an email envelope, a spreadsheet grid, a chat bubble, a CRM card, a notebook — wiring together with soft mauve light threads into one connected constellation above the workspace. Systems joining hands.`
5. **The compound:** `Subject: the original desk, now calm and uncluttered; work items move along the light threads on their own; the figure sits back, doing meaningful focused work while the system runs quietly around them.`
6. **The payoff:** `Subject: the whole workspace collapsed into a single elegant connected object — a small glowing orrery of linked systems — floating alone on the background, breathing gently. Serene, resolved, premium.`

### 5.3 Video / camera prompts (fal.ai image-to-video, per scroll-world `references/prompts.md`)
Continuous-forward-take (architecture A), `image_url` = previous scene's last frame, **no end-image needed**. Every prompt is deliberately cinematic — slow, graceful, high-end:
```
Single continuous cinematic camera move, no cuts. Continue the same slow, steady forward
glide. [MID-LEG MOVE]. The camera moves through [SCENE i] toward [FOCAL POINT], and the
scene transforms from cluttered manual work into calm connected automation as we pass. In
the final second, settle into a slow steady forward glide toward the next workspace.
Soft matte clay-and-glass diorama, tilt-shift miniature, warm light, mauve #786478 / plum
#1a1620 / paper #f5eff3. Smooth, graceful, slow motion, subtle parallax. No text.
```
Mid-leg moves by scene: 1 push-in on the buried figure → 2 crane-up as the map draws → 3 low lateral track along the assembling modules → 4 half-orbit around the connecting constellation → 5 gentle rise revealing the calm desk → 6 slow dolly-in on the final object.

### 5.4 Remotion-rendered branded motion assets (exact brand, not generated)
A 6–8s looping **ambient background clip** for the dark chapters — the connected-constellation slowly breathing — rendered in Remotion using the real mauve/paper tokens, consumed via `<video>` behind the "Where AI fits" copy. Plus the **case-study highlight reel** (the real headline numbers — "82 minutes returned," "8 hours → 45 minutes" — animating up) for `/work`. These are the assets that must be pixel-exact brand, which is why they're Remotion and not fal.ai.

### 5.5 Logos
`mcp__21st__search_logo` (svgl.app, free) supplies authentic brand SVGs for the tool-integration node scene (Gmail, Slack, HubSpot, Notion, Google Sheets) — per `LESSONS.md #10`, only authentic CC0/brand paths, never invented approximations.

---

## 6. Keyword-ready content — the pull-people-in engine

The current site ranks for almost nothing because it has no content depth and Insights is empty. This is where traffic comes from. Grounded in live market data (July 2026): **78% of UK businesses are actively investing in process automation**; audit-tier buyers search "automation audit £500–1,500"; verified proof points in-market are "15 hours/week eliminated," "8 hours → 45 minutes."

### 6.1 Keyword map (UK AI-automation + development consultancy)
| Intent | Target queries | Lands on |
|---|---|---|
| **Category / high-intent** | "AI automation consultancy UK", "business process automation consultant London", "AI automation for [industry]" | `/`, `/services/ai-automation`, `/industries/[slug]` |
| **Problem-aware** | "how to reduce manual data entry", "automate invoice processing UK", "stop copy-pasting between CRM and spreadsheets" | `/insights/[slug]` cluster |
| **Comparison / bottom-funnel** | "AI automation consultant vs agency", "n8n vs Zapier for [use case]", "in-house vs outsourced automation" | `/insights` comparison posts |
| **Pricing-intent** | "how much does business automation cost UK", "AI automation project cost" | `/pricing` (already honest — huge advantage) |
| **Trust / regulated** | "is AI automation GDPR compliant", "ISO 42001 AI consultancy", "AI automation for FCA-regulated firms" | `/trust`, `/industries/[slug]` |

### 6.2 Content engine (Insights, from vaporware to asset)
- **One pillar page per service** (`/insights/business-process-automation-guide`, `/insights/ai-answer-engine-visibility`) — 2,000+ words, the authoritative answer, linking down to clusters.
- **Cluster posts** answering one problem-aware query each, in the objection-led voice the FAQ already nails. Sourced from real engagements (the site literally says "Notes from inside real engagements" — deliver on it).
- **Every post carries proof:** a number, a mechanism, or a named standard (kernel §O4). No proofless wallpaper.
- Wire the dead `/#newsletter` anchor to a real capture (`waitlist-builder` / `newsletter-builder` skills) — the acquisition loop.

### 6.3 "How we pull people in" — the acquisition angle
1. **The honesty wedge.** Almost no UK automation consultancy publishes real pricing. IMS does (£6k/£24k/£6k-mo + "first two weeks funded by IMS"). Make that the headline of a positioning piece — it's a link magnet and a trust signal competitors can't paste (kernel §O4 competitor-paste test).
2. **Free automation audit as lead magnet** (`free-tool-strategy`): the market already prices audits at £500–1,500; IMS offers a scoped one that doubles as proof of capability (the AH playbook — free tools as lead magnets that prove the work).
3. **Industries pages as long-tail doorways done right** (`programmatic-seo`, but per `AGENTS.md`: genuinely unique content per page — real regulator framing, real leak-line stat, real named tools — not spun duplicates).
4. **The scroll-world hero as a shareable moment** — cinematic enough to earn organic shares / "look at this site" LinkedIn traffic, which feeds the personal-brand loop (`linkedin-strategy`, `thought-leadership`).
5. **AEO/GEO citations** (§7) — get IMS *cited by ChatGPT/Perplexity/Gemini* when someone asks "who does AI automation for law firms in the UK." This is the 2026 traffic frontier and IMS's `/services/seo` page already claims this competency — the site must embody it.

---

## 7. SEO + AEO + GEO — rich, and specific

Framing from current research: **SEO ranks you, AEO selects you, GEO cites you.** Gartner: the majority of B2B buyers use generative AI to research and shortlist vendors in 2026; GEO expected to take 40%+ of enterprise SEO budgets by 2027. IMS must be *citable*, not just rankable.

### 7.1 SEO (foundation)
- Per-page title/description with no brand double-suffix (`AGENTS.md` metadata rule); `next-sitemap`; internal linking hub→area→service (the AH pattern); Core Web Vitals budget honored (the hero clip lazy-loads behind a poster, LCP is the H1 text not the video).
- Individual `/work/[slug]` and `/insights/[slug]` routes = indexable surface area the site currently lacks entirely.

### 7.2 AEO (get selected into direct answers)
- **FAQPage schema** on `/faq` and inline Q&A blocks (the 12 objection-led answers are already written — mark them up).
- **Answer-first content structure:** every cluster post opens with a 40–60 word direct answer, then the depth. This is what answer engines lift.
- **`/trust` as the canonical compliance answer** — one authoritative, schema-marked page that answers "is IMS's AI automation secure/GDPR/ISO-aligned," so an answer engine has one clean source to quote.

### 7.3 GEO (get cited by generative engines) — Princeton/KDD-grounded tactics
Evidence-based levers (Princeton GEO study, statistically significant citation-visibility lifts): **cite authoritative sources +40%**, **add statistics +37%**, **add quotations +30%**, **authoritative tone +25%**, **keyword-stuffing −10%**. Applied:
- Every published claim ships a **statistic** (IMS's real headline numbers: "82 minutes/person/day returned," "8 hours → 45 minutes") and, where possible, a **cited source** (the standards bodies, market data).
- **`llms.txt`** at root (the `/services/seo` page already promises this — deliver it): a concise machine-readable summary of who IMS is, services, pricing, proof, and the canonical answer to "what does IMS do."
- **Entity clarity:** consistent Organization + Service + FAQPage + BreadcrumbList JSON-LD `@graph` per page (the AH `SITE_PLAN_D` pattern), so engines resolve "IMS Consultancy" as a clean entity with defined services and a location (London).
- **robots.txt** explicitly allows the reputable AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) — you cannot be cited by an engine you block.
- **Quotable blocks:** each service/industry page carries one crisp, self-contained, attributable sentence an engine can lift verbatim (built from the footer-voice register).

### 7.4 Schema inventory
`Organization` (sitewide), `Service` (each service + industry), `FAQPage` (`/faq` + inline), `Article` (`/insights/[slug]`, author/publisher embedded), `CaseStudy`/`Article` (`/work/[slug]`), `BreadcrumbList` (all), `AggregateRating` only if real reviews exist (never invent — `AGENTS.md`/GSC rules).

---

## 8. Risks & honest calls (per quality doctrine — critique with the fix attached)

- **Anonymity vs. trust.** The site has zero named social proof, no founder face, no team. For a "senior operator" buyer that reads as either discretion (good) or a solo freelancer hiding (bad). **Call:** add one real, named human at `/about` (founder, first-person, one photo) — it's the highest-ROI trust lift and it's a discovery question, not my call to invent. Flagged for you.
- **Cinematic consistency across six fal.ai legs.** AI video can drift in style leg-to-leg. **Fix:** one model for the whole chain, byte-identical style preamble, seed-locked stills, and eyeball each leg's last frame before chaining the next (scroll-world's own discipline). A stubborn leg falls back to `kling-video/v3/pro`.
- **Scroll-world on mobile.** Scrubbing heavy video on phones stutters. The engine hardens this (720p `-g 4` encodes, seek-coalescing, iOS priming) — must be QA'd on a real device per the skill's Step 8, not assumed.
- **fal.ai MCP not connected this session.** No generation can fire until the `fal-ai` server is added to `~/.claude.json` with the `FAL_KEY` from `VAULT_IMS.md` (key never pasted in chat) and loaded in an interactive session. Doesn't block planning, the content engine, or Remotion work — only the fal.ai asset renders. I can wire it for you on the go-word.
- **Don't over-build the wow at the expense of the funnel.** The hero earns attention; the content earns revenue. If time is tight, the content engine (§6) and schema (§7) ship *first* — they're the money path (§MO5) — and the cinematic hero follows.

---

## 9. Build sequence (EPICs — gated on go-word + Gate G0)

- **A — Foundations & fixes:** resolve the two taxonomies + two pricing structures; unify the Industries shell; token evolution pass via `design-taste-frontend` → `ui-ux-pro-max`. Ships as the corrected current site. *User checkpoint here — first structurally-visible milestone.*
- **B — Content & SEO/AEO/GEO engine:** `/work/[slug]`, `/trust`, `/insights` pillar + first clusters, all schema, `llms.txt`, robots, sitemap. This is the money path — can ship independent of the hero.
- **C — Scroll-world hero, single scene:** Remotion scene 1→2 + the scrub engine adapted to Next.js (`HeroScrollWorld.tsx`), DOM-text fallback proven. *User checkpoint — the "wow" milestone.*
- **D — Full six-scene chain + the `momentum` chapter:** complete the Remotion fly-through, seam QA, mobile QA, `emil-design-eng` Before/After pass.
- **E — Motion polish & micro-interactions:** Motion entrance/hover states, `impeccable` final holistic pass, full acceptance gate (build/routes/links/copy sweep/schema validate) from my terminal.

Each EPIC: `tsc --noEmit` + build clean, route + link sweep, copy sweep (zero em-dash, no AI-tells), reduced-motion verified, results from my terminal — never "you check it."

---

## 10. What I need from you to start building

1. **Go-word** (and I open Gate G0 — `STATE.json`, docs pointer).
2. **The `/about` face call** — add one named founder + photo, or stay fully anonymous? (§8)
3. **Wire fal.ai** — confirm and I'll add the `fal-ai` MCP server to `~/.claude.json` using the `FAL_KEY` from `VAULT_IMS.md` (pulled locally, never shown in chat), so the §5 prompts can actually render. (Division of labour is set: fal.ai = cinematic stills + fly-through video; Remotion = exact-brand data-motion.)
4. **Priority if time-boxed** — cinematic hero first, or content/SEO engine first? (I recommend content-first; the hero is EPIC C either way.)

Nothing builds until you answer. This document is the plan.
