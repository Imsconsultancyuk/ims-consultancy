export type Regulator = "FCA" | "SRA" | "CQC" | "ICO";
export type Accent = "amber"|"emerald"|"indigo"|"violet"|"sky"|"rose"|"teal"|"orange"|"cyan"|"fuchsia";

export interface Stat { value: string; label: string }
export interface Pain { title: string; cost: string; line: string }

export interface DemoStage {
  key: "ingest" | "detect" | "score" | "draft";
  label: string;        // shown on the pipeline rail
  detail: string;       // one-line sub-caption while running
  durationMs: number;   // 1200–2200 typical
}
export interface DemoMetric { label: string; value: string; emphasis?: boolean }
export interface DemoScript {
  sampleFile: { id: string; label: string; type: "csv" | "pdf"; meta: string };
  stages: [DemoStage, DemoStage, DemoStage, DemoStage];
  result: { headline: string; metrics: [DemoMetric, DemoMetric, DemoMetric]; solution: string };
}
export interface Tool {
  id: string; name: string;
  problem: string;      // one line, ≤110 chars
  outcome: string;      // one line, ≤110 chars
  demo: DemoScript;
}
export interface Faq { q: string; a: string }

export interface Industry {
  slug: string; name: string; shortName: string;
  regulator: Regulator; regulatorLine: string;
  accent: Accent;
  meta: { title: string; description: string };
  hero: { h1: string; sub: string; stats: [Stat, Stat, Stat] };
  pains: [Pain, Pain, Pain];
  tools: [Tool, Tool, Tool];
  results: { heading: string; before: string; after: string; metrics: [DemoMetric, DemoMetric, DemoMetric] };
  package: { heading: string; includes: string[]; timeline: string; anchor: string };
  faqs: [Faq, Faq, Faq, Faq, Faq];
  related: [string, string];
}
