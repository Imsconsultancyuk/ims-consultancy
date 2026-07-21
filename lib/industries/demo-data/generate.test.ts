import fs from "node:fs";

import { afterEach, describe, expect, it } from "vitest";

import { checkDemoData, generateDemoData, generateForTool, recordPath } from "./generate";
import { industries } from "../index";
import type { Industry, Tool } from "../types";

const FIXTURE_SLUG = "__fixture-industry__";

function buildFixtureTool(overrides: Partial<Tool["demo"]["result"]> = {}): Tool {
  return {
    id: "fixture-tool",
    name: "Fixture Tool",
    problem: "Fixture problem line.",
    outcome: "Fixture outcome line.",
    demo: {
      sampleFile: { id: "fixture-sample", label: "fixture.csv", type: "csv", meta: "42 fixture records" },
      stages: [
        { key: "ingest", label: "Ingest", detail: "Reading fixture data", durationMs: 1200 },
        { key: "detect", label: "Detect", detail: "Matching fixture records", durationMs: 1400 },
        { key: "score", label: "Score", detail: "Scoring fixture records", durationMs: 1600 },
        { key: "draft", label: "Draft", detail: "Drafting fixture output", durationMs: 1200 },
      ],
      result: {
        headline: "42 fixture matches",
        metrics: [
          { label: "Fixture metric", value: "£1,000", emphasis: true },
          { label: "Fixture count", value: "42" },
          { label: "Fixture urgency", value: "9" },
        ],
        solution: "Fixture solution line.",
        ...overrides,
      },
    },
  };
}

function buildFixtureIndustry(tool: Tool): Industry {
  return {
    slug: FIXTURE_SLUG,
    name: "Fixture Industry",
    shortName: "Fixture",
    regulator: "FCA",
    regulatorLine: "Fixture regulator line.",
    accent: "amber",
    leakLine: "Fixture leak line.",
    meta: { title: "Fixture", description: "Fixture description." },
    hero: { h1: "Fixture h1", sub: "Fixture sub", stats: [
      { value: "1", label: "one" },
      { value: "2", label: "two" },
      { value: "3", label: "three" },
    ] },
    pains: [
      { title: "Fixture pain 1", cost: "£1", line: "Fixture line 1." },
      { title: "Fixture pain 2", cost: "£2", line: "Fixture line 2." },
      { title: "Fixture pain 3", cost: "£3", line: "Fixture line 3." },
    ],
    tools: [tool, tool, tool],
    results: {
      heading: "Fixture results",
      before: "Fixture before",
      after: "Fixture after",
      metrics: [
        { label: "a", value: "1" },
        { label: "b", value: "2" },
        { label: "c", value: "3" },
      ],
    },
    package: { heading: "Fixture package", includes: ["a"], timeline: "1 week", anchor: "Fixture anchor" },
    faqs: [
      { q: "q1", a: "a1" },
      { q: "q2", a: "a2" },
      { q: "q3", a: "a3" },
      { q: "q4", a: "a4" },
      { q: "q5", a: "a5" },
    ],
    related: ["mortgage-brokers", "law-firms"],
  };
}

afterEach(() => {
  const index = industries.findIndex((i) => i.slug === FIXTURE_SLUG);
  if (index !== -1) industries.splice(index, 1);
  const file = recordPath(FIXTURE_SLUG, "fixture-tool");
  fs.rmSync(file, { force: true });
  fs.rmSync(`${process.cwd()}/lib/industries/demo-data/${FIXTURE_SLUG}`, { recursive: true, force: true });
});

describe("generateForTool", () => {
  it("is deterministic across runs for the same slug + tool id", () => {
    const tool = buildFixtureTool();
    const a = generateForTool(FIXTURE_SLUG, tool);
    const b = generateForTool(FIXTURE_SLUG, tool);
    expect(a).toEqual(b);
  });

  it("parses rowCount from the sample file meta and copies resultPayload from config", () => {
    const tool = buildFixtureTool();
    const record = generateForTool(FIXTURE_SLUG, tool);
    expect(record.rowCount).toBe(42);
    expect(record.sampleFileId).toBe("fixture-sample");
    expect(record.resultPayload).toEqual(tool.demo.result);
    expect(record.preview).toHaveLength(5);
  });

  it("never uses a plausible real-person name — only the fictional pool", () => {
    const tool = buildFixtureTool();
    const record = generateForTool(FIXTURE_SLUG, tool);
    const fictionalFirstNames = ["Sample", "Demo", "Example", "Placeholder", "Test"];
    const fictionalSurnames = ["Exampleton", "Sampleworth", "Demoford", "Testwell", "Placehold"];
    for (const row of record.preview) {
      const [first, last] = row.name.split(" ");
      expect(fictionalFirstNames).toContain(first);
      expect(fictionalSurnames).toContain(last);
      expect(row.company.endsWith("Sample Ltd")).toBe(true);
    }
  });
});

describe("checkDemoData", () => {
  it("flags a missing file for an industry that hasn't been generated yet", () => {
    const industry = buildFixtureIndustry(buildFixtureTool());
    industries.push(industry);

    const issues = checkDemoData();
    expect(issues.some((issue) => issue.includes(FIXTURE_SLUG) && issue.includes("missing"))).toBe(true);
  });

  it("passes once generated, then fails the build if config numbers drift", () => {
    const industry = buildFixtureIndustry(buildFixtureTool());
    industries.push(industry);
    generateDemoData();

    expect(checkDemoData().filter((issue) => issue.includes(FIXTURE_SLUG))).toHaveLength(0);

    industry.tools[0].demo.result.metrics[0].value = "£9,999";

    const issues = checkDemoData();
    expect(issues.some((issue) => issue.includes(FIXTURE_SLUG) && issue.includes("drifted"))).toBe(true);
  });
});
