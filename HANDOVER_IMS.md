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
- [x] **2. GitHub** — account `Imsconsultancyuk` created, empty repo `ims-consultancy` provisioned, first commit pushed under IMS identity 2026-05-24.
- [ ] **3. Vercel** — deferred. Blocked on phone-number cross-pollination with Portix. Replaced with Netlify for tonight's deploy. Revisit Vercel later for redundancy if needed.
- [x] **4. Cloudflare** — signed up under master email.
- [x] **5. Domain registrar** — `intelmadesimple.com` confirmed under new email, ready for nameserver swap.
- [x] **6. Supabase** — new project created. Keys ready to drop into `.env.local` when first API route needs them.
- [x] **7. Resend** — signed up, sending domain pending DKIM verification in Cloudflare DNS.
- [x] **8. Calendly** — signed up.
- [x] **9. PostHog** — signed up.
- [x] **10. AI provider keys** — Anthropic, OpenAI, fal.ai keys captured.
- [ ] **11. Netlify** — import IMS GitHub repo. Pending tonight.
- [ ] **12. DNS cutover** — `intelmadesimple.com` → Netlify after first successful deploy.

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
| 2026-05-24 | Deleted `app/api/check/route.ts` containing hardcoded Supabase service-role JWT for project `sdudphgibkkxllcfxyuw` | Critical security finding during pre-deploy audit. The leaked token was in a Portix-attributed commit in old git history. | Done. User notified to rotate / delete the old Supabase project. |
| 2026-05-24 | Installed `lenis`, wrote `SmoothScroll.tsx`, `Reveal.tsx`, `Header.tsx` client components | Direction C scrollytelling foundation | Done |
| 2026-05-24 | Rewrote `app/globals.css` with Direction C palette tokens and gradient transition band; switched `@theme inline` to `@theme` so CSS vars resolve at `:root` | Tailwind 4 plus custom CSS could not see the tokens with `inline` modifier | Done |
| 2026-05-24 | Rewrote `app/page.tsx` with hero (light) → transition band → three story sections (dark) → CTA → footer; copy passes em-dash and buzzword audits | Direction C v1 site build | Done |
| 2026-05-24 | Removed stale `.git` directory (Portix identity, leaked secret in history). Fresh `git init -b main` with per-repo identity `imsconsultancy2026@gmail.com` / `IMS Consultancy`. Switched remote from `Portix-Global/ims-consultancy` to `Imsconsultancyuk/ims-consultancy`. | Per-client / per-business isolation. Saved memory `feedback_per_client_deployment_isolation.md` flagged this exact trap. | Done |
| 2026-05-24 | First commit `c6180a8` and `netlify.toml` commit `ad2b5f9` pushed to GitHub | Repo on the new identity, ready for Netlify import | Done |
| 2026-05-24 | Added `netlify.toml`: Node 20, `npm run build`, publish `.next`, immutable cache headers for `/logos/*` and `/_next/static/*`, baseline security headers | Deterministic Netlify deploys | Done |
| 2026-05-24 | Netlify dashboard import (user-driven step) | First production deploy | Done. Site: `eclectic-madeleine-e44846.netlify.app`. Verified live via Playwright (desktop and mobile, 0 console errors, 0 warnings, identical to local). |
| 2026-05-24 | Netlify site rename to `ims-consultancy` + custom domain `intelmadesimple.com` + Cloudflare DNS cutover | Final piece for tonight | Done. Cloudflare CNAMEs: `@` → `apex-loadbalancer.netlify.com` (DNS only), `www` → `ims-consultancy.netlify.app` (DNS only). Vercel CNAMEs and `_vercel.*` TXT records removed. Resend MX, SPF, DKIM preserved. SSL provisioned by Netlify via Let's Encrypt. |
| 2026-05-24 | First live load on production domain | Verification | Done. `https://intelmadesimple.com` returns HTTP 200 with Direction C rendering identical to local. Verified desktop via Playwright. Zero console errors, zero warnings. |
| **OPEN ITEMS** | | | |
| Switch primary domain in Netlify from apex to `www` | CDN coverage for the apex | Five-second click in Netlify Domain management. Defer until next session if convenient. |
| Remove `intelmadesimple.com` claim from any old Vercel project (likely Portix scope) | Cleanup of orphaned domain claim | Done once we sign into whichever Vercel account still has the claim. |
| Old Supabase project `sdudphgibkkxllcfxyuw` | Rotate or delete | Critical security follow-through. Leaked service-role key from the deleted route should be rotated or the project deleted entirely. |

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
