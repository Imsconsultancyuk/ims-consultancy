import type { Industry } from "../types";

export const b2bSaas: Industry = {
  slug: "b2b-saas",
  name: "B2B SaaS",
  shortName: "Company",
  regulator: "ICO",
  regulatorLine:
    "Registered with the ICO and built to UK GDPR. Your data is processed under a DPA, tokenised, and never used for model training.",
  accent: "cyan",
  leakLine: "£186k ARR at risk in one export",
  meta: {
    title: "AI Revenue Recovery for B2B SaaS | IntelMadeSimple",
    description:
      "Churn-signal detection, failed-payment recovery and expansion mining. AI tools that defend and grow ARR from data you already have. GDPR-safe.",
  },
  hero: {
    h1: "Your ARR leaks are in the data you already collect",
    sub: "Three tools that read usage and billing exports, flag the accounts about to churn, recover failed payments, and surface expansion-ready customers.",
    stats: [
      { value: "£186k", label: "ARR flagged at risk in one 480-account export" },
      { value: "9%", label: "of failed payments never retried effectively" },
      { value: "41", label: "expansion-ready accounts found in the same file" },
    ],
  },
  pains: [
    {
      title: "Silent churn",
      cost: "£186k",
      line: "Usage decline shows 60 days before the cancellation email, if anyone is looking.",
    },
    {
      title: "Involuntary churn",
      cost: "£23k",
      line: "Failed payments quietly expire instead of being recovered.",
    },
    {
      title: "Missed expansion",
      cost: "£96k",
      line: "Accounts hitting plan limits never hear from sales.",
    },
  ],
  tools: [
    {
      id: "churn-signal-detector",
      name: "Churn Signal Detector",
      problem: "Churn risk shows in usage decline and support friction long before renewal.",
      outcome: "Every account risk-scored from usage patterns, save-plays drafted for CS.",
      actions: [
        "Give CS the risk-scored list at the start of the week, not at renewal.",
        "Run the drafted save-play while the account still has runway to recover.",
        "Feed the outcome back so the score reflects what actually saved the account.",
      ],
      demo: {
        sampleFile: { id: "saas-usage", label: "usage_export_sample.csv", type: "csv", meta: "480 accounts · 90 days" },
        stages: [
          { key: "ingest", label: "Parsing usage export", detail: "480 accounts tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting risk signals", detail: "Login decay, seat shrink, ticket sentiment", durationMs: 1800 },
          { key: "score", label: "Scoring churn risk", detail: "ARR-weighted risk per account", durationMs: 1600 },
          { key: "draft", label: "Drafting save plays", detail: "Per account, CS-ready", durationMs: 1400 },
        ],
        result: {
          headline: "32 accounts showing churn signals",
          metrics: [
            { label: "ARR at risk", value: "£186,000", emphasis: true },
            { label: "Save plays drafted", value: "32" },
            { label: "High-risk enterprise accounts", value: "7" },
          ],
          solution: "The detector runs weekly so CS works a ranked save list, not a renewal surprise.",
        },
      },
    },
    {
      id: "failed-payment-recovery",
      name: "Failed Payment Recovery",
      problem: "Dunning defaults let recoverable revenue expire in silence.",
      outcome: "Failed payments segmented by cause, recovery sequences drafted per segment.",
      actions: [
        "Split hard failures from soft ones and stop dunning the ones that cannot recover.",
        "Send the cause-specific sequence instead of the generic card-update email.",
        "Route anything above your ACV threshold to a human before the account lapses.",
      ],
      demo: {
        sampleFile: { id: "saas-billing", label: "billing_export_sample.csv", type: "csv", meta: "480 accounts · billing events" },
        stages: [
          { key: "ingest", label: "Parsing billing events", detail: "Payment failures tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting recoverable failures", detail: "Card expiry vs decline vs dispute", durationMs: 1800 },
          { key: "score", label: "Scoring recovery odds", detail: "By cause, tenure, value", durationMs: 1600 },
          { key: "draft", label: "Drafting recovery flows", detail: "Cause-specific sequences", durationMs: 1400 },
        ],
        result: {
          headline: "£23,400 in recoverable failed payments",
          metrics: [
            { label: "Recoverable MRR events", value: "£23,400", emphasis: true },
            { label: "Card-expiry saves", value: "61%" },
            { label: "Sequences drafted", value: "48" },
          ],
          solution: "Recovery flows tuned to failure cause, not one generic dunning email on repeat.",
        },
      },
    },
    {
      id: "expansion-miner",
      name: "Expansion Miner",
      problem: "Expansion-ready accounts announce themselves in usage data nobody mines.",
      outcome: "Accounts at plan limits or multi-team usage flagged, expansion plays drafted for sales.",
      actions: [
        "Hand sales the accounts already at plan limits before the renewal conversation.",
        "Lead with the usage evidence rather than the price list.",
        "Time the play to the usage spike, not to the contract date.",
      ],
      demo: {
        sampleFile: { id: "saas-usage-2", label: "usage_export_sample.csv", type: "csv", meta: "same 480-account export" },
        stages: [
          { key: "ingest", label: "Parsing usage export", detail: "480 accounts re-read for growth", durationMs: 1400 },
          { key: "detect", label: "Detecting expansion signals", detail: "Limit proximity, seat growth, feature adoption", durationMs: 1800 },
          { key: "score", label: "Scoring expansion value", detail: "Uplift per account", durationMs: 1600 },
          { key: "draft", label: "Drafting expansion plays", detail: "Per account, AE-ready", durationMs: 1400 },
        ],
        result: {
          headline: "41 expansion-ready accounts",
          metrics: [
            { label: "Expansion ARR available", value: "£96,000", emphasis: true },
            { label: "At plan limits now", value: "18" },
            { label: "Plays drafted", value: "41" },
          ],
          solution: "The miner hands sales a warm expansion list from the same file that defends your base.",
        },
      },
    },
  ],
  results: {
    heading: "What one 480-account export gave back",
    before: "Churn found at renewal; dunning on defaults; expansion ad hoc",
    after: "£305,400 of ARR defence and growth surfaced from two CSVs",
    metrics: [
      { label: "ARR opportunity", value: "£305,400", emphasis: true },
      { label: "Plays drafted", value: "121" },
      { label: "CS/RevOps hours saved / month", value: "42" },
    ],
  },
  package: {
    heading: "The Company package",
    includes: [
      "All three tools configured for your firm",
      "PII tokenisation layer as standard",
      "CRM/book onboarding and data mapping",
      "Monthly findings report with £ figures",
      "UK-based support, DPA included",
    ],
    timeline: "Live within 14 days of data access",
    anchor: "Build from £6,500 · from £3,000/month · one saved enterprise account covers the year",
  },
  faqs: [
    {
      q: "Is this GDPR compliant?",
      a: "The architecture is built for UK GDPR: identifiable fields are tokenised before any AI processing and the encrypted mapping never leaves your control. We provide a DPA with every engagement and a DPIA on request.",
    },
    {
      q: "What data do you need?",
      a: "Usage and billing exports (CSV), or read-only access to Stripe and your analytics. No production access needed.",
    },
    {
      q: "How long does setup take?",
      a: "Most firms are live within 14 days of granting data access. The demo you just ran mirrors the real pipeline. What follows is configuration, not construction.",
    },
    {
      q: "Does it work with our systems?",
      a: "Yes. Stripe, Chargebee, HubSpot, Mixpanel/Amplitude exports and warehouse CSVs.",
    },
    {
      q: "What does it cost?",
      a: "A one-off build fee then a monthly retainer, anchored so a single saved account covers months of fees. Exact pricing on the call, based on book size.",
    },
  ],
  related: ["executive-search-recruitment", "ma-advisory-business-brokers"],
};
