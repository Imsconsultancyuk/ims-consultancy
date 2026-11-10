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
import { cases, LEAK_TYPES } from "@/lib/case-studies/cases";
import { OG_IMAGES } from "@/lib/og";

const SITE = "https://intelmadesimple.com";
const DESCRIPTION =
  "Five documented revenue leaks, from the NHS to an energy supplier, each from a public source with figures linked, and the control that would have caught it.";

export const metadata: Metadata = {
  title: "Five Revenue Leak Case Studies, Sourced",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/case-studies`, languages: { "en-GB": `${SITE}/case-studies` } },
  openGraph: {
    title: "Five Revenue Leak Case Studies, Sourced | Intel Made Simple",
    description: DESCRIPTION,
    url: `${SITE}/case-studies`,
    type: "website",
    images: OG_IMAGES,
  },
};

export default function CaseStudiesPage() {
  const page = webPageJsonLd({
    path: "/case-studies",
    name: "Revenue leak case studies | Intel Made Simple",
    description: DESCRIPTION,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Case studies", path: "/case-studies" },
    ],
  });

  const list = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE}/case-studies#collection`,
    url: `${SITE}/case-studies`,
    name: "Revenue leak case studies",
    description: DESCRIPTION,
    inLanguage: "en-GB",
    publisher: { "@id": `${SITE}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: cases.length,
      itemListElement: cases.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/case-studies#${c.slug}`,
        name: c.title,
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
          aria-labelledby="cases-heading"
        >
          <div className="relative mx-auto w-full max-w-[1160px]">
            <LeakLine />
            <HeroLedger />
            <Reveal className="max-w-3xl">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-accent-200">
                Case studies · {cases.length} documented leaks
              </p>
              <CharSplit
                as="h1"
                text={"Where the money leaks,\nin cases you can check."}
                className="mt-5 font-display text-[clamp(2.25rem,4.8vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.018em]"
                stagger={0.016}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Large organisations publish what they lose, because auditors and
                regulators make them. We read those reports to learn the shapes
                a leak takes, then look for the same shapes in firms of ten.
                Each case below is public, credited and linked. None of them is
                an Intel Made Simple client.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-mauve-300/20 bg-mauve-300/20 sm:grid-cols-5">
                {LEAK_TYPES.map((l, i) => (
                  <li key={l.type} className="bg-deep">
                    <a
                      href={`#${cases[i].slug}`}
                      data-cursor="link"
                      className="block h-full p-4 transition-colors duration-200 hover:bg-mauve-300/10"
                    >
                      <span className="text-[11px] tabular-nums text-mauve-300">0{i + 1}</span>
                      <span className="mt-1 block font-display text-[1rem] font-semibold">{l.type}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="pattern-heading"
          className="relative ims-band-light px-6 py-20 text-ink sm:py-24"
        >
          <div className="mx-auto grid w-full max-w-[1160px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <h2
                id="pattern-heading"
                className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.015em]"
              >
                Five questions that find most leaks.
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-[1.7] text-ink/70">
                Every case below fails one of them. A firm that can answer all
                five, with a number, has few leaks left to find.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ol className="divide-y divide-ink/12 border-y border-ink/12">
                {LEAK_TYPES.map((l, i) => (
                  <li key={l.type} className="flex items-baseline gap-5 py-4">
                    <span className="w-6 shrink-0 text-[0.8125rem] tabular-nums text-ink/80">0{i + 1}</span>
                    <span className="w-28 shrink-0 font-display font-semibold">{l.type}</span>
                    <span className="text-[0.95rem] text-ink/75">{l.question}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {cases.map((c, i) => {
          const dark = i % 2 === 1;
          return (
            <section
              key={c.slug}
              id={c.slug}
              aria-labelledby={`${c.slug}-heading`}
              className={`relative scroll-mt-24 px-6 py-20 sm:py-24 ${
                dark ? "ims-band-dark text-paper-ink" : "ims-band-light text-ink"
              }`}
            >
              <div className="mx-auto w-full max-w-[1160px]">
                <Reveal>
                  <p
                    className={`text-[0.875rem] font-semibold ${
                      dark ? "text-accent-200" : "text-accent-700"
                    }`}
                  >
                    Case 0{i + 1} · {c.leak} · {c.sector}
                  </p>
                  <h2
                    id={`${c.slug}-heading`}
                    className="mt-5 max-w-3xl font-display text-[clamp(1.75rem,3.4vw,2.625rem)] font-semibold leading-[1.1] tracking-[-0.015em]"
                  >
                    {c.title}
                  </h2>
                  <p className={`mt-4 text-[1.0625rem] ${dark ? "text-mauve-300" : "text-ink/70"}`}>
                    {c.leakLine}
                  </p>
                </Reveal>

                <Reveal delay={80}>
                  <dl
                    className={`mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border sm:grid-cols-3 ${
                      dark ? "border-mauve-300/20 bg-mauve-300/20" : "border-ink/12 bg-ink/12"
                    }`}
                  >
                    {c.points.map((pt) => (
                      <div key={pt.value + pt.label} className={`p-6 ${dark ? "bg-deep" : "bg-paper-soft"}`}>
                        <dt className="font-display text-[1.875rem] font-semibold leading-tight tabular-nums">
                          {pt.value}
                        </dt>
                        <dd className={`mt-2 text-[0.875rem] leading-snug ${dark ? "text-mauve-300" : "text-ink/75"}`}>
                          {pt.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>

                <div className="mt-12 grid gap-10 lg:grid-cols-2">
                  <Reveal delay={100}>
                    <h3 className="text-[0.875rem] font-semibold opacity-80">
                      What happened
                    </h3>
                    <p className="mt-3 text-[1rem] leading-[1.75] opacity-90">{c.whatHappened}</p>
                    <h3 className="mt-8 text-[0.875rem] font-semibold opacity-80">
                      Where it leaked
                    </h3>
                    <p className="mt-3 text-[1rem] leading-[1.75] opacity-90">{c.whereItLeaked}</p>
                  </Reveal>

                  <Reveal delay={140}>
                    <div
                      className={`rounded-[14px] p-6 ${
                        dark ? "bg-paper-soft text-ink" : "bg-deep text-paper-ink"
                      }`}
                    >
                      <h3
                        className={`text-[0.875rem] font-semibold ${
                          dark ? "text-accent-700" : "text-accent-200"
                        }`}
                      >
                        The control we would put in
                      </h3>
                      <p className="mt-3 text-[1rem] leading-[1.7]">{c.control}</p>
                      <h3
                        className={`mt-6 text-[0.875rem] font-semibold ${
                          dark ? "text-accent-700" : "text-accent-200"
                        }`}
                      >
                        In a firm of ten
                      </h3>
                      <p className="mt-3 text-[1rem] leading-[1.7]">{c.atTenPeople}</p>
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={160}>
                  <div
                    className={`mt-10 rounded-[14px] border p-5 ${
                      dark ? "border-mauve-300/25" : "border-ink/12"
                    }`}
                  >
                    <h3 className="text-[0.875rem] font-semibold opacity-80">
                      Read this with care
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-[1.65] opacity-85">{c.caveat}</p>
                  </div>

                  <p className={`mt-6 text-[0.875rem] ${dark ? "text-mauve-300" : "text-ink/70"}`}>
                    Source: {c.publisher}, {c.published}.{" "}
                    {c.access === "read" ? "Source read." : "Via report."}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <a
                      href={c.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="cta"
                      className="inline-flex h-11 items-center justify-center rounded-full bg-accent-500 px-6 text-sm font-medium text-on-amber transition-colors duration-300 hover:bg-accent-600"
                    >
                      Read the original
                      <span className="sr-only"> at {c.publisher} (opens in a new tab)</span>
                      <span aria-hidden>&nbsp;↗</span>
                    </a>
                    {c.more?.map((m) => (
                      <a
                        key={m.url}
                        href={m.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ims-link text-[0.875rem]"
                      >
                        {m.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ))}
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}

        <section
          aria-labelledby="cases-cta-heading"
          className={`relative px-6 py-20 sm:py-24 ${cases.length % 2 === 1 ? "ims-band-dark text-paper-ink" : "ims-band-light text-ink"}`}
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="cases-cta-heading"
                className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.012em]"
              >
                Run the five questions on your own firm.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] opacity-80">
                The free Leak Scan asks them against your invoices, contracts
                and time records, and returns a ranked list with a figure on
                each line. We have not yet run it on a published list of client
                results, and we will not invent one.
              </p>
              <a
                href="/contact?intent=leak-scan&from=case-studies"
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
