import type { Industry } from "../types";

export const accountancyFirms: Industry = {
  slug: "accountancy-firms",
  name: "Accountancy Firms",
  shortName: "Practice",
  regulator: "ICO",
  regulatorLine:
    "Registered with the ICO and built to UK GDPR — your data is processed under a DPA, tokenised, and never used for model training.",
  accent: "orange",
  leakLine: "78 advisory opportunities in one client base",
  meta: {
    title: "AI Advisory Tools for Accountancy Firms | IntelMadeSimple",
    description:
      "Advisory opportunity scanning, fee-leak detection and onboarding automation — AI tools that turn a compliance client base into an advisory pipeline. GDPR-safe.",
  },
  hero: {
    h1: "Your compliance base is an advisory goldmine nobody's mining",
    sub: "Three tools that read your client list, spot every R&D, allowance and planning opportunity, and stop fees leaking through scope creep.",
    stats: [
      { value: "78", label: "advisory flags found in one 350-client base" },
      { value: "£1,820", label: "average advisory engagement per flag" },
      { value: "11 → 3 days", label: "onboarding time with automated chasing" },
    ],
  },
  pains: [
    {
      title: "Advisory blindness",
      cost: "£142k",
      line: "R&D, allowances and exit-planning triggers sit unnoticed in the accounts you already file.",
    },
    {
      title: "Scope creep",
      cost: "£38k",
      line: "Out-of-scope work gets done, logged and never billed.",
    },
    {
      title: "Onboarding drag",
      cost: "11 days",
      line: "New clients wait on documents while WIP can't start.",
    },
  ],
  tools: [
    {
      id: "advisory-opportunity-scanner",
      name: "Advisory Opportunity Scanner",
      problem: "Advisory triggers hide in data your firm already holds — nobody reads the base as one dataset.",
      outcome: "Every client scanned for advisory triggers, opportunities sized, partner conversation packs drafted.",
      demo: {
        sampleFile: { id: "acc-clients", label: "client_base_sample.csv", type: "csv", meta: "350 clients" },
        stages: [
          { key: "ingest", label: "Parsing client base", detail: "350 clients tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting triggers", detail: "R&D, capital allowances, EMI, exit signals", durationMs: 1800 },
          { key: "score", label: "Scoring engagement value", detail: "Fee per opportunity type", durationMs: 1600 },
          { key: "draft", label: "Drafting conversation packs", detail: "Per client, partner-ready", durationMs: 1400 },
        ],
        result: {
          headline: "78 advisory opportunities across the base",
          metrics: [
            { label: "Advisory pipeline", value: "£142,000", emphasis: true },
            { label: "R&D candidates", value: "12" },
            { label: "Conversation packs drafted", value: "78" },
          ],
          solution: "The scanner re-runs each quarter — advisory stops depending on which partner remembered what.",
        },
      },
    },
    {
      id: "fee-leak-detector",
      name: "Fee Leak Detector",
      problem: "Scope creep is invisible until year-end margin review — then it's history.",
      outcome: "Out-of-scope work surfaced monthly against engagement letters, fee conversations drafted.",
      demo: {
        sampleFile: { id: "acc-engagements", label: "engagements_sample.csv", type: "csv", meta: "350 engagements · time data" },
        stages: [
          { key: "ingest", label: "Parsing engagements", detail: "Letters and time entries tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting scope creep", detail: "Work outside engaged scope", durationMs: 1800 },
          { key: "score", label: "Scoring recoverable fees", detail: "Per client, per service line", durationMs: 1600 },
          { key: "draft", label: "Drafting fee conversations", detail: "Reasonable, evidence-backed", durationMs: 1400 },
        ],
        result: {
          headline: "£38,200 of out-of-scope work unbilled",
          metrics: [
            { label: "Recoverable fees", value: "£38,200", emphasis: true },
            { label: "Clients affected", value: "41" },
            { label: "Conversations drafted", value: "41" },
          ],
          solution: "The detector catches creep in the month it happens, while the value is fresh in the client's mind.",
        },
      },
    },
    {
      id: "onboarding-chaser",
      name: "Onboarding Chaser",
      problem: "Onboarding stalls on unanswered document requests nobody has time to chase.",
      outcome: "Every stalled onboarding chased automatically with polite persistence, status board live.",
      demo: {
        sampleFile: { id: "acc-onboarding", label: "onboarding_status.csv", type: "csv", meta: "38 in-progress clients" },
        stages: [
          { key: "ingest", label: "Parsing onboarding pipeline", detail: "38 clients tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting stalls", detail: "Missing items and idle days", durationMs: 1800 },
          { key: "score", label: "Scoring priority", detail: "Fee value × idle time", durationMs: 1600 },
          { key: "draft", label: "Drafting chase sequences", detail: "Per item, per client", durationMs: 1400 },
        ],
        result: {
          headline: "23 stalled onboardings unblocked",
          metrics: [
            { label: "Onboarding time", value: "11 → 3 days", emphasis: true },
            { label: "Chase sequences drafted", value: "23" },
            { label: "Documents auto-requested", value: "61" },
          ],
          solution: "The chaser never forgets, never nags twice the same way, and starts your WIP a week earlier.",
        },
      },
    },
  ],
  results: {
    heading: "What a 350-client base gave back",
    before: "Advisory when a partner spots it; billing what's remembered",
    after: "£180,200 of advisory and fee recovery surfaced in one run",
    metrics: [
      { label: "Opportunity surfaced", value: "£180,200", emphasis: true },
      { label: "Client actions drafted", value: "142" },
      { label: "Partner hours saved / month", value: "30" },
    ],
  },
  package: {
    heading: "The Practice package",
    includes: [
      "All three tools configured for your firm",
      "PII tokenisation layer as standard",
      "CRM/book onboarding and data mapping",
      "Monthly findings report with £ figures",
      "UK-based support, DPA included",
    ],
    timeline: "Live within 14 days of data access",
    anchor: "Build from £6,000 · from £2,750/month · two advisory engagements cover the year",
  },
  faqs: [
    {
      q: "Is this GDPR compliant?",
      a: "The architecture is built for UK GDPR: identifiable fields are tokenised before any AI processing and the encrypted mapping never leaves your control. We provide a DPA with every engagement and a DPIA on request.",
    },
    {
      q: "What data do you need?",
      a: "A client list export with services and basic financial flags, plus engagement letters for the leak detector.",
    },
    {
      q: "How long does setup take?",
      a: "Most firms are live within 14 days of granting data access. The demo you just ran mirrors the real pipeline — configuration, not construction.",
    },
    {
      q: "Does it work with our systems?",
      a: "Yes — Xero HQ, IRIS, Karbon, Senta and practice-management exports.",
    },
    {
      q: "What does it cost?",
      a: "A one-off build fee then a monthly retainer — anchored so a single recovered advisory engagement covers months of fees. Exact pricing on the call, based on book size.",
    },
  ],
  related: ["law-firms", "ifas-wealth-managers"],
};
