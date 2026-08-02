# IMS Consultancy — Design Direction

*Output of the `design-taste-frontend` pass on the real brief, grounded in IMS's own brand voice. This is the artifact whose absence caused the 2026-07-23 rejection (an external aesthetic was copied with no taste pass). Nothing is self-graded here — this is the direction to approve, then build against, then re-check through `ui-ux-pro-max` → `emil-design-eng` → `impeccable`.*

## Design Read
Redesign of a UK AI-automation + development consultancy site for **senior operators** (owners, MDs, partners in regulated professional-services firms). Quiet, editorial, high-trust language. **Preserve mode** — evolve IMS's own identity, do not overhaul, do not copy any external product.

**Dials (user chose "evolve but bolder" 2026-07-24):** `DESIGN_VARIANCE 7` · `MOTION_INTENSITY 8` · `VISUAL_DENSITY 3`
- Variance 7: push contrast and scale harder — bigger display type, more asymmetry — while staying disciplined enough for senior-operator trust. A real step-change, not an Awwwards experiment.
- Motion 8: advanced scroll choreography (pinned/scrubbed hero, sticky-stack, scroll-driven reveals). Still motivated (hierarchy, storytelling, feedback), never motion-for-show.
- Density 3: art-gallery airy. A quiet, expensive consultancy breathes. Big section gaps, few elements per viewport. Bolder does NOT mean busier.

## Decisions locked (2026-07-24)
- **/about:** named founder + first-person bio, **no photo** (personal without exposure). You supply the name; I build the page.
- **Priority:** cinematic scroll-world hero FIRST, content/SEO engine second. Hero video pixels gated on `FAL_KEY`.

## Redesign mode: PRESERVE (11.A/11.C)
The prior redesign failed because it went **overhaul + copy**. This one evolves the existing brand:
- **Extract and keep the brand tokens** — warm mauve/paper light band, jewellery-box dark band, mauve accent (`--color-mauve-500 #786478`). A brand that is already mauve stays mauve (LILA-rule override, applied to the real brand).
- **Keep the copy voice** — the footer line is the north star: *"a small private consultancy from London... quietly and with discipline."* Visual modernisation, not a content rewrite.
- **Keep IA stable for SEO** where routes exist; only ADD routes (`/work/[slug]`, `/trust`, `/insights/[slug]`), never silently rename (11.F).

## Serif decision (explicit, because the skill discourages serif by default)
**Keep Cormorant Garamond for display — justified override, not a default reach.** The skill very-discourages serif as a default AI tell, but permits it when the brand is genuinely editorial/heritage AND the choice is articulable. Here it is both: (1) the brand *already* deliberately uses Cormorant Garamond (locked 2026-05-22, in the current tokens), so preserve-mode keeps it; (2) senior-operator UK professional-services register is exactly the editorial/publication case the override is for; (3) Cormorant Garamond is in the skill's own "if justified" rotation pool. Body stays **Inter** (correct neutral pairing). Retire the dead `Cinzel` and unused `JetBrains Mono`; keep **Space Grotesk** for data/stat callouts only (this is what visually rejoins the Industries wing to the main site).

## Palette check (against the premium-consumer ban)
IMS's warm **mauve/plum + paper + jewellery-box dark** is NOT the banned beige+brass+oxblood+espresso family. It is a distinct, ownable direction. Keep it. One accent (mauve), locked across every section (Color Consistency Lock). The 10 Industries "signal" hues are re-derived for WCAG contrast on both bands and reserved for content-differentiation, never buttons.

