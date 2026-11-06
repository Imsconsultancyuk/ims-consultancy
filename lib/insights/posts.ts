// Hosted summaries of third-party research. Every entry is written in our own
// words, credits the publisher, and links out to the original. Nothing here is
// copied text. `access` records how the source was checked on 2026-10-23:
//   "read"     the publisher's own page was opened and the figures read there
//   "reported" the figures come from a news or analyst write-up of the source;
//              the outbound link goes to that write-up, and `caveat` says so.

export type InsightTopic =
  | "UK adoption"
  | "Productivity"
  | "Risk and rules"
  | "Cost and barriers"
  | "Agents and scale";

export interface InsightPost {
  slug: string;
  topic: InsightTopic;
  /** Our headline for the hosted summary. */
  title: string;
  /** Search title, 26 to 41 characters so the full tag lands at 45 to 60 with the brand suffix. */
  metaTitle: string;
  /** Search description, 120 to 160 characters. */
  metaDescription: string;
  publisher: string;
  sourceTitle: string;
  sourceUrl: string;
  /** Display label of the source's own date. */
  published: string;
  /** ISO date, only where the source gives a full date. */
  isoDate?: string;
  access: "read" | "reported";
  summary: string;
  /** Three figures or facts, each short enough to sit in a stat cell. */
  points: { value: string; label: string }[];
  imsTake: string;
  caveat?: string;
}

export const INSIGHT_TOPICS: InsightTopic[] = [
  "UK adoption",
  "Productivity",
  "Risk and rules",
  "Cost and barriers",
  "Agents and scale",
];

