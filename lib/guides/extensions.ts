// Second-pass additions to the five original guides: question-shaped headings, a
// key-figures table, extra sections, an FAQ and any new sources. Every figure is either
// read from a linked source or labelled as our own arithmetic on invented numbers.

import { faq, p, ol, qa, table, ul, h } from "./blocks";
import type { Block } from "./blocks";
import { SRC } from "./sources";
import type { GuideSource } from "./guides";

export interface Extension {
  /** Original h2 text to new h2 text. */
  rename: Record<string, string>;
  /** Blocks inserted before the h2 whose ORIGINAL text is the key. */
  insertBefore: Record<string, Block[]>;
  /** Blocks appended at the end of the body (the FAQ). */
  tail: Block[];
  sources: GuideSource[];
  relatedGuides: string[];
  insightSlugs?: string[];
}

const wip: Extension = {
  rename: {
    "What WIP is, and how to measure it in days": "What is WIP, and how do you measure it in days?",
    "What a published example says it is worth": "How much cash can WIP release? A published example",
    "Why work stays unbilled": "Why does work stay unbilled?",
    "The legal clock for solicitors' bills": "How fast can a solicitor recover unpaid costs?",
    "A one-afternoon WIP review": "How do you run a WIP review in one afternoon?",
    "What to automate and what to leave to a person": "What should you automate, and what stays with a person?",
    "Where to start": "Where should a firm start?",
  },
  insertBefore: {
    "What WIP is, and how to measure it in days": [
      table(
        "WIP key figures and where each one comes from",
        ["Measure", "Figure", "Source"],
        ["Published example, annual fee income", "£10 million, about £27,000 a day", "ILFM"],
        ["Same example at 120 lock-up days", "About £3.2 million tied up in WIP and debtors", "ILFM"],
        ["Same example reduced to 90 days", "About £800,000 released", "ILFM"],
        ["Wait before suing on a solicitor's bill", "One month from delivery of a compliant bill", "Solicitors Act 1974, s69"],
        ["Limitation period for a simple contract", "Six years from when the cause of action accrued", "Limitation Act 1980, s5"],
        ["Our illustration: £2,000,000 fees, £250,000 WIP", "45.6 WIP days", "Our arithmetic on invented figures"],
      ),
    ],
    "What to automate and what to leave to a person": [
      h("What does milestone billing do to the amount you carry?"),
      p(
        "The ILFM lists waiting for completion, instead of billing at appropriate milestones, as a reason work stays unbilled. Our arithmetic on invented figures shows the size of the effect. Suppose a matter earns £5,000 of recorded work in each of six months.",
      ),
      ul(
        "Billed once on completion at the end of month 6: the work from month 1 waits five months for a bill, month 2 waits four, then three, two, one and none. That is 15 months of £5,000, or £75,000 pound-months. Divided by six, the firm carries an average of £12,500 of unbilled work on this matter.",
        "Billed at two milestones, the end of month 3 and the end of month 6: the waits are 2, 1 and 0, twice. That is 6 months of £5,000, or £30,000 pound-months, and an average of £5,000 carried.",
      ),
      p(
        "Same fee, same work, same client. The only change is the bill date, and the average balance the firm funds on that matter falls by 60%. Agree the milestones in the engagement letter so the client expects the bill when it arrives.",
      ),
      h("What should a monthly WIP report show?"),
      p(
        "The ILFM names time recording, WIP and debtors, early intervention, and KPIs with management information as practical controls. A one-page monthly WIP report built on those four headings is enough for most small firms. Ours would carry:",
      ),
      ol(
        "Total unbilled WIP and WIP days, on the same fee-income basis every month.",
        "The five age bands from the afternoon review, with value and number of matters in each.",
        "The ten largest unbilled matters, each with a named owner and a next billing date.",
        "Matters with time recorded and no bill in the last 90 days, listed by fee earner.",
        "Matters where file activity and time entries disagree, which usually means unrecorded time.",
        "The trailing twelve-month line of WIP days, so a partner can see direction at a glance.",
      ),
      p(
        "If a partner cannot read that report in five minutes and name the three matters to bill this week, it is too long. Cut rows until they can.",
      ),
    ],
  },
  tail: [
    h("WIP questions firms ask"),
    faq(
      qa(
        "What is unbilled WIP in a law firm?",
        "Unbilled work in progress is work a firm has done and not yet invoiced. It shows on the management accounts as an asset while the bank balance shows nothing for it.",
      ),
      qa(
        "How do you measure WIP in days?",
        "Divide unbilled WIP by average daily fee income, where daily fee income is annual fee income divided by 365. The ILFM does not prescribe a formula, so this is our working convention. Pick one basis and keep it every month.",
      ),
      qa(
        "How long must a solicitor wait before suing on an unpaid bill?",
        "Under section 69 of the Solicitors Act 1974, and subject to the Act, no action may be brought to recover costs before one month has passed from delivery of a bill that meets the section's requirements. The High Court can allow an earlier action where there is probable cause to believe the paying party is about to leave England and Wales, become bankrupt, compound with creditors or do something else that would prevent or delay payment.",
      ),
      qa(
        "Who should own aged WIP?",
        "The ILFM says these issues are rarely the finance team's responsibility alone and that fee earners, partners, management and finance need shared expectations. Our practical rule is one named person and one date per aged matter.",
      ),
      qa(
        "How often should a WIP review run?",
        "Monthly, on the same basis, with the next review date for each aged matter no more than 30 days out. A falling WIP-days line over several months is the evidence that the review is working.",
      ),
    ),
  ],
  sources: [],
  relatedGuides: ["revenue-leakage-professional-firms", "accountancy-debtor-days-and-wip"],
};

