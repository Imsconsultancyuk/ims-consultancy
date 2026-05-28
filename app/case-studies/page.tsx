import type { Metadata } from "next";
import Link from "next/link";
import { TrophyHeader } from "../_components/TrophyHeader";
import { TrophyFooter } from "../_components/TrophyFooter";
import { Reveal } from "../_components/Reveal";
import { CharSplit } from "../_components/CharSplit";
import { MagneticButton } from "../_components/MagneticButton";
import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../_components/JsonLd";

const SITE = "https://intelmadesimple.com";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Five real IMS engagements, no names attached. Two quiet workflows that returned a team's afternoon, two professional revamps that changed how a department runs, one embedded partnership that rewired a whole business.",
  alternates: { canonical: `${SITE}/case-studies` },
  openGraph: {
    title: "Case Studies · IMS Consultancy",
    description:
      "Anonymised case studies of real IMS engagements.",
    url: `${SITE}/case-studies`,
    type: "website",
  },
};

interface CaseStudy {
  id: string;
  tier: "Quiet workflow" | "Professional revamp" | "Embedded partnership";
  subject: string;
  brief: string;
  situation: string;
  decision: string;
  build: string;
  outcome: string;
  metric: string;
}

const CASES: CaseStudy[] = [
  {
    id: "uk-strategy-consultancy-inbox",
    tier: "Quiet workflow",
    subject: "A UK strategy consultancy",
    brief: "Email triage and reply drafting for a senior consulting team.",
    situation:
      "Senior consultants were each spending around ninety minutes a day reading and routing client email. The team had grown faster than its systems and the triage rota was eating partner time.",
    decision:
      "We chose to keep the existing inbox and layer a quiet auto-sort and draft-reply system on top. No new app for the team to learn. No platform migration. Reversible inside an hour.",
    build:
      "A grounded retrieval system over the firm's tone and prior replies, with intent detection wired to inbox labels. Draft replies prepared and waiting in the queue for approval and send.",
    outcome:
      "Triage time fell from ninety minutes to eight. The drafts are accepted more than seventy percent of the time. Partner time returned to the work that actually pays.",
    metric: "Eighty-two minutes per person per day, returned.",
  },
  {
    id: "regional-property-firm-invoices",
    tier: "Quiet workflow",
    subject: "A regional property firm",
    brief: "PDF invoice extraction and anomaly flagging.",
    situation:
      "The bookkeeping team was reading two hundred supplier invoices a month line by line. Errors slipped through. The accounts team was unhappy. The supplier reconciliation was always two weeks behind.",
    decision:
      "We chose extraction over OCR-and-template. The supplier list was long enough that templating would have collapsed, and short enough that a small grounded model could carry the work.",
    build:
      "A PDF intake pipeline reading invoices into a clean spreadsheet schema, flagging any row outside expected range for human review, and posting the clean rows directly into the accounting system.",
    outcome:
      "Reading time dropped from twenty hours a week to ninety minutes of review. Reconciliation moved from two weeks behind to current. The bookkeepers got their evenings back.",
    metric: "From twenty hours a week to ninety minutes.",
  },
  {
    id: "uk-freight-forwarder-ops",
    tier: "Professional revamp",
    subject: "A UK freight forwarder",
    brief: "Operations system replacing six spreadsheets and three inboxes.",
    situation:
      "Every shipment moved through six spreadsheets and three shared inboxes. People were the integration layer. The team carried the system in their head and never quite went off-rota.",
    decision:
      "We chose an event-driven dashboard built on the data already in the spreadsheets. Migration in stages. No big-bang cut-over. Every stage proven before the next began.",
    build:
      "A single operations dashboard with event-driven updates, integrated with the carrier APIs and the firm's accounting system. Notifications only when human attention was actually needed.",
    outcome:
      "Shipment-touching time fell by sixty percent. The operations team got their evenings back. The shipments still moved.",
    metric: "Operations time reduced by sixty percent.",
  },
  {
    id: "b2b-saas-deploy-chain",
    tier: "Professional revamp",
    subject: "A B2B SaaS team",
    brief: "Continuous integration and on-call rebuild for a brittle deploy chain.",
    situation:
      "The team was shipping twice a week through a deploy chain that broke on roughly one in three releases. The on-call phone rang almost every weekend. Engineering morale was poor.",
    decision:
      "Rebuild the deploy chain in stages while continuing to ship. Add observability before changing behaviour. Decommission the brittle pieces last, after the new path was carrying real traffic.",
    build:
      "Continuous integration on every pull request, atomic deployments with automatic rollback, observability across the request path, and a structured on-call rota with runbooks.",
    outcome:
      "Deploy frequency moved from two a week to fourteen. The on-call phone went quiet. Engineering retention improved over the next two quarters.",
    metric: "From two deploys a week to fourteen.",
  },
  {
    id: "uk-property-consultancy-embedded",
    tier: "Embedded partnership",
    subject: "A UK property consultancy",
    brief: "Long-running advisory and engineering partnership across the business.",
    situation:
      "Brought us in for a single strategy engagement. The leadership team valued the way we worked and asked us to stay alongside them as the business grew.",
    decision:
      "Move from project-by-project to a small embedded retainer. One advisory thread, one engineering thread, one AI thread. Three integrated functions running on one shared rhythm.",
    build:
      "Eighteen months of embedded partnership covering strategy, the technology stack the firm relies on, and AI integration across acquisitions, lettings, and back-office. Monthly cadence with leadership.",
    outcome:
      "We now sit alongside leadership for every major decision. The firm has shipped systems that survived two reorganisations and three new hires. The relationship is the proof.",
    metric: "Three integrated functions running on one shared rhythm.",
  },
];

