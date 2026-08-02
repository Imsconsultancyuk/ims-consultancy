# Dala-informed hero — structure + motion ported to IMS

*Studied `dala.craftedbygc.com` live (Playwright, 2026-07-24). This ports its **structural and motion patterns** — layout system, scroll choreography, the living-particle technique — into IMS's own brand and content. It does NOT copy Dala's visuals, copy, palette, or its signature marker. Architecture and interaction technique transfer; brand expression does not (LESSONS #11, design-quality O3). This is the "same category, distinct shape" the user chose (option A).*

## What Dala actually is (abstract read, not its content)
- **One full-page scroll-driven WebGL particle field** is the primary canvas. As you scroll, the field expands, reorganises, shifts colour, and its core brightens — a continuous scroll-scrubbed animation spanning the whole page.
- **Asymmetric split hero:** oversized left-aligned headline, the animated field to the right/centre. Massive scale-over-weight type, tight leading, generous negative space.
- **Branded preloader** that assembles the field before the hero reveals.
- **Minimal fixed nav:** 3 text links + one saturated pill CTA. Void base. Single accent. 1–2 elements per viewport (very airy).
- **Sparse text moments** float over the field at scroll beats rather than conventional stacked content sections.

## The port to IMS (patterns kept, brand swapped)
| Dala pattern (kept) | IMS expression (distinct) |
|---|---|
| Void-black canvas | IMS **jewellery-box dark `#1a1620`** (not pure `#000`) — IMS's own dark band |
| Single purple accent | IMS **mauve `#786478`/`#b4a0b4`** + the signal hues in the field only |
| Chromatic outlined **triangles** in a brain/sphere | Circular **point sprites** in a **network/mesh** formation (connected-systems = IMS's positioning). NOT triangles, NOT a brain silhouette |
| Geometric sans, huge | **Cormorant Garamond** display at huge scale (brand continuity) — the scale carries the boldness, the serif keeps it IMS. (Open decision: a bolder geometric for the split headline if you want to lean harder to Dala.) |
| "Unlock collective wisdom." | IMS's own words: **"Get the manual work off your team."** |
| Live WebGL field spanning the page | Evolve the **existing `NoiseField.tsx`** (already R3F) into a scroll-reactive mauve constellation. Reuse `@react-three/drei` `<Points>` (installed, unused) |
| Branded preloader assembles the field | IMS preloader: the mesh assembles in mauve on the dark band, then the hero headline reveals |

## Motion technique (the reusable engineering)
- Live particle system: `@react-three/drei` `<Points>`/`<PointMaterial>`, ~2000–3000 instanced points, per-particle vertex colours cycling IMS mauve + 2–3 signal hues.
- **Scroll-reactive:** `useScroll`/ScrollTrigger progress drives the field — expand radius, brighten core, drift/reorganise between formations (chaos → connected mesh → resolved), mirroring the Decide → Build → Compound story.
- Mouse parallax (reuse NoiseField's existing `mouseRef`).
- **Guards (non-negotiable):** `prefers-reduced-motion` → static field or none (return null); viewport-width gate to cut particle count on mobile (per bright-petting-cookie §2 perf gate); text is DOM-native and never gated behind the canvas (LESSONS #2).

## Where the fal.ai cinematic diorama fits
The fal.ai hero I built is a *different* wow (pre-rendered clay-diorama scrub). Dala's feel is the **live particle field**, so the hero becomes the constellation. The 6 fal.ai stills are not wasted — they become the **"where AI fits" chapter** and section atmosphere further down the page. Two visual moments, one page.

## Reconciliation with the earlier rejection
The 2026-07-23 rejected build put a particle field on **pure void-black + purple + bold sans** — an off-brand AI-startup skin. This spec keeps IMS's dark band, mauve, serif, and content, and a distinct formation/shape. Same motion category, IMS shape. The rejection was the *skin*, not the *technique*.

## Build sequence (checkpoint early)
1. Evolve `NoiseField.tsx` → scroll-reactive mauve mesh constellation (standalone, testable).
2. Asymmetric-split hero on the dark band: left Cormorant headline + right/centre constellation + one mauve pill CTA + minimal nav.
3. **Screenshot → checkpoint with user** (before building the preloader or the rest of the page).
4. Preloader + scroll beats + fold the fal.ai chapter in.
5. `emil-design-eng` → `impeccable`. Never self-graded.
