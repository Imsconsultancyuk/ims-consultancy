import type { Metadata } from "next";
import Link from "next/link";
import { TrophyHeader } from "../../_components/TrophyHeader";
import { TrophyFooter } from "../../_components/TrophyFooter";
import { Reveal } from "../../_components/Reveal";
import { CharSplit } from "../../_components/CharSplit";
import { MagneticButton } from "../../_components/MagneticButton";
import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../../_components/JsonLd";

const SITE = "https://intelmadesimple.com";

export const metadata: Metadata = {
  title: "AI Automation",
  description:
    "Quiet AI workflows that take dull, repetitive work off your team. We advise on what to automate, then build and hand over the systems that earn their keep.",
  alternates: { canonical: `${SITE}/services/ai-automation` },
  openGraph: {
    title: "AI Automation · IMS Consultancy",
    description:
      "Considered AI workflows your team can own. Advise, build, hand over.",
    url: `${SITE}/services/ai-automation`,
    type: "website",
  },
};

const OUTCOMES = [
  {
    n: "01",
    title: "Inbox triage and reply drafting",
    body: "Email and ticket queues sorted by intent, urgency, and customer. Draft replies prepared so the human only has to approve and send.",
  },
  {
    n: "02",
    title: "Document and invoice extraction",
    body: "PDFs, scans, and contracts read into clean structured data with human review only for the uncertain rows.",
  },
  {
    n: "03",
    title: "Internal knowledge assistants",
    body: "A grounded, source-linked assistant trained on your handbooks, SOPs, and product docs. Answers your team can verify in one click.",
  },
  {
    n: "04",
    title: "Operations dashboards and alerts",
    body: "Quiet, event-driven dashboards that watch the work and only speak up when something needs attention.",
  },
  {
    n: "05",
    title: "Reporting and weekly briefings",
    body: "End-of-week reports written for you by a model grounded in your own numbers. No more Sunday-night spreadsheet wrangling.",
  },
  {
    n: "06",
    title: "Custom agents inside existing tools",
    body: "Embedded assistants inside Slack, Notion, HubSpot, Linear, or your own admin. No new app for your team to learn.",
  },
];

const PRINCIPLES = [
  "Small models, well chosen, before large ones.",
  "Human review for any decision that touches money, people, or compliance.",
  "Grounded retrieval over open-ended generation wherever facts matter.",
  "Observability and rollback baked into every workflow from day one.",
  "Costs are tracked per workflow so you know what each one actually pays for.",
];

export default function AiAutomationPage() {
  const page = webPageJsonLd({
    path: "/services/ai-automation",
    name: "AI Automation · IMS Consultancy",
    description:
      "Considered AI workflows that remove repetitive work from your team. Advise on what to automate, build the systems, hand them over.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "AI Automation", path: "/services/ai-automation" },
    ],
  });

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}/services/ai-automation#service`,
    name: "AI Automation",
    description:
      "Considered AI workflows that remove repetitive operational work. Advisory plus build plus hand-over.",
    serviceType: "AI workflow integration",
    provider: { "@id": `${SITE}#organization` },
    areaServed: "Worldwide",
    audience: { "@type": "Audience", audienceType: "Small and mid-sized businesses" },
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, service]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="ai-heading"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(58, 109, 240,0.28), rgba(58, 109, 240,0.08) 40%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <div className="relative mx-auto w-full max-w-4xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Service · AI Automation
              </p>
              <CharSplit
                text={"Quiet AI workflows\nthat carry the load."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                We advise on what is worth automating, then build the systems
                that quietly remove the dull edges from your week. Small
                models, well chosen, that prove their value before they grow.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="ai-outcomes-heading"
          className="relative ims-band-light px-6 py-20 text-ink sm:py-24 lg:py-28"
        >
          <div
            aria-hidden
            className="ims-paper-aura pointer-events-none absolute inset-0 -z-10"
          />
          <div className="relative mx-auto w-full max-w-5xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-500">
                Outcomes we deliver
              </p>
              <h2
                id="ai-outcomes-heading"
                className="mt-5 max-w-3xl font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em] text-ink"
              >
                Real work, taken off your team.
              </h2>
            </Reveal>

            <ol className="mt-12 grid gap-6 sm:grid-cols-2" role="list">
              {OUTCOMES.map((o, i) => (
                <Reveal key={o.n} delay={80 + i * 70}>
                  <article className="ims-flip-card group relative h-full overflow-hidden rounded-2xl border border-mauve-500/15 bg-paper-soft/80 p-7 backdrop-blur transition-all duration-500 hover:border-accent-500/0 hover:bg-accent-500 hover:shadow-[0_24px_60px_-22px_rgba(58, 109, 240,0.65)] sm:p-8">
                    <span
                      aria-hidden="true"
                      className="ims-flip-sweep pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <p className="relative font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-500 transition-colors duration-500 group-hover:text-paper">
                      {o.n}
                    </p>
                    <h3 className="relative mt-4 font-serif text-xl font-medium leading-snug text-ink transition-colors duration-500 group-hover:text-paper">
                      {o.title}
                    </h3>
                    <p className="relative mt-3 text-[0.9375rem] leading-[1.7] text-ink-soft transition-colors duration-500 group-hover:text-paper/95">
                      {o.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="ai-principles-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                How we build it
              </p>
              <h2
                id="ai-principles-heading"
                className="mt-5 font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em]"
              >
                Five principles we hold to.
              </h2>
            </Reveal>
            <ul className="mt-10 space-y-5" role="list">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p} delay={80 + i * 60}>
                  <li className="flex items-start gap-4 text-[1.0625rem] leading-[1.7] text-paper-ink/95">
                    <span
                      aria-hidden
                      className="mt-3 inline-block h-[3px] w-4 shrink-0 bg-mauve-200"
                    />
                    <span>{p}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="ai-cta-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="ai-cta-heading"
                className="font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.012em]"
              >
                Worth a thirty-minute conversation?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                We will name two or three places AI could earn its keep in
                your business, and the one we would start with. No deck. No
                obligation.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton strength={0.4} radius={110}>
                  <a
                    href="/contact"
                    data-cursor="cta"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-accent-500 px-7 text-sm font-medium tracking-[0.02em] text-paper-pure transition-all duration-300 hover:bg-accent-400 hover:shadow-[0_8px_32px_-8px_rgba(126, 160, 255,0.55)]"
                  >
                    Book a 20-minute call
                  </a>
                </MagneticButton>
                <Link
                  href="/services"
                  data-cursor="link"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-mauve-300/40 bg-deep/40 px-7 text-sm font-medium tracking-[0.02em] text-paper-ink backdrop-blur transition-all duration-300 hover:border-mauve-200 hover:bg-deep/70"
                >
                  See all services
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <TrophyFooter />
    </>
  );
}
