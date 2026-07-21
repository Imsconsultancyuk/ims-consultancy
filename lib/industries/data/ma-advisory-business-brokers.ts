import type { Industry } from "../types";

export const maAdvisoryBusinessBrokers: Industry = {
  slug: "ma-advisory-business-brokers",
  name: "M&A Advisory & Business Brokers",
  shortName: "Advisory Firm",
  regulator: "ICO",
  regulatorLine:
    "Registered with the ICO and built to UK GDPR — your data is processed under a DPA, tokenised, and never used for model training.",
  accent: "rose",
  leakLine: "67 succession-risk owners in one region",
  meta: {
    title: "AI Deal Origination for M&A Advisers | IntelMadeSimple",
    description:
      "Succession scanning, target sourcing and buyer-mandate matching — AI tools that originate sell-side mandates before the market sees them. GDPR-safe.",
  },
  hero: {
    h1: "The best mandates are signed before anyone knows they're for sale",
    sub: "Three tools that read public filings and your own mandate book to surface succession-risk owners, matched targets and live buyer fits.",
    stats: [
      { value: "£75k+", label: "typical fee on a lower-mid-market mandate" },
      { value: "60%", label: "of UK owner-managers past 55 have no succession plan" },
      { value: "2,400", label: "companies scanned per region per run" },
    ],
  },
  pains: [
    {
      title: "Origination drought",
      cost: "67 targets",
      line: "Every adviser fishes the same pond; the off-market pond is bigger.",
    },
    {
      title: "Slow target search",
      cost: "38 fits",
      line: "Buyer mandates stall for weeks while target lists are built by hand.",
    },
    {
      title: "Unmatched books",
      cost: "12 matches",
      line: "Live buyers and live sellers sit in the same office, unintroduced.",
    },
  ],
  tools: [
    {
      id: "succession-signal-scanner",
      name: "Succession Signal Scanner",
      problem: "Succession-risk owners don't announce themselves — their filings do.",
      outcome: "Regional company base scanned for succession signals, ranked pipeline with approach drafts.",
      demo: {
        sampleFile: { id: "ma-region", label: "region_companies.csv", type: "csv", meta: "2,400 companies · one region" },
        stages: [
          { key: "ingest", label: "Parsing company base", detail: "2,400 filings profiles loaded", durationMs: 1400 },
          { key: "detect", label: "Detecting succession signals", detail: "Director age, tenure, no successor, profit stability", durationMs: 1800 },
          { key: "score", label: "Scoring mandate likelihood", detail: "Signal stack per company", durationMs: 1600 },
          { key: "draft", label: "Drafting approaches", detail: "Owner-appropriate letters per target", durationMs: 1400 },
        ],
        result: {
          headline: "67 succession-risk targets identified",
          metrics: [
            { label: "Priority pipeline", value: "67", emphasis: true },
            { label: "Directors 60+ with no successor", value: "41" },
            { label: "Approach letters drafted", value: "67" },
          ],
          solution: "The scanner refreshes monthly — your origination pipeline fills from public data, not networking luck.",
        },
      },
    },
    {
      id: "target-sourcer",
      name: "Target Sourcer",
      problem: "A buyer mandate is only as good as the target list behind it.",
      outcome: "Mandate criteria in, scored long-list of matched acquisition targets out.",
      demo: {
        sampleFile: { id: "ma-mandate", label: "buyer_mandate_sample.pdf", type: "pdf", meta: "1 mandate · acquisition criteria" },
        stages: [
          { key: "ingest", label: "Parsing mandate", detail: "Sector, size, geography, deal criteria extracted", durationMs: 1400 },
          { key: "detect", label: "Detecting candidates", detail: "Company base screened against criteria", durationMs: 1800 },
          { key: "score", label: "Scoring strategic fit", detail: "Financial and strategic weighting", durationMs: 1600 },
          { key: "draft", label: "Drafting target profiles", detail: "One-page profile per target", durationMs: 1400 },
        ],
        result: {
          headline: "38 matched targets for one mandate",
          metrics: [
            { label: "Scored targets", value: "38", emphasis: true },
            { label: "Strong strategic fits", value: "14" },
            { label: "Profiles drafted", value: "38" },
          ],
          solution: "Target Sourcer turns a two-week research job into a same-day deliverable.",
        },
      },
    },
    {
      id: "buyer-mandate-matcher",
      name: "Buyer-Mandate Matcher",
      problem: "Matches between your own live buyers and sellers go unnoticed across desks.",
      outcome: "Every live buyer and seller cross-matched, introduction memos drafted.",
      demo: {
        sampleFile: { id: "ma-mandates", label: "live_mandates.csv", type: "csv", meta: "31 buy-side · 19 sell-side" },
        stages: [
          { key: "ingest", label: "Parsing mandate book", detail: "50 mandates tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting cross-matches", detail: "Criteria intersection buy×sell", durationMs: 1800 },
          { key: "score", label: "Scoring deal probability", detail: "Fit, valuation gap, timing", durationMs: 1600 },
          { key: "draft", label: "Drafting intro memos", detail: "Per-match, partner-ready", durationMs: 1400 },
        ],
        result: {
          headline: "12 live buyer-seller matches in your own book",
          metrics: [
            { label: "Matches found", value: "12", emphasis: true },
            { label: "High-probability", value: "5" },
            { label: "Intro memos drafted", value: "12" },
          ],
          solution: "The matcher makes sure the deal sitting in your own office never walks out of it.",
        },
      },
    },
  ],
  results: {
    heading: "What one regional desk's run gave back",
    before: "Origination by referral; target lists by hand",
    after: "117 mandate opportunities and matches surfaced in one run",
    metrics: [
      { label: "Pipeline entries created", value: "117", emphasis: true },
      { label: "Partner-ready documents", value: "117" },
      { label: "Research hours saved / month", value: "45" },
    ],
  },
  package: {
    heading: "The Advisory Firm package",
    includes: [
      "All three tools configured for your firm",
      "PII tokenisation layer as standard",
      "CRM/book onboarding and data mapping",
      "Monthly findings report with £ figures",
      "UK-based support, DPA included",
    ],
    timeline: "Live within 14 days of data access",
    anchor: "Build from £7,500 · from £3,500/month · a fraction of one mandate fee",
  },
  faqs: [
    {
      q: "Is this GDPR compliant?",
      a: "The architecture is built for UK GDPR: identifiable fields are tokenised before any AI processing and the encrypted mapping never leaves your control. We provide a DPA with every engagement and a DPIA on request.",
    },
    {
      q: "What data do you need?",
      a: "Your live mandate list and target regions/sectors. Company data comes from public filings — we bring that.",
    },
    {
      q: "How long does setup take?",
      a: "Most firms are live within 14 days of granting data access. The demo you just ran mirrors the real pipeline — configuration, not construction.",
    },
    {
      q: "Does it work with our systems?",
      a: "Works alongside DealCloud, HubSpot or spreadsheet mandate books.",
    },
    {
      q: "What does it cost?",
      a: "A one-off build fee then a monthly retainer — anchored so a single recovered mandate covers months of fees. Exact pricing on the call, based on book size.",
    },
  ],
  related: ["law-firms", "accountancy-firms"],
};
