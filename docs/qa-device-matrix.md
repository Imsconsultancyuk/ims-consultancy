# IMS-063 · Cross-device manual pass

**Ticket AC:** Matrix table completed in `docs/qa-device-matrix.md`, all cells pass. Focus areas: chip tap-to-run on touch, drag on desktop, reduced-motion mode, ink-section contrast, no horizontal scroll at 360px.

## Scope note — engine-based proxies, not physical devices (read this first)

This environment has no physical iOS Safari, Android Chrome, or macOS Safari hardware. Doc 1's 5-target matrix is approximated with Playwright's own rendering engines, which is real cross-engine coverage but is **not** a claim of physical-device verification:

| Doc 1 target | Proxy used |
|---|---|
| Desktop Chrome | `chromium` engine, `devices["Desktop Chrome"]` |
| Desktop Firefox | `firefox` engine, `devices["Desktop Firefox"]` |
| Desktop Safari | `webkit` engine, `devices["Desktop Safari"]` |
| Android Chrome | `chromium` engine + Pixel 7 UA + `isMobile: true` + `hasTouch: true` |
| iOS Safari | `webkit` engine + iPhone 14 UA + `isMobile: true` + `hasTouch: true` |

Config: `playwright.device-matrix.config.ts` (new, deliberately separate from the locked `playwright.config.ts` — see "Deviation from Doc 1 file map" below). Tests: `tests/qa/device-matrix.spec.ts`. Run against a production build (`next build && next start`), matching every other gate in this build.

Run with:
```
npx playwright test --config=playwright.device-matrix.config.ts
```

## Result

**76 passed, 10 skipped (capability-gated, not failures), 0 failed.**

One real defect was found and fixed during this pass (see below). One pre-existing, out-of-scope console warning appears in the raw logs and is excluded from the pass count per the note under "Console warnings."

## Matrix table

Breakpoints: 360, 768, 1280, 1536. ✅ = pass, ➖ = not applicable to that project (touch tests only make sense on the two touch-proxy projects; drag tests only make sense on the three non-touch desktop projects).

| Check | desktop-chrome | desktop-firefox | desktop-safari | android-chrome-proxy | ios-safari-proxy |
|---|---|---|---|---|---|
| No horizontal scroll @ 360/768/1280/1536 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Hub + industry page load clean (200, no console errors) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ink-section contrast renders (IMS-061 fix holds) @ all 4 widths | ✅ | ✅ | ✅ | ✅ | ✅ |
| Reduced-motion → static tabbed results @ all 4 widths | ✅ | ✅ | ✅ | ✅ | ✅ |
| Chip tap-to-run @ 360/768 | ➖ (no touch) | ➖ (no touch) | ➖ (no touch) | ✅ | ✅ |
| Drag chip onto drop zone @ 1280/1536 | ✅ | ✅ | ✅ | ➖ (touch path, not desktop pointer) | ➖ (touch path, not desktop pointer) |

Every cell that applies to a given project/target passes. The ➖ cells are deliberate scope exclusions, not gaps: `.tap()` requires `hasTouch: true` (only set on the two mobile-proxy projects), and drag-and-drop represents the desktop pointer interaction Doc 1 asks for, so it's restricted to the three non-touch desktop projects.

## Defect found and fixed: horizontal scroll at 360px

**Symptom:** `/industries/mortgage-brokers` at 360px viewport had `document.documentElement.scrollWidth` of 398px against a ~350–360px `clientWidth` — a genuine ~38–48px horizontal overflow, failing the ticket's explicitly named "no horizontal scroll at 360px" focus area. Reproduced identically across all 5 engine targets.

**Root cause:** `SampleFileChip` (`components/industry/demo/SampleFileChip.tsx`) renders as a `<button>` inside a `flex flex-wrap gap-3` list (`app/industries/[slug]/page.tsx`). The button had no width cap, so its intrinsic content width — icon + label/meta column + the `whitespace-nowrap` "Synthetic sample" badge — exceeded the available row width at 360px and pushed the whole page wider than the viewport. Confirmed via a throwaway diagnostic script (`node`, direct DOM `getBoundingClientRect()` sweep) that pinpointed the three `SampleFileChip` buttons and their badge spans as the only overflowing elements on the page — no other component was implicated.

**Fix:** `components/industry/demo/SampleFileChip.tsx` — added `max-w-full flex-wrap` to the button's class list (`flex items-center gap-3 ...` → `flex max-w-full flex-wrap items-center gap-3 ...`). This caps the button at its container's width and lets the badge wrap onto a second line inside the chip when space is tight, instead of forcing the page to scroll. No markup changes, no parent-container changes, no content hidden (the "Synthetic sample" badge stays visible per AD-3/AD-4 — it just wraps). Verified with the diagnostic script: 0 overflowing elements after the fix, and the full matrix's "no horizontal scroll" checks now pass on all 5 targets at all 4 breakpoints.

## Console warnings (out of scope, pre-existing)

`desktop-firefox` logs `[warning] THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.` at all 4 breakpoints. This is not counted as a failure and is excluded from the "hub + industry page load clean" check's pass criteria for that one project/browser combination.

This is the same sitewide, root-layout-level Three.js dependency already root-caused and documented as out of scope in `docs/lighthouse-report.md` (IMS-061): `app/_components/NoiseField.tsx` imports `three` + `@react-three/fiber` and mounts on every route via `app/layout.tsx`, outside Doc 1 §2's route/file map for the Industries feature. It is a pre-existing site-wide issue, not something introduced by or specific to the Industries pages, and fixing it is outside this ticket's and this build's scope.

## Deviation from Doc 1 file map

Doc 1 §2 does not list any cross-device testing tooling in its route/file map. IMS-063's own ticket text unambiguously requires a device/viewport matrix that didn't previously exist, so two new files were added (governing-brief rule 7's explicit exception for ticket-required additions absent from the file map):

- `playwright.device-matrix.config.ts` — new, separate Playwright config. Deliberately does not modify the locked `playwright.config.ts`, so this one-off QA tooling stays out of the `test:e2e` CI gate.
- `tests/qa/device-matrix.spec.ts` — new test directory (`tests/qa/`), separate from the locked `tests/e2e/`.

Both are flagged here and in the commit message as additions outside the file map, per rule 7.
