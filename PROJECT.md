# PROJECT — IMS Consultancy site

## Goal

Build `intelmadesimple.com` as the consultancy's flagship asset: an immersive scrollytelling site that demonstrates the calibre of work IMS delivers, while remaining performant on mid-range hardware and accessible to every visitor.

## Constraints

- Next.js 16.2.4 App Router, Tailwind 4, TypeScript 5 (locked)
- Free-tier hosting across Vercel, Cloudflare, Supabase, Resend until revenue justifies paid tiers
- All accounts under the new master email `imsconsultancy2026@gmail.com`
- Per-repo git identity must match the master email (Vercel blocks deployments otherwise)
- Performance budget: Core Web Vitals all in the green on a mid-range laptop with 4GB VRAM. Specifically: LCP under 2.5s, INP under 200ms, CLS under 0.1
- Visual direction locked to "Light to Dark Journey" palette, no pure white background, mauve visible throughout
- Voice locked: no em-dash, no AI buzzwords, proper grammar, considered keyword selection
- No tracking that violates GDPR. PostHog configured EU-region if visitor base requires it.

## Success criteria

1. A first-time visitor on a desktop browser at default settings sees the hero load within 2 seconds and the first 3D moment plays smoothly within 4 seconds.
2. The "kids book journey" scroll experience holds attention for at least 60 seconds on average without bounce, measured by PostHog.
3. The site converts at least 2 percent of visitors into a Calendly discovery call booking within 90 days of launch.
4. Lighthouse score over 90 across Performance, Accessibility, Best Practices, and SEO on the production build.
5. No console errors, no console warnings, no Next.js Image warnings, no hydration mismatches.
6. Brand and voice rules apply consistently. A keyword-discipline pass before launch.
7. Vercel deployment lands cleanly under the IMS team scope, not under any other client scope. Pre-deploy `vercel whoami` check passes.

## Out of scope (v1)

- Multilingual support beyond English
- Authentication or member-only areas
- Payment flow on the site itself (Calendly handles booking; payment happens after qualification)
- Blog and case study CMS (will land in v2 once Supabase is configured and templates are ready)
- Native mobile app
- Live chat widget (defer until Calendly bookings exceed 5 per week)

## Deployment scope (immutable per CLIENT_ISOLATION principles applied to IMS itself)

| Layer | Value |
|---|---|
| Vercel team / scope | The personal account tied to `imsconsultancy2026@gmail.com` (NOT `portix-global`, NOT any other client scope) |
| GitHub account | The user tied to `imsconsultancy2026@gmail.com` |
| GitHub repo | `ims-consultancy` (private until v1 ships, public for portfolio later if desired) |
| Cloudflare zone | `intelmadesimple.com` |
| Supabase project | `ims-consultancy` (separate from any other project) |
| Resend sending domain | `intelmadesimple.com` (or `mail.intelmadesimple.com` subdomain) |
| Per-repo git identity | `user.email=imsconsultancy2026@gmail.com`, `user.name=IMS Consultancy` |
| Production URL | `intelmadesimple.com` (apex), `www.intelmadesimple.com` redirects |

## Phase plan

1. **Phase 1 — Identity reset**: Complete the 10-step signup sequence in `HANDOVER_IMS.md`. Move VAULT placeholders to real values locally. Lock per-repo git identity.
2. **Phase 2 — Site rebuild**: Implement Direction C palette in `globals.css` and `tailwind.config.ts`. Replace v1 page.tsx with immersive scrollytelling sections (hero, transition, three story sections, footer). Wire Lenis for smooth scroll. Build first 3D moment with React Three Fiber. Audit Lighthouse, address findings.
3. **Phase 3 — Voice and copy**: Voice profile pass, headline rewrite, three story-section copy, microcopy. SEO keyword discipline before each section locks. No em-dash, no banned buzzwords, considered grammar.
4. **Phase 4 — Launch**: Final security review (`cso` skill), production deploy to Vercel under correct scope, DNS cutover at Cloudflare, post-launch verification, PostHog dashboards live.

## Verification gate before any "done" claim

Per the standing rule on thorough verification:
- TypeScript compiles cleanly (no new errors)
- `next build` passes (no production-blocker errors)
- Every new route returns HTTP 200 on a curl probe
- 404 sweep on removed assets passes
- Browser console has zero errors and zero warnings
- Lighthouse scores meet success criteria
- Scope stays surgical, no unrelated changes piggy-backed