const lockUp: Extension = {
  rename: {
    "The definition": "What are lock-up days?",
    "The formula and a worked example": "How do you calculate lock-up days?",
    "A published example of scale": "What does a published example look like at scale?",
    "Read the two halves separately": "Why read WIP days and debtor days separately?",
    "Why the payment term sets the floor for debtor days": "Why does the payment term set the floor for debtor days?",
    "Six fixes, in the order we would try them": "Which six fixes should you try first?",
    "Where this goes wrong": "Where does lock-up work go wrong?",
    "What to do next": "What should you do next?",
  },
  insertBefore: {
    "The definition": [
      table(
        "Lock-up key figures and where each one comes from",
        ["Measure", "Figure", "Source"],
        ["Lock-up", "WIP days plus debtor days", "ILFM"],
        ["Published example, 120 lock-up days on £10 million of fees", "About £3.2 million tied up", "ILFM"],
        ["Same example cut to 90 days", "About £800,000 released", "ILFM"],
        ["Agreed payment date for business transactions", "Usually within 60 days; a longer period must be fair", "GOV.UK"],
        ["Payment date not agreed", "Late 30 days after the invoice is received or the service is provided, whichever is later", "GOV.UK"],
        ["Statutory interest on late business payments", "8% plus the Bank of England base rate", "GOV.UK"],
        ["Our worked example, £2,000,000 fees", "45.6 WIP days plus 60.2 debtor days, about 105.9 lock-up days", "Our arithmetic on invented figures"],
      ),
    ],
    "Where this goes wrong": [
      h("How do you set a lock-up target?"),
      p(
        "Set the target as a fall against your own trailing twelve months, not against an industry figure. We have not read a primary source for an industry average that we would stand behind, and a borrowed benchmark invites arguments about whose firm is comparable.",
      ),
      p(
        "Our arithmetic on the invented £2,000,000 firm: daily fee income is £5,479. A 10-day cut, from 105.9 days to 95.9, releases about £54,800. Splitting it by half, five days from WIP and five from debtors, gives two jobs a partner can own. Review it monthly and move the target only when a quarter has passed, so one good month does not become the new baseline.",
      ),
      h("How do accountancy practices read lock-up next to recovery rates?"),
      p(
        "ICAEW, the professional body for chartered accountants, makes a related point about recovery rates in its guidance on [fees and charge-out rates](https://www.icaew.com/technical/practice-resources/run-and-grow/fees-and-charge-out-rates). It says under-recoveries rarely appear in a firm's profit and loss account, so they are largely a hidden cost. Its example is a practice with £400,000 of fees and an 85% recovery rate. Grossed up, that practice did £470,000 of work at full charge-out rates and wrote off £70,000.",
      ),
      p(
        "If recovery rises to 90%, ICAEW shows two outcomes. The practice can do the same £400,000 of billing with £26,000 of released time, or it can charge £423,000 for the same work. Lock-up measures how late the money arrives. Recovery measures how much never arrives. A practice that reports only one of them sees half the leak.",
      ),
      h("What should a monthly lock-up review look like?"),
      p(
        "Our suggested format, which is a working method and not a published standard: one page, thirty minutes, the same attendees each month. The page carries the trailing twelve-month line for WIP days, debtor days and lock-up days, all on the same net or gross basis; the ten largest aged unbilled balances; and the ten largest aged unpaid invoices. Each balance has an owner, a next action and a date.",
      ),
      p(
        "One rule keeps the meeting honest: no balance leaves the room without a name and a date against it. At the next meeting the first item is last month's list, and any date that passed without action is read out. If the same balance appears three months running, the question changes from what the next step is to why the last two did not work. The aim is a short routine that nobody can skip, because the ILFM's point is that these issues are rarely the finance team's alone and that fee earners, partners, management and finance need shared expectations.",
      ),
    ],
  },
  tail: [
    h("Lock-up questions firms ask"),
    faq(
      qa(
        "What are lock-up days?",
        "The ILFM defines lock-up as the time it takes a firm to convert work undertaken into cash received. It is generally calculated by combining WIP days, from work done to bill raised, with debtor days, from bill issued to payment received.",
      ),
      qa(
        "How do you calculate lock-up days?",
        "On our working convention, divide unbilled WIP and unpaid billed fees by average daily fee income, then add the two results. Use the same net or gross basis for both balances so the ratio is not distorted.",
      ),
      qa(
        "What is a good number of lock-up days?",
        "We do not quote an industry average because we have not read a primary source for one that we would stand behind. The useful comparison is your own trailing twelve months, with a target set as a fall against that line.",
      ),
      qa(
        "Which half of lock-up should a firm fix first?",
        "The larger half. In our invented example debtors at 60.2 days exceed WIP at 45.6 days, so a chasing routine would release more cash than a faster billing run. A firm with the reverse split should start with billing.",
      ),
      qa(
        "How much cash does one lock-up day release?",
        "One day of lock-up is worth one day of fee income. On £10 million of annual fees that is about £27,397, which is why the ILFM's 30-day reduction is worth about £800,000.",
      ),
    ),
  ],
  sources: [SRC.icaewFees],
  relatedGuides: ["revenue-leakage-professional-firms", "accountancy-debtor-days-and-wip"],
};