export const insights: InsightPost[] = [
  {
    slug: "uk-sme-ai-adoption-bcc-atos-2026",
    topic: "UK adoption",
    title: "More than half of UK SMEs now use AI, and almost none have cut jobs",
    metaTitle: "54% of UK Firms Now Use AI: BCC Survey",
    metaDescription:
      "BCC and Atos found 54% of UK firms actively use AI, up from 35% a year earlier, and 95% of users report no change in headcount. Our take.",
    publisher: "Institute for Social and Economic Research, University of Essex",
    sourceTitle:
      "Major jump in tech adoption as study finds half of SMEs using AI, with limited headcount impact so far",
    sourceUrl: "https://www.iser.essex.ac.uk/research/news/2026/03/19/major-jump-in-tech-adoption-as-study-finds-half-of-smes-using-ai-with-limited-headcount-impact-so-far",
    published: "19 March 2026",
    isoDate: "2026-03-19",
    access: "read",
    summary:
      "A British Chambers of Commerce survey run with Atos found that 54% of UK firms now actively use AI, up from 35% a year earlier. Among the firms using it, 95% saw no change in headcount and 86% said job roles stayed the same. Larger SMEs and business-to-business professional services lead; smaller, consumer-facing and manufacturing firms trail.",
    points: [
      { value: "54%", label: "of firms actively use AI, up from 35% in 2025" },
      { value: "95%", label: "of users report no change in headcount" },
      { value: "1 in 10", label: "have gone beyond generic tools to bespoke AI" },
    ],
    imsTake:
      "Most firms are using chat tools, not changed processes. The gap between using AI and having it change a result in the books is where the work sits.",
    caveat: "668 businesses took part, 94% of them SMEs. The Essex page summarises the BCC research.",
  },
  {
    slug: "dsit-ai-adoption-research-2026",
    topic: "UK adoption",
    title: "Government data: 14% of micro businesses use AI, and three in four users see no revenue change",
    metaTitle: "DSIT: 14% of UK Micro Firms Use AI",
    metaDescription:
      "DSIT surveyed 3,500 UK businesses: 14% of micro firms use AI against 36% of large ones, and 77% of users saw no change in revenue.",
    publisher: "Department for Science, Innovation and Technology (GOV.UK)",
    sourceTitle: "AI Adoption Research",
    sourceUrl: "https://www.gov.uk/government/publications/ai-adoption-research/ai-adoption-research",
    published: "Updated 13 February 2026",
    isoDate: "2026-02-13",
    access: "read",
    summary:
      "DSIT surveyed 3,500 UK private-sector businesses with five or more employees by phone in 2025. About 16% use AI, rising from 14% of micro businesses to 36% of large ones. Around 75% of users report better workforce productivity, yet 77% saw no change in revenue and 12% saw an increase.",
    points: [
      { value: "14%", label: "of micro businesses use AI, against 36% of large firms" },
      { value: "75%", label: "of users report better workforce productivity" },
      { value: "77%", label: "of users saw no change in revenue" },
    ],
    imsTake:
      "Productivity is easy to feel and hard to bank. Time saved only becomes money when someone decides what the saved hours are for.",
    caveat: "Fieldwork ran 12 February to 2 May 2025. Newer surveys report higher use, so read this as the government baseline.",
  },
  {
    slug: "simply-business-sme-insights-2026",
    topic: "Cost and barriers",
    title: "Nearly half of UK small business owners use AI, but only one in five feels confident",
    metaTitle: "47% of UK Small Firms Use AI Tools",
    metaDescription:
      "Simply Business reports 47% of UK small business owners use AI tools, up from 22%, yet only 19% feel very confident. Summary and our take.",
    publisher: "Simply Business",
    sourceTitle: "AI use among UK small businesses more than doubles in a year",
    sourceUrl: "https://www.simplybusiness.co.uk/knowledge/business-news/small-business-ai-usage-doubles/",
    published: "8 September 2026",
    isoDate: "2026-09-08",
    access: "read",
    summary:
      "Simply Business's 2026 SME Insights Report, covering 1,842 UK small business owners, puts AI use at 47%, up from 22% in 2025. Only 19% call themselves very confident with it. Security and privacy worry 44%, 39% see no clear use, and 36% worry about accuracy.",
    points: [
      { value: "47%", label: "use AI tools, up from 22% in 2025" },
      { value: "19%", label: "are very confident using it day to day" },
      { value: "39%", label: "see no clear use for AI in their business" },
    ],
    imsTake:
      "Four in ten owners have not found a use, and the cure is not another tool. Someone has to sit with the owner and find the job first.",
    caveat: "Insurer-run survey of its own customer base.",
  },
  {
    slug: "ionos-yougov-ai-budgets-2026",
    topic: "Cost and barriers",
    title: "29% of UK SMBs plan to spend nothing on AI this year",
    metaTitle: "29% of UK SMBs Plan No AI Spend in 2026",
    metaDescription:
      "IONOS and YouGov found 29% of UK small firms plan to spend nothing on AI in 2026, and 43% cite lack of time as the barrier. Summary and our take.",
    publisher: "IONOS (research by YouGov)",
    sourceTitle: "Nearly a third of UK SMBs set no AI budget in 2026",
    sourceUrl: "https://www.ionos.co.uk/newsroom/news/nearly-a-third-of-uk-smbs-set-no-ai-budget-in-2026/",
    published: "5 May 2026",
    isoDate: "2026-05-05",
    access: "read",
    summary:
      "YouGov surveyed 1,001 UK decision-makers at organisations of up to 250 staff for IONOS. 29% plan no AI spending in 2026, cost is the largest obstacle to going digital at 46%, and lack of time follows at 43%. A quarter would use only free tools, and few would pay above about £43 a month.",
    points: [
      { value: "29%", label: "plan to spend nothing on AI in 2026" },
      { value: "43%", label: "cite lack of time as a barrier" },
      { value: "£43", label: "the monthly price most paying buyers stop at" },
    ],
    imsTake:
      "Small firms are price-sensitive and time-poor. A fixed-fee diagnosis that costs one afternoon fits that; an open-ended programme does not.",
    caveat: "Fieldwork January to March 2026. The wider study covered five European countries.",
  },
  {
    slug: "ai-productivity-customer-support-nber",
    topic: "Productivity",
    title: "A study of 5,179 support agents: AI lifted output 14%, and novices gained most",
    metaTitle: "AI Lifted Support Output 14%: NBER Study",
    metaDescription:
      "An NBER study of 5,179 support agents found AI lifted output 14% on average and 34% for the least experienced. What it means for small firms.",
    publisher: "National Bureau of Economic Research",
    sourceTitle: "Generative AI at Work (Brynjolfsson, Li, Raymond)",
    sourceUrl: "https://www.nber.org/papers/w31161",
    published: "2023, later published in the Quarterly Journal of Economics (2025)",
    access: "read",
    summary:
      "Researchers tracked 5,179 customer support agents after an AI assistant was introduced. Productivity rose about 14% on average and about 34% for the least experienced staff, who effectively borrowed the habits of the best performers.",
    points: [
      { value: "14%", label: "average productivity gain across 5,179 agents" },
      { value: "34%", label: "gain for the least experienced agents" },
      { value: "5,179", label: "agents in the study" },
    ],
    imsTake:
      "The biggest gain went to people with the least experience. For a small firm that means AI is a way to spread your best person's method, which only works if you first write that method down.",
    caveat: "One company, one job. Treat the size of the gain as an example, not a promise.",
  },
  {
    slug: "jagged-frontier-hbs-bcg",
    topic: "Productivity",
    title: "AI made consultants 25% faster on some tasks and 19 points more wrong on others",
    metaTitle: "Consultants 25% Faster, 19 Points Wrong",
    metaDescription:
      "A Harvard Business School and BCG study: consultants worked 25% faster on tasks AI handles well and 19 points more wrong outside it. Our take.",
    publisher: "Harvard Business School, Working Knowledge",
    sourceTitle: "Humans vs. Machines: Untangling the Tasks AI Can (and Can't) Handle",
    sourceUrl: "https://www.library.hbs.edu/working-knowledge/humans-vs-machines-untangling-the-tasks-ai-can-and-cant-handle",
    published: "22 November 2023",
    isoDate: "2023-11-22",
    access: "read",
    summary:
      "In a field experiment with Boston Consulting Group, consultants using AI on suitable tasks finished 12% more work, 25% faster, at quality rated 40% higher. On a harder task that needed judgement, those using AI were 19 percentage points less likely to reach the right answer. Below-median performers improved 43%, top performers 17%.",
    points: [
      { value: "25%", label: "faster on tasks AI handles well" },
      { value: "-19 pts", label: "chance of a correct answer on a task outside its reach" },
      { value: "43%", label: "gain for below-median performers, against 17% for the top" },
    ],
    imsTake:
      "Knowing which jobs to hand over is the skill. We map the tasks before we touch a tool, because the wrong task costs more than no tool at all.",
    caveat: "Consultants at one firm, 2023-era models.",
  },
  {
    slug: "microsoft-work-trend-index-2025",
    topic: "Agents and scale",
    title: "Microsoft's 2025 index: 82% of leaders call this the year to rethink how work runs",
    metaTitle: "Microsoft Work Trend Index 2025 Summary",
    metaDescription:
      "Microsoft's 2025 index: 82% of leaders call it pivotal for rethinking operations, 24% have deployed AI organisation-wide, 12% still pilot.",
    publisher: "Microsoft",
    sourceTitle: "Work Trend Index 2025: The year the Frontier Firm is born",
    sourceUrl: "https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born",
    published: "23 April 2025",
    isoDate: "2025-04-23",
    access: "read",
    summary:
      "Microsoft's survey of workers and leaders found 82% of leaders see 2025 as a pivotal year to rethink strategy and operations. 24% say AI is deployed across their whole organisation, while 12% are still at pilot stage. The report argues for firms built around humans directing AI agents.",
    points: [
      { value: "82%", label: "of leaders see 2025 as pivotal for rethinking operations" },
      { value: "24%", label: "have deployed AI organisation-wide" },
      { value: "12%", label: "are still only piloting" },
    ],
    imsTake:
      "A vendor describing its own future. Useful as a map of where the large-firm market is heading, and a reminder that most firms are nowhere near it.",
    caveat: "Published by a company that sells the products it discusses.",
  },
  {
    slug: "google-cloud-roi-of-ai-2025",
    topic: "Agents and scale",
    title: "Google Cloud: 74% of executives report AI returns within a year, and half run AI agents",
    metaTitle: "Google Cloud: 74% See AI ROI in a Year",
    metaDescription:
      "Google Cloud reports 74% of executives see a return on generative AI within a year and 52% run AI agents. Summary and our take for small firms.",
    publisher: "Google Cloud",
    sourceTitle:
      "Google Cloud Study Reveals 52% of Executives Say Their Organizations Have Deployed AI Agents",
    sourceUrl:
      "https://www.googlecloudpresscorner.com/2025-09-04-Google-Cloud-Study-Reveals-52-of-Executives-Say-Their-Organizations-Have-Deployed-AI-Agents%2C-Unlocking-a-New-Wave-of-Business-Value%2C1",
    published: "4 September 2025",
    isoDate: "2025-09-04",
    access: "read",
    summary:
      "A Google Cloud study of executives reports that 74% saw a return on generative AI within the first year and 56% say it has driven business growth. About half say their organisations use AI agents. The 13% classed as early adopters of agents report higher returns in customer experience, marketing and security.",
    points: [
      { value: "74%", label: "report a return on generative AI within a year" },
      { value: "52%", label: "of executives say they have deployed AI agents" },
      { value: "37%", label: "put data privacy in their top three factors when picking a provider" },
    ],
    imsTake:
      "Self-reported returns from executives at firms that already buy cloud AI. Read the direction, not the percentages, and ask what each firm counted as a return.",
    caveat: "Vendor study. Survey respondents are enterprise executives, not small firms.",
  },
  {
    slug: "anthropic-economic-index-augmentation",
    topic: "Productivity",
    title: "Anthropic's usage data: 57% of AI use is people working with it, 43% is handing tasks over",
    metaTitle: "Anthropic: 57% of AI Use Is Teamwork",
    metaDescription:
      "Anthropic's Economic Index: 57% of conversations are collaborative and 43% hand the task over outright. Summary and our take for small firms.",
    publisher: "Anthropic",
    sourceTitle: "Introducing the Anthropic Economic Index",
    sourceUrl: "https://www.anthropic.com/research/the-anthropic-economic-index",
    published: "10 February 2025",
    isoDate: "2025-02-10",
    access: "read",
    summary:
      "Anthropic analysed how people actually use its Claude assistant. About 57% of use looks like augmentation, where a person and the model work a task together, and 43% looks like automation, where the task is handed over.",
    points: [
      { value: "57%", label: "of conversations are collaborative (augmentation)" },
      { value: "43%", label: "are delegated outright (automation)" },
      { value: "Free + Pro", label: "only these plan types were analysed" },
    ],
    imsTake:
      "Most people still work alongside the tool. That is the safer pattern for a small firm: the owner keeps the decision and the tool does the first draft.",
    caveat: "Covers one provider's Free and Pro conversations only, so it is not a picture of all AI use.",
  },
  {
    slug: "anthropic-economic-index-delegation",
    topic: "Agents and scale",
    title: "Delegation is rising: 39% of conversations now hand a whole task to AI, and firms automate more than consumers",
    metaTitle: "Anthropic Index: 39% of AI Use Delegates",
    metaDescription:
      "Anthropic's later index: 39% of conversations hand a complete task to AI, up from 27%, and 77% of API transcripts show automation patterns.",
    publisher: "Anthropic",
    sourceTitle: "Anthropic Economic Index report: Uneven geographic and enterprise AI adoption",
    sourceUrl: "https://www.anthropic.com/research/anthropic-economic-index-september-2025-report",
    published: "15 September 2025",
    isoDate: "2025-09-15",
    access: "read",
    summary:
      "The September 2025 update found the share of conversations where users hand over a complete task rose from 27% to 39%. Business use through the API leans much more towards automation, at about 77% of transcripts, compared with roughly half of consumer app use. Usage is also uneven by country and tracks national income.",
    points: [
      { value: "39%", label: "of conversations delegate a complete task, up from 27%" },
      { value: "77%", label: "of API transcripts show automation patterns" },
      { value: "36%", label: "of use is still coding, the largest category" },
    ],
    imsTake:
      "Firms use AI to run a step, individuals use it to think. A small business wants the first, but only after the step is written down and checked by a person.",
    caveat: "One provider's data. The report is a measure of its own users.",
  },
  {
    slug: "ai-opportunities-action-plan-2025",
    topic: "Risk and rules",
    title: "The UK government's AI Opportunities Action Plan: 50 recommendations, and what they mean for small firms",
    metaTitle: "UK AI Opportunities Action Plan Summary",
    metaDescription:
      "The UK government's AI Opportunities Action Plan makes 50 recommendations. Summary of what it sets, what it does not fund, and what small firms should read.",
    publisher: "Department for Science, Innovation and Technology (GOV.UK)",
    sourceTitle: "AI Opportunities Action Plan",
    sourceUrl: "https://www.gov.uk/government/publications/ai-opportunities-action-plan",
    published: "13 January 2025",
    isoDate: "2025-01-13",
    access: "read",
    summary:
      "The government's plan sets out 50 recommendations to build UK AI capacity, from compute and data to adoption in public services and the wider economy. For a small business it signals direction rather than a grant or a rule: policy is pushing for wider use, and support schemes, if they arrive, will come after.",
    points: [
      { value: "50", label: "recommendations in the plan" },
      { value: "Jan 2025", label: "published by the UK government" },
      { value: "Direction", label: "the plan sets policy intent, it is not a funding scheme" },
    ],
    imsTake:
      "Do not wait for funding. As of this check we found no open UK-wide grant for SME AI training, so any programme we recommend is priced at its real cost.",
    caveat: "Policy document. Grant availability can change; check GOV.UK before relying on funding.",
  },
  {
    slug: "ico-ai-and-data-protection-guidance",
    topic: "Risk and rules",
    title: "The ICO's AI guidance hub: where UK data protection law meets staff using chatbots",
    metaTitle: "ICO AI Guidance: UK GDPR and Chatbots",
    metaDescription:
      "The ICO's AI guidance hub: UK GDPR applies the moment personal data is typed or pasted into an AI tool. Summary and our take for small firms.",
    publisher: "Information Commissioner's Office",
    sourceTitle: "Artificial intelligence (guidance hub)",
    sourceUrl: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/",
    published: "Hub page, no single date",
    access: "read",
    summary:
      "The regulator keeps its AI and data protection guidance on one hub. The practical point for a small firm is that putting customer or staff personal data into an AI tool is processing under UK GDPR, so the rules apply the moment someone pastes a client file into a chatbot.",
    points: [
      { value: "UK GDPR", label: "applies when personal data goes into an AI tool" },
      { value: "1 hub", label: "the ICO's central page for AI guidance" },
      { value: "Personal data", label: "is the trigger, whether it is typed or pasted in" },
    ],
    imsTake:
      "A one-page staff policy covering what may and may not be pasted into a tool removes most of the exposure. We write that with the owner, in plain English.",
    caveat: "Guidance is updated over time. This is not legal advice; use a solicitor for a specific question.",
  },
  {
    slug: "ico-automated-decision-making-consultation-2026",
    topic: "Risk and rules",
    title: "Automated decisions: the ICO consulted on new rules after the Data (Use and Access) Act",
    metaTitle: "ICO Automated Decision Consultation 2026",
    metaDescription:
      "The ICO consulted from 31 March to 29 May 2026 on automated decision-making guidance after the Data (Use and Access) Act. Summary and our take.",
    publisher: "Information Commissioner's Office",
    sourceTitle:
      "ICO consultation on the draft guidance about automated decision-making, including profiling",
    sourceUrl:
      "https://ico.org.uk/about-the-ico/ico-and-stakeholder-consultations/2026/03/ico-consultation-on-the-draft-guidance-about-automated-decision-making-including-profiling/",
    published: "Opened 31 March 2026, closed 29 May 2026",
    isoDate: "2026-03-31",
    access: "read",
    summary:
      "Following the Data (Use and Access) Act 2025, the ICO drafted updated guidance on automated decision-making and profiling and asked organisations for views until 29 May 2026. The draft covers the rules specific to automated decisions and is aimed at data protection and technical leads who buy or run these systems.",
    points: [
      { value: "31 Mar", label: "2026 consultation opened" },
      { value: "29 May", label: "2026 consultation closed" },
      { value: "5 Feb", label: "2026 date the reformed rules took effect" },
    ],
    imsTake:
      "If a tool makes a decision about a person, such as screening, pricing or credit, a human check and a clear explanation are the safe default. We build both into any workflow that touches people.",
    caveat: "Final guidance had not been confirmed as published when this was checked. Look at ico.org.uk for the current version.",
  },
  {
    slug: "sra-ai-risk-accountability",
    topic: "Risk and rules",
    title: "The solicitors' regulator on AI: you cannot hand accountability to the tool or the vendor",
    metaTitle: "SRA on AI: The Firm Keeps Accountability",
    metaDescription:
      "The solicitors' regulator on AI: accountability stays with the firm whatever the vendor promises, and invented case law is a documented failure.",
    publisher: "Legal Futures",
    sourceTitle: "SRA: Lawyers \"must not trust AI to judge its own accuracy\"",
    sourceUrl: "https://www.legalfutures.co.uk/latest-news/sra-lawyers-must-not-trust-ai-to-judge-its-own-accuracy",
    published: "21 November 2023",
    isoDate: "2023-11-21",
    access: "reported",
    summary:
      "Reporting on the Solicitors Regulation Authority's risk outlook says firms must supervise AI systems and the staff who use them, and that responsibility stays with the firm. It warns about invented case citations, confidential data leaking through public tools, and AI-assisted fraud, while also saying the bigger danger may be not adopting AI at all.",
    points: [
      { value: "Firm", label: "keeps accountability, whatever the vendor promises" },
      { value: "Invented", label: "case law is a documented failure mode" },
      { value: "Confidentiality", label: "client data leaking through public tools is a named risk" },
    ],
    imsTake:
      "The same principle applies to an accountancy, a clinic or a letting agency. A person signs off every output that leaves the building.",
    caveat: "Link goes to Legal Futures' report of the SRA's outlook, not the SRA document itself. Dated 2023, so check the SRA for current guidance.",
  },
  {
    slug: "law-society-scotland-genai-guide",
    topic: "Risk and rules",
    title: "A Scottish law society wrote a generative AI guide specifically so small firms feel able to start",
    metaTitle: "Scottish Law Society Generative AI Guide",
    metaDescription:
      "A Scottish law society wrote a generative AI guide so small firms can start: three themes of accuracy, confidentiality and insurance. Our take.",
    publisher: "DIGIT",
    sourceTitle: "New AI Guide Launched for Scottish Solicitors",
    sourceUrl: "https://digit.fyi/?p=107657",
    published: "23 October 2024",
    isoDate: "2024-10-23",
    access: "reported",
    summary:
      "The Law Society of Scotland published a Guide to Generative AI, made with the legal platform Wordsmith. It covers reliability, client confidentiality and the effect on professional insurance. It advises treating AI output as a starting point, keeping sensitive client information away from third parties, and considering telling clients when AI is used.",
    points: [
      { value: "3", label: "themes: accuracy, confidentiality, insurance" },
      { value: "Starting point", label: "how the guide says to treat AI output" },
      { value: "Smaller firms", label: "named as able to use AI, with the guide updated over time" },
    ],
    imsTake:
      "Professional bodies are telling small firms the same thing: start, but with a written rule. We turn that into a policy a five-person firm will follow.",
    caveat: "Link goes to DIGIT's report, not the Law Society of Scotland guide. Applies to Scotland.",
  },
  {
    slug: "bank-of-england-fca-ai-survey-2024",
    topic: "Risk and rules",
    title: "75% of UK financial firms use AI, and 46% only partly understand what they use",
    metaTitle: "Bank of England and FCA AI Survey",
    metaDescription:
      "The Bank of England and FCA found 75% of surveyed financial firms use AI and 46% only partly understand it, often due to third parties.",
    publisher: "Bank of England and Financial Conduct Authority",
    sourceTitle: "Artificial intelligence in UK financial services 2024",
    sourceUrl: "https://www.bankofengland.co.uk/report/2024/artificial-intelligence-in-uk-financial-services-2024",
    published: "21 November 2024",
    isoDate: "2024-11-21",
    access: "read",
    summary:
      "The Bank of England and FCA surveyed financial firms and found 75% already use AI, with a further 10% planning to within three years. 46% of firms said they have only a partial understanding of the AI technologies they use, most often because the tools come from third parties.",
    points: [
      { value: "75%", label: "of surveyed financial firms use AI" },
      { value: "46%", label: "only partially understand the AI they use" },
      { value: "Third party", label: "most common reason for the gap in understanding" },
    ],
    imsTake:
      "If regulated firms with compliance teams cannot see inside their tools, a ten-person firm certainly cannot. Ask any vendor what the tool does with your data before you sign.",
    caveat: "Financial services only. Larger firms than the typical Intel Made Simple client.",
  },
  {
    slug: "ibm-cost-of-a-data-breach-2026",
    topic: "Risk and rules",
    title: "IBM 2026: the average breach costs $4.99 million, and AI agents now need governing",
    metaTitle: "IBM 2026: Data Breach Costs $4.99m",
    metaDescription:
      "IBM's 2026 report puts the global average cost of a data breach at $4.99m and flags AI agents as a governance gap. Summary and our take.",
    publisher: "IBM",
    sourceTitle: "Cost of a Data Breach Report 2026",
    sourceUrl: "https://www.ibm.com/reports/data-breach",
    published: "2026",
    access: "read",
    summary:
      "IBM's annual study puts the global average cost of a breach at $4.99 million in 2026. It reports attacks driven by AI up 56% and points at weak governance of AI agents as a growing source of exposure.",
    points: [
      { value: "$4.99m", label: "global average cost of a data breach" },
      { value: "+56%", label: "rise in AI-driven attacks reported" },
      { value: "Agents", label: "flagged as a governance gap" },
    ],
    imsTake:
      "The global average is skewed by large firms. The point for a small business is the direction: the attackers have the same tools you do, so basic hygiene matters more, not less.",
    caveat: "Global average across firms of all sizes. Small-firm losses are lower in absolute terms but can be fatal in proportion.",
  },
  {
    slug: "fsb-confidence-code-2026",
    topic: "UK adoption",
    title: "FSB: nearly three in five small-firm AI users see productivity gains, and 92% still worry",
    metaTitle: "FSB: 92% of Small Firms Worry About AI",
    metaDescription:
      "FSB figures via Resultsense: 92% of small firms have concerns about AI, gains average 3% of revenue, and 34% want better implementation guidance.",
    publisher: "Resultsense (reporting the Federation of Small Businesses)",
    sourceTitle: "FSB urges AI minister to put small-firm trust at the heart of policy",
    sourceUrl: "https://www.resultsense.com/news/2026-07-27-fsb-ai-trust-small-firms/",
    published: "27 July 2026",
    isoDate: "2026-07-27",
    access: "reported",
    summary:
      "The Federation of Small Businesses' report The Confidence Code finds AI use among small firms has almost tripled since 2023. Around three in five users report productivity gains and about a quarter report higher revenue, averaging a 3% uplift. 92% still have concerns about data security, copyright and liability, and the FSB estimates deeper use could add more than £42bn a year to the economy.",
    points: [
      { value: "92%", label: "of small firms have concerns about AI" },
      { value: "3%", label: "average revenue uplift among those reporting gains" },
      { value: "34%", label: "say better guidance on implementation would help" },
    ],
    imsTake:
      "The ask from small firms is guidance and trust, not more software. That is the job we are built for.",
    caveat:
      "Figures come from a news write-up of the FSB report; we did not locate the report page itself. The £42bn figure is the FSB's own estimate.",
  },
  {
    slug: "stanford-ai-index-2026-summary",
    topic: "Agents and scale",
    title: "Stanford's 2026 AI Index: 88% of organisations use AI, but few have it at full scale",
    metaTitle: "Stanford AI Index 2026: 88% Use AI",
    metaDescription:
      "Stanford's 2026 AI Index, as summarised by Lumenova AI: 88% of organisations use AI and documented AI incidents rose to 362 from 233.",
    publisher: "Lumenova AI (summarising Stanford HAI)",
    sourceTitle: "AI Index Report 2026: Stanford Says AI Progress Is Outpacing Governance",
    sourceUrl: "https://www.lumenova.ai/blog/stanford-2026-ai-index-report-findings/",
    published: "14 August 2026",
    isoDate: "2026-08-14",
    access: "reported",
    summary:
      "A summary of Stanford's 2026 AI Index reports that organisational AI adoption worldwide reached 88%, that generative AI reached 53% population adoption in about three years, and that documented AI incidents rose from 233 in 2024 to 362 in 2025 while safety reporting lags capability reporting.",
    points: [
      { value: "88%", label: "of organisations worldwide use AI" },
      { value: "53%", label: "population adoption of generative AI in about three years" },
      { value: "362", label: "documented AI incidents in 2025, up from 233" },
    ],
    imsTake:
      "Use is almost universal and depth is not. The firms that win are the ones that connect a tool to a process they can measure.",
    caveat:
      "Secondary summary by a software vendor, not the Stanford report. Check hai.stanford.edu before quoting the figures.",
  },
  {
    slug: "uk-cyber-breaches-survey-2026-small-firms",
    topic: "Risk and rules",
    title: "UK cyber survey 2026: small firms are slipping on basics while attackers use AI to sharpen phishing",
    metaTitle: "UK Cyber Survey 2026: Small Firm Basics",
    metaDescription:
      "Under one in five UK organisations train staff on cyber risk, and phishing remains the most common attack. Summary of the 2026 survey, small firm view.",
    publisher: "IT Brief UK",
    sourceTitle: "UK cyber survey shows stagnant breach preparedness",
    sourceUrl: "https://itbrief.co.uk/story/uk-cyber-survey-shows-stagnant-breach-preparedness",
    published: "1 May 2026",
    isoDate: "2026-05-01",
    access: "reported",
    summary:
      "Commentary on the UK government's Cyber Security Breaches Survey 2026 says progress has stalled. Phishing remains the most common attack, fewer than one in five organisations train staff, and small firms in particular have lost ground on risk assessments, policies and continuity planning. Specialists say attackers now use AI to make phishing more convincing.",
    points: [
      { value: "<1 in 5", label: "organisations train their staff on cyber risk" },
      { value: "Phishing", label: "still the most common attack reported" },
      { value: "Small firms", label: "named as the main concern for lost ground" },
    ],
    imsTake:
      "Before any AI tool goes in, the basics come first: staff training, backups, a tested way to keep running. We check them in the audit, not after.",
    caveat:
      "News summary with no small-firm percentages. For the figures use the government survey itself on GOV.UK.",
  },
];

export function getInsight(slug: string): InsightPost | undefined {
  return insights.find((p) => p.slug === slug);
}

/** Date our own summaries were written and checked against their sources. */
export const INSIGHT_SUMMARY_DATE = "2026-10-23";

/** Below this many words of our own text, a summary is too thin to ask search engines to index. */
export const INSIGHT_MIN_INDEX_WORDS = 600;

export function insightWordCount(post: InsightPost): number {
  const text = [
    post.title,
    post.summary,
    post.imsTake,
    post.caveat ?? "",
    ...post.points.flatMap((pt) => [pt.value, pt.label]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export function isInsightIndexable(post: InsightPost): boolean {
  return insightWordCount(post) >= INSIGHT_MIN_INDEX_WORDS;
}
