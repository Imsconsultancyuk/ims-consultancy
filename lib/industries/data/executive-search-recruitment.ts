import type { Industry } from "../types";

export const executiveSearchRecruitment: Industry = {
  slug: "executive-search-recruitment",
  name: "Executive Search & Recruitment",
  shortName: "Search Firm",
  regulator: "ICO",
  regulatorLine:
    "Registered with the ICO and built to UK GDPR. Your data is processed under a DPA, tokenised, and never used for model training.",
  accent: "violet",
  leakLine: "84 placements hiding in one database",
  meta: {
    title: "AI Revenue Recovery for Executive Search | IntelMadeSimple",
    description:
      "Candidate database revival, hiring-signal radar and shortlist acceleration. AI tools that turn your existing database into placements. GDPR-safe.",
  },
  hero: {
    h1: "Your next placement is already in your database",
    sub: "Three tools that re-read your candidate pool against live mandates, watch target accounts for hiring signals, and cut shortlist time to minutes.",
    stats: [
      { value: "£18k", label: "average fee per specialist placement" },
      { value: "8%", label: "of a typical candidate database is active-searchable at any time" },
      { value: "4 min", label: "from job spec to ranked shortlist" },
    ],
  },
  pains: [
    {
      title: "Database rot",
      cost: "£54k+",
      line: "Ten thousand CVs, none of them re-read when a new mandate lands.",
    },
    {
      title: "Cold BD",
      cost: "27 firms",
      line: "Hiring signals fire daily at your target accounts; nobody's watching.",
    },
    {
      title: "Slow shortlists",
      cost: "3 days",
      line: "The first shortlist in wins; yours takes days of manual trawling.",
    },
  ],
  tools: [
    {
      id: "cv-revival-engine",
      name: "CV Revival Engine",
      problem: "New mandates get new sourcing; the database you already paid for stays unread.",
      outcome: "Whole database re-matched against live roles, best-fit candidates ranked, re-engagement drafted.",
      actions: [
        "Screen the ranked matches before your consultants start fresh sourcing.",
        "Send the drafted re-engagement from the consultant who placed them last time.",
        "Refresh each record as candidates reply so the database stays worth mining.",
      ],
      demo: {
        sampleFile: { id: "rec-database", label: "candidate_db_sample.csv", type: "csv", meta: "1,500 candidate records" },
        stages: [
          { key: "ingest", label: "Parsing candidate pool", detail: "1,500 profiles tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting live-role matches", detail: "Skills, sector, seniority vs open mandates", durationMs: 1800 },
          { key: "score", label: "Scoring placement fit", detail: "Fit × recency × availability signals", durationMs: 1600 },
          { key: "draft", label: "Drafting re-engagement", detail: "Personalised per candidate-role pair", durationMs: 1400 },
        ],
        result: {
          headline: "84 strong matches for live mandates",
          metrics: [
            { label: "Fee value if 3 place", value: "£54,000", emphasis: true },
            { label: "Re-engagement drafted", value: "84" },
            { label: "Interview-ready this month", value: "22" },
          ],
          solution: "The engine re-reads your database every time a mandate opens, so sourcing starts warm.",
        },
      },
    },
    {
      id: "hiring-signal-radar",
      name: "Hiring Signal Radar",
      problem: "Funding rounds, leadership exits and growth signals fire while your BD list sleeps.",
      outcome: "Target accounts monitored for hiring signals, warm briefs drafted the morning they fire.",
      actions: [
        "Read the morning brief before your BD calls, not after them.",
        "Approach on the signal itself rather than a generic introduction.",
        "Log the outcome so the radar learns which signals convert on your desk.",
      ],
      demo: {
        sampleFile: { id: "rec-targets", label: "target_accounts.csv", type: "csv", meta: "150 target companies" },
        stages: [
          { key: "ingest", label: "Parsing target list", detail: "150 accounts mapped", durationMs: 1400 },
          { key: "detect", label: "Detecting hiring signals", detail: "Funding, exits, job-ad velocity, expansion", durationMs: 1800 },
          { key: "score", label: "Scoring approach timing", detail: "Signal strength × relationship history", durationMs: 1600 },
          { key: "draft", label: "Drafting BD briefs", detail: "One-page brief per live signal", durationMs: 1400 },
        ],
        result: {
          headline: "27 accounts showing live hiring signals",
          metrics: [
            { label: "Warm BD briefs drafted", value: "27", emphasis: true },
            { label: "Funding-round triggers", value: "9" },
            { label: "Leadership-change triggers", value: "11" },
          ],
          solution: "The radar makes every BD call a response to something that happened this week.",
        },
      },
    },
    {
      id: "shortlist-accelerator",
      name: "Shortlist Accelerator",
      problem: "Manual longlist-to-shortlist takes days the client spends talking to your competitor.",
      outcome: "Job spec in, ranked shortlist with rationale and interview packs out, in minutes.",
      actions: [
        "Sense-check the ranking and the rationale before anything reaches the client.",
        "Get the shortlist over inside the client's first 48 hours.",
        "Use the interview packs to brief consultants who did not run the search.",
      ],
      demo: {
        sampleFile: { id: "rec-jobspec", label: "job_spec_sample.pdf", type: "pdf", meta: "1 role · Head of Engineering" },
        stages: [
          { key: "ingest", label: "Parsing job spec", detail: "Requirements and success profile extracted", durationMs: 1400 },
          { key: "detect", label: "Detecting candidates", detail: "Database + revival pool searched", durationMs: 1800 },
          { key: "score", label: "Scoring & ranking", detail: "Weighted fit with evidence lines", durationMs: 1600 },
          { key: "draft", label: "Drafting shortlist pack", detail: "12 profiles, rationale, interview questions", durationMs: 1400 },
        ],
        result: {
          headline: "Ranked shortlist of 12 in 4 minutes",
          metrics: [
            { label: "Time to shortlist", value: "4 min", emphasis: true },
            { label: "Evidence-backed profiles", value: "12" },
            { label: "Interview packs drafted", value: "12" },
          ],
          solution: "The accelerator makes yours the first credible shortlist on the client's desk, every time.",
        },
      },
    },
  ],
  results: {
    heading: "What one specialist desk's data gave back",
    before: "Every mandate sourced from scratch; BD from a cold list",
    after: "84 warm candidates, 27 live BD triggers, shortlists in minutes",
    metrics: [
      { label: "Placement-fee pipeline", value: "£54,000+", emphasis: true },
      { label: "Warm actions drafted", value: "111" },
      { label: "Consultant hours saved / month", value: "36" },
    ],
  },
  package: {
    heading: "The Search Firm package",
    includes: [
      "All three tools configured for your firm",
      "PII tokenisation layer as standard",
      "CRM/book onboarding and data mapping",
      "Monthly findings report with £ figures",
      "UK-based support, DPA included",
    ],
    timeline: "Live within 14 days of data access",
    anchor: "Build from £5,500 · from £2,500/month · one placement covers the year",
  },
  faqs: [
    {
      q: "Is this GDPR compliant?",
      a: "The architecture is built for UK GDPR: identifiable fields are tokenised before any AI processing and the encrypted mapping never leaves your control. We provide a DPA with every engagement and a DPIA on request.",
    },
    {
      q: "What data do you need?",
      a: "A candidate export (CSV) and your live mandate list. LinkedIn Recruiter exports work too.",
    },
    {
      q: "How long does setup take?",
      a: "Most firms are live within 14 days of granting data access. The demo you just ran mirrors the real pipeline. What follows is configuration, not construction.",
    },
    {
      q: "Does it work with our systems?",
      a: "Yes. Bullhorn, Vincere, JobAdder, Loxo and ATS CSV exports.",
    },
    {
      q: "What does it cost?",
      a: "A one-off build fee then a monthly retainer, anchored so a single recovered placement covers months of fees. Exact pricing on the call, based on book size.",
    },
  ],
  related: ["b2b-saas", "ma-advisory-business-brokers"],
};
