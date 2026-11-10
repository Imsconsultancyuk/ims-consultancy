// The recovery model: what a firm pays, what we earn, and the arithmetic the
// /pricing calculator runs. Approved by Adam 2026-11-07. Every price on the site
// reads from here or from offers.ts, which reads from here.

export const STAGE_PRICE = 1500;
export const FULL_SYSTEM_PRICE = 6000;
export const PARTNER_PRICE = 699;
export const PARTNER_CODE = "NEWPARTNER26";
export const CARE_MONTHLY = 295;
export const FEE_MONTHS = 12;
export const FEE_FLOOR = 0.15;
export const FEE_CEILING = 0.25;

export interface FeeBand {
  from: number;
  to: number;
  rate: number;
}

/** Marginal bands, like income tax: each rate applies only to the slice inside its band. */
export const FEE_BANDS: readonly FeeBand[] = [
  { from: 0, to: 5000, rate: 0.25 },
  { from: 5000, to: 20000, rate: 0.2 },
  { from: 20000, to: Number.POSITIVE_INFINITY, rate: 0.15 },
];

export const BOOKING_URL = "https://cal.com/ims-consultancy/leak-scan";

export function monthlyFee(recovered: number): number {
  return FEE_BANDS.reduce((sum, band) => {
    const slice = Math.min(Math.max(recovered - band.from, 0), band.to - band.from);
    return sum + slice * band.rate;
  }, 0);
}

export function buildCost(stageCount: number, withPartnerCode: boolean): number {
  if (stageCount === 0) return 0;
  const list = stageCount >= 5 ? FULL_SYSTEM_PRICE : stageCount * STAGE_PRICE;
  return withPartnerCode ? list - (STAGE_PRICE - PARTNER_PRICE) : list;
}

export function gbp(n: number): string {
  return `£${Math.round(n).toLocaleString("en-GB")}`;
}

export type StageId = "enquiry" | "quote" | "work" | "invoice" | "renewal";

export interface Stage {
  id: StageId;
  name: string;
  question: string;
  min: number;
  max: number;
  step: number;
  initial: number;
  /** "count" values are multiplied by the average job value; "pounds" are already money. */
  unit: "count" | "pounds";
  /** Share of each counted item that would have become paid work. Our planning assumption, shown on the page. */
  conversion: number;
  assumption: string;
}

export const STAGES: readonly Stage[] = [
  {
    id: "enquiry",
    name: "Enquiry",
    question: "Enquiries a month that wait a day or more for a reply",
    min: 0,
    max: 40,
    step: 1,
    initial: 6,
    unit: "count",
    conversion: 0.25,
    assumption: "We assume 1 in 4 answered enquiries becomes paid work.",
  },
  {
    id: "quote",
    name: "Quote",
    question: "Quotes a month sent and never followed up",
    min: 0,
    max: 30,
    step: 1,
    initial: 4,
    unit: "count",
    conversion: 0.2,
    assumption: "We assume 1 in 5 chased quotes is won.",
  },
  {
    id: "work",
    name: "Work done",
    question: "Work done each month that never reaches an invoice",
    min: 0,
    max: 20000,
    step: 250,
    initial: 1500,
    unit: "pounds",
    conversion: 1,
    assumption: "Counted at the value you would have billed.",
  },
  {
    id: "invoice",
    name: "Invoice",
    question: "Invoices going past 60 days late each month",
    min: 0,
    max: 40000,
    step: 500,
    initial: 3000,
    unit: "pounds",
    conversion: 1,
    assumption: "Counted at face value, before any late payment interest.",
  },
  {
    id: "renewal",
    name: "Renewal",
    question: "Clients a month who do not renew or come back",
    min: 0,
    max: 20,
    step: 1,
    initial: 1,
    unit: "count",
    conversion: 1,
    assumption: "Each one counted at your average job value.",
  },
];

export const JOB_VALUE = { min: 500, max: 20000, step: 250, initial: 2500 } as const;
export const WIN_BACK = { min: 30, max: 70, step: 5, initial: 50 } as const;

export function stageLeak(stage: Stage, value: number, jobValue: number): number {
  return stage.unit === "count" ? value * jobValue * stage.conversion : value;
}

export interface Projection {
  leak: number;
  recovered: number;
  fee: number;
  keep: number;
  rate: number;
  build: number;
  /** Cumulative pounds, month 0 to FEE_MONTHS. Client figure is net of the build cost. */
  clientByMonth: number[];
  oursByMonth: number[];
  paybackDays: number | null;
}

export function project(leak: number, winBackPct: number, stageCount: number, withPartnerCode: boolean): Projection {
  const recovered = leak * (winBackPct / 100);
  const fee = monthlyFee(recovered);
  const keep = recovered - fee;
  const build = buildCost(stageCount, withPartnerCode);
  const months = Array.from({ length: FEE_MONTHS + 1 }, (_, m) => m);
  return {
    leak,
    recovered,
    fee,
    keep,
    rate: recovered > 0 ? fee / recovered : 0,
    build,
    clientByMonth: months.map((m) => keep * m - build),
    oursByMonth: months.map((m) => fee * m + build),
    paybackDays: keep > 0 ? Math.ceil(build / (keep / 30)) : null,
  };
}
