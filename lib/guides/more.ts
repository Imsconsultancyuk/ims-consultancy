// Four further guides. Same standard as guides.ts: every factual claim links to a source
// that was fetched and read, and worked examples are labelled as our own arithmetic on
// invented figures. Byline and assembly happen in guides.ts.

import { faq, h, ol, p, qa, table, ul } from "./blocks";
import { SRC } from "./sources";
import type { Guide } from "./guides";

const PUBLISHED = "2026-10-28";
const CHECKED = "28 October 2026";

const pillar: Guide = {
  slug: "revenue-leakage-professional-firms",
  title: "Revenue leakage in professional firms: where earned money goes missing",
  metaTitle: "Revenue Leakage in UK Professional Firms",
  metaDescription:
    "Revenue leakage is earned money that never reaches the bank. See five leak points in a UK professional firm, the figures behind each and where to start.",
  summary:
    "Revenue leakage is money a professional firm has earned and does not collect. This pillar guide maps five leak points from pricing to renewal, gives the published figures behind each one, shows how to size the leak in pounds, and links to the guide that goes deeper on every point.",
  topic: "Revenue leakage",
  published: PUBLISHED,
  modified: PUBLISHED,
  checked: CHECKED,
  service: { href: "/services/ai-readiness-audit", label: "AI Readiness Audit" },
  industry: { href: "/industries/accountancy-firms", label: "Revenue recovery for accountancy firms" },
  insightSlugs: ["ai-productivity-customer-support-nber", "simply-business-sme-insights-2026"],
  relatedGuides: [
    "unbilled-wip-uk-law-firms",
    "lock-up-days-explained",
    "chasing-late-invoices-uk-late-payment-law",
    "accountancy-debtor-days-and-wip",
    "renewal-leakage-insurance-brokers-ifas",
    "revenue-recovery-professional-firms-options",
  ],
  body: [
    p(
      "A professional firm can win good work, do it well and still end the year short of cash. The shortfall is rarely one big failure. It is a set of small gaps along the path from the first enquiry to the final payment, each of which loses a little. Revenue leakage is the name for the total: money the firm has earned or could have earned that never reaches the bank.",
    ),
    p(
      "This guide is the map. It names five leak points, gives the published figure or rule behind each, shows how to put a pound value on your own leak, and points to the guide that covers each point in depth. It is written for UK firms that bill after doing the work: law firms, accountancy practices, brokers, advisers and consultancies. It is general information from the sources linked below and not legal, tax or regulatory advice.",
    ),
    h("What is revenue leakage in a professional firm?"),
    p(
      "Our working definition: revenue leakage is the gap between the value of work done, at the firm's full charge-out rates, and the cash that reaches the bank. It has two parts that behave differently. The first is lost value: work written off, under-priced or never billed, which does not come back. The second is delayed value: work billed late or paid late, which does come back but makes the firm fund its clients in the meantime.",
    ),
    p(
      "The Institute of Legal Finance and Management (ILFM) measures the delayed part as [lock-up, the time it takes a firm to convert work undertaken into cash received](https://www.ilfm.org.uk/site/blog/ilfm-blog/lockup-management-in-law-firms-why-it-matters). ICAEW, the chartered accountants' body, describes the lost part as under-recovery and notes that it is [largely a hidden cost because it does not appear in most firms' profit and loss accounts](https://www.icaew.com/technical/practice-resources/run-and-grow/fees-and-charge-out-rates). A firm that tracks only one of the two sees half the problem.",
    ),
    table(
      "The five leak points, what leaks at each and where to read more",
      ["Leak point", "What leaks", "How to measure it", "Guide"],
      [
        "1. Pricing and scope",
        "Work done outside the agreed fee",
        "Recovery rate: fees raised divided by work at full charge-out rates",
        "[Accountancy debtor days and WIP](/guides/accountancy-debtor-days-and-wip)",
      ],
      [
        "2. Time capture and billing",
        "Unrecorded time, work billed late",
        "WIP days: unbilled WIP divided by daily fee income",
        "[Unbilled WIP](/guides/unbilled-wip-uk-law-firms)",
      ],
      [
        "3. Delivering a correct bill",
        "Bills that restart the legal clock or invite disputes",
        "Share of bills queried or reissued",
        "[Unbilled WIP](/guides/unbilled-wip-uk-law-firms)",
      ],
      [
        "4. Collection",
        "Invoices paid late or not at all",
        "Debtor days: unpaid billed fees divided by daily fee income",
        "[Late payment law](/guides/chasing-late-invoices-uk-late-payment-law)",
      ],
      [
        "5. Renewal and recurring fees",
        "Renewals missed, ongoing fees out of step with service delivered",
        "Renewals diarised and reviews delivered against fees charged",
        "[Renewal leakage](/guides/renewal-leakage-insurance-brokers-ifas)",
      ],
    ),
    p(
      "Add the two timing measures together and you have lock-up. Our guide to [lock-up days](/guides/lock-up-days-explained) gives the formula and a worked example.",
    ),
    h("Is work scoped and priced so that it can be recovered?"),
    p(
      "The first leak happens before any work is done. ICAEW's guidance says the best advice from practice management consultants, whether a fee is agreed on time, on a fixed basis or on performance, is to price work for profit, because anything else is unsustainable beyond the short term. It gives an example: a practice with £400,000 of fees and an 85% recovery rate. Grossed up, that practice did £470,000 of work at full charge-out rates and wrote off £70,000.",
    ),
    p(
      "ICAEW also shows how scope leaks in. A firm quotes £3,000 provided the client reconciles the bank and writes up the fixed asset register. The client does neither and staff do the work themselves, so the fixed fee covers more work than it was priced for. Quoting the extra at the start, £200 for the bank reconciliation and £150 for the register, gives a fee of £3,350 if the firm has to do both, and in ICAEW's example that lifts recovery from 85% to 95%.",
    ),
    h("Is time captured and billed promptly?"),
    p(
      "The ILFM says late or incomplete time recording can delay billing and distort the value of work in progress, and that work stays unbilled when billing decisions are postponed, matters are not reviewed regularly, or firms wait until completion rather than billing at appropriate milestones. The cure is mechanical and owned: a recording rule, a monthly review and a named person with a date against each aged matter. Our [unbilled WIP guide](/guides/unbilled-wip-uk-law-firms) gives the afternoon method.",
    ),
    h("Is the bill correct and delivered properly?"),
    p(
      "A bill can be accurate and still slow you down. For solicitors, [section 69 of the Solicitors Act 1974](https://www.legislation.gov.uk/ukpga/1974/47/section/69) says that, subject to the Act, no action shall be brought to recover costs before one month after delivery of a bill that meets the section's requirements. A bill that is not signed, or not delivered in a permitted way, can mean the one-month wait has not started. For accountants, ICAEW notes that lack of understanding of the basis of fees regularly contributes to client complaints, and that a clear and detailed letter of engagement before work starts helps avoid fee disputes.",
    ),
    h("Is the invoice collected on time?"),
    p(
      "The law gives business creditors more than most firms use. GOV.UK says an agreed payment date must usually be within 60 days for business transactions, and that if none is agreed payment is late 30 days after the invoice is received or the service is provided, whichever is later. [Statutory interest is 8% plus the Bank of England base rate](https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt), and [section 5A of the 1998 Act](https://www.legislation.gov.uk/ukpga/1998/20/section/5A) adds a fixed sum of £40, £70 or £100 depending on the size of the debt. The steps before a court claim are in our [late payment guide](/guides/chasing-late-invoices-uk-late-payment-law).",
    ),
    h("Do recurring fees renew and match the service delivered?"),
    p(
      "Recurring income leaks in a quieter way. The Financial Conduct Authority (FCA) reviewed ongoing advice services at 22 of the largest advice firms and found that, [on the data provided, suitability reviews were delivered in around 83% of cases](https://www.fca.org.uk/publications/multi-firm-reviews/ongoing-financial-advice-services), clients declined or did not respond in a further 15%, and in fewer than 2% the firm had not attempted a review. The same page says about 80% of revenue from adviser charges relates to ongoing services from around 4 million clients. For brokers and advisers, matching fees charged to services delivered is the leak check. Our [renewal leakage guide](/guides/renewal-leakage-insurance-brokers-ifas) goes through it.",
    ),
    h("What happens upstream: do enquiries ever become work?"),
    p(
      "An enquiry that is not found or not answered never becomes work in progress, so it never appears on any leakage report. That is why we treat search visibility and enquiry handling as the upstream end of the same chain. Our [SEO and AI search visibility service](/services/seo) covers technical SEO, content, structured data and AI-search readiness for UK small and mid-sized firms, and our [enquiry desk](/services/enquiry-desk) covers what happens after the contact form is filled in. We do not claim a search ranking for any firm. We claim only that a page nobody can find cannot generate an instruction.",
    ),
    h("When does a spreadsheet stop being enough?"),
    p(
      "Most firms start with an export and a spreadsheet, and that is the right first step. The spreadsheet stops being enough when three things are true: the monthly pack takes a day or more to assemble by hand, two people hold different versions of the same number, or the data lives in three systems that never talk to each other. Our [custom software service](/services/custom-software) builds internal tools and admin panels for that stage, such as a billing-review screen that reads the practice system and shows aged WIP with an owner and a date per row. Build it only after the manual review has told you what the screen needs to show.",
    ),
    h("How do you size the leak in pounds?"),
    p(
      "Use your own numbers and keep the two parts apart. Our arithmetic on invented figures: a firm raises £2,000,000 of fees at a 90% recovery rate, so it did about £2,222,222 of work at full rates and wrote off £222,222. Raising recovery by three points to 93% lifts fees to about £2,066,667, a gain of about £66,667 a year that repeats every year.",
    ),
    p(
      "Now the timing half. Daily fee income is £5,479. Cutting lock-up by 10 days releases about £54,800 of cash, once. The two figures are different in kind. The recovery gain is income that recurs. The lock-up release is working capital that is freed one time and then stays freed. Do not add them into one headline number. These figures are invented to show the method and are not a benchmark for any firm.",
    ),
    h("Which symptoms point to which leak?"),
    p(
      "Most partners notice the symptom before they can name the leak. The table below is our own reading of the five leak points, a working guide and not a published diagnostic. Treat it as a way to choose which measure to calculate first.",
    ),
    table(
      "Common symptoms, the leak point they suggest and the first measure to calculate",
      ["Symptom you notice", "Leak point it suggests", "First measure"],
      ["Busy fee earners but thin month-end billing", "Time capture and billing", "WIP days"],
      ["Healthy billing but a stretched overdraft", "Collection", "Debtor days"],
      ["Fixed-fee jobs that always overrun", "Pricing and scope", "Recovery rate by job type"],
      ["Clients querying or disputing bills", "Delivering a correct bill", "Share of bills reissued"],
      ["Revenue falls with no clear lost client", "Renewal and recurring fees", "Renewals diarised against outcomes"],
    ),
    p(
      "A firm often has more than one symptom. Start with the one that costs the most cash, calculate its measure for the last twelve months, and only then decide whether you need outside help. Re-run the same measures every month on the same basis, because the trend tells you more than any single reading.",
    ),
    h("Where should a firm start?"),
    ol(
      "Calculate WIP days and debtor days for the last twelve months, month by month, on one basis.",
      "Calculate the recovery rate on your ten largest engagements from the gross work value.",
      "List the ten largest aged balances, billed and unbilled, with an owner and a date each.",
      "Check the payment term on your last twenty invoices against what the client actually did.",
      "For recurring fees, match the fee ledger to the delivery log for one quarter.",
    ),
    p(
      "Our free [Leak Scan](/tools) walks through where cash drops out of that chain and costs nothing. If you want an independent view of the numbers, the [pricing page](/pricing) lists the fixed fees: an AI Second Opinion from £400, an AI Readiness Audit from £1,500, and fix-and-recover set-up from £1,200 then from £300 a month. Our guide on [choosing between an audit, a collection route and a process fix](/guides/revenue-recovery-professional-firms-options) helps you pick.",
    ),
    faq(
      qa(
        "What is revenue leakage?",
        "In our working definition it is the gap between the value of work done at full charge-out rates and the cash that reaches the bank. It includes lost value, such as write-offs, and delayed value, such as late billing and late payment.",
      ),
      qa(
        "How is revenue leakage different from lock-up?",
        "Lock-up, as the ILFM describes it, is the time taken to turn work into cash, and it measures delay. Leakage also includes value that is lost for good, which ICAEW describes as under-recovery.",
      ),
      qa(
        "Where does most revenue leakage happen?",
        "We have not read a primary source that ranks the leak points, so we do not give a percentage. Measure your own firm: recovery rate for pricing and scope, WIP days for billing, and debtor days for collection.",
      ),
      qa(
        "Can a firm charge interest on late business invoices?",
        "Yes. GOV.UK states that statutory interest on late business payments is 8% plus the Bank of England base rate unless a contract sets a different rate. Send a new invoice if you decide to add interest.",
      ),
      qa(
        "What should a small firm do first?",
        "Measure before you buy anything. WIP days, debtor days and recovery rate on the last twelve months take a spreadsheet and two or three exports, and they show which leak point is largest.",
      ),
    ),
  ],
  sources: [
    SRC.ilfm,
    SRC.icaewFees,
    SRC.solAct69,
    SRC.govLate,
    SRC.govInterest,
    SRC.lpcda5a,
    SRC.fcaOngoing,
  ],
};

