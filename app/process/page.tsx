import type { Metadata } from "next";
import Link from "next/link";
import { TrophyHeader } from "../_components/TrophyHeader";
import { TrophyFooter } from "../_components/TrophyFooter";
import { Reveal } from "../_components/Reveal";
import { CharSplit } from "../_components/CharSplit";
import { HeroLedger, LeakLine } from "../_components/LeakLine";
import { MagneticButton } from "../_components/MagneticButton";
import { MethodSequence } from "../_components/MethodSequence";

import { OG_IMAGES } from "@/lib/og";
import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../_components/JsonLd";

const SITE = "https://intelmadesimple.com";

export const metadata: Metadata = {
  title: "Our 7-Step Process, Audit to Hand-off",
  description:
    "Seven steps in three phases: decide, build, compound. See what happens from audit to hand-off, so you always know where the work sits.",
  alternates: { canonical: `${SITE}/process`, languages: { "en-GB": `${SITE}/process` } },
  openGraph: {
    title: "Our 7-Step Process, Audit to Hand-off | Intel Made Simple",
    description: "Seven steps. One engagement. Open by design.",
    url: `${SITE}/process`,
    type: "website",
    images: OG_IMAGES,
  },
};

const STEPS = [
  {
    n: "01",
    name: "Audit",
    phase: 0,
    body:
      "Two weeks of close attention to how the business actually runs. Conversations with the leadership team, observation of the daily work, and a read of the systems already in place. The findings come back as a short, honest document.",
    duration: "Weeks 1 to 2",
    outcome:
      "A short, honest document: where revenue leaks, what each leak costs, and what the business already has in place.",
  },
  {
    n: "02",
    name: "Decide",
    phase: 0,
    body:
      "Name the few moves that compound and the many that look busy. Strategy lives on a single readable page that the leadership team can hold in their head. Every option carries an honest counter-argument so the chosen path is one you can defend.",
    duration: "Week 3",
    outcome:
      "One page naming the few moves worth making, each with its counter-argument.",
  },
  {
    n: "03",
    name: "Blueprint",
    phase: 0,
    body:
      "Architecture for the next twelve months with the tradeoffs visible. The blueprint is built to be challenged. Anything that cannot survive a senior engineer or operator reading it does not stay in the document.",
    duration: "Weeks 4 to 5",
    outcome:
      "A plan you can challenge: the controls, who owns each, and how each gets measured.",
  },
  {
    n: "04",
    name: "Build",
    phase: 1,
    body:
      "Considered code, real tests, observable systems. Shipped in small atomic deliveries you can review, accept, and roll back. The first thing in production is the smallest thing that produces real value.",
    duration: "Weeks 6 onward",
    outcome:
      "The smallest working fix, live, reviewable and reversible.",
  },
  {
    n: "05",
    name: "Automate",
    phase: 1,
    body:
      "Quiet AI workflows that remove the dull edges of the team's week. Small models, well chosen, that earn their keep before they grow. Every workflow has a human in the loop for any decision that touches money, people, or compliance.",
    duration: "In parallel with build",
    outcome:
      "Automations that chase what is owed. A person approves anything that touches money, people or compliance.",
  },
  {
    n: "06",
    name: "Train",
    phase: 2,
    body:
      "Your team learns by doing the work alongside us. They can extend, debug, and own everything by hand-off. We refuse to be a vendor lock-in.",
    duration: "Final third of build",
    outcome:
      "A team that can run, extend and debug it without us.",
  },
  {
    n: "07",
    name: "Hand-off",
    phase: 2,
    body:
      "Documentation, recordings, full source. A 90-day follow-up window for any clarification. We leave the door open without inserting ourselves where we are not needed.",
    duration: "Final two weeks",
    outcome:
      "Full source, documentation, recordings, a 90-day follow-up window and a monthly statement of what was recovered.",
  },
];

const PHASES = [
  { name: "Decide", line: "Find it, rank it, plan it." },
  { name: "Build", line: "Put the fix live." },
  { name: "Compound", line: "Hand it over and keep the gain." },
];

const PRINCIPLES = [
  "Written outputs over verbal handoffs. If it is not on the page, it does not exist.",
  "Small decisions made openly, in order, with the tradeoffs visible.",
  "One atomic delivery at a time. No big-bang releases.",
  "The first step is free. A Leak Scan puts a number on the leak before you spend anything.",
];

export default function ProcessPage() {
  const page = webPageJsonLd({
    path: "/process",
    name: "Process | Intel Made Simple",
    description:
      "The seven steps inside every Intel Made Simple engagement. Audit, decide, blueprint, build, automate, train, hand-off.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Process", path: "/process" },
    ],
  });

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE}/process#howto`,
    name: "How an Intel Made Simple engagement runs",
    description:
      "The seven steps of an Intel Made Simple engagement, from audit to hand-off.",
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

      <main id="main" className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="process-heading"
        >
          <div className="relative mx-auto w-full max-w-6xl">
            <LeakLine />
            <HeroLedger />
            <Reveal className="max-w-4xl">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Process · Seven steps
              </p>
              <CharSplit
                as="h1"
                text={"Open by design.\nQuiet by intent."}
                className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Every Intel Made Simple engagement runs through the same seven steps, grouped
                into three phases: decide, build, compound. You always know
                where the work sits, what decision is next, and what is in
                your hands by the end of each step.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="process-steps-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <h2 id="process-steps-heading" className="sr-only">
            The seven steps
          </h2>
          <MethodSequence steps={STEPS} phases={PHASES} />
        </section>

        <section
          aria-labelledby="process-principles-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Four principles inside every step
              </p>
              <h2
                id="process-principles-heading"
                className="mt-5 font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.012em]"
              >
                The rhythm under the rhythm.
              </h2>
            </Reveal>
            <ul className="mt-10 space-y-5" role="list">
              {PRINCIPLES.map((p, i) => (
                <li key={p}>
                  <Reveal delay={80 + i * 60}>
                    <div className="flex items-start gap-4 text-[1.0625rem] leading-[1.7] text-paper-ink/95">
                      <span
                        aria-hidden
                        className="mt-3 inline-block h-[3px] w-4 shrink-0 bg-mauve-200"
                      />
                      <span>{p}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="process-cta-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="process-cta-heading"
                className="font-display text-[clamp(1.875rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.012em]"
              >
                See where the money leaks, in five documented cases.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton strength={0.4} radius={110}>
                  <Link
                    href="/case-studies"
                    data-cursor="cta"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-accent-500 px-7 text-sm font-medium tracking-[0.02em] text-on-amber transition-all duration-300 hover:bg-accent-600"
                  >
                    See case studies
                  </Link>
                </MagneticButton>
                <a
                  href="/contact?intent=leak-scan&from=process"
                  data-cursor="link"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-cobalt-200 bg-deep/40 px-7 text-sm font-medium tracking-[0.02em] text-cobalt-200 transition-all duration-300 hover:border-cobalt-100 hover:text-cobalt-100 hover:bg-cobalt-200/15"
                >
                  Book a free Leak Scan
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <TrophyFooter />
    </>
  );
}
