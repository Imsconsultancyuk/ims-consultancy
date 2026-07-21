"use client";

import { DropZone } from "@/components/industry/demo/DropZone";
import { LiveDemoPlayer } from "@/components/industry/demo/LiveDemoPlayer";
import { PipelineRail } from "@/components/industry/demo/PipelineRail";
import { ResultsPanel } from "@/components/industry/demo/ResultsPanel";
import { SampleFileChip } from "@/components/industry/demo/SampleFileChip";
import { DemoArmProvider } from "@/components/industry/demo/DemoContext";
import { DemoMachineProvider } from "@/components/industry/demo/useDemoMachine";
import type { Tool } from "@/lib/industries/types";

// Structurally-valid but obviously-synthetic dummy tools — not Doc 2 content
// (IND tickets haven't started). Three tools to match the Industry.tools
// tuple shape and exercise LiveDemoPlayer's tools[0->1->2] cycle.
const DEV_TOOLS: [Tool, Tool, Tool] = [
  {
    id: "dev-tool-a",
    name: "Dev Tool A",
    problem: "Placeholder problem line for harness tool A.",
    outcome: "Placeholder outcome line for harness tool A.",
    demo: {
      sampleFile: { id: "dev-sample-a", label: "sample-a.csv", type: "csv", meta: "180 rows" },
      stages: [
        { key: "ingest", label: "Ingesting", detail: "Reading sample-a.csv", durationMs: 1200 },
        { key: "detect", label: "Detecting", detail: "Scanning for anomalies", durationMs: 1400 },
        { key: "score", label: "Scoring", detail: "Ranking by risk", durationMs: 1300 },
        { key: "draft", label: "Drafting", detail: "Preparing summary", durationMs: 1200 },
      ],
      result: {
        headline: "Dev harness result A",
        metrics: [
          { label: "Flagged", value: "12", emphasis: true },
          { label: "Reviewed", value: "180" },
          { label: "Time saved", value: "3.2 hrs" },
        ],
        solution: "Placeholder solution copy for harness tool A.",
      },
    },
  },
  {
    id: "dev-tool-b",
    name: "Dev Tool B",
    problem: "Placeholder problem line for harness tool B.",
    outcome: "Placeholder outcome line for harness tool B.",
    demo: {
      sampleFile: { id: "dev-sample-b", label: "sample-b.pdf", type: "pdf", meta: "42 pages" },
      stages: [
        { key: "ingest", label: "Ingesting", detail: "Reading sample-b.pdf", durationMs: 1300 },
        { key: "detect", label: "Detecting", detail: "Extracting clauses", durationMs: 1500 },
        { key: "score", label: "Scoring", detail: "Checking compliance", durationMs: 1400 },
        { key: "draft", label: "Drafting", detail: "Preparing report", durationMs: 1200 },
      ],
      result: {
        headline: "Dev harness result B",
        metrics: [
          { label: "Clauses checked", value: "42", emphasis: true },
          { label: "Issues found", value: "3" },
          { label: "Time saved", value: "5.1 hrs" },
        ],
        solution: "Placeholder solution copy for harness tool B.",
      },
    },
  },
  {
    id: "dev-tool-c",
    name: "Dev Tool C",
    problem: "Placeholder problem line for harness tool C.",
    outcome: "Placeholder outcome line for harness tool C.",
    demo: {
      sampleFile: { id: "dev-sample-c", label: "sample-c.csv", type: "csv", meta: "96 clients" },
      stages: [
        { key: "ingest", label: "Ingesting", detail: "Reading sample-c.csv", durationMs: 1200 },
        { key: "detect", label: "Detecting", detail: "Matching records", durationMs: 1300 },
        { key: "score", label: "Scoring", detail: "Prioritising follow-up", durationMs: 1300 },
        { key: "draft", label: "Drafting", detail: "Preparing outreach list", durationMs: 1100 },
      ],
      result: {
        headline: "Dev harness result C",
        metrics: [
          { label: "Matched", value: "96", emphasis: true },
          { label: "Follow-up needed", value: "18" },
          { label: "Time saved", value: "2.4 hrs" },
        ],
        solution: "Placeholder solution copy for harness tool C.",
      },
    },
  },
];

export function DevDemoHarness() {
  return (
    <DemoArmProvider>
      <DemoMachineProvider industry="dev-harness" tools={DEV_TOOLS}>
        <main className="flex min-h-screen flex-col gap-10 bg-paper p-12 text-ink">
          <h1 className="font-industry-display text-4xl font-semibold">Demo components (dev)</h1>
          <p className="max-w-xl text-sm text-ink-soft">
            Scratch harness for IMS-045 manual QA. Renders the demo/ components against synthetic
            dummy tools since no industry page exists yet.
          </p>

          <section className="flex flex-col gap-4">
            <h2 className="font-industry-display text-xl font-medium">LiveDemoPlayer</h2>
            <LiveDemoPlayer tools={DEV_TOOLS} />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-industry-display text-xl font-medium">Sample file chips</h2>
            <div className="flex flex-wrap gap-4">
              {DEV_TOOLS.map((tool) => (
                <SampleFileChip key={tool.id} tool={tool} accent="indigo" />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-industry-display text-xl font-medium">Drop zone</h2>
            <DropZone tools={DEV_TOOLS} accent="indigo" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-industry-display text-xl font-medium">Pipeline rail</h2>
            <PipelineRail tools={DEV_TOOLS} />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-industry-display text-xl font-medium">Results panel</h2>
            <ResultsPanel tools={DEV_TOOLS} industry="dev-harness" />
          </section>
        </main>
      </DemoMachineProvider>
    </DemoArmProvider>
  );
}