const accountancy: Guide = {
  slug: "accountancy-debtor-days-and-wip",
  title: "Debtor days and WIP in an accountancy practice: measure, recover, collect",
  metaTitle: "Accountancy Practice Debtor Days and WIP",
  metaDescription:
    "Measure WIP days, debtor days and recovery rate in an accountancy practice. Worked example, ICAEW's recovery-rate arithmetic and the collection steps.",
  summary:
    "An accountancy practice leaks cash in three places: work that is under-recovered, work that is billed late and bills that are paid late. This guide gives a formula for each, a worked example, ICAEW's published recovery-rate arithmetic, and the collection steps that apply to company and sole-trader clients.",
  topic: "Accountancy practices",
  published: PUBLISHED,
  modified: PUBLISHED,
  checked: CHECKED,
  service: { href: "/services/ai-automation", label: "AI workflow automation" },
  industry: { href: "/industries/accountancy-firms", label: "Revenue recovery for accountancy firms" },
  insightSlugs: ["uk-sme-ai-adoption-bcc-atos-2026", "ai-productivity-customer-support-nber"],
  relatedGuides: [
    "revenue-leakage-professional-firms",
    "lock-up-days-explained",
    "chasing-late-invoices-uk-late-payment-law",
  ],
  body: [
    p(
      "Accountancy practices bill for time, for fixed fees and for a mix of both, often on a monthly or annual cycle that is tied to filing dates. That rhythm hides leakage. A job finishes in March, the bill goes out in April, the client pays in June, and the partners see a healthy order book while the bank balance tells a different story. This guide gives a practice three numbers to track, a worked example, and the collection routes that apply when the client is a limited company and when the client is a sole trader.",
    ),
    p(
      "It builds on our general guides to [lock-up days](/guides/lock-up-days-explained) and [unbilled WIP](/guides/unbilled-wip-uk-law-firms), and uses ICAEW's practice management guidance for the accountancy-specific arithmetic. It is general information, not legal, tax or regulatory advice.",
    ),
    table(
      "Accountancy practice key figures and where each one comes from",
      ["Measure", "Figure", "Source"],
      ["Recovery rate, ICAEW example", "£400,000 raised on £470,000 of work at full rates is 85%", "ICAEW"],
      ["Same example at 90% recovery", "£26,000 of time released, or fees of £423,000", "ICAEW"],
      ["Scope example fee", "£3,000 plus £200 and £150 extras gives £3,350, recovery from 85% to 95%", "ICAEW"],
      ["Payment term for business customers", "Usually within 60 days if agreed; otherwise late 30 days after invoice or service", "GOV.UK"],
      ["Statutory interest", "8% plus the Bank of England base rate", "GOV.UK"],
      ["Fixed sum per late invoice", "£40, £70 or £100 by debt size", "Late Payment Act 1998, s5A"],
      ["Sole-trader debtor, reply period", "30 days from the date on the Letter of Claim", "Pre-Action Protocol for Debt Claims"],
      ["Our worked example, £800,000 of fees", "43.8 WIP days plus 60.2 debtor days, 104.0 lock-up days", "Our arithmetic on invented figures"],
    ),
    h("What are WIP days, debtor days and recovery rate?"),
    p(
      "Three ratios cover the cycle. WIP days is unbilled work in progress divided by average daily fee income. Debtor days is unpaid billed fees divided by the same daily figure. Recovery rate is fees raised divided by the value of the work at full charge-out rates. The first two are our working convention, built on the lock-up definition from the [ILFM](https://www.ilfm.org.uk/site/blog/ilfm-blog/lockup-management-in-law-firms-why-it-matters), which defines lock-up as the time it takes to convert work undertaken into cash received. The third is the measure ICAEW uses in its guidance on [fees and charge-out rates](https://www.icaew.com/technical/practice-resources/run-and-grow/fees-and-charge-out-rates).",
    ),
    h("How do you calculate them? A worked example"),
    p(
      "Our arithmetic, with invented figures. A practice raises £800,000 of fees a year, so daily fee income is £2,192 (£800,000 divided by 365, rounded). Unbilled WIP is £96,000, which is 43.8 days. Unpaid billed fees are £132,000, which is 60.2 days. Lock-up is 104.0 days. Cutting 10 days releases about £21,900 of cash. The debtor half is larger, so a chasing routine would release more than a faster billing run.",
    ),
    p(
      "Use the same basis for both balances. If debtors include VAT and WIP does not, the debtor figure will read worse than it is. Pick net or gross and keep it every month.",
    ),
    h("Why does recovery rate belong next to WIP?"),
    p(
      "ICAEW's point is that recovery rates are usually a percentage, so practitioners overlook the true cost of under-recovery, and that cost does not show in the profit and loss account. Its example: a practice with £400,000 of fees and an 85% recovery rate has, grossed up, done £470,000 of work and written off £70,000. Moving recovery to 90% can either create £26,000 of capacity or lift fees billed to £423,000.",
    ),
    p(
      "WIP is where under-recovery hides before it is written off. A job that sits in WIP for four months and is then billed at a discount shows up as a late bill and a low recovery rate at once. Track the two together by job type, so you can see which work has the worst combination.",
    ),
    h("How does extra work end up unbilled?"),
    p(
      "ICAEW describes a common pattern. A firm agrees a fee on the basis that the client will do certain tasks. The assignment starts and the client has not done them, and staff shrug and do the work themselves. Nobody discussed the fee when that happened, so the practice ends up with the same fixed fee for more work. ICAEW's fix is to quantify the cost of any additional work when the fee is agreed, and to tell the client when the promised input has not arrived so they can choose between doing it and paying for it.",
    ),
    p(
      "ICAEW's other suggestions are plain and effective. Review jobs with poor recovery and look at what went wrong across all future jobs, not only the one in front of you. Look at jobs with excellent recovery and copy what worked. Shorten the time from starting an assignment to finishing it, because a shorter period generally gives a better recovery rate. Avoid starting a job without all the information to complete it. Give staff a time budget for their part. Avoid rounding fees down.",
    ),
    h("What should the engagement letter say?"),
    p(
      "ICAEW says fee disputes can often be avoided by a clear and detailed letter of engagement before work starts, and that lack of understanding of the basis of fees regularly contributes to complaints to ICAEW. It also quotes the Code of Ethics: a professional accountant in public practice should provide, in the fee account or on request and without further charge, such details as are reasonable to enable a client to understand the basis on which the fee account has been prepared.",
    ),
    p(
      "From a leakage point of view, we add four items to the letter: the scope in tasks, the client inputs the fee assumes, the price for each extra task if those inputs do not arrive, and the payment term in days. The term matters because [GOV.UK explains](https://www.gov.uk/late-commercial-payments-interest-debt-recovery) that where a date is agreed it must usually be within 60 days for business transactions, and that where none is agreed the payment is late 30 days after the invoice or the service, whichever is later.",
    ),
    h("How do you collect from limited-company and sole-trader clients?"),
    p(
      "The route depends on who owes the money. For a limited-company client, the statutory interest of 8% plus base rate and the fixed sum of £40, £70 or £100 apply, as set out in our [late payment guide](/guides/chasing-late-invoices-uk-late-payment-law), and the general Practice Direction on Pre-Action Conduct sets the steps before a claim.",
    ),
    p(
      "For a sole-trader client the position differs. The [Pre-Action Protocol for Debt Claims](https://www.justice.gov.uk/courts/procedure-rules/civil/pdf/protocols/debt-pap.pdf) applies to a business claiming payment of a debt from an individual, including a sole trader, and paragraph 1.1 says it does not apply to business-to-business debts unless the debtor is a sole trader. A Letter of Claim should enclose a statement of account, an Information Sheet and Reply Form, and a Financial Statement form. If the debtor does not reply within 30 days of the date on the letter, the creditor may start court proceedings, subject to other obligations. If the debtor says they are seeking debt advice, the creditor must allow a reasonable period.",
    ),
    p(
      "Tag every client in the practice system as company, sole trader or other when you onboard them. The tag decides which letter goes out and saves rewriting a file that started on the wrong footing.",
    ),
    h("What does a chasing routine look like in a practice?"),
    p(
      "Our suggested ladder, which is a working method and not a legal requirement: a friendly reminder a few days before the due date; a second message on the day after it; a phone call within a week of the due date; and a firm email that restates the amount, the due date and the statutory interest position at around thirty days late. Write down each contact on the client record, because the pre-action steps in the protocols turn on what was sent and when.",
    ),
    p(
      "Give one person ownership of the ladder. In a small practice that is often the practice manager, with the partner who owns the client stepping in at the phone call stage. The ladder works because it is dull and predictable. Clients who always pay late learn that a reminder will arrive, and the practice stops relying on goodwill and memory.",
    ),
    h("Can you reclaim VAT on unpaid fees?"),
    p(
      "HMRC's [VAT guide (Notice 700)](https://www.gov.uk/guidance/vat-guide-notice-700) says that if you make taxable supplies to a customer who does not pay, you may be able to reclaim relief from VAT on the bad debt, and points to VAT Notice 700/18 for the detail. Ask the practice's own tax adviser whether a long-overdue balance qualifies before writing it off in full.",
    ),
    h("What does a month-end practice pack contain?"),
    ol(
      "WIP days, debtor days and lock-up days on one basis, with the trailing twelve-month line.",
      "Recovery rate by job type: accounts, tax returns, payroll, advisory.",
      "The ten largest aged WIP balances with owner and next billing date.",
      "The ten largest aged debtors with the last contact, the promise made and the next step.",
      "Clients tagged company or sole trader on every debtor line.",
      "Jobs where extra work was done outside the quoted fee, and whether the extra was billed.",
    ),
    p(
      "If the pack takes more than an hour to produce each month, the data is in too many places. Our [AI workflow automation](/services/ai-automation) service builds the export and the aged lists, and the page for [accountancy firms](/industries/accountancy-firms) shows how we apply the method to the sector. The free [Leak Scan](/tools) is the cheapest first look, and our [pricing page](/pricing) lists the fixed fees.",
    ),
    faq(
      qa(
        "How do you calculate debtor days in an accountancy practice?",
        "On our working convention, divide unpaid billed fees by average daily fee income, where daily fee income is annual fees divided by 365. In our invented example, £132,000 of debtors on £800,000 of fees is 60.2 days.",
      ),
      qa(
        "What is a recovery rate?",
        "In ICAEW's guidance it is the share of work at full charge-out rates that the practice actually bills. A practice with £400,000 of fees and an 85% recovery rate did £470,000 of work and wrote off £70,000.",
      ),
      qa(
        "Do the late payment rules apply to sole-trader clients?",
        "The statutory interest and fixed sum rules apply to late business payments. For the steps before a court claim against a sole trader, the Pre-Action Protocol for Debt Claims applies, with a 30-day reply period from the date on the Letter of Claim.",
      ),
      qa(
        "How do you stop fixed fees leaking?",
        "ICAEW suggests quantifying the cost of additional work when the fee is agreed, for example a quote of £3,000 plus £200 and £150 for tasks the client may not complete, and telling the client when the promised input has not arrived.",
      ),
      qa(
        "Can an accountancy practice reclaim VAT on a client's unpaid invoice?",
        "HMRC's VAT Notice 700 says you may be able to reclaim relief from VAT on a bad debt. Ask your tax adviser whether a specific balance qualifies.",
      ),
    ),
  ],
  sources: [
    SRC.icaewFees,
    SRC.ilfm,
    SRC.govLate,
    SRC.govInterest,
    SRC.lpcda5a,
    SRC.debtPap,
    SRC.pdpac,
    SRC.vat700,
  ],
};

