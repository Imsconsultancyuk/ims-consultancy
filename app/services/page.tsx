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
  title: "Services",
  description:
    "Three layered services: Decide, Build, Compound. Strategy, software development, and AI workflow integration delivered in a single embedded engagement.",
  alternates: { canonical: `${SITE}/services` },
  openGraph: {
    title: "Services · IMS Consultancy",
    description:
      "Three services, one engagement. Decide, build, compound.",
    url: `${SITE}/services`,
    type: "website",
  },
};

const SERVICES = [
  {
    slug: "decide",
    n: "01",
    name: "Decide",
    summary: "Strategy, positioning, and the quiet judgement that separates good moves from busy ones.",
    deliverables: [
      "Two-week diagnostic with founder and senior team",
      "Strategy memo on a single readable page",
      "Positioning brief with three real options",
      "Decision register that updates as the business does",
    ],
    suitedFor: "Founders facing a major directional choice in the next ninety days.",
  },
  {
    slug: "build",
    n: "02",
    name: "Build",
    summary: "Development work with real architecture, real tests, and decisions you can defend in any review.",
    deliverables: [
      "Twelve-month build blueprint with tradeoffs visible",
      "Considered code, observability, on-call rota",
      "Small atomic deployments you can review and roll back",
      "Hand-over docs and recorded walkthroughs",
    ],
    suitedFor: "Teams that need to ship something material and cannot afford a brittle stack.",
  },
  {
    slug: "compound",
    n: "03",
    name: "Compound",
    summary: "AI-native workflows that turn one engagement into recurring advantage. Quiet automation, lasting results.",
    deliverables: [
      "Workflow audit naming the dull edges of each week",
      "Two to four small automation systems, well chosen",
      "Internal AI usage guidelines for the team",
      "Quarterly health check for the year after we leave",
    ],
    suitedFor: "Teams ready to remove repetitive admin or integrate AI without overcomplicating the stack.",
  },
];

export default function ServicesPage() {
  const servicesPage = webPageJsonLd({
    path: "/services",
    name: "Services · IMS Consultancy",
    description:
      "Three layered services: Decide, Build, Compound. Strategy, software development, and AI workflow integration in one engagement.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ],
  });

  const offerCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${SITE}/services#catalog`,
    name: "IMS Consultancy services",
    provider: { "@id": `${SITE}#organization` },
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.summary,
        serviceType: s.name,
        provider: { "@id": `${SITE}#organization` },
      },
    })),
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, servicesPage, offerCatalog]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden bg-deep px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="services-heading"
        >
          <div className="relative mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Services · Three layered
              </p>
              <CharSplit
                text={"Three services,\none engagement."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Most clients arrive through one door and stay for all three.
                Each service stands on its own and each one makes the next two
                sharper.
              </p>
            </Reveal>
          </div>
        </header>

        {/* Direct service category links */}
        <section
          aria-labelledby="categories-heading"
          className="relative bg-deep px-6 pb-16 text-paper-ink sm:pb-20"
        >
          <div className="mx-auto w-full max-w-5xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-300">
                Specific service areas
              </p>
              <h2
                id="categories-heading"
                className="mt-4 max-w-2xl font-serif text-[clamp(1.375rem,2.4vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.01em]"
              >
                Where the engagement shows up in the work.
              </h2>
            </Reveal>
            <ul
              className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
              role="list"
            >
              {[
                { href: "/services/ai-automation", label: "AI Automation" },
                { href: "/services/seo", label: "SEO and Organic Growth" },
                {
                  href: "/services/custom-software",
                  label: "Custom Software",
                },
                {
                  href: "/services/strategic-advisory",
                  label: "Strategic Advisory",
                },
              ].map((c, i) => (
                <Reveal key={c.href} delay={i * 60}>
                  <li>
                    <Link
                      href={c.href}
                      data-cursor="link"
                      className="group flex h-full items-center justify-between gap-3 rounded-xl border border-mauve-300/12 bg-deep-soft/55 px-5 py-4 backdrop-blur transition-all duration-300 hover:border-mauve-300/30 hover:bg-deep-soft/80"
                    >
                      <span className="font-sans text-[0.9375rem] font-medium tracking-[0.01em] text-paper-ink">
                        {c.label}
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden
                        className="text-mauve-200 transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <path
                          d="M2 6h8M7 3l3 3-3 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="catalog-heading"
          className="relative bg-deep px-6 pb-20 text-paper-ink sm:pb-24 lg:pb-28"
        >
          <h2 id="catalog-heading" className="sr-only">
            Service catalog
          </h2>
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 sm:gap-14">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 100}>
                <article
                  id={s.slug}
                  className="relative overflow-hidden rounded-2xl border border-mauve-300/12 bg-deep-soft/55 p-8 backdrop-blur sm:p-10 lg:p-12"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-6 -right-2 font-serif text-[10rem] leading-none text-mauve-300/12 sm:text-[14rem]"
                  >
                    {s.n}
                  </span>
                  <div className="relative grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
                    <header>
                      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                        Service {s.n}
                      </p>
                      <h3 className="mt-4 font-serif text-[clamp(2rem,3.6vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.015em]">
                        {s.name}
                      </h3>
                      <p className="mt-5 text-[1.0625rem] leading-[1.7] text-mauve-300">
                        {s.summary}
                      </p>
                      <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.22em] text-mauve-200">
                        Suited for
                      </p>
                      <p className="mt-2 text-[0.9375rem] leading-[1.65] text-mauve-300">
                        {s.suitedFor}
                      </p>
                    </header>
                    <section aria-label={`${s.name} deliverables`}>
                      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                        Deliverables
                      </p>
                      <ul className="mt-5 space-y-3 text-[0.9375rem] leading-[1.7] text-paper-ink/95" role="list">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-3">
                            <span
                              aria-hidden
                              className="mt-2.5 inline-block h-[3px] w-3 shrink-0 bg-mauve-200"
                            />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="contact-cta-heading"
          className="relative bg-deep-soft px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <CharSplit
                text="Worth a conversation?"
                className="font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.012em]"
                stagger={0.02}
              />
              <p id="contact-cta-heading" className="sr-only">
                Contact IMS Consultancy
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                One reply from us, often within the same day. We tell you
                honestly whether we are the right partner before any proposal.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 inline-block">
                <MagneticButton strength={0.45} radius={120}>
                  <Link
                    href="/contact"
                    data-cursor="cta"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-8 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.55)]"
                  >
                    Start a conversation
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