const lateInvoices: Extension = {
  rename: {
    "When an invoice becomes late": "When does an invoice become late?",
    "Statutory interest: 8% over base rate": "How much statutory interest can you charge?",
    "The fixed recovery sum": "What is the fixed recovery sum?",
    "What a court expects before you issue a claim": "What must you do before you issue a court claim?",
    "Court claims and mediation": "Should you claim in court or try mediation?",
    "VAT on bad debts": "Can you reclaim VAT on a bad debt?",
    "A four-step chasing ladder": "What does a four-step chasing ladder look like?",
    "Making it routine": "How do you make chasing routine?",
  },
  insertBefore: {
    "When an invoice becomes late": [
      table(
        "Late payment key figures and where each one comes from",
        ["Item", "Rule or figure", "Source"],
        ["Agreed payment date, business transactions", "Usually within 60 days; longer must be fair to both businesses", "GOV.UK"],
        ["Agreed payment date, public authorities", "Usually within 30 days", "GOV.UK"],
        ["No date agreed", "Late 30 days after the invoice is received or the service is provided, if later", "GOV.UK"],
        ["Statutory interest", "8% plus the Bank of England base rate", "GOV.UK"],
        ["Fixed sum, debt under £1,000", "£40", "Late Payment Act 1998, s5A"],
        ["Fixed sum, £1,000 to under £10,000", "£70", "Late Payment Act 1998, s5A"],
        ["Fixed sum, £10,000 or more", "£100", "Late Payment Act 1998, s5A"],
        ["Reply time under the general pre-action Practice Direction", "14 days in a straightforward case, up to 3 months in a very complex one", "Civil Procedure Rules"],
        ["Limitation, simple contract", "Six years from when the cause of action accrued", "Limitation Act 1980, s5"],
      ),
    ],
    "Court claims and mediation": [
      h("Does the Debt Pre-Action Protocol apply to your debt?"),
      p(
        "Sometimes. The [Pre-Action Protocol for Debt Claims](https://www.justice.gov.uk/courts/procedure-rules/civil/pdf/protocols/debt-pap.pdf) applies to a business claiming payment of a debt from an individual, including a sole trader. Paragraph 1.1 says it does not apply to business-to-business debts unless the debtor is a sole trader. So a debt owed by a limited company follows the general Practice Direction described above, and a debt owed by a sole trader follows the Protocol.",
      ),
      p(
        "The Protocol asks for more. A Letter of Claim should state the amount of the debt, whether interest or other charges are continuing, how the debt arose, why any instalment offer is not acceptable, how the debt can be paid, and where to send the completed Reply Form. It should enclose an up-to-date statement of account, an Information Sheet and Reply Form, and a Financial Statement form. It should be posted, and may also be sent by email where you hold an address.",
      ),
      p(
        "The timings differ too. If the debtor does not reply within 30 days of the date at the top of the letter, the creditor may start court proceedings, subject to any other obligations it owes the debtor. If the debtor says they are seeking debt advice, the creditor must allow a reasonable period, and should not start proceedings less than 30 days from receiving the completed Reply Form or from providing any documents the debtor asked for, whichever is later.",
      ),
      p(
        "Before you chase a sole trader, check which type of debtor you have. Using the 14-day business letter on an individual puts the file out of step with the Protocol the court expects.",
      ),
      h("How do you check whether a large customer pays on time?"),
      p(
        "GOV.UK runs a service to [check when large businesses pay their suppliers](https://www.gov.uk/check-when-businesses-pay-invoices). The reports show the average time a large business takes to pay its suppliers and the proportion of payments it does not make on time. A large business here is a company or limited liability partnership with at least two of: £54 million turnover, £27 million on its balance sheet, or 250 employees. It must publish its reports at least twice a year.",
      ),
      p(
        "That gives a supplier a dated, public number before agreeing terms with a big customer. If the published average is longer than the term you are about to accept, the debtor-day half of your lock-up is already decided. Look it up before you sign, and write the result on the file.",
      ),
      h("What should a late-payment diary record?"),
      p(
        "The pre-action steps reward a clean paper trail, since the court takes non-compliance into account on directions and costs. For each late invoice our diary template holds:",
      ),
      ul(
        "Invoice number, amount, due date and the date the customer received it.",
        "The agreed term and where it was agreed, with a copy of the signed engagement letter or order.",
        "Each contact: date, who, channel, what was promised and by when.",
        "Interest and fixed sum calculated to date, and whether a revised invoice has been sent.",
        "The limitation date, six years from when the cause of action accrued, set as a diary alert.",
      ),
    ],
  },
  tail: [
    h("Late payment questions firms ask"),
    faq(
      qa(
        "When is a business invoice legally late in the UK?",
        "GOV.UK says that if a payment date is agreed it must usually be within 60 days for business transactions, and 30 days for public authorities. If no date is agreed, the payment is late 30 days after the customer gets the invoice or after you deliver the goods or provide the service, whichever is later.",
      ),
      qa(
        "How much interest can you charge on a late business invoice?",
        "Statutory interest of 8% plus the Bank of England base rate, unless a contract sets a different rate. GOV.UK says to send a new invoice if you decide to add interest to the money you are owed.",
      ),
      qa(
        "What fixed sum can you claim for a late payment?",
        "Under section 5A of the Late Payment of Commercial Debts (Interest) Act 1998 the sum is £40 for a debt under £1,000, £70 for £1,000 to under £10,000, and £100 for £10,000 or more. If your reasonable recovery costs exceed the fixed sum, you can also claim the difference.",
      ),
      qa(
        "What must you do before a court claim for an unpaid business invoice?",
        "Under the general Practice Direction on Pre-Action Conduct, write to the customer with concise details of the claim and how the amount is calculated, allow a reasonable time for a reply, usually 14 days in a straightforward case, and consider mediation. If the debtor is a sole trader, the Pre-Action Protocol for Debt Claims applies instead, with a 30-day reply period.",
      ),
      qa(
        "How long do you have to sue for an unpaid invoice?",
        "For a simple contract, section 5 of the Limitation Act 1980 sets six years from the date the cause of action accrued. Take legal advice on the accrual date for your particular contract.",
      ),
    ),
  ],
  sources: [SRC.debtPap, SRC.checkPay],
  relatedGuides: ["revenue-leakage-professional-firms", "accountancy-debtor-days-and-wip"],
};

