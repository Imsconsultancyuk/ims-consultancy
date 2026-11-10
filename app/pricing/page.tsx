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
import { ADDONS, LADDER, PRICING_PRINCIPLES, PRICING_TERMS, TIERS } from "@/lib/pricing/offers";
import { PARTNER_CODE, PARTNER_PRICE, gbp } from "@/lib/pricing/recovery";
import { RecoveryCalculator } from "../_components/recovery/RecoveryCalculator";
import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../_components/JsonLd";

const SITE = "https://intelmadesimple.com";

export const metadata: Metadata = {
  title: "No Recovery, No Fee. Builds from £699",
  description:
    "A free Leak Scan, then £1,500 a stage or £6,000 for all five, and a 15 to 25% share of money recovered for 12 months. Nothing recovered, no fee.",
  alternates: { canonical: `${SITE}/pricing`, languages: { "en-GB": `${SITE}/pricing` } },
  openGraph: {
    title: "No Recovery, No Fee | Intel Made Simple",
    description: "Work out what you keep and what we earn on your own numbers. Builds from £699 with NEWPARTNER26.",
    url: `${SITE}/pricing`,
    type: "website",
    images: OG_IMAGES,
  },
};

const [FIRST_RUNG, ...PAID_RUNGS] = LADDER;

// /contact is a static flagship page, not a Next route: a plain anchor avoids a failing RSC prefetch.
function RungLink({ href, ...rest }: ComponentProps<"a"> & { href: string }) {
  return href.startsWith("/contact") ? <a href={href} {...rest} /> : <Link href={href} {...rest} />;
}

export default function PricingPage() {
  const page = webPageJsonLd({
    path: "/pricing",
    name: "Pricing | Intel Made Simple",
    description:
      "No recovery, no fee: a free Leak Scan, one build price per stage and a success fee on money recovered, with a calculator for your own numbers.",
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
                Pricing · How we get paid
              </p>
              <CharSplit
                as="h1"
                text="No recovery, no fee."
                className="mt-5 font-display text-[clamp(2.75rem,7vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.022em]"
                stagger={0.022}
              />
              <p className="mt-6 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 border-l-[3px] border-accent-400 pl-4 font-sans text-[1rem] text-mauve-200 sm:text-[1.125rem]">
                <span>
                  System build from <strong className="font-semibold text-accent-300">{gbp(PARTNER_PRICE)}*</strong>
                </span>
                <span>
                  with code{" "}
                  <span className="rounded-[6px] border border-dashed border-accent-400/70 px-2 py-0.5 font-mono text-[0.875em] tracking-[0.06em] text-paper-ink">
                    {PARTNER_CODE}
                  </span>
                </span>
              </p>
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                We charge one build price, then take a share of the money we
                recover for you, for twelve months. If nothing comes back, the
                share is nothing. Move the sliders below and see what you keep
                and what we earn, on your own numbers.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          id="recovery"
          aria-labelledby="recovery-heading"
          className="relative ims-band-dark px-6 pb-20 text-paper-ink sm:pb-24 lg:pb-28"
        >
          <div className="mx-auto w-full max-w-6xl border-t border-mauve-300/15 pt-14 sm:pt-16">
            <Reveal>
              <h2
                id="recovery-heading"
                className="max-w-3xl font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.012em]"
              >
                We don&rsquo;t get paid until we recover money for you.
              </h2>
              <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Money leaks at five stages: the enquiry nobody answers, the
                quote nobody chases, work that never reaches an invoice, the
                invoice nobody collects and the client who quietly does not
                come back. Pick yours.
              </p>
            </Reveal>
            <div className="mt-12">
              <RecoveryCalculator />
            </div>
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
                Four ways in. Free, then one price.
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
                Builds · When the Leak Scan says yes
              </p>
              <h2
                id="tiers-heading"
                className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.012em]"
              >
                One stage, all five, then optional care.
              </h2>
              <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                The Leak Scan names the stage that leaks most and sets the baseline. The build price is fixed and confirmed in writing before work starts. The success fee is the only part that moves, and only with money recovered.
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
                        href={t.href}
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
              <a href="/contact?intent=white-label&from=pricing-addons" className="ims-link">
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
                    href="/contact?intent=leak-scan&from=pricing-footer-cta"
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
        <section
          id="terms"
          aria-labelledby="pricing-terms-heading"
          className="relative ims-band-light px-6 py-14 text-ink sm:py-16"
        >
          <div className="mx-auto w-full max-w-3xl">
            <h2 id="pricing-terms-heading" className="text-[0.8125rem] font-semibold text-ink">
              * The small print
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-[0.8125rem] leading-[1.65] text-ink-soft">
              {PRICING_TERMS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <TrophyFooter />
    </>
  );
}
