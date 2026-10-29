import type { Metadata } from "next";
import Link from "next/link";
import { TrophyHeader } from "../_components/TrophyHeader";
import { TrophyFooter } from "../_components/TrophyFooter";
import { Reveal } from "../_components/Reveal";
import { CharSplit } from "../_components/CharSplit";
import { LeakLine } from "../_components/LeakLine";
import { HeroFigures, type HeroFigure } from "../_components/HeroFigures";
import { MagneticButton } from "../_components/MagneticButton";
import { OG_IMAGES } from "@/lib/og";
import { LADDER } from "@/lib/pricing/offers";
import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../_components/JsonLd";

const SITE = "https://intelmadesimple.com";

const DESCRIPTION =
  "Intel Made Simple is a small UK consultancy. We start with the owner, publish every fixed price and say no when a job is not worth doing.";

export const metadata: Metadata = {
  title: "About a UK Revenue Recovery Consultancy",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/about`, languages: { "en-GB": `${SITE}/about` } },
  openGraph: {
    title: "About a UK Revenue Recovery Consultancy | Intel Made Simple",
    description: "A small UK consultancy that sits with the owner first and prices in the open.",
    url: `${SITE}/about`,
    type: "profile",
    images: OG_IMAGES,
  },
};

const KICKER = "font-sans text-[11px] font-medium uppercase tracking-[0.22em]";

const COMMITMENTS = [
  {
    n: "01",
    title: "British-based, answerable to you.",
    body: "We are a UK firm. You deal with the person doing the work, in plain English, in pounds, under UK data law. There is no account manager between you and the adviser.",
  },
  {
    n: "02",
    title: "We sit with the owner first.",
    body: "Before any tool is mentioned we spend time with you and the people who do the work, and watch how the firm runs. Most AI advice skips this. It is why so much of it does not fit.",
  },
  {
    n: "03",
    title: "Prices in the open.",
    body: "Fixed scope, fixed fee, published on the pricing page. A first step costs hundreds or low thousands of pounds, not tens of thousands.",
  },
  {
    n: "04",
    title: "Plain refusals.",
    body: "We tell you when a smaller step is enough, when a tool will not help, and when the right answer is to buy nothing. A refusal costs us a sale and saves you a mistake.",
  },
];

const REFUSALS = [
  "We will not sell you a build when a second opinion from £400 answers your question.",
  "We will not promise a result we have not measured, or quote a figure without showing the working.",
  "We will not put AI into a job where a person does it better, and we will say which jobs those are.",
  "We will not invent client logos, reviews or case studies. The five cases on our site are public, documented incidents, labelled as such, and none is a claim about an Intel Made Simple client.",
];

// Published UK price guides put small-firm AI audits at roughly £1,500 to £6,000
// and large-consultancy audits at £50,000 and above. Vendor and agency blogs, not
// an official survey, so the chart is context rather than a market study.
const SCALE_MAX = 60000;
const PRICE_ROWS = [
  { label: "Intel Made Simple AI Readiness Audit", from: 1500, to: 1500, text: "From £1,500", ours: true },
  { label: "Typical small-firm audit", from: 1500, to: 6000, text: "£1,500 to £6,000", ours: false },
  { label: "Large-consultancy audit", from: 50000, to: 60000, text: "£50,000 and above", ours: false },
];

const HERO_FIGURES: HeroFigure[] = LADDER.slice(0, 3).map((r, i) => ({ label: r.name, value: r.price, marked: i === 0 }));

export default function AboutPage(): React.JSX.Element {
  const aboutPage = webPageJsonLd({
    path: "/about",
    name: "About | Intel Made Simple",
    description: DESCRIPTION,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
  });

  const aboutEntity = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE}/about#aboutpage`,
    mainEntity: { "@id": `${SITE}/#organization` },
    isPartOf: { "@id": `${SITE}/#website` },
    url: `${SITE}/about`,
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, aboutPage, aboutEntity]} />
      <TrophyHeader />

      <main id="main" className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="about-heading"
        >
          <div className="relative mx-auto w-full max-w-5xl">
            <LeakLine />
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:items-end lg:gap-16">
              <Reveal className="max-w-4xl">
                <p className={`${KICKER} text-mauve-200`}>About Intel Made Simple</p>
                <CharSplit
                  as="h1"
                  text={"A small British firm.\nNo big-firm prices."}
                  className="mt-5 font-display text-[clamp(2.5rem,5.4vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.018em]"
                  stagger={0.016}
                />
                <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                  Plenty of small businesses want to use AI and have nobody who
                  will sit down, learn how the business runs and then say what is
                  worth doing. That is the gap we work in.
                </p>
              </Reveal>
              <HeroFigures label="Our first three prices" figures={HERO_FIGURES} note="Published in full on the pricing page." />
            </div>
          </div>
        </header>

        <section
          aria-labelledby="story-heading"
          className="relative ims-band-dark px-6 pb-20 text-paper-ink sm:pb-24 lg:pb-28"
        >
          <div className="mx-auto w-full max-w-5xl *:max-w-3xl">
            <h2 id="story-heading" className="sr-only">
              Who we are
            </h2>
            <div className="space-y-7 text-[clamp(1.0625rem,1.4vw,1.1875rem)] leading-[1.7] text-paper-ink/95">
              <Reveal>
                <p>
                  Intel Made Simple is a small company. We advise small and
                  mid-sized UK firms on AI, and our main job is finding the
                  revenue that leaks out of them: enquiries nobody answered,
                  invoices nobody chased, renewals nobody noticed.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p>
                  We are not a big firm and we do not want to look like one. The
                  large consultancies sell audits at £50,000 and above, built
                  for companies with a department to absorb them. A ten-person
                  practice needs something different: a person who listens to
                  the owner, looks at the actual records, and writes down what
                  is worth fixing in language the owner can use.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p>
                  So that is how we work. We start with the owner, not the
                  software. We price each step in the open. We keep the list of
                  clients short enough that the person you meet is the person
                  doing the work.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="commitments-heading"
          className="relative ims-band-light px-6 py-20 text-ink sm:py-24 lg:py-28"
        >
          <div className="relative mx-auto w-full max-w-5xl">
            <Reveal>
              <h2
                id="commitments-heading"
                className="max-w-3xl font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.012em] text-ink"
              >
                Four commitments, in writing.
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-y-2 lg:grid-cols-[1.15fr_1fr] lg:gap-x-14" role="list">
              {COMMITMENTS.map((c, i) =>
                i === 0 ? (
                  <li key={c.n} className="mb-8 lg:row-span-3 lg:mb-0">
                    <Reveal delay={80} className="h-full">
                    <div className="h-full rounded-[14px] bg-deep p-8 text-paper-ink sm:p-10 lg:flex lg:flex-col lg:justify-between lg:p-12">
                      <p
                        className="font-display text-[clamp(4.5rem,10vw,8rem)] font-bold leading-none tracking-[-0.04em] text-mauve-300/60"
                        aria-hidden
                      >
                        {c.n}
                      </p>
                      <div className="mt-10 lg:mt-24">
                        <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.012em]">
                          {c.title}
                        </h3>
                        <p className="mt-4 text-[1rem] leading-[1.7] text-mauve-200">{c.body}</p>
                      </div>
                    </div>
                    </Reveal>
                  </li>
                ) : (
                  <li key={c.n} className="border-t border-mauve-500/25">
                    <Reveal delay={80 + i * 80}>
                      <div className="py-6 lg:py-7">
                        <p className={`${KICKER} text-mauve-500`}>{c.n}</p>
                        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">{c.title}</h3>
                        <p className="mt-2 text-[0.9375rem] leading-[1.7] text-ink-soft">{c.body}</p>
                      </div>
                    </Reveal>
                  </li>
                ),
              )}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="price-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-5xl *:max-w-4xl">
            <Reveal>
              <p className={`${KICKER} text-mauve-200`}>Price, in context</p>
              <h2
                id="price-heading"
                className="mt-5 font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.012em]"
              >
                An AI audit does not need a five-figure fee.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <figure className="mt-10" aria-labelledby="price-caption">
                <ul className="space-y-5" role="list">
                  {PRICE_ROWS.map((r) => {
                    const left = (r.from / SCALE_MAX) * 100;
                    const width = Math.max(((r.to - r.from) / SCALE_MAX) * 100, 1.2);
                    return (
                      <li key={r.label}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 text-[0.9375rem]">
                          <span className={r.ours ? "font-semibold text-paper-ink" : "text-mauve-300"}>{r.label}</span>
                          <span className="font-display font-semibold text-paper-ink">{r.text}</span>
                        </div>
                        <div className="relative mt-2 h-3 rounded-full bg-mauve-500/25" aria-hidden>
                          <div
                            className={`absolute top-0 h-3 rounded-full ${r.ours ? "bg-accent-500" : "bg-mauve-500/70"}`}
                            style={{ left: `${left}%`, width: `${width}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <figcaption id="price-caption" className="mt-6 text-[0.8125rem] leading-[1.6] text-mauve-300">
                  Ranges come from published UK price guides, mostly agency and vendor blogs, so read them as
                  context and not as a market study. Our price is the &ldquo;from&rdquo; figure on the{" "}
                  <Link href="/pricing" className="ims-link">
                    pricing page
                  </Link>
                  .
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        <section
          aria-labelledby="refusals-heading"
          className="relative ims-band-light px-6 py-20 text-ink sm:py-24"
        >
          <div className="mx-auto w-full max-w-5xl *:max-w-3xl">
            <Reveal>
              <h2
                id="refusals-heading"
                className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.012em]"
              >
                What we will say no to.
              </h2>
            </Reveal>
            <ul className="mt-10 space-y-5" role="list">
              {REFUSALS.map((r, i) => (
                <li key={r}>
                  <Reveal delay={80 + i * 60}>
                    <div className="flex items-start gap-4 text-[1.0625rem] leading-[1.7] text-ink/90">
                      <span aria-hidden className="mt-3 inline-block h-[3px] w-4 shrink-0 bg-mauve-500" />
                      <span>{r}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal delay={200}>
              <p className="mt-10 text-[0.9375rem] leading-[1.7] text-ink-soft">
                How we use AI ourselves is written down on the{" "}
                <Link href="/ai-policy" className="ims-link">
                  AI policy
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </section>

        <section
          aria-labelledby="about-cta-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="about-cta-heading"
                className="font-display text-[clamp(1.875rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.012em]"
              >
                Talk to us before you spend anything.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                The first step is a free Leak Scan. About twenty minutes, a
                written estimate, and a straight answer on whether it is worth
                going further.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 inline-block">
                <MagneticButton strength={0.45} radius={120}>
                  <a
                    href="/contact"
                    data-cursor="cta"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-accent-500 px-8 text-sm font-medium tracking-[0.02em] text-on-amber transition-all duration-300 hover:bg-accent-600"
                  >
                    Book a free Leak Scan
                  </a>
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
