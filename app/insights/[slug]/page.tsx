import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../../_components/JsonLd";
import { Reveal } from "../../_components/Reveal";
import { TrophyFooter } from "../../_components/TrophyFooter";
import { TrophyHeader } from "../../_components/TrophyHeader";
import { getInsight, insights } from "@/lib/insights/posts";
import { INSIGHT_SPOKES } from "@/lib/insights/spokes";
import { OG_IMAGES } from "@/lib/og";

const SITE = "https://intelmadesimple.com";
// The date our own summary was written and last checked against the sources.
const SUMMARY_DATE = "2026-10-23";
const SUMMARY_DATE_LABEL = "23 October 2026";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  const description = post.metaDescription;
  return {
    title: post.metaTitle,
    description,
    alternates: { canonical: `${SITE}/insights/${post.slug}`, languages: { "en-GB": `${SITE}/insights/${post.slug}` } },
    openGraph: {
      title: `${post.metaTitle} | Intel Made Simple`,
      description,
      url: `${SITE}/insights/${post.slug}`,
      type: "article",
      images: OG_IMAGES,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const path = `/insights/${post.slug}`;
  const page = webPageJsonLd({
    path,
    name: post.title,
    description: post.summary,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
      { name: post.title, path },
    ],
  });

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE}${path}#article`,
    mainEntityOfPage: `${SITE}${path}`,
    headline: post.title,
    description: post.summary,
    datePublished: SUMMARY_DATE,
    dateModified: SUMMARY_DATE,
    inLanguage: "en-GB",
    author: { "@id": `${SITE}/#organization` },
    publisher: { "@id": `${SITE}/#organization` },
    image: `${SITE}/opengraph-image.png`,
    isBasedOn: {
      "@type": "CreativeWork",
      name: post.sourceTitle,
      url: post.sourceUrl,
      publisher: { "@type": "Organization", name: post.publisher },
      ...(post.isoDate ? { datePublished: post.isoDate } : {}),
    },
  };

  const related = insights
    .filter((p) => p.topic === post.topic && p.slug !== post.slug)
    .slice(0, 3);
  const spokes = INSIGHT_SPOKES[post.slug];

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, article]} />
      <TrophyHeader />

      <main id="main" className="flex flex-1 flex-col">
        <header className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-14 text-paper-ink sm:pt-44 sm:pb-16">
          <div className="relative mx-auto w-full max-w-3xl">
            <Reveal>
              <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-mauve-300">
                <Link href="/insights" className="hover:text-paper-ink">
                  Insights
                </Link>
                <span aria-hidden> / </span>
                <span>{post.topic}</span>
              </nav>
              <h1 className="mt-6 font-display text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.016em]">
                {post.title}
              </h1>
              <p className="mt-6 text-[0.875rem] text-mauve-300">
                Summary of {post.publisher}, {post.published}
                <span aria-hidden> · </span>
                {post.access === "read" ? "Source read" : "Via report"}
              </p>
            </Reveal>
          </div>
        </header>

        <section className="ims-band-light px-6 py-16 text-ink sm:py-20">
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="text-[1.125rem] leading-[1.75] text-ink/85">{post.summary}</p>
            </Reveal>

            <Reveal delay={80}>
              <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-ink/12 bg-ink/12 sm:grid-cols-3">
                {post.points.map((pt) => (
                  <div key={pt.value + pt.label} className="bg-paper-soft p-6">
                    <dt className="font-display text-[1.75rem] font-semibold leading-tight tabular-nums">
                      {pt.value}
                    </dt>
                    <dd className="mt-2 text-[0.875rem] leading-snug text-ink/75">{pt.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={120}>
              <section aria-labelledby="take-heading" className="mt-12">
                <h2
                  id="take-heading"
                  className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-700"
                >
                  What it means for a small firm
                </h2>
                <p className="mt-4 font-display text-[1.375rem] font-medium leading-[1.4] tracking-[-0.005em]">
                  {post.imsTake}
                </p>
              </section>
            </Reveal>

            {post.caveat ? (
              <Reveal delay={140}>
                <aside className="mt-10 rounded-[14px] border border-ink/12 p-5">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70">
                    Read this with care
                  </h2>
                  <p className="mt-2 text-[0.9375rem] leading-[1.65] text-ink/80">{post.caveat}</p>
                </aside>
              </Reveal>
            ) : null}

            <Reveal delay={160}>
              <div className="mt-10 flex flex-col gap-4 rounded-[14px] bg-deep p-7 text-paper-ink sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[0.8125rem] text-mauve-300">Original source</p>
                  <p className="mt-1 font-medium">{post.sourceTitle}</p>
                  <p className="text-[0.875rem] text-mauve-300">{post.publisher}</p>
                </div>
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="cta"
                  className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-accent-500 px-6 text-sm font-medium text-on-amber transition-colors duration-300 hover:bg-accent-600"
                >
                  Find out more
                  <span className="sr-only"> at {post.publisher} (opens in a new tab)</span>
                  <span aria-hidden>&nbsp;↗</span>
                </a>
              </div>
              <p className="mt-4 text-[0.8125rem] leading-[1.6] text-ink/70">
                This page is our own summary, written {SUMMARY_DATE_LABEL}. The figures belong to the publisher.{" "}
                {post.access === "reported"
                  ? "The link above goes to the report we took them from, not to the primary document."
                  : "We checked them against the publisher’s page on the date above."}
              </p>
            </Reveal>
          </div>
        </section>

        {spokes ? (
          <section aria-labelledby="spokes-heading" className="ims-band-dark px-6 py-16 text-paper-ink sm:py-20">
            <div className="mx-auto w-full max-w-[1160px]">
              <h2 id="spokes-heading" className="font-display text-[1.5rem] font-semibold">
                Put it to work
              </h2>
              <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { kind: "Service", ...spokes.service },
                  { kind: "Industry", ...spokes.industry },
                  { kind: "Guide", ...spokes.guide },
                  { kind: "Pricing", href: "/pricing", label: "Fixed prices, from £400" },
                ].map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      data-cursor="link"
                      className="flex h-full flex-col rounded-[14px] border border-mauve-300/20 p-6 transition-colors hover:border-mauve-300/50"
                    >
                      <span className="text-[0.75rem] text-mauve-300">{s.kind}</span>
                      <span className="mt-2 font-display text-[1.0625rem] font-medium leading-snug">{s.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.9375rem] text-mauve-300">
                Or browse{" "}
                <Link href="/insights" className="underline decoration-accent-500 decoration-2 underline-offset-4">
                  all {insights.length} insight summaries
                </Link>
                .
              </p>
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section aria-labelledby="related-heading" className="ims-band-dark px-6 py-16 text-paper-ink sm:py-20">
            <div className="mx-auto w-full max-w-[1160px]">
              <h2 id="related-heading" className="font-display text-[1.5rem] font-semibold">
                More on {post.topic.toLowerCase()}
              </h2>
              <ul className="mt-8 grid gap-5 md:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/insights/${r.slug}`}
                      data-cursor="link"
                      className="flex h-full flex-col rounded-[14px] border border-mauve-300/20 p-6 transition-colors hover:border-mauve-300/50"
                    >
                      <span className="text-[0.75rem] text-mauve-300">{r.publisher.split(" (")[0]}</span>
                      <span className="mt-2 font-display text-[1.0625rem] font-medium leading-snug">{r.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="ims-band-light px-6 py-16 text-ink sm:py-20">
          <div className="mx-auto w-full max-w-3xl text-center">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-[1.15]">
              Want this read against your own numbers?
            </h2>
            <a
              href="/contact"
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
