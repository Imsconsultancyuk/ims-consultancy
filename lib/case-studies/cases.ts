// Five documented revenue-leak cases, each from a public source checked on
// 2026-10-23. IMS has not worked with any of these organisations. Every entry
// is written in our own words, credits the publisher and links to the original.
// `control` and `atTenPeople` are IMS's own reading of the pattern, not claims
// about what happened or what the organisation did. `access` records how the
// source was checked:
//   "read"     the publisher's own page was opened and the figures read there
//   "reported" the figures come from a press write-up of the source

export type LeakType = "Unidentified" | "Unmatched" | "Undelivered" | "Undetected" | "Unrecorded";

export interface CaseSource {
  label: string;
  url: string;
}

export interface LeakCase {
  slug: string;
  leak: LeakType;
  /** Plain description of the leak in one line. */
  leakLine: string;
  title: string;
  organisation: string;
  sector: string;
  publisher: string;
  sourceTitle: string;
  sourceUrl: string;
  published: string;
  access: "read" | "reported";
  /** Three figures or facts, each short enough to sit in a stat cell. */
  points: { value: string; label: string }[];
  whatHappened: string;
  whereItLeaked: string;
  /** What a control of this kind looks like. Our reading, not a fact about them. */
  control: string;
  /** The same leak in a firm of about ten people. */
  atTenPeople: string;
  caveat: string;
  more?: CaseSource[];
}

export const LEAK_TYPES: { type: LeakType; question: string }[] = [
  { type: "Unidentified", question: "Was the charge ever raised?" },
  { type: "Unmatched", question: "Can each use be tied to a payment?" },
  { type: "Undelivered", question: "Can you show the paid-for service happened?" },
  { type: "Undetected", question: "Would you see a billing fault in year one?" },
  { type: "Unrecorded", question: "Is every hour of work on a bill?" },
];

