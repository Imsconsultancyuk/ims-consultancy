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
  title: "Pricing",
  description:
    "Honest pricing for IMS engagements. Quiet workflows, professional revamps, and embedded partnerships. Fixed scope, fixed price, no surprise hours.",
  alternates: { canonical: `${SITE}/pricing` },
  openGraph: {
    title: "Pricing · IMS Consultancy",
    description: "Fixed scope, fixed price, no surprise hours.",
    url: `${SITE}/pricing`,
    type: "website",
  },
};

interface Tier {
  slug: string;
  name: string;
  positioning: string;
  price: string;
  cadence: string;
  bestFor: string;
  whatYouGet: string[];
  cta: string;
}

const TIERS: Tier[] = [
  {
    slug: "quiet-workflow",
    name: "Quiet workflow",
    positioning: "One automation, fully owned.",
    price: "From £6,000",
    cadence: "Two to four weeks",
    bestFor:
      "A team weighed down by one specific repetitive job. Triage, extraction, reporting, drafting.",
    whatYouGet: [
      "Two-week diagnostic of the workflow as it runs today",
      "Build of the automation with human review in the loop",
      "Observability, cost tracking, and rollback documented",
      "Recorded hand-over and ninety-day follow-up window",
    ],
    cta: "Scope a workflow",
  },
  {
    slug: "professional-revamp",
    name: "Professional revamp",
    positioning: "A whole function, rebuilt deliberately.",
    price: "From £24,000",
    cadence: "Six to twelve weeks",
    bestFor:
      "A department running on duct tape that needs the rebuild without a six-month rewrite.",
    whatYouGet: [
      "Audit, decision memo, blueprint, and atomic delivery plan",
      "Build of the new system in small reversible releases",
      "Integration with the tools your team already lives in",
      "Training so the in-house team can extend and debug from day one",
    ],
    cta: "Discuss a revamp",
  },
  {
    slug: "embedded-partnership",
    name: "Embedded partnership",
    positioning: "Senior thinking partner on a monthly cadence.",
    price: "From £6,000 per month",
    cadence: "Twelve month minimum",
    bestFor:
      "Founders and senior operators who want a steady outside voice and a small ongoing build capacity.",
    whatYouGet: [
      "Monthly leadership session and ad-hoc availability between",
      "Strategy, technology, and AI direction in one engagement",
      "Limited engineering capacity for the smaller things between projects",
      "Quarterly written review of what we agreed and what we shipped",
    ],
    cta: "Talk about a partnership",
  },
];

const PRINCIPLES = [
  "Fixed scope, fixed price. No surprise hours.",
  "First two weeks of any engagement funded by IMS. You decide whether to continue with everything you need to decide cleanly.",
  "Payment in two halves. Half on start, half on hand-over.",
  "If we miss a milestone, we discount the next month. We have not had to apply this in two years.",
  "Quoted in GBP. Invoiced from a UK limited company. VAT where applicable.",
];

export default function PricingPage() {
  const page = webPageJsonLd({
    path: "/pricing",
    name: "Pricing · IMS Consultancy",
    description:
      "Engagement tiers and honest pricing principles for IMS Consultancy.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Pricing", path: "/pricing" },
    ],
  });

  const offerCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${SITE}/pricing#catalog`,
    name: "IMS Consultancy pricing tiers",
    provider: { "@id": `${SITE}#organization` },
    itemListElement: TIERS.map((t) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: t.name,
        description: t.positioning,
        provider: { "@id": `${SITE}#organization` },
      },
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "GBP",
        description: t.price,
      },
      availability: "https://schema.org/InStock",
    })),
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, offerCatalog]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden bg-deep px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="pricing-heading"
        >
          <div className="relative mx-auto w-full max-w-4xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Pricing · Three tiers
              </p>
              <CharSplit
                text={"Honest pricing,\nwritten down."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Three engagement shapes, three honest starting prices. Fixed
                scope, fixed price, no surprise hours. We will quote against
                your specific work after a twenty-minute call.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="tiers-heading"
          className="relative bg-paper px-6 py-20 text-ink sm:py-24 lg:py-28"
        >
          <div
            aria-hidden
            className="ims-paper-aura pointer-events-none absolute inset-0 -z-10"
          />
          <h2 id="tiers-heading" className="sr-only">
            Engagement tiers
          </h2>
          <div className="relative mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-3 lg:gap-8">
            {TIERS.map((t, i) => (
              <Reveal key={t.slug} delay={i * 100}>
                <article
                  id={t.slug}
                  className={`ims-flip-card group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-paper-soft/80 p-8 backdrop-blur transition-all duration-500 hover:border-mauve-500/0 hover:bg-mauve-500 hover:shadow-[0_24px_60px_-22px_rgba(120,100,120,0.65)] sm:p-9 ${
                    i === 1
                      ? "border-mauve-500/35 shadow-[0_18px_48px_-22px_rgba(120,100,120,0.32)]"
                      : "border-mauve-500/15"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="ims-flip-sweep pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <header className="relative">
                    <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-500 transition-colors duration-500 group-hover:text-paper">
                      {t.name}
                    </p>
                    <h3 className="mt-3 font-serif text-[1.5rem] font-medium leading-tight text-ink transition-colors duration-500 group-hover:text-paper">
                      {t.positioning}
                    </h3>
                    <p className="mt-5 font-serif text-[2rem] leading-none text-mauve-500 transition-colors duration-500 group-hover:text-paper">
                      {t.price}
                    </p>
                    <p className="mt-2 font-sans text-[12px] uppercase tracking-[0.18em] text-ink-soft transition-colors duration-500 group-hover:text-paper/85">
                      {t.cadence}
                    </p>
                  </header>

                  <div className="relative mt-7 border-t border-mauve-500/15 pt-6 transition-colors duration-500 group-hover:border-paper/30">
                    <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-500 transition-colors duration-500 group-hover:text-paper">
                      Best for
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-[1.7] text-ink-soft transition-colors duration-500 group-hover:text-paper/90">
                      {t.bestFor}
                    </p>
                  </div>

                  <div className="relative mt-6 border-t border-mauve-500/15 pt-6 transition-colors duration-500 group-hover:border-paper/30">
                    <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-500 transition-colors duration-500 group-hover:text-paper">
                      What you get
                    </p>
                    <ul className="mt-4 space-y-3 text-[0.9375rem] leading-[1.65] text-ink/90 transition-colors duration-500 group-hover:text-paper/95" role="list">
                      {t.whatYouGet.map((w) => (
                        <li key={w} className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className="mt-2.5 inline-block h-[3px] w-3 shrink-0 bg-mauve-500 transition-colors duration-500 group-hover:bg-paper"
                          />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <footer className="relative mt-auto pt-8">
                    <Link
                      href="/contact"
                      data-cursor="cta"
                      className="inline-flex h-11 w-full items-center justify-center rounded-md bg-mauve-500 px-6 text-[12px] font-medium uppercase tracking-[0.18em] text-paper transition-all duration-300 hover:bg-mauve-700 group-hover:bg-paper group-hover:text-mauve-500"
                    >
                      {t.cta}
                    </Link>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="pricing-principles-heading"
          className="relative bg-deep-soft px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Pricing principles
              </p>
              <h2
                id="pricing-principles-heading"
                className="mt-5 font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em]"
              >
                The rules we hold to.
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
          aria-labelledby="pricing-cta-heading"
          className="relative bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="pricing-cta-heading"
                className="font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.012em]"
              >
                Get a real quote.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                A short conversation about scope, then a fixed-price
                proposal in writing inside two working days.
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
                    Request a proposal
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
