# IMS Industry Pages — Content & Industry Implementation Pack (Doc 2 of 2)

Pairs with `01-IMS-Industry-Pages-System-Build.md`. Doc 1 builds the machine; this document is the fuel. Begin after IMS-050. Every value below flows into the typed configs from IMS-010 and must pass the Zod gate (IMS-011) unchanged.

---

## 1. Copy voice rules (apply to every string)

1. UK English. £ always. No exclamation marks.
2. Numbers are the copy. Prefer "£47,200 unbilled" over any adjective.
3. One line per idea. Problem and outcome lines ≤ 110 chars (Zod enforces).
4. Verbs from the buyer's world: recover, capture, spot, defend, revive — never "leverage", "unlock", "supercharge".
5. Name what the reader controls ("your client book", "your renewal list"), never system internals.
6. Buttons say what happens: "See it run", "Book 20 minutes", "Run another tool".
7. No absolute compliance claims. Approved GDPR copy in §3 only — verbatim.
8. Every demo number is obviously demonstrative, labelled synthetic, and internally consistent within its script.
9. Fictional names in demos must be unmistakably fictional (Jane Exampleton, Meridian Sample Ltd).
10. Sentence case everywhere, including headings.

---

## 2. Shared templates

**Package block (template — fill {…} per industry):**
- Heading: "The {shortName} package"
- Includes (5 lines): "All three tools configured for your firm" · "PII tokenisation layer as standard" · "CRM/book onboarding and data mapping" · "Monthly findings report with £ figures" · "UK-based support, DPA included"
- Timeline: "Live within 14 days of data access"
- Anchor: "{anchor}" (per industry below — build fee + monthly)

**FAQ template (5 Qs — Q1/Q3/Q5 fixed, Q2/Q4 per industry):**
- Q1 "Is this GDPR compliant?" → A: "The architecture is built for UK GDPR: identifiable fields are tokenised before any AI processing and the encrypted mapping never leaves your control. We provide a DPA with every engagement and a DPIA on request." (fixed, verbatim)
- Q2 "What data do you need?" → per industry below
- Q3 "How long does setup take?" → "Most firms are live within 14 days of granting data access. The demo you just ran mirrors the real pipeline — configuration, not construction."
- Q4 "Does it work with our systems?" → per industry (name their actual platforms)
- Q5 "What does it cost?" → "A one-off build fee then a monthly retainer — anchored so a single recovered {unit} covers months of fees. Exact pricing on the call, based on book size." ({unit} per industry)

