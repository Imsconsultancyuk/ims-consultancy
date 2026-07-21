// IND-000: synthetic demo dataset generator. Seeded by industry slug + tool
// id so output is deterministic across runs. Never reads or references real
// client data (AD-3/AD-4) — every name and company below is drawn from a
// fictional pool that cannot resolve to a real person or business.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { industries } from "../index";
import type { Tool } from "../types";

const OUT_DIR = path.dirname(fileURLToPath(import.meta.url));

const FIRST_NAMES = ["Sample", "Demo", "Example", "Placeholder", "Test"] as const;
const SURNAMES = ["Exampleton", "Sampleworth", "Demoford", "Testwell", "Placehold"] as const;
const COMPANY_ADJECTIVES = [
  "Northbridge",
  "Cedarfield",
  "Ashworth",
  "Millbank",
  "Oakstone",
  "Fenwick",
  "Harrow",
  "Kingsley",
] as const;
const COMPANY_NOUNS = [
  "Ventures",
  "Holdings",
  "Partners",
  "Group",
  "Associates",
  "Capital",
  "Solutions",
  "Trading",
] as const;

function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, pool: readonly T[]): T {
  return pool[Math.floor(rng() * pool.length)];
}

interface PreviewRow {
  ref: string;
  name: string;
  company: string;
}

interface DemoDataRecord {
  sampleFileId: string;
  rowCount: number;
  preview: [PreviewRow, PreviewRow, PreviewRow, PreviewRow, PreviewRow];
  resultPayload: Tool["demo"]["result"];
}

function parseRowCount(meta: string): number {
  const match = meta.match(/^([\d,]+)/);
  if (!match) return 100;
  return Number(match[1].replace(/,/g, ""));
}

function buildPreviewRow(rng: () => number, index: number): PreviewRow {
  const first = pick(rng, FIRST_NAMES);
  const last = pick(rng, SURNAMES);
  const adjective = pick(rng, COMPANY_ADJECTIVES);
  const noun = pick(rng, COMPANY_NOUNS);
  return {
    ref: `SMP-${String(index + 1).padStart(4, "0")}`,
    name: `${first} ${last}`,
    company: `${adjective} ${noun} Sample Ltd`,
  };
}

export function generateForTool(slug: string, tool: Tool): DemoDataRecord {
  const rng = mulberry32(hashSeed(`${slug}:${tool.id}`));
  const preview = [0, 1, 2, 3, 4].map((i) => buildPreviewRow(rng, i)) as DemoDataRecord["preview"];

  const record: DemoDataRecord = {
    sampleFileId: tool.demo.sampleFile.id,
    rowCount: parseRowCount(tool.demo.sampleFile.meta),
    preview,
    resultPayload: tool.demo.result,
  };

  // resultPayload is taken directly from the live config, so this holds by
  // construction here — checkDemoData() re-runs it against committed JSON
  // to catch drift after the config changes without regenerating (IND-000 AC).
  assert.deepStrictEqual(record.resultPayload, tool.demo.result);

  return record;
}

export function recordPath(slug: string, toolId: string): string {
  return path.join(OUT_DIR, slug, `${toolId}.json`);
}

export function generateDemoData(): number {
  let written = 0;
  for (const industry of industries) {
    fs.mkdirSync(path.join(OUT_DIR, industry.slug), { recursive: true });
    for (const tool of industry.tools) {
      const record = generateForTool(industry.slug, tool);
      fs.writeFileSync(recordPath(industry.slug, tool.id), `${JSON.stringify(record, null, 2)}\n`, "utf8");
      written += 1;
    }
  }
  return written;
}

export function checkDemoData(): string[] {
  const issues: string[] = [];
  for (const industry of industries) {
    for (const tool of industry.tools) {
      const file = recordPath(industry.slug, tool.id);
      if (!fs.existsSync(file)) {
        issues.push(`${industry.slug}/${tool.id}: demo data missing — run "npm run gen:demo-data"`);
        continue;
      }
      const record = JSON.parse(fs.readFileSync(file, "utf8")) as DemoDataRecord;
      if (record.sampleFileId !== tool.demo.sampleFile.id) {
        issues.push(`${industry.slug}/${tool.id}: sampleFileId drifted from config — run "npm run gen:demo-data"`);
      }
      try {
        assert.deepStrictEqual(record.resultPayload, tool.demo.result);
      } catch {
        issues.push(`${industry.slug}/${tool.id}: resultPayload drifted from config — run "npm run gen:demo-data"`);
      }
    }
  }
  return issues;
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const written = generateDemoData();
  console.log(`gen:demo-data — wrote ${written} demo data file(s) across ${industries.length} industr${industries.length === 1 ? "y" : "ies"}.`);
}
