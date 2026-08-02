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
  title: "Custom Software",
  description:
    "Software built on real architecture, with tests, observability, and an honest hand-over. Web apps, dashboards, internal tools, integrations, and the systems that run your operations.",
  alternates: { canonical: `${SITE}/services/custom-software` },
  openGraph: {
    title: "Custom Software · IMS Consultancy",
    description:
      "Software that ships and stays shipped. Considered architecture, real tests, clean hand-over.",
    url: `${SITE}/services/custom-software`,
    type: "website",
  },
};

const CAPABILITIES = [
  {
    n: "01",
    title: "Web platforms and product MVPs",
    body: "Marketing sites, customer portals, and product MVPs built on a stack you can hire for. Next.js, TypeScript, Postgres, sensible defaults.",
  },
  {
    n: "02",
    title: "Internal tools and admin panels",
    body: "The unglamorous software that runs the business. Order desks, dispatch tools, customer admin, ops dashboards. Built to be used eight hours a day.",
  },
  {
    n: "03",
    title: "Integrations and pipelines",
    body: "Glue between the tools your team already lives in. Email, CRM, finance, warehouse, payments, all talking to each other without the manual export.",
  },
  {
    n: "04",
    title: "APIs and headless backends",
    body: "Public and private APIs designed to be read in a single sitting. Versioned, documented, and load-tested before shipping.",
  },
  {
    n: "05",
    title: "Data and reporting",
    body: "Warehousing, ETL, and reporting layers that turn whatever you have into numbers the leadership team can rely on.",
  },
  {
    n: "06",
    title: "Reliability and rescue work",
    body: "Inherited a brittle codebase. We do the diagnostic, name the load-bearing risks, and stabilise without a full rewrite.",
  },
];

const STANDARDS = [
  "Type-safe end to end. No silent any-typed seams.",
  "Tests at the levels that matter: unit for logic, integration for boundaries, end-to-end for critical flows.",
  "Observability, logging, and on-call rota in place before launch, not after the first incident.",
  "OWASP Top 10 reviewed and parameterised queries by default. No string-concatenated SQL.",
  "Atomic, reversible deployments. Every release can be rolled back inside a minute.",
  "Documentation written so a new engineer can be productive in a day.",
];

export default function CustomSoftwarePage() {
  const page = webPageJsonLd({
    path: "/services/custom-software",
    name: "Custom Software · IMS Consultancy",
    description:
      "Software built on real architecture with tests, observability, and clean hand-over. Web platforms, internal tools, integrations, APIs, data, and rescue work.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Custom Software", path: "/services/custom-software" },
    ],
  });

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}/services/custom-software#service`,
    name: "Custom Software Development",
    description:
      "Web platforms, internal tools, integrations, APIs, data layers, and rescue engagements.",
    serviceType: "Software development",
    provider: { "@id": `${SITE}#organization` },
    areaServed: "Worldwide",
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, service]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="cs-heading"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(58, 109, 240,0.28), rgba(58, 109, 240,0.08) 40%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <div className="relative mx-auto w-full max-w-4xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Service · Custom Software
              </p>
              <CharSplit
                text={"Software that ships\nand stays shipped."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Custom development for the systems your business runs on.
                Real architecture, real tests, decisions you can defend in
                any review, and a hand-over your team can extend without us
                in the room.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="cs-cap-heading"
          className="relative ims-band-light px-6 py-20 text-ink sm:py-24 lg:py-28"
        >
          <div
            aria-hidden
            className="ims-paper-aura pointer-events-none absolute inset-0 -z-10"
          />
          <div className="relative mx-auto w-full max-w-5xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-500">
                What we build
              </p>
              <h2
                id="cs-cap-heading"
                className="mt-5 max-w-3xl font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em] text-ink"
              >
                Six capabilities, one engagement model.
              </h2>
            </Reveal>

            <ol className="mt-12 grid gap-6 sm:grid-cols-2" role="list">
              {CAPABILITIES.map((c, i) => (
                <Reveal key={c.n} delay={80 + i * 70}>
                  <article className="ims-flip-card group relative h-full overflow-hidden rounded-2xl border border-mauve-500/15 bg-paper-soft/80 p-7 backdrop-blur transition-all duration-500 hover:border-accent-500/0 hover:bg-accent-500 hover:shadow-[0_24px_60px_-22px_rgba(58, 109, 240,0.65)] sm:p-8">
                    <span
                      aria-hidden="true"
                      className="ims-flip-sweep pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <p className="relative font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-500 transition-colors duration-500 group-hover:text-paper">
                      {c.n}
                    </p>
                    <h3 className="relative mt-4 font-serif text-xl font-medium leading-snug text-ink transition-colors duration-500 group-hover:text-paper">
                      {c.title}
                    </h3>
                    <p className="relative mt-3 text-[0.9375rem] leading-[1.7] text-ink-soft transition-colors duration-500 group-hover:text-paper/95">
                      {c.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="cs-standards-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Engineering standards
              </p>
              <h2
                id="cs-standards-heading"
                className="mt-5 font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em]"
              >
                The work behind the work.
              </h2>
            </Reveal>
            <ul className="mt-10 space-y-5" role="list">
              {STANDARDS.map((s, i) => (
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
          aria-labelledby="cs-cta-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="cs-cta-heading"
                className="font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.012em]"
              >
                Tell us what is on fire.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                A short conversation about what you need built, what is in
                the way, and whether we are the right partner for it.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton strength={0.4} radius={110}>
                  <a
                    href="/contact"
                    data-cursor="cta"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-accent-500 px-7 text-sm font-medium tracking-[0.02em] text-paper-pure transition-all duration-300 hover:bg-accent-400 hover:shadow-[0_8px_32px_-8px_rgba(126, 160, 255,0.55)]"
                  >
                    Start the conversation
                  </a>
                </MagneticButton>
                <Link
                  href="/case-studies"
                  data-cursor="link"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-mauve-300/40 bg-deep/40 px-7 text-sm font-medium tracking-[0.02em] text-paper-ink backdrop-blur transition-all duration-300 hover:border-mauve-200 hover:bg-deep/70"
                >
                  See real engagements
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
