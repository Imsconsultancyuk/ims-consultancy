import type { Industry } from "../types";

export const privateHealthcareGroups: Industry = {
  slug: "private-healthcare-groups",
  name: "Private Healthcare Groups",
  shortName: "Group",
  regulator: "CQC",
  regulatorLine:
    "Built for CQC-registered providers — patient identifiers are tokenised end to end; clinical decisions stay with your clinicians.",
  accent: "fuchsia",
  leakLine: "£96k of quoted treatment still open",
  meta: {
    title: "AI Revenue Recovery for Private Healthcare | IntelMadeSimple",
    description:
      "Treatment-plan recovery, capacity-fill radar and review-to-revenue content — AI tools that convert quoted care and fill empty diary time. GDPR-safe, CQC-aware.",
  },
  hero: {
    h1: "The revenue you quoted last quarter is still sitting in your diary system",
    sub: "Three tools that follow up every unconverted treatment plan, fill tomorrow's empty chair time, and turn patient questions into booked consultations.",
    stats: [
      { value: "38%", label: "of quoted private treatment plans never book" },
      { value: "£3,400", label: "average value of an unconverted plan" },
      { value: "19", label: "empty diary slots found in one week's export" },
    ],
  },
  pains: [
    {
      title: "Quotes that vanish",
      cost: "£96k",
      line: "Patients say 'I'll think about it' and never hear from you again.",
    },
    {
      title: "Empty chair time",
      cost: "19 slots",
      line: "Tomorrow's gaps are found tomorrow — too late to fill.",
    },
    {
      title: "Unanswered questions",
      cost: "14 topics",
      line: "Patients ask the internet about your treatments; competitors answer.",
    },
  ],
  tools: [
    {
      id: "treatment-plan-recovery",
      name: "Treatment Plan Recovery",
      problem: "Unconverted plans get one follow-up call, if the front desk finds time.",
      outcome: "Every open quote followed up with a patient-appropriate sequence, pipeline visible to the group.",
      demo: {
        sampleFile: { id: "hc-quotes", label: "treatment_quotes_sample.csv", type: "csv", meta: "140 unconverted plans · one quarter" },
        stages: [
          { key: "ingest", label: "Parsing quote list", detail: "140 plans, patient identifiers tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting recoverable plans", detail: "Open, undecided, finance-stalled", durationMs: 1800 },
          { key: "score", label: "Scoring recovery likelihood", detail: "Value × recency × treatment type", durationMs: 1600 },
          { key: "draft", label: "Drafting follow-up sequences", detail: "Tone-matched per treatment", durationMs: 1400 },
        ],
        result: {
          headline: "£96,000 of quoted treatment still open",
          metrics: [
            { label: "Recoverable pipeline", value: "£96,000", emphasis: true },
            { label: "Sequences drafted", value: "112" },
            { label: "Finance-option candidates", value: "37" },
          ],
          solution: "Recovery runs weekly across every site — no plan goes quiet without three considered follow-ups.",
        },
      },
    },
    {
      id: "capacity-fill-radar",
      name: "Capacity Fill Radar",
      problem: "Cancellations create gaps the diary team discovers on the day.",
      outcome: "Tomorrow's gaps detected tonight, matched patients invited automatically.",
      demo: {
        sampleFile: { id: "hc-diary", label: "diary_export_sample.csv", type: "csv", meta: "7 days · 4 practitioners" },
        stages: [
          { key: "ingest", label: "Parsing diary export", detail: "Appointments tokenised", durationMs: 1400 },
          { key: "detect", label: "Detecting gaps", detail: "Next-7-day unfilled slots", durationMs: 1800 },
          { key: "score", label: "Scoring patient matches", detail: "Waitlist, overdue recalls, open plans", durationMs: 1600 },
          { key: "draft", label: "Drafting invitations", detail: "Short-notice offers per slot", durationMs: 1400 },
        ],
        result: {
          headline: "19 fillable slots in the next 7 days",
          metrics: [
            { label: "Slot value", value: "£8,550", emphasis: true },
            { label: "Matched patients invited", value: "57" },
            { label: "Overdue recalls included", value: "24" },
          ],
          solution: "The radar treats every gap as revenue with a deadline — and moves before the day arrives.",
        },
      },
    },
    {
      id: "review-to-revenue",
      name: "Review-to-Revenue Engine",
      problem: "Your reviews contain every question patients ask before booking — unused.",
      outcome: "Reviews mined for real patient questions, answer content drafted for your site and AI search.",
      demo: {
        sampleFile: { id: "hc-reviews", label: "reviews_export_sample.csv", type: "csv", meta: "420 reviews · you + 3 competitors" },
        stages: [
          { key: "ingest", label: "Parsing reviews", detail: "420 reviews, names removed", durationMs: 1400 },
          { key: "detect", label: "Detecting question themes", detail: "Cost, pain, recovery, results, finance", durationMs: 1800 },
          { key: "score", label: "Scoring content gaps", detail: "What competitors answer that you don't", durationMs: 1600 },
          { key: "draft", label: "Drafting answer content", detail: "Site + AI-search-ready pages", durationMs: 1400 },
        ],
        result: {
          headline: "14 patient questions you don't answer publicly",
          metrics: [
            { label: "Content pieces drafted", value: "14", emphasis: true },
            { label: "Competitor-answered gaps", value: "9" },
            { label: "Booking-intent topics", value: "6" },
          ],
          solution: "The engine makes your clinic the answer patients find — before they've chosen a clinic.",
        },
      },
    },
  ],
  results: {
    heading: "What one group's quarter gave back",
    before: "Follow-up when the desk is quiet; gaps found on the day",
    after: "£104,550 of recoverable treatment and diary value surfaced in one run",
    metrics: [
      { label: "Revenue surfaced", value: "£104,550", emphasis: true },
      { label: "Patient actions drafted", value: "183" },
      { label: "Front-desk hours saved / month", value: "36" },
    ],
  },
  package: {
    heading: "The Group package",
    includes: [
      "All three tools configured for your firm",
      "PII tokenisation layer as standard",
      "CRM/book onboarding and data mapping",
      "Monthly findings report with £ figures",
      "UK-based support, DPA included",
    ],
    timeline: "Live within 14 days of data access",
    anchor: "Build from £6,000 · from £2,750/month · three recovered plans cover the retainer",
  },
  faqs: [
    {
      q: "Is this GDPR compliant?",
      a: "The architecture is built for UK GDPR: identifiable fields are tokenised before any AI processing and the encrypted mapping never leaves your control. We provide a DPA with every engagement and a DPIA on request.",
    },
    {
      q: "What data do you need?",
      a: "Exports of open treatment plans and diary data — patient identifiers are tokenised on ingestion, before any AI processing.",
    },
    {
      q: "How long does setup take?",
      a: "Most firms are live within 14 days of granting data access. The demo you just ran mirrors the real pipeline — configuration, not construction.",
    },
    {
      q: "Does it work with our systems?",
      a: "Yes — Dentally, SOE Exact, Pabau, Semble and PMS CSV exports.",
    },
    {
      q: "What does it cost?",
      a: "A one-off build fee then a monthly retainer — anchored so a single recovered plan covers months of fees. Exact pricing on the call, based on book size.",
    },
  ],
  related: ["ifas-wealth-managers", "b2b-saas"],
};