## Theme lock
Deliberate **two-register composition** (the site's existing "light to dark journey"): the honest content (pricing, FAQ, trust, work) lives on the **light mauve/paper** band; the cinematic moments (hero, the one "where AI fits" chapter) live on the **jewellery-box dark** band. This is the one sanctioned theme device (4.11) — a considered light→dark story, not random mid-page inversion. Applied consistently, it *is* the brand.

## Layout families (avoiding the AI tells — at least 4 distinct across the page)
Homepage section families, no family used twice, zigzag capped at 2 consecutive:
1. **Scroll-pinned cinematic hero** (dark) — the fly-through. Headline ≤ 2 lines, one CTA, DOM-text fallback.
2. **Asymmetric three-door band** (light) — Decide / Build / Compound, not three equal cards; asymmetric grid with scale contrast.
3. **Sticky-stack** (light) — the 7-step methodology pins and stacks (canonical 5.A skeleton, `start: "top top"`).
4. **Scroll-pinned dark chapter** (dark) — "Where AI actually fits," Remotion ambient loop behind pinned copy.
5. **Editorial proof strip** (light) — the five case headline-numbers as large display numerals, not cards.
6. **Full-width closing CTA** (dark→light resolve) — one CTA intent site-wide ("Start a conversation"), never duplicated.

## Hard bans carried in (the tells the last build shipped)
- Zero em-dashes anywhere (already IMS law).
- No decorative status dots, no section-number eyebrows (`01 / Capabilities`), max 1 eyebrow per 3 sections.
- No three-equal-feature-cards. No `border-t`+`border-b` on every list row. No scroll cues. No locale/time strips. No version labels in the hero.
- Real images only (fal.ai per §5 of SITE_PLAN) — no div-based fake product UI, no hand-rolled decorative SVG.
- Every CTA one line, WCAG AA contrast, one intent per label.

## Quality floor
Must hold up next to what was delivered for **AH Architecture** (`Projects\ah-architects\`) — UI polish, motion craft, animation restraint. If it doesn't clear that bar, it is not done. Final sign-off is the skill chain + your eyes, never a self-grade in the same turn.

## The system (from `ui-ux-pro-max`, mapped onto IMS's own brand — NOT its default navy/gold)
`ui-ux-pro-max` returned the **Enterprise Gateway** pattern + **Trust & Authority** style for professional-services: path-selection nav, credentials surfaced, case-studies-with-metrics, security/standards badges, WCAG AAA. Its default palette (navy #1E3A8A + gold #B45309 + Poppins) is **rejected** — that is the copy-an-external-palette failure. We keep IMS's mauve/paper/Cormorant and borrow only the *structure*: surface the compliance standards (the `/trust` hub), lead proof with the real headline numbers, path-select by industry. Its anti-pattern "hidden credentials" independently backs the named-founder + `/trust` decisions.

### Type scale (bolder — variance 7; Cormorant Garamond display / Inter body / Space Grotesk stats)
| Role | Font | Size | Notes |
|---|---|---|---|
| Display XL (hero) | Cormorant | `clamp(3.5rem, 8vw, 7rem)` / leading 1.02 / tracking -0.02em | up from the current 4.75rem cap — the step-change |
| Display L (section H2) | Cormorant | `clamp(2.5rem, 5vw, 4rem)` / leading 1.05 | |
| H3 | Cormorant | `clamp(1.75rem, 3vw, 2.5rem)` | |
| Body L | Inter | `1.125rem` / leading 1.7 / max 65ch | |
| Body | Inter | `1.0625rem` / leading 1.7 | |
| Eyebrow/label | Inter | `0.75rem` uppercase tracking 0.22em | rationed: max 1 per 3 sections (taste rule) |
| Stat / number | Space Grotesk | `clamp(2.5rem, 6vw, 5rem)` tabular-nums | proof numerals + Industries wing — closes the font split |

### Palette steps + WCAG-AA (both bands) — evolve existing tokens, keep the names
- **Light band:** bg `--color-paper #f5eff3`; body text `--color-ink #1a1620` (AA+). Accent text needing AA on light uses `--color-mauve-700 #4e3f4e` (mauve-500 is borderline for body). Mauve-500 `#786478` reserved for large text / accents / rules only.
- **Dark band:** bg `--color-deep #1a1620`; body `--color-paper-ink #f5eff3` (AA+); secondary `--color-mauve-300 #b4a0b4`. CTA = mauve-300 fill + deep text (high contrast) — keep the existing pattern.
- **One accent locked** (mauve) across every section; 10 signal hues re-derived for AA on both bands, content-differentiation only, never buttons. A token-time contrast check verifies every pair before "done" — no assuming.

### Spacing / grid / shape
- 8px base (4/8/12/16/24/32/48/64/96/128). Section rhythm for density-3: `clamp(6rem, 10vw, 12rem)` vertical (airy). Container `max-w-[1400px] mx-auto`, gutters widen at `lg`. Grid over flex-math. `min-h-[100dvh]` for the pinned hero, never `h-screen`.
- One radius system: `--radius 0.75rem` for surfaces, pill `9999px` for tags/dots/CTAs. No mixed radii without a rule.

## Next design steps (gated)
1. ~~Direction approved~~ ✓ (bolder, 2026-07-24). ~~System from ui-ux-pro-max~~ ✓ (above).
2. **G1/G2 (light, T1):** SITE_PLAN → story/story-tree spec; ADR-001 for the Remotion dependency.
3. Build evolved tokens + ONE hero (scrub skeleton + DOM-text fallback) → **first visible milestone → checkpoint with you.** Hero video pixels gated on `FAL_KEY`.
4. `emil-design-eng` Before/After on the hero motion; `impeccable` final pass before any "done." Never self-graded.
