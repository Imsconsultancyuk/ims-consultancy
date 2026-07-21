import type { Industry } from "../types";

export const commercialProperty: Industry = {
  slug: "commercial-property",
  name: "Commercial Property",
  shortName: "Property Firm",
  regulator: "ICO",
  regulatorLine:
    "Registered with the ICO and built to UK GDPR — your data is processed under a DPA, tokenised, and never used for model training.",
  accent: "teal",
  leakLine: "44 lease events in one portfolio",
  meta: {
    title: "AI Revenue Tools for Commercial Property | IntelMadeSimple",
    description:
      "Lease-event radar, off-market spotting and instant vendor reports — AI tools that surface instructions before competitors know they exist. GDPR-safe.",
  },
  hero: {
    h1: "Every lease event is an instruction — if you see it first",
    sub: "Three tools that read portfolios and public signals to surface rent reviews, breaks, off-market opportunities and pitch-winning reports.",
    stats: [
      { value: "44", label: "fee events found in one 150-lease portfolio" },
      { value: "12 mo", label: "notice a lease gives you before every review or break" },
      { value: "90 sec", label: "to a full vendor report" },
    ],
  },
  pains: [
    {
      title: "Missed lease events",
      cost: "£96k",
      line: "Reviews and breaks pass unactioned across managed portfolios.",
    },
    {
      title: "On-market only",
      cost: "23 deals",
      line: "By the time it's listed, it's an auction — the margin was off-market.",
    },
    {
      title: "Slow pitches",
      cost: "3 days",
      line: "Instruction pitches lose to whoever shows up with the numbers first.",
    },
  ],
  tools: [
    {
      id: "lease-event-radar",
      name: "Lease Event Radar",
      problem: "Rent reviews and break clauses are diarised in five places and watched in none.",
      outcome: "Every lease event surfaced 12 months out with fee value, client briefs drafted.",
      demo: {
        sampleFile: { id: "cp-portfolio", label: "portfolio_leases.csv", type: "csv", meta: "150 leases" },
        stages: [
          { key: "ingest", label: "Parsing lease schedule", detail: "150 leases tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting events", detail: "Reviews, breaks, expiries next 12 months", durationMs: 1800 },
          { key: "score", label: "Scoring fee value", detail: "Per event, per instruction type", durationMs: 1600 },
          { key: "draft", label: "Drafting client briefs", detail: "Action memo per event", durationMs: 1400 },
        ],
        result: {
          headline: "44 lease events in the next 12 months",
          metrics: [
            { label: "Fee-event value", value: "£96,400", emphasis: true },
            { label: "Client briefs drafted", value: "44" },
            { label: "Break clauses needing action ≤6 mo", value: "13" },
          ],
          solution: "The radar turns lease admin into a scheduled instruction pipeline.",
        },
      },
    },
    {
      id: "off-market-spotter",
      name: "Off-Market Spotter",
      problem: "Planning applications and distress signals show tomorrow's deals — nobody reads them daily.",
      outcome: "Public signals scanned across target areas, off-market opportunities scored, approaches drafted.",
      demo: {
        sampleFile: { id: "cp-signals", label: "area_signals_sample.csv", type: "csv", meta: "3 postcodes · 90 days of signals" },
        stages: [
          { key: "ingest", label: "Parsing signal feed", detail: "Planning, charges, EPC and listing signals", durationMs: 1400 },
          { key: "detect", label: "Detecting opportunities", detail: "Pre-market disposal and reposition signals", durationMs: 1800 },
          { key: "score", label: "Scoring deal quality", detail: "Yield, tenure, motivation signals", durationMs: 1600 },
          { key: "draft", label: "Drafting approaches", detail: "Owner letters per opportunity", durationMs: 1400 },
        ],
        result: {
          headline: "23 pre-market opportunities in 3 postcodes",
          metrics: [
            { label: "Opportunities scored", value: "23", emphasis: true },
            { label: "Motivated-owner signals", value: "9" },
            { label: "Approach letters drafted", value: "23" },
          ],
          solution: "The spotter reads the public record daily so your acquisitions desk moves before the listing exists.",
        },
      },
    },
    {
      id: "instant-vendor-report",
      name: "Instant Vendor Report",
      problem: "Pitch-winning reports take days of comparables work — pitches happen this week.",
      outcome: "Address in, branded vendor report with comparables and strategy out in 90 seconds.",
      demo: {
        sampleFile: { id: "cp-brief", label: "instruction_brief_sample.pdf", type: "pdf", meta: "1 property · pitch brief" },
        stages: [
          { key: "ingest", label: "Parsing brief", detail: "Property, tenure and objective extracted", durationMs: 1400 },
          { key: "detect", label: "Detecting comparables", detail: "Recent transactions and demand signals", durationMs: 1800 },
          { key: "score", label: "Scoring pricing strategy", detail: "Range with evidence", durationMs: 1600 },
          { key: "draft", label: "Drafting vendor report", detail: "Branded, pitch-ready", durationMs: 1400 },
        ],
        result: {
          headline: "Pitch-ready vendor report in 90 seconds",
          metrics: [
            { label: "Time to report", value: "90 sec", emphasis: true },
            { label: "Comparables evidenced", value: "11" },
            { label: "Pricing scenarios", value: "3" },
          ],
          solution: "Walk into every pitch as the firm that already did the work.",
        },
      },
    },
  ],
  results: {
    heading: "What one managed portfolio gave back",
    before: "Lease diaries in spreadsheets; pitches built overnight",
    after: "£96,400 of fee events plus 23 off-market leads in one run",
    metrics: [
      { label: "Fee opportunity surfaced", value: "£96,400+", emphasis: true },
      { label: "Actions drafted", value: "67" },
      { label: "Surveyor hours saved / month", value: "38" },
    ],
  },
  package: {
    heading: "The Property Firm package",
    includes: [
      "All three tools configured for your firm",
      "PII tokenisation layer as standard",
      "CRM/book onboarding and data mapping",
      "Monthly findings report with £ figures",
      "UK-based support, DPA included",
    ],
    timeline: "Live within 14 days of data access",
    anchor: "Build from £6,500 · from £3,000/month · one instruction covers a quarter",
  },
  faqs: [
    {
      q: "Is this GDPR compliant?",
      a: "The architecture is built for UK GDPR: identifiable fields are tokenised before any AI processing and the encrypted mapping never leaves your control. We provide a DPA with every engagement and a DPIA on request.",
    },
    {
      q: "What data do you need?",
      a: "A lease schedule export for the radar; target postcodes for the spotter. Public data we bring ourselves.",
    },
    {
      q: "How long does setup take?",
      a: "Most firms are live within 14 days of granting data access. The demo you just ran mirrors the real pipeline — configuration, not construction.",
    },
    {
      q: "Does it work with our systems?",
      a: "Yes — Reapit, Alto, MRI Qube and schedule spreadsheets.",
    },
    {
      q: "What does it cost?",
      a: "A one-off build fee then a monthly retainer — anchored so a single recovered instruction covers months of fees. Exact pricing on the call, based on book size.",
    },
  ],
  related: ["commercial-insurance-brokers", "ma-advisory-business-brokers"],
};
