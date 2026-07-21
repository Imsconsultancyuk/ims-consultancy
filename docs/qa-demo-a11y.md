# IMS-045 — Demo a11y & touch hardening: QA record

Manual QA pass for the `components/industry/demo/` components (`SampleFileChip`,
`DropZone`, `LiveDemoPlayer`, `PipelineRail`, `ResultsPanel`,
`DemoContext`/`useDemoMachine`), performed against a purpose-built scratch
harness at `/dev/demo` (see file-map deviation note below). Executed live via
Playwright browser automation against `npm run dev` on 2026-07-21.

No industry page exists yet (IMS-050 hasn't started), so `/dev/demo` renders
all five components against synthetic dummy `Tool` data, wired through the
real `DemoArmProvider` + `DemoMachineProvider` composition. This mirrors the
`/dev/tokens` precedent from IMS-002.

## 1. Keyboard navigation

Tab order across the harness: chip A → chip B → chip C → (drop zone is not
independently focusable, matching AD — it is a paste/drag target, not a
keyboard-operable control) → Next.js dev overlay button. No missing or extra
focusable elements. Native focus rings are visible throughout — not
suppressed by any `outline: none` in the demo components.

Round-trip verified live:
1. `Enter` on a `SampleFileChip` → `arm()` + `run()` fire, machine transitions
   through all four pipeline stages.
2. `PipelineRail` live-updates its record counter and stage label while
   processing (`aria-live="polite"` region announces progress).
3. On completion, focus moves to `ResultsPanel`'s headline (`tabIndex={-1}` +
   `.focus()` in effect) and the combined headline+metrics string announces
   exactly once via `aria-live="polite"`.
4. Tab continues in DOM order: "Book 20 minutes" link → "Run another tool"
   button.
5. `Enter` on "Run another tool" calls `reset()` and refocuses a
   `[data-sample-chip]` element — confirmed via live `document.activeElement`
   inspection returning the chip button after activation.

**One anomaly, not reproduced:** during an early, rapid/batched exploratory
pass (multiple `Tab` presses issued without checking state between each,
shortly after page load), a stray `demo_file_dropped` + `demo_completed`
analytics event pair for `dev-tool-a` appeared after a bare `Tab` press, with
focus unexpectedly back on chip A instead of advancing. A careful, single-
stepped retest of the identical key sequence (one `Tab` per check, console +
`document.activeElement` inspected after every press) reproduced correct
behavior with zero spurious events at every step. No code path in
`SampleFileChip`, `DropZone`, or the shared `useDemoMachine` reducer/effects
can be triggered by a bare `Tab` keypress, and the anomaly did not recur
across the rest of this session (including a second full pipeline run during
the touch pass, section 3). Most likely explanation: dev-server/HMR timing
noise from batching tool calls immediately after a fresh page load, not a
defect in the shipped components. Recorded here rather than silently
dropped; if this ever reproduces against a real industry page, revisit.

## 2. Touch target sizing (≥44px)

Measured via `getBoundingClientRect()` on every interactive element in the
demo components:

| Element | Before | After |
|---|---|---|
| `SampleFileChip` × 3 | 305×62 | — (already compliant) |
| `DropZone` drop target | 1814×144 | — (already compliant) |
| "Book 20 minutes" link (`ResultsPanel`) | 308×44 | — (already compliant) |
| "Run another tool" button (`ResultsPanel`) | **110×20** | **110×44** |
| `LiveDemoPlayer` reduced-motion tool tabs × 3 | 98×44 / 97×44 / 98×44 | — (already compliant) |

**Fix applied:** `ResultsPanel.tsx`'s "Run another tool" button had no
padding or min-height — it was a bare underlined text link sized to its
line-height (20px tall), under the 44px minimum. Added
`inline-flex min-h-[44px] items-center` (the same `min-h-[44px]` pattern
already used by `LiveDemoPlayer`'s tool tabs), which grows the tap target to
110×44 without changing the visual weight or copy of the control.

Re-verified at a 390×844 mobile viewport (see section 3) — all elements
remain ≥44px in both dimensions; no responsive shrinkage below the minimum.

## 3. Cross-browser / touch substitute pass

The available browser-automation tool surface for this session controls a
single Chromium instance; there is no engine-switch capability to launch a
genuine WebKit (Safari) browser. Substitute methodology used, disclosed
honestly rather than claimed as a literal device pass:

- **Android Chrome proxy:** Chromium (the actual engine) with CDP
  `Emulation.setDeviceMetricsOverride` (390×844, `mobile: true`,
  `deviceScaleFactor: 3`) and `Emulation.setTouchEmulationEnabled(true)`.
  Tapped a `SampleFileChip` under this emulation — pipeline ran to
  completion correctly (`demo_completed` analytics event fired, zero console
  errors/warnings throughout).
- **iOS Safari:** **not performed.** No WebKit engine was available through
  this tool surface. Flagging this as an explicit gap — a real device or a
  separately-launched Playwright WebKit browser should run this same chip
  →pipeline→results→reset flow before this ships past preview, if a
  literal Safari pass is required by a later gate.

## 4. `prefers-reduced-motion`

Verified live via CDP `Emulation.setEmulatedMedia` with
`prefers-reduced-motion: reduce`, then a full page reload (so
`useSyncExternalStore`'s initial snapshot picks it up, not just a live
toggle):

- `LiveDemoPlayer` renders its static tabbed composite (`role="tablist"` +
  one selected tab's result, no ambient auto-cycling) instead of the
  ambient loop — confirmed via snapshot immediately after reload.
- `ResultsPanel`'s `CountUpMetric` jumps directly to the final value with no
  count-up animation (verified both via the code path — `if (reduced) {
  target.textContent = value; return; }` — and by observing the tab's
  result metrics render at their final values immediately, never at `0`).

## 5. Contrast — out of scope, flagged only

Two findings from the token-level WCAG audit are **not** part of IMS-045's
scope (touch/keyboard/motion hardening, not a contrast remediation ticket)
and are recorded here for whoever picks up the eventual contrast pass:

- `PackageBlock.tsx`'s `text-sm text-positive` renders at **3.82:1** against
  its background — below the 4.5:1 small-text minimum (it does not qualify
  for the large-text carve-out).
- `--color-line` (used for dashed interactive borders, e.g. `DropZone`'s
  default state) renders at **1.29:1** against `--color-paper` — well under
  the 3:1 UI-component minimum. Only affects the non-hover/non-drag-over
  resting state; the drag-over state swaps to a signal-accent border which
  passes.

Neither was touched under this ticket per hard rule 6 (surgical scope).

## Verification gate (this ticket)

- `npx tsc --noEmit` — clean.
- `npx eslint --max-warnings 0` (scoped to files this ticket touched) —
  clean.
- `npm run build` (includes `validate:content`) — clean, `/dev/demo` present
  alongside all existing routes.
