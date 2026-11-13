// Pillar guides. Every factual claim carries an inline link to a source that was
// fetched and read on the date in `checked`. Worked examples are labelled as our
// own arithmetic. Inline links use [text](url); paths starting "/" are internal.

import { h, p, ul, ol, stripLinks } from "./blocks";
import type { Block, FaqItem } from "./blocks";
import { EXTENSIONS } from "./extensions";
import { moreGuides } from "./more";
import { SRC } from "./sources";

export type { Block, FaqItem };

export interface GuideSource {
  label: string;
  publisher: string;
  url: string;
}

export interface GuideLink {
  href: string;
  label: string;
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  topic: string;
  published: string;
  modified: string;
  checked: string;
  service: GuideLink;
  industry: GuideLink;
  insightSlugs: string[];
  relatedGuides: string[];
  body: Block[];
  sources: GuideSource[];
}

const PUBLISHED = "2026-10-27";
const CHECKED = "27 October 2026";

const baseGuides: Guide[] = [
  {
    slug: "unbilled-wip-uk-law-firms",
    title: "Unbilled WIP in UK law firms: how to find it, value it and bill it",
    metaTitle: "Unbilled WIP in UK Law Firms: Find It",
    metaDescription:
      "Work in progress is cash a firm has earned and not invoiced. See how to measure WIP days, the Solicitors Act bill rules, and a one-afternoon review.",
    summary:
      "Unbilled work in progress is the first half of lock-up. This guide shows how to measure it in days, what a published example says it is worth, which two statutes govern a solicitor's right to chase unpaid costs, and how to run a one-afternoon review of your own matter list.",
    topic: "Work in progress",
    published: PUBLISHED,
    modified: PUBLISHED,
    checked: CHECKED,
    service: { href: "/services/ai-readiness-audit", label: "AI Readiness Audit" },
    industry: { href: "/industries/law-firms", label: "Revenue recovery for UK law firms" },
    insightSlugs: ["sra-ai-risk-accountability", "ai-productivity-customer-support-nber"],
    relatedGuides: ["lock-up-days-explained", "ai-billing-review-professional-firms"],
    body: [
      p(
        "Unbilled work in progress, usually shortened to WIP, is work a firm has done and has not yet invoiced. It appears on the management accounts as an asset and in the bank as nothing. A firm with a healthy order book can still struggle to pay salaries and tax because a large share of what it has earned sits in time entries that nobody has turned into a bill.",
      ),
      p(
        "This guide covers four things: how WIP is measured in days, what a published example says it is worth, the two statutes that decide how fast a solicitor can recover unpaid costs, and a review you can run on your own matter list in one afternoon. It is written for UK firms that bill after doing the work: law firms first, and the same arithmetic applies to accountancy, advisory and recruitment practices.",
      ),
      h("What WIP is, and how to measure it in days"),
      p(
        "The Institute of Legal Finance and Management (ILFM) describes lock-up as the time it takes a firm to convert work undertaken into cash received, and says it is generally calculated by combining two measures. The first is [WIP days, covering the period between work being carried out and the bill being raised](https://www.ilfm.org.uk/site/blog/ilfm-blog/lockup-management-in-law-firms-why-it-matters). The second is debtor days, covering the period between the bill being issued and payment being received. This guide is about the first.",
      ),
      p(
        "The usual way to express WIP in days is to divide the value of unbilled WIP by average daily fee income. The ILFM article does not prescribe that formula, so treat it as our working convention. What matters is that you pick one basis, apply it every month, and never mix a gross figure with a net one in the same ratio.",
      ),
      p(
        "Our arithmetic, for illustration only: a firm with fee income of £2,000,000 a year earns about £5,479 a day (£2,000,000 divided by 365). If its unbilled WIP is valued at £250,000, that is 45.6 days of WIP. Billing 15.6 days sooner, down to 30 days, would turn about £85,600 of earned work into invoices. Those figures are invented to show the method, not a benchmark for any firm.",
      ),
      h("What a published example says it is worth"),
      p(
        "The ILFM gives a worked case. [A firm generating £10 million in annual fee income earns approximately £27,000 in revenue each day. At 120 lock-up days, around £3.2 million may be tied up in WIP and debtors. Reducing this to 90 days could release approximately £800,000 in cash](https://www.ilfm.org.uk/site/blog/ilfm-blog/lockup-management-in-law-firms-why-it-matters). The article's point is that the improvement does not depend on increasing fees, cutting staff or reducing investment. It comes from converting work already undertaken into cash more efficiently.",
      ),
      p(
        "That example is lock-up, which includes debtors, so only part of the release comes from unbilled WIP. The split differs by firm, which is why the first step is to measure the two halves separately. Our guide to [lock-up days](/guides/lock-up-days-explained) shows how.",
      ),
      h("Why work stays unbilled"),
      p(
        "The ILFM article names the causes. [Late or incomplete time recording can delay billing and distort the value of WIP](https://www.ilfm.org.uk/site/blog/ilfm-blog/lockup-management-in-law-firms-why-it-matters). Work may then remain unbilled because billing decisions are postponed, matters are not reviewed regularly, or firms wait until completion rather than billing at appropriate milestones. It adds that these issues are rarely the responsibility of the finance team alone, and that fee earners, partners, management and finance need shared expectations.",
      ),
      p(
        "Our reading of that: the cause is almost always a missing owner and a missing date. Nobody is named as responsible for each aged matter, and no date is set on which it will be billed or written down. A WIP review that ends without an owner and a date per matter has produced a report and no cash.",
      ),
      h("The legal clock for solicitors' bills"),
      p(
        "Two statutes shape how quickly a solicitor can recover unpaid costs. Neither is a reason to delay billing. Both are reasons to bill correctly the first time.",
      ),
      p(
        "Section 69 of the [Solicitors Act 1974](https://www.legislation.gov.uk/ukpga/1974/47/section/69) says that, subject to the Act, no action shall be brought to recover costs due to a solicitor before the expiration of one month from the date on which a bill of those costs is delivered in accordance with the section's requirements. The bill must be signed by the solicitor, or on their behalf by an authorised employee, or be enclosed in or accompanied by a letter that is signed and refers to the bill. It must also be delivered personally, sent by post to or left at the paying party's place of business, dwelling-house or last known place of abode, or delivered electronically where that party has indicated willingness to accept a bill in that form. A bill delivered electronically is treated as delivered on the first working day after the day it was sent, unless the contrary is proved.",
      ),
      p(
        "The same section allows the High Court to let a solicitor start an action before the month has passed where there is probable cause for believing that the party chargeable is about to quit England and Wales, become bankrupt or compound with creditors, or do any other act that would tend to prevent or delay payment.",
      ),
      p(
        "The practical consequence is ours, not the statute's wording: the one-month wait cannot begin until a compliant bill has been delivered. Unbilled WIP is therefore not only uncollected cash. It is cash whose recovery timetable has not started. A bill that is unsigned, or sent to an address the client never accepted for delivery, can add a month to a dispute without anyone noticing.",
      ),
      p(
        "The second statute is the [Limitation Act 1980, section 5](https://www.legislation.gov.uk/ukpga/1980/58/section/5): an action founded on simple contract shall not be brought after the expiration of six years from the date on which the cause of action accrued. Six years is long enough that few firms will ever test it, which is the danger. WIP that has been ignored for years can drift towards a point where a claim is time-barred. When a cause of action accrued on a particular retainer is a question for your own legal adviser, and we are not giving legal advice here.",
      ),
      p(
        "Firms that handle client money also work under the [SRA Accounts Rules](https://www.sra.org.uk/solicitors/standards-regulations/accounts-rules/), which require systems and controls appropriate to the nature and volumes of client transactions. If a billing clean-up involves moving money between client and office accounts, keep it with whoever owns accounts compliance in your firm and follow those rules to the letter.",
      ),
      h("A one-afternoon WIP review"),
      p(
        "This is the method we use as a starting point. It needs one export from your practice management or time-recording system and one person with authority to decide.",
      ),
      ol(
        "Export unbilled WIP by matter, with fee earner, client, value, date of last time entry and date of last bill.",
        "Band each matter by days since the last time entry: up to 30, 31 to 60, 61 to 90, 91 to 180, and over 180. The bands are ours; change them to suit your matter lengths.",
        "For every matter over 60 days, record one of four decisions: bill now, bill at a named milestone on a named date, write down with partner sign-off, or query because the file and the time record do not agree.",
        "Check the queried matters against file activity. Emails sent, documents created and hearings attended with no matching time entry point to unrecorded time, which understates WIP rather than overstating it.",
        "Name an owner for each matter. Put the next review date in the diary, no more than 30 days out.",
        "Repeat monthly and chart WIP days against the same fee-income basis. A falling line is the only proof the review is working.",
      ),
      p(
        "The ILFM's list of practical controls (time recording, WIP and debtors, early intervention, KPIs and management information) matches this shape. The difference we add is the owner and the date on every aged matter.",
      ),
      h("What to automate and what to leave to a person"),
      p(
        "Steps 1 and 2 are mechanical and suit automation: pulling the export, banding by age and listing matters with time recorded and no bill. Steps 3 and 5 are judgement and stay with a partner. The reasons are set out in our guide to [AI-assisted billing review](/guides/ai-billing-review-professional-firms): the evidence says AI helps on routine, well-defined tasks and makes errors on judgement-heavy ones, and the SRA is explicit that accountability cannot be delegated.",
      ),
      h("Where to start"),
      p(
        "Run the afternoon review once on your own data before you buy anything. If the result is a list of matters with owners and dates, you have a plan. If it shows that time is not being recorded at all, the fix sits earlier in the chain and our [Leak Scan](/solutions) is built to find it: it is free, and it flags where cash leaves the process between the work and the bank. For firms that want the work done for them, the [AI Readiness Audit](/services/ai-readiness-audit) starts at £1,500, and all our prices are on the [pricing page](/pricing). The page for [UK law firms](/industries/law-firms) shows how we apply this to the sector.",
      ),
    ],
    sources: [SRC.ilfm, SRC.solAct69, SRC.limAct5, SRC.sraAcc],
  },
  {
    slug: "lock-up-days-explained",
    title: "Lock-up days explained: the formula, a worked example and six fixes",
    metaTitle: "Lock-Up Days: Formula, Example and Fixes",
    metaDescription:
      "Lock-up days equal WIP days plus debtor days. See the formula, a worked £2m firm example with the cash released per day cut, and six fixes to try first.",
    summary:
      "Lock-up days measure how long a firm funds its clients' work. This guide gives the two-part formula, a worked example with every figure shown, a published example from the ILFM, and six fixes ordered by which half of the number is larger.",
    topic: "Cash conversion",
    published: PUBLISHED,
    modified: PUBLISHED,
    checked: CHECKED,
    service: { href: "/services/ai-readiness-audit", label: "AI Readiness Audit" },
    industry: { href: "/industries/accountancy-firms", label: "Revenue recovery for accountancy firms" },
    insightSlugs: ["ai-productivity-customer-support-nber", "sra-ai-risk-accountability"],
    relatedGuides: ["unbilled-wip-uk-law-firms", "chasing-late-invoices-uk-late-payment-law"],
    body: [
      p(
        "A profitable firm can still run short of cash. The usual reason is not low fees. It is the time between doing the work and receiving the money, during which the firm pays salaries, rent and tax from its own pocket. Lock-up days put a number on that gap.",
      ),
      p(
        "This guide gives the formula, works it through on an example with every figure shown, quotes a published example from the Institute of Legal Finance and Management (ILFM), and lists six fixes ordered by which half of the number is larger. It was written with law firms in mind, but the arithmetic is the same for any firm that invoices after doing the work.",
      ),
      h("The definition"),
      p(
        "The ILFM defines lock-up as [the time it takes a firm to convert work undertaken into cash received](https://www.ilfm.org.uk/site/blog/ilfm-blog/lockup-management-in-law-firms-why-it-matters). It is generally calculated by combining two measures:",
      ),
      ul(
        "WIP days, covering the period between work being carried out and the bill being raised.",
        "Debtor days, covering the period between the bill being issued and payment being received.",
      ),
      p(
        "The longer the combined cycle, the ILFM says, the more working capital stays tied up in unfinished billing and unpaid invoices. In effect, the firm is funding its clients' work while continuing to meet salaries, tax liabilities and other operating costs.",
      ),
      h("The formula and a worked example"),
      p(
        "The ILFM article does not give a formula, so what follows is our working convention. Divide each balance by average daily fee income, then add the two results.",
      ),
      ul(
        "Daily fee income = annual fee income divided by 365.",
        "WIP days = unbilled WIP divided by daily fee income.",
        "Debtor days = unpaid billed fees divided by daily fee income.",
        "Lock-up days = WIP days plus debtor days.",
      ),
      p(
        "Our arithmetic, with invented figures to show the method: annual fee income £2,000,000, so daily fee income is £5,479 (rounded). Unbilled WIP is £250,000, which is 45.6 days. Unpaid billed fees are £330,000, which is 60.2 days. Lock-up is 105.9 days (45.6 plus 60.2, rounded). Every day removed from that number releases about £5,479 of cash. Cutting 15 days releases about £82,192.",
      ),
      p(
        "Use the same basis for both balances. If debtors include VAT and WIP does not, the debtor figure will look worse than it is. Pick net or gross, write it down, and keep it for every month you compare.",
      ),
      h("A published example of scale"),
      p(
        "The ILFM gives its own case. [A firm generating £10 million in annual fee income earns approximately £27,000 in revenue each day. At 120 lock-up days, around £3.2 million may be tied up in WIP and debtors. Reducing this to 90 days could release approximately £800,000 in cash](https://www.ilfm.org.uk/site/blog/ilfm-blog/lockup-management-in-law-firms-why-it-matters). Run our formula on the same inputs and you get the same answer: £10,000,000 divided by 365 is £27,397 a day, and 30 days is £821,918. The ILFM rounds to £800,000.",
      ),
      p(
        "We have not quoted an industry average for lock-up days because we have not read a primary source for one that we would stand behind. The better comparison is your own trailing twelve months. Set the target as a fall against that line and review it monthly.",
      ),
      h("Read the two halves separately"),
      p(
        "A combined number hides where the cash is stuck. In the example above, WIP is 45.6 days and debtors are 60.2 days, so debtors are the larger half. A firm in that position gains more from a chasing routine than from a faster billing run. A firm with the reverse split should start with billing.",
      ),
      p(
        "The ILFM names the mechanisms behind each half. On the WIP side, [late or incomplete time recording can delay billing and distort the value of WIP](https://www.ilfm.org.uk/site/blog/ilfm-blog/lockup-management-in-law-firms-why-it-matters), and work may remain unbilled because billing decisions are postponed, matters are not reviewed regularly or firms wait until completion rather than billing at appropriate milestones. On the debtor side, once invoices are raised, unclear payment terms, inconsistent follow-up and reluctance to challenge valued clients can contribute to growing balances.",
      ),
      h("Why the payment term sets the floor for debtor days"),
      p(
        "Debtor days cannot fall below the term you agreed with the client. GOV.UK explains that [if a payment date is agreed it must usually be within 60 days for business transactions](https://www.gov.uk/late-commercial-payments-interest-debt-recovery), and that a longer period must be fair to both businesses. If no date is agreed, the same page says the payment is late 30 days after the customer gets the invoice or after you deliver the goods or provide the service, whichever is later.",
      ),
      p(
        "Two practical consequences follow. First, a firm that sets 30-day terms and then accepts 75 days in practice is training its clients, and the extra 45 days show up directly in the debtor half of the formula. Second, a firm with no written term has a weaker position than one that wrote 14 or 30 days on the engagement letter, because the lateness clock then rests on a default rather than on an agreement the client signed.",
      ),
      p(
        "GOV.UK also states that the [statutory interest on late business payments is 8% plus the Bank of England base rate](https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt), unless the contract sets a different rate, and that you send a new invoice if you decide to add interest. Most firms never charge it. Whether you do is a commercial choice about the client relationship, but knowing the right exists changes how a debtor conversation feels.",
      ),
      h("Six fixes, in the order we would try them"),
      ol(
        "Name an owner and a date for every matter or engagement older than 60 days since the last time entry. Our [WIP guide](/guides/unbilled-wip-uk-law-firms) gives the afternoon method.",
        "Bill at milestones agreed with the client at the start, not at completion. The ILFM lists waiting for completion as a cause of unbilled work.",
        "Put the payment term on every invoice in the same place, in the same words, and send it to the person who approves payment, not the person who instructed you.",
        "Run a debtor call list weekly, oldest first, with one named caller. The ILFM points to inconsistent follow-up as a cause of growing balances.",
        "State, in your terms of business, that statutory interest and fixed recovery sums apply to late business payments, and use them on repeat late payers. The rules are in our [late payment guide](/guides/chasing-late-invoices-uk-late-payment-law).",
        "Report both halves to the partners or directors every month on one page, with the same basis each time.",
      ),
      h("Where this goes wrong"),
      p(
        "Three errors recur in lock-up work. The first is averaging: a firm with ten clients on 20-day terms and one on 150 days has an average that describes nobody, so list the ten largest balances by age as well as the ratio. The second is a one-off push at year end that flatters the figure on the balance sheet date and is gone by February. The third is treating the number as a finance team target. The ILFM is direct about this: lock-up should be treated as a firm-wide operational and strategic priority, supported by clear processes, meaningful management information and appropriate accountability.",
      ),
      h("What to do next"),
      p(
        "Calculate the two halves for the last twelve months, month by month, on one basis. That takes a spreadsheet and the two balances from your ledger. If the result points to a leak you cannot explain, our free [Leak Scan](/solutions) checks where cash drops out between work and payment. For a worked review of an accountancy practice, see how we approach [accountancy firms](/industries/accountancy-firms), and for the fixed-price options see the [pricing page](/pricing). If you want a second pair of eyes on the numbers before you change anything, the [AI Readiness Audit](/services/ai-readiness-audit) starts at £1,500.",
      ),
    ],
    sources: [SRC.ilfm, SRC.govLate, SRC.govInterest],
  },
  {
    slug: "chasing-late-invoices-uk-late-payment-law",
    title: "Chasing late invoices in the UK: interest, fixed fees and the steps before court",
    metaTitle: "UK Late Payment Law: Interest and Fees",
    metaDescription:
      "Business debts earn 8% over base rate plus £40, £70 or £100 per invoice. See when an invoice is late, the pre-action steps and a four-step chasing ladder.",
    summary:
      "UK law lets a supplier charge statutory interest and a fixed recovery sum on late business payments. This guide sets out the rules from GOV.UK and the Act itself, the pre-action steps a court expects, and a four-step chasing ladder that uses them in order.",
    topic: "Debtors",
    published: PUBLISHED,
    modified: PUBLISHED,
    checked: CHECKED,
    service: { href: "/services/ai-automation", label: "AI workflow automation" },
    industry: { href: "/industries/commercial-property", label: "Revenue recovery for commercial property" },
    insightSlugs: ["simply-business-sme-insights-2026", "ai-opportunities-action-plan-2025"],
    relatedGuides: ["lock-up-days-explained", "unbilled-wip-uk-law-firms"],
    body: [
      p(
        "Most firms know that a late invoice is a problem. Fewer know that the law gives a supplier a right to interest and a fixed sum on top of the debt, with no contract wording needed. This guide sets out what the rules say, in the order you would use them: when an invoice becomes late, what you can add to it, what a court expects you to do before a claim, and a four-step chasing ladder that puts the rules to work.",
      ),
      p(
        "It describes the position for business-to-business debts in England and Wales. GOV.UK notes that there are [different processes for making a court claim in Scotland and Northern Ireland](https://www.gov.uk/make-court-claim-for-money). This is general information from the sources linked below, not legal advice, and the facts of your debt may change the answer.",
      ),
      h("When an invoice becomes late"),
      p(
        "GOV.UK says that if you agree a payment date, it must usually be within [30 days for public authorities or 60 days for business transactions](https://www.gov.uk/late-commercial-payments-interest-debt-recovery). You can agree a longer period than 60 days for business transactions, but it must be fair to both businesses. If you do not agree a payment date, the law says the payment is late 30 days after either the customer gets the invoice or you deliver the goods or provide the service, if that is later.",
      ),
      p(
        "The Act sets out the same structure. Under [section 4 of the Late Payment of Commercial Debts (Interest) Act 1998](https://www.legislation.gov.uk/ukpga/1998/20/section/4), statutory interest starts to run on the day after the relevant day for the debt. Where there is an agreed payment day, that is the relevant day, and where there is not, it is the last day of the relevant 30-day period. The section also provides that where the purchaser is not a public authority and the last day of the relevant 60-day period falls earlier than the agreed payment day, the 60-day date applies, unless the agreed day is not grossly unfair to the supplier.",
      ),
      p(
        "The practical point is that the payment term on your invoice matters twice. It decides when you can chase, and a very long agreed term may not hold if it is grossly unfair. Put the term in writing before you do the work.",
      ),
      h("Statutory interest: 8% over base rate"),
      p(
        "GOV.UK states that [the interest you can charge is statutory interest, which is 8% plus the Bank of England base rate for business to business transactions](https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt). You cannot claim statutory interest if there is a different rate of interest in a contract. GOV.UK also says you cannot use a lower interest rate if you have a contract with public authorities, and that you should send a new invoice if you decide to add interest to the money you are owed.",
      ),
      p(
        "GOV.UK works an example: a debt of £1,000 with the base rate at 0.5% gives annual statutory interest of £85, which is 23p a day, and £11.50 after 50 days.",
      ),
      p(
        "Here is our own example, with an assumed base rate so you can see the shape. Take an invoice of £12,500 and a base rate of 4%. Statutory interest is 12% a year, which is £1,500 a year or £4.11 a day. After 30 days late, the interest is about £123. Check the current Bank of England base rate before you use the method, because the rate we assumed is an illustration and not a statement of today's rate.",
      ),
      h("The fixed recovery sum"),
      p(
        "On top of interest, the supplier can claim a fixed sum. [Section 5A of the 1998 Act](https://www.legislation.gov.uk/ukpga/1998/20/section/5A) entitles the supplier, once statutory interest begins to run, to £40 for a debt under £1,000, £70 for a debt of £1,000 or more but under £10,000, and £100 for a debt of £10,000 or more. If the supplier's reasonable costs of recovering the debt are not met by the fixed sum, the supplier is also entitled to the difference. [GOV.UK adds](https://www.gov.uk/late-commercial-payments-interest-debt-recovery/claim-debt-recovery-costs) that you can only charge the business once for each payment.",
      ),
      p(
        "Taken together, a £12,500 invoice that is 30 days late could support about £123 of interest and £100 of fixed sum on our assumed rate, plus any further reasonable recovery costs. The sums are modest against a large invoice, which is why they work best as a signal of seriousness and a deterrent for repeat late payers. They are not a profit line.",
      ),
      h("What a court expects before you issue a claim"),
      p(
        "The Civil Procedure Rules include a [Practice Direction on Pre-Action Conduct and Protocols](https://www.justice.gov.uk/courts/procedure-rules/civil/rules/pd_pre-action_conduct) that applies where no specific protocol does. The steps it describes are short:",
      ),
      ul(
        "The claimant writes to the defendant with concise details of the claim, including the basis of the claim and a summary of how the amount is calculated.",
        "The defendant responds within a reasonable time: 14 days in a straightforward case and no more than 3 months in a very complex one. The reply says whether the claim is accepted and, if not, which facts are disputed.",
        "The parties disclose key documents relevant to the issues in dispute.",
      ),
      p(
        "The Practice Direction also says that litigation should be a last resort and that parties should consider whether negotiation or another form of alternative dispute resolution could settle the dispute. If proceedings are issued, the court may require evidence that ADR was considered, and a party's silence in response to an invitation to participate, or a refusal, might be considered unreasonable and lead to an order to pay additional court costs. The court will take non-compliance into account when giving directions and making costs orders.",
      ),
      p(
        "The Practice Direction does not extend time. Paragraph 17 states that it does not alter the statutory time limits for starting court proceedings, and that a defendant can use an expired limitation period as a defence. For a simple contract that period is [six years from the date the cause of action accrued](https://www.legislation.gov.uk/ukpga/1980/58/section/5), under section 5 of the Limitation Act 1980.",
      ),
      h("Court claims and mediation"),
      p(
        "GOV.UK explains that you can apply to a county court to claim money you are owed by a person or business, online or by post, and that [a mediation service could be quicker and cheaper than going to court](https://www.gov.uk/make-court-claim-for-money). Court fees and the steps after issue are set out there. Read that guide before you choose between a claim and mediation, because the right route depends on the size of the debt and the strength of the dispute.",
      ),
      h("VAT on bad debts"),
      p(
        "HMRC's [VAT guide (Notice 700)](https://www.gov.uk/guidance/vat-guide-notice-700) says that if you make taxable supplies to a customer who does not pay, you may be able to reclaim relief from VAT on the bad debt, and points to VAT Notice 700/18 for the detail. Ask your accountant whether a long-overdue balance qualifies before you write it off in full.",
      ),
      h("A four-step chasing ladder"),
      p(
        "The ladder below is our suggested routine. It is a process, not legal advice, and you should adapt the timings to your terms.",
      ),
      ol(
        "On the due date plus one day, send a short reminder to the person who approves payment, quoting the invoice number, amount and due date. Keep the tone neutral.",
        "At 14 days late, send a written notice that states the statutory interest and fixed sum now applying, with a revised invoice for those amounts as GOV.UK advises. Offer a phone call.",
        "At 30 days late, send a letter that follows the Practice Direction's shape: the basis of the claim, how the sum is calculated, a 14-day reply period and the key documents attached. Propose mediation.",
        "If there is still no reply, decide between a county court claim and mediation, using the GOV.UK guide, and check the limitation date on the file.",
      ),
      h("Making it routine"),
      p(
        "The ladder only works if every step happens on its date. That is a job for a diary or a workflow, not for memory. Our [AI workflow automation](/services/ai-automation) service sets up reminders and a call list from the ledger, and the [commercial property](/industries/commercial-property) page shows how we apply the same debtor routine where rent and service charge arrears build up. Our free [Leak Scan](/solutions) can show how much of your ledger is already past the dates above, and our [pricing page](/pricing) lists the fixed options.",
      ),
    ],
    sources: [
      SRC.govLate,
      SRC.govInterest,
      SRC.govCosts,
      SRC.lpcda4,
      SRC.lpcda5a,
      SRC.pdpac,
      SRC.limAct5,
      SRC.govCourt,
      SRC.vat700,
    ],
  },
  {
    slug: "ai-billing-review-professional-firms",
    title: "AI-assisted billing review for professional firms: what the evidence supports",
    metaTitle: "AI Billing Review: What Evidence Says",
    metaDescription:
      "Two studies show AI lifting routine output 14% to 25% and cutting accuracy 19 points on harder tasks. See a sample-test protocol for billing review.",
    summary:
      "Research finds that AI speeds up routine work and degrades accuracy on harder judgement tasks, and the SRA says accountability cannot be delegated. This guide turns those findings into a sample-test protocol for using AI on WIP and debtor review.",
    topic: "AI in practice",
    published: PUBLISHED,
    modified: PUBLISHED,
    checked: CHECKED,
    service: { href: "/services/ai-automation", label: "AI workflow automation" },
    industry: { href: "/industries/law-firms", label: "Revenue recovery for UK law firms" },
    insightSlugs: ["jagged-frontier-hbs-bcg", "sra-ai-risk-accountability"],
    relatedGuides: ["unbilled-wip-uk-law-firms", "uk-gdpr-ai-client-data"],
    body: [
      p(
        "Billing review is a tempting first use of AI in a professional firm. It is repetitive, the data sits in one system and the cash value of a good result is easy to see. It is also a place where a wrong answer costs real money and, for solicitors, regulatory trouble. This guide sets out what two well-known studies and the Solicitors Regulation Authority (SRA) say, then turns it into a test you can run before you trust any tool with your WIP or debtor list.",
      ),
      h("What the research found on routine work"),
      p(
        "The National Bureau of Economic Research (NBER) paper [Generative AI at Work](https://www.nber.org/papers/w31161) studied the staggered introduction of a generative AI conversational assistant using data from 5,179 customer support agents. Access to the tool increased productivity, measured by issues resolved per hour, by 14% on average, including a 34% improvement for novice and low-skilled workers, but with minimal impact on experienced and highly skilled workers.",
      ),
      p(
        "Customer support is not billing, and we do not claim the 14% transfers to your firm. The finding that matters for billing is where the gain landed: on the less experienced staff doing structured work. Billing review is structured work, and a junior member of the finance team may gain more than a finance director.",
      ),
      h("What the research found on harder work"),
      p(
        "Harvard Business School's Working Knowledge site summarised a study of [758 consultants at Boston Consulting Group](https://www.library.hbs.edu/working-knowledge/humans-vs-machines-untangling-the-tasks-ai-can-and-cant-handle) who did tasks with and without GPT-4. On tasks inside the AI's capability, consultants using AI finished 12 percent more work at a 25 percent faster clip, and work rated 40 percent higher in quality. AI also gave consultants rated below the median beforehand the biggest boost, 43 percent compared with 17 percent for top performers.",
      ),
      p(
        "On a more complex task designed so that consultants would excel and AI would struggle without extensive guidance, the result reversed. Consultants using AI were 19 percentage points less likely to produce the right answer. The article breaks that down: a 24 percentage point decline for consultants using AI plus training and a 13 percentage point drop for those using AI alone. It also notes that AI may somewhat stifle the diversity of ideas.",
      ),
      p(
        "The lesson the researchers draw is a method, not a verdict. Managers need to select applications carefully, train staff to use the tool properly and move the line as AI improves. One of the authors, Edward McFowland III, says finding which tasks fall on which side of the “jagged technological frontier” requires studying it with your people, deeply in your context.",
      ),
      h("What the regulator says"),
      p(
        "The SRA's [Risk Outlook report on AI](https://www.sra.org.uk/sra/research-publications/artificial-intelligence-legal-market/) is the clearest UK statement for law firms. It says that you remain responsible and accountable for the outputs from AI you are using, and that you cannot delegate accountability to an IT team or external provider. It explains hallucination as a system producing highly plausible but incorrect results, and advises firms to supervise AI systems, and staff use of them, to make sure they are working as expected and providing accurate results, with supervision systems that can cope with the increased speed of AI.",
      ),
      p(
        "Reporting on the report, [Legal Futures](https://www.legalfutures.co.uk/latest-news/sra-lawyers-must-not-trust-ai-to-judge-its-own-accuracy) records the SRA warning solicitors not to trust AI to judge its own accuracy, and the regulator's line that AI should be used to speed up and automate routine tasks, supporting rather than replacing human judgement. The SRA also notes, in the same report, that it hears from small firms using a combination of off-the-shelf and generic AI technologies.",
      ),
      h("Which billing tasks sit on which side"),
      p(
        "Putting the studies together gives a sorting rule. This is our application of the research to billing, and the research does not test these tasks directly.",
      ),
      ul(
        "Likely inside the frontier, good first candidates: listing matters with recorded time and no bill, banding WIP by age, matching time entries to file activity, drafting a first-pass narrative for a bill from the time entries, and summarising debtor notes into a call list.",
        "Likely outside the frontier, keep with a person: deciding a write-down or write-off, judging whether a client will accept a bill, interpreting a retainer or fee agreement, and advising on a dispute.",
      ),
      p(
        "The rule of thumb: AI proposes, a person disposes, and the person can see the evidence behind each proposal.",
      ),
      h("A sample-test protocol before you trust a tool"),
      p(
        "Because the SRA says not to trust AI to judge its own accuracy, the check has to come from outside the tool. This protocol is ours and takes a few hours.",
      ),
      ol(
        "Pick one task from the first list, for example flagging aged WIP with no recent time entry.",
        "Run the tool on a closed set of data where you already know the answer, such as last quarter's matters after a manual review.",
        "Take a random sample of 50 flagged items and have a person mark each as correct or incorrect against the source records.",
        "Record the share that were correct, and separately record any matters the tool missed that the manual review caught.",
        "Before you run the test, have the partners set the pass mark in writing. Do not set it after you see the result.",
        "Run the tool live only on a pilot set at first, with a person approving every action, and repeat the sample test monthly for the first quarter.",
        "Keep a log of each sample, its result and who reviewed it. That log is your evidence of supervision if a regulator or client asks.",
      ),
      p(
        "If the tool fails the pass mark, you have lost an afternoon and learned something cheaply. If it passes, you have a number to put in front of the partners instead of a demo.",
      ),
      p(
        "Two details make the test honest. Sample across fee earners and matter types rather than taking the first 50 rows, because a tool that works on simple conveyancing files may fail on contentious ones. And count the misses as well as the false alarms: a tool that flags every matter will find every leak and waste everyone's week, while one that stays quiet looks accurate and finds nothing. Record both numbers side by side. The SRA says supervision has to cope with the increased speed of AI, so the review rate you set must be one a person can actually sustain.",
      ),
      h("Confidentiality and data protection"),
      p(
        "Billing data is client data. The SRA names the threats: a staff member using online AI such as ChatGPT to answer a question on a client's case, and confidential data being revealed when it is transferred to an AI provider for training. Decide which tools are approved before staff decide for you, and read our guide to [UK GDPR and AI client data](/guides/uk-gdpr-ai-client-data) before any matter-level data goes into a new system.",
      ),
      h("Cost and next steps"),
      p(
        "The SRA observes that there are many sophisticated and expensive AI products aimed at large corporate businesses, and that small firms increasingly use off-the-shelf tools. For billing review, an off-the-shelf tool plus a clear protocol is often enough to test the idea. If you want help designing the test, our [AI workflow automation](/services/ai-automation) service builds the export, the flags and the review log, and the [AI Readiness Audit](/services/ai-readiness-audit), from £1,500, tells you which tasks in your firm are worth automating at all. Start with the free [Leak Scan](/solutions) if you want to see where the money is leaking first. Our page for [UK law firms](/industries/law-firms) shows the sector detail, and our [insight summary of the SRA report](/insights/sra-ai-risk-accountability) and of the [Harvard and BCG study](/insights/jagged-frontier-hbs-bcg) give the short versions.",
      ),
    ],
    sources: [SRC.nber, SRC.hbs, SRC.sraAi, SRC.legalFutures],
  },
  {
    slug: "uk-gdpr-ai-client-data",
    title: "UK GDPR and AI tools: a client-data checklist for small firms",
    metaTitle: "UK GDPR and AI: A Client Data Checklist",
    metaDescription:
      "Before client data goes into an AI tool, check Articles 5, 28, 32 and 35 of the UK GDPR. Ten questions, the DPIA triggers and where ICO guidance is in review.",
    summary:
      "Client data entered into an AI tool is personal data processing under the UK GDPR. This guide walks through the four articles that matter, the ICO's view of when an impact assessment is needed, and ten questions to answer before a tool goes live.",
    topic: "Data protection",
    published: PUBLISHED,
    modified: PUBLISHED,
    checked: CHECKED,
    service: { href: "/services/team-enablement", label: "AI training and use policy" },
    industry: { href: "/industries/ifas-wealth-managers", label: "Revenue recovery for IFAs and wealth managers" },
    insightSlugs: ["ico-ai-and-data-protection-guidance", "sra-ai-risk-accountability"],
    relatedGuides: ["ai-billing-review-professional-firms", "unbilled-wip-uk-law-firms"],
    body: [
      p(
        "A member of staff pastes a client's email into an AI chatbot to get a summary. Under the UK GDPR that is processing of personal data, and the firm is responsible for it whether or not it approved the tool. This guide is for owners and compliance leads at small UK firms who want a short, sourced route through the rules before an AI tool touches client information.",
      ),
      p(
        "It is general information drawn from the legislation and regulator pages linked below. It is not legal advice, and the Information Commissioner's Office (ICO) has noted that parts of its guidance are under review, which we flag where it matters.",
      ),
      h("Why the rules apply to AI tools"),
      p(
        "The SRA's report on AI records that [the ICO is clear that consumers' data protection rights remain when their information is used for training or operating an AI](https://www.sra.org.uk/sra/research-publications/artificial-intelligence-legal-market/). The ICO has a dedicated [guidance on AI and data protection](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/), which was updated on 15 March 2023. At the time we read it, the page carried a notice that, due to changes made by the Data (Use and Access) Act, the guidance is under review and may be subject to change. Check that page for the current position before you rely on this guide or any other summary.",
      ),
      p(
        "The SRA lists the particular threats for law firms: a staff member using online AI to answer a question on a client's case, confidential data being revealed when it is transferred to an AI provider for training, and output from an AI system replicating confidential details from one case in its response to another. The same threats apply to any firm that handles client records, including accountants, brokers and advisers.",
      ),
      h("Article 5: the principles"),
      p(
        "[Article 5 of the UK GDPR](https://www.legislation.gov.uk/eur/2016/679/article/5) sets out six principles. Personal data must be processed lawfully, fairly and transparently; collected for specified, explicit and legitimate purposes; adequate, relevant and limited to what is necessary (data minimisation); accurate and kept up to date; kept no longer than necessary; and processed securely. Article 5(2) adds that the controller shall be responsible for, and be able to demonstrate compliance with, those principles. The legislation.gov.uk page shows amendments made by the Data (Use and Access) Act 2025, in force from 5 February 2026 where not already in force.",
      ),
      p(
        "For an AI tool, three of the principles do most of the work. Purpose limitation asks whether using client data in the tool fits the purpose it was collected for. Data minimisation asks whether the tool needs the whole file or only a redacted extract. Accuracy matters because AI output can be plausibly wrong, and the SRA reports the term for this as hallucination.",
      ),
      h("Article 28: if the vendor handles the data, you need a contract"),
      p(
        "Where a vendor processes personal data on your behalf, you are the controller and the vendor is a processor. The ICO publishes [guidance on controllers and processors](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/controllers-and-processors/), including a page on contracts and liabilities. [Article 28](https://www.legislation.gov.uk/eur/2016/679/article/28) says the controller shall use only processors providing sufficient guarantees to implement appropriate technical and organisational measures, and that processing shall be governed by a binding contract covering the subject matter, duration, nature and purpose of processing, the type of personal data and the obligations and rights of the controller.",
      ),
      p(
        "The contract must stipulate, among other things, that the processor processes the data only on documented instructions from the controller, makes sure its people are bound by confidentiality, takes the security measures required by Article 32, does not engage another processor without authorisation, assists with data subject requests, deletes or returns the data at the end of the service, and makes available the information needed to demonstrate compliance, including allowing audits.",
      ),
      p(
        "The practical test for an AI vendor: can you find these terms in a data processing agreement, and does the vendor state whether it uses your inputs to train its models? If the answer to either is unclear, do not enter client data until it is.",
      ),
      h("Article 32: security"),
      p(
        "[Article 32](https://www.legislation.gov.uk/eur/2016/679/article/32) requires the controller and the processor to implement technical and organisational measures appropriate to the risk, taking into account the state of the art, costs, and the nature, scope, context and purposes of processing. The measures listed include pseudonymisation and encryption, ongoing confidentiality, integrity, availability and resilience of systems, the ability to restore access to data after an incident, and a process for regularly testing and evaluating the measures. It also requires steps to ensure that anyone acting under your authority who has access to personal data processes it only on your instructions.",
      ),
      p(
        "For a small firm, that last point is the staff policy. A written rule on which AI tools staff may use, and for what, is how you show instructions were given. The SRA suggests supervision should cover the difference between casual use of online AI such as ChatGPT and systems the firm has formally adopted, and notes that some firms prohibit all staff use of online systems beyond their direct control.",
      ),
      h("Article 35: when you need an impact assessment"),
      p(
        "[Article 35](https://www.legislation.gov.uk/eur/2016/679/article/35) requires a data protection impact assessment (DPIA) before processing, in particular using new technologies, that is likely to result in a high risk to the rights and freedoms of individuals. It names three cases that always require one: a systematic and extensive evaluation of personal aspects based on automated processing on which decisions with legal or similarly significant effects are based; large-scale processing of special category or criminal offence data; and large-scale systematic monitoring of a public area.",
      ),
      p(
        "The ICO's page [When do we need to do a DPIA?](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/when-do-we-need-to-do-a-dpia/) adds that its list of high-risk processing includes innovative technology, including AI, in combination with another criterion from the European guidelines, for example evaluation or scoring, or sensitive data. It explains that innovative technology concerns developments in technological knowledge in the world at large, not technology that is new to you. It also says that if no mandatory obligation applies, you are responsible for assessing whether your intended processing is likely to result in high risk.",
      ),
      p(
        "A DPIA must contain at least a systematic description of the processing and its purposes, an assessment of necessity and proportionality, an assessment of the risks to individuals, and the measures envisaged to address those risks. For a small firm, a two-page DPIA for each AI tool, kept with the contract, meets that shape. Our reading is that using an AI tool to score or evaluate individual clients, or to process health or financial vulnerability data, is where a DPIA is most clearly needed. Summarising a firm's own internal billing data, with no personal data in the input, is at the other end.",
      ),
      h("Ten questions to answer before a tool goes live"),
      ol(
        "What personal data will go into the tool, and could the task be done with that data removed or redacted?",
        "Which clients or categories of client does it relate to, and does any of it fall into special category data?",
        "Who is the vendor, and are you the controller with the vendor as processor?",
        "Is there a data processing agreement with the Article 28 terms?",
        "Does the vendor use your inputs to train its models, and can that be switched off in writing?",
        "Where is the data stored, and what does the vendor say about security and deletion?",
        "Does the tool evaluate or score individuals, or only summarise documents?",
        "Have you completed a DPIA, or recorded why one is not needed?",
        "Does your privacy notice tell clients how their data is used, including by this tool?",
        "Which staff may use the tool, for what, and where is that written down?",
      ),
      p(
        "Keep the answers on file. Article 5(2) asks you to be able to demonstrate compliance, and a dated checklist per tool is the cheapest form of evidence.",
      ),
      h("Where to get help"),
      p(
        "The ICO runs an [advice hub for small and medium organisations](https://ico.org.uk/for-organisations/advice-for-small-organisations/) with tools such as a check on whether data protection applies to your business and a privacy notice generator. For a staff policy and training session built around the questions above, see our [AI training and use policy](/services/team-enablement) service, and read our own [AI policy](/ai-policy) as an example of the level of detail we think is useful. Our page for [IFAs and wealth managers](/industries/ifas-wealth-managers) covers a sector where client financial data makes the DPIA question live. The [pricing page](/pricing) lists the fixed fees, and the free [Leak Scan](/solutions) sits outside client data entirely, so it is a safe place to start.",
      ),
    ],
    sources: [
      SRC.sraAi,
      SRC.icoAi,
      SRC.icoDpiaWhen,
      SRC.icoCp,
      SRC.icoSmall,
      SRC.gdpr5,
      SRC.gdpr28,
      SRC.gdpr32,
      SRC.gdpr35,
    ],
  },
];

