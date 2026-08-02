import type { Industry } from "../types";

export const ifasWealthManagers: Industry = {
  slug: "ifas-wealth-managers",
  name: "Wealth Management & IFAs",
  shortName: "IFA",
  regulator: "FCA",
  regulatorLine:
    "Built for firms answerable to the FCA. The system detects and drafts; your authorised people advise and send.",
  accent: "emerald",
  leakLine: "£38k of recurring fees at risk in one register",
  meta: {
    title: "IFA & Wealth Manager Revenue Recovery | IntelMadeSimple",
    description:
      "Dormant book mining, advice gap scanning and next-gen retention. AI tools that protect recurring fees and surface advice opportunities. GDPR-safe, FCA-aware.",
  },
  hero: {
    h1: "Your recurring fees are only as safe as your least-contacted client",
    sub: "Three tools that read your client register, find the drifting relationships and uncovered advice gaps, and draft the review invitations.",
    stats: [
      { value: "18 mo", label: "without review before a client starts listening to other advisers" },
      { value: "£2,400", label: "average recurring fee at risk per drifting client" },
      { value: "70%", label: "of inherited wealth leaves the original adviser" },
    ],
  },
  pains: [
    {
      title: "Silent drift",
      cost: "£38k+",
      line: "Clients past their review date quietly become someone else's clients.",
    },
    {
      title: "Uncovered gaps",
      cost: "£57k+",
      line: "Protection and pension gaps sit unadvised across the book.",
    },
    {
      title: "The generation cliff",
      cost: "£9.6m",
      line: "AUM walks out with the next generation you've never met.",
    },
  ],
  tools: [
    {
      id: "dormant-book-miner",
      name: "Dormant Book Miner",
      problem: "Review dates lapse quietly. Nobody sees the whole book's drift in one place.",
      outcome: "Every overdue relationship surfaced, ranked by recurring fee at risk, review invitations drafted.",
      actions: [
        "Take the top of the fee-at-risk list into the adviser meeting as this week's calls.",
        "Send the drafted review invitations from the servicing adviser's address.",
        "Clear each overdue flag as the review lands in the diary.",
      ],
      demo: {
        sampleFile: { id: "ifa-register", label: "client_register.csv", type: "csv", meta: "410 client records" },
        stages: [
          { key: "ingest", label: "Parsing client register", detail: "410 records tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting review drift", detail: "Last review and last contact per client", durationMs: 1800 },
          { key: "score", label: "Scoring fees at risk", detail: "Recurring fee × drift months", durationMs: 1600 },
          { key: "draft", label: "Drafting review invitations", detail: "Personalised, adviser-approved", durationMs: 1400 },
        ],
        result: {
          headline: "96 clients past review with fees at risk",
          metrics: [
            { label: "Recurring fees at risk", value: "£38,400/yr", emphasis: true },
            { label: "Invitations drafted", value: "96" },
            { label: "18+ months unseen", value: "34" },
          ],
          solution: "The Miner runs monthly so drift is caught in weeks, not at renewal.",
        },
      },
    },
    {
      id: "gap-scanner",
      name: "Gap Scanner",
      problem: "Advice gaps across a whole book are invisible client-by-client.",
      outcome: "Protection, pension and ISA gaps flagged book-wide, sized in fee terms, agendas drafted.",
      actions: [
        "Sort the gaps by fee value and pick the ones that sit inside your permissions.",
        "Drop the drafted agenda straight into the annual review already scheduled.",
        "Evidence the gap and the recommendation in the client file as you go.",
      ],
      demo: {
        sampleFile: { id: "ifa-holdings", label: "holdings_export.csv", type: "csv", meta: "410 clients · 1,120 holdings" },
        stages: [
          { key: "ingest", label: "Parsing holdings", detail: "1,120 positions tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting advice gaps", detail: "Cover, contribution and allowance gaps", durationMs: 1800 },
          { key: "score", label: "Scoring opportunity", detail: "Fee value per gap per client", durationMs: 1600 },
          { key: "draft", label: "Drafting review agendas", detail: "One agenda per flagged client", durationMs: 1400 },
        ],
        result: {
          headline: "143 advice gaps across 88 clients",
          metrics: [
            { label: "Advice fee opportunity", value: "£57,200", emphasis: true },
            { label: "Review agendas drafted", value: "88" },
            { label: "Unprotected high-earners", value: "26" },
          ],
          solution: "Gap Scanner gives every adviser a reason to call, with the numbers already on the agenda.",
        },
      },
    },
    {
      id: "nextgen-retain",
      name: "NextGen Retain",
      problem: "When wealth transfers, the next generation rarely knows your firm's name.",
      outcome: "Households facing transfer identified, next-gen contact status mapped, introduction plans drafted.",
      actions: [
        "Ask each adviser to confirm which next-generation contacts the firm already holds.",
        "Make the drafted introduction through the existing client, never cold.",
        "Add the next generation to the servicing record so the relationship survives the transfer.",
      ],
      demo: {
        sampleFile: { id: "ifa-households", label: "household_links.csv", type: "csv", meta: "410 clients · 130 linked households" },
        stages: [
          { key: "ingest", label: "Parsing household links", detail: "130 households tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting transfer exposure", detail: "Age, estate signals, linked contacts", durationMs: 1800 },
          { key: "score", label: "Scoring AUM exposure", detail: "Assets facing transfer within 10 years", durationMs: 1600 },
          { key: "draft", label: "Drafting introduction plans", detail: "Family review invitations per household", durationMs: 1400 },
        ],
        result: {
          headline: "64 households facing wealth transfer",
          metrics: [
            { label: "AUM exposed", value: "£9.6m", emphasis: true },
            { label: "No next-gen contact on file", value: "51" },
            { label: "Introduction plans drafted", value: "64" },
          ],
          solution: "NextGen Retain starts the second-generation relationship years before the transfer event.",
        },
      },
    },
  ],
  results: {
    heading: "What a 410-client register gave back",
    before: "Reviews scheduled from memory and diary notes",
    after: "£95,600 of fee opportunity and £9.6m of AUM exposure mapped in one run",
    metrics: [
      { label: "Fee opportunity surfaced", value: "£95,600", emphasis: true },
      { label: "Client actions drafted", value: "248" },
      { label: "Households protected", value: "64" },
    ],
  },
  package: {
    heading: "The IFA package",
    includes: [
      "All three tools configured for your firm",
      "PII tokenisation layer as standard",
      "CRM/register onboarding and data mapping",
      "Monthly findings report with £ figures",
      "UK-based support, DPA included",
    ],
    timeline: "Live within 14 days of data access",
    anchor: "Build from £6,000 · from £2,750/month · one retained client typically covers the year",
  },
  faqs: [
    {
      q: "Is this GDPR compliant?",
      a: "The architecture is built for UK GDPR: identifiable fields are tokenised before any AI processing and the encrypted mapping never leaves your control. We provide a DPA with every engagement and a DPIA on request.",
    },
    {
      q: "What data do you need?",
      a: "A client register export: client, recurring fee, last review, holdings summary. Back-office exports work as-is.",
    },
    {
      q: "How long does setup take?",
      a: "Most firms are live within 14 days of granting data access. The demo you just ran mirrors the real pipeline. What follows is configuration, not construction.",
    },
    {
      q: "Does it work with our systems?",
      a: "Yes. Intelliflo Office, Xplan, Curo and spreadsheet registers.",
    },
    {
      q: "What does it cost?",
      a: "A one-off build fee then a monthly retainer, anchored so one retained client typically covers the year. Exact pricing on the call, based on book size.",
    },
  ],
  related: ["mortgage-brokers", "accountancy-firms"],
};
