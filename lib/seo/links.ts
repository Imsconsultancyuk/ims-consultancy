// Hub-and-spoke link map: every industry and service page links to its tool,
// pricing, two related insights, one guide and the guides hub. Hrefs are checked
// against real routes by the SEO audit script, so a typo fails the audit.

import { insights } from "@/lib/insights/posts";
import { guides } from "@/lib/guides/guides";

export interface RelatedItem {
  kind: string;
  href: string;
  label: string;
}

const insightItem = (slug: string): RelatedItem => {
  const post = insights.find((p) => p.slug === slug);
  if (!post) throw new Error(`Unknown insight slug: ${slug}`);
  return { kind: "Research", href: `/insights/${slug}`, label: post.title };
};

const guideItem = (slug: string): RelatedItem => {
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) throw new Error(`Unknown guide slug: ${slug}`);
  return { kind: "Guide", href: `/guides/${slug}`, label: guide.title };
};

const common = (): RelatedItem[] => [
  { kind: "Prices", href: "/pricing", label: "Free Leak Scan, then £1,500 a stage" },
  { kind: "Guides", href: "/guides", label: "All nine UK guides on revenue leakage, WIP, lock-up and late payment" },
];

const WIP = "unbilled-wip-uk-law-firms";
const LOCKUP = "lock-up-days-explained";
const LATE = "chasing-late-invoices-uk-late-payment-law";
const AIBILL = "ai-billing-review-professional-firms";
const GDPR = "uk-gdpr-ai-client-data";
const PILLAR = "revenue-leakage-professional-firms";
const ACCT = "accountancy-debtor-days-and-wip";
const RENEWAL = "renewal-leakage-insurance-brokers-ifas";
const OPTIONS = "revenue-recovery-professional-firms-options";

const INDUSTRY: Record<string, { insights: [string, string]; guide: string }> = {
  "law-firms": { insights: ["sra-ai-risk-accountability", "law-society-scotland-genai-guide"], guide: WIP },
  "accountancy-firms": { insights: ["uk-sme-ai-adoption-bcc-atos-2026", "ai-productivity-customer-support-nber"], guide: ACCT },
  "mortgage-brokers": { insights: ["bank-of-england-fca-ai-survey-2024", "ico-ai-and-data-protection-guidance"], guide: GDPR },
  "ifas-wealth-managers": { insights: ["bank-of-england-fca-ai-survey-2024", "ico-automated-decision-making-consultation-2026"], guide: RENEWAL },
  "executive-search-recruitment": { insights: ["microsoft-work-trend-index-2025", "anthropic-economic-index-augmentation"], guide: AIBILL },
  "commercial-insurance-brokers": { insights: ["simply-business-sme-insights-2026", "fsb-confidence-code-2026"], guide: RENEWAL },
  "ma-advisory-business-brokers": { insights: ["jagged-frontier-hbs-bcg", "ibm-cost-of-a-data-breach-2026"], guide: GDPR },
  "commercial-property": { insights: ["dsit-ai-adoption-research-2026", "stanford-ai-index-2026-summary"], guide: LOCKUP },
  "b2b-saas": { insights: ["ionos-yougov-ai-budgets-2026", "google-cloud-roi-of-ai-2025"], guide: AIBILL },
  "private-healthcare-groups": { insights: ["uk-cyber-breaches-survey-2026-small-firms", "ico-ai-and-data-protection-guidance"], guide: GDPR },
};

const SERVICE: Record<string, { insights: [string, string]; guide?: string }> = {
  "ai-readiness-audit": { insights: ["uk-sme-ai-adoption-bcc-atos-2026", "dsit-ai-adoption-research-2026"], guide: AIBILL },
  "enquiry-desk": { insights: ["simply-business-sme-insights-2026", "ionos-yougov-ai-budgets-2026"], guide: LATE },
  "team-enablement": { insights: ["ico-ai-and-data-protection-guidance", "sra-ai-risk-accountability"], guide: GDPR },
  "ai-automation": { insights: ["ai-productivity-customer-support-nber", "jagged-frontier-hbs-bcg"], guide: AIBILL },
  seo: { insights: ["microsoft-work-trend-index-2025", "stanford-ai-index-2026-summary"], guide: PILLAR },
  "custom-software": { insights: ["ibm-cost-of-a-data-breach-2026", "uk-cyber-breaches-survey-2026-small-firms"], guide: PILLAR },
  "strategic-advisory": { insights: ["fsb-confidence-code-2026", "google-cloud-roi-of-ai-2025"], guide: OPTIONS },
};

export function relatedForIndustry(slug: string): RelatedItem[] {
  const m = INDUSTRY[slug];
  if (!m) return [];
  return [
    { kind: "Tool", href: `/tools#${slug}`, label: "Run this sector's tools on sample data" },
    ...m.insights.map(insightItem),
    guideItem(m.guide),
    ...common(),
  ];
}

export function relatedForService(slug: string): RelatedItem[] {
  const m = SERVICE[slug];
  if (!m) return [];
  return [
    { kind: "Tool", href: "/tools", label: "Try the sector tools on sample data" },
    ...m.insights.map(insightItem),
    ...(m.guide ? [guideItem(m.guide)] : []),
    ...common(),
  ];
}