const aiBilling: Extension = {
  rename: {
    "What the research found on routine work": "What does research say about AI on routine work?",
    "What the research found on harder work": "What happens when the task is harder?",
    "What the regulator says": "What does the SRA say about using AI?",
    "Which billing tasks sit on which side": "Which billing tasks suit AI, and which do not?",
    "A sample-test protocol before you trust a tool": "How do you test an AI tool before you trust it?",
    "Confidentiality and data protection": "What about client confidentiality and data protection?",
    "Cost and next steps": "What does it cost, and where do you start?",
  },
  insertBefore: {
    "What the research found on routine work": [
      table(
        "AI productivity findings and where each one comes from",
        ["Study", "Finding", "Source"],
        ["NBER, 5,179 customer support agents", "14% more issues resolved per hour on average", "NBER Generative AI at Work"],
        ["Same study, novice and low-skilled workers", "34% improvement", "NBER Generative AI at Work"],
        ["Same study, experienced and highly skilled workers", "Minimal impact", "NBER Generative AI at Work"],
        ["BCG consultants, 758, tasks inside the AI's capability", "12% more work, 25% faster, quality rated 40% higher", "Harvard Business School Working Knowledge"],
        ["Same study, tasks outside the AI's capability", "19 percentage points less likely to give the right answer", "Harvard Business School Working Knowledge"],
        ["SRA position", "Firms remain responsible and accountable for AI outputs and cannot delegate that to an IT team or provider", "SRA Risk Outlook"],
      ),
    ],
    "Confidentiality and data protection": [
      h("What pass mark should a billing-review test use?"),
      p(
        "The partners set the pass mark in writing before the test, as the protocol says. The number is a judgement. What a small sample can and cannot show is arithmetic, and it is worth knowing before you set the mark.",
      ),
      p(
        "Our arithmetic: if 45 of a sample of 50 flagged matters are correct, the raw result is 90%. A 95% Wilson confidence interval on 45 out of 50 runs from roughly 79% to 96%. So a sample of 50 that reads 90% is compatible with a tool that is right about four times in five. If an error would cost real money or a regulatory problem, either raise the sample size or set a pass mark above the level you can live with at the bottom of that range.",
      ),
      p(
        "Test misses too. Take a closed set where a manual review has already listed every genuine leak, and count how many of those leaks the tool found. A tool that flags 40 of 50 genuine leaks has found 80% of them, whatever its precision looks like.",
      ),
      h("What belongs in the review log?"),
      p(
        "The SRA says supervision systems must cope with the speed of AI, and it expects firms to supervise both the systems and staff use of them. A log is how you show it. Each monthly sample should record:",
      ),
      ul(
        "Date, tool name and version, and the task tested.",
        "Sample size, how the sample was drawn and which fee earners and matter types it covered.",
        "Correct, incorrect and missed counts, with the reviewer's name.",
        "The pass mark set beforehand and whether the tool met it.",
        "The decision: continue, restrict to a narrower task, or stop.",
      ),
      h("Who should own AI billing review in the firm?"),
      p(
        "The SRA's line is that accountability cannot be delegated to an IT team or external provider. In a small firm the practical owner is the partner who owns billing, with the finance lead running the monthly sample and the compliance officer reading the log each quarter. If those are one person, the log needs a second reader.",
      ),
      h("What should you ask an AI vendor before a pilot?"),
      p(
        "Before any client matter data goes into a tool, get written answers to a short list. These are our suggested questions and not a regulatory checklist. Our guide to [UK GDPR and AI client data](/guides/uk-gdpr-ai-client-data) explains why each one matters.",
      ),
      ul(
        "Where is the data processed and stored, and is any of it used to train the vendor's models?",
        "How long is the data retained, and can you delete it on request?",
        "Is the vendor a processor acting on your instructions, and is there a written contract that says so?",
        "What security measures protect the data, and who at the vendor can see it?",
        "What happens to the data, and to your logs, if you stop using the tool?",
      ),
      p(
        "A vendor that cannot answer these in writing has told you what you need to know before the pilot starts.",
      ),
    ],
  },
  tail: [
    h("AI billing review questions firms ask"),
    faq(
      qa(
        "Does AI improve productivity on routine work?",
        "A National Bureau of Economic Research study of 5,179 customer support agents found a 14% average gain in issues resolved per hour, including 34% for novice and low-skilled workers, with minimal impact on experienced workers. Customer support is not billing, so the figure does not transfer directly to your firm.",
      ),
      qa(
        "What goes wrong when AI does harder tasks?",
        "In a study of 758 BCG consultants, on a complex task designed so that AI would struggle without extensive guidance, consultants using AI were 19 percentage points less likely to produce the right answer.",
      ),
      qa(
        "Can a solicitors' firm delegate responsibility for AI outputs?",
        "No. The SRA says firms remain responsible and accountable for the outputs from AI they use, and cannot delegate accountability to an IT team or external provider.",
      ),
      qa(
        "Can you trust AI to check its own accuracy?",
        "Legal Futures records the SRA warning solicitors not to trust AI to judge its own accuracy. The check has to come from outside the tool, which is why we use a sample test against source records.",
      ),
      qa(
        "How large should a sample test be?",
        "We use 50 flagged items as a minimum for a first test. A result of 45 correct out of 50 is 90%, with a 95% Wilson confidence interval of roughly 79% to 96%, so higher-stakes uses need a larger sample or a higher pass mark.",
      ),
    ),
  ],
  sources: [],
  relatedGuides: ["revenue-leakage-professional-firms"],
};

