# IDEAS AND INNOVATION FOR WEBSITES

> Reserved for the next IMS Consultancy client engagement. These are the X-tier feature ideas that genuinely set a 2026 site apart from every other "premium agency" build. Each one rides a real shift in the market that competitors are 12-18 months behind on. Reframes a website from "brochure" to "agent-ready interface".

---

## THE NEW PERCEPTION

Stop selling websites. Sell agent-ready interfaces.

In 2026, a large and growing share of buying decisions will involve an AI agent. ChatGPT browsing, Claude Computer Use, Perplexity Comet, Gemini's Project Astra. The agency that ships sites optimised for AI agents AS BUYERS, not just AI agents as crawlers, captures the next decade.

A website is no longer a brochure. It is a programmable surface that humans, agents, and the brand's own AI all interact with.

That reframe carries the £15k+ price tag. Without it, you sell pretty sites and lose price wars. With it, you sell something a competitor cannot match.

---

## THE FIVE X-TIER FEATURES (BUILD 2 OR 3 PER CLIENT)

### 1. MCP server endpoint baked into the site

**What:** Alongside `/sitemap.xml` and `/llms.txt`, ship `/.well-known/mcp.json`. The site exposes itself as an Anthropic Model Context Protocol server. Any AI agent (Claude, Cursor, Zed, Continue, ChatGPT once they support MCP) can connect and use the brand's services as TOOLS, not just read pages.

A prospect's Claude session running in their IDE can call `book_discovery_call(name, email, topic, times)` directly against the site. No copy-paste, no form filling, no navigating to a book-call page.

**Why X-tier:** MCP was open-sourced by Anthropic in November 2024. Adoption exploded in 2025 (Cursor, Zed, Claude Desktop). As of early 2026, almost zero marketing websites expose themselves as MCP servers. The first consultancy in any sector to do this becomes the one ChatGPT and Claude recommend when asked "find me a consultancy that can do X".

**Changes the sale how:** "We are the only consultancy in our sector whose services your AI assistant can book directly. Your team's ChatGPT can scope a project with us without leaving their workflow."

**Time:** 3-4 days. Stack: Vercel route handler + `@modelcontextprotocol/sdk`.

---

### 2. Agentic-buyer SEO (the next SEO paradigm)

**What:** Two changes that target AI agents AS BUYERS, not as readers.

First, every service page has a machine-readable scoping artifact at `/services/<slug>/scope.json`. Structured budget brackets, deliverables, durations, decision criteria. The page humans see is unchanged. An agent visiting the URL programmatically gets the JSON.

Second, every "book a call" CTA has an agent-mode endpoint. An LLM agent can POST a structured intake (`{ business_summary, problem, budget_band, timeline }`) and get back a tailored proposal plus suggested call times in one round trip. No browser automation needed.

**Why X-tier:** OpenAI announced Tasks and Anthropic shipped Computer Use in late 2024. By 2026 the agent-buyer pattern is real: an executive tells their AI assistant "find and book me three consultancies for X by Friday". The agencies whose sites speak the protocol get the booking. The ones that do not get skipped silently.

**Changes the sale how:** "Your buyers are increasingly delegating vendor discovery to their AI assistants. We engineer your site so those assistants find you, scope with you, and book you. Without that, you are invisible to the next wave of B2B buying."

**Time:** 5-7 days. Stack: typed JSON endpoints plus a system-prompt-formatted intake parser.

---

### 3. Generative case study from prospect URL

**What:** Hero CTA reads "Paste your company URL. Get a tailored case study in 90 seconds." Visitor pastes their URL. The site:

1. Crawls 5-10 pages of the prospect's site (Vercel Edge Function, 5s timeout).
2. Extracts industry, ICP, current positioning, visible tech stack.
3. Generates a 600-word custom case study using Claude. "If your business engaged us, here is what we would build. Phase 1: X. Phase 2: Y. Estimated outcome: Z. Sample deliverables: ..."
4. Renders as a branded PDF or shareable link.
5. Emails it to the prospect AND lands as a row in Supabase as a high-intent lead.

**Why X-tier:** Every consultancy has static case studies that prospects scan and forget. Almost nobody generates personalised case studies on demand. The prospect gets a tangible artefact with their company name on it, generated in real time, that they can forward to their CFO before the discovery call. Conversion-killing artefact.

**Changes the sale how:** "Instead of telling you about our work, we will show you what working with us would look like for your business, right now. Paste your URL." The CTA itself sells the engagement.

**Time:** 6-8 days. Stack: Vercel Edge for crawl + Anthropic API for generation + React-PDF or Puppeteer for rendering + Resend or Zoho for delivery.

---

### 4. Anthropic Computer Use live-demo tile in the hero

**What:** The hero contains a tile showing Claude actually doing the work the consultancy sells. For an SEO firm, embed a streaming Claude session writing an SEO outline for whatever URL the visitor types. For an AI automation consultancy, Claude qualifies a fake lead live in front of the visitor.

Not a video. A real Claude API call streaming into the page. The visitor watches the AI think and produce output in real time.

