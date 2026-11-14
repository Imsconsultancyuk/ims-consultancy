import type { Metadata } from "next";
import Link from "next/link";

import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../_components/JsonLd";
import { LeakLine } from "../_components/LeakLine";
import { HeroFigures, type HeroFigure } from "../_components/HeroFigures";
import { Reveal } from "../_components/Reveal";
import { TrophyFooter } from "../_components/TrophyFooter";
import { TrophyHeader } from "../_components/TrophyHeader";
import { guides, wordCount } from "@/lib/guides/guides";
import { OG_IMAGES } from "@/lib/og";

const SITE = "https://intelmadesimple.com";
const DESCRIPTION =
  "Nine UK guides on revenue leakage, unbilled WIP, lock-up days, late payment law, renewals and UK GDPR. Every claim links to its statute, regulator or study.";

export const metadata: Metadata = {
  title: "UK Guides: WIP, Lock-Up and Late Payment",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/guides`, languages: { "en-GB": `${SITE}/guides` } },
  openGraph: {
    title: "UK Guides: WIP, Lock-Up and Late Payment | Intel Made Simple",
    description: DESCRIPTION,
    url: `${SITE}/guides`,
    type: "website",
    images: OG_IMAGES,
  },
};

const HERO_FIGURES: HeroFigure[] = [
  { label: "Guides", value: String(guides.length) },
  { label: "Sources cited", value: String(new Set(guides.flatMap((g) => g.sources.map((s) => s.url))).size), marked: true },
  { label: "Publishers", value: String(new Set(guides.flatMap((g) => g.sources.map((s) => s.publisher))).size) },
];

export default function GuidesPage() {
  const page = webPageJsonLd({
    path: "/guides",
    name: "UK guides on revenue recovery and AI for professional firms",
    description: DESCRIPTION,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
    ],
  });

  const list = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE}/guides#collection`,
    url: `${SITE}/guides`,
    name: "UK guides on revenue recovery and AI for professional firms",
    description: DESCRIPTION,
    inLanguage: "en-GB",
    publisher: { "@id": `${SITE}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: guides.length,
      itemListElement: guides.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/guides/${g.slug}`,
        name: g.title,
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
          aria-labelledby="guides-heading"
        >
          <div className="relative mx-auto w-full max-w-[1160px]">
            <LeakLine />
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:items-end lg:gap-16">
              <Reveal className="max-w-3xl">
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-accent-200">
                  Guides · {guides.length} sourced guides
                </p>
                <h1
                  id="guides-heading"
                  className="mt-5 font-display text-[clamp(2.25rem,4.8vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.018em]"
                >
                  Where firm cash goes missing, and what UK law says about it.
                </h1>
                <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                  Each guide is written for a UK professional firm and links every factual claim to the
                  statute, regulator or study behind it. Worked examples use invented figures and say so.
                </p>
              </Reveal>
              <HeroFigures label="What the guides rest on" figures={HERO_FIGURES} note="Each source link was opened and read on the date shown in its guide." />
            </div>
          </div>
        </header>

        <section aria-labelledby="guides-list-heading" className="ims-band-light px-6 py-20 text-ink sm:py-24">
          <div className="mx-auto w-full max-w-[1160px]">
            <h2 id="guides-list-heading" className="sr-only">
              All guides
            </h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    data-cursor="link"
                    className="flex h-full flex-col rounded-[14px] border border-ink/12 p-7 transition-colors hover:border-ink/40"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-700">
                      {g.topic}
                    </span>
                    <span className="mt-3 font-display text-[1.375rem] font-semibold leading-[1.2]">{g.title}</span>
                    <span className="mt-3 text-[0.9375rem] leading-[1.65] text-ink/75">{g.summary}</span>
                    <span className="mt-5 text-[0.8125rem] text-ink/70">
                      {wordCount(g).toLocaleString("en-GB")} words · {g.sources.length} sources
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ims-band-dark px-6 py-16 text-paper-ink sm:py-20">
          <div className="mx-auto w-full max-w-3xl text-center">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-[1.15]">
              Prefer the numbers from your own books?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
              The free Leak Scan checks where cash drops out between work and payment.{" "}
              <Link href="/pricing" className="underline decoration-accent-500 decoration-2 underline-offset-4">
                Free Leak Scan, then £1,500 a stage
              </Link>{" "}
              once you want a person to fix what it finds.
            </p>
            <a
              href="/contact?intent=leak-scan&from=guides"
              data-cursor="cta"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-accent-500 px-8 text-sm font-medium text-on-amber transition-colors duration-300 hover:bg-accent-600"
            >
              Book a free Leak Scan
            </a>
          </div>
        </section>
      </main>

      <TrophyFooter />
    </>
  );
}
