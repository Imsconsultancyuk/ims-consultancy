import { industries } from "./index";
import type { DemoMetric, Pain, Regulator, Tool } from "./types";

// The /solutions page merges the old /tools page and the Sectors dropdown.
// It covers the ten industries that have their own /industries/<slug> page,
// plus sole traders, which has no deep page yet and is written here.
export interface SolutionSector {
  slug: string;
  name: string;
  shortName: string;
  regulator: Regulator;
  regulatorLine: string;
  leakLine: string;
  promise: string;
  sub: string;
  pains: Pain[];
  tools: Tool[];
  results: { heading: string; total: string; actions: string; metrics: DemoMetric[] };
  // Null while the sector has no /industries page of its own.
  deepHref: string | null;
}

const soleTrader: SolutionSector = {
  slug: "sole-trader",
  name: "Sole Traders & Small Businesses",
  shortName: "Sole trader",
  regulator: "ICO",
  regulatorLine:
    "Built to UK GDPR. Your customers' details are processed under a DPA, tokenised, and never used for model training.",
  leakLine: "23 quotes never followed up in six months",
  promise: "You do the work. The chasing is what falls through the cracks.",
  sub: "Three white-label tools that read your quotes, invoices and job history, then hand you the follow-ups you were about to forget. Built to run under your own name, with no software for you to learn.",
  pains: [
    {
      title: "Quotes go quiet",
      cost: "£18k",
      line: "Chasing feels pushy and the diary is full, so the job goes to whoever replied next.",
    },
    {
      title: "Invoices run late",
      cost: "£7k",
      line: "Money you have already earned sits unpaid because a reminder never felt urgent.",
    },
    {
      title: "Past customers drift",
      cost: "£22k",
      line: "People who were happy with the work never hear from you when the next service is due.",
    },
  ],
  tools: [
    {
      id: "quote-chaser",
      name: "Quote Chaser",
      problem: "Quotes go out, then nothing, because following up never makes the to-do list.",
      outcome: "Every unanswered quote found, valued, and a polite follow-up drafted in your own voice.",
      actions: [
        "Send the drafted follow-up on the quotes worth most, today.",
        "Add a line about the customer's own job so it reads as personal, not automated.",
        "Mark won, lost or still thinking so a dead quote stops being chased.",
      ],
      demo: {
        sampleFile: { id: "st-quotes", label: "sent_quotes.csv", type: "csv", meta: "64 quotes · 6 months" },
        stages: [
          { key: "ingest", label: "Reading sent quotes", detail: "64 quotes tokenised", durationMs: 1400 },
          { key: "detect", label: "Finding quotes with no reply", detail: "No answer, no booking, no decline", durationMs: 1800 },
          { key: "score", label: "Valuing each job", detail: "By quote size and trade", durationMs: 1600 },
          { key: "draft", label: "Drafting follow-ups", detail: "Short, friendly, one per customer", durationMs: 1400 },
        ],
        result: {
          headline: "23 quotes never followed up",
          metrics: [
            { label: "Est. job value", value: "£18,400", emphasis: true },
            { label: "Follow-ups drafted", value: "23" },
            { label: "Worth £1k or more", value: "9" },
          ],
          solution: "The chaser watches your sent quotes and drafts the nudge three days after each one goes quiet.",
        },
      },
    },
    {
      id: "late-invoice-nudger",
      name: "Late Invoice Nudger",
      problem: "You have already done the work, and the payment waits on a reminder you have not sent.",
      outcome: "Overdue invoices ranked by age and size, with a firm but friendly reminder drafted for each.",
      actions: [
        "Send the oldest, largest reminders first.",
        "Ring the customer yourself on anything past 60 days.",
        "Move a repeat late payer to payment up front.",
      ],
      demo: {
        sampleFile: { id: "st-invoices", label: "invoices.csv", type: "csv", meta: "140 invoices · 12 months" },
        stages: [
          { key: "ingest", label: "Reading invoices", detail: "140 invoices tokenised", durationMs: 1400 },
          { key: "detect", label: "Finding overdue invoices", detail: "Unpaid past their due date", durationMs: 1800 },
          { key: "score", label: "Ranking by age and size", detail: "Oldest and largest first", durationMs: 1600 },
          { key: "draft", label: "Drafting reminders", detail: "Three tones, from gentle to firm", durationMs: 1400 },
        ],
        result: {
          headline: "11 invoices overdue past 30 days",
          metrics: [
            { label: "Outstanding", value: "£6,900", emphasis: true },
            { label: "Reminders drafted", value: "11" },
            { label: "Oldest overdue", value: "74 days" },
          ],
          solution: "The nudger runs each Monday, so no invoice is more than a week late before someone asks about it.",
        },
      },
    },
    {
      id: "repeat-customer-reminder",
      name: "Repeat Customer Reminder",
      problem: "Happy customers need the same job again, and nobody tells them you are the one to call.",
      outcome: "Past customers due a repeat job or service found, with a reminder drafted for each.",
      actions: [
        "Send the reminders for jobs due this quarter first.",
        "Offer the customer two slots so replying is one tap.",
        "Log the booking so the next reminder date resets itself.",
      ],
      demo: {
        sampleFile: { id: "st-jobs", label: "past_jobs.csv", type: "csv", meta: "310 jobs · 3 years" },
        stages: [
          { key: "ingest", label: "Reading job history", detail: "310 jobs tokenised", durationMs: 1400 },
          { key: "detect", label: "Finding repeat-work customers", detail: "Annual services, seasonal and follow-on jobs", durationMs: 1800 },
          { key: "score", label: "Timing each reminder", detail: "By job type and last visit", durationMs: 1600 },
          { key: "draft", label: "Drafting reminders", detail: "Personal, with two slots offered", durationMs: 1400 },
        ],
        result: {
          headline: "86 past customers due a repeat job",
          metrics: [
            { label: "Est. repeat work", value: "£21,500", emphasis: true },
            { label: "Reminders drafted", value: "86" },
            { label: "Service due this quarter", value: "41" },
          ],
          solution: "The reminder turns every finished job into the date of the next one.",
        },
      },
    },
  ],
  results: {
    heading: "What one sole trader's records gave back",
    total: "£46,800 of quotes, invoices and repeat work surfaced in one run",
    actions: "120 follow-ups drafted",
    metrics: [
      { label: "Total opportunity", value: "£46,800", emphasis: true },
      { label: "Follow-ups drafted", value: "120" },
      { label: "Admin hours saved / month", value: "12" },
    ],
  },
  deepHref: null,
};

