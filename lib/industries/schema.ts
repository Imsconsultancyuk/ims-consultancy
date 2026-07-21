import { z } from "zod";

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const REGULATORS = ["FCA", "SRA", "CQC", "ICO"] as const;
const ACCENTS = [
  "amber",
  "emerald",
  "indigo",
  "violet",
  "sky",
  "rose",
  "teal",
  "orange",
  "cyan",
  "fuchsia",
] as const;

const StatSchema = z.object({ value: z.string(), label: z.string() });
const PainSchema = z.object({ title: z.string(), cost: z.string(), line: z.string() });

const DemoStageSchema = z.object({
  key: z.enum(["ingest", "detect", "score", "draft"]),
  label: z.string(),
  detail: z.string(),
  durationMs: z.number().int().positive(),
});

const DemoMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  emphasis: z.boolean().optional(),
});

const DemoScriptSchema = z
  .object({
    sampleFile: z.object({
      id: z.string(),
      label: z.string(),
      type: z.enum(["csv", "pdf"]),
      meta: z.string(),
    }),
    stages: z.tuple([DemoStageSchema, DemoStageSchema, DemoStageSchema, DemoStageSchema]),
    result: z.object({
      headline: z.string(),
      metrics: z.tuple([DemoMetricSchema, DemoMetricSchema, DemoMetricSchema]),
      solution: z.string(),
    }),
  })
  .refine(
    (demo) => {
      const total = demo.stages.reduce((sum, stage) => sum + stage.durationMs, 0);
      return total >= 5000 && total <= 9000;
    },
    { message: "demo.stages total duration must be between 5000ms and 9000ms", path: ["stages"] },
  );

const ToolSchema = z.object({
  id: z.string(),
  name: z.string(),
  problem: z.string().max(110, "problem must be ≤110 chars"),
  outcome: z.string().max(110, "outcome must be ≤110 chars"),
  demo: DemoScriptSchema,
});

const FaqSchema = z.object({ q: z.string(), a: z.string() });

export const IndustrySchema = z.object({
  slug: z.string().regex(KEBAB_CASE, "slug must be kebab-case"),
  name: z.string(),
  shortName: z.string(),
  regulator: z.enum(REGULATORS),
  regulatorLine: z.string(),
  accent: z.enum(ACCENTS),
  leakLine: z.string(),
  meta: z.object({
    title: z.string().max(60, "meta.title must be ≤60 chars"),
    description: z
      .string()
      .min(120, "meta.description must be ≥120 chars")
      .max(160, "meta.description must be ≤160 chars"),
  }),
  hero: z.object({
    h1: z.string(),
    sub: z.string(),
    stats: z.tuple([StatSchema, StatSchema, StatSchema]),
  }),
  pains: z.tuple([PainSchema, PainSchema, PainSchema]),
  tools: z.tuple([ToolSchema, ToolSchema, ToolSchema]),
  results: z.object({
    heading: z.string(),
    before: z.string(),
    after: z.string(),
    metrics: z.tuple([DemoMetricSchema, DemoMetricSchema, DemoMetricSchema]),
  }),
  package: z.object({
    heading: z.string(),
    includes: z.array(z.string()),
    timeline: z.string(),
    anchor: z.string(),
  }),
  faqs: z.tuple([FaqSchema, FaqSchema, FaqSchema, FaqSchema, FaqSchema]),
  related: z.tuple([z.string(), z.string()]),
});

export const IndustriesSchema = z.array(IndustrySchema).superRefine((industries, ctx) => {
  const slugs = new Set(industries.map((industry) => industry.slug));
  const accentOwner = new Map<string, string>();

  industries.forEach((industry, index) => {
    const owner = accentOwner.get(industry.accent);
    if (owner) {
      ctx.addIssue({
        code: "custom",
        message: `accent "${industry.accent}" is reused by "${industry.slug}" and "${owner}" — all 10 accents must be unique`,
        path: [index, "accent"],
      });
    } else {
      accentOwner.set(industry.accent, industry.slug);
    }

    industry.related.forEach((relatedSlug, relatedIndex) => {
      if (!slugs.has(relatedSlug)) {
        ctx.addIssue({
          code: "custom",
          message: `related slug "${relatedSlug}" on "${industry.slug}" does not exist in the registry`,
          path: [index, "related", relatedIndex],
        });
      }
    });
  });
});