**Demo stage keys (fixed):** ingest → detect → score → draft. Labels/details per tool below. Durations: 1400 / 1800 / 1600 / 1400 ms unless stated (total 6.2s — passes Zod's 5–9s rule).

---

## 3. GDPR section — approved master copy (IMS-029, verbatim)

- Eyebrow: "Data protection"
- H2: "Your client data never reaches the AI"
- Body (2 lines max): "Every engagement runs through our tokenisation layer. Names, contact details and account identifiers are swapped for tokens before AI processing — the AI finds the revenue, the encrypted vault holds the identities, and the two only meet back inside your environment."
- Toggle labels: "Your view" / "What the AI sees"
- Trust chips (4): "UK data residency" · "Encrypted in transit and at rest" · "Never used to train AI models" · "DPA with every engagement"
- Footnote: "Pseudonymisation under UK GDPR Art. 4(5). DPIA and DPA available on request."
- **Regulator lines (config `regulatorLine`):**
  - FCA: "Built for firms answerable to the FCA — detection and drafting by the system, advice and sending by your authorised people."
  - SRA: "Built for SRA-regulated practices — the system detects and drafts; your fee earners review, advise and send."
  - CQC: "Built for CQC-registered providers — patient identifiers are tokenised end to end; clinical decisions stay with your clinicians."
  - ICO: "Registered with the ICO and built to UK GDPR — your data is processed under a DPA, tokenised, and never used for model training."

---

## IND-000 · Synthetic dataset generator — P0 · 2pts · deps: IMS-012
**Do:** `lib/industries/demo-data/generate.ts` (run via `pnpm gen:demo-data`), seeded RNG (seed = slug) producing one JSON per tool: `{ sampleFileId, rowCount, preview: rows[5], resultPayload }` where `resultPayload` duplicates the config's result metrics — the generator asserts equality so displayed CSV previews and result numbers can never disagree. Fictional-name pool: surnames Exampleton, Sampleworth, Demoford, Testwell, Placehold; companies "{Adjective} {Noun} Sample Ltd". Commit generated JSON.
**AC:** ☐ Deterministic across runs ☐ Equality assertion fails the build if config numbers drift ☐ No plausible real-person names.

---

## IND-001 · Mortgage & Finance Brokers — `mortgage-brokers` · accent amber · FCA
**Meta:** title "AI Revenue Recovery for Mortgage Brokers | IntelMadeSimple" · description "Maturity tracking, orphan client revival and protection cross-sell — AI tools that find the fees already sitting in your client book. GDPR-safe, FCA-aware."
**Hero:** h1 "Your client book already knows your next six months of fees" · sub "Three tools that read your book, find every maturing deal and dormant client, and draft the outreach — before the high-street lender gets there." · stats: "£1,244" / "avg proc fee left unclaimed per lapsed client" · "6 mo" / "warning your book gives you before every maturity" · "73%" / "of clients who remortgage stay with whoever contacts them first"
**Pains:** "Maturities slip past" — "£43k+" — "Fixed-rate end dates sit in your CRM while clients drift to their lender's retention team." · "Orphaned clients" — "£29k+" — "Past clients with no assigned adviser quietly remortgage elsewhere." · "Protection never mentioned" — "£24k+" — "Completions close, protection conversations never open."

**Tool 1 — Maturity Radar** (`maturity-radar`)
- Problem: "Fixed-rate end dates are scheduled fee events — most books have no system watching them."
- Outcome: "Every maturing client surfaced six months out, scored by fee value, outreach drafted."
- Sample: `mb-client-book` · "client_book_sample.csv" · csv · "240 client records"
- Stages: "Parsing client book" / "240 records mapped, fields tokenised" → "Detecting maturity dates" / "Scanning fixed-rate end dates across all lenders" → "Scoring fee value & urgency" / "Ranking by proc fee and days to maturity" → "Drafting client outreach" / "Personalised letters and email sequences"
- Result: headline "62 clients maturing within 6 months" · metrics: "Est. proc fees in window" **"£43,400"** (emphasis) · "Outreach drafted" "62" · "Highest-urgency (≤60 days)" "17" · solution "Maturity Radar watches your book continuously and hands your advisers a ready-to-send pipeline every Monday."

**Tool 2 — Orphan Client Revival** (`orphan-client-revival`)
- Problem: "Clients with no assigned adviser remortgage with someone else — silently, every month."
- Outcome: "Dormant and orphaned clients identified, verified as contactable, revival sequences drafted."
- Sample: `mb-orphans` · "orphaned_clients.csv" · csv · "180 dormant records"
- Stages: "Parsing dormant list" / "180 records tokenised" → "Detecting orphan status" / "No adviser contact in 12+ months" → "Scoring revival value" / "Prioritising by likely borrowing need" → "Drafting revival sequences" / "Three-touch reintroduction per client"
- Result: headline "118 revivable clients found" · metrics: "Est. fee opportunity" **"£29,150"** (emphasis) · "Contactable & opted-in" "118" · "Sequences drafted" "118" · solution "Orphan Client Revival turns your dormant back book into a monthly reactivation pipeline."

**Tool 3 — Protection Cross-Sell Engine** (`protection-cross-sell`)
- Problem: "Most completions close without a protection conversation ever being logged."
- Outcome: "Every completion without protection flagged, review invitations drafted for adviser sign-off."
- Sample: `mb-completions` · "completions_2024.csv" · csv · "95 completed cases"
- Stages: "Parsing completions" / "95 cases tokenised" → "Detecting protection gaps" / "No linked policy on file" → "Scoring household exposure" / "Loan size, dependants, term" → "Drafting review invitations" / "Compliance-safe, adviser-approved sends"
- Result: headline "71 completions with no protection recorded" · metrics: "First-year commission opportunity" **"£24,850"** (emphasis) · "Review invitations drafted" "71" · "High-exposure households" "23" · solution "The engine flags the gap and drafts the invitation — your authorised adviser owns the advice."

**Results block:** heading "What a 240-client book gave back" · before "Maturities tracked in a spreadsheet, when there's time" · after "£97,400 of fee opportunity surfaced and drafted in one run" · metrics: "Total opportunity found" **"£97,400"** · "Client actions drafted" "251" · "Adviser hours saved / month" "31"
**Package anchor:** "Build from £5,500 · from £2,500/month · one recovered maturity month covers the retainer"
**FAQ Q2:** "A CSV or CRM export of your client book — client, lender, rate end date, last contact. We map it in onboarding; you never reformat anything." **Q4:** "Yes — Smartr365, 360 Lifecycle, Intelligent Office and spreadsheet books. If it exports, we ingest it." **Unit (Q5):** "maturity"
**Related:** `ifas-wealth-managers`, `commercial-insurance-brokers`

---

## IND-002 · Wealth Management & IFAs — `ifas-wealth-managers` · accent emerald · FCA
**Meta:** "AI Revenue Recovery for IFAs & Wealth Managers | IntelMadeSimple" · "Dormant book mining, advice gap scanning and next-generation retention — AI tools that protect recurring fees and surface advice opportunities. GDPR-safe, FCA-aware."
**Hero:** h1 "Your recurring fees are only as safe as your least-contacted client" · sub "Three tools that read your client register, find the drifting relationships and uncovered advice gaps, and draft the review invitations." · stats: "18 mo" / "without review before a client starts listening to other advisers" · "£2,400" / "average recurring fee at risk per drifting client" · "70%" / "of inherited wealth leaves the original adviser"
**Pains:** "Silent drift" — "£38k+" — "Clients past their review date quietly become someone else's clients." · "Uncovered gaps" — "£57k+" — "Protection and pension gaps sit unadvised across the book." · "The generation cliff" — "£9.6m" — "AUM walks out with the next generation you've never met."

**Tool 1 — Dormant Book Miner** (`dormant-book-miner`)
- Problem: "Review dates lapse quietly — nobody sees the whole book's drift in one place."
- Outcome: "Every overdue relationship surfaced, ranked by recurring fee at risk, review invitations drafted."
- Sample: `ifa-register` · "client_register.csv" · csv · "410 client records"
- Stages: "Parsing client register" / "410 records tokenised" → "Detecting review drift" / "Last review and last contact per client" → "Scoring fees at risk" / "Recurring fee × drift months" → "Drafting review invitations" / "Personalised, adviser-approved"
- Result: headline "96 clients past review with fees at risk" · metrics: "Recurring fees at risk" **"£38,400/yr"** (emphasis) · "Invitations drafted" "96" · "18+ months unseen" "34" · solution "The Miner runs monthly so drift is caught in weeks, not at renewal."

**Tool 2 — Gap Scanner** (`gap-scanner`)
- Problem: "Advice gaps across a whole book are invisible client-by-client."
- Outcome: "Protection, pension and ISA gaps flagged book-wide, sized in fee terms, agendas drafted."
- Sample: `ifa-holdings` · "holdings_export.csv" · csv · "410 clients · 1,120 holdings"
- Stages: "Parsing holdings" / "1,120 positions tokenised" → "Detecting advice gaps" / "Cover, contribution and allowance gaps" → "Scoring opportunity" / "Fee value per gap per client" → "Drafting review agendas" / "One agenda per flagged client"
- Result: headline "143 advice gaps across 88 clients" · metrics: "Advice fee opportunity" **"£57,200"** (emphasis) · "Review agendas drafted" "88" · "Unprotected high-earners" "26" · solution "Gap Scanner gives every adviser a reason to call — with the numbers already on the agenda."

**Tool 3 — NextGen Retain** (`nextgen-retain`)
- Problem: "When wealth transfers, the next generation rarely knows your firm's name."
- Outcome: "Households facing transfer identified, next-gen contact status mapped, introduction plans drafted."
- Sample: `ifa-households` · "household_links.csv" · csv · "410 clients · 130 linked households"
- Stages: "Parsing household links" / "130 households tokenised" → "Detecting transfer exposure" / "Age, estate signals, linked contacts" → "Scoring AUM exposure" / "Assets facing transfer within 10 years" → "Drafting introduction plans" / "Family review invitations per household"
- Result: headline "64 households facing wealth transfer" · metrics: "AUM exposed" **"£9.6m"** (emphasis) · "No next-gen contact on file" "51" · "Introduction plans drafted" "64" · solution "NextGen Retain starts the second-generation relationship years before the transfer event."

**Results block:** "What a 410-client register gave back" · before "Reviews scheduled from memory and diary notes" · after "£95,600 of fee opportunity and £9.6m of AUM exposure mapped in one run" · metrics: "Fee opportunity surfaced" **"£95,600"** · "Client actions drafted" "248" · "Households protected" "64"
**Package anchor:** "Build from £6,000 · from £2,750/month · one retained client typically covers the year"
**FAQ Q2:** "A client register export — client, recurring fee, last review, holdings summary. Back-office exports work as-is." **Q4:** "Yes — Intelliflo Office, Xplan, Curo and spreadsheet registers." **Unit:** "retained client"
**Related:** `mortgage-brokers`, `accountancy-firms`

---

## IND-003 · Law Firms — `law-firms` · accent indigo · SRA
**Meta:** "AI Revenue Recovery for Law Firms | IntelMadeSimple" · "Enquiry recovery, WIP leak detection and cross-practice radar — AI tools that capture the instructions and billable time your firm already earned. GDPR-safe, SRA-aware."
**Hero:** h1 "Your firm loses more to slow follow-up than to any competitor" · sub "Three tools that read your enquiry log, time ledger and matter history — and hand your fee earners the instructions they were about to lose." · stats: "42%" / "of law-firm enquiries never receive a follow-up" · "£1,540" / "average instruction value lost per unanswered enquiry" · "90 days" / "after which unbilled WIP rarely gets billed"
**Pains:** "Enquiries go cold" — "£186k" — "Prospects instruct whoever replies first; the log says that's often not you." · "WIP leaks" — "£47k" — "Recorded time ages past 90 days and quietly gets written off." · "One-matter clients" — "£83k" — "Conveyancing clients leave without ever hearing about wills or LPAs."

**Tool 1 — Enquiry Recovery Engine** (`enquiry-recovery`)
- Problem: "Enquiries arrive nights and weekends; follow-up depends on who's busiest."
- Outcome: "Every unconverted enquiry found, valued by matter type, follow-up sequences drafted."
- Sample: `law-enquiries` · "enquiry_log.csv" · csv · "312 enquiries · 6 months"
- Stages: "Parsing enquiry log" / "312 enquiries tokenised" → "Detecting lost follow-ups" / "No response or single-touch only" → "Scoring instruction value" / "By matter type and stated need" → "Drafting recovery sequences" / "Three-touch, per matter type"
- Result: headline "121 enquiries never followed up" · metrics: "Est. instruction value" **"£186,300"** (emphasis) · "Recovery sequences drafted" "121" · "High-value (£3k+ matters)" "38" · solution "The engine watches your enquiry channels and drafts same-day responses for fee-earner sign-off."

**Tool 2 — WIP Leak Detector** (`wip-leak-detector`)
- Problem: "Unbilled time ages invisibly across dozens of matters until write-off."
- Outcome: "Ageing WIP surfaced by matter and fee earner, billing narratives drafted."
- Sample: `law-ledger` · "time_ledger.csv" · csv · "2,400 time entries"
- Stages: "Parsing time ledger" / "2,400 entries tokenised" → "Detecting ageing WIP" / "Unbilled entries past 60/90 days" → "Scoring recoverability" / "By matter status and client history" → "Drafting billing narratives" / "Ready for partner review"
- Result: headline "£47,200 unbilled beyond 90 days" · metrics: "Recoverable WIP" **"£47,200"** (emphasis) · "Matters affected" "34" · "Narratives drafted" "34" · solution "The detector runs weekly so WIP gets billed at 30 days, not written off at 120."

**Tool 3 — Cross-Practice Radar** (`cross-practice-radar`)
- Problem: "Each department's clients never hear what the other departments do."
- Outcome: "Single-matter clients matched to obvious next needs, introduction letters drafted."
- Sample: `law-matters` · "matter_history.csv" · csv · "890 closed matters"
- Stages: "Parsing matter history" / "890 matters tokenised" → "Detecting single-service clients" / "Conveyancing without wills, probate without IHT advice" → "Scoring next-matter fit" / "Life-event and matter-type signals" → "Drafting introductions" / "Warm, per practice area"
- Result: headline "208 clients with an obvious next matter" · metrics: "Cross-sell opportunity" **"£83,600"** (emphasis) · "Introduction letters drafted" "208" · "Conveyancing → wills matches" "156" · solution "The radar turns every closed matter into the start of the next one."

**Results block:** "What one mid-size firm's data gave back" · before "Follow-up when someone remembers; billing at quarter end" · after "£317,100 of instructions, WIP and cross-sell surfaced in one run" · metrics: "Total opportunity" **"£317,100"** · "Client actions drafted" "363" · "Fee-earner hours saved / month" "40"
**Package anchor:** "Build from £6,500 · from £3,000/month · one recovered instruction covers a quarter"
**FAQ Q2:** "Exports of your enquiry log, time ledger and closed-matter list. We map fields in onboarding — no reformatting by your team." **Q4:** "Yes — Clio, LEAP, Actionstep, Proclaim and practice-management exports." **Unit:** "instruction"
**Related:** `accountancy-firms`, `ma-advisory-business-brokers`

---

## IND-004 · Executive Search & Recruitment — `executive-search-recruitment` · accent violet · ICO
**Meta:** "AI Revenue Recovery for Executive Search Firms | IntelMadeSimple" · "Candidate database revival, hiring-signal radar and shortlist acceleration — AI tools that turn your existing database into placements. GDPR-safe."
**Hero:** h1 "Your next placement is already in your database" · sub "Three tools that re-read your candidate pool against live mandates, watch target accounts for hiring signals, and cut shortlist time to minutes." · stats: "£18k" / "average fee per specialist placement" · "8%" / "of a typical candidate database is active-searchable at any time" · "4 min" / "from job spec to ranked shortlist"
**Pains:** "Database rot" — "£54k+" — "Ten thousand CVs, none of them re-read when a new mandate lands." · "Cold BD" — "27 firms" — "Hiring signals fire daily at your target accounts; nobody's watching." · "Slow shortlists" — "3 days" — "The first shortlist in wins; yours takes days of manual trawling."

**Tool 1 — CV Revival Engine** (`cv-revival-engine`)
- Problem: "New mandates get new sourcing; the database you already paid for stays unread."
- Outcome: "Whole database re-matched against live roles, best-fit candidates ranked, re-engagement drafted."
- Sample: `rec-database` · "candidate_db_sample.csv" · csv · "1,500 candidate records"
- Stages: "Parsing candidate pool" / "1,500 profiles tokenised" → "Detecting live-role matches" / "Skills, sector, seniority vs open mandates" → "Scoring placement fit" / "Fit × recency × availability signals" → "Drafting re-engagement" / "Personalised per candidate-role pair"
- Result: headline "84 strong matches for live mandates" · metrics: "Fee value if 3 place" **"£54,000"** (emphasis) · "Re-engagement drafted" "84" · "Interview-ready this month" "22" · solution "The engine re-reads your database every time a mandate opens — sourcing starts warm."

**Tool 2 — Hiring Signal Radar** (`hiring-signal-radar`)
- Problem: "Funding rounds, leadership exits and growth signals fire while your BD list sleeps."
- Outcome: "Target accounts monitored for hiring signals, warm briefs drafted the morning they fire."
- Sample: `rec-targets` · "target_accounts.csv" · csv · "150 target companies"
- Stages: "Parsing target list" / "150 accounts mapped" → "Detecting hiring signals" / "Funding, exits, job-ad velocity, expansion" → "Scoring approach timing" / "Signal strength × relationship history" → "Drafting BD briefs" / "One-page brief per live signal"
- Result: headline "27 accounts showing live hiring signals" · metrics: "Warm BD briefs drafted" **"27"** (emphasis) · "Funding-round triggers" "9" · "Leadership-change triggers" "11" · solution "The radar makes every BD call a response to something that happened this week."

**Tool 3 — Shortlist Accelerator** (`shortlist-accelerator`)
- Problem: "Manual longlist-to-shortlist takes days the client spends talking to your competitor."
- Outcome: "Job spec in, ranked shortlist with rationale and interview packs out — in minutes."
- Sample: `rec-jobspec` · "job_spec_sample.pdf" · pdf · "1 role · Head of Engineering"
- Stages: "Parsing job spec" / "Requirements and success profile extracted" → "Detecting candidates" / "Database + revival pool searched" → "Scoring & ranking" / "Weighted fit with evidence lines" → "Drafting shortlist pack" / "12 profiles, rationale, interview questions"
- Result: headline "Ranked shortlist of 12 in 4 minutes" · metrics: "Time to shortlist" **"4 min"** (emphasis) · "Evidence-backed profiles" "12" · "Interview packs drafted" "12" · solution "The accelerator makes yours the first credible shortlist on the client's desk — every time."

**Results block:** "What one specialist desk's data gave back" · before "Every mandate sourced from scratch; BD from a cold list" · after "84 warm candidates, 27 live BD triggers, shortlists in minutes" · metrics: "Placement-fee pipeline" **"£54,000+"** · "Warm actions drafted" "111" · "Consultant hours saved / month" "36"
**Package anchor:** "Build from £5,500 · from £2,500/month · one placement covers the year"
**FAQ Q2:** "A candidate export (CSV) and your live mandate list. LinkedIn Recruiter exports work too." **Q4:** "Yes — Bullhorn, Vincere, JobAdder, Loxo and ATS CSV exports." **Unit:** "placement"
**Related:** `b2b-saas`, `ma-advisory-business-brokers`

---

## IND-005 · Commercial Insurance Brokers — `commercial-insurance-brokers` · accent sky · FCA
**Meta:** "AI Revenue Recovery for Insurance Brokers | IntelMadeSimple" · "Renewal defence, cover-gap scanning and quote turnaround — AI tools that protect your book and win the ones you quote. GDPR-safe, FCA-aware."
**Hero:** h1 "Your renewal book is your business — defend it like one" · sub "Three tools that spot at-risk renewals 90 days out, find uncovered risks across your book, and get your submissions to underwriters first." · stats: "90 days" / "before renewal, when retention is won or lost" · "£1,800" / "average commission on a lost commercial renewal" · "1st" / "broker back to the client wins the placement"
**Pains:** "Silent churn" — "£74k GWP" — "At-risk renewals look fine until the non-renewal email arrives." · "Uncovered risks" — "£52k" — "Clients hold property cover and no cyber, D&O or BI — nobody's checked the book." · "Slow submissions" — "2 days" — "Underwriters reward the first complete submission; yours is still in the inbox."

**Tool 1 — Renewal Defence** (`renewal-defence`)
- Problem: "Churn risk hides in mid-term behaviour — claims friction, contact gaps, premium jumps."
- Outcome: "Every renewal risk-scored 90 days out, retention outreach drafted for account handlers."
- Sample: `ins-book` · "policy_book.csv" · csv · "620 policies"
- Stages: "Parsing policy book" / "620 policies tokenised" → "Detecting churn signals" / "Premium movement, claims friction, contact gaps" → "Scoring renewal risk" / "90-day risk score per policy" → "Drafting retention outreach" / "Per-client renewal reviews"
- Result: headline "41 renewals at risk in the next 90 days" · metrics: "GWP at risk" **"£74,000"** (emphasis) · "Commission exposure" "£11,100" · "Retention plans drafted" "41" · solution "Renewal Defence gives your handlers a 90-day head start on every wobbling account."

**Tool 2 — Cover Gap Scanner** (`cover-gap-scanner`)
- Problem: "Cross-sell across a 600-policy book is impossible client-by-client."
- Outcome: "Every obvious uncovered risk flagged and sized, review invitations drafted."
- Sample: `ins-schedules` · "client_schedules.csv" · csv · "310 clients · cover schedules"
- Stages: "Parsing schedules" / "310 client schedules tokenised" → "Detecting cover gaps" / "Cyber, D&O, BI, key person vs sector norms" → "Scoring premium opportunity" / "Gap value per client" → "Drafting review invitations" / "Risk-review agenda per client"
- Result: headline "133 uncovered risks across 97 clients" · metrics: "Premium opportunity" **"£52,300"** (emphasis) · "Review invitations drafted" "97" · "Cyber gaps in exposed sectors" "44" · solution "The scanner turns your existing book into your best new-business pipeline."

**Tool 3 — Quote Turnaround Engine** (`quote-turnaround`)
- Problem: "Assembling a clean underwriter submission from client documents takes days."
- Outcome: "Client docs in, structured underwriter-ready submission pack out in minutes."
- Sample: `ins-submission` · "submission_docs_sample.pdf" · pdf · "1 client · 4 documents"
- Stages: "Parsing client documents" / "Proposal forms and schedules extracted" → "Detecting required fields" / "Per line of business" → "Scoring completeness" / "Gaps flagged with client questions" → "Drafting submission pack" / "Underwriter-ready, house style"
- Result: headline "Underwriter-ready pack in 6 minutes" · metrics: "Turnaround time" **"6 min"** (emphasis) · "Fields auto-completed" "58" · "Missing items flagged" "3" · solution "First complete submission in wins — the engine makes that yours by default."

**Results block:** "What a 620-policy book gave back" · before "Renewals reviewed at 30 days; cross-sell when someone thinks of it" · after "£126,300 of GWP defence and premium opportunity surfaced in one run" · metrics: "Opportunity surfaced" **"£126,300"** · "Client actions drafted" "138" · "Handler hours saved / month" "34"
**Package anchor:** "Build from £6,000 · from £2,750/month · two defended renewals cover the retainer"
**FAQ Q2:** "A policy book export — client, line, renewal date, premium, claims flag — plus cover schedules for the scanner." **Q4:** "Yes — Acturis, Open GI, Applied Epic and broker-system CSV exports." **Unit:** "defended renewal"
**Related:** `mortgage-brokers`, `commercial-property`

---

## IND-006 · M&A Advisory & Business Brokers — `ma-advisory-business-brokers` · accent rose · ICO
**Meta:** "AI Deal Origination for M&A Advisers | IntelMadeSimple" · "Succession scanning, target sourcing and buyer-mandate matching — AI tools that originate sell-side mandates before the market sees them. GDPR-safe."
**Hero:** h1 "The best mandates are signed before anyone knows they're for sale" · sub "Three tools that read public filings and your own mandate book to surface succession-risk owners, matched targets and live buyer fits." · stats: "£75k+" / "typical fee on a lower-mid-market mandate" · "60%" / "of UK owner-managers past 55 have no succession plan" · "2,400" / "companies scanned per region per run"
**Pains:** "Origination drought" — "67 targets" — "Every adviser fishes the same pond; the off-market pond is bigger." · "Slow target search" — "38 fits" — "Buyer mandates stall for weeks while target lists are built by hand." · "Unmatched books" — "12 matches" — "Live buyers and live sellers sit in the same office, unintroduced."

**Tool 1 — Succession Signal Scanner** (`succession-signal-scanner`)
- Problem: "Succession-risk owners don't announce themselves — their filings do."
- Outcome: "Regional company base scanned for succession signals, ranked pipeline with approach drafts."
- Sample: `ma-region` · "region_companies.csv" · csv · "2,400 companies · one region"
- Stages: "Parsing company base" / "2,400 filings profiles loaded" → "Detecting succession signals" / "Director age, tenure, no successor, profit stability" → "Scoring mandate likelihood" / "Signal stack per company" → "Drafting approaches" / "Owner-appropriate letters per target"
- Result: headline "67 succession-risk targets identified" · metrics: "Priority pipeline" **"67"** (emphasis) · "Directors 60+ with no successor" "41" · "Approach letters drafted" "67" · solution "The scanner refreshes monthly — your origination pipeline fills from public data, not networking luck."

**Tool 2 — Target Sourcer** (`target-sourcer`)
- Problem: "A buyer mandate is only as good as the target list behind it."
- Outcome: "Mandate criteria in, scored long-list of matched acquisition targets out."
- Sample: `ma-mandate` · "buyer_mandate_sample.pdf" · pdf · "1 mandate · acquisition criteria"
- Stages: "Parsing mandate" / "Sector, size, geography, deal criteria extracted" → "Detecting candidates" / "Company base screened against criteria" → "Scoring strategic fit" / "Financial and strategic weighting" → "Drafting target profiles" / "One-page profile per target"
- Result: headline "38 matched targets for one mandate" · metrics: "Scored targets" **"38"** (emphasis) · "Strong strategic fits" "14" · "Profiles drafted" "38" · solution "Target Sourcer turns a two-week research job into a same-day deliverable."

**Tool 3 — Buyer-Mandate Matcher** (`buyer-mandate-matcher`)
- Problem: "Matches between your own live buyers and sellers go unnoticed across desks."
- Outcome: "Every live buyer and seller cross-matched, introduction memos drafted."
- Sample: `ma-mandates` · "live_mandates.csv" · csv · "31 buy-side · 19 sell-side"
- Stages: "Parsing mandate book" / "50 mandates tokenised" → "Detecting cross-matches" / "Criteria intersection buy×sell" → "Scoring deal probability" / "Fit, valuation gap, timing" → "Drafting intro memos" / "Per-match, partner-ready"
- Result: headline "12 live buyer-seller matches in your own book" · metrics: "Matches found" **"12"** (emphasis) · "High-probability" "5" · "Intro memos drafted" "12" · solution "The matcher makes sure the deal sitting in your own office never walks out of it."

**Results block:** "What one regional desk's run gave back" · before "Origination by referral; target lists by hand" · after "117 mandate opportunities and matches surfaced in one run" · metrics: "Pipeline entries created" **"117"** · "Partner-ready documents" "117" · "Research hours saved / month" "45"
**Package anchor:** "Build from £7,500 · from £3,500/month · a fraction of one mandate fee"
**FAQ Q2:** "Your live mandate list and target regions/sectors. Company data comes from public filings — we bring that." **Q4:** "Works alongside DealCloud, HubSpot or spreadsheet mandate books." **Unit:** "mandate"
**Related:** `law-firms`, `accountancy-firms`

---

## IND-007 · Commercial Property — `commercial-property` · accent teal · ICO
**Meta:** "AI Revenue Tools for Commercial Property Firms | IntelMadeSimple" · "Lease-event radar, off-market spotting and instant vendor reports — AI tools that surface instructions before competitors know they exist. GDPR-safe."
**Hero:** h1 "Every lease event is an instruction — if you see it first" · sub "Three tools that read portfolios and public signals to surface rent reviews, breaks, off-market opportunities and pitch-winning reports." · stats: "44" / "fee events found in one 150-lease portfolio" · "12 mo" / "notice a lease gives you before every review or break" · "90 sec" / "to a full vendor report"
**Pains:** "Missed lease events" — "£96k" — "Reviews and breaks pass unactioned across managed portfolios." · "On-market only" — "23 deals" — "By the time it's listed, it's an auction — the margin was off-market." · "Slow pitches" — "3 days" — "Instruction pitches lose to whoever shows up with the numbers first."

**Tool 1 — Lease Event Radar** (`lease-event-radar`)
- Problem: "Rent reviews and break clauses are diarised in five places and watched in none."
- Outcome: "Every lease event surfaced 12 months out with fee value, client briefs drafted."
- Sample: `cp-portfolio` · "portfolio_leases.csv" · csv · "150 leases"
- Stages: "Parsing lease schedule" / "150 leases tokenised" → "Detecting events" / "Reviews, breaks, expiries next 12 months" → "Scoring fee value" / "Per event, per instruction type" → "Drafting client briefs" / "Action memo per event"
- Result: headline "44 lease events in the next 12 months" · metrics: "Fee-event value" **"£96,400"** (emphasis) · "Client briefs drafted" "44" · "Break clauses needing action ≤6 mo" "13" · solution "The radar turns lease admin into a scheduled instruction pipeline."

**Tool 2 — Off-Market Spotter** (`off-market-spotter`)
- Problem: "Planning applications and distress signals show tomorrow's deals — nobody reads them daily."
- Outcome: "Public signals scanned across target areas, off-market opportunities scored, approaches drafted."
- Sample: `cp-signals` · "area_signals_sample.csv" · csv · "3 postcodes · 90 days of signals"
- Stages: "Parsing signal feed" / "Planning, charges, EPC and listing signals" → "Detecting opportunities" / "Pre-market disposal and reposition signals" → "Scoring deal quality" / "Yield, tenure, motivation signals" → "Drafting approaches" / "Owner letters per opportunity"
- Result: headline "23 pre-market opportunities in 3 postcodes" · metrics: "Opportunities scored" **"23"** (emphasis) · "Motivated-owner signals" "9" · "Approach letters drafted" "23" · solution "The spotter reads the public record daily so your acquisitions desk moves before the listing exists."

**Tool 3 — Instant Vendor Report** (`instant-vendor-report`)
- Problem: "Pitch-winning reports take days of comparables work — pitches happen this week."
- Outcome: "Address in, branded vendor report with comparables and strategy out in 90 seconds."
- Sample: `cp-brief` · "instruction_brief_sample.pdf" · pdf · "1 property · pitch brief"
- Stages: "Parsing brief" / "Property, tenure and objective extracted" → "Detecting comparables" / "Recent transactions and demand signals" → "Scoring pricing strategy" / "Range with evidence" → "Drafting vendor report" / "Branded, pitch-ready"
- Result: headline "Pitch-ready vendor report in 90 seconds" · metrics: "Time to report" **"90 sec"** (emphasis) · "Comparables evidenced" "11" · "Pricing scenarios" "3" · solution "Walk into every pitch as the firm that already did the work."

**Results block:** "What one managed portfolio gave back" · before "Lease diaries in spreadsheets; pitches built overnight" · after "£96,400 of fee events plus 23 off-market leads in one run" · metrics: "Fee opportunity surfaced" **"£96,400+"** · "Actions drafted" "67" · "Surveyor hours saved / month" "38"
**Package anchor:** "Build from £6,500 · from £3,000/month · one instruction covers a quarter"
**FAQ Q2:** "A lease schedule export for the radar; target postcodes for the spotter. Public data we bring ourselves." **Q4:** "Yes — Reapit, Alto, MRI Qube and schedule spreadsheets." **Unit:** "instruction"
**Related:** `commercial-insurance-brokers`, `ma-advisory-business-brokers`

---

## IND-008 · Accountancy Firms — `accountancy-firms` · accent orange · ICO
**Meta:** "AI Advisory Revenue Tools for Accountancy Firms | IntelMadeSimple" · "Advisory opportunity scanning, fee-leak detection and onboarding automation — AI tools that turn a compliance client base into an advisory pipeline. GDPR-safe."
**Hero:** h1 "Your compliance base is an advisory goldmine nobody's mining" · sub "Three tools that read your client list, spot every R&D, allowance and planning opportunity, and stop fees leaking through scope creep." · stats: "78" / "advisory flags found in one 350-client base" · "£1,820" / "average advisory engagement per flag" · "11 → 3 days" / "onboarding time with automated chasing"
**Pains:** "Advisory blindness" — "£142k" — "R&D, allowances and exit-planning triggers sit unnoticed in the accounts you already file." · "Scope creep" — "£38k" — "Out-of-scope work gets done, logged and never billed." · "Onboarding drag" — "11 days" — "New clients wait on documents while WIP can't start."

**Tool 1 — Advisory Opportunity Scanner** (`advisory-opportunity-scanner`)
- Problem: "Advisory triggers hide in data your firm already holds — nobody reads the base as one dataset."
- Outcome: "Every client scanned for advisory triggers, opportunities sized, partner conversation packs drafted."
- Sample: `acc-clients` · "client_base_sample.csv" · csv · "350 clients"
- Stages: "Parsing client base" / "350 clients tokenised" → "Detecting triggers" / "R&D, capital allowances, EMI, exit signals" → "Scoring engagement value" / "Fee per opportunity type" → "Drafting conversation packs" / "Per client, partner-ready"
- Result: headline "78 advisory opportunities across the base" · metrics: "Advisory pipeline" **"£142,000"** (emphasis) · "R&D candidates" "12" · "Conversation packs drafted" "78" · solution "The scanner re-runs each quarter — advisory stops depending on which partner remembered what."

**Tool 2 — Fee Leak Detector** (`fee-leak-detector`)
- Problem: "Scope creep is invisible until year-end margin review — then it's history."
- Outcome: "Out-of-scope work surfaced monthly against engagement letters, fee conversations drafted."
- Sample: `acc-engagements` · "engagements_sample.csv" · csv · "350 engagements · time data"
- Stages: "Parsing engagements" / "Letters and time entries tokenised" → "Detecting scope creep" / "Work outside engaged scope" → "Scoring recoverable fees" / "Per client, per service line" → "Drafting fee conversations" / "Reasonable, evidence-backed"
- Result: headline "£38,200 of out-of-scope work unbilled" · metrics: "Recoverable fees" **"£38,200"** (emphasis) · "Clients affected" "41" · "Conversations drafted" "41" · solution "The detector catches creep in the month it happens, while the value is fresh in the client's mind."

**Tool 3 — Onboarding Chaser** (`onboarding-chaser`)
- Problem: "Onboarding stalls on unanswered document requests nobody has time to chase."
- Outcome: "Every stalled onboarding chased automatically with polite persistence, status board live."
- Sample: `acc-onboarding` · "onboarding_status.csv" · csv · "38 in-progress clients"
- Stages: "Parsing onboarding pipeline" / "38 clients tokenised" → "Detecting stalls" / "Missing items and idle days" → "Scoring priority" / "Fee value × idle time" → "Drafting chase sequences" / "Per item, per client"
- Result: headline "23 stalled onboardings unblocked" · metrics: "Onboarding time" **"11 → 3 days"** (emphasis) · "Chase sequences drafted" "23" · "Documents auto-requested" "61" · solution "The chaser never forgets, never nags twice the same way, and starts your WIP a week earlier."

**Results block:** "What a 350-client base gave back" · before "Advisory when a partner spots it; billing what's remembered" · after "£180,200 of advisory and fee recovery surfaced in one run" · metrics: "Opportunity surfaced" **"£180,200"** · "Client actions drafted" "142" · "Partner hours saved / month" "30"
**Package anchor:** "Build from £6,000 · from £2,750/month · two advisory engagements cover the year"
**FAQ Q2:** "A client list export with services and basic financial flags, plus engagement letters for the leak detector." **Q4:** "Yes — Xero HQ, IRIS, Karbon, Senta and practice-management exports." **Unit:** "advisory engagement"
**Related:** `law-firms`, `ifas-wealth-managers`

---

## IND-009 · B2B SaaS — `b2b-saas` · accent cyan · ICO
**Meta:** "AI Revenue Recovery for B2B SaaS | IntelMadeSimple" · "Churn-signal detection, failed-payment recovery and expansion mining — AI tools that defend and grow ARR from data you already have. GDPR-safe."
**Hero:** h1 "Your ARR leaks are in the data you already collect" · sub "Three tools that read usage and billing exports, flag the accounts about to churn, recover failed payments, and surface expansion-ready customers." · stats: "£186k" / "ARR flagged at risk in one 480-account export" · "9%" / "of failed payments never retried effectively" · "41" / "expansion-ready accounts found in the same file"
**Pains:** "Silent churn" — "£186k" — "Usage decline shows 60 days before the cancellation email — if anyone's looking." · "Involuntary churn" — "£23k" — "Failed payments quietly expire instead of being recovered." · "Missed expansion" — "£96k" — "Accounts hitting plan limits never hear from sales."

**Tool 1 — Churn Signal Detector** (`churn-signal-detector`)
- Problem: "Churn risk shows in usage decline and support friction long before renewal."
- Outcome: "Every account risk-scored from usage patterns, save-plays drafted for CS."
- Sample: `saas-usage` · "usage_export_sample.csv" · csv · "480 accounts · 90 days"
- Stages: "Parsing usage export" / "480 accounts tokenised" → "Detecting risk signals" / "Login decay, seat shrink, ticket sentiment" → "Scoring churn risk" / "ARR-weighted risk per account" → "Drafting save plays" / "Per account, CS-ready"
- Result: headline "32 accounts showing churn signals" · metrics: "ARR at risk" **"£186,000"** (emphasis) · "Save plays drafted" "32" · "High-risk enterprise accounts" "7" · solution "The detector runs weekly so CS works a ranked save list, not a renewal surprise."

**Tool 2 — Failed Payment Recovery** (`failed-payment-recovery`)
- Problem: "Dunning defaults let recoverable revenue expire in silence."
- Outcome: "Failed payments segmented by cause, recovery sequences drafted per segment."
- Sample: `saas-billing` · "billing_export_sample.csv" · csv · "480 accounts · billing events"
- Stages: "Parsing billing events" / "Payment failures tokenised" → "Detecting recoverable failures" / "Card expiry vs decline vs dispute" → "Scoring recovery odds" / "By cause, tenure, value" → "Drafting recovery flows" / "Cause-specific sequences"
- Result: headline "£23,400 in recoverable failed payments" · metrics: "Recoverable MRR events" **"£23,400"** (emphasis) · "Card-expiry saves" "61%" · "Sequences drafted" "48" · solution "Recovery flows tuned to failure cause — not one generic dunning email on repeat."

**Tool 3 — Expansion Miner** (`expansion-miner`)
- Problem: "Expansion-ready accounts announce themselves in usage data nobody mines."
- Outcome: "Accounts at plan limits or multi-team usage flagged, expansion plays drafted for sales."
- Sample: `saas-usage-2` · "usage_export_sample.csv" · csv · "same 480-account export"
- Stages: "Parsing usage export" / "480 accounts re-read for growth" → "Detecting expansion signals" / "Limit proximity, seat growth, feature adoption" → "Scoring expansion value" / "Uplift per account" → "Drafting expansion plays" / "Per account, AE-ready"
- Result: headline "41 expansion-ready accounts" · metrics: "Expansion ARR available" **"£96,000"** (emphasis) · "At plan limits now" "18" · "Plays drafted" "41" · solution "The miner hands sales a warm expansion list from the same file that defends your base."

**Results block:** "What one 480-account export gave back" · before "Churn found at renewal; dunning on defaults; expansion ad hoc" · after "£305,400 of ARR defence and growth surfaced from two CSVs" · metrics: "ARR opportunity" **"£305,400"** · "Plays drafted" "121" · "CS/RevOps hours saved / month" "42"
**Package anchor:** "Build from £6,500 · from £3,000/month · one saved enterprise account covers the year"
**FAQ Q2:** "Usage and billing exports (CSV) — or read-only access to Stripe and your analytics. No production access needed." **Q4:** "Yes — Stripe, Chargebee, HubSpot, Mixpanel/Amplitude exports and warehouse CSVs." **Unit:** "saved account"
**Related:** `executive-search-recruitment`, `ma-advisory-business-brokers`

---

## IND-010 · Private Healthcare Groups — `private-healthcare-groups` · accent fuchsia · CQC
**Meta:** "AI Revenue Recovery for Private Healthcare Groups | IntelMadeSimple" · "Treatment-plan recovery, capacity-fill radar and review-to-revenue content — AI tools that convert quoted care and fill empty diary time. GDPR-safe, CQC-aware."
**Hero:** h1 "The revenue you quoted last quarter is still sitting in your diary system" · sub "Three tools that follow up every unconverted treatment plan, fill tomorrow's empty chair time, and turn patient questions into booked consultations." · stats: "38%" / "of quoted private treatment plans never book" · "£3,400" / "average value of an unconverted plan" · "19" / "empty diary slots found in one week's export"
**Pains:** "Quotes that vanish" — "£96k" — "Patients say 'I'll think about it' and never hear from you again." · "Empty chair time" — "19 slots" — "Tomorrow's gaps are found tomorrow — too late to fill." · "Unanswered questions" — "14 topics" — "Patients ask the internet about your treatments; competitors answer."

**Tool 1 — Treatment Plan Recovery** (`treatment-plan-recovery`)
- Problem: "Unconverted plans get one follow-up call, if the front desk finds time."
- Outcome: "Every open quote followed up with a patient-appropriate sequence, pipeline visible to the group."
- Sample: `hc-quotes` · "treatment_quotes_sample.csv" · csv · "140 unconverted plans · one quarter"
- Stages: "Parsing quote list" / "140 plans, patient identifiers tokenised" → "Detecting recoverable plans" / "Open, undecided, finance-stalled" → "Scoring recovery likelihood" / "Value × recency × treatment type" → "Drafting follow-up sequences" / "Tone-matched per treatment"
- Result: headline "£96,000 of quoted treatment still open" · metrics: "Recoverable pipeline" **"£96,000"** (emphasis) · "Sequences drafted" "112" · "Finance-option candidates" "37" · solution "Recovery runs weekly across every site — no plan goes quiet without three considered follow-ups."

**Tool 2 — Capacity Fill Radar** (`capacity-fill-radar`)
- Problem: "Cancellations create gaps the diary team discovers on the day."
- Outcome: "Tomorrow's gaps detected tonight, matched patients invited automatically."
- Sample: `hc-diary` · "diary_export_sample.csv" · csv · "7 days · 4 practitioners"
- Stages: "Parsing diary export" / "Appointments tokenised" → "Detecting gaps" / "Next-7-day unfilled slots" → "Scoring patient matches" / "Waitlist, overdue recalls, open plans" → "Drafting invitations" / "Short-notice offers per slot"
- Result: headline "19 fillable slots in the next 7 days" · metrics: "Slot value" **"£8,550"** (emphasis) · "Matched patients invited" "57" · "Overdue recalls included" "24" · solution "The radar treats every gap as revenue with a deadline — and moves before the day arrives."

**Tool 3 — Review-to-Revenue Engine** (`review-to-revenue`)
- Problem: "Your reviews contain every question patients ask before booking — unused."
- Outcome: "Reviews mined for real patient questions, answer content drafted for your site and AI search."
- Sample: `hc-reviews` · "reviews_export_sample.csv" · csv · "420 reviews · you + 3 competitors"
- Stages: "Parsing reviews" / "420 reviews, names removed" → "Detecting question themes" / "Cost, pain, recovery, results, finance" → "Scoring content gaps" / "What competitors answer that you don't" → "Drafting answer content" / "Site + AI-search-ready pages"
- Result: headline "14 patient questions you don't answer publicly" · metrics: "Content pieces drafted" **"14"** (emphasis) · "Competitor-answered gaps" "9" · "Booking-intent topics" "6" · solution "The engine makes your clinic the answer patients find — before they've chosen a clinic."

**Results block:** "What one group's quarter gave back" · before "Follow-up when the desk is quiet; gaps found on the day" · after "£104,550 of recoverable treatment and diary value surfaced in one run" · metrics: "Revenue surfaced" **"£104,550"** · "Patient actions drafted" "183" · "Front-desk hours saved / month" "36"
**Package anchor:** "Build from £6,000 · from £2,750/month · three recovered plans cover the retainer"
**FAQ Q2:** "Exports of open treatment plans and diary data — patient identifiers are tokenised on ingestion, before any AI processing." **Q4:** "Yes — Dentally, SOE Exact, Pabau, Semble and PMS CSV exports." **Unit:** "recovered plan"
**Related:** `ifas-wealth-managers`, `b2b-saas`

---

## IND-011 · Hub page `/industries` — P0 · 1pt · deps: IND-001…010
**Meta:** "Industries — AI Revenue Recovery Tools | IntelMadeSimple" · "Revenue intelligence for professional firms: mortgage, wealth, legal, recruitment, insurance, M&A, property, accountancy, SaaS and private healthcare."
**Intro block:** eyebrow "Industries" · H1 "Revenue intelligence for firms with valuable books" · sub "Every practice below runs on a client book that leaks — maturities missed, follow-ups dropped, gaps unadvised. We build the AI tools that find it, prove it on your own data, and capture it monthly." · reassurance line "Every demo on these pages runs on synthetic data. Identifiable fields are tokenised before any AI processing."
**Cards (registry order, one leak line each):** Mortgage & Finance Brokers "62 maturities were waiting in one sample book" · Wealth & IFAs "£38k of recurring fees at risk in one register" · Law Firms "121 enquiries never followed up in six months" · Executive Search "84 placements hiding in one database" · Insurance Brokers "41 renewals wobbling in the next 90 days" · M&A Advisory "67 succession-risk owners in one region" · Commercial Property "44 lease events in one portfolio" · Accountancy "78 advisory opportunities in one client base" · B2B SaaS "£186k ARR at risk in one export" · Private Healthcare "£96k of quoted treatment still open"
**AC:** ☐ CollectionPage JSON-LD ☐ Card copy exactly as above ☐ All 10 links resolve.

---

## IND-012 · Final content QA — P0 · 2pts · deps: all IND tickets
1. UK-English spellcheck across all configs (tokenise/optimise/personalised).
2. Number-consistency audit: every Results-block total equals the sum/derivation of its three tool results (IND-001: 43,400+29,150+24,850=£97,400 ✓ — verify all ten).
3. Claims audit: no string anywhere says "fully GDPR compliant", "guaranteed", or promises AI-search rankings; GDPR copy matches §3 verbatim.
4. Synthetic-fiction audit: no plausible real names, no real company names, badge present in every demo surface.
5. Meta audit: titles ≤60 chars, descriptions 120–160, all unique (script from IMS-062).
6. Read-aloud pass on every hero + tool line: cut any word that doesn't earn its place.
**AC:** ☐ All six audits recorded in `docs/content-qa.md` with checkboxes ☐ Zod + generator equality checks green.

---

*End of Doc 2. When IMS-064 and IND-012 are both green, the build is launch-complete.*
