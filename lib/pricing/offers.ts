// Single source of truth for what Intel Made Simple sells and what it costs. /pricing, the
// services pages and the home page summary all read from here, so a price is
// changed in one place. The model itself (stage price, success-fee bands, the
// partner code) lives in ./recovery.ts. Approved by Adam 2026-11-07: every paid
// unit of work is one price, and the success fee is the only thing that scales.

import {
  CARE_MONTHLY,
  FEE_MONTHS,
  FULL_SYSTEM_PRICE,
  PARTNER_CODE,
  PARTNER_PRICE,
  STAGE_PRICE,
  gbp,
} from "./recovery";

export interface Rung {
  slug: string;
  name: string;
  /** What the buyer reads first. */
  price: string;
  /** Pounds due before the work starts. */
  firstPayment: number;
  /** Anything that recurs, shown beside the price. */
  recurring?: string;
  timing: string;
  oneLine: string;
  /** Where the offer is explained. */
  href: string;
  cta: string;
  includes: string[];
  /** The honest limit: what this rung does not do. */
  notIncluded: string;
}

export interface Tier {
  slug: string;
  name: string;
  positioning: string;
  price: string;
  firstPayment: number;
  cadence: string;
  bestFor: string;
  whatYouGet: string[];
  cta: string;
  href: string;
}

export interface Addon {
  slug: string;
  name: string;
  line: string;
  detail: string;
}

export const SUCCESS_FEE_LINE = `then 15 to 25% of what it recovers, for ${FEE_MONTHS} months`;

export const LADDER: Rung[] = [
  {
    slug: "leak-scan",
    name: "Leak Scan",
    price: "Free",
    firstPayment: 0,
    timing: "About 20 minutes of your time",
    oneLine: "We price the leak in pounds for your type of firm and set the baseline any recovery is measured against.",
    href: "/contact?intent=leak-scan&from=pricing-ladder",
    cta: "Book a free Leak Scan",
    includes: [
      "A call about how enquiries, quotes, invoices and renewals move through your firm",
      "A written estimate of the money leaking, with the working shown",
      "The baseline we measure recovery against, agreed in writing",
    ],
    notIncluded: "An estimate from what you tell us, not from your records. The audit reads the records.",
  },
  {
    slug: "ai-readiness-audit",
    name: "AI Readiness Audit",
    price: gbp(STAGE_PRICE),
    firstPayment: STAGE_PRICE,
    timing: "One to two weeks",
    oneLine: "We sit with the owner, watch how the work runs and hand back a ranked list of where AI pays and where it does not.",
    href: "/services/ai-readiness-audit",
    cta: "Book an audit",
    includes: [
      "Time with the owner and the people who do the work",
      "A read of the last twelve months of enquiries, invoices and renewals",
      "A ranked list of fixes with a cost and a payback for each",
      "A short list of what to leave alone",
    ],
    notIncluded: "A plan, not a build. If you act on it, you can take it to anyone.",
  },
  {
    slug: "enquiry-desk",
    name: "Enquiry Desk",
    price: `${gbp(STAGE_PRICE)} build`,
    firstPayment: STAGE_PRICE,
    recurring: SUCCESS_FEE_LINE,
    timing: "Live in about three weeks",
    oneLine: "The Enquiry stage, built: every enquiry answered and logged, with a person called in for anything that matters.",
    href: "/services/enquiry-desk",
    cta: "Talk about an Enquiry Desk",
    includes: [
      "Calls, forms and messages answered the same day, in your voice",
      "Every enquiry logged with a follow-up date",
      "A weekly list of enquiries that went quiet",
      "Hand-off to a named person for anything above your threshold",
    ],
    notIncluded: "Call and message costs from the telephony provider are passed through at cost.",
  },
  {
    slug: "team-enablement",
    name: "Team Enablement",
    price: gbp(STAGE_PRICE),
    firstPayment: STAGE_PRICE,
    timing: "Half-day for up to 12 people, policy pack included",
    oneLine: "Your team learns to use AI on their own work, and you leave with a policy that says what is allowed.",
    href: "/services/team-enablement",
    cta: "Plan a session",
    includes: [
      "A half-day built around your team's real tasks, not a demo deck",
      "An AI use policy in plain English: what goes in, what stays out, who signs off",
      "A one-page card for each role",
    ],
    notIncluded: "Not legal advice. The policy is a working document your adviser can review.",
  },
];

