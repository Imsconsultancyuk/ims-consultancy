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
  title: "Insights",
  description:
    "Field notes from inside IMS engagements. Strategy, technology, AI workflows. Short, honest, and only when there is something worth saying.",
  alternates: { canonical: `${SITE}/insights` },
  openGraph: {
    title: "Insights · IMS Consultancy",
    description:
      "Field notes from inside IMS engagements.",
    url: `${SITE}/insights`,
    type: "website",
  },
};

interface InsightStub {
  slug: string;
  topic: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
}

const INSIGHTS: InsightStub[] = [
  {
    slug: "ai-for-small-teams-2026",
    topic: "AI",
    title: "Where AI quietly earns its keep in a small team",
    summary:
      "A short field note on the three AI workflows that consistently pay back inside a sub-fifty-person team, and the four that do not.",
    date: "2026-05-12",
    readTime: "6 min read",
  },
  {
    slug: "ai-search-vs-google",
    topic: "SEO",
    title: "AI search is not replacing Google. It is replacing the SERP.",
    summary:
      "What changes for content strategy when half your traffic intent ends in a ChatGPT, Claude, or Perplexity answer instead of a list of blue links.",
    date: "2026-04-28",
    readTime: "9 min read",
  },
  {
    slug: "strategy-on-one-page",
    topic: "Strategy",
    title: "Strategy on a single page, or not at all",
    summary:
      "Why our strategy memos fit on one readable page, and what we leave out so the page can stay short.",
    date: "2026-04-10",
    readTime: "5 min read",
  },
];

export default function InsightsPage() {
  const page = webPageJsonLd({
    path: "/insights",
    name: "Insights · IMS Consultancy",
    description:
      "Field notes on strategy, technology, and AI workflows from inside IMS engagements.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
    ],
  });

  const blogList = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE}/insights#blog`,
    name: "IMS Consultancy Insights",
    description:
      "Field notes from inside IMS engagements covering strategy, technology, and AI workflows.",
    publisher: { "@id": `${SITE}#organization` },
    inLanguage: "en-GB",
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, blogList]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="insights-heading"
        >
          <div className="relative mx-auto w-full max-w-4xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Insights · Field notes
              </p>
              <CharSplit
                text={"Notes from inside\nreal engagements."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Short pieces on strategy, technology, and AI workflows.
                Written when there is something honest to say, never to fill
                a content calendar.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="insights-list-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <h2 id="insights-list-heading" className="sr-only">
            Recent insights
          </h2>
          <div className="mx-auto grid w-full max-w-5xl gap-6 sm:gap-8">
            {INSIGHTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <article className="group relative overflow-hidden rounded-2xl border border-mauve-300/12 bg-deep-soft/55 p-8 backdrop-blur transition-all duration-500 hover:border-mauve-300/30 hover:bg-deep-soft/75 sm:p-10">
                  <header className="flex flex-wrap items-center gap-4 text-mauve-300">
                    <span className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                      {p.topic}
                    </span>
                    <span aria-hidden className="text-mauve-300/50">·</span>
                    <time
                      dateTime={p.date}
                      className="font-sans text-[12px] tracking-[0.04em]"
                    >
                      {new Date(p.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span aria-hidden className="text-mauve-300/50">·</span>
                    <span className="font-sans text-[12px] tracking-[0.04em]">
                      {p.readTime}
                    </span>
                  </header>

                  <h3 className="mt-5 font-serif text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium leading-[1.15] tracking-[-0.01em] text-paper-ink">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[1rem] leading-[1.7] text-mauve-300">
                    {p.summary}
                  </p>
                  <footer className="mt-7">
                    <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-mauve-200/80">
                      Coming soon · Subscribe to the IMS letter for first read
                    </p>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="insights-cta-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="insights-cta-heading"
                className="font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.012em]"
              >
                One short note per month.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                The IMS letter lands in your inbox once a month. Field
                reports from real engagements. Unsubscribe in one click.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 inline-block">
                <MagneticButton strength={0.45} radius={120}>
                  <Link
                    href="/#newsletter"
                    data-cursor="cta"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-accent-500 px-8 text-sm font-medium tracking-[0.02em] text-paper-pure transition-all duration-300 hover:bg-accent-400 hover:shadow-[0_8px_32px_-8px_rgba(126, 160, 255,0.55)]"
                  >
                    Subscribe to the letter
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