const gdpr: Extension = {
  rename: {
    "Why the rules apply to AI tools": "Why does UK GDPR apply to AI tools?",
    "Article 5: the principles": "What do the Article 5 principles mean for an AI tool?",
    "Article 28: if the vendor handles the data, you need a contract": "Do you need a contract with an AI vendor under Article 28?",
    "Article 32: security": "What does Article 32 require on security?",
    "Article 35: when you need an impact assessment": "When do you need a DPIA under Article 35?",
    "Ten questions to answer before a tool goes live": "Which ten questions should you answer before a tool goes live?",
    "Where to get help": "Where can a small firm get help?",
  },
  insertBefore: {
    "Why the rules apply to AI tools": [
      table(
        "UK GDPR articles that matter for AI tools",
        ["Article", "What it requires", "What to keep on file"],
        ["Article 5", "Six principles, and the controller must be able to demonstrate compliance", "A dated checklist per tool"],
        ["Article 28", "A binding contract with any processor, covering instructions, confidentiality, security, sub-processors, deletion and audits", "The data processing agreement"],
        ["Article 32", "Technical and organisational measures appropriate to the risk", "Staff policy and vendor security statement"],
        ["Article 33", "Breach notification to the regulator without undue delay and, where feasible, within 72 hours", "A breach contact list and a template"],
        ["Article 35", "A DPIA before high-risk processing", "A short DPIA, or a note of why none is needed"],
      ),
    ],
    "Ten questions to answer before a tool goes live": [
      h("What if an AI tool exposes client data? Article 33"),
      p(
        "[Article 33](https://www.legislation.gov.uk/eur/2016/679/article/33) sets the breach clock. In the case of a personal data breach, the controller shall without undue delay and, where feasible, not later than 72 hours after becoming aware of it, notify the regulator, unless the breach is unlikely to result in a risk to the rights and freedoms of natural persons. A late notification must be accompanied by reasons for the delay. The processor must notify the controller without undue delay after becoming aware of a breach.",
      ),
      p(
        "That last sentence matters for an AI vendor. Your 72 hours run from when you, the controller, become aware, so your data processing agreement should say how fast the vendor must tell you. The notification must at least describe the nature of the breach, the categories and approximate numbers of people and records affected, the contact point for more information, the likely consequences, and the measures taken or proposed. The article text on legislation.gov.uk carries amendments, so check the current version for the name of the receiving body.",
      ),
      p(
        "Our rule for a small firm: write a one-page breach note per approved AI tool before it goes live. It lists who tells whom, in what order, and where the contact details for the vendor are kept. The first hour of a breach is a poor time to find the contract.",
      ),
      h("How does this apply to private healthcare groups?"),
      p(
        "Article 35 names large-scale processing of special category data as a case that always requires a DPIA. A group that runs clinics and handles patient records should decide with its data protection lead whether a given AI use falls within that wording before any record goes into a tool. Billing and debtor lists at a healthcare group may carry patient identifiers, so our suggested first step is to test a tool on data with the identifiers removed. Our page on [revenue recovery for private healthcare groups](/industries/private-healthcare-groups) covers where the money leaks in that sector.",
      ),
      h("What should a staff AI-use policy say?"),
      p(
        "Article 32 expects staff to process data only on your instructions, and the SRA notes that some firms prohibit all staff use of online systems beyond their direct control. A one-page policy that carries these headings is enough to start:",
      ),
      ol(
        "Approved tools, listed by name, and the tasks each is approved for.",
        "Data that must never go into any AI tool, such as special category data without a recorded DPIA.",
        "Redaction rules: what to remove before a document is pasted.",
        "Where the output is checked, and by whom, before it reaches a client.",
        "Who to tell, and how fast, if something is pasted into the wrong tool.",
      ),
    ],
  },
  tail: [
    h("UK GDPR and AI questions firms ask"),
    faq(
      qa(
        "Does UK GDPR apply when staff paste client data into an AI chatbot?",
        "Yes. It is processing of personal data, and the firm is responsible for it whether or not it approved the tool. The SRA's report records that the ICO is clear that data protection rights remain when information is used for training or operating an AI.",
      ),
      qa(
        "Do you need a contract with an AI vendor?",
        "Where the vendor processes personal data on your behalf, Article 28 requires a binding contract that covers processing on documented instructions, confidentiality, Article 32 security, sub-processor authorisation, help with data subject requests, deletion or return of data, and audits.",
      ),
      qa(
        "When is a DPIA needed for an AI tool?",
        "Article 35 requires one before processing likely to result in a high risk to individuals. It names three always-required cases, and the ICO adds that innovative technology, including AI, in combination with another criterion such as evaluation or scoring, or sensitive data, is on its list of high-risk processing.",
      ),
      qa(
        "How fast must a data breach be reported?",
        "Article 33 says without undue delay and, where feasible, not later than 72 hours after becoming aware of it, unless the breach is unlikely to result in a risk to people's rights and freedoms. A late report needs reasons for the delay.",
      ),
      qa(
        "Is the ICO's AI guidance final?",
        "At the time we read it, the ICO's guidance on AI and data protection carried a notice that it is under review because of the Data (Use and Access) Act. Check the page for the current position.",
      ),
    ),
  ],
  sources: [SRC.gdpr33],
  relatedGuides: ["revenue-leakage-professional-firms"],
};

export const EXTENSIONS: Record<string, Extension> = {
  "unbilled-wip-uk-law-firms": wip,
  "lock-up-days-explained": lockUp,
  "chasing-late-invoices-uk-late-payment-law": lateInvoices,
  "ai-billing-review-professional-firms": aiBilling,
  "uk-gdpr-ai-client-data": gdpr,
};
