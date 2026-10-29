import type { MetadataRoute } from "next";

const SITE = "https://intelmadesimple.com";

/**
 * robots.txt with explicit allowlist for major AI agents so IMS content
 * is discoverable by ChatGPT, Claude, Perplexity, Google AI, and Common
 * Crawl. Each major bot named explicitly so the policy is unambiguous.
 *
 * Policy, stated on purpose: AI crawlers are allowed on every public page. The
 * site publishes prices and sourced guides, and being quotable by answer engines
 * is part of the plan. Only /api/ and /dev/ are closed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/dev/"] },
      // Explicitly named AI crawlers
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
