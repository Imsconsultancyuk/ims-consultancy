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
  title: "SEO and Organic Growth",
  description:
    "Search visibility that compounds, including AI search. Technical audit, content strategy, on-page work, link earning, and the structured data that makes you legible to LLMs.",
  alternates: { canonical: `${SITE}/services/seo` },
  openGraph: {
    title: "SEO and Organic Growth · IMS Consultancy",
    description:
      "Search visibility that compounds. Technical, on-page, content, and AI-search ready.",
    url: `${SITE}/services/seo`,
    type: "website",
  },
};

const PILLARS = [
  {
    n: "01",
    title: "Technical SEO",
    body: "Crawlability, indexability, Core Web Vitals, structured data, internal linking, sitemap and robots hygiene. We fix the foundation first.",
  },
  {
    n: "02",
    title: "On-page and content",
    body: "Pillar pages, topical clusters, semantic depth, and copy written for humans first and search engines second.",
  },
  {
    n: "03",
    title: "AI search and answer engines",
    body: "Schema.org coverage, llms.txt, FAQ markup, entity clarity. We make the site legible to ChatGPT, Claude, Perplexity, and Google AI Overviews.",
  },
  {
    n: "04",
    title: "Authority and links",
    body: "Digital PR, original data, and earned mentions. We refuse cheap links because Google does too.",
  },
  {
    n: "05",
    title: "Local and entity SEO",
    body: "Google Business Profile, regional schema, citation hygiene, and entity-led content for businesses with a physical or regional presence.",
  },
  {
    n: "06",
    title: "Measurement and reporting",
    body: "GA4 done properly, Search Console, AI-referral tracking, and a single monthly report that says what we did and what it earned.",
  },
];

const STANDARDS = [
  "Google Search Essentials and quality guidelines.",
  "Schema.org structured data with valid Rich Results Test output.",
  "Core Web Vitals targets within Google thresholds (LCP, INP, CLS).",
  "llms.txt and AI bot allowlisting for emerging AI search surfaces.",
  "WCAG AA accessibility baseline, because search rewards it and users need it.",
];

export default function SeoPage() {
  const page = webPageJsonLd({
    path: "/services/seo",
    name: "SEO and Organic Growth · IMS Consultancy",
    description:
      "Search visibility that compounds across Google and AI answer engines. Technical, on-page, content, and authority work in one engagement.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "SEO and Organic Growth", path: "/services/seo" },
    ],
  });

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}/services/seo#service`,
    name: "SEO and Organic Growth",
    description:
      "Technical SEO, content strategy, AI search readiness, authority building, and measurement.",
    serviceType: "Search engine optimisation",
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
          aria-labelledby="seo-heading"
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
                Service · SEO and Organic Growth
              </p>
              <CharSplit
                text={"Search visibility\nthat compounds."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Search is changing. Google still matters, and so does
                ChatGPT, Claude, Perplexity, and Gemini. We help you show up
                cleanly in all of them with structured data, considered
                content, and a technical foundation that earns its rankings.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="seo-pillars-heading"
          className="relative bg-paper px-6 py-20 text-ink sm:py-24 lg:py-28"
        >
          <div
            aria-hidden
            className="ims-paper-aura pointer-events-none absolute inset-0 -z-10"
          />
          <div className="relative mx-auto w-full max-w-5xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-500">
                Six pillars of the engagement
              </p>
              <h2
                id="seo-pillars-heading"
                className="mt-5 max-w-3xl font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em] text-ink"
              >
                What is in scope.
              </h2>
            </Reveal>

            <ol className="mt-12 grid gap-6 sm:grid-cols-2" role="list">
              {PILLARS.map((p, i) => (
                <Reveal key={p.n} delay={80 + i * 70}>
                  <article className="ims-flip-card group relative h-full overflow-hidden rounded-2xl border border-mauve-500/15 bg-paper-soft/80 p-7 backdrop-blur transition-all duration-500 hover:border-mauve-500/0 hover:bg-mauve-500 hover:shadow-[0_24px_60px_-22px_rgba(120,100,120,0.65)] sm:p-8">
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

        <section
          aria-labelledby="seo-standards-heading"
          className="relative bg-deep-soft px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Standards we hold to
              </p>
              <h2
                id="seo-standards-heading"
                className="mt-5 font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em]"
              >
                The non-negotiables.
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
          aria-labelledby="seo-cta-heading"
          className="relative bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="seo-cta-heading"
                className="font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.012em]"
              >
                Get the free audit.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                We will run your site through a technical and AI-search
                audit, send the findings back as a single readable page, and
                only suggest the engagement if it would clearly pay back.
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
                    Request the audit
                  </a>
                </MagneticButton>
                <Link
                  href="/services"
                  data-cursor="link"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-mauve-300/40 bg-deep/40 px-7 text-sm font-medium tracking-[0.02em] text-paper-ink backdrop-blur transition-all duration-300 hover:border-mauve-200 hover:bg-deep/70"
                >
                  See all services
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
