import type { Metadata } from "next";
import { TrophyHeader } from "../_components/TrophyHeader";
import { TrophyFooter } from "../_components/TrophyFooter";
import { Reveal } from "../_components/Reveal";
import { CharSplit } from "../_components/CharSplit";
import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../_components/JsonLd";

const SITE = "https://intelmadesimple.com";

export const metadata: Metadata = {
  title: "About",
  description:
    "IMS Consultancy is a small strategic consultancy for business decisions, development, and AI workflows. UK-based, working with a handful of operators at a time.",
  alternates: { canonical: `${SITE}/about` },
  openGraph: {
    title: "About · IMS Consultancy",
    description:
      "Who IMS is, how we work, and why we keep the engagement list small.",
    url: `${SITE}/about`,
    type: "profile",
  },
};

export default function AboutPage() {
  const aboutPage = webPageJsonLd({
    path: "/about",
    name: "About · IMS Consultancy",
    description:
      "IMS Consultancy is a small strategic consultancy for business decisions, development, and AI workflows. UK-based, working with a handful of operators at a time.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
  });

  const aboutEntity = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE}/about#aboutpage`,
    mainEntity: { "@id": `${SITE}#organization` },
    isPartOf: { "@id": `${SITE}#website` },
    url: `${SITE}/about`,
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, aboutPage, aboutEntity]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <article
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-20 text-paper-ink sm:pt-44 sm:pb-24 lg:pt-48 lg:pb-28"
          aria-labelledby="about-heading"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(58, 109, 240,0.28), rgba(58, 109, 240,0.08) 40%, transparent 70%)",
              filter: "blur(28px)",
            }}
          />
          <div className="relative mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                About IMS
              </p>
              <CharSplit
                text={"Small firm,\nhigh judgement,\nquiet wins."}
                className="mt-5 font-serif text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
            </Reveal>
          </div>
        </article>

        <section
          aria-labelledby="philosophy-heading"
          className="relative ims-band-dark px-6 pb-20 text-paper-ink sm:pb-24 lg:pb-28"
        >
          <div className="mx-auto w-full max-w-3xl">
            <h2 id="philosophy-heading" className="sr-only">
              Philosophy
            </h2>
            <div className="space-y-7 font-serif text-[clamp(1.125rem,1.5vw,1.25rem)] leading-[1.6] text-paper-ink/95">
              <Reveal>
                <p>
                  IMS Consultancy is a small UK-based strategic consultancy. We
                  work with a handful of operators at a time so that every
                  engagement gets the same attention as the first.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p>
                  We were started because most consulting we had seen optimised
                  for the wrong thing. Deliverables that look impressive in a
                  slide deck and quietly fall apart in week three. We wanted to
                  do the opposite: short, honest documents the founder can hold
                  in their head; systems that survive the first incident; code
                  the in-house team can extend without us in the room.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p>
                  The work moves in three layers. Decide, build, compound. Most
                  clients arrive at one and stay for all three. The first two
                  weeks of every engagement are funded by us, before any
                  decision to continue.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p>
                  We are based in the UK and work with founders and senior
                  operators around the world. We are deliberately small and
                  plan to stay that way.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="principles-heading"
          className="relative ims-band-light px-6 py-20 text-ink sm:py-24 lg:py-28"
        >
          <div
            aria-hidden
            className="ims-paper-aura pointer-events-none absolute inset-0 -z-10"
          />
          <div className="relative mx-auto w-full max-w-5xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-500">
                Operating principles
              </p>
              <h2
                id="principles-heading"
                className="mt-5 max-w-3xl font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em] text-ink"
              >
                The rules we hold ourselves to.
              </h2>
            </Reveal>

            <ol className="mt-12 grid gap-6 sm:grid-cols-2" role="list">
              {[
                {
                  n: "01",
                  title: "Small list, deep attention.",
                  body: "We work with a few clients at a time so every engagement gets the same care as the first.",
                },
                {
                  n: "02",
                  title: "Honest in writing.",
                  body: "Findings live on a single readable page, not buried in a 60-slide deck. We say what we think.",
                },
                {
                  n: "03",
                  title: "Built to hand over.",
                  body: "Every system we ship can be extended, debugged, and owned by your team within ninety days.",
                },
                {
                  n: "04",
                  title: "Quiet AI.",
                  body: "AI is a tool, not a slogan. We use it where it earns its place and remove it where it does not.",
                },
              ].map((p, i) => (
                <Reveal key={p.n} delay={80 + i * 80}>
                  <article className="ims-flip-card group relative h-full overflow-hidden rounded-2xl border border-mauve-500/15 bg-paper-soft/80 p-7 backdrop-blur transition-all duration-500 hover:border-accent-500/0 hover:bg-accent-500 hover:shadow-[0_24px_60px_-22px_rgba(58, 109, 240,0.65)] sm:p-8">
                    <span
                      aria-hidden="true"
                      className="ims-flip-sweep pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <p className="relative font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-500 transition-colors duration-500 group-hover:text-paper">
                      {p.n}
                    </p>
                    <h3 className="relative mt-4 font-serif text-xl font-medium leading-snug text-ink transition-colors duration-500 group-hover:text-paper">
                      {p.title}
                    </h3>
                    <p className="relative mt-3 text-[0.9375rem] leading-[1.7] text-ink-soft transition-colors duration-500 group-hover:text-paper/95">
                      {p.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <TrophyFooter />
    </>
  );
}