export const TIERS: Tier[] = [
  {
    // Slugs kept from the first site so anchors and links do not move.
    slug: "quiet-workflow",
    name: "Stage build",
    positioning: "One stage of the five, built and recovering.",
    price: gbp(STAGE_PRICE),
    firstPayment: STAGE_PRICE,
    cadence: `Two to four weeks. First project ${gbp(PARTNER_PRICE)} with ${PARTNER_CODE}*`,
    bestFor:
      "A firm whose Leak Scan pointed at one stage: enquiries that wait, quotes nobody chases, unbilled work, late invoices or lapsed renewals.",
    whatYouGet: [
      "The stage rebuilt, with a person approving anything that touches money",
      "Tracking that lists each pound recovered against your Leak Scan baseline",
      `A success fee of 15 to 25% of what it recovers, for ${FEE_MONTHS} months, then nothing`,
      "Recorded hand-over. The system is yours",
    ],
    cta: "Start with one stage",
    href: "/contact?intent=stage-build&plan=stage-build&from=pricing-tiers",
  },
  {
    slug: "professional-revamp",
    name: "Full system",
    positioning: "All five stages, enquiry to renewal.",
    price: gbp(FULL_SYSTEM_PRICE),
    firstPayment: FULL_SYSTEM_PRICE,
    cadence: "Six to ten weeks. Five stages for the price of four",
    bestFor:
      "A firm where the leaks share one cause, such as quoting, billing, chasing and renewals run on spreadsheets and memory.",
    whatYouGet: [
      "Enquiry, Quote, Work done, Invoice and Renewal rebuilt in order, biggest leak first",
      "Integration with the tools your team already lives in",
      `The same success fee of 15 to 25%, for ${FEE_MONTHS} months, then nothing`,
      "Training so your in-house team can extend and debug from day one",
    ],
    cta: "Plan the full system",
    href: "/contact?intent=full-system&plan=full-system&from=pricing-tiers",
  },
  {
    slug: "embedded-partnership",
    name: "Care",
    positioning: "Watched and fixed after year one.",
    price: `${gbp(CARE_MONTHLY)} per month`,
    firstPayment: CARE_MONTHLY,
    cadence: `Optional, once the ${FEE_MONTHS}-month success period ends`,
    bestFor:
      "A firm that wants someone watching the system after the success fee stops, so a new leak is caught early.",
    whatYouGet: [
      "Monitoring of every stage you run, with a monthly statement",
      "Fixes when a supplier, form or inbox changes underneath you",
      "A quarterly review of what moved and what to build next",
      "Cancel with a month's notice",
    ],
    cta: "Ask about Care",
    href: "/contact?intent=care&plan=care&from=pricing-tiers",
  },
];

// White-label add-ons for agencies and advisers who resell under their own
// brand. Quoted per build, so no price is published.
export const ADDONS: Addon[] = [
  {
    slug: "voice",
    name: "Voice receptionist",
    line: "Answers the phone under your brand and hands off to a person.",
    detail: "Picks up, takes the details, books where a diary is connected and passes anything urgent to a human.",
  },
  {
    slug: "agents",
    name: "AI agents for one job",
    line: "One narrow task, done quietly under your brand.",
    detail: "Qualifying enquiries, chasing invoices, drafting replies for a person to approve. One agent, one job, a named owner.",
  },
];

export const PRICING_PRINCIPLES = [
  "No recovery, no fee. Our success fee is a share of money recovered above the baseline your Leak Scan sets. If nothing comes back, the success fee is nothing.",
  `One price for a unit of work: ${gbp(STAGE_PRICE)}. A stage build, an audit and a team session all cost the same. All five stages together are ${gbp(FULL_SYSTEM_PRICE)}.`,
  "The more we recover, the lower our rate: 25% on the first £5,000 a month, 20% from £5,000 to £20,000, 15% above that.",
  `The success fee runs for ${FEE_MONTHS} months from go-live, then stops. The system stays yours.`,
  "The Leak Scan is free, so you can see a number before you decide anything.",
  "Quoted in GBP. VAT where applicable.",
];

/** The small print the asterisks point to. Rendered at the foot of /pricing, above the site footer. */
export const PRICING_TERMS = [
  `${PARTNER_CODE}: the first stage build on a firm's first project with us is ${gbp(PARTNER_PRICE)} instead of ${gbp(STAGE_PRICE)}. One use per firm, first project only, not combinable with any other offer. Quote the code when you book.`,
  "Success fee: 15 to 25% of money recovered above the baseline agreed in writing after your free Leak Scan, charged monthly in arrears for 12 months from go-live, then it ends. Your exact rate is confirmed in writing before any work starts.",
  "Money recovered means work won, billed or collected that the baseline shows you were not getting: enquiries converted, quotes won after follow-up, work billed that would have gone unbilled, invoices collected past 60 days, and renewals kept.",
  "If nothing is recovered above the baseline, no success fee is due. The build fee is due on delivery whatever the result.",
  "Calculator figures are illustrations from the numbers you enter and our stated assumptions, not a forecast or a promise of results.",
  "Prices exclude VAT. Intel Made Simple, United Kingdom.",
];