const renewal: Guide = {
  slug: "renewal-leakage-insurance-brokers-ifas",
  title: "Renewal leakage for insurance brokers and IFAs: what the FCA rules and review say",
  metaTitle: "Renewal Leakage for Brokers and IFAs",
  metaDescription:
    "Missed renewals and ongoing fees out of step with service are the quiet leaks for brokers and IFAs. See ICOBS 6.5, the FCA review figures and a reconciliation.",
  summary:
    "Recurring income leaks when renewals slip and when ongoing fees do not match the service delivered. This guide sets out what ICOBS 6.5 requires at renewal, what the FCA found on ongoing advice reviews, how the Consumer Duty defines fair value, and a monthly reconciliation that checks fees against delivery.",
  topic: "Recurring income",
  published: PUBLISHED,
  modified: PUBLISHED,
  checked: CHECKED,
  service: { href: "/services/ai-automation", label: "AI workflow automation" },
  industry: {
    href: "/industries/commercial-insurance-brokers",
    label: "Revenue recovery for commercial insurance brokers",
  },
  insightSlugs: ["bank-of-england-fca-ai-survey-2024", "simply-business-sme-insights-2026"],
  relatedGuides: [
    "revenue-leakage-professional-firms",
    "uk-gdpr-ai-client-data",
    "lock-up-days-explained",
  ],
  body: [
    p(
      "Brokers and advisers earn most of their income from relationships that renew, not from one-off sales. That makes the renewal and the ongoing fee the two places where small failures repeat every year. A renewal that nobody diarised lapses quietly. An ongoing fee that is charged without the matching review is a conduct problem. A review that is delivered and never billed, where the client agreement provides for a fee, is a leak. This guide covers both sides for UK insurance brokers and independent financial advisers (IFAs).",
    ),
    p(
      "It uses three primary sources: the FCA Handbook's rules on renewals, the FCA's review of ongoing financial advice services, and the Consumer Duty's definition of fair value. It is general information and not regulatory advice. Which rules apply to your firm depends on your permissions and the customers you serve, so check with your compliance lead.",
    ),
    table(
      "Renewal and ongoing-service key figures and where each one comes from",
      ["Item", "Rule or figure", "Source"],
      ["ICOBS 6.5.1 scope", "Renewals proposed to a consumer of a general insurance contract of 10 months or more, not a group policy", "FCA Handbook ICOBS 6.5"],
      ["Renewal information", "Renewal premium, comparison with the previous premium, a check-your-cover statement and whether the contract auto-renews", "FCA Handbook ICOBS 6.5"],
      ["Fourth or later renewal", "A statement that the customer may get a better price if they shop around", "FCA Handbook ICOBS 6.5"],
      ["Ongoing advice sample", "22 of the largest advice firms, data covering the previous 7 years", "FCA"],
      ["Reviews delivered", "Around 83% of cases", "FCA"],
      ["Clients declined or did not respond", "A further 15% of cases", "FCA"],
      ["Firm had not attempted a review", "Fewer than 2% of cases", "FCA"],
      ["Share of adviser-charge revenue from ongoing services", "About 80%, from around 4 million clients", "FCA"],
    ),
    h("What does ICOBS 6.5 require at renewal?"),
    p(
      "[ICOBS 6.5](https://www.handbook.fca.org.uk/handbook/ICOBS/6/5.html) applies when a firm proposes to a consumer the renewal of a general insurance contract that is not a group policy and has a duration of 10 months or more. In good time before the renewal, the firm must give the consumer the premium to be paid on renewal; a comparison figure shown consistently so it can be easily compared, which is the premium set at inception or, after mid-term changes, an annualised figure for the premium in effect after the most recent change; a statement that the consumer should check the level of cover is right for them and can compare prices and cover from other providers; and a statement of whether the contract renews automatically or the consumer must act.",
    ),
    p(
      "Where the renewal will be the fourth or a later one, the firm must add the statement: “You have been with us a number of years. You may be able to get the insurance cover you want at a better price if you shop around.” The information must be given clearly and accurately, in writing or another durable medium, and in a way that draws the consumer's attention to it as key information.",
    ),
    p(
      "ICOBS 6.5 is a consumer rule. A broker whose book is commercial clients will have a different set of obligations, and we do not set them out here. The leakage point is the same either way: a renewal that is not diarised, prepared and sent in good time is a renewal that may go elsewhere or lapse.",
    ),
    h("How do renewals leak?"),
    p(
      "In our reading, renewals leak at four points. The renewal is not diarised, so nobody prepares it. It is prepared late, so the client has no time to compare and shops elsewhere. It is sent without the required statements, which is a compliance gap as well as a service gap. Or it is agreed and the fee or commission for mid-term changes is never invoiced. None of these needs a large system to fix. They need a renewal calendar with owners.",
    ),
    p(
      "Our suggested calendar for a small broker, which is a process and not a regulatory requirement: list every renewal date 90 days ahead; assign an owner at 90 days; send the renewal pack at no later than 30 days, or earlier if the market needs time; chase an unanswered renewal at 14 days; and record the outcome, renewed, moved or lapsed, in the same list. The record of outcomes is the leakage report.",
    ),
    p(
      "Our arithmetic on invented figures shows why it is worth the effort. A broker has 400 policies at an average of £350 of annual income. If 6% lapse without anyone noticing in time, that is 24 policies and £8,400 of income a year. The figures are invented to show the method. Count your own lapses for one year before judging whether the problem is large.",
    ),
    h("What did the FCA find on ongoing advice reviews?"),
    p(
      "The FCA wrote on 15 February 2024 to 22 of the largest advice firms asking for data on delivery of ongoing advice over the previous seven years. Its page on [ongoing financial advice services](https://www.fca.org.uk/publications/multi-firm-reviews/ongoing-financial-advice-services) says that, on the data provided, suitability reviews were delivered in around 83% of cases. In a further 15% of cases clients declined or did not respond to the offer of a review. In fewer than 2% of cases the firm had not attempted to conduct a review, which the FCA says will need to be put right. It did not view the issue as systemic at that point and said it would keep monitoring.",
    ),
    p(
      "The page also records that firms can charge for ongoing services that include personal recommendations and related services, or related services alone, provided they relate to an earlier personal recommendation from the firm, and that about 80% of revenue from adviser charges relates to ongoing services from around 4 million clients. The services offered vary and are set out in individual client contracts, so the facts of each relationship matter.",
    ),
    h("How do ongoing fees leak, in both directions?"),
    p(
      "Read together, the FCA figures describe a two-way risk. Where fees are charged and no review happens, the firm has a conduct problem and a refund risk, which is a leak of a different shape. Where a review is delivered and a fee that the client agreement provides for is never charged, the firm has given work away. Both come from one cause: the fee ledger and the delivery log are kept in different places and nobody compares them.",
    ),
    p(
      "Our monthly reconciliation takes an hour. Export the ongoing-fee ledger by client. Export the review log by client. For each client write one of four codes: fee charged and review delivered; fee charged and review pending with a booked date; fee charged and no review booked; review delivered and no fee charged. Only the first two are clean. The other two go to the responsible adviser with a date.",
    ),
    h("What does the Consumer Duty say about value at renewal?"),
    p(
      "[PRIN 2A.4](https://www.handbook.fca.org.uk/handbook/PRIN/2A/4.html) defines value as the relationship between the amount a retail customer pays for the product and the benefits they can reasonably expect to get, and says a product provides fair value where the amount paid is reasonable relative to the benefits. It requires a manufacturer to ensure its products provide fair value to retail customers in the target market and to carry out a value assessment and review it regularly. The manufacturer must be satisfied that fair value will hold for a reasonably foreseeable period, including, for a product that renews, following renewal.",
    ),
    p(
      "The rules on manufacturers do not automatically describe a broker or an adviser, whose role may be distribution instead. We have not set out the distributor rules, so check with your compliance lead which role your firm holds. The leakage lesson holds in either case: a client who pays more each year for the same cover or service is a client who may ask what they are getting, and a firm with a clean fee-to-delivery record answers that quickly.",
    ),
    h("Where do AI tools fit, and what do they need?"),
    p(
      "A renewal calendar and a fee-to-delivery reconciliation are both well suited to automation, because they are list-matching tasks on structured data. They also use client data, which brings in the UK GDPR. Read our guide to [UK GDPR and AI client data](/guides/uk-gdpr-ai-client-data) before client records go into any new tool. Our [AI workflow automation](/services/ai-automation) service builds the export, the calendar and the reconciliation, and the pages for [commercial insurance brokers](/industries/commercial-insurance-brokers) and [IFAs and wealth managers](/industries/ifas-wealth-managers) show the sector detail. The free [Leak Scan](/tools) is the cheapest first look, and the [pricing page](/pricing) lists fixed fees.",
    ),
    faq(
      qa(
        "What must a renewal notice contain under ICOBS 6.5?",
        "For a consumer renewing a general insurance contract of 10 months or more that is not a group policy, the firm must give the renewal premium, a comparison with the previous premium, a statement to check the cover and compare alternatives, and a statement of whether the contract renews automatically. For a fourth or later renewal it must add the statement that the customer may get a better price if they shop around.",
      ),
      qa(
        "How often did advisers deliver ongoing reviews in the FCA's sample?",
        "On the data from 22 of the largest advice firms, reviews were delivered in around 83% of cases, clients declined or did not respond in a further 15%, and the firm had not attempted a review in fewer than 2%.",
      ),
      qa(
        "What does fair value mean under the Consumer Duty?",
        "PRIN 2A.4 defines value as the relationship between the amount a retail customer pays and the benefits they can reasonably expect, and a product provides fair value where the amount paid is reasonable relative to those benefits.",
      ),
      qa(
        "How can a small broker track renewals?",
        "A renewal list with a 90-day lead, an owner, a send date and a recorded outcome is enough for most small books. The recorded outcomes, renewed, moved or lapsed, give you a lapse rate to act on.",
      ),
      qa(
        "How do you check ongoing fees against services delivered?",
        "Match the fee ledger to the review log client by client each month and code each as clean, pending, charged with no review booked, or delivered with no fee. Send the last two to the responsible adviser with a date.",
      ),
    ),
  ],
  sources: [SRC.icobs65, SRC.fcaOngoing, SRC.prin2a4],
};

