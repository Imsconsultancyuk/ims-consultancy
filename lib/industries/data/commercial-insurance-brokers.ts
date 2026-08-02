import type { Industry } from "../types";

export const commercialInsuranceBrokers: Industry = {
  slug: "commercial-insurance-brokers",
  name: "Commercial Insurance Brokers",
  shortName: "Broker",
  regulator: "FCA",
  regulatorLine:
    "Built for firms answerable to the FCA. The system detects and drafts; your authorised people advise and send.",
  accent: "sky",
  leakLine: "41 renewals wobbling in the next 90 days",
  meta: {
    title: "AI Revenue Recovery for Insurance Brokers | IntelMadeSimple",
    description:
      "Renewal defence, cover-gap scanning and quote turnaround. AI tools that protect your book and win the ones you quote. GDPR-safe, FCA-aware.",
  },
  hero: {
    h1: "Your renewal book is your business. Defend it like one",
    sub: "Three tools that spot at-risk renewals 90 days out, find uncovered risks across your book, and get your submissions to underwriters first.",
    stats: [
      { value: "90 days", label: "before renewal, when retention is won or lost" },
      { value: "£1,800", label: "average commission on a lost commercial renewal" },
      { value: "1st", label: "broker back to the client wins the placement" },
    ],
  },
  pains: [
    {
      title: "Silent churn",
      cost: "£74k GWP",
      line: "At-risk renewals look fine until the non-renewal email arrives.",
    },
    {
      title: "Uncovered risks",
      cost: "£52k",
      line: "Clients hold property cover and no cyber, D&O or BI. Nobody has checked the book.",
    },
    {
      title: "Slow submissions",
      cost: "2 days",
      line: "Underwriters reward the first complete submission; yours is still in the inbox.",
    },
  ],
  tools: [
    {
      id: "renewal-defence",
      name: "Renewal Defence",
      problem: "Churn risk hides in mid-term behaviour: claims friction, contact gaps, premium jumps.",
      outcome: "Every renewal risk-scored 90 days out, retention outreach drafted for account handlers.",
      actions: [
        "Give each account handler their at-risk renewals 90 days out, not 30.",
        "Send the drafted retention outreach before the incumbent insurer's invitation lands.",
        "Escalate anything above your premium threshold to the director who signed the account.",
      ],
      demo: {
        sampleFile: { id: "ins-book", label: "policy_book.csv", type: "csv", meta: "620 policies" },
        stages: [
          { key: "ingest", label: "Parsing policy book", detail: "620 policies tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting churn signals", detail: "Premium movement, claims friction, contact gaps", durationMs: 1800 },
          { key: "score", label: "Scoring renewal risk", detail: "90-day risk score per policy", durationMs: 1600 },
          { key: "draft", label: "Drafting retention outreach", detail: "Per-client renewal reviews", durationMs: 1400 },
        ],
        result: {
          headline: "41 renewals at risk in the next 90 days",
          metrics: [
            { label: "GWP at risk", value: "£74,000", emphasis: true },
            { label: "Commission exposure", value: "£11,100" },
            { label: "Retention plans drafted", value: "41" },
          ],
          solution: "Renewal Defence gives your handlers a 90-day head start on every wobbling account.",
        },
      },
    },
    {
      id: "cover-gap-scanner",
      name: "Cover Gap Scanner",
      problem: "Cross-sell across a 600-policy book is impossible client-by-client.",
      outcome: "Every obvious uncovered risk flagged and sized, review invitations drafted.",
      actions: [
        "Pick the gaps that match the agencies you actually hold and park the rest.",
        "Attach the drafted invitation to the renewal review already in the diary.",
        "Record any client decline in writing so the file evidences the advice given.",
      ],
      demo: {
        sampleFile: { id: "ins-schedules", label: "client_schedules.csv", type: "csv", meta: "310 clients · cover schedules" },
        stages: [
          { key: "ingest", label: "Parsing schedules", detail: "310 client schedules tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting cover gaps", detail: "Cyber, D&O, BI, key person vs sector norms", durationMs: 1800 },
          { key: "score", label: "Scoring premium opportunity", detail: "Gap value per client", durationMs: 1600 },
          { key: "draft", label: "Drafting review invitations", detail: "Risk-review agenda per client", durationMs: 1400 },
        ],
        result: {
          headline: "133 uncovered risks across 97 clients",
          metrics: [
            { label: "Premium opportunity", value: "£52,300", emphasis: true },
            { label: "Review invitations drafted", value: "97" },
            { label: "Cyber gaps in exposed sectors", value: "44" },
          ],
          solution: "The scanner turns your existing book into your best new-business pipeline.",
        },
      },
    },
    {
      id: "quote-turnaround",
      name: "Quote Turnaround Engine",
      problem: "Assembling a clean underwriter submission from client documents takes days.",
      outcome: "Client docs in, structured underwriter-ready submission pack out in minutes.",
      actions: [
        "Check the submission pack against the client's own documents before it goes out.",
        "Send the same clean pack to every underwriter on the panel.",
        "Reuse last year's pack as the starting point at the next renewal.",
      ],
      demo: {
        sampleFile: { id: "ins-submission", label: "submission_docs_sample.pdf", type: "pdf", meta: "1 client · 4 documents" },
        stages: [
          { key: "ingest", label: "Parsing client documents", detail: "Proposal forms and schedules extracted", durationMs: 1400 },
          { key: "detect", label: "Detecting required fields", detail: "Per line of business", durationMs: 1800 },
          { key: "score", label: "Scoring completeness", detail: "Gaps flagged with client questions", durationMs: 1600 },
          { key: "draft", label: "Drafting submission pack", detail: "Underwriter-ready, house style", durationMs: 1400 },
        ],
        result: {
          headline: "Underwriter-ready pack in 6 minutes",
          metrics: [
            { label: "Turnaround time", value: "6 min", emphasis: true },
            { label: "Fields auto-completed", value: "58" },
            { label: "Missing items flagged", value: "3" },
          ],
          solution: "First complete submission in wins. The engine makes that yours by default.",
        },
      },
    },
  ],
  results: {
    heading: "What a 620-policy book gave back",
    before: "Renewals reviewed at 30 days; cross-sell when someone thinks of it",
    after: "£126,300 of GWP defence and premium opportunity surfaced in one run",
    metrics: [
      { label: "Opportunity surfaced", value: "£126,300", emphasis: true },
      { label: "Client actions drafted", value: "138" },
      { label: "Handler hours saved / month", value: "34" },
    ],
  },
  package: {
    heading: "The Broker package",
    includes: [
      "All three tools configured for your firm",
      "PII tokenisation layer as standard",
      "CRM/book onboarding and data mapping",
      "Monthly findings report with £ figures",
      "UK-based support, DPA included",
    ],
    timeline: "Live within 14 days of data access",
    anchor: "Build from £6,000 · from £2,750/month · two defended renewals cover the retainer",
  },
  faqs: [
    {
      q: "Is this GDPR compliant?",
      a: "The architecture is built for UK GDPR: identifiable fields are tokenised before any AI processing and the encrypted mapping never leaves your control. We provide a DPA with every engagement and a DPIA on request.",
    },
    {
      q: "What data do you need?",
      a: "A policy book export covering client, line, renewal date, premium and claims flag, plus cover schedules for the scanner.",
    },
    {
      q: "How long does setup take?",
      a: "Most firms are live within 14 days of granting data access. The demo you just ran mirrors the real pipeline. What follows is configuration, not construction.",
    },
    {
      q: "Does it work with our systems?",
      a: "Yes. Acturis, Open GI, Applied Epic and broker-system CSV exports.",
    },
    {
      q: "What does it cost?",
      a: "A one-off build fee then a monthly retainer, anchored so a single defended renewal covers months of fees. Exact pricing on the call, based on book size.",
    },
  ],
  related: ["mortgage-brokers", "commercial-property"],
};
