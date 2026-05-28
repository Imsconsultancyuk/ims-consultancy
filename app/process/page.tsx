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
  title: "Process",
  description:
    "The seven steps inside every IMS engagement. Audit, decide, blueprint, build, automate, train, hand-off. Open by design so you always know where the work sits.",
  alternates: { canonical: `${SITE}/process` },
  openGraph: {
    title: "Process · IMS Consultancy",
    description: "Seven steps. One engagement. Open by design.",
    url: `${SITE}/process`,
    type: "website",
  },
};

const STEPS = [
  {
    n: "01",
    name: "Audit",
    body:
      "Two weeks of close attention to how the business actually runs. Conversations with the leadership team, observation of the daily work, and a read of the systems already in place. The findings come back as a short, honest document.",
    duration: "Weeks 1 to 2",
  },
  {
    n: "02",
    name: "Decide",
    body:
      "Name the few moves that compound and the many that look busy. Strategy lives on a single readable page that the leadership team can hold in their head. Every option carries an honest counter-argument so the chosen path is one you can defend.",
    duration: "Week 3",
  },
  {
    n: "03",
    name: "Blueprint",
    body:
      "Architecture for the next twelve months with the tradeoffs visible. The blueprint is built to be challenged. Anything that cannot survive a senior engineer or operator reading it does not stay in the document.",
    duration: "Weeks 4 to 5",
  },
  {
    n: "04",
    name: "Build",
    body:
      "Considered code, real tests, observable systems. Shipped in small atomic deliveries you can review, accept, and roll back. The first thing in production is the smallest thing that produces real value.",
    duration: "Weeks 6 onward",
  },
  {
    n: "05",
    name: "Automate",
    body:
      "Quiet AI workflows that remove the dull edges of the team's week. Small models, well chosen, that earn their keep before they grow. Every workflow has a human in the loop for any decision that touches money, people, or compliance.",
    duration: "In parallel with build",
  },
  {
    n: "06",
    name: "Train",
    body:
      "Your team learns by doing the work alongside us. They can extend, debug, and own everything by hand-off. We refuse to be a vendor lock-in.",
    duration: "Final third of build",
  },
  {
    n: "07",
    name: "Hand-off",
    body:
      "Documentation, recordings, full source. A 90-day follow-up window for any clarification. We leave the door open without inserting ourselves where we are not needed.",
    duration: "Final two weeks",
  },
];

const PRINCIPLES = [
  "Written outputs over verbal handoffs. If it is not on the page, it does not exist.",
  "Small decisions made openly, in order, with the tradeoffs visible.",
  "One atomic delivery at a time. No big-bang releases.",
  "First two weeks are funded by IMS. You decide whether to continue with everything you need to decide cleanly.",
];

export default function ProcessPage() {
  const page = webPageJsonLd({
    path: "/process",
    name: "Process · IMS Consultancy",
    description:
      "The seven steps inside every IMS engagement. Audit, decide, blueprint, build, automate, train, hand-off.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Process", path: "/process" },
    ],
  });

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE}/process#howto`,
    name: "How an IMS engagement runs",
    description:
      "The seven steps of an IMS Consultancy engagement, from audit to hand-off.",
    step: STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.body,
    })),
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, howTo]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden bg-deep px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="process-heading"
        >
          <div className="relative mx-auto w-full max-w-4xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Process · Seven steps
              </p>
              <CharSplit
                text={"Open by design.\nQuiet by intent."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Every IMS engagement runs through the same seven steps. You
                always know where the work sits, what decision is next, and
                what is in your hands by the end of each phase.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="process-steps-heading"
          className="relative bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-4xl">
            <h2 id="process-steps-heading" className="sr-only">
              The seven steps
            </h2>
            <ol className="space-y-10" role="list">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 60}>
                  <li className="relative grid gap-6 border-l border-mauve-300/15 pl-8 sm:grid-cols-[auto_1fr] sm:gap-10 sm:border-l-0 sm:pl-0">
                    <div className="sm:w-40 sm:shrink-0">
                      <p className="font-serif text-[3rem] leading-none text-mauve-300/40 sm:text-[3.5rem]">
                        {s.n}
                      </p>
                      <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.22em] text-mauve-300">
                        {s.duration}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-serif text-[1.75rem] font-medium leading-tight text-paper-ink">
                        {s.name}
                      </h3>
                      <p className="mt-4 text-[1.0625rem] leading-[1.7] text-mauve-300">
                        {s.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="process-principles-heading"
          className="relative bg-deep-soft px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Four principles inside every step
              </p>
              <h2
                id="process-principles-heading"
                className="mt-5 font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em]"
              >
                The rhythm under the rhythm.
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
          aria-labelledby="process-cta-heading"
          className="relative bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="process-cta-heading"
                className="font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.012em]"
              >
                Read the engagements that ran this way.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton strength={0.4} radius={110}>
                  <Link
                    href="/case-studies"
                    data-cursor="cta"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-7 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.55)]"
                  >
                    See case studies
                  </Link>
                </MagneticButton>
                <Link
                  href="/contact"
                  data-cursor="link"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-mauve-300/40 bg-deep/40 px-7 text-sm font-medium tracking-[0.02em] text-paper-ink backdrop-blur transition-all duration-300 hover:border-mauve-200 hover:bg-deep/70"
                >
                  Start a conversation
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
