import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CharSplit } from "@/app/_components/CharSplit";
import { LeakLine } from "@/app/_components/LeakLine";
import { HeroFigures, type HeroFigure } from "@/app/_components/HeroFigures";
import { Reveal } from "@/app/_components/Reveal";
import { TrophyFooter } from "@/app/_components/TrophyFooter";
import { TrophyHeader } from "@/app/_components/TrophyHeader";
import { IndustriesHubJsonLd } from "@/components/industry/JsonLd";
import { industries } from "@/lib/industries";
import { DEPARTMENTS, STAGE_LABELS } from "@/lib/industries/departments";
import type { Industry } from "@/lib/industries/types";
import { BOOK_CALL_URL, HUB_COPY, SITE_URL } from "@/lib/industries/config";

import { OG_IMAGES } from "@/lib/og";

export const metadata: Metadata = {
  title: HUB_COPY.meta.title,
  description: HUB_COPY.meta.description,
  alternates: { canonical: `${SITE_URL}/industries`, languages: { "en-GB": `${SITE_URL}/industries` } },
  openGraph: {
    title: HUB_COPY.meta.title,
    description: HUB_COPY.meta.description,
    url: `${SITE_URL}/industries`,
    type: "website",
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: HUB_COPY.meta.title,
    description: HUB_COPY.meta.description,
  },
};

function IndustryCard({ industry, featured = false }: { industry: Industry; featured?: boolean }) {
  const accent = "var(--color-accent-400)";

  return (
    <Link
      href={`/industries/${industry.slug}`}
      data-cursor="link"
      className={`group flex h-full flex-col overflow-hidden rounded-[14px] border border-paper-ink/10 bg-deep transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-1 hover:border-accent-400/60 hover:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.85)] focus-visible:-translate-y-1 focus-visible:border-accent-400/60 motion-reduce:transform-none ${featured ? "lg:flex-row" : ""}`}
    >
      <div className={`relative h-40 overflow-hidden ${featured ? "lg:h-auto lg:min-h-[300px] lg:w-[46%] lg:shrink-0" : ""}`}>
        <Image
          src={`/images/industries/${industry.slug}.jpg`}
          alt=""
          fill
          aria-hidden
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover opacity-60 grayscale transition-[transform,opacity,filter] duration-700 group-hover:scale-[1.06] group-hover:opacity-90 group-hover:grayscale-0 group-focus-visible:opacity-90 group-focus-visible:grayscale-0 motion-reduce:transition-none"
        />
        {/* Legibility ramp into the card body so the image never fights the type. */}
        <div
          aria-hidden
          className={`absolute inset-0 ${featured ? "lg:hidden" : ""}`}
          style={{
            background:
              "linear-gradient(to top, var(--color-deep) 0%, color-mix(in oklab, var(--color-deep) 70%, transparent) 45%, color-mix(in oklab, var(--color-deep) 55%, transparent) 100%)",
          }}
        />
        {featured ? (
          <div
            aria-hidden
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, color-mix(in oklab, var(--color-deep) 35%, transparent) 0%, color-mix(in oklab, var(--color-deep) 60%, transparent) 70%, var(--color-deep) 100%)",
            }}
          />
        ) : null}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px transition-[height,opacity] duration-300 group-hover:h-[3px] group-focus-visible:h-[3px]"
          style={{ background: accent, opacity: 0.8 }}
        />
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:justify-center lg:p-10" : ""}`}>
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: accent }}
          />
          <span className="font-sans text-[0.75rem] font-medium text-paper-ink/75">
            {industry.regulator} · {industry.shortName}
          </span>
        </div>

        <h2
          className={`mt-3 font-display font-semibold leading-tight text-paper-ink ${
            featured ? "text-[1.35rem] lg:text-[2.125rem]" : "text-[1.35rem]"
          }`}
        >
          {industry.name}
        </h2>
        <p
          className={`mt-2.5 leading-relaxed text-paper-ink/75 ${
            featured ? "text-[0.9rem] lg:text-[1.0625rem]" : "text-[0.9rem]"
          }`}
        >
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

        <span className="mt-auto flex items-center gap-2 pt-6 text-[0.85rem] font-medium text-paper-ink transition-colors duration-300 group-hover:text-accent-300 group-focus-visible:text-accent-300">
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

const HERO_FIGURES: HeroFigure[] = [
  { label: "Practices covered", value: String(industries.length), marked: true },
  { label: "Stages in every map", value: String(Object.keys(STAGE_LABELS).length) },
  { label: "Regulators named", value: [...new Set(industries.map((i) => i.regulator))].join(", ") },
];

