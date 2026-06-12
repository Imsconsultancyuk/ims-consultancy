@AGENTS.md

# IMS Consultancy — Project-Specific Guidance

## Stack baseline

- Next.js 16.2.4 (App Router) · React 19.2.4 · Tailwind 4 · TypeScript 5 strict
- Smooth scroll: Lenis · Animation: GSAP + ScrollTrigger + `motion` (Framer Motion v12, package name `motion`)
- Identity: `imsconsultancy2026@gmail.com` · GitHub `Imsconsultancyuk/ims-consultancy` · Hosting: Netlify · Domain via Cloudflare
- Per-repo git identity is set locally on this repo. Do NOT touch git config.
- Site email: `info@intelmadesimple.com` (never `hello@`)

---

# LESSONS LEARNED — errors made + fixes applied

Do NOT repeat these mistakes. This list grows; never shrinks.

---

## 1. Hover/flip cards: never wrap in PointerTilt

**Bug:** Approach tiles on home used `<PointerTilt>` wrapper with the `.ims-flip-card` article inside. The full mauve hover-flip never triggered — colors "glitched". Quiet Patterns cards (no PointerTilt) worked fine.

**Cause:** PointerTilt applies `transform: rotateX/Y` which creates a new stacking context. The `:hover` cascade still works, but the visual transitions interfere with backdrop-blur + the mauve fill swap, causing partial/inconsistent paint.

**Fix:** Flip cards do NOT get a PointerTilt wrapper. The diagonal sweep + colour flip is enough motion.

**Rule:** Choose ONE motion treatment per card: tilt OR flip. Never both.

---

## 2. Entrance animation must NEVER gate-keep text visibility

**Bug:** CinematicTitle used `gsap.set(lineEls, { opacity: 0 })` on mount, then `ScrollTrigger.create({ onEnter })` to reveal. Under Lenis smooth scroll, ScrollTrigger sometimes failed to fire — text stayed permanently invisible. User reported "no text in video section".

**Fix:** Render text visible by default (SSR + no-JS = visible). Use progressive enhancement:

```ts
useEffect(() => {
  // Add 'js' class so :not(.is-in) selectors apply only when JS is alive
  document.documentElement.classList.add("js");
}, []);
```

Then in CSS:
```css
.cinema-line > span { opacity: 1; transform: translateY(0); }
html.js .cinema-section:not(.is-in) .cinema-line > span { opacity: 0; transform: translateY(48px); }
```

IntersectionObserver toggles `.is-in`. Add a 1200ms safety timer that force-shows the class regardless. If JS dies entirely, the text is still there.

**Rule:** Never use GSAP `set(opacity:0)` as the only source of visibility. If JS pauses, text vanishes. Progressive enhancement via CSS + IO is the contract.

---

## 3. Scroll-out parallax must NOT animate opacity for content meant to be visible

**Bug:** Hero had `gsap.to(opacity:0, scrub:1.1)` on scroll-out. When user scrolled back to top, opacity stayed at end-state under Lenis interpolation. Hero looked empty on return.

**Fix:** Parallax with `y` translation only. Let the next section's solid background naturally cover the hero. Never opacity-zero content that's meant to be visible at the top.

```ts
// CORRECT
gsap.to(headline, { y: -160, ease: "none", scrollTrigger: { scrub: 1.1 }})

// WRONG
gsap.to(headline, { y: -160, opacity: 0, ease: "none", scrollTrigger: { scrub: 1.1 }})
```

---

## 4. `.ims-glass-cinema` is heavy — apply ONLY to true editorial titles over video

**Bug:** Applied `ims-glass-cinema` class to the CTA "Ready to make a clearer move?" heading. The `text-shadow` (48px halo) + `filter: drop-shadow(38px mauve)` made the text look BLURRED.

**Fix:** Reserve `ims-glass-cinema` for huge serif titles laid directly over a busy video backdrop (cinematic chapter anchors only). Standard headings get `text-paper-ink` and nothing else.

---

## 5. CSS `filter` overrides SVG `filter` attribute

**Bug:** Tried to animate the chart output bar with `@keyframes` that animated CSS `filter`. The bar already had `filter="url(#glow-consol)"` as an SVG attribute. CSS filter wins — the glow disappeared between keyframes.

**Fix:** Animate `opacity` instead of `filter` when an SVG filter is attached. Or define the animation entirely inside the SVG with `<animate>` / `<animateMotion>`.

---

## 6. SVG `transform: scale()` needs `transform-box` + `transform-origin`

**Bug:** Chart dots tried to pulse with `@keyframes { transform: scale(1.6) }` on a `<circle>` element. The circle scaled from the SVG viewport corner, not its centre. Looked broken.

**Fix:** Every CSS-animated SVG transform needs:
```css
.ims-chart-pulse {
  transform-origin: center;
  transform-box: fill-box;
  animation: pulse 3.4s ease-in-out infinite;
}
```

