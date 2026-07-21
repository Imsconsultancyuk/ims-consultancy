// IMS-062: crawls the running production build (npm run build && npm run
// start) and asserts every page's <title> and meta description is unique
// across all 11 Industries pages (10 slugs + hub). Requires the production
// server to already be running — defaults to localhost:3000, override with
// BASE_URL.

import { industrySlugs } from "./index";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

interface PageMeta {
  path: string;
  title: string | null;
  description: string | null;
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title>([^<]*)<\/title>/);
  return match ? match[1] : null;
}

function extractDescription(html: string): string | null {
  const match = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  return match ? match[1] : null;
}

async function fetchMeta(path: string): Promise<PageMeta> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`check:meta — ${path} returned ${response.status}`);
  }
  const html = await response.text();
  return { path, title: extractTitle(html), description: extractDescription(html) };
}

function findDuplicates(pages: PageMeta[], field: "title" | "description"): string[] {
  const seen = new Map<string, string[]>();
  for (const page of pages) {
    const value = page[field];
    const key = value ?? "(missing)";
    const paths = seen.get(key) ?? [];
    paths.push(page.path);
    seen.set(key, paths);
  }

  const issues: string[] = [];
  for (const [value, paths] of seen) {
    if (paths.length > 1) {
      issues.push(`  duplicate ${field} "${value}" on: ${paths.join(", ")}`);
    }
  }
  return issues;
}

async function main(): Promise<void> {
  const paths = ["/industries", ...industrySlugs.map((slug) => `/industries/${slug}`)];
  const pages = await Promise.all(paths.map(fetchMeta));

  const issues: string[] = [];
  for (const page of pages) {
    if (!page.title) issues.push(`  ${page.path} — missing <title>`);
    if (!page.description) issues.push(`  ${page.path} — missing meta description`);
  }
  issues.push(...findDuplicates(pages, "title"));
  issues.push(...findDuplicates(pages, "description"));

  if (issues.length > 0) {
    console.error(`check:meta — ${issues.length} issue(s) found across ${pages.length} pages:\n`);
    for (const issue of issues) {
      console.error(issue);
    }
    console.error("");
    process.exit(1);
  }

  console.log(`check:meta — ${pages.length} pages, all titles and descriptions unique.`);
}

main().catch((error: unknown) => {
  console.error("check:meta — failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
