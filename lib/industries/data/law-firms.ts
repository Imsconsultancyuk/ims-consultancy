import type { Industry } from "../types";

export const lawFirms: Industry = {
  slug: "law-firms",
  name: "Law Firms",
  shortName: "Law Firm",
  regulator: "SRA",
  regulatorLine:
    "Built for SRA-regulated practices — the system detects and drafts; your fee earners review, advise and send.",
  accent: "indigo",
  leakLine: "121 enquiries never followed up in six months",
  meta: {
    title: "AI Revenue Recovery for Law Firms | IntelMadeSimple",
    description:
      "Enquiry recovery, WIP leak detection and cross-practice radar — AI tools that capture the instructions and time your firm already earned. GDPR-safe, SRA-aware.",
  },
  hero: {
    h1: "Your firm loses more to slow follow-up than to any competitor",
    sub: "Three tools that read your enquiry log, time ledger and matter history — and hand your fee earners the instructions they were about to lose.",
    stats: [
      { value: "42%", label: "of law-firm enquiries never receive a follow-up" },
      { value: "£1,540", label: "average instruction value lost per unanswered enquiry" },
      { value: "90 days", label: "after which unbilled WIP rarely gets billed" },
    ],
  },
  pains: [
    {
      title: "Enquiries go cold",
      cost: "£186k",
      line: "Prospects instruct whoever replies first; the log says that's often not you.",
    },
    {
      title: "WIP leaks",
      cost: "£47k",
      line: "Recorded time ages past 90 days and quietly gets written off.",
    },
    {
      title: "One-matter clients",
      cost: "£83k",
      line: "Conveyancing clients leave without ever hearing about wills or LPAs.",
    },
  ],
  tools: [
    {
      id: "enquiry-recovery",
      name: "Enquiry Recovery Engine",
      problem: "Enquiries arrive nights and weekends; follow-up depends on who's busiest.",
      outcome: "Every unconverted enquiry found, valued by matter type, follow-up sequences drafted.",
      demo: {
        sampleFile: { id: "law-enquiries", label: "enquiry_log.csv", type: "csv", meta: "312 enquiries · 6 months" },
        stages: [
          { key: "ingest", label: "Parsing enquiry log", detail: "312 enquiries tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting lost follow-ups", detail: "No response or single-touch only", durationMs: 1800 },
          { key: "score", label: "Scoring instruction value", detail: "By matter type and stated need", durationMs: 1600 },
          { key: "draft", label: "Drafting recovery sequences", detail: "Three-touch, per matter type", durationMs: 1400 },
        ],
        result: {
          headline: "121 enquiries never followed up",
          metrics: [
            { label: "Est. instruction value", value: "£186,300", emphasis: true },
            { label: "Recovery sequences drafted", value: "121" },
            { label: "High-value (£3k+ matters)", value: "38" },
          ],
          solution: "The engine watches your enquiry channels and drafts same-day responses for fee-earner sign-off.",
        },
      },
    },
    {
      id: "wip-leak-detector",
      name: "WIP Leak Detector",
      problem: "Unbilled time ages invisibly across dozens of matters until write-off.",
      outcome: "Ageing WIP surfaced by matter and fee earner, billing narratives drafted.",
      demo: {
        sampleFile: { id: "law-ledger", label: "time_ledger.csv", type: "csv", meta: "2,400 time entries" },
        stages: [
          { key: "ingest", label: "Parsing time ledger", detail: "2,400 entries tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting ageing WIP", detail: "Unbilled entries past 60/90 days", durationMs: 1800 },
          { key: "score", label: "Scoring recoverability", detail: "By matter status and client history", durationMs: 1600 },
          { key: "draft", label: "Drafting billing narratives", detail: "Ready for partner review", durationMs: 1400 },
        ],
        result: {
          headline: "£47,200 unbilled beyond 90 days",
          metrics: [
            { label: "Recoverable WIP", value: "£47,200", emphasis: true },
            { label: "Matters affected", value: "34" },
            { label: "Narratives drafted", value: "34" },
          ],
          solution: "The detector runs weekly so WIP gets billed at 30 days, not written off at 120.",
        },
      },
    },
    {
      id: "cross-practice-radar",
      name: "Cross-Practice Radar",
      problem: "Each department's clients never hear what the other departments do.",
      outcome: "Single-matter clients matched to obvious next needs, introduction letters drafted.",
      demo: {
        sampleFile: { id: "law-matters", label: "matter_history.csv", type: "csv", meta: "890 closed matters" },
        stages: [
          { key: "ingest", label: "Parsing matter history", detail: "890 matters tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting single-service clients", detail: "Conveyancing without wills, probate without IHT advice", durationMs: 1800 },
          { key: "score", label: "Scoring next-matter fit", detail: "Life-event and matter-type signals", durationMs: 1600 },
          { key: "draft", label: "Drafting introductions", detail: "Warm, per practice area", durationMs: 1400 },
        ],
        result: {
          headline: "208 clients with an obvious next matter",
          metrics: [
            { label: "Cross-sell opportunity", value: "£83,600", emphasis: true },
            { label: "Introduction letters drafted", value: "208" },
            { label: "Conveyancing → wills matches", value: "156" },
          ],
          solution: "The radar turns every closed matter into the start of the next one.",
        },
      },
    },
  ],
  results: {
    heading: "What one mid-size firm's data gave back",
    before: "Follow-up when someone remembers; billing at quarter end",
    after: "£317,100 of instructions, WIP and cross-sell surfaced in one run",
    metrics: [
      { label: "Total opportunity", value: "£317,100", emphasis: true },
      { label: "Client actions drafted", value: "363" },
      { label: "Fee-earner hours saved / month", value: "40" },
    ],
  },
  package: {
    heading: "The Law Firm package",
    includes: [
      "All three tools configured for your firm",
      "PII tokenisation layer as standard",
      "CRM/book onboarding and data mapping",
      "Monthly findings report with £ figures",
      "UK-based support, DPA included",
    ],
    timeline: "Live within 14 days of data access",
    anchor: "Build from £6,500 · from £3,000/month · one recovered instruction covers a quarter",
  },
  faqs: [
    {
      q: "Is this GDPR compliant?",
      a: "The architecture is built for UK GDPR: identifiable fields are tokenised before any AI processing and the encrypted mapping never leaves your control. We provide a DPA with every engagement and a DPIA on request.",
    },
    {
      q: "What data do you need?",
      a: "Exports of your enquiry log, time ledger and closed-matter list. We map fields in onboarding — no reformatting by your team.",
    },
    {
      q: "How long does setup take?",
      a: "Most firms are live within 14 days of granting data access. The demo you just ran mirrors the real pipeline — configuration, not construction.",
    },
    {
      q: "Does it work with our systems?",
      a: "Yes — Clio, LEAP, Actionstep, Proclaim and practice-management exports.",
    },
    {
      q: "What does it cost?",
      a: "A one-off build fee then a monthly retainer — anchored so a single recovered instruction covers months of fees. Exact pricing on the call, based on book size.",
    },
  ],
  related: ["accountancy-firms", "ma-advisory-business-brokers"],
};
