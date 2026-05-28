import type { MetadataRoute } from "next";

const SITE = "https://intelmadesimple.com";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const ENTRIES: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/ai-automation", priority: 0.85, changeFrequency: "monthly" },
  { path: "/services/seo", priority: 0.85, changeFrequency: "monthly" },
  { path: "/services/custom-software", priority: 0.85, changeFrequency: "monthly" },
  { path: "/services/strategic-advisory", priority: 0.85, changeFrequency: "monthly" },
  { path: "/process", priority: 0.75, changeFrequency: "monthly" },
  { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
  { path: "/reviews", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.85, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.6, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
  { path: "/ai-policy", priority: 0.65, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ENTRIES.map((e) => ({
    url: `${SITE}${e.path === "/" ? "" : e.path}`.replace(/\/$/, "") || `${SITE}/`,
    lastModified: now,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
