import type { Industry } from "./types";

import { mortgageBrokers } from "./data/mortgage-brokers";

// IND tickets (gated on IMS-050) each add one data file under ./data and one
// import line here, in the order listed in Doc 2.
export const industries: Industry[] = [mortgageBrokers];

export const industrySlugs: string[] = industries.map((industry) => industry.slug);

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
