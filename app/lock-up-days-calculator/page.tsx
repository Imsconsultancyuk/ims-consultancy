import type { Metadata } from "next";
import Link from "next/link";

import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../_components/JsonLd";
import { LeakLine } from "../_components/LeakLine";
import { Reveal } from "../_components/Reveal";
import { TrophyFooter } from "../_components/TrophyFooter";
import { TrophyHeader } from "../_components/TrophyHeader";
import { getGuide } from "@/lib/guides/guides";
import { OG_IMAGES } from "@/lib/og";

import { LockupCalculator } from "./LockupCalculator";

const SITE = "https://intelmadesimple.com";
const PATH = "/lock-up-days-calculator";
const TITLE = "Lock-Up Days Calculator: WIP Days and Debtor Days";
const DESCRIPTION =
  "Free lock-up days calculator for UK law firms and accountants. Enter fee income, WIP and debtors to get WIP days, debtor days and the cash a shorter cycle frees.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}${PATH}`, languages: { "en-GB": `${SITE}${PATH}` } },
  openGraph: {
    title: `${TITLE} | Intel Made Simple`,
    description: DESCRIPTION,
    url: `${SITE}${PATH}`,
    type: "website",
    images: OG_IMAGES,
  },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "How do you calculate lock-up days?",
    a: "Divide annual fee income by 365 to get daily fee income. Divide unbilled WIP by daily fee income to get WIP days, and unpaid billed fees by daily fee income to get debtor days. Lock-up days are WIP days plus debtor days.",
  },
  {
    q: "What is the formula for WIP days?",
    a: "WIP days equal unbilled work in progress divided by average daily fee income, where daily fee income is annual fee income divided by 365. A firm with £2,000,000 of fees and £250,000 of unbilled WIP has 45.6 WIP days.",
  },
  {
    q: "What is a good lock-up figure?",
    a: "We do not quote an industry average because we have not found a primary source we would stand behind. The most useful comparison is your own trailing twelve months: set a target as a fall against that line and review it monthly.",
  },
  {
    q: "Should I use figures with or without VAT?",
    a: "Either, as long as every figure uses the same basis every month. If debtors include VAT and fee income does not, debtor days will look worse than they are.",
  },
];

const RELATED = [
  "lock-up-days-explained",
  "unbilled-wip-uk-law-firms",
  "accountancy-debtor-days-and-wip",
  "chasing-late-invoices-uk-late-payment-law",
];

