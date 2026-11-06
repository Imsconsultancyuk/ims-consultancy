// Regenerates lib/seo/lastmod.json: one real last-change date per static sitemap path.
// A file with uncommitted changes takes its modified-time date; a clean file takes its
// last git commit date. Guides and insights are not in this map: they carry their own
// date fields. Run from the repo root: node lib/seo/gen-lastmod.mjs
import { execFileSync } from "node:child_process";
import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const day = (d) => {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

function fileDate(file) {
  if (!existsSync(file)) return null;
  const dirty = git("status", "--porcelain", "--", file) !== "";
  if (dirty) return day(statSync(file).mtime);
  const iso = git("log", "-1", "--format=%cI", "--", file);
  return iso ? iso.slice(0, 10) : day(statSync(file).mtime);
}

const latest = (files) => files.map(fileDate).filter(Boolean).sort().at(-1);

const out = {};
const pages = {
  "/about": ["app/about/page.tsx"],
  "/ai-policy": ["app/ai-policy/page.tsx"],
  "/case-studies": ["app/case-studies/page.tsx"],
  "/pricing": ["app/pricing/page.tsx"],
  "/privacy": ["app/privacy/page.tsx"],
  "/process": ["app/process/page.tsx"],
  "/reviews": ["app/reviews/page.tsx"],
  "/terms": ["app/terms/page.tsx"],
  "/industries": ["app/industries/page.tsx"],
  "/services": ["app/services/page.tsx"],
  "/insights": ["app/insights/page.tsx", "app/insights/InsightsGrid.tsx"],
  "/": ["public/flagship/index.html"],
  "/tools": ["public/flagship/tools.html"],
  "/faq": ["public/flagship/faq.html"],
  "/contact": ["public/flagship/contact.html"],
};
for (const [path, files] of Object.entries(pages)) out[path] = latest(files);

for (const dir of readdirSync("app/services", { withFileTypes: true })) {
  if (dir.isDirectory()) out[`/services/${dir.name}`] = latest([`app/services/${dir.name}/page.tsx`]);
}
for (const f of readdirSync("lib/industries/data")) {
  const slug = f.replace(/[.]ts$/, "");
  out[`/industries/${slug}`] = latest([`lib/industries/data/${f}`]);
}

writeFileSync("lib/seo/lastmod.json", JSON.stringify(out, null, 2) + "\n");
console.log(JSON.stringify(out, null, 2));
