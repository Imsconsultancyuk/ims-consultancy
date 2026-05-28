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
  title: "Reviews",
  description:
    "What founders and senior operators say about working with IMS Consultancy. Anonymised, verifiable on request, and selected to show how the work actually felt.",
  alternates: { canonical: `${SITE}/reviews` },
  openGraph: {
    title: "Reviews · IMS Consultancy",
    description: "How clients describe the work, in their own words.",
    url: `${SITE}/reviews`,
    type: "website",
  },
};

interface ReviewItem {
  attribution: string;
  role: string;
  body: string;
  highlight: string;
}

const REVIEWS: ReviewItem[] = [
  {
    attribution: "Operations director",
    role: "UK freight forwarder",
    body:
      "They walked the floor with us for a week before writing a single line of code. The system they built feels like it was always supposed to be there.",
    highlight: "Felt like it was always supposed to be there.",
  },
  {
    attribution: "Founder",
    role: "B2B SaaS",
    body:
      "Most engineering vendors hand you a finished thing and walk away. IMS handed us a finished thing, then a runbook, then trained two of our engineers to extend it.",
    highlight: "Trained our team to own everything.",
  },
  {
    attribution: "Managing partner",
    role: "UK strategy consultancy",
    body:
      "The first writeup they sent us was shorter than any consulting document I had read in twenty years and twice as honest. We bought the engagement on the first page.",
    highlight: "Shorter and twice as honest.",
  },
  {
    attribution: "CFO",
    role: "Regional property firm",
    body:
      "The bookkeeping team trusted the system on day one because IMS built the human review step in from the start. No theatrical AI dashboard. Just an honest spreadsheet that arrived on time.",
    highlight: "Trusted the system on day one.",
  },
  {
    attribution: "Head of product",
    role: "Healthcare startup",
    body:
      "They asked harder questions than our board. We pivoted twice during the audit phase and still came out with a clearer plan than we went in with.",
    highlight: "Asked harder questions than our board.",
  },
  {
    attribution: "Chief operating officer",
    role: "UK property consultancy",
    body:
      "Eighteen months in. The relationship is the proof. They show up to every quarterly review with one number we did not know we needed.",
    highlight: "They show up with the number we did not know we needed.",
  },
];

export default function ReviewsPage() {
  const page = webPageJsonLd({
    path: "/reviews",
    name: "Reviews · IMS Consultancy",
    description:
      "Anonymised reviews from founders and operators who have worked with IMS Consultancy.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Reviews", path: "/reviews" },
    ],
  });

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden bg-deep px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="reviews-heading"
        >
          <div className="relative mx-auto w-full max-w-4xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Reviews · In their words
              </p>
              <CharSplit
                text={"What the work\nfelt like."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Anonymised by default. Every review is verifiable on request
                and selected to show how the engagement actually felt, not
                only what it produced.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="reviews-grid-heading"
          className="relative bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <h2 id="reviews-grid-heading" className="sr-only">
            Reviews
          </h2>
          <div className="mx-auto grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.attribution + r.role} delay={i * 70}>
                <figure className="relative flex h-full flex-col rounded-2xl border border-mauve-300/12 bg-deep-soft/55 p-7 backdrop-blur sm:p-8">
                  <p className="font-serif text-[1.25rem] leading-[1.45] text-mauve-200">
                    {r.highlight}
                  </p>
                  <blockquote className="mt-5 text-[0.9375rem] leading-[1.7] text-paper-ink/95">
                    {r.body}
                  </blockquote>
                  <figcaption className="mt-auto pt-6">
                    <div className="h-px w-10 bg-mauve-300/40" />
                    <p className="mt-3 font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-mauve-200">
                      {r.attribution}
                    </p>
                    <p className="mt-1 text-[12px] text-mauve-300">
                      {r.role}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="reviews-cta-heading"
          className="relative bg-deep-soft px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="reviews-cta-heading"
                className="font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.012em]"
              >
                Read the engagements behind the reviews.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton strength={0.4} radius={110}>
                  <Link
                    href="/case-studies"
                    data-cursor="cta"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-7 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.55)]"
                  >
                    See case studies
                  </Link>
                </MagneticButton>
                <Link
                  href="/contact"
                  data-cursor="link"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-mauve-300/40 bg-deep/40 px-7 text-sm font-medium tracking-[0.02em] text-paper-ink backdrop-blur transition-all duration-300 hover:border-mauve-200 hover:bg-deep/70"
                >
                  Start a conversation
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