export const PILLAR_SLUG = "revenue-leakage-professional-firms";
const EXTENDED = "2026-10-28";
const EXTENDED_CHECKED = "28 October 2026";
const FOUNDER = { name: "Adam Khalid", role: "Founder and CEO, Intel Made Simple" };

function assemble(g: Guide): Guide {
  const ext = EXTENSIONS[g.slug];
  const byline: Block = {
    t: "byline",
    name: FOUNDER.name,
    role: FOUNDER.role,
    reviewed: ext ? EXTENDED_CHECKED : g.checked,
  };
  if (!ext) return { ...g, body: [byline, ...g.body] };
  const body: Block[] = [byline];
  for (const b of g.body) {
    if (b.t === "h2") {
      const extra = ext.insertBefore[b.text];
      if (extra) body.push(...extra);
      body.push({ t: "h2", text: ext.rename[b.text] ?? b.text });
    } else {
      body.push(b);
    }
  }
  body.push(...ext.tail);
  return {
    ...g,
    modified: EXTENDED,
    checked: EXTENDED_CHECKED,
    body,
    sources: [...g.sources, ...ext.sources],
    relatedGuides: [...new Set([...g.relatedGuides, ...ext.relatedGuides])],
    insightSlugs: ext.insightSlugs ?? g.insightSlugs,
  };
}

const assembled = [...baseGuides, ...moreGuides].map(assemble);

export const guides: Guide[] = [
  ...assembled.filter((g) => g.slug === PILLAR_SLUG),
  ...assembled.filter((g) => g.slug !== PILLAR_SLUG),
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function plainText(g: Guide): string {
  return g.body
    .map((b) => {
      switch (b.t) {
        case "h2":
        case "p":
          return stripLinks(b.text);
        case "ul":
        case "ol":
          return b.items.map(stripLinks).join(" ");
        case "table":
          return [b.caption, ...b.head, ...b.rows.flat()].map(stripLinks).join(" ");
        case "faq":
          return b.items.map((i) => `${i.q} ${stripLinks(i.a)}`).join(" ");
        case "byline":
          return `${b.name} ${b.role} ${b.reviewed}`;
      }
    })
    .join(" ");
}

export function faqItems(g: Guide): FaqItem[] {
  return g.body.flatMap((b) => (b.t === "faq" ? b.items : []));
}

export function wordCount(g: Guide): number {
  return plainText(g).split(/\s+/).filter(Boolean).length;
}