export default function CaseStudiesPage() {
  const page = webPageJsonLd({
    path: "/case-studies",
    name: "Case Studies · IMS Consultancy",
    description:
      "Five anonymised IMS engagements told as situation, decision, build, and outcome.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Case Studies", path: "/case-studies" },
    ],
  });

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE}/case-studies#list`,
    itemListElement: CASES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.brief,
      url: `${SITE}/case-studies#${c.id}`,
    })),
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, itemList]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden bg-deep px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="cs-heading"
        >
          <div className="relative mx-auto w-full max-w-4xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Case studies · Five engagements
              </p>
              <CharSplit
                text={"Five real engagements,\nno names attached."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Two quiet workflows that returned a team's afternoon. Two
                professional revamps that changed how a department runs. One
                embedded partnership that quietly rewired a whole business.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="cs-list-heading"
          className="relative bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <h2 id="cs-list-heading" className="sr-only">
            Engagements
          </h2>
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 sm:gap-16">
            {CASES.map((c, i) => (
              <Reveal key={c.id} delay={i * 80}>
                <article
                  id={c.id}
                  className="relative overflow-hidden rounded-2xl border border-mauve-300/12 bg-deep-soft/55 p-8 backdrop-blur sm:p-10 lg:p-12"
                >
                  <header className="border-b border-mauve-300/10 pb-6">
                    <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                      {c.tier}
                    </p>
                    <h3 className="mt-3 font-serif text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.15] tracking-[-0.012em]">
                      {c.subject}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] uppercase tracking-[0.16em] text-mauve-300">
                      {c.brief}
                    </p>
                  </header>

                  <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
                    <div>
                      <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                        Situation
                      </p>
                      <p className="mt-3 text-[0.9375rem] leading-[1.7] text-paper-ink/95">
                        {c.situation}
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                        Decision
                      </p>
                      <p className="mt-3 text-[0.9375rem] leading-[1.7] text-paper-ink/95">
                        {c.decision}
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                        Build
                      </p>
                      <p className="mt-3 text-[0.9375rem] leading-[1.7] text-paper-ink/95">
                        {c.build}
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                        Outcome
                      </p>
                      <p className="mt-3 text-[0.9375rem] leading-[1.7] text-paper-ink/95">
                        {c.outcome}
                      </p>
                    </div>
                  </div>

                  <footer className="mt-8 border-t border-mauve-300/10 pt-6">
                    <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                      Headline number
                    </p>
                    <p className="mt-3 font-serif text-[1.25rem] leading-[1.4] text-mauve-200">
                      {c.metric}
                    </p>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="cs-cta-heading"
          className="relative bg-deep-soft px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="cs-cta-heading"
                className="font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.012em]"
              >
                Your engagement could read like one of these.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Tell us what is slow, brittle, or expensive in your week. We
                will tell you honestly whether we are the right partner.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 inline-block">
                <MagneticButton strength={0.45} radius={120}>
                  <Link
                    href="/contact"
                    data-cursor="cta"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-8 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.55)]"
                  >
                    Start a conversation
                  </Link>
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <TrophyFooter />
    </>
  );
}
