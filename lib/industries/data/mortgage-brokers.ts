import type { Industry } from "../types";

export const mortgageBrokers: Industry = {
  slug: "mortgage-brokers",
  name: "Mortgage & Finance Brokers",
  shortName: "Mortgage Broker",
  regulator: "FCA",
  regulatorLine:
    "Built for firms answerable to the FCA. The system detects and drafts; your authorised people advise and send.",
  accent: "amber",
  leakLine: "62 maturities were waiting in one sample book",
  meta: {
    title: "AI Revenue Recovery for Mortgage Brokers | IntelMadeSimple",
    description:
      "Maturity tracking, orphan client revival and protection cross-sell. AI tools that find the fees already sitting in your client book. GDPR-safe, FCA-aware.",
  },
  hero: {
    h1: "Your client book already knows your next six months of fees",
    sub: "Three tools that read your book, find every maturing deal and dormant client, and draft the outreach before the high-street lender gets there.",
    stats: [
      { value: "£1,244", label: "avg proc fee left unclaimed per lapsed client" },
      { value: "6 mo", label: "warning your book gives you before every maturity" },
      { value: "73%", label: "of clients who remortgage stay with whoever contacts them first" },
    ],
  },
  pains: [
    {
      title: "Maturities slip past",
      cost: "£43k+",
      line: "Fixed-rate end dates sit in your CRM while clients drift to their lender's retention team.",
    },
    {
      title: "Orphaned clients",
      cost: "£29k+",
      line: "Past clients with no assigned adviser quietly remortgage elsewhere.",
    },
    {
      title: "Protection never mentioned",
      cost: "£24k+",
      line: "Completions close, protection conversations never open.",
    },
  ],
  tools: [
    {
      id: "maturity-radar",
      name: "Maturity Radar",
      problem: "Fixed-rate end dates are scheduled fee events. Most books have no system watching them.",
      outcome: "Every maturing client surfaced six months out, scored by fee value, outreach drafted.",
      actions: [
        "Open Monday's list and assign each maturing client to the adviser who wrote the original case.",
        "Send the drafted outreach from that adviser's own inbox, highest fee value first.",
        "Book the review before the incumbent lender's retention team makes its call.",
      ],
      demo: {
        sampleFile: { id: "mb-client-book", label: "client_book_sample.csv", type: "csv", meta: "240 client records" },
        stages: [
          { key: "ingest", label: "Parsing client book", detail: "240 records mapped, fields tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting maturity dates", detail: "Scanning fixed-rate end dates across all lenders", durationMs: 1800 },
          { key: "score", label: "Scoring fee value & urgency", detail: "Ranking by proc fee and days to maturity", durationMs: 1600 },
          { key: "draft", label: "Drafting client outreach", detail: "Personalised letters and email sequences", durationMs: 1400 },
        ],
        result: {
          headline: "62 clients maturing within 6 months",
          metrics: [
            { label: "Est. proc fees in window", value: "£43,400", emphasis: true },
            { label: "Outreach drafted", value: "62" },
            { label: "Highest-urgency (≤60 days)", value: "17" },
          ],
          solution: "Maturity Radar watches your book continuously and hands your advisers a ready-to-send pipeline every Monday.",
        },
      },
    },
    {
      id: "orphan-client-revival",
      name: "Orphan Client Revival",
      problem: "Clients with no assigned adviser remortgage with someone else. Silently, every month.",
      outcome: "Dormant and orphaned clients identified, verified as contactable, revival sequences drafted.",
      actions: [
        "Work the verified-contactable list first and park anything that failed the check.",
        "Reassign every revived client to a named adviser so the book stops going orphan again.",
        "Release the revival sequence in weekly batches your team can actually answer.",
      ],
      demo: {
        sampleFile: { id: "mb-orphans", label: "orphaned_clients.csv", type: "csv", meta: "180 dormant records" },
        stages: [
          { key: "ingest", label: "Parsing dormant list", detail: "180 records tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting orphan status", detail: "No adviser contact in 12+ months", durationMs: 1800 },
          { key: "score", label: "Scoring revival value", detail: "Prioritising by likely borrowing need", durationMs: 1600 },
          { key: "draft", label: "Drafting revival sequences", detail: "Three-touch reintroduction per client", durationMs: 1400 },
        ],
        result: {
          headline: "118 revivable clients found",
          metrics: [
            { label: "Est. fee opportunity", value: "£29,150", emphasis: true },
            { label: "Contactable & opted-in", value: "118" },
            { label: "Sequences drafted", value: "118" },
          ],
          solution: "Orphan Client Revival turns your dormant back book into a monthly reactivation pipeline.",
        },
      },
    },
    {
      id: "protection-cross-sell",
      name: "Protection Cross-Sell Engine",
      problem: "Most completions close without a protection conversation ever being logged.",
      outcome: "Every completion without protection flagged, review invitations drafted for adviser sign-off.",
      actions: [
        "Review the flagged completions and sign off only the drafts you are happy to send.",
        "Route each invitation to the adviser who handled the mortgage, never a call centre.",
        "Log the protection outcome back on the case so the flag clears itself.",
      ],
      demo: {
        sampleFile: { id: "mb-completions", label: "completions_2024.csv", type: "csv", meta: "95 completed cases" },
        stages: [
          { key: "ingest", label: "Parsing completions", detail: "95 cases tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting protection gaps", detail: "No linked policy on file", durationMs: 1800 },
          { key: "score", label: "Scoring household exposure", detail: "Loan size, dependants, term", durationMs: 1600 },
          { key: "draft", label: "Drafting review invitations", detail: "Compliance-safe, adviser-approved sends", durationMs: 1400 },
        ],
        result: {
          headline: "71 completions with no protection recorded",
          metrics: [
            { label: "First-year commission opportunity", value: "£24,850", emphasis: true },
            { label: "Review invitations drafted", value: "71" },
            { label: "High-exposure households", value: "23" },
          ],
          solution: "The engine flags the gap and drafts the invitation. Your authorised adviser owns the advice.",
        },
      },
    },
  ],
  results: {
    heading: "What a 240-client book gave back",
    before: "Maturities tracked in a spreadsheet, when there's time",
    after: "£97,400 of fee opportunity surfaced and drafted in one run",
    metrics: [
      { label: "Total opportunity found", value: "£97,400", emphasis: true },
      { label: "Client actions drafted", value: "251" },
      { label: "Adviser hours saved / month", value: "31" },
    ],
  },
  package: {
    heading: "The Mortgage Broker package",
    includes: [
      "All three tools configured for your firm",
      "PII tokenisation layer as standard",
      "CRM/book onboarding and data mapping",
      "Monthly findings report with £ figures",
      "UK-based support, DPA included",
    ],
    timeline: "Live within 14 days of data access",
    anchor: "Build from £5,500 · from £2,500/month · one recovered maturity month covers the retainer",
  },
  faqs: [
    {
      q: "Is this GDPR compliant?",
      a: "The architecture is built for UK GDPR: identifiable fields are tokenised before any AI processing and the encrypted mapping never leaves your control. We provide a DPA with every engagement and a DPIA on request.",
    },
    {
      q: "What data do you need?",
      a: "A CSV or CRM export of your client book: client, lender, rate end date, last contact. We map it in onboarding; you never reformat anything.",
    },
    {
      q: "How long does setup take?",
      a: "Most firms are live within 14 days of granting data access. The demo you just ran mirrors the real pipeline. What follows is configuration, not construction.",
    },
    {
      q: "Does it work with our systems?",
      a: "Yes. Smartr365, 360 Lifecycle, Intelligent Office and spreadsheet books. If it exports, we ingest it.",
    },
    {
      q: "What does it cost?",
      a: "A one-off build fee then a monthly retainer, anchored so a single recovered maturity covers months of fees. Exact pricing on the call, based on book size.",
    },
  ],
  related: ["ifas-wealth-managers", "commercial-insurance-brokers"],
};