function fromIndustry(i: (typeof industries)[number]): SolutionSector {
  return {
    slug: i.slug,
    name: i.name,
    shortName: i.shortName,
    regulator: i.regulator,
    regulatorLine: i.regulatorLine,
    leakLine: i.leakLine,
    promise: i.hero.h1,
    sub: i.hero.sub,
    pains: [...i.pains],
    tools: [...i.tools],
    results: {
      heading: i.results.heading,
      total: i.results.after,
      actions: i.results.metrics[1].value,
      metrics: [...i.results.metrics],
    },
    deepHref: `/industries/${i.slug}`,
  };
}

// Sole traders lead the picker: the widest audience, and the only sector with no deep page.
export const solutionSectors: SolutionSector[] = [soleTrader, ...industries.map(fromIndustry)];

export const solutionSlugs: string[] = solutionSectors.map((s) => s.slug);

// Lower-cases a sector name for use inside a sentence, keeping acronyms intact
// ("IFAs", "B2B SaaS", "M&A") so copy never reads "ifa work".
export function workName(shortName: string): string {
  return shortName
    .split(" ")
    .map((word) => (/[A-Z].*[A-Z]/.test(word) ? word : word.toLowerCase()))
    .join(" ");
}

export interface ToolFigure {
  label: string;
  display: string;
  amount: number;
  money: boolean;
}

// The headline figure of a tool's sample run, as a number the chart can scale.
// Returns null when the value is not a plain amount (for example "11 days").
export function toolFigure(tool: Tool): ToolFigure | null {
  const metric = tool.demo.result.metrics.find((m) => m.emphasis) ?? tool.demo.result.metrics[0];
  const match = /^£?\s*([\d,]+(?:\.\d+)?)\s*([km])?/i.exec(metric.value.trim());
  if (!match) return null;
  const base = parseFloat(match[1].replace(/,/g, ""));
  const unit = match[2]?.toLowerCase();
  const amount = unit === "m" ? base * 1_000_000 : unit === "k" ? base * 1_000 : base;
  return {
    label: metric.label,
    display: metric.value,
    amount,
    money: metric.value.trim().startsWith("£"),
  };
}

export function sectorFigures(sector: SolutionSector): ToolFigure[] | null {
  const figures = sector.tools.map(toolFigure);
  if (figures.some((f) => f === null)) return null;
  const list = figures as ToolFigure[];
  if (!list.every((f) => f.money)) return null;
  // A tool measuring assets under management beside one measuring fees cannot share a bar scale.
  const amounts = list.map((f) => f.amount);
  return Math.max(...amounts) / Math.min(...amounts) > 10 ? null : list;
}