**Alternative:** Use SVG `<animate>` / `<animateTransform>` directly — no `transform-box` needed and broader browser support.

---

## 7. SMIL `<animateMotion>` is the most reliable way to move dots along paths

**Bug:** Tried multiple times to make travelling packets along curves using CSS `motion-path`. Inconsistent across browsers under SSR + hydration.

**Fix:** Use SMIL inside the SVG:

```jsx
<circle r="2">
  <animateMotion dur="3s" repeatCount="indefinite" path="M..." />
  <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
</circle>
```

Works everywhere, no JS, no hydration concerns. Used in ToolFeedOverlay + ArtisticCharts.

---

## 8. CSS `r` animation on SVG circles — partial browser support

**Bug:** Used `@keyframes { r: 8; ... r: 100 }` for ripple expansion. Only Chrome 105+ supports `r` as a CSS animatable property — Safari often fails.

**Fix:** Use SMIL `<animate attributeName="r" values="8;100">` instead. Universal support.

---

## 9. Layout/contrast: if a card flips bg, its child SVGs need a contrast fix

**Bug:** Made Quiet Patterns cards flip to `bg-mauve-500` on hover. The mauve-stroked SVG charts inside became low-contrast against the mauve background.

**Fix:** Add a hover-state CSS filter swap so the chart converts to paper on hover:
```css
.ims-flip-card .ims-chart { transition: filter 0.5s; }
.ims-flip-card:hover .ims-chart { filter: brightness(0) invert(1) opacity(0.92); }
```

`brightness(0) invert(1)` is a reliable trick to convert any colour to white without touching gradient stops.

---

## 10. Brand icons: use authentic Simple Icons paths, never invent

**Bug:** First version of ToolFeedOverlay drew abstract envelope/grid shapes for "Gmail/Sheets/etc". User read them as not-Gmail-not-Slack. Lost recognisability.

**Fix:** Pull the authentic CC0 SVG paths from Simple Icons (simpleicons.org) and inline them in `BrandIcons.tsx`. Render with the brand's signature hex colour as fill.

**Rule:** If a brand logo is needed, the only acceptable source is Simple Icons (CC0) or the official brand kit. No inventions, no approximations.

---

## 11. Drift-and-Forge structural cues are useful — copy is not

**Bug:** Modelled the footer structure on Drift and Forge, including their copy patterns: "Response within 4 hours, guaranteed" and the four-equal-column directory layout. User flagged this as visibly copied.

**Fix:** When modelling structure from another site, take only the *architecture* (column count, hierarchy, density). NEVER take the copy, the promise statements, the row of cliché badges, or distinctive component patterns ("response promise" boxes, signature taglines).

**Audit checklist when shipping anything brand-adjacent:**
- Does any phrase appear verbatim on a competitor/reference site?
- Does the layout follow a 1:1 column-count match?
- Are any unique structural patterns (promise boxes, badge rows) lifted directly?

If yes to any → rework.

---

## 12. Anchor-only navigation breaks on subpages

**Bug:** Header nav used `href="#approach"`, `href="#voices"`. On `/about` and `/services` those anchors do not exist, so the links no-op or jump to the page top.

**Fix:** Anchors that point to home-page sections must be absolute-path prefixed: `href="/#approach"`. Subpage links use full routes. Pure-anchor only works if the same section ID exists on the current page (e.g. `#contact` works everywhere because every page has a footer with `id="contact"`).

---

## 13. Never ship a route that doesn't exist as a nav link

**Bug:** Footer linked to `/privacy`, `/work`, `/notes`, `/frameworks` — none of those routes existed. 404s.

**Fix:** Before pushing any nav update, run a link sweep:
```ps
$pages = '/','/about','/services',...
foreach ($p in $pages) {
  $html = (Invoke-WebRequest "http://localhost:3000$p").Content
  [regex]::Matches($html, 'href="(\/[^"#?]+)"') | %{$_.Groups[1].Value} | sort -u | %{
    Invoke-WebRequest "http://localhost:3000$_" -TimeoutSec 4
  }
}
```

Zero failures or you do not push.

---

## 14. Test/debug routes do not belong in `app/`

**Bug:** `app/test/page.tsx` was a brand-swatch debug page. It shipped to production as `/test` because every directory under `app/` becomes a public route in App Router.

**Fix:** Debug pages go in `app/_debug/` (underscore prefix excludes from routing), or behind a `NEXT_PUBLIC_DEBUG` env flag, or deleted entirely before push.

---

## 15. Per-repo git identity is REQUIRED for Vercel/Netlify

**Bug (covered in CLIENT_ISOLATION.md):** Vercel/Netlify blocks deploys when commit author email doesn't match any GitHub user on the deploying team.

