import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";
import { TrophyHeader } from "../_components/TrophyHeader";
import { TrophyFooter } from "../_components/TrophyFooter";
import { Reveal } from "../_components/Reveal";
import { CharSplit } from "../_components/CharSplit";
import { HeroLedger, LeakLine } from "../_components/LeakLine";
import { MagneticButton } from "../_components/MagneticButton";
import { OG_IMAGES } from "@/lib/og";
import { ADDONS, LADDER, PRICING_PRINCIPLES, TIERS } from "@/lib/pricing/offers";
import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../_components/JsonLd";

const SITE = "https://intelmadesimple.com";

export const metadata: Metadata = {
  title: "Fixed Prices from £400, Free Leak Scan",
  description:
    "Start free with a Leak Scan, then small fixed-fee steps from £400. Larger projects from £6,000. Fixed scope, fixed price, no surprise hours.",
  alternates: { canonical: `${SITE}/pricing`, languages: { "en-GB": `${SITE}/pricing` } },
  openGraph: {
    title: "Fixed Prices from £400, Free Leak Scan | Intel Made Simple",
    description: "A free Leak Scan, fixed-fee first steps from £400, and larger projects from £6,000.",
    url: `${SITE}/pricing`,
    type: "website",
    images: OG_IMAGES,
  },
};

const [FIRST_RUNG, ...PAID_RUNGS] = LADDER;

const SCALE_MAX = Math.max(...TIERS.map((t) => t.firstPayment));
const SCALE_ROWS = [
  ...LADDER.map((r) => ({ slug: r.slug, name: r.name, label: r.price, value: r.firstPayment, ladder: true })),
  ...TIERS.map((t) => ({ slug: t.slug, name: t.name, label: t.price, value: t.firstPayment, ladder: false })),
];

// /contact is a static flagship page, not a Next route: a plain anchor avoids a failing RSC prefetch.
function RungLink({ href, ...rest }: ComponentProps<"a"> & { href: string }) {
  return href === "/contact" ? <a href={href} {...rest} /> : <Link href={href} {...rest} />;
}