**Why X-tier:** Claude Sonnet 4.6 and Opus 4.7 with streaming responses make this feel cinematic. Computer Use (Claude clicking around browser tabs autonomously) launched October 2024. As of early 2026, no consultancy website embeds it as a live-on-hero demo. Most embed Loom videos that look fake. Live agent work in the hero is jaw-on-floor for technical buyers.

**Changes the sale how:** "Watch our AI do in 60 seconds what your current process takes a week. The button is right there. Try it."

**Time:** 4-5 days. Stack: streaming Anthropic API + Vercel Edge function + a careful prompt that demonstrates the brand's actual approach.

---

### 5. Real-time presence and collaborative cursors

**What:** When two or more visitors are on the site simultaneously, they see each other's cursors moving in real time. Like Figma. Optional: an ephemeral chat bubble so visitors can ask "is this firm any good?" and other visitors answer.

Hero shows a live count. "Right now, 7 people are reading this page. 3 are looking at pricing." Builds urgency through transparency without being scammy.

**Why X-tier:** Liveblocks and Partykit made multiplayer trivial in 2024-25. Figma, Linear, Vercel docs all use it. Almost zero B2B consultancy sites do, because they assume their traffic is too low for it to look populated. The trick: pair the presence layer with a slow-decay so even a single visitor over the last 60 minutes still creates ambient activity. The site feels alive without faking it.

**Changes the sale how:** "Most consultancy sites are graveyards. Yours has 7 active visitors at all times, three of whom just landed from your last LinkedIn post. Social proof through transparency."

**Time:** 3 days. Stack: Liveblocks or Partykit + a Supabase trail for the slow-decay.

---

## RECOMMENDED COMBINATIONS PER INDUSTRY

Pick 3 of 5 based on what the client sells.

| Client industry | The combination |
|---|---|
| Technical (AI, SaaS, dev tools) | MCP + Generative Case Study + Computer Use live demo |
| Premium services (legal, finance, advisory) | Generative Case Study + Real-time Presence + Agentic SEO |
| Pure consultancy (IMS, agencies) | MCP + Agentic SEO + Generative Case Study |
| Property / real estate | Generative Case Study + Real-time Presence + Computer Use live demo |
| Healthcare / regulated | Computer Use live demo (clean, premium feel) + Agentic SEO + Real-time Presence |
| Creative / agency | Generative Case Study + Real-time Presence + Agentic SEO |

---

## THE £15K CLIENT PITCH

The conversation that closes:

> "Most consultancy sites at this budget look professional. They get a Three.js hero, a few scroll animations, a contact form. Yours will have three things that visitors have never seen on a competitor's site. [Live Computer Use demo / Generative Case Study / MCP endpoint]. The first is the wow moment in our demo. The second is the wow moment when they actually use the site. The third is the reason your prospects' AI assistants find you when their human owner has not even searched yet. Together they reframe what a consultancy website is FOR in 2026."

The £15k bracket buys those three plus the foundation in PREMIUM-SITE-PLAYBOOK.md. No competitor at that price point ships any of them.

---

## WHAT NOT TO PROMISE AT £15K

These have been commoditised in 2026. They are table stakes. They do not WOW.

- Three.js / 3D heroes (every Awwwards portfolio)
- Lenis smooth scroll (table stakes)
- Custom cursor with hover-context (Webflow templates)
- GSAP scroll-pinned sections (every Cordell-school portfolio)
- Lottie / Rive icons (designer-friendly, ubiquitous)
- Dark mode toggle
- Page-transition wipes via Framer Motion
- "AI chatbot in the corner" (reads as 2022 retrofitting)
- Mesh gradient backgrounds (every YC company)
- Glassmorphism (peaked 2024)

If a competitor ships any of these, they look well-built. They do not make a prospect say "what is this site doing".

---

## EXECUTION ORDER WHEN ENGAGED

1. **Discovery call.** Confirm client industry and pick the right 3 features.
2. **Foundation phase.** Build the playbook foundation (PREMIUM-SITE-PLAYBOOK.md Phase 0 through 4). 60-70% of the build time.
3. **X-tier features.** Layer the 3 selected features. 30-40% of the build time.
4. **Demo session.** Walk the client through their site emphasising the 3 features. They should be able to tell their team "we have something no competitor has".
5. **Launch.** Submit to GSC, Bing, and the AI search engines (Perplexity, ChatGPT browsing). MCP endpoint automatically gets picked up by Claude Desktop and Cursor when prospects' AI agents start querying.

---

## NOTES FOR NEXT CHAT

When the next IMS Consultancy client engages:

1. Read `PREMIUM-SITE-PLAYBOOK.md` (sibling project at `Projects/drift-and-forge/`) for the foundation recipe.
2. Read this file for the X-tier differentiators.
3. Write client `PROJECT.md` with discovery, then pick 3 X-tier features matching their industry.
4. Quote at £15k as a floor for sites that include 3 X-tier features. Scale up if scope expands.
5. Build foundation first (Phases 1-4), then X-tier features last. Foundation pays for itself; X-tier features sell future clients.

---

*Created: 2026-05-14. Reserved for the next IMS Consultancy build. Update when a new X-tier feature emerges or an existing one becomes commodity.*
