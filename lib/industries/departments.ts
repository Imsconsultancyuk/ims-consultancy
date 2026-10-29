// Department-level view of each sector: where in the client lifecycle revenue
// leaks, what we read to see it, and which of the sector's tools closes it.
// Figures are never repeated here. `pain` points at an entry in the sector's
// own `pains` array, so a pound figure appears only where the sector data
// already states it.

export type StageKey = "win" | "deliver" | "paid" | "keep";

export interface DepartmentStage {
  key: StageKey;
  /** What this department is called in this sector. */
  department: string;
  problem: string;
  /** What we read in the firm's own records to see it. */
  signal: string;
  fix: string;
  /** Index into the sector's `pains`, if one maps directly. */
  pain?: 0 | 1 | 2;
  /** Indexes into the sector's `tools` that close this leak. */
  tools: (0 | 1 | 2)[];
}

export interface SectorDepartments {
  /** The records the audit reads, written as a noun phrase. */
  source: string;
  stages: [DepartmentStage, DepartmentStage, DepartmentStage, DepartmentStage];
}

export const STAGE_LABELS: Record<StageKey, string> = {
  win: "Win",
  deliver: "Deliver",
  paid: "Get paid",
  keep: "Keep and grow",
};

export const DEPARTMENTS: Record<string, SectorDepartments> = {
  "mortgage-brokers": {
    source: "case management system, enquiry inbox and the maturity dates in your CRM",
    stages: [
      {
        key: "win",
        department: "Enquiries and referrals",
        problem: "Referrals and web enquiries wait while advisers sit in appointments.",
        signal: "Time from enquiry to first reply, by source.",
        fix: "A same-day reply drafted for the adviser to approve and send.",
        tools: [],
      },
      {
        key: "deliver",
        department: "Case processing",
        problem: "Cases stall on missing documents and the chasing is done by hand.",
        signal: "Cases with no activity since the last client contact.",
        fix: "A chase list ordered by the date each case needs to complete.",
        tools: [],
      },
      {
        key: "paid",
        department: "Completion and protection",
        problem: "Completions close and the protection conversation never opens.",
        signal: "Completed cases with no protection quote or note.",
        fix: "A prompt to the adviser at completion, with the gap already described.",
        pain: 2,
        tools: [2],
      },
      {
        key: "keep",
        department: "Existing book",
        problem: "Fixed-rate end dates pass and clients with no named adviser drift away.",
        signal: "Maturity dates inside the next six months and clients with no assigned adviser.",
        fix: "A dated list of clients to call before the lender's retention team does.",
        pain: 0,
        tools: [0, 1],
      },
    ],
  },
  "ifas-wealth-managers": {
    source: "client review dates, holdings and protection records",
    stages: [
      {
        key: "win",
        department: "New client intake",
        problem: "Introductions from existing clients are not tracked or followed up.",
        signal: "Introductions logged against the clients who made them.",
        fix: "A short list of who to thank and who to ask for another introduction.",
        tools: [],
      },
      {
        key: "deliver",
        department: "Advice and reviews",
        problem: "Review dates pass and the client quietly becomes someone else's.",
        signal: "Clients past their review date, ranked by assets.",
        fix: "A review queue ordered by how long each client has been waiting.",
        pain: 0,
        tools: [0],
      },
      {
        key: "paid",
        department: "Fees and paperwork",
        problem: "Protection and pension gaps are visible in the file and never advised on.",
        signal: "Files where cover or contributions look thin for the client's stage.",
        fix: "A gap summary per client, written for the adviser to review before contact.",
        pain: 1,
        tools: [1],
      },
      {
        key: "keep",
        department: "Next generation",
        problem: "Assets pass to heirs the firm has never met.",
        signal: "Clients in the age bands where inheritance is likely and no heir on file.",
        fix: "An introduction plan for each family, started while the client is still here.",
        pain: 2,
        tools: [2],
      },
    ],
  },
  "law-firms": {
    source: "enquiry log, time ledger and matter history",
    stages: [
      {
        key: "win",
        department: "Intake",
        problem: "Prospects instruct whoever replies first, and nights and weekends go unanswered.",
        signal: "Enquiries with no reply, or a single touch, valued by matter type.",
        fix: "Follow-up sequences drafted for the fee earner who took the call.",
        pain: 0,
        tools: [0],
      },
      {
        key: "deliver",
        department: "Fee earners",
        problem: "Time is recorded and then ages on the ledger without being billed.",
        signal: "Recorded time older than ninety days, by matter and fee earner.",
        fix: "A weekly list of aged time to bill, write off on purpose, or query.",
        pain: 1,
        tools: [1],
      },
      {
        key: "paid",
        department: "Billing",
        problem: "Bills go out late and the lag between work and invoice grows unnoticed.",
        signal: "Days from last time entry to invoice, by team.",
        fix: "A billing calendar that flags the matters running longest without an invoice.",
        tools: [1],
      },
      {
        key: "keep",
        department: "Client care",
        problem: "A conveyancing client leaves without hearing about wills or lasting powers.",
        signal: "Closed matters with no follow-on conversation.",
        fix: "A cross-practice prompt to the original fee earner at the right moment.",
        pain: 2,
        tools: [2],
      },
    ],
  },
  "executive-search-recruitment": {
    source: "candidate database, mandate history and client contact records",
    stages: [
      {
        key: "win",
        department: "Business development",
        problem: "Hiring signals fire at target accounts and nobody is watching.",
        signal: "New roles and leadership changes at accounts on your target list.",
        fix: "A weekly list of accounts with a fresh signal and a suggested approach.",
        pain: 1,
        tools: [1],
      },
      {
        key: "deliver",
        department: "Sourcing",
        problem: "The first shortlist in wins, and manual trawling takes days.",
        signal: "Time from brief to first shortlist.",
        fix: "A ranked first shortlist drawn from the database and the brief.",
        pain: 2,
        tools: [2],
      },
      {
        key: "paid",
        department: "Placements and invoicing",
        problem: "Placement fees and rebate terms depend on dates held in several places.",
        signal: "Start dates, guarantee periods and invoice status side by side.",
        fix: "One view of what is invoiced, what is due and what is at risk of rebate.",
        tools: [],
      },
      {
        key: "keep",
        department: "Candidate database",
        problem: "Thousands of CVs sit unread when a new mandate lands.",
        signal: "Candidates who match open mandates and were last contacted long ago.",
        fix: "A revival list with a short, personal reason to get back in touch.",
        pain: 0,
        tools: [0],
      },
    ],
  },
  "commercial-insurance-brokers": {
    source: "policy schedules, renewal dates and submission inbox",
    stages: [
      {
        key: "win",
        department: "New business",
        problem: "Underwriters reward the first complete submission and yours is still in an inbox.",
        signal: "Time from client information received to submission sent.",
        fix: "A submission pack assembled from the information already supplied.",
        pain: 2,
        tools: [2],
      },
      {
        key: "deliver",
        department: "Placement",
        problem: "Clients hold property cover and nobody has checked the rest of the book.",
        signal: "Policy schedules compared against the cover a business of that type usually holds.",
        fix: "A gap summary per client for the broker to take to the renewal conversation.",
        pain: 1,
        tools: [1],
      },
      {
        key: "paid",
        department: "Accounts",
        problem: "Premium and commission timing is tracked in a separate spreadsheet.",
        signal: "Outstanding premium and commission by policy and insurer.",
        fix: "A chase list ordered by age, with the broker's note attached.",
        tools: [],
      },
      {
        key: "keep",
        department: "Renewals",
        problem: "At-risk renewals look fine until the non-renewal email arrives.",
        signal: "Contact gaps, claims activity and price movement ahead of each renewal.",
        fix: "A defence plan for each at-risk renewal, started early.",
        pain: 0,
        tools: [0],
      },
    ],
  },
  "ma-advisory-business-brokers": {
    source: "buyer mandates, seller register and prospect lists",
    stages: [
      {
        key: "win",
        department: "Origination",
        problem: "Every adviser fishes the same listed pond while the off-market one is larger.",
        signal: "Owner-managed businesses showing succession signals.",
        fix: "A prioritised list of owners with a reason to talk now.",
        pain: 0,
        tools: [0],
      },
      {
        key: "deliver",
        department: "Buyer mandates",
        problem: "Buyer mandates stall while target lists are built by hand.",
        signal: "Days from mandate to first target list.",
        fix: "A sourced, ranked target list against the mandate's criteria.",
        pain: 1,
        tools: [1],
      },
      {
        key: "paid",
        department: "Fees and retainers",
        problem: "Retainers and success fees are tracked across several engagement letters.",
        signal: "Fee triggers and dates, by engagement.",
        fix: "One schedule of what falls due and when.",
        tools: [],
      },
      {
        key: "keep",
        department: "Books and introductions",
        problem: "Live buyers and live sellers sit in the same office, unintroduced.",
        signal: "Buyer criteria matched against the seller register.",
        fix: "A list of introductions worth making this week.",
        pain: 2,
        tools: [2],
      },
    ],
  },
  "commercial-property": {
    source: "lease schedules, instruction pipeline and vendor records",
    stages: [
      {
        key: "win",
        department: "Instruction pitches",
        problem: "Pitches lose to whoever arrives first with the numbers.",
        signal: "Time from enquiry to a vendor-ready report.",
        fix: "A vendor report generated from the property record in minutes.",
        pain: 2,
        tools: [2],
      },
      {
        key: "deliver",
        department: "Lettings and sales",
        problem: "By the time a deal is listed, it is an auction. The margin was off-market.",
        signal: "Owners and occupiers with signals that a move is coming.",
        fix: "An off-market watch list for the agent to work before listing.",
        pain: 1,
        tools: [1],
      },
      {
        key: "paid",
        department: "Rent and fees",
        problem: "Rent reviews are agreed late and arrears are chased by memory.",
        signal: "Review dates against the date the new rent was actually invoiced.",
        fix: "A calendar of reviews and a chase list for what is outstanding.",
        tools: [0],
      },
      {
        key: "keep",
        department: "Portfolio management",
        problem: "Reviews and break dates pass unactioned across managed portfolios.",
        signal: "Every lease event in the next eighteen months, by property.",
        fix: "An event radar that tells the manager what to act on and by when.",
        pain: 0,
        tools: [0],
      },
    ],
  },
  "accountancy-firms": {
    source: "client files, engagement letters, WIP and billing records",
    stages: [
      {
        key: "win",
        department: "Onboarding",
        problem: "New clients wait on documents while the work cannot start.",
        signal: "Days from signed engagement to a complete document set.",
        fix: "A chaser that asks for what is missing, with the reason stated.",
        pain: 2,
        tools: [2],
      },
      {
        key: "deliver",
        department: "Compliance work",
        problem: "Out-of-scope work gets done, logged and never billed.",
        signal: "Time logged against work outside the engagement letter.",
        fix: "A list of out-of-scope work for the partner to bill or decide to absorb.",
        pain: 1,
        tools: [1],
      },
      {
        key: "paid",
        department: "Billing and WIP",
        problem: "Fixed fees are set once and never revisited as the work grows.",
        signal: "Hours recorded against each fixed fee, by client.",
        fix: "A fee review list of clients whose work has outgrown the price.",
        tools: [1],
      },
      {
        key: "keep",
        department: "Advisory",
        problem: "R&D, allowances and exit-planning triggers sit unnoticed in accounts already filed.",
        signal: "Accounts and returns scanned for advisory triggers.",
        fix: "A conversation list for the partner, each with the trigger spelled out.",
        pain: 0,
        tools: [0],
      },
    ],
  },
  "b2b-saas": {
    source: "product usage, billing events and CRM",
    stages: [
      {
        key: "win",
        department: "Sales",
        problem: "Product-qualified accounts wait for a human to notice them.",
        signal: "Trial and free accounts showing usage that looks like a buyer.",
        fix: "A shortlist routed to sales with the usage that earned it.",
        tools: [2],
      },
      {
        key: "deliver",
        department: "Customer success",
        problem: "Usage declines for weeks before the cancellation email, if anyone is looking.",
        signal: "Accounts whose usage is falling against their own baseline.",
        fix: "An early-warning list with the pattern behind each flag.",
        pain: 0,
        tools: [0],
      },
      {
        key: "paid",
        department: "Billing",
        problem: "Failed payments expire without a recovery attempt.",
        signal: "Failed charges by reason and days since the last attempt.",
        fix: "A recovery sequence that retries and contacts the right person at the right time.",
        pain: 1,
        tools: [1],
      },
      {
        key: "keep",
        department: "Expansion",
        problem: "Accounts reach plan limits and never hear from sales.",
        signal: "Accounts at or near their plan limits.",
        fix: "An expansion list with the limit each account is hitting.",
        pain: 2,
        tools: [2],
      },
    ],
  },
  "private-healthcare-groups": {
    source: "treatment plan quotes, appointment diary and patient enquiries",
    stages: [
      {
        key: "win",
        department: "Patient enquiries",
        problem: "Patients ask the internet about your treatments and competitors answer.",
        signal: "The questions patients ask, set against what your site and team answer.",
        fix: "Plain-language answers drafted for clinical sign-off before publishing.",
        pain: 2,
        tools: [2],
      },
      {
        key: "deliver",
        department: "Clinic operations",
        problem: "Tomorrow's empty slots are found tomorrow, too late to fill.",
        signal: "Open diary slots over the next fortnight, by clinician and treatment.",
        fix: "A fill list of patients who could take each slot.",
        pain: 1,
        tools: [1],
      },
      {
        key: "paid",
        department: "Treatment plans",
        problem: "Patients say they will think about it and never hear from you again.",
        signal: "Quoted plans with no booking and no follow-up.",
        fix: "A gentle follow-up drafted for the care coordinator to send.",
        pain: 0,
        tools: [0],
      },
      {
        key: "keep",
        department: "Patient relationships",
        problem: "Happy patients leave reviews and are never asked about what comes next.",
        signal: "Positive feedback paired with a treatment pathway the patient has not started.",
        fix: "A thank-you and next-step note, sent only with the patient's consent.",
        tools: [2],
      },
    ],
  },
};