export default function PricingPage() {
  const page = webPageJsonLd({
    path: "/pricing",
    name: "Pricing | Intel Made Simple",
    description:
      "A free Leak Scan, fixed-fee first steps and larger project tiers, with the pricing principles Intel Made Simple holds to.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Pricing", path: "/pricing" },
    ],
  });

  const offerCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${SITE}/pricing#catalog`,
    name: "Intel Made Simple pricing",
    provider: { "@id": `${SITE}/#organization` },
    itemListElement: [
      ...LADDER.map((r) => ({
        "@type": "Offer",
        url: `${SITE}${r.href.split("#")[0]}`,
        itemOffered: {
          "@type": "Service",
          name: r.name,
          description: r.oneLine,
          provider: { "@id": `${SITE}/#organization` },
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "GBP",
          description: r.recurring ? `${r.price}, ${r.recurring}` : r.price,
        },
      })),
      ...TIERS.map((t) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: t.name,
          description: t.positioning,
          provider: { "@id": `${SITE}/#organization` },
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "GBP",
          description: t.price,
        },
      })),
    ],
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, offerCatalog]} />
      <TrophyHeader />

      <main id="main" className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="pricing-heading"
        >
          <div className="relative mx-auto w-full max-w-6xl">
            <LeakLine />
            <HeroLedger />
            <Reveal className="max-w-4xl">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Pricing · Start small
              </p>
              <CharSplit
                as="h1"
                text={"Start free.\nStep up only when it pays."}
                className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                We are a small British consultancy, not a big firm with a big
                firm&rsquo;s invoice. Every route in begins with a free Leak
                Scan, then fixed-fee first steps from £400. Larger projects
                come later, and only if the first steps show they are worth it.
                Fixed scope, fixed price, no surprise hours.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="scale-heading"
          className="relative ims-band-dark px-6 pb-20 text-paper-ink sm:pb-24"
        >
          <div className="mx-auto w-full max-w-4xl">
            <Reveal>
              <h2
                id="scale-heading"
                className="font-display text-[clamp(1.5rem,2.8vw,2rem)] font-semibold leading-[1.15] tracking-[-0.012em]"
              >
                The first payment on every route, to scale.
              </h2>
            </Reveal>
            <ul className="mt-8 space-y-3" role="list">
              {SCALE_ROWS.map((r) => {
                const pct = r.value === 0 ? 0 : Math.max(2, (r.value / SCALE_MAX) * 100);
                return (
                  <li
                    key={r.slug}
                    className="grid grid-cols-[8.5rem_1fr] items-center gap-x-4 gap-y-1 sm:grid-cols-[12rem_1fr_9rem]"
                  >
                    <a
                      href={`#${r.slug}`}
                      className="inline-flex min-h-[44px] items-center text-[0.875rem] font-medium text-paper-ink underline-offset-4 hover:underline"
                    >
                      {r.name}
                    </a>
                    <span aria-hidden className="relative block h-2.5 rounded-full bg-mauve-300/15">
                      <span
                        className={`absolute inset-y-0 left-0 rounded-full ${r.ladder ? "bg-accent-400" : "bg-mauve-200"}`}
                        style={{ width: `${pct}%`, minWidth: r.value === 0 ? 6 : undefined }}
                      />
                    </span>
                    <span className="col-start-2 whitespace-nowrap text-[0.8125rem] text-mauve-300 [font-variant-numeric:proportional-nums] sm:col-start-3 sm:text-right">
                      {r.label}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 max-w-2xl text-[0.8125rem] leading-[1.6] text-mauve-300">
              Bars show the first payment due, not the lifetime cost. Amber is a first step, mauve is a project.
              Recurring charges are listed under each offer.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="ladder-heading"
          className="relative ims-band-light px-6 py-20 text-ink sm:py-24 lg:py-28"
        >
          <div
            aria-hidden
            className="ims-paper-aura pointer-events-none absolute inset-0 -z-10"
          />
          <div className="relative mx-auto w-full max-w-6xl">
            <Reveal>
              <h2
                id="ladder-heading"
                className="max-w-2xl font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.012em] text-ink"
              >
                Five ways in, from free to a half-day with your team.
              </h2>
            </Reveal>

            <ol className="mt-12 grid gap-5 md:grid-cols-2" role="list">
              <li className="md:col-span-2">
                <Reveal>
                  <article
                    id={FIRST_RUNG.slug}
                    className="relative grid gap-8 overflow-hidden rounded-[14px] border border-accent-500/35 bg-paper p-7 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14"
                  >
                    <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-accent-500" />
                    <header>
                      <p className="text-[0.8125rem] font-semibold text-ink-soft">Start here. {FIRST_RUNG.timing}</p>
                      <h3 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight text-ink">
                        {FIRST_RUNG.name}
                      </h3>
                      <p className="mt-4 font-display text-[3.5rem] font-bold leading-none tracking-[-0.03em] text-ink">
                        {FIRST_RUNG.price}
                      </p>
                      <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-[1.7] text-ink-soft">{FIRST_RUNG.oneLine}</p>
                      <RungLink
                        href={FIRST_RUNG.href}
                        data-cursor="cta"
                        className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-accent-500 px-7 text-[15px] font-semibold text-on-amber transition-colors duration-300 hover:bg-accent-600"
                      >
                        {FIRST_RUNG.cta}
                      </RungLink>
                    </header>

                    <div className="lg:border-l lg:border-mauve-500/15 lg:pl-14">
                      <p className="text-[0.8125rem] font-semibold text-ink-soft">What you get</p>
                      <ul className="mt-4 space-y-3 text-[0.9375rem] leading-[1.65] text-ink/90" role="list">
                        {FIRST_RUNG.includes.map((w) => (
                          <li key={w} className="flex items-start gap-3">
                            <span aria-hidden className="mt-2.5 inline-block h-[3px] w-3 shrink-0 bg-accent-500" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 border-t border-mauve-500/15 pt-5 text-[0.9375rem] leading-[1.65] text-ink-soft">
                        <span className="font-semibold text-ink">Not included: </span>
                        {FIRST_RUNG.notIncluded}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>

              {PAID_RUNGS.map((r, i) => (
                <li key={r.slug}>
                  <Reveal delay={60 + (i % 2) * 70} className="h-full">
                    <article
                      id={r.slug}
                      className="flex h-full flex-col rounded-[14px] border border-mauve-500/15 bg-paper-soft/80 p-7 sm:p-8"
                    >
                      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-mauve-500/15 pb-5">
                        <h3 className="font-display text-[1.25rem] font-semibold leading-tight text-ink">{r.name}</h3>
                        <p className="font-display text-[1.375rem] font-bold leading-none tracking-[-0.015em] text-ink">
                          {r.price}
                        </p>
                      </header>
                      <p className="mt-4 text-[0.8125rem] text-ink-soft">
                        {r.recurring ? `${r.recurring}. ` : ""}
                        {r.timing}
                      </p>
                      <p className="mt-3 text-[0.9375rem] leading-[1.65] text-ink-soft">{r.oneLine}</p>
                      <ul className="mt-5 space-y-2 text-[0.875rem] leading-[1.6] text-ink/90" role="list">
                        {r.includes.map((w) => (
                          <li key={w} className="flex items-start gap-3">
                            <span aria-hidden className="mt-2 inline-block h-[3px] w-2.5 shrink-0 bg-mauve-500" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 text-[0.8125rem] leading-[1.6] text-ink-soft">
                        <span className="font-semibold text-ink">Not included: </span>
                        {r.notIncluded}
                      </p>
                      <div className="mt-auto pt-7">
                        <RungLink
                          href={r.href}
                          className="inline-flex h-11 items-center justify-center rounded-full border border-info px-5 text-[14px] font-medium text-info transition-colors duration-300 hover:bg-info-wash"
                        >
                          {r.cta}
                        </RungLink>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="tiers-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="relative mx-auto w-full max-w-6xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Projects · When the first steps say yes
              </p>
              <h2
                id="tiers-heading"
                className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.012em]"
              >
                Three project shapes for the fixes worth building.
              </h2>
              <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                These start where the Leak Scan and audit end. Its ranked list of fixes is the brief. Each is a fixed price, confirmed in writing after the free Leak Scan.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.3fr_1fr] lg:items-stretch lg:gap-8">
              {TIERS.map((t, i) => (
                <Reveal key={t.slug} delay={i * 100}>
                  <article
                    id={t.slug}
                    className={`flex h-full flex-col rounded-[14px] border p-8 sm:p-9 ${
                      i === 1
                        ? "border-accent-400/70 bg-mauve-300/10 lg:py-14"
                        : "border-mauve-300/20 bg-deep/60"
                    }`}
                  >
                    <header>
                      <p className="text-[0.8125rem] font-semibold text-mauve-200">
                        {t.name}
                      </p>
                      <h3
                        className={`mt-3 font-display font-semibold leading-tight text-paper-ink ${
                          i === 1 ? "text-[1.5rem] lg:text-[1.875rem]" : "text-[1.5rem]"
                        }`}
                      >
                        {t.positioning}
                      </h3>
                      <p
                        className={`mt-5 font-display font-bold leading-none tracking-[-0.02em] text-paper-ink ${
                          i === 1 ? "text-[2.25rem] lg:text-[3rem]" : "text-[2.25rem]"
                        }`}
                      >
                        <span className="whitespace-nowrap">{t.price.replace(" per month", "")}</span>
                        {t.price.endsWith(" per month") && (
                          <span className="ml-1.5 whitespace-nowrap text-base font-medium tracking-normal">per month</span>
                        )}
                      </p>
                      <p className="mt-2 text-[0.8125rem] text-mauve-300">
                        {t.cadence}
                      </p>
                    </header>

                    <div className="mt-7 border-t border-mauve-300/20 pt-6">
                      <p className="text-[0.8125rem] font-semibold text-mauve-200">
                        Best for
                      </p>
                      <p className="mt-2 text-[0.9375rem] leading-[1.7] text-mauve-300">{t.bestFor}</p>
                    </div>

                    <div className="mt-6 border-t border-mauve-300/20 pt-6">
                      <p className="text-[0.8125rem] font-semibold text-mauve-200">
                        What you get
                      </p>
                      <ul className="mt-4 space-y-3 text-[0.9375rem] leading-[1.65] text-paper-ink/95" role="list">
                        {t.whatYouGet.map((w) => (
                          <li key={w} className="flex items-start gap-3">
                            <span aria-hidden className="mt-2.5 inline-block h-[3px] w-3 shrink-0 bg-accent-400" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <footer className="mt-auto pt-8">
                      <a
                        href="/contact"
                        data-cursor="cta"
                        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-accent-500 px-6 text-[14px] font-semibold text-on-amber transition-colors duration-300 hover:bg-accent-600"
                      >
                        {t.cta}
                      </a>
                    </footer>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="addons-heading"
          className="relative ims-band-light px-6 py-20 text-ink sm:py-24"
        >
          <div className="mx-auto w-full max-w-6xl">
            <Reveal>
              <h2
                id="addons-heading"
                className="max-w-2xl font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.012em] text-ink"
              >
                For agencies and advisers who resell under their own name.
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-6 md:grid-cols-2" role="list">
              {ADDONS.map((a) => (
                <li
                  key={a.slug}
                  className="rounded-[14px] border border-mauve-500/15 bg-paper-soft/80 p-7"
                >
                  <h3 className="font-display text-[1.25rem] font-semibold text-ink">{a.name}</h3>
                  <p className="mt-2 text-[1rem] font-medium text-ink-soft">{a.line}</p>
                  <p className="mt-3 text-[0.9375rem] leading-[1.65] text-ink-soft">{a.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.875rem] text-ink-soft">
              Quoted per build, so there is no list price.{" "}
              <a href="/contact" className="ims-link">
                Ask about white-label
              </a>
              .
            </p>
          </div>
        </section>

        <section
          aria-labelledby="pricing-principles-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <h2
                id="pricing-principles-heading"
                className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.012em]"
              >
                The rules we hold to.
              </h2>
            </Reveal>
            <ul className="mt-10 space-y-5" role="list">
              {PRICING_PRINCIPLES.map((p, i) => (
                <li key={p}>
                  <Reveal delay={80 + i * 60}>
                    <div className="flex items-start gap-4 text-[1.0625rem] leading-[1.7] text-paper-ink/95">
                      <span aria-hidden className="mt-3 inline-block h-[3px] w-4 shrink-0 bg-mauve-200" />
                      <span>{p}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="pricing-cta-heading"
          className="relative ims-band-dark px-6 pb-20 text-paper-ink sm:pb-24 lg:pb-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="pricing-cta-heading"
                className="font-display text-[clamp(1.875rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.012em]"
              >
                See your number first.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                A twenty-minute call, then a written estimate of what is
                leaking from your firm. No charge, no obligation.
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
