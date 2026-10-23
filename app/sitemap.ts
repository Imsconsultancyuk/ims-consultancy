import type { MetadataRoute } from "next";

import { industrySlugs } from "@/lib/industries";

const SITE = "https://intelmadesimple.com";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified: string;
};

// Dates are the last real content change, not the build time. Bump one when its page changes.
const NEXT_PAGES_UPDATED = "2026-08-02";
const FLAGSHIP_UPDATED = "2026-10-23";

const ENTRIES: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly", lastModified: FLAGSHIP_UPDATED },
  { path: "/about", priority: 0.8, changeFrequency: "monthly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/services", priority: 0.9, changeFrequency: "monthly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/services/ai-automation", priority: 0.85, changeFrequency: "monthly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/services/seo", priority: 0.85, changeFrequency: "monthly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/services/custom-software", priority: 0.85, changeFrequency: "monthly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/services/strategic-advisory", priority: 0.85, changeFrequency: "monthly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/process", priority: 0.75, changeFrequency: "monthly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/case-studies", priority: 0.8, changeFrequency: "monthly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/reviews", priority: 0.7, changeFrequency: "monthly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/pricing", priority: 0.85, changeFrequency: "monthly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/insights", priority: 0.6, changeFrequency: "weekly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/tools", priority: 0.9, changeFrequency: "monthly", lastModified: FLAGSHIP_UPDATED },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly", lastModified: FLAGSHIP_UPDATED },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly", lastModified: FLAGSHIP_UPDATED },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/ai-policy", priority: 0.65, changeFrequency: "yearly", lastModified: NEXT_PAGES_UPDATED },
  { path: "/industries", priority: 0.9, changeFrequency: "monthly", lastModified: NEXT_PAGES_UPDATED },
  ...industrySlugs.map(
    (slug): Entry => ({
      path: `/industries/${slug}`,
      priority: 0.85,
      changeFrequency: "monthly",
      lastModified: NEXT_PAGES_UPDATED,
    }),
  ),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ENTRIES.map((e) => ({
    url: e.path === "/" ? `${SITE}/` : `${SITE}${e.path}`,
    lastModified: new Date(e.lastModified),
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
