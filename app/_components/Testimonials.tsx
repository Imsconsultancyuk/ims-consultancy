import { Reveal } from "./Reveal";
import { PointerTilt } from "./PointerTilt";
import { CharSplit } from "./CharSplit";

type Tier = "quiet" | "revamp" | "partnership";

interface CaseStudy {
  tier: Tier;
  tierLabel: string;
  attribution: string;
  body: string;
  metric: string;
}

const CASES: CaseStudy[] = [
  {
    tier: "quiet",
    tierLabel: "Quiet workflow",
    attribution: "A UK strategy consultancy",
    body:
      "Spent ninety minutes a day triaging client email. We built a quiet auto-sort that learns from the team's behaviour. Now it takes eight minutes.",
    metric: "Eighty-two minutes per person per day, returned.",
  },
  {
    tier: "quiet",
    tierLabel: "Quiet workflow",
    attribution: "A regional property firm",
    body:
      "Bookkeepers were reading two hundred invoices a month line by line. A simple PDF to spreadsheet pipeline does it in four minutes per batch and flags anomalies for human review.",
    metric: "From twenty hours a week to ninety minutes.",
  },
  {
    tier: "revamp",
    tierLabel: "Operations revamp",
    attribution: "A UK freight forwarder",
    body:
      "The operations team carried six spreadsheets and three inboxes through every shipment. We replaced the lot with a single event-driven dashboard. They got their evenings back. The shipments still moved.",
    metric: "Operations time reduced by sixty percent.",
  },
  {
    tier: "revamp",
    tierLabel: "Technical revamp",
    attribution: "A B2B SaaS team",
    body:
      "Shipped twice a week through a brittle deploy chain. We rebuilt continuous integration, observability, and the on-call rota. They now ship to production daily and the on-call phone rarely rings.",
    metric: "From two deploys a week to fourteen.",
  },
  {
    tier: "partnership",
    tierLabel: "Embedded partnership",
    attribution: "A UK property consultancy",
    body:
      "Brought us in for one strategy engagement. Eighteen months later we sit alongside leadership for every major decision, build the systems that run the firm, and advise on AI integration across every department.",
    metric: "Three integrated functions running on one shared rhythm.",
  },
];

function tierAccent(tier: Tier): string {
  switch (tier) {
    case "quiet":
      return "text-mauve-200";
    case "revamp":
      return "text-mauve-100";
    case "partnership":
      return "text-mauve-200";
  }
}

function CaseCard({ c, large = false }: { c: CaseStudy; large?: boolean }) {
  return (
    <PointerTilt className="h-full" tilt={4}>
    <figure
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-mauve-300/12 bg-deep-soft/55 p-7 backdrop-blur transition-all duration-500 hover:border-mauve-300/30 hover:bg-deep-soft/75 sm:p-8 ${
        large ? "lg:p-12" : ""
      }`}
    >
      {/* Glow on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(212,176,212,0.30), transparent 70%)",
        }}
      />

      <div className="relative flex items-center gap-3">
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            c.tier === "partnership" ? "bg-mauve-200" : "bg-mauve-300"
          }`}
          aria-hidden="true"
        />
        <p
          className={`font-sans text-[10px] font-medium uppercase tracking-[0.22em] ${tierAccent(
            c.tier
          )}`}
        >
          {c.tierLabel}
        </p>
      </div>

      <figcaption className="relative mt-5 font-sans text-[11px] uppercase tracking-[0.18em] text-mauve-300">
        {c.attribution}
      </figcaption>

      <blockquote
        className={`relative mt-5 font-serif leading-[1.45] text-paper-ink ${
          large
            ? "text-[clamp(1.5rem,2.4vw,1.9rem)]"
            : "text-[clamp(1.125rem,1.8vw,1.375rem)]"
        }`}
      >
        {c.body}
      </blockquote>

      <div className="relative mt-auto pt-7">
        <div className="h-px w-12 bg-mauve-300/40 transition-all duration-500 group-hover:w-24 group-hover:bg-mauve-200/70" />
        <p
          className={`mt-4 font-sans tracking-[0.02em] text-mauve-200 ${
            large ? "text-[1.0625rem]" : "text-[0.9375rem]"
          }`}
        >
          {c.metric}
        </p>
      </div>
    </figure>
    </PointerTilt>
  );
}

export function Testimonials() {
  const [s1, s2, r1, r2, partnership] = CASES;

  return (
    <section
      id="voices"
      className="relative isolate overflow-hidden bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
    >
      {/* Atmospheric mauve glow centre-top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 -translate-y-1/3 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse, rgba(120,100,120,0.35), rgba(120,100,120,0.10) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Intro */}
        <Reveal>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
            Voices · Five engagements
          </p>
          <h2 id="voices-heading" className="sr-only">
            Five real engagements, no names attached
          </h2>
          <CharSplit
            text={"Five real engagements,\nno names attached."}
            className="mt-5 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.012em]"
            stagger={0.018}
          />
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
            Two quiet workflows that returned a team's afternoon. Two
            professional revamps that changed how a department runs. One
            embedded partnership that quietly rewired a whole business.
          </p>
        </Reveal>

        {/* Tier 1: quiet workflows (2 cards) */}
        <div className="mt-12">
          <Reveal>
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-300">
              01 · Quiet workflows
            </p>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Reveal delay={80}>
              <CaseCard c={s1} />
            </Reveal>
            <Reveal delay={160}>
              <CaseCard c={s2} />
            </Reveal>
          </div>
        </div>

        {/* Tier 2: professional revamps (2 cards) */}
        <div className="mt-12">
          <Reveal>
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-300">
              02 · Professional revamps
            </p>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Reveal delay={80}>
              <CaseCard c={r1} />
            </Reveal>
            <Reveal delay={160}>
              <CaseCard c={r2} />
            </Reveal>
          </div>
        </div>

        {/* Tier 3: embedded partnership (1 large card) */}
        <div className="mt-12">
          <Reveal>
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-200">
              03 · Embedded partnership
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-6">
              <CaseCard c={partnership} large />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