export default function IndustriesHubPage() {
  return (
    <>
      <IndustriesHubJsonLd industries={industries} />
      <TrophyHeader />

      <main id="main" className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="industries-heading"
        >
          <div className="relative mx-auto w-full max-w-[1160px]">
            <LeakLine />
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:items-end lg:gap-16">
              <Reveal className="max-w-3xl">
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-accent-200">
                  {HUB_COPY.eyebrow} · Ten practices
                </p>
                <CharSplit
                  as="h1"
                  text={HUB_COPY.h1}
                  className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.018em]"
                  stagger={0.014}
                />
                <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                  {HUB_COPY.sub}
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a
                    href={BOOK_CALL_URL}
                    data-cursor="link"
                    className="rounded-full bg-accent-500 px-6 py-3 text-sm font-medium text-on-amber transition-all duration-300 hover:bg-accent-600"
                  >
                    Book 20 minutes
                  </a>
                  <a
                    href="#practices"
                    data-cursor="link"
                    className="rounded-full border border-cobalt-200 px-6 py-3 text-sm font-medium text-cobalt-200 transition-colors hover:border-cobalt-100 hover:text-cobalt-100 hover:bg-cobalt-200/15"
                  >
                    Find your practice
                  </a>
                </div>
                <p className="mt-6 max-w-xl text-[0.875rem] leading-relaxed text-mauve-300">
                  {HUB_COPY.reassurance}
                </p>
              </Reveal>
              <HeroFigures label="What the practice pages cover" figures={HERO_FIGURES} note={`Every map runs ${Object.values(STAGE_LABELS).join(", ")}.`} />
            </div>
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
          <div className="relative mx-auto w-full max-w-[1160px]">
            <Reveal>
              <h2
                id="practices-heading"
                className="max-w-3xl font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.015em]"
              >
                Ten practices, one pattern, three tools each.
              </h2>
              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink/70">
                Open a practice to read what each tool finds, what your people
                do with the output, and to run all three on sample data before
                you speak to anyone.
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
              {industries.map((industry, index) => {
                const last = industries.length - 1;
                const span =
                  index === 0
                    ? "sm:col-span-2 lg:col-span-4"
                    : index === last
                      ? "sm:col-span-2 lg:col-span-3"
                      : index === last - 1
                        ? "lg:col-span-3"
                        : "lg:col-span-2";
                return (
                  <Reveal key={industry.slug} delay={60 + (index % 3) * 70} className={span}>
                    <IndustryCard industry={industry} featured={index === 0} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="department-matrix"
          aria-labelledby="matrix-heading"
          className="ims-band-light-soft px-6 py-20 text-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-[1160px]">
            <Reveal>
              <h2
                id="matrix-heading"
                className="max-w-3xl font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.015em]"
              >
                Revenue leaks in a different team at every stage.
              </h2>
              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink/70">
                Every practice follows a client from first enquiry to the next
                renewal. This is the team that owns each stage in each sector,
                and where we look first. Pick a row to see the problem in that
                department and what your people get.
              </p>
            </Reveal>

            <div className="mt-12 overflow-x-auto rounded-[14px] border border-line bg-paper">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  The department that owns each client-lifecycle stage, by sector
                </caption>
                <thead>
                  <tr className="border-b border-line">
                    <th scope="col" className="p-4 text-[0.8125rem] font-semibold text-ink-soft">
                      Sector
                    </th>
                    {(["win", "deliver", "paid", "keep"] as const).map((k, i) => (
                      <th
                        key={k}
                        scope="col"
                        className="p-4 text-[0.8125rem] font-semibold text-ink-soft"
                      >
                        <span className="num mr-2 text-ink">{i + 1}</span>
                        {STAGE_LABELS[k]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {industries.map((industry) => {
                    const d = DEPARTMENTS[industry.slug];
                    if (!d) return null;
                    return (
                      <tr
                        key={industry.slug}
                        className="border-b border-line last:border-b-0 hover:bg-paper-soft motion-reduce:transition-none"
                      >
                        <th scope="row" className="p-4 align-top font-medium text-ink">
                          <Link
                            href={`/industries/${industry.slug}#departments`}
                            data-cursor="link"
                            className="underline-offset-4 hover:underline"
                          >
                            {industry.name}
                          </Link>
                        </th>
                        {d.stages.map((stage) => (
                          <td key={stage.key} className="p-4 align-top">
                            <span className="flex items-start gap-2">
                              <span
                                aria-hidden
                                className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                                style={{
                                  background:
                                    stage.pain === undefined
                                      ? "transparent"
                                      : "var(--color-accent-500)",
                                  border: "1px solid var(--color-accent-500)",
                                }}
                              />
                              <span className="text-ink-soft">{stage.department}</span>
                            </span>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-ink-soft">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full"
                style={{ background: "var(--color-accent-500)" }}
              />
              Filled dot: a leak with a stated cost on the sector page.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="hub-cta-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-[1160px]">
            <Reveal className="max-w-3xl">
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
              <a
                href={BOOK_CALL_URL}
                data-cursor="link"
                className="mt-9 inline-flex items-center justify-center rounded-full bg-accent-500 px-6 py-3 text-sm font-medium text-on-amber transition-all duration-300 hover:bg-accent-600"
              >
                Book a call
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <TrophyFooter />
    </>
  );
}
