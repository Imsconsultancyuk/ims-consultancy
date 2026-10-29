// Each insight links outward to one service page, one industry page and one guide,
// so a reader of a sourced summary can reach the matching commercial page and the
// longer UK guide. Hrefs are checked against real routes by the SEO audit script.

export interface InsightSpokes {
  service: { href: string; label: string };
  industry: { href: string; label: string };
  guide: { href: string; label: string };
}

const AUDIT = { href: "/services/ai-readiness-audit", label: "AI Readiness Audit" };
const TRAINING = { href: "/services/team-enablement", label: "AI training and policy for teams" };
const AUTOMATION = { href: "/services/ai-automation", label: "AI workflow automation" };
const DESK = { href: "/services/enquiry-desk", label: "Enquiry Desk" };
const ADVISORY = { href: "/services/strategic-advisory", label: "Strategic advisory" };

const LAW = { href: "/industries/law-firms", label: "Revenue recovery for UK law firms" };
const ACCOUNTANCY = { href: "/industries/accountancy-firms", label: "Revenue recovery for accountancy firms" };
const IFA = { href: "/industries/ifas-wealth-managers", label: "Revenue recovery for IFAs and wealth managers" };
const MORTGAGE = { href: "/industries/mortgage-brokers", label: "Revenue recovery for mortgage brokers" };
const PROPERTY = { href: "/industries/commercial-property", label: "Revenue recovery for commercial property" };
const SAAS = { href: "/industries/b2b-saas", label: "Revenue recovery for B2B SaaS" };
const INSURANCE = {
  href: "/industries/commercial-insurance-brokers",
  label: "Revenue recovery for commercial insurance brokers",
};

const G_WIP = { href: "/guides/unbilled-wip-uk-law-firms", label: "Unbilled WIP in UK law firms" };
const G_LOCKUP = { href: "/guides/lock-up-days-explained", label: "Lock-up days explained" };
const G_LATE = { href: "/guides/chasing-late-invoices-uk-late-payment-law", label: "UK late payment law" };
const G_AIBILL = { href: "/guides/ai-billing-review-professional-firms", label: "AI billing review: the evidence" };
const G_GDPR = { href: "/guides/uk-gdpr-ai-client-data", label: "UK GDPR and AI client data" };

export const INSIGHT_SPOKES: Record<string, InsightSpokes> = {
  "uk-sme-ai-adoption-bcc-atos-2026": { service: AUDIT, industry: ACCOUNTANCY, guide: G_AIBILL },
  "dsit-ai-adoption-research-2026": { service: AUDIT, industry: PROPERTY, guide: G_AIBILL },
  "simply-business-sme-insights-2026": { service: DESK, industry: INSURANCE, guide: G_LATE },
  "ionos-yougov-ai-budgets-2026": { service: AUDIT, industry: SAAS, guide: G_AIBILL },
  "ai-productivity-customer-support-nber": { service: AUTOMATION, industry: LAW, guide: G_AIBILL },
  "jagged-frontier-hbs-bcg": { service: AUTOMATION, industry: LAW, guide: G_AIBILL },
  "microsoft-work-trend-index-2025": { service: TRAINING, industry: ACCOUNTANCY, guide: G_GDPR },
  "google-cloud-roi-of-ai-2025": { service: AUDIT, industry: SAAS, guide: G_AIBILL },
  "anthropic-economic-index-augmentation": { service: TRAINING, industry: ACCOUNTANCY, guide: G_AIBILL },
  "anthropic-economic-index-delegation": { service: AUTOMATION, industry: SAAS, guide: G_AIBILL },
  "ai-opportunities-action-plan-2025": { service: ADVISORY, industry: PROPERTY, guide: G_AIBILL },
  "ico-ai-and-data-protection-guidance": { service: TRAINING, industry: IFA, guide: G_GDPR },
  "ico-automated-decision-making-consultation-2026": { service: TRAINING, industry: MORTGAGE, guide: G_GDPR },
  "sra-ai-risk-accountability": { service: TRAINING, industry: LAW, guide: G_GDPR },
  "law-society-scotland-genai-guide": { service: TRAINING, industry: LAW, guide: G_WIP },
  "bank-of-england-fca-ai-survey-2024": { service: AUDIT, industry: IFA, guide: G_GDPR },
  "ibm-cost-of-a-data-breach-2026": { service: TRAINING, industry: IFA, guide: G_GDPR },
  "fsb-confidence-code-2026": { service: DESK, industry: ACCOUNTANCY, guide: G_LOCKUP },
  "stanford-ai-index-2026-summary": { service: ADVISORY, industry: SAAS, guide: G_AIBILL },
  "uk-cyber-breaches-survey-2026-small-firms": { service: TRAINING, industry: INSURANCE, guide: G_GDPR },
};
