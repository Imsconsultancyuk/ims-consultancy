import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CharSplit } from "@/app/_components/CharSplit";
import { Reveal } from "@/app/_components/Reveal";
import { TrophyFooter } from "@/app/_components/TrophyFooter";
import { TrophyHeader } from "@/app/_components/TrophyHeader";
import { IndustriesHubJsonLd } from "@/components/industry/JsonLd";
import { industries } from "@/lib/industries";
import type { Industry } from "@/lib/industries/types";
import { BOOK_CALL_URL, HUB_COPY, SITE_URL } from "@/lib/industries/config";

export const metadata: Metadata = {
  title: HUB_COPY.meta.title,
  description: HUB_COPY.meta.description,
  alternates: { canonical: `${SITE_URL}/industries` },
  openGraph: {
    title: HUB_COPY.meta.title,
    description: HUB_COPY.meta.description,
    url: `${SITE_URL}/industries`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HUB_COPY.meta.title,
    description: HUB_COPY.meta.description,
  },
};

function IndustryCard({ industry }: { industry: Industry }) {
  const accent = `var(--color-signal-${industry.accent})`;

  return (
    <Link
      href={`/industries/${industry.slug}`}
      data-cursor="link"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-paper-ink/10 bg-deep transition-all duration-500 hover:border-paper-ink/25 hover:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.85)]"
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={`/images/industries/${industry.slug}.jpg`}
          alt=""
          fill
          aria-hidden
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.06]"
        />
        {/* Legibility ramp into the card body so the image never fights the type. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(15,19,32,1) 0%, rgba(15,19,32,0.55) 45%, rgba(15,19,32,0.25) 100%)",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: accent, opacity: 0.55 }}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
          />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-paper-ink/70">
            {industry.regulator} · {industry.shortName}
          </span>
        </div>

        <h2 className="mt-3 font-display text-[1.35rem] font-semibold leading-tight text-paper-ink">
          {industry.name}
        </h2>
        <p className="mt-2.5 text-[0.9rem] leading-relaxed text-paper-ink/75">
          {industry.leakLine}.
        </p>

        <ul className="mt-5 divide-y divide-paper-ink/10 border-t border-paper-ink/10">
          {industry.tools.map((tool) => (
            <li
              key={tool.id}
              className="flex items-baseline justify-between gap-3 py-2.5"
            >
              <span className="text-[0.85rem] font-medium leading-snug text-paper-ink/90">
                {tool.name}
              </span>
              <span
                className="shrink-0 font-mono text-[0.75rem] font-medium tabular-nums"
                style={{ color: accent }}
              >
                {tool.demo.result.metrics[0].value}
              </span>
            </li>
          ))}
        </ul>

        <span className="mt-auto flex items-center gap-2 pt-6 text-[0.85rem] font-medium text-paper-ink">
          Open {industry.shortName}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M3 7h8M8 3l3 4-3 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function IndustriesHubPage() {
  return (
    <>
      <IndustriesHubJsonLd industries={industries} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="industries-heading"
        >
          <div className="relative mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-accent-200">
                {HUB_COPY.eyebrow} · Ten practices
              </p>
              <CharSplit
                text={HUB_COPY.h1}
                className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.018em]"
                stagger={0.014}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                {HUB_COPY.sub}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href={BOOK_CALL_URL}
                  data-cursor="link"
                  className="rounded-md bg-accent-500 px-6 py-3 text-sm font-medium text-paper-pure transition-all duration-300 hover:bg-accent-400 hover:shadow-[0_6px_24px_-6px_rgba(58,109,240,0.55)]"
                >
                  Book 20 minutes
                </Link>
                <a
                  href="#practices"
                  data-cursor="link"
                  className="rounded-md border border-mauve-300/25 px-6 py-3 text-sm font-medium text-paper-ink transition-colors hover:border-mauve-300/50 hover:bg-deep-soft/70"
                >
                  Find your practice
                </a>
              </div>
              <p className="mt-6 max-w-xl text-[0.875rem] leading-relaxed text-mauve-300">
                {HUB_COPY.reassurance}
              </p>
            </Reveal>
          </div>
        </header>

        <section
          id="practices"
          aria-labelledby="practices-heading"
          className="relative isolate overflow-hidden ims-band-light px-6 py-20 text-ink sm:py-24 lg:py-28"
        >
          <div
            aria-hidden
            className="ims-footer-grid pointer-events-none absolute inset-0 opacity-[0.04]"
          />
          <div className="relative mx-auto w-full max-w-[1400px]">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-accent-600">
                Pick your practice
              </p>
              <h2
                id="practices-heading"
                className="mt-5 max-w-3xl font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.015em]"
              >
                Ten practices, one pattern, three tools each.
              </h2>
              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink/70">
                Open a practice to read what each tool finds, what your people
                do with the output, and to run all three on sample data before
                you speak to anyone.
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, index) => (
                <Reveal key={industry.slug} delay={60 + (index % 3) * 70}>
                  <IndustryCard industry={industry} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="hub-cta-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-accent-200">
                Not listed
              </p>
              <h2
                id="hub-cta-heading"
                className="mt-5 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.015em]"
              >
                If your firm holds a book, the same three tools apply.
              </h2>
              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                The pattern travels: find the revenue already earned, prove it
                on a sample of your own data, then draft the outreach your
                authorised people send. Bring us the export and we will show you
                what is sitting in it.
              </p>
              <Link
                href={BOOK_CALL_URL}
                data-cursor="link"
                className="mt-9 inline-flex items-center justify-center rounded-md bg-accent-500 px-6 py-3 text-sm font-medium text-paper-pure transition-all duration-300 hover:bg-accent-400 hover:shadow-[0_6px_24px_-6px_rgba(58,109,240,0.55)]"
              >
                Book a call
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <TrophyFooter />
    </>
  );
}
