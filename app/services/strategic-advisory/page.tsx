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
  title: "Strategic Advisory",
  description:
    "Independent counsel for founders and senior operators. The right call, said plainly. Strategy, positioning, technology and AI direction, on a retainer that gives you a senior thinking partner.",
  alternates: { canonical: `${SITE}/services/strategic-advisory` },
  openGraph: {
    title: "Strategic Advisory · IMS Consultancy",
    description:
      "Independent counsel for founders. Strategy, positioning, tech and AI direction.",
    url: `${SITE}/services/strategic-advisory`,
    type: "website",
  },
};

const SCOPES = [
  {
    n: "01",
    title: "Strategy on a single page",
    body: "Where the business is, where it is going, which moves compound, and which ones merely look busy. Written on a single readable page that survives the quarter.",
  },
  {
    n: "02",
    title: "Positioning and messaging",
    body: "Who you are for, who you are not for, and the language that makes that obvious. Tested against three real customer conversations before it goes anywhere near the site.",
  },
  {
    n: "03",
    title: "AI and technology direction",
    body: "Which AI investments compound, which are theatre, and the order to make them in. The same advice given to a startup or a hundred-person ops team.",
  },
  {
    n: "04",
    title: "Senior thinking partner on retainer",
    body: "A monthly cadence where you bring the hardest current decisions and we work them through. No deck. No timesheet. Honest counsel.",
  },
  {
    n: "05",
    title: "Board and investor support",
    body: "Help preparing the narrative, the deck, and the data room. Most useful for founders raising for the first time or moving into a new investor class.",
  },
  {
    n: "06",
    title: "Fractional CTO and AI lead",
    body: "Long-running involvement where the business needs the seat filled without yet justifying the salary. We hold the seat until you can hire it permanently.",
  },
];

const SUITED = [
  "Founders who have outgrown peer advice and want a steady, independent voice in the room.",
  "Operators inheriting a function and needing a calibrated outside read before deciding how to change it.",
  "Boards looking for technology and AI input that is not from a vendor.",
  "Teams that have already tried the agency model and want something quieter.",
];

export default function StrategicAdvisoryPage() {
  const page = webPageJsonLd({
    path: "/services/strategic-advisory",
    name: "Strategic Advisory · IMS Consultancy",
    description:
      "Independent counsel for founders and senior operators on strategy, positioning, technology, and AI direction.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Strategic Advisory", path: "/services/strategic-advisory" },
    ],
  });

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}/services/strategic-advisory#service`,
    name: "Strategic Advisory",
    description:
      "Strategy, positioning, technology and AI direction for founders and senior operators.",
    serviceType: "Business strategy consulting",
    provider: { "@id": `${SITE}#organization` },
    areaServed: "Worldwide",
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, service]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden bg-deep px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="sa-heading"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(120,100,120,0.28), rgba(120,100,120,0.08) 40%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <div className="relative mx-auto w-full max-w-4xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Service · Strategic Advisory
              </p>
              <CharSplit
                text={"Independent counsel,\nplainly said."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                A small, considered retainer for founders and senior
                operators who need a steady outside voice in the room. We
                listen, push, and help you make the call you can defend at
                eleven at night.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="sa-scopes-heading"
          className="relative bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-5xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Six scopes
              </p>
              <h2
                id="sa-scopes-heading"
                className="mt-5 max-w-3xl font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em]"
              >
                Where advisory does its quietest work.
              </h2>
            </Reveal>

            <ol className="mt-12 grid gap-6 sm:grid-cols-2" role="list">
              {SCOPES.map((s, i) => (
                <Reveal key={s.n} delay={80 + i * 70}>
                  <article className="relative h-full rounded-2xl border border-mauve-300/12 bg-deep-soft/60 p-7 backdrop-blur sm:p-8">
                    <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                      {s.n}
                    </p>
                    <h3 className="mt-4 font-serif text-xl font-medium leading-snug text-paper-ink">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-[1.7] text-mauve-300">
                      {s.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="sa-suited-heading"
          className="relative bg-deep-soft px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Who this is for
              </p>
              <h2
                id="sa-suited-heading"
                className="mt-5 font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em]"
              >
                Best-fit clients.
              </h2>
            </Reveal>
            <ul className="mt-10 space-y-5" role="list">
              {SUITED.map((s, i) => (
                <Reveal key={s} delay={80 + i * 60}>
                  <li className="flex items-start gap-4 text-[1.0625rem] leading-[1.7] text-paper-ink/95">
                    <span
                      aria-hidden
                      className="mt-3 inline-block h-[3px] w-4 shrink-0 bg-mauve-200"
                    />
                    <span>{s}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="sa-cta-heading"
          className="relative bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="sa-cta-heading"
                className="font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.012em]"
              >
                A twenty-minute call costs you nothing.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                If we can help, we will tell you exactly how. If we cannot,
                we will name someone who can. Either way, you leave with one
                clearer thought.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton strength={0.4} radius={110}>
                  <a
                    href="/contact"
                    data-cursor="cta"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-7 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.55)]"
                  >
                    Book the call
                  </a>
                </MagneticButton>
                <Link
                  href="/pricing"
                  data-cursor="link"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-mauve-300/40 bg-deep/40 px-7 text-sm font-medium tracking-[0.02em] text-paper-ink backdrop-blur transition-all duration-300 hover:border-mauve-200 hover:bg-deep/70"
                >
                  See pricing
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