export const cases: LeakCase[] = [
  {
    slug: "nhs-overseas-visitors-nao",
    leak: "Unidentified",
    leakLine: "The charge was due. Nobody raised it.",
    title: "The NHS bill that depended on who noticed",
    organisation: "NHS trusts in England",
    sector: "Public health",
    publisher: "National Audit Office",
    sourceTitle: "Recovering the cost of NHS treatment for overseas patients",
    sourceUrl: "https://www.nao.org.uk/reports/recovering-the-cost-of-nhs-treatment-for-overseas-patients/",
    published: "28 October 2016",
    access: "read",
    points: [
      { value: "£500m", label: "yearly recovery target, to be met by 2017-18" },
      { value: "~£150m", label: "potential shortfall the NAO estimated against that target" },
      { value: "~50%", label: "of directly charged amounts that trusts recovered, in the NAO's estimate" },
    ],
    whatHappened:
      "The Department of Health set a goal of recovering up to £500m a year from overseas visitors who use the NHS. Recovery had grown from £73m in 2012-13, but the National Audit Office found that, on current trends, the goal would be missed, with a forecast of £346m for 2017-18.",
    whereItLeaked:
      "Three places. Trusts identified very different amounts of chargeable income and the Department could not explain why. Ten London trusts produced half of the charges to non-EEA visitors in 2015-16. Staff had to judge whether a patient was chargeable using complex rules and thin information. Then invoices went unpaid: 37 of 50 trusts that answered the NAO called overseas visitor debt a very or fairly important problem.",
    control:
      "A single status check at the point of service that asks one question, is this person chargeable, and records the answer. Then an ageing view on every invoice raised, with a named person and a date against each one that has gone quiet. The first control stops the leak at the door. The second stops it at the end.",
    atTenPeople:
      "Work that starts on a phone call or an email and never gets a scope, a rate or an invoice line. The leak is a judgement call made differently by each person, and a debtor list nobody reads on a fixed day.",
    caveat:
      "A 2016 report about a public body and its rules at that time. The rules, the figures and the trusts' performance have changed since. We use it for the pattern, not as a current number.",
  },
  {
    slug: "tfl-fare-evasion",
    leak: "Unmatched",
    leakLine: "The service was used. The payment cannot be tied to it.",
    title: "Transport for London and the journey nobody paid for",
    organisation: "Transport for London",
    sector: "Transport",
    publisher: "London Assembly",
    sourceTitle: "Fare evasion: Transport Committee investigation",
    sourceUrl:
      "https://www.london.gov.uk/who-we-are/what-london-assembly-does/london-assembly-work/london-assembly-current-investigations/fare-evasion",
    published: "23 June 2025",
    access: "read",
    points: [
      { value: ">£130m", label: "revenue TfL estimated lost to fare evasion in 2023/24" },
      { value: "3.9%", label: "evasion rate across all modes in 2023/24, TfL's estimate" },
      { value: "1.5%", label: "rate TfL aims to be below by 2030" },
    ],
    whatHappened:
      "The London Assembly's Transport Committee looked at what TfL was doing about fare evasion. TfL's own estimate, from April 2025, was a loss of more than £130m in 2023/24 at an evasion rate of 3.9% of journeys.",
    whereItLeaked:
      "Between a journey and a payment. A later press report says TfL has no system that automatically matches each passenger journey to a payment, and that its estimate rests partly on spot checks at selected locations, so it reduces the figure by 10% for uncertainty. The same report gives a 2026 estimate of about £190m a year at a rate near 3.5%. TfL cannot count every leak, so it estimates it.",
    control:
      "Match the thing that was delivered to the thing that was paid, on every record, every week. An exception list of deliveries with no payment, and payments with no delivery, is the whole control. It turns an estimate into a list a person can work down.",
    atTenPeople:
      "A subscription, a retainer or a licence where the system that records what the customer uses is not the system that records what they pay. The firm finds out at renewal, or never.",
    caveat:
      "The London Assembly page gives the 2023/24 figures but not how TfL measures them. The statement that TfL has no journey-to-payment matching, and the 2026 estimate, come from one local news report (Barnet Post, 23 August 2026), not from TfL or the Assembly. Evasion is also a different problem from a billing error, because some of it is deliberate.",
    more: [
      {
        label: "Barnet Post, 23 August 2026 (reported)",
        url: "https://barnetpost.co.uk/2026/08/23/tfl-underestimating-fare-evasion-by-10-per-cent-due-to-data-collection-limitations/",
      },
    ],
  },
  {
    slug: "fca-ongoing-advice-fees",
    leak: "Undelivered",
    leakLine: "The fee was collected. The service cannot be shown.",
    title: "Ongoing advice fees and the review that may not have happened",
    organisation: "About 20 of the largest UK financial advice firms",
    sector: "Financial advice",
    publisher: "Financial Conduct Authority",
    sourceTitle: "Requests for information from firms about delivery of ongoing advice services and the Consumer Duty",
    sourceUrl:
      "https://www.fca.org.uk/news/statements/requests-information-firms-delivery-ongoing-advice-services-consumer-duty",
    published: "15 February 2024, updated 5 December 2025",
    access: "read",
    points: [
      { value: "~20", label: "of the largest advice firms the FCA wrote to" },
      { value: "3", label: "counts requested: reviews due, reviews done, fees refunded" },
      { value: "0", label: "figures published on the FCA page at the 5 Dec 2025 update" },
    ],
    whatHappened:
      "The FCA asked around 20 of the largest advice firms about ongoing advice services, the kind a client keeps paying for after the first piece of advice. It asked how many clients were due a review of the ongoing suitability of their advice, how many got one, and how many paid for ongoing advice but were refunded because the review did not happen.",
    whereItLeaked:
      "In the gap between what was charged and what can be proved. A fee is revenue only while the service behind it is delivered and evidenced. The FCA did not need to say any firm had failed. It asked for three counts, and the firms had to produce them.",
    control:
      "A delivery ledger beside the billing ledger. Every recurring fee has a service promise attached, a due date for each delivery and a record that it happened. A weekly report lists fees collected with no delivery recorded, before a regulator or a client asks.",
    atTenPeople:
      "A monthly retainer that includes a review, a report or a call, where nobody tracks whether the last one took place. The client is paying for something the firm cannot show. That is a refund waiting for the first complaint.",
    caveat:
      "The FCA page publishes no findings, no refund totals and no outcome, and it says it will update after reviewing the responses. We have found nothing that shows any firm failed. This case shows the exposure and the question being asked, not a loss.",
  },
  {
    slug: "opus-energy-billing-faults",
    leak: "Undetected",
    leakLine: "A billing fault ran for twenty years before anyone caught it.",
    title: "Opus Energy and the billing fault that ran from 2003 to 2023",
    organisation: "Opus Energy",
    sector: "Business energy supply",
    publisher: "Ofgem",
    sourceTitle: "Opus Energy to pay £7 million for overcharging business customers",
    sourceUrl: "https://www.ofgem.gov.uk/press-release/opus-energy-pay-ps7-million-overcharging-business-customers",
    published: "13 November 2024",
    access: "read",
    points: [
      { value: "87,825", label: "non-domestic customers affected between 2003 and 2023" },
      { value: "£7m+", label: "paid out: £5.5m in refunds and £1.56m in goodwill and redress" },
      { value: "2", label: "faults in the billing system behind it" },
    ],
    whatHappened:
      "Ofgem announced that Opus Energy would pay more than £7m to business customers. Two faults in its billing system had put some customers briefly on the wrong tariff and duplicated billing periods for others. An audit found the faults and Opus reported itself to the regulator.",
    whereItLeaked:
      "In a system nobody reconciled to the contract. Overcharging is the headline, but the same faults left some customers undercharged, and Opus said it would not try to recover those amounts. That is revenue forgone because of the same defect. The fault stayed hidden for twenty years until an audit found it.",
    control:
      "A sample check that rebuilds a bill from the contract terms and compares it with what the system issued, run every month on a fixed number of accounts. The rule is that a disagreement above a set size is a ticket, not a note. It finds the fault in the first month instead of the last year.",
    atTenPeople:
      "A price rise that never reached the invoice template, a discount applied twice, a client left on last year's rate. None of it shows in a bank balance. All of it shows in thirty random invoices checked against their own contracts.",
    caveat:
      "Mostly an overcharging case, so it is not purely lost revenue. We use it because the audit also found undercharging that Opus chose not to recover, and because of how long the fault stayed hidden. The figures are Ofgem's.",
  },
  {
    slug: "law-firm-write-offs-bighand",
    leak: "Unrecorded",
    leakLine: "The work was done. It never reached a bill.",
    title: "Law firms, write-offs and the hour that was never logged",
    organisation: "Law firms of 100+ lawyers, UK and US",
    sector: "Legal services",
    publisher: "Legal Futures, reporting a BigHand survey",
    sourceTitle: "Lawyers billing more hours but write-offs increasing",
    sourceUrl: "https://www.legalfutures.co.uk/latest-news/lawyers-billing-more-hours-but-write-offs-increasing",
    published: "7 December 2022",
    access: "reported",
    points: [
      { value: "64%", label: "of UK firms said write-offs were rising" },
      { value: "24%", label: "of UK firms reported missed or late time entries" },
      { value: "800", label: "senior leaders and finance executives surveyed" },
    ],
    whatHappened:
      "BigHand, a legal software vendor, surveyed 800 senior leaders and finance executives at UK and US firms with more than 100 lawyers. Legal Futures reported that 64% of UK firms said write-offs were rising, 48% said by more than 10%, and 98% had raised billable hour targets. Fee discounts off standard rates were the biggest source of profit leakage, ahead of write-offs and discounts to get paid.",
    whereItLeaked:
      "At three points: time that was worked and not recorded or recorded late, rates discounted after the fact, and bills cut down before payment. Firms raised the target for hours worked while write-offs were rising, so more hours were being asked for and a growing share was being given back.",
    control:
      "Measure what share of worked time becomes collected cash, matter by matter, and show it weekly next to the hours target. Alert when a matter's unbilled time passes a set age. The target that counts is the one measured in cash.",
    atTenPeople:
      "Any firm that sells time or fixed-fee work against a budget of hours. The partner who agrees a discount on the phone and the associate who logs Friday's work on Monday are the same leak at a smaller scale.",
    caveat:
      "We read Legal Futures, not the BigHand report, so the figures are second-hand. BigHand sells software for this problem and has a reason to report that it is large. The survey is of large firms, so the percentages should not be read as the rate in a firm of ten.",
  },
];

export function getCase(slug: string): LeakCase | undefined {
  return cases.find((c) => c.slug === slug);
}
