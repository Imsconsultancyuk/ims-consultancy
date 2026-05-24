# HANDOVER — IMS Consultancy

Process record for the new identity reset and site rebuild started 2026-05-22.
This file is **safe to commit**. It contains no secrets. All credentials live in `VAULT_IMS.md` (gitignored).

---

## Initial brief

Adam is rebuilding IMS Consultancy's digital identity from scratch under a new primary email so the stack is cleanly separated from any earlier IMS infrastructure and from his personal email. The flagship site at `intelmadesimple.com` is being positioned as the consultancy's golden trophy. Every prospect lands here; the site itself must show, not tell, the calibre of work IMS delivers.

## Macro context

Strategic consulting in 2026 is crowded. Differentiation comes from the surface area visitors actually touch: the website, the proposal, the first call. The market expects a serif wordmark, a sophisticated colour story, and visible craft. IMS is well-positioned because Adam runs Portix Global and Drift and Forge as references he can point to.

## Micro context

- Founder operator: Adam, currently working solo with AI-augmented delivery.
- Audience: founders and senior operators who already know they want help, want to know quickly whether IMS is the right partner.
- Constraint: lean budget (Hobby tiers across the stack until revenue justifies upgrades).
- Aesthetic locked: Classical Luxury Consultancy with the **Light to Dark Journey** palette direction (mock C, 2026-05-22).
- Voice locked: no em-dash, no AI buzzwords (leverage, craft, journey-as-cliché, bespoke, transform, etc.), proper grammar carries sentence rhythm, considered keyword selection.

## Tech stack (chosen, immutable for v1)

| Layer | Choice | Reason |
|---|---|---|
| Frontend framework | Next.js 16.2.4 (App Router) | Already installed, current version |
| Language | TypeScript 5 | Already installed |
| Styling | Tailwind 4 (CSS-first via `@theme` in globals.css) | Already installed |
| Type system at runtime | Zod (when API routes need validation) | Add when first API route is real |
| Auth | Supabase Auth | When auth becomes needed |
| Database | Supabase Postgres | When data becomes needed |
| Email transactional | Resend | Form submissions, contact replies |
| Booking | Calendly embed | Discovery calls |
| Analytics | PostHog | Funnel + product analytics |
| Hosting | Vercel Hobby | Free until revenue |
| DNS + CDN | Cloudflare | Free, fast |
| Motion (UI) | GSAP 3.15 + ScrollTrigger, plus Motion for components | Already installed |
| Motion (smooth scroll) | Lenis | Add as a small dependency |
| 3D | React Three Fiber 9.6 + drei 10.7 | Already installed |
| Vector animation | Lottie React | Already installed |
| Vector globe (if used) | COBE | Already installed |
| Fonts | Cinzel + Cormorant Garamond + Inter via `next/font/google` | Free, perfect for the locked direction |

## Visual direction (locked 2026-05-22)

**Direction C: Light to Dark Journey**

- Hero band: warm paper `#F5EFF3` with mauve sub-accents
- Mid-band transition: linear gradient from `#F5EFF3` through `#7E6E80` into `#2A2230`
- Story sections: deep `#1A1620` jewellery-box dark, mauve glows
- Primary chromatic: brand mauve `#786478` (light bands) and `#B4A0B4` (dark bands)
- Highlight: `#D4B0D4` reserved for hover and key moments

Full palette and asset inventory: `C:\Users\Admin\AI\refs\ims\brand-system\BRAND-GUIDELINES.md`.

## Signup sequence (live checklist)

Tick each off as you complete it. After each step, copy the credential into `VAULT_IMS.md` (your local copy) and your password manager.

- [x] **1. Gmail** — `imsconsultancy2026@gmail.com` created
- [ ] **2. GitHub** — new user under master email, enable 2FA, generate Read PAT, create empty repo `ims-consultancy`, push existing local project as initial commit. Per-repo `git config user.email imsconsultancy2026@gmail.com` and `git config user.name "IMS Consultancy"` before first commit.
- [ ] **3. Vercel** — sign up with master email, connect GitHub, import `ims-consultancy` repo, deploy preview, verify `npx vercel whoami` returns this account (not Portix scope).
- [ ] **4. Cloudflare** — sign up with master email, add `intelmadesimple.com`, copy nameservers, update at domain registrar.
- [ ] **5. Domain registrar** — confirm `intelmadesimple.com` is under this email, point nameservers to Cloudflare.
- [ ] **6. Supabase** — new org "IMS Consultancy", new project `ims-consultancy`, capture anon key + service role key + DB password. Generate Personal Access Token for CLI.
- [ ] **7. Resend** — sign up, add `intelmadesimple.com` as sending domain, get DKIM + SPF records into Cloudflare DNS, verify, capture API key.
- [ ] **8. Calendly** — sign up, claim username, set 30-min discovery call as default event.
- [ ] **9. PostHog** — sign up, create project, capture public key for the site.
- [ ] **10. AI provider keys (Anthropic, OpenAI, fal.ai)** — sign up under master email, capture keys, set spending caps.

After all ticks, run the pre-deploy verification:
```
npx vercel whoami           # must match master email account
git config user.email       # must be imsconsultancy2026@gmail.com
git config user.name        # must be "IMS Consultancy"
```

## Command log

(Append every meaningful command run inside `ims-consultancy/` here, with the reason.)

| Date | Command | Why | Outcome |
|---|---|---|---|
| 2026-05-22 | (existing files preserved from earlier IMS work) | Brand deploy stage 1 | Brand assets, fonts, page layout in place |
| 2026-05-22 | Created `VAULT_IMS.md`, `HANDOVER_IMS.md`, updated `.gitignore` to cover VAULT, started identity reset | Initiate new project protocol | Done |

## Issue and fix log

| Date | Issue | Root cause | Fix |
|---|---|---|---|
| 2026-05-22 | `next build` blocked on `@supabase/supabase-js` missing | Pre-existing route in `app/api/check/route.ts` imports a package not installed | Will resolve in Phase 2 by installing the package once Supabase project exists, or removing the route if dead |
| 2026-05-22 | Turbopack panic in `turbo-persistence` after first compile | Corrupted `.next/build` cache | `rm -r .next`, restart `next dev` |
| 2026-05-22 | Next.js Image aspect ratio console warning | `h-auto` class lost to specificity | Used inline `style={{ height: 'auto' }}` plus `sizes` prop |
| 2026-05-22 | PostCSS build failed referencing missing `autoprefixer` | Stale `postcss.config.js` from earlier Tailwind 3 setup conflicted with `postcss.config.mjs` for Tailwind 4 | Moved old to `.bak`, kept the `.mjs` only |

## Replay-for-other-consultancy

Not directly applicable (IMS is the consultancy, not a client) but the signup sequence here is the template Adam can copy when he ever launches another personal brand or sub-brand. The whole checklist takes about 90 minutes if every account is approved on first attempt.

## Phase log

- Phase 1 (Identity reset): in progress as of 2026-05-22
- Phase 2 (Site rebuild with Direction C palette + scroll motion + 3D moments): queued, starts after Phase 1 completes
- Phase 3 (Voice + copy pass + SEO keyword discipline): queued, after Phase 2 ships v1
- Phase 4 (Launch on intelmadesimple.com): queued, after Phase 3
