# IMS-001 · Repo Audit & Integration Plan — Industry Pages System

Audit date: 2026-07-21. Scope: `C:\Users\Admin\Projects\ims-consultancy`. Governing docs: `docs/build/01-IMS-Industry-Pages-System-Build.md` (Doc 1), `docs/build/02-IMS-Industry-Content-Pack.md` (Doc 2).

## 1. Framework & tooling inventory

| Item | Finding | Verdict |
|---|---|---|
| Framework | Next.js 16.2.4, App Router (`app/` dir, every route is `page.tsx`) | ✅ PASS — no migration note needed |
| React | 19.2.4 | ✅ compatible |
| TypeScript | ^5, `strict: true` already on, `@/*` → `./*` path alias already configured | ✅ PASS |
| Tailwind | v4 via `@tailwindcss/postcss`. Real tokens live in `app/globals.css` `@theme` block; `tailwind.config.ts` kept only for legacy class aliases (comment confirms globals.css is source of truth) | ✅ PASS, not missing/incompatible |
| Package manager | npm (`package-lock.json` present, no `pnpm-lock.yaml`) | Substitute all Doc 1 `pnpm` commands with `npm run` / `npx` per rule 7 |
| Lint | `eslint.config.mjs`, flat config, `eslint-config-next` core-web-vitals + typescript presets. No `max-warnings` baked into config. | Pass `--max-warnings 0` as a CLI flag when running the lint gate; no config edit needed |
| Existing scripts | `dev`, `build`, `start`, `lint` only. No `typecheck`, `validate:content`, `test:e2e`. | Add these three scripts as part of IMS-003 |
| Missing deps | `zod`, `schema-dts` absent from `package.json`. `resend` absent. | Add zod + schema-dts in IMS-003. Resend — see §5 below, needs your call. |
| Framer Motion | Repo already has `motion` ^12.39.0 — this is Framer Motion under its current package name (imports come from `motion/react`, not `framer-motion`). | AD-6 "add Framer Motion" is already satisfied — no new install, just use the existing package under its new import path |
| `docs/build/` | Does **not** exist in the repo yet — contrary to the brief, Doc 1/Doc 2 were only found at `C:\Users\Admin\Downloads\`. | Will copy both source docs into `docs/build/01-...md` / `02-...md` as the first file operation, so they're versioned with the work they govern |

## 2. Design tokens — reconciliation decision

Doc 1 §3 proposes a fallback palette (`paper #F7F6F2`, `ink #101418`, `line #D8D5CC`, `positive #1F8A5D`, 10 named `signal-*` accents), explicitly scoped as applying **"if repo tokens are absent."** They are not absent.

`app/globals.css` already defines a locked, dated palette ("Direction C: Light to Dark Journey", locked 2026-05-22):
- `--color-paper: #f5eff3` (warm mauve paper) — **same token name, different hex** than Doc 1's `#F7F6F2`
- `--color-ink: #1a1620` — **same token name, different hex** than Doc 1's `#101418`
- Mauve scale (`--color-mauve-50…900`), ink scale, radius scale, easing curves — all in active sitewide use across 19 pages

**Decision (recommended, not yet applied — awaiting your sign-off):**
- Reuse the **existing** `--color-paper` / `--color-ink` values for industry pages rather than introducing colliding duplicates with different hex codes. Two token names, two different colors, would be a real bug (whichever declaration loads last wins, silently reskinning the entire site).
- Add only the tokens that don't already exist anywhere in the current palette, additively: `--color-line` (hairline borders — nothing fills this role today), `--color-positive` (#1F8A5D — the palette has no green today), and the 10 `--color-signal-*` accents (amber/emerald/indigo/violet/sky/rose/teal/orange/cyan/fuchsia — none exist).

This keeps the new section visually coherent with the live site's actual brand instead of shipping a second, disconnected "paper/ink" language, and satisfies rule 6 (additive only, no refactor of the existing token set).

## 3. Fonts

Root layout (`app/layout.tsx`) loads via `next/font/google`: Cinzel → `--font-display`, Cormorant Garamond → `--font-serif`, Inter → `--font-sans`. Doc 1 wants Space Grotesk (display) + Inter (body) + JetBrains Mono (data/counters, `tabular-nums`).