**Fix:** Always set per-repo:
```ps
git config user.email "imsconsultancy2026@gmail.com"
git config user.name  "IMS Consultancy"
```

Never `--global`. Verify with `git config user.email` before first commit.

---

## 16. PowerShell `$HOME` is a read-only constant

**Bug:** Used `$home = (Invoke-WebRequest ...).Content` in smoke-test PowerShell. Threw `VariableNotWritable`.

**Fix:** Use `$page`, `$content`, `$html` — any name that isn't a PowerShell automatic variable. Avoid: `$HOME`, `$PWD`, `$PROFILE`, `$NULL`, `$TRUE`, `$FALSE`, `$ERROR`, `$INPUT`, `$ARGS`, `$HOST`.

---

## 17. `npm` in PowerShell hits execution-policy block

**Bug:** `npm run build` directly in PowerShell triggered `npm.ps1` which is blocked by execution policy.

**Fix:** Always pipe through cmd:
```ps
cmd /c "npm run build" 2>&1
```

Same for `npm run start`, `npm install`, etc. Documented in PowerShell rules.

---

## 18. Background `npm run start` reports failed but server is fine

**Bug:** `run_in_background: true` for `npm run start` always reports task status `failed` because the server runs forever instead of exiting cleanly.

**Fix:** Ignore the task-notification failure for long-running servers. Trust the `Invoke-WebRequest READY` probe instead. Kill with `taskkill /F /IM node.exe` when done.

---

## 19. Lenis + ScrollTrigger requires explicit wiring

**Bug:** Initial Lenis install + GSAP ScrollTrigger didn't sync — pinned/scrub animations fired at wrong scroll positions.

**Fix:** In SmoothScroll.tsx wire them:
```ts
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

Already done — never remove unless removing Lenis entirely.

---

## 20. Tailwind 4: use `@theme` NOT `@theme inline`

**Bug:** Used `@theme inline` early on. It strips var declarations from `:root`, breaking any custom CSS that referenced `var(--color-deep)` etc.

**Fix:** Use plain `@theme { ... }` in globals.css. Tailwind 4 will emit the vars into `:root` automatically.

---

## 21. Don't add backdrop-blur to elements with heavy `filter: drop-shadow`

**Bug:** Layering backdrop-blur on a card that also had `filter: drop-shadow()` for a glow caused paint artefacts on Safari.

**Fix:** Pick one. `backdrop-blur` for the glass effect, OR `filter: drop-shadow` for the glow. Use `box-shadow` for glow when backdrop-blur is already there.

---

## 22. Email migration is a discovery question

**Bug:** Started the site with `hello@intelmadesimple.com` throughout (8 files). User wanted `info@`. Had to grep-and-replace.

**Fix:** At project kickoff ask: "What's the canonical contact email? (info@, hello@, contact@, founder name@, ...)". Lock once.

---

## 23. Don't ship newsletter/response-promise/lifestyle copy unless explicitly asked

**Bug:** Added an "IMS letter" newsletter signup band + "Response within 4 hours, guaranteed" promise box without being asked. Both later removed.

**Fix:** A consulting site doesn't need these by default. The visitor needs: clear positioning, scope, proof, contact. Anything else is decoration.

---

## 24. `/llms.txt`, sitemap, robots — keep in DOM but visually hidden from sighted users when requested

**Bug:** User wanted these discoverable by crawlers but not visible to humans.

**Fix:** Use `sr-only` Tailwind class on a `<nav aria-label="Discovery for search and AI crawlers">` block. Crawlers parse the DOM and follow the links. Sighted users don't see clutter.

```jsx
<nav aria-label="Discovery for search and AI crawlers" className="sr-only">
  <ul>{CRAWLER_LINKS.map(...)}</ul>
</nav>
```

---

## 25. Acceptance gate before every push

The user has explicitly demanded this. Mandatory pre-push checklist:

1. `npm run build` — clean, all routes prerender
2. `npm run start` + curl every page route — every URL returns 200
3. Internal link sweep — every `href="/..."` from every page → 200
4. JSON-LD validation — Rich Results Test, no errors
5. Copy sweep — no em-dashes (`—`), no AI-tell words (`leverage`, `bespoke`, `seamless`, `holistic`, `synergy`, `crafted`, `journey`), no Drift cliché ("Response within X hours")
6. Email sweep — only `info@intelmadesimple.com`, never `hello@`

Run all six. Report results from MY terminal output, not "go check it yourself".

---

# Skill stack defaults for THIS project

- Phase 5B (Active Work — Development) is the default lane.
- Always-on: `frontend-patterns`, `coding-standards`, `verification-loop`, `e2e-testing`, `security-review`, `impeccable` (for visual polish).
- Motion library bias: `motion` (Framer Motion v12) for component-level entrance + ambient backgrounds; GSAP for scroll-driven parallax + ScrollTrigger; CSS `@keyframes` for continuous idle loops.
