// Single source of truth for what Intel Made Simple sells and what it costs. /pricing, the
// services pages and the home page summary all read from here, so a price is
// changed in one place. Entry-rung prices are "from" figures, rounded down, from
// docs/strategy/service-expansion-2026-10-23.md and are not yet validated by
// a paying customer. Only the audit has an external anchor (published UK
// small-firm bands of roughly £1,500 to £6,000).

export interface Rung {
  slug: string;
  name: string;
  /** What the buyer reads first. */
  price: string;
  /** Pounds due before the work starts, used for the scale chart. */
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
}

export interface Addon {
  slug: string;
  name: string;
  line: string;
  detail: string;
}

export const LADDER: Rung[] = [
  {
    slug: "leak-scan",
    name: "Leak Scan",
    price: "Free",
    firstPayment: 0,
    timing: "About 20 minutes of your time",
    oneLine: "We price the leak in pounds for your type of firm, before you spend anything.",
    href: "/contact",
    cta: "Book a free Leak Scan",
    includes: [
      "A call about how enquiries, invoices and renewals move through your firm",
      "A written estimate of the money leaking, with the working shown",
      "A plain yes or no on whether it is worth fixing",
    ],
    notIncluded: "An estimate from what you tell us, not from your records. The audit reads the records.",
  },
  {
    slug: "ai-second-opinion",
    name: "AI Second Opinion",
    price: "From £400",
    firstPayment: 400,
    timing: "Written within five working days",
    oneLine: "You hold a quote, a tool or a plan from someone else. We read it and say what we would do.",
    href: "/services/ai-readiness-audit#second-opinion",
    cta: "Ask for a second opinion",
    includes: [
      "A read of the quote, proposal or tool you are weighing",
      "Three written questions to put to the seller",
      "Our view in writing: buy, change, or walk away, and why",
    ],
    notIncluded: "We do not build anything at this rung, so we have no reason to talk you into more.",
  },
  {
    slug: "ai-readiness-audit",
    name: "AI Readiness Audit",
    price: "From £1,500",
    firstPayment: 1500,
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
    price: "From £1,200 setup",
    firstPayment: 1200,
    recurring: "then from £300 a month",
    timing: "Live in about three weeks",
    oneLine: "Every enquiry answered and logged, with a person called in for anything that matters.",
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
    price: "From £950 a half-day",
    firstPayment: 950,
    recurring: "plus an AI use policy pack from £600",
    timing: "Half-day for up to 12 people",
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
    // Slug kept from the first site so anchors and links do not move.
    slug: "quiet-workflow",
    name: "Recovery project",
    positioning: "One leak, found and fixed.",
    price: "From £6,000",
    firstPayment: 6000,
    cadence: "Two to four weeks",
    bestFor:
      "A firm whose Leak Scan or audit pointed at one specific leak: unbilled work, unchased invoices or renewals that lapse.",
    whatYouGet: [
      "Two-week diagnostic of how the leak runs today, read against your own records",
      "A fix built with a person approving anything that touches money",
      "Tracking that lists each pound recovered",
      "Recorded hand-over and a ninety-day follow-up window",
      "A fixed price, confirmed in writing after your free Leak Scan",
    ],
    cta: "Scope a recovery project",
  },
  {
    slug: "professional-revamp",
    name: "Department rebuild",
    positioning: "A whole department's leaks, closed in order.",
    price: "From £24,000",
    firstPayment: 24000,
    cadence: "Six to twelve weeks",
    bestFor:
      "A department where several leaks share one cause, such as billing, chasing and renewals run on spreadsheets and memory.",
    whatYouGet: [
      "Audit, decision memo, blueprint and a delivery plan ranked by money recovered",
      "Build in small reversible releases, biggest leak first",
      "Integration with the tools your team already lives in",
      "Training so your in-house team can extend and debug from day one",
      "A fixed price, confirmed in writing after your free Leak Scan",
    ],
    cta: "Discuss a department rebuild",
  },
  {
    slug: "embedded-partnership",
    name: "Retained recovery",
    positioning: "Leaks watched and fixed on a monthly rhythm.",
    price: "From £6,000 per month",
    firstPayment: 6000,
    cadence: "Twelve month minimum",
    bestFor:
      "A firm that has recovered its first money and wants someone watching for the next leak, with build capacity to fix it.",
    whatYouGet: [
      "A monthly statement of every item recovered and every new leak found",
      "A monthly session with a senior adviser, and availability between",
      "Limited build capacity for the next fixes, in priority order",
      "A quarterly written review of what we agreed and what we shipped",
      "A fixed monthly price, confirmed in writing after your free Leak Scan",
    ],
    cta: "Talk about retained recovery",
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
  "Fixed scope, fixed price. No surprise hours.",
  "The Leak Scan is free, so you can see a number before you decide anything.",
  "Entry prices are the lowest we charge for that rung. The fixed quote after the Leak Scan is the price you pay.",
  "We say so when a smaller rung is enough. If a second opinion answers your question, we will not suggest the audit.",
  "Quoted in GBP. VAT where applicable.",
];
