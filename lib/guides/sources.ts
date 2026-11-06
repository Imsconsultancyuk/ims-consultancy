// Source registry for every guide. Each URL returned 200 on the date in the guide's
// `checked` field and the page was read before a claim was drawn from it.

import type { GuideSource } from "./guides";

export const SRC = {
  ilfm: {
    label: "Lock-up management in law firms: Why it matters",
    publisher: "Institute of Legal Finance and Management",
    url: "https://www.ilfm.org.uk/site/blog/ilfm-blog/lockup-management-in-law-firms-why-it-matters",
  },
  solAct69: {
    label: "Solicitors Act 1974, section 69: Action to recover solicitor's costs",
    publisher: "legislation.gov.uk",
    url: "https://www.legislation.gov.uk/ukpga/1974/47/section/69",
  },
  limAct5: {
    label: "Limitation Act 1980, section 5: Time limit for actions founded on simple contract",
    publisher: "legislation.gov.uk",
    url: "https://www.legislation.gov.uk/ukpga/1980/58/section/5",
  },
  sraAcc: {
    label: "SRA Accounts Rules",
    publisher: "Solicitors Regulation Authority",
    url: "https://www.sra.org.uk/solicitors/standards-regulations/accounts-rules/",
  },
  govLate: {
    label: "Late commercial payments: when a payment becomes late",
    publisher: "GOV.UK",
    url: "https://www.gov.uk/late-commercial-payments-interest-debt-recovery",
  },
  govInterest: {
    label: "Late commercial payments: interest on late commercial payments",
    publisher: "GOV.UK",
    url: "https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt",
  },
  govCosts: {
    label: "Late commercial payments: claim debt recovery costs on late payments",
    publisher: "GOV.UK",
    url: "https://www.gov.uk/late-commercial-payments-interest-debt-recovery/claim-debt-recovery-costs",
  },
  lpcda4: {
    label: "Late Payment of Commercial Debts (Interest) Act 1998, section 4",
    publisher: "legislation.gov.uk",
    url: "https://www.legislation.gov.uk/ukpga/1998/20/section/4",
  },
  lpcda5a: {
    label: "Late Payment of Commercial Debts (Interest) Act 1998, section 5A",
    publisher: "legislation.gov.uk",
    url: "https://www.legislation.gov.uk/ukpga/1998/20/section/5A",
  },
  pdpac: {
    label: "Practice Direction: Pre-Action Conduct and Protocols",
    publisher: "Ministry of Justice, Civil Procedure Rules",
    url: "https://www.justice.gov.uk/courts/procedure-rules/civil/rules/pd_pre-action_conduct",
  },
  govCourt: {
    label: "Make a court claim for money",
    publisher: "GOV.UK",
    url: "https://www.gov.uk/make-court-claim-for-money",
  },
  vat700: {
    label: "VAT guide (VAT Notice 700)",
    publisher: "HM Revenue & Customs, GOV.UK",
    url: "https://www.gov.uk/guidance/vat-guide-notice-700",
  },
  nber: {
    label: "Generative AI at Work (working paper 31161)",
    publisher: "National Bureau of Economic Research",
    url: "https://www.nber.org/papers/w31161",
  },
  hbs: {
    label: "Humans vs. Machines: Untangling the Tasks AI Can (and Can't) Handle",
    publisher: "Harvard Business School, Working Knowledge",
    url: "https://www.library.hbs.edu/working-knowledge/humans-vs-machines-untangling-the-tasks-ai-can-and-cant-handle",
  },
  sraAi: {
    label: "Risk Outlook report: The use of artificial intelligence in the legal market",
    publisher: "Solicitors Regulation Authority",
    url: "https://www.sra.org.uk/sra/research-publications/artificial-intelligence-legal-market/",
  },
  legalFutures: {
    label: "SRA: Lawyers “must not trust AI to judge its own accuracy”",
    publisher: "Legal Futures",
    url: "https://www.legalfutures.co.uk/latest-news/sra-lawyers-must-not-trust-ai-to-judge-its-own-accuracy",
  },
  icoAi: {
    label: "Guidance on AI and data protection",
    publisher: "Information Commissioner's Office",
    url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/",
  },
  icoDpiaWhen: {
    label: "When do we need to do a DPIA?",
    publisher: "Information Commissioner's Office",
    url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/when-do-we-need-to-do-a-dpia/",
  },
  icoCp: {
    label: "Controllers and processors",
    publisher: "Information Commissioner's Office",
    url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/controllers-and-processors/",
  },
  icoSmall: {
    label: "Advice for small and medium organisations",
    publisher: "Information Commissioner's Office",
    url: "https://ico.org.uk/for-organisations/advice-for-small-organisations/",
  },
  gdpr5: {
    label: "UK GDPR, Article 5: Principles relating to processing of personal data",
    publisher: "legislation.gov.uk",
    url: "https://www.legislation.gov.uk/eur/2016/679/article/5",
  },
  gdpr28: {
    label: "UK GDPR, Article 28: Processor",
    publisher: "legislation.gov.uk",
    url: "https://www.legislation.gov.uk/eur/2016/679/article/28",
  },
  gdpr32: {
    label: "UK GDPR, Article 32: Security of processing",
    publisher: "legislation.gov.uk",
    url: "https://www.legislation.gov.uk/eur/2016/679/article/32",
  },
  gdpr35: {
    label: "UK GDPR, Article 35: Data protection impact assessment",
    publisher: "legislation.gov.uk",
    url: "https://www.legislation.gov.uk/eur/2016/679/article/35",
  },
  gdpr33: {
    label: "UK GDPR, Article 33: Notification of a personal data breach",
    publisher: "legislation.gov.uk",
    url: "https://www.legislation.gov.uk/eur/2016/679/article/33",
  },
  icaewFees: {
    label: "Fees and charge-out rates",
    publisher: "ICAEW",
    url: "https://www.icaew.com/technical/practice-resources/run-and-grow/fees-and-charge-out-rates",
  },
  debtPap: {
    label: "Pre-Action Protocol for Debt Claims",
    publisher: "Ministry of Justice, Civil Procedure Rules",
    url: "https://www.justice.gov.uk/courts/procedure-rules/civil/pdf/protocols/debt-pap.pdf",
  },
  checkPay: {
    label: "Check when businesses pay their invoices",
    publisher: "GOV.UK",
    url: "https://www.gov.uk/check-when-businesses-pay-invoices",
  },
  icobs65: {
    label: "ICOBS 6.5: Renewals",
    publisher: "FCA Handbook",
    url: "https://www.handbook.fca.org.uk/handbook/ICOBS/6/5.html",
  },
  prin2a4: {
    label: "PRIN 2A.4: Price and value outcome",
    publisher: "FCA Handbook",
    url: "https://www.handbook.fca.org.uk/handbook/PRIN/2A/4.html",
  },
  fcaOngoing: {
    label: "Ongoing financial advice services",
    publisher: "Financial Conduct Authority",
    url: "https://www.fca.org.uk/publications/multi-firm-reviews/ongoing-financial-advice-services",
  },
} satisfies Record<string, GuideSource>;
