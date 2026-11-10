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
import { getIndustry } from "@/lib/industries";
import { ADDONS, TIERS } from "@/lib/pricing/offers";
import { SERVICE_PAGES, rungFor } from "@/lib/services/catalog";
import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../_components/JsonLd";

const SITE = "https://intelmadesimple.com";

// One tool per sector, picked because the finding reads in a sentence.
// Figures come straight from each tool's sample-data run, never restated here.
const TOOL_EXAMPLES = [
  { slug: "law-firms", tool: 1 },
  { slug: "mortgage-brokers", tool: 0 },
  { slug: "accountancy-firms", tool: 1 },
] as const;

const DESCRIPTION =
  "Revenue Leak Recovery plus three first steps for UK firms: AI Readiness Audit, Enquiry Desk and Team Enablement, each £1,500. Prices published.";

export const metadata: Metadata = {
  title: "Revenue Recovery and AI Services, Priced",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/services`, languages: { "en-GB": `${SITE}/services` } },
  openGraph: {
    title: "Revenue Recovery and AI Services, Priced | Intel Made Simple",
    description: "Revenue Leak Recovery, plus three fixed-fee first steps for small UK firms.",
    url: `${SITE}/services`,
    type: "website",
    images: OG_IMAGES,
  },
};

const KICKER = "font-sans text-[11px] font-medium uppercase tracking-[0.22em]";

const LEAK_STAGES = [
  { n: "01", name: "Scan", line: "A free Leak Scan puts a number on what is leaking." },
  { n: "02", name: "Fix", line: "We stop the leaks that pay for themselves first." },
  { n: "03", name: "Recover", line: "Quiet follow-ups chase what is owed. A person approves anything that matters." },
];

const LEGACY = [
  { href: "/services/ai-automation", label: "AI Automation" },
  { href: "/services/seo", label: "SEO and Organic Growth" },
  { href: "/services/custom-software", label: "Custom Software" },
  { href: "/services/strategic-advisory", label: "Strategic Advisory" },
];

const HERO_FIGURES: HeroFigure[] = [
  { label: TIERS[0].name, value: TIERS[0].price, marked: true },
  ...SERVICE_PAGES.map((s) => ({ label: s.name, value: rungFor(s.rungSlug).price })),
];

export default function ServicesPage(): React.JSX.Element {
  const servicesPage = webPageJsonLd({
    path: "/services",
    name: "Services and Prices | Intel Made Simple",
    description: DESCRIPTION,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ],
  });

  const offerCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${SITE}/services#catalog`,
    name: "Intel Made Simple services",
    provider: { "@id": `${SITE}/#organization` },
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Revenue Leak Recovery",
          description: "Find where a firm's revenue leaks, fix it and recover what is owed.",
          url: `${SITE}/`,
          provider: { "@id": `${SITE}/#organization` },
        },
      },
      ...SERVICE_PAGES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.metaDescription,
          url: `${SITE}/services/${s.slug}`,
          provider: { "@id": `${SITE}/#organization` },
        },
      })),
    ],
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, servicesPage, offerCatalog]} />
      <TrophyHeader />

      <main id="main" className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="services-heading"
        >
          <div className="relative mx-auto w-full max-w-[1160px]">
            <LeakLine />
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:items-end lg:gap-16">
              <Reveal className="max-w-4xl">
                <p className={`${KICKER} text-mauve-200`}>Services · Start small</p>
                <CharSplit
                  as="h1"
                  text={"One main service.\nThree ways in."}
                  className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.018em]"
                  stagger={0.018}
                />
                <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                  We stop revenue leaking out of small UK firms. That is the main
                  job. Around it sit three fixed-fee first steps, each with a
                  published price, for owners who want to start smaller or start
                  somewhere else.
                </p>
              </Reveal>
              <HeroFigures label="Service prices" figures={HERO_FIGURES} note="Fixed scope and a fixed fee on every one." />
            </div>
          </div>
        </header>

        <section
          aria-labelledby="leak-heading"
          className="relative ims-band-light px-6 py-20 text-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto grid w-full max-w-[1160px] gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <Reveal>
              <h2
                id="leak-heading"
                className="font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.014em]"
              >
                Revenue Leak Recovery.
              </h2>
              <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.75] text-ink-soft">
                Enquiries that went unanswered, invoices that went unchased,
                renewals nobody noticed. We find each one, put a pound figure on
                it and fix the ones that pay for themselves first.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/contact?intent=leak-scan&from=services"
                  data-cursor="cta"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-accent-500 px-6 text-[14px] font-semibold text-on-amber transition-colors duration-300 hover:bg-accent-600"
                >
                  Book a free Leak Scan
                </a>
                <Link
                  href="/case-studies"
                  data-cursor="link"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-info px-6 text-[14px] font-medium text-info transition-colors duration-300 hover:bg-info-wash"
                >
                  Five documented cases
                </Link>
                <a
                  href="/tools"
                  data-cursor="link"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-info px-6 text-[14px] font-medium text-info transition-colors duration-300 hover:bg-info-wash"
                >
                  Try the tools
                </a>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <ol className="space-y-4" role="list">
                {LEAK_STAGES.map((s) => (
                  <li
                    key={s.n}
                    className="flex items-start gap-5 rounded-[14px] border border-mauve-500/15 bg-paper-soft/80 p-6"
                  >
                    <span className="font-display text-[1.5rem] font-bold leading-none text-mauve-500 tabular-nums">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.125rem] font-semibold">{s.name}</h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-[1.65] text-ink-soft">{s.line}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section
          aria-labelledby="ways-in-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-[1160px]">
            <Reveal>
              <h2
                id="ways-in-heading"
                className="max-w-2xl font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.012em]"
              >
                Start where it hurts. Prices are fixed and published.
              </h2>
            </Reveal>
            <ul className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr]" role="list">
              {SERVICE_PAGES.map((s, i) => {
                const rung = rungFor(s.rungSlug);
                const featured = i === 0;
                return (
                  <li key={s.slug} className="h-full">
                  <Reveal delay={i * 90} className="h-full">
                    <div
                      className={`flex h-full flex-col rounded-[14px] border ${
                        featured
                          ? "border-mauve-300/45 bg-paper-ink/[0.07] p-7 lg:p-10"
                          : "border-mauve-300/20 bg-deep/60 p-7"
                      }`}
                    >
                      <p className={`${KICKER} text-mauve-300`}>{s.kicker.replace("Service · ", "")}</p>
                      <h3
                        className={`mt-3 font-display font-semibold leading-tight ${
                          featured ? "text-[clamp(1.75rem,2.6vw,2.25rem)]" : "text-[1.5rem]"
                        }`}
                      >
                        <Link
                          href={`/services/${s.slug}`}
                          data-cursor="link"
                          className="hover:text-accent-200"
                        >
                          {s.name}
                        </Link>
                      </h3>
                      <p
                        className={`mt-4 font-display font-bold leading-none tracking-[-0.015em] ${
                          featured ? "text-[clamp(2.25rem,4vw,3.25rem)]" : "text-[1.75rem]"
                        }`}
                      >
                        {rung.price}
                      </p>
                      {rung.recurring ? (
                        <p className="mt-1.5 text-[0.875rem] text-paper-ink/90">{rung.recurring}</p>
                      ) : null}
                      <p className="mt-4 flex-1 text-[0.9375rem] leading-[1.65] text-mauve-300">
                        {rung.oneLine}
                      </p>
                      <Link
                        href={`/services/${s.slug}`}
                        data-cursor="cta"
                        className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-cobalt-200 px-6 text-[14px] font-medium text-cobalt-200 transition-colors duration-300 hover:border-cobalt-100 hover:text-cobalt-100 hover:bg-cobalt-200/15"
                      >
                        See how it works
                      </Link>
                    </div>
                  </Reveal>
                  </li>
                );
              })}
            </ul>
            <Reveal delay={200}>
              <p className="mt-8 max-w-2xl text-[0.9375rem] leading-[1.7] text-mauve-300">
                Not sure where to start? The free Leak Scan puts a pound figure on your leak first.{" "}
                <Link href="/pricing" className="ims-link">
                  See the full price ladder
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </section>

        <section
          aria-labelledby="tools-heading"
          className="relative ims-band-light-soft px-6 py-20 text-ink sm:py-24"
        >
          <div className="mx-auto w-full max-w-[1160px]">
            <Reveal>
              <h2
                id="tools-heading"
                className="max-w-2xl font-display text-[clamp(1.5rem,2.8vw,2rem)] font-semibold leading-[1.15] tracking-[-0.012em]"
              >
                What a finding looks like.
              </h2>
              <p className="mt-4 max-w-2xl text-[1rem] leading-[1.7] text-ink-soft">
                Each result below is the output of one of our tools run on synthetic
                sample data. They show the shape of a finding, not a promise about your
                numbers.
              </p>
            </Reveal>
            <ul className="mt-10 border-b border-mauve-500/25" role="list">
              {TOOL_EXAMPLES.map((ex, i) => {
                const industry = getIndustry(ex.slug);
                if (!industry) return null;
                const tool = industry.tools[ex.tool];
                return (
                  <li key={ex.slug} className="border-t border-mauve-500/25">
                  <Reveal delay={i * 80}>
                    <div className="gap-x-10 gap-y-4 py-8 md:grid md:grid-cols-[13rem_1fr_9.5rem] md:items-start">
                      <div>
                        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                          {industry.name}
                        </p>
                        <h3 className="mt-2 font-display text-[1.125rem] font-semibold">{tool.name}</h3>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <p className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-tight tracking-[-0.012em]">
                          {tool.demo.result.headline}
                        </p>
                        <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.65] text-ink-soft">
                          {tool.problem}
                        </p>
                      </div>
                      <Link
                        href={`/industries/${industry.slug}`}
                        className="mt-3 inline-flex min-h-[44px] items-center text-[0.9375rem] font-medium underline underline-offset-4 hover:text-mauve-500 md:mt-0 md:justify-end md:text-right"
                      >
                        Run it on sample data
                      </Link>
                    </div>
                  </Reveal>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 text-[0.9375rem] text-ink-soft">
              Ten sectors, three tools each.{" "}
              <a href="/tools" className="ims-link">
                See all the tools
              </a>
              .
            </p>
          </div>
        </section>

        <section
          aria-labelledby="projects-heading"
          className="relative ims-band-light px-6 py-20 text-ink sm:py-24"
        >
          <div className="mx-auto w-full max-w-[1160px]">
            <Reveal>
              <h2
                id="projects-heading"
                className="max-w-2xl font-display text-[clamp(1.5rem,2.8vw,2rem)] font-semibold leading-[1.15] tracking-[-0.012em]"
              >
                Once the first steps say yes.
              </h2>
              <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.7] text-ink-soft">Every price is confirmed in writing after the free Leak Scan.</p>
            </Reveal>
            <ul className="mt-10 grid gap-5 md:grid-cols-3" role="list">
              {TIERS.map((t, i) => (
                <li key={t.slug} className={i === 1 ? "md:mt-8" : i === 2 ? "md:mt-16" : undefined}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="h-full rounded-[14px] border border-mauve-500/15 bg-paper-soft/80 p-6">
                    <h3 className="font-display text-[1.25rem] font-semibold">{t.name}</h3>
                    <p className="mt-1 text-[0.9375rem] text-ink-soft">{t.positioning}</p>
                    <p className="mt-4 font-display text-[1.375rem] font-bold">
                      <span className="whitespace-nowrap">{t.price.replace(" per month", "")}</span>
                      {t.price.endsWith(" per month") && (
                        <span className="ml-1.5 whitespace-nowrap">per month</span>
                      )}
                    </p>
                    <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                      {t.cadence}
                    </p>
                    <p className="mt-4 text-[0.9375rem] leading-[1.65] text-ink-soft">{t.bestFor}</p>
                  </div>
                </Reveal>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[0.9375rem] text-ink-soft">
              Also available:{" "}
              {LEGACY.map((l, i) => (
                <span key={l.href}>
                  <Link href={l.href} className="ims-link">
                    {l.label}
                  </Link>
                  {i < LEGACY.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </div>
        </section>

        <section
          aria-labelledby="addons-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24"
        >
          <div className="mx-auto grid w-full max-w-[1160px] gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal>
              <p className={`${KICKER} text-mauve-200`}>For advisers and agencies</p>
              <h2
                id="addons-heading"
                className="mt-4 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-semibold leading-[1.15] tracking-[-0.012em]"
              >
                White-label add-ons.
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-[1.7] text-mauve-300">
                Small things you can sell under your own name. Quoted per build.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="grid gap-4 sm:grid-cols-2" role="list">
                {ADDONS.map((a) => (
                  <li key={a.slug} className="rounded-[14px] border border-mauve-300/20 bg-deep/60 p-6">
                    <h3 className="font-display text-[1.125rem] font-semibold">{a.name}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-[1.65] text-mauve-300">{a.line}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section
          aria-labelledby="contact-cta-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="contact-cta-heading"
                className="font-display text-[clamp(1.875rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.012em]"
              >
                Not sure which one? Start free.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                The Leak Scan takes about twenty minutes. We tell you plainly
                which step, if any, is worth paying for.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 inline-block">
                <MagneticButton strength={0.45} radius={120}>
                  <a
                    href="/contact?intent=leak-scan&from=services"
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
