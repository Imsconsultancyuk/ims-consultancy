import type { Metadata } from "next";

import { CharSplit } from "../_components/CharSplit";
import { HeroLedger, LeakLine } from "../_components/LeakLine";
import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../_components/JsonLd";
import { Reveal } from "../_components/Reveal";
import { TrophyFooter } from "../_components/TrophyFooter";
import { TrophyHeader } from "../_components/TrophyHeader";
import { insights } from "@/lib/insights/posts";
import { OG_IMAGES } from "@/lib/og";

import { InsightsGrid } from "./InsightsGrid";

const SITE = "https://intelmadesimple.com";
const DESCRIPTION =
  "Twenty summaries of research on AI in business from UK government, regulators and universities, each credited and linked, with what it means for a small firm.";

export const metadata: Metadata = {
  title: "AI in Business: 20 Sourced Summaries",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/insights`, languages: { "en-GB": `${SITE}/insights` } },
  openGraph: {
    title: "AI in Business: 20 Sourced Summaries | Intel Made Simple",
    description: DESCRIPTION,
    url: `${SITE}/insights`,
    type: "website",
    images: OG_IMAGES,
  },
};

const readCount = insights.filter((p) => p.access === "read").length;

export default function InsightsPage() {
  const page = webPageJsonLd({
    path: "/insights",
    name: "AI for business insights | Intel Made Simple",
    description: DESCRIPTION,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
    ],
  });

  const list = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE}/insights#collection`,
    url: `${SITE}/insights`,
    name: "AI for business insights",
    description: DESCRIPTION,
    inLanguage: "en-GB",
    publisher: { "@id": `${SITE}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: insights.length,
      itemListElement: insights.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/insights/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, list]} />
      <TrophyHeader />

      <main id="main" className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="insights-heading"
        >
          <div className="relative mx-auto w-full max-w-[1160px]">
            <LeakLine />
            <HeroLedger />
            <Reveal className="max-w-3xl">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-accent-200">
                Insights · {insights.length} sourced summaries
              </p>
              <CharSplit
                as="h1"
                text={"What the research says\nabout AI in business."}
                className="mt-5 font-display text-[clamp(2.25rem,4.8vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.018em]"
                stagger={0.016}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                We read the UK government, the regulators, the universities and
                the big vendors so you do not have to. Each summary is in our
                own words, credits the publisher, and sends you to the original.
                Under every one sits a plain line on what it means for a firm
                of ten people.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-mauve-300/20 pt-6">
                <div>
                  <dt className="font-display text-[1.75rem] font-semibold tabular-nums">{insights.length}</dt>
                  <dd className="mt-1 text-[0.8125rem] text-mauve-300">summaries hosted</dd>
                </div>
                <div>
                  <dt className="font-display text-[1.75rem] font-semibold tabular-nums">{readCount}</dt>
                  <dd className="mt-1 text-[0.8125rem] text-mauve-300">checked against the publisher&rsquo;s own page</dd>
                </div>
                <div>
                  <dt className="font-display text-[1.75rem] font-semibold tabular-nums">{insights.length - readCount}</dt>
                  <dd className="mt-1 text-[0.8125rem] text-mauve-300">taken from a press report, and labelled so</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="insights-list-heading"
          className="relative isolate overflow-hidden ims-band-light px-6 py-20 text-ink sm:py-24"
        >
          <div className="relative mx-auto w-full max-w-[1160px]">
            <h2 id="insights-list-heading" className="sr-only">
              All insights
            </h2>
            <InsightsGrid posts={insights} />
          </div>
        </section>

        <section
          aria-labelledby="how-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24"
        >
          <div className="mx-auto grid w-full max-w-[1160px] gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-accent-200">
                How we host these
              </p>
              <h2
                id="how-heading"
                className="mt-5 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.015em]"
              >
                Our words, their numbers, their link.
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-[1.7] text-mauve-300">
                Nothing here is copied. We summarise, keep the headline figures
                the publisher put out, and link to the source so you can check
                us. If a figure comes from a news write-up rather than the
                publisher, the card says &ldquo;Via report&rdquo; and the page
                explains why.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="space-y-5 text-[0.95rem] leading-[1.65] text-mauve-300">
                <li>
                  <span className="font-semibold text-paper-ink">Source read.</span>{" "}
                  We opened the publisher&rsquo;s own page and took the figures from it.
                </li>
                <li>
                  <span className="font-semibold text-paper-ink">Via report.</span>{" "}
                  The publisher&rsquo;s page would not load for us, so the figures come
                  from a named press or analyst write-up. Check the original before you quote it.
                </li>
                <li>
                  <span className="font-semibold text-paper-ink">Vendor studies.</span>{" "}
                  Microsoft, Google, IBM and Anthropic sell the things they study. We say so on each page.
                </li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section
          aria-labelledby="insights-cta-heading"
          className="relative ims-band-light px-6 py-20 text-ink sm:py-24"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="insights-cta-heading"
                className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.012em]"
              >
                Reading is the easy part.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-ink/70">
                Most of these studies agree on one thing: firms use AI and few
                can show what it changed. A free Leak Scan shows where your own
                numbers stand.
              </p>
              <a
                href="/contact"
                data-cursor="cta"
                className="mt-9 inline-flex h-12 items-center justify-center rounded-full bg-accent-500 px-8 text-sm font-medium text-on-amber transition-colors duration-300 hover:bg-accent-600"
              >
                Book a free Leak Scan
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <TrophyFooter />
    </>
  );
}
