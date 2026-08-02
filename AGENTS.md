<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## DESIGN QUALITY GATE — mandatory before any visual/design work is called "done"

**Incident 2026-07-23:** A full dark-void redesign (tokens, particle system, hero, header/footer, methodology, industries) was built across EPICs A-D by copying an external SaaS reference ("Dala": void-black canvas, glowing particle constellation, oversized bold sans) without ever running it through this repo's own design-taste skills. The result was rejected by the user as worse than the site it replaced — a voice/visual mismatch (loud AI-startup aesthetic bolted onto IMS's own quiet, disciplined, senior-operator brand voice) that a real taste pass would have caught. Verification only covered technical correctness (`tsc`, build, route sweep, em-dash sweep) — never design quality. The work was self-graded ("reads as intentional and on-system") in the same turn it was produced, with zero independent check. All of it was reverted (`git stash`) with zero loss since nothing had been committed.

**The rule, going forward:**

1. **Never adopt an external product's aesthetic wholesale.** Ground every visual direction in IMS's own brand voice and positioning first — run `design-taste-frontend` on the actual brief before writing a single token.
2. **Run the full design-skill chain, in order, before any "done" claim on visual work** (per `REPOS.md`'s de-confliction order — these are installed, callable skills, not optional): `design-taste-frontend` (direction) → `ui-ux-pro-max` (system: palette/type/grid) → `emil-design-eng` (motion/interaction craft, Before/After review) → `impeccable` (final holistic pass). Skipping this chain is what caused the incident — it is not optional for anything more than a one-line copy edit.
3. **AH Architecture is the internal quality floor.** Before shipping or presenting any IMS visual work, it should hold up next to what was actually delivered for AH Architecture (`Projects\ah-architects\`) — UI polish, motion craft, animation restraint. If it doesn't clear that bar, it isn't done.
4. **Checkpoint with the user early, not after 4 EPICs.** Show a preview after the first structurally-visible milestone (tokens + one hero, not tokens + particle + hero + nav + footer + methodology + industries). Cheap to redirect early; expensive after 4 EPICs of compounding work in one direction.
5. **Never self-grade design quality.** Words like "reads as intentional," "on-system," "consistent with the direction" are verdicts — they belong to an actual skill pass or the user, not to the same turn that produced the screenshot. Technical verification (build/routes/copy) is necessary but is not a substitute for a design-quality verdict.