**Decision:** Reuse `--font-sans` (Inter) as-is for industry-page body copy. Add two new, additively-named font loads scoped to this feature only: Space Grotesk as `--font-industry-display` (keeps the existing Cinzel display identity untouched everywhere else on the site) and JetBrains Mono as `--font-mono` (net new — nothing currently serves the `.num`/tabular-nums stat-counter role Doc 1 needs).

## 4. Nav / Footer reuse — resolved, no ambiguity

`app/_components/TrophyHeader.tsx` and `TrophyFooter.tsx` are the actual live nav/footer — imported individually into all 19 existing `page.tsx` files (root `layout.tsx` does not render them; each page composes its own). `components/Nav.tsx` and `components/Footer.tsx` are dead code: zero imports anywhere in `app/`, the only matches are stale entries in the gitignored `graphify-out/` cache.

**Decision:** `/industries` and `/industries/[slug]` import and render `TrophyHeader` / `TrophyFooter` exactly like every other page. IMS-055's "footer gains an Industries column" edits `TrophyFooter.tsx` directly — explicitly in scope per rule 6 ("footer nav").

## 5. Booking CTA, analytics, Resend — the three named discoverability checks

- **Booking-call URL:** No external booking tool exists anywhere in the codebase (no Calendly/Cal.com/TidyCal). Every "Book a 20-minute call" CTA sitewide (`TrophyFooter.tsx`, `services/ai-automation/page.tsx`, `contact/page.tsx`) is link text pointing at the internal `/contact` route. **Decision:** Doc 2's "book a call" CTAs link to `/contact`, matching the sitewide convention. Nothing to invent.
- **Analytics:** No analytics code exists anywhere in `app/`, `components/`, or `package.json` dependencies. Earlier grep hits on gtag/Plausible/GA were incidental substring matches inside `package-lock.json` transitive metadata, not a real integration. **Decision:** implement `lib/analytics.ts` (IMS-004) as a safe no-op-capable stub that checks for a provider at runtime and does nothing when absent — this is already IMS-004's own stated AC, so this resolves cleanly without a stop.
- **Resend — genuinely not discoverable, this is a real decision point:** `resend` is not a dependency. The only live contact mechanism, `ContactForm.tsx`, is a client-side `mailto:` handoff, with an inline comment stating a Resend backend is "plumbed in a later phase" — i.e. planned, not built. There is no API route, env var name, or working send function to reuse for IMS-026's sample-report email. **This matches your explicit stop condition verbatim.** Two paths:
  - **(a, recommended)** Build a minimal, net-new Resend integration for IMS-026 alone, using a `RESEND_API_KEY` env var (standard convention) that you supply before this goes live. `mailto:` can't silently deliver a PDF/report attachment, so IMS-026 needs a real send path regardless.
  - **(b)** Descope IMS-026 to a `mailto:` fallback matching the existing `ContactForm` pattern until Resend is wired sitewide.

  **I need your call on (a) vs (b) before IMS-026.**

## 6. Other flags (non-blocking, noted for later)

- Repo root has `netlify.toml`, but IMS Consultancy is documented elsewhere as a Vercel deployment. Doesn't block ticket work, but I'll need your confirmation of the actual live deploy target before attempting the IMS-064 preview deploy at the end.
- `docs/build/` will be created fresh (see §1) since the source docs weren't actually in the repo yet.

## 7. Stop-condition checklist (per your rules)

- ☑ Repo IS App Router — no migration note, no stop.
- ☑ Tailwind present and compatible — no stop.
- ☑ Token conflict — reconcilable (see §2), not blocking, decision recorded and flagged for your sign-off.
- ☑ Nav/footer reuse — resolved with certainty (see §4).
- ☑ Booking URL — resolved, no external tool exists, reuse `/contact` (see §5).
- ☑ Analytics — resolved via IMS-004's own no-op design (see §5).
- ⚠️ **Resend config — genuinely not discoverable. Needs your explicit (a)/(b) call before IMS-026, not before IMS-002.**
