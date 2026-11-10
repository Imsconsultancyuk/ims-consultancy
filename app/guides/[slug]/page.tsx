import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../../_components/JsonLd";
import { LeakLine } from "../../_components/LeakLine";
import { Reveal } from "../../_components/Reveal";
import { TrophyFooter } from "../../_components/TrophyFooter";
import { TrophyHeader } from "../../_components/TrophyHeader";
import { faqItems, getGuide, guides, wordCount } from "@/lib/guides/guides";
import { stripLinks } from "@/lib/guides/blocks";
import { getInsight } from "@/lib/insights/posts";
import { OG_IMAGES } from "@/lib/og";

import { GuideBody } from "../GuideBody";

const SITE = "https://intelmadesimple.com";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `${SITE}/guides/${guide.slug}`, languages: { "en-GB": `${SITE}/guides/${guide.slug}` } },
    openGraph: {
      title: `${guide.metaTitle} | Intel Made Simple`,
      description: guide.metaDescription,
      url: `${SITE}/guides/${guide.slug}`,
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.modified,
      images: OG_IMAGES,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const path = `/guides/${guide.slug}`;
  const words = wordCount(guide);
  const page = webPageJsonLd({
    path,
    name: guide.title,
    description: guide.metaDescription,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: guide.title, path },
    ],
  });

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE}${path}#article`,
    mainEntityOfPage: { "@id": `${SITE}${path}#webpage` },
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.published,
    dateModified: guide.modified,
    inLanguage: "en-GB",
    wordCount: words,
    author: [{ "@id": `${SITE}/#organization` }, { "@id": `${SITE}/#founder` }],
    publisher: { "@id": `${SITE}/#organization` },
    image: `${SITE}/img/og-1200.jpg`,
    citation: guide.sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.label,
      url: s.url,
      publisher: { "@type": "Organization", name: s.publisher },
    })),
  };

  const faqEntries = faqItems(guide);
  const faqPage =
    faqEntries.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${SITE}${path}#faq`,
          mainEntityOfPage: { "@id": `${SITE}${path}#webpage` },
          inLanguage: "en-GB",
          mainEntity: faqEntries.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: stripLinks(f.a) },
          })),
        }
      : null;

  const insightLinks = guide.insightSlugs
    .map((s) => getInsight(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const relatedGuides = guide.relatedGuides
    .map((s) => getGuide(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <>
      <JsonLd data={faqPage ? [orgJsonLd, websiteJsonLd, page, article, faqPage] : [orgJsonLd, websiteJsonLd, page, article]} />
      <TrophyHeader />

      <main id="main" className="flex flex-1 flex-col">
        <header className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-14 text-paper-ink sm:pt-44 sm:pb-16">
          <div className="relative mx-auto w-full max-w-3xl">
            <LeakLine />
            <Reveal>
              <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-mauve-300">
                <Link href="/guides" className="hover:text-paper-ink">
                  Guides
                </Link>
                <span aria-hidden> / </span>
                <span>{guide.topic}</span>
              </nav>
              <h1 className="mt-6 font-display text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.016em]">
                {guide.title}
              </h1>
              <p className="mt-6 text-[0.875rem] text-mauve-300">
                By Intel Made Simple
                <span aria-hidden> · </span>
                <time dateTime={guide.published}>Published 27 October 2026</time>
                <span aria-hidden> · </span>
                {words.toLocaleString("en-GB")} words
                <span aria-hidden> · </span>
                {guide.sources.length} sources
              </p>
            </Reveal>
          </div>
        </header>

        <section className="ims-band-light px-6 py-16 text-ink sm:py-20">
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="text-[1.1875rem] leading-[1.7] text-ink/85">{guide.summary}</p>
            </Reveal>

            <div className="mt-10">
              <GuideBody blocks={guide.body} />
            </div>

            <section aria-labelledby="sources-heading" className="mt-14 rounded-[14px] border border-ink/12 p-6">
              <h2
                id="sources-heading"
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-700"
              >
                Sources, checked {guide.checked}
              </h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-[0.9375rem] leading-[1.6] text-ink/80">
                {guide.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-accent-500 decoration-2 underline-offset-4 hover:text-accent-700"
                    >
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    , {s.publisher}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-[0.8125rem] leading-[1.6] text-ink/70">
                Worked examples are our own arithmetic on invented figures and are labelled as such. This
                guide is general information, not legal, tax or regulatory advice.
              </p>
            </section>
          </div>
        </section>

        <section aria-labelledby="next-heading" className="ims-band-dark px-6 py-16 text-paper-ink sm:py-20">
          <div className="mx-auto w-full max-w-[1160px]">
            <h2 id="next-heading" className="font-display text-[1.5rem] font-semibold">
              Where to go next
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <li>
                <Link
                  href={guide.service.href}
                  data-cursor="link"
                  className="flex h-full flex-col rounded-[14px] border border-mauve-300/20 p-6 transition-colors hover:border-mauve-300/50"
                >
                  <span className="text-[0.75rem] text-mauve-300">Service</span>
                  <span className="mt-2 font-display text-[1.0625rem] font-medium leading-snug">
                    {guide.service.label}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={guide.industry.href}
                  data-cursor="link"
                  className="flex h-full flex-col rounded-[14px] border border-mauve-300/20 p-6 transition-colors hover:border-mauve-300/50"
                >
                  <span className="text-[0.75rem] text-mauve-300">Industry</span>
                  <span className="mt-2 font-display text-[1.0625rem] font-medium leading-snug">
                    {guide.industry.label}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  data-cursor="link"
                  className="flex h-full flex-col rounded-[14px] border border-mauve-300/20 p-6 transition-colors hover:border-mauve-300/50"
                >
                  <span className="text-[0.75rem] text-mauve-300">Free tool</span>
                  <span className="mt-2 font-display text-[1.0625rem] font-medium leading-snug">
                    Revenue Leak Scan
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  data-cursor="link"
                  className="flex h-full flex-col rounded-[14px] border border-mauve-300/20 p-6 transition-colors hover:border-mauve-300/50"
                >
                  <span className="text-[0.75rem] text-mauve-300">Pricing</span>
                  <span className="mt-2 font-display text-[1.0625rem] font-medium leading-snug">
                    Free Leak Scan, then £1,500 a stage
                  </span>
                </Link>
              </li>
            </ul>

            {relatedGuides.length + insightLinks.length > 0 ? (
              <>
                <h2 className="mt-14 font-display text-[1.5rem] font-semibold">Related reading</h2>
                <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {relatedGuides.map((g) => (
                    <li key={g.slug}>
                      <Link
                        href={`/guides/${g.slug}`}
                        data-cursor="link"
                        className="flex h-full flex-col rounded-[14px] border border-mauve-300/20 p-6 transition-colors hover:border-mauve-300/50"
                      >
                        <span className="text-[0.75rem] text-mauve-300">Guide</span>
                        <span className="mt-2 font-display text-[1.0625rem] font-medium leading-snug">
                          {g.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                  {insightLinks.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/insights/${p.slug}`}
                        data-cursor="link"
                        className="flex h-full flex-col rounded-[14px] border border-mauve-300/20 p-6 transition-colors hover:border-mauve-300/50"
                      >
                        <span className="text-[0.75rem] text-mauve-300">
                          Insight, {p.publisher.split(" (")[0]}
                        </span>
                        <span className="mt-2 font-display text-[1.0625rem] font-medium leading-snug">
                          {p.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </section>

        <section className="ims-band-light px-6 py-16 text-ink sm:py-20">
          <div className="mx-auto w-full max-w-3xl text-center">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-[1.15]">
              Want this applied to your own figures?
            </h2>
            <a
              href="/contact?intent=leak-scan&from=guide"
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