export default function LockupCalculatorPage() {
  const page = webPageJsonLd({
    path: PATH,
    name: TITLE,
    description: DESCRIPTION,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: "Lock-up days calculator", path: PATH },
    ],
  });

  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${SITE}${PATH}#app`,
    name: "Lock-up days calculator",
    url: `${SITE}${PATH}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    publisher: { "@id": `${SITE}/#organization` },
    inLanguage: "en-GB",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE}${PATH}#faq`,
    mainEntityOfPage: { "@id": `${SITE}${PATH}#webpage` },
    inLanguage: "en-GB",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const related = RELATED.map((s) => getGuide(s)).filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, app, faqPage]} />
      <TrophyHeader />

      <main id="main" className="flex flex-1 flex-col">
        <header className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-14 text-paper-ink sm:pt-44 sm:pb-16">
          <div className="relative mx-auto w-full max-w-[1160px]">
            <LeakLine />
            <Reveal className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-mauve-300">
                <Link href="/guides" className="hover:text-paper-ink">
                  Guides
                </Link>
                <span aria-hidden> / </span>
                <span>Calculator</span>
              </nav>
              <h1 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.016em]">
                Lock-up days calculator
              </h1>
              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Work out WIP days, debtor days and total lock-up for a law firm, accountancy practice or any
                firm that bills after doing the work. Free, no sign-up, and it runs in your browser.
              </p>
            </Reveal>
          </div>
        </header>

        <section aria-label="Calculator" className="ims-band-light px-6 py-16 text-ink sm:py-20">
          <div className="mx-auto w-full max-w-[1160px]">
            <LockupCalculator />
          </div>
        </section>

        <section aria-labelledby="how-heading" className="ims-band-light-soft px-6 py-16 text-ink sm:py-20">
          <div className="mx-auto w-full max-w-3xl">
            <h2 id="how-heading" className="font-display text-[clamp(1.5rem,2.8vw,2rem)] font-semibold leading-[1.15]">
              How the calculation works
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-ink/85">
              The Institute of Legal Finance and Management{" "}
              <a
                href="https://www.ilfm.org.uk/site/blog/ilfm-blog/lockup-management-in-law-firms-why-it-matters"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-accent-500 decoration-2 underline-offset-4"
              >
                describes lock-up
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{" "}
              as the time it takes a firm to turn work done into cash received, made up of two parts: WIP days
              and debtor days. The calculator uses the
              convention set out in our{" "}
              <Link href="/guides/lock-up-days-explained" className="underline decoration-accent-500 decoration-2 underline-offset-4">
                lock-up days guide
              </Link>
              :
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-[1.0625rem] leading-[1.7] text-ink/85">
              <li>Daily fee income = annual fee income divided by 365.</li>
              <li>WIP days = unbilled WIP divided by daily fee income.</li>
              <li>Debtor days = unpaid billed fees divided by daily fee income.</li>
              <li>Lock-up days = WIP days plus debtor days.</li>
            </ul>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-ink/85">
              It opens on the worked example from that guide: £2,000,000 of fees, £250,000 of unbilled WIP and
              £330,000 of unpaid bills give 45.6 WIP days, 60.2 debtor days and 105.9 days of lock-up. Those
              figures are invented to show the method. Replace them with your own.
            </p>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-ink/85">
              Read the two halves separately. The larger one tells you where to start: billing sooner if WIP days
              lead, a chasing routine if debtor days lead. Our guides to{" "}
              <Link href="/guides/unbilled-wip-uk-law-firms" className="underline decoration-accent-500 decoration-2 underline-offset-4">
                unbilled WIP
              </Link>{" "}
              and{" "}
              <Link
                href="/guides/chasing-late-invoices-uk-late-payment-law"
                className="underline decoration-accent-500 decoration-2 underline-offset-4"
              >
                UK late payment law
              </Link>{" "}
              cover each side.
            </p>

            <h2 className="mt-14 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-semibold leading-[1.15]">
              Questions
            </h2>
            <dl className="mt-6 space-y-7">
              {FAQ.map((f) => (
                <div key={f.q}>
                  <dt className="font-display text-[1.1875rem] font-semibold">{f.q}</dt>
                  <dd className="mt-2 text-[1.0625rem] leading-[1.7] text-ink/85">{f.a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 text-[0.8125rem] leading-[1.6] text-ink/70">
              General information, not accounting, legal or tax advice.
            </p>
          </div>
        </section>

        <section aria-labelledby="related-heading" className="ims-band-dark px-6 py-16 text-paper-ink sm:py-20">
          <div className="mx-auto w-full max-w-[1160px]">
            <h2 id="related-heading" className="font-display text-[1.5rem] font-semibold">
              Guides that go with it
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    data-cursor="link"
                    className="flex h-full flex-col rounded-[14px] border border-mauve-300/20 p-6 transition-colors hover:border-mauve-300/50"
                  >
                    <span className="text-[0.75rem] text-mauve-300">{g.topic}</span>
                    <span className="mt-2 font-display text-[1.0625rem] font-medium leading-snug">{g.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-14 max-w-2xl">
              <p className="text-[1.0625rem] leading-[1.7] text-mauve-300">
                The calculator shows how much cash is tied up. The free Leak Scan checks where it drops out
                between work and payment in your own firm.
              </p>
              <a
                href="/contact?intent=leak-scan&from=lockup-calculator"
                data-cursor="cta"
                className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-accent-500 px-8 text-sm font-medium text-on-amber transition-colors duration-300 hover:bg-accent-600"
              >
                Book a free Leak Scan
              </a>
            </div>
          </div>
        </section>
      </main>

      <TrophyFooter />
    </>
  );
}