const options: Guide = {
  slug: "revenue-recovery-professional-firms-options",
  title: "Revenue recovery for professional firms: audit, collection or process fix?",
  metaTitle: "Revenue Recovery for Professional Firms",
  metaDescription:
    "Debt collection touches only invoiced debt. See which leaks an audit, a collection route and a process fix each cover, and a seven-question way to choose.",
  summary:
    "A professional firm that wants to recover revenue can hire a collector, commission a review, or fix its own process. This guide shows which half of the cash cycle each one touches, what the law lets you do yourself, and a seven-question checklist for choosing, with our own fixed prices stated.",
  topic: "Choosing a route",
  published: PUBLISHED,
  modified: PUBLISHED,
  checked: CHECKED,
  service: { href: "/services/ai-readiness-audit", label: "AI Readiness Audit" },
  industry: { href: "/industries/law-firms", label: "Revenue recovery for UK law firms" },
  insightSlugs: ["uk-sme-ai-adoption-bcc-atos-2026", "dsit-ai-adoption-research-2026"],
  relatedGuides: [
    "revenue-leakage-professional-firms",
    "lock-up-days-explained",
    "chasing-late-invoices-uk-late-payment-law",
  ],
  body: [
    p(
      "A partner who decides the firm is leaking cash faces an early choice of route. Hire a collector to chase old debts. Commission an outside review of the whole cycle. Or fix the firm's own process and keep the work in house. The right answer depends on where the cash is stuck, and most firms choose before they have measured. This guide sets out what each route can and cannot reach, what the law lets a firm do itself, and a checklist for choosing.",
    ),
    p(
      "We sell one of these routes, so read this with that in mind. Where a claim rests on a source, the source is linked. Where it is our judgement, we say so. This is general information, not legal advice.",
    ),
    table(
      "Three routes to recovering revenue and what each one touches",
      ["Route", "Touches", "Does not touch", "Fits when"],
      [
        "Collection or debt recovery",
        "Invoices already issued and overdue",
        "Unbilled WIP, pricing, scope and renewals",
        "The ledger is large and old, and billing is already prompt",
      ],
      [
        "Outside review of the whole cycle",
        "WIP, billing, collection and renewals, as a diagnosis",
        "Fixing the habits that caused the leak, unless the review includes it",
        "You do not know which half of the cycle is larger",
      ],
      [
        "Fix your own process",
        "The cause: recording, milestones, terms, chasing, renewals",
        "Old debts that need a formal claim",
        "You have measured and know the leak point",
      ],
    ),
    h("What is revenue recovery for a professional firm?"),
    p(
      "Revenue recovery means getting back money the firm has earned and not collected. It splits into two jobs that need different tools. The first is recovering what is already invoiced and overdue. The second is recovering what is earned and not yet invoiced, plus what is lost at the point of pricing. The [ILFM defines lock-up](https://www.ilfm.org.uk/site/blog/ilfm-blog/lockup-management-in-law-firms-why-it-matters) as the time it takes a firm to convert work undertaken into cash received, built from WIP days before the bill and debtor days after it. A collector can only act on the second half of that definition.",
    ),
    h("What did we find when we searched for it?"),
    p(
      "On 28 October 2026 we searched Bing UK for “revenue recovery consultancy UK professional firms”. The results were generic profit-recovery, debt-collection and directory pages. None served professional firms specifically. That is a statement about that one query on that day, not a claim about every provider. It does mean a partner who types the phrase will find services built for retail and supplier-invoice recovery before they find anything designed around WIP, recovery rate and engagement letters.",
    ),
    h("Which half of the cycle is larger in your firm?"),
    p(
      "Measure before choosing. Our working formulas, built on the ILFM definition: WIP days equals unbilled WIP divided by daily fee income, and debtor days equals unpaid billed fees divided by the same figure. Our arithmetic on invented figures: with £2,000,000 of fees and daily fee income of £5,479, WIP of £250,000 is 45.6 days and debtors of £330,000 are 60.2 days. Here the debtor half is larger. A collection route would reach only that half, and the earlier half would keep leaking.",
    ),
    p(
      "Now reverse the split: WIP of £420,000 is 76.7 days and debtors of £150,000 are 27.4 days. A collector has little to do in that firm, because the money is not stuck in invoices. It is stuck in unbilled work. See our guide to [unbilled WIP](/guides/unbilled-wip-uk-law-firms).",
    ),
    h("When is a collection route the right move?"),
    p(
      "Use collection when the invoices are valid, the term has passed, the client has stopped replying and you have run your own ladder. Before you hand a debt over, know what you can do yourself. GOV.UK states that [statutory interest on late business payments is 8% plus the Bank of England base rate](https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt), and [section 5A of the 1998 Act](https://www.legislation.gov.uk/ukpga/1998/20/section/5A) gives a fixed sum of £40, £70 or £100 by debt size. The general Practice Direction on Pre-Action Conduct sets the steps before a claim, as our [late payment guide](/guides/chasing-late-invoices-uk-late-payment-law) explains.",
    ),
    p(
      "If the debtor is an individual or a sole trader, the [Pre-Action Protocol for Debt Claims](https://www.justice.gov.uk/courts/procedure-rules/civil/pdf/protocols/debt-pap.pdf) applies instead, with a 30-day reply period from the date on the Letter of Claim. Whoever sends that letter, whether your firm or an agent, needs to follow it. A debt also runs towards a time limit: for a simple contract, [section 5 of the Limitation Act 1980](https://www.legislation.gov.uk/ukpga/1980/58/section/5) sets six years from when the cause of action accrued. An old ledger is a reason to act, and a reason to take legal advice first.",
    ),
    p(
      "If a debt becomes bad, HMRC's [VAT guide (Notice 700)](https://www.gov.uk/guidance/vat-guide-notice-700) says you may be able to reclaim relief from VAT on it. Ask your tax adviser.",
    ),
    h("When is an outside review the right move?"),
    p(
      "Use a review when you cannot say which half of the cycle is larger, when the figures sit in three systems, or when the partners disagree about the cause. The output should be a measured split between WIP and debtors, a recovery rate by work type, and a ranked list of leak points with a pound value on each. If a review ends in a report with no owners and no dates, it has not recovered anything. We say the same about our own work: every aged matter leaves with a name and a date against it.",
    ),
    p(
      "Ask any reviewer, including us, for four things in writing before you commission the work: the data they need and how it will be handled, the deliverable in plain terms, a fixed price, and how long they will keep your data afterwards. Where client records are involved, read our guide to [UK GDPR and AI client data](/guides/uk-gdpr-ai-client-data) first. A reviewer who is unwilling to put those four things on paper is not ready to touch your ledger.",
    ),
    h("When is a process fix the right move?"),
    p(
      "Fix the process when the same leak recurs. ICAEW's guidance on [fees and charge-out rates](https://www.icaew.com/technical/practice-resources/run-and-grow/fees-and-charge-out-rates) is a good model of what a fix looks like in practice: quantify extra work when the fee is agreed, review jobs with poor recovery for causes that apply to every future job, shorten the time from start to completion, give staff time budgets, and avoid rounding fees down. The ILFM adds billing at appropriate milestones, regular matter review, and shared expectations between fee earners, partners, management and finance.",
    ),
    p(
      "A process fix is slower than a collector and cheaper in the long run, because it removes the cause. Its risk is drift: without a monthly measure the habits return. Keep the WIP-days and debtor-days line on one page every month.",
    ),
    h("How do you choose? Seven questions"),
    ol(
      "Do you know your WIP days and debtor days for the last twelve months on one basis? If not, measure first.",
      "Which half is larger? If WIP, a collector cannot help. If debtors, collection and chasing come first.",
      "What is your recovery rate on your ten biggest engagements? If it is below where you want it, the cause sits at pricing and scope.",
      "How old is the oldest debt that matters? Check the limitation date, take legal advice, and act first on the oldest.",
      "Who are the debtors: companies, sole traders or individuals? The pre-action steps differ.",
      "Who owns each aged matter or debt, and by what date? If nobody, assign that before spending anything.",
      "Will anything you buy leave your people with a routine, or only with a report?",
    ),
    h("What does our route cost?"),
    p(
      "We publish fixed prices on the [pricing page](/pricing). The first step is a free [Leak Scan](/tools) that shows where cash leaves the chain. An AI Second Opinion on a specific tool or plan is from £400, and an [AI Readiness Audit](/services/ai-readiness-audit) is from £1,500. Fix-and-recover set-up starts from £1,200, then from £300 a month. Projects start from £6,000 and are fixed price once the Leak Scan has been done. We do not take a percentage of recovered cash and we do not chase your clients on your behalf. Our [pillar guide on revenue leakage](/guides/revenue-leakage-professional-firms) shows how the five leak points connect.",
    ),
    faq(
      qa(
        "What is the difference between debt collection and revenue recovery?",
        "Debt collection acts on invoices already issued and overdue. Revenue recovery in our usage also covers work not yet billed and money lost at pricing and scope, which a collector cannot reach.",
      ),
      qa(
        "Can a professional firm charge interest on late invoices itself?",
        "Yes. GOV.UK states that statutory interest on late business payments is 8% plus the Bank of England base rate unless a contract sets a different rate. Send a new invoice if you decide to add interest.",
      ),
      qa(
        "Do the pre-action rules change if the debtor is a sole trader?",
        "Yes. The Pre-Action Protocol for Debt Claims applies to a business claiming payment of a debt from an individual, including a sole trader, and does not apply to other business-to-business debts. The Letter of Claim starts a 30-day reply period.",
      ),
      qa(
        "How long do you have to claim an unpaid invoice?",
        "For a simple contract, section 5 of the Limitation Act 1980 sets six years from the date the cause of action accrued. Take legal advice on the date for your own contract.",
      ),
      qa(
        "Should a firm measure its leak before buying help?",
        "Yes. WIP days, debtor days and recovery rate on the last twelve months show which route fits. A firm with large unbilled WIP and small debtors gains little from collection.",
      ),
    ),
  ],
  sources: [
    SRC.ilfm,
    SRC.icaewFees,
    SRC.govInterest,
    SRC.lpcda5a,
    SRC.pdpac,
    SRC.debtPap,
    SRC.limAct5,
    SRC.vat700,
  ],
};

export const moreGuides: Guide[] = [pillar, accountancy, renewal, options];
