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
  title: "FAQ",
  description:
    "Honest answers to the questions clients ask before engaging IMS Consultancy. Engagement shape, pricing, AI policy, accreditations, working style.",
  alternates: { canonical: `${SITE}/faq` },
  openGraph: {
    title: "FAQ · IMS Consultancy",
    description:
      "Honest answers to the questions clients ask before engaging.",
    url: `${SITE}/faq`,
    type: "website",
  },
};

interface Faq {
  q: string;
  a: string;
}

const FAQS: Faq[] = [
  {
    q: "How small is small? How many clients do you work with at once?",
    a: "We hold three to five active engagements at a time. The cap is deliberate. It is the number that lets every client get the same attention as the first one, and the number that lets us still write things down properly.",
  },
  {
    q: "Do you work with companies of any size?",
    a: "We work with small and mid-sized businesses, from pre-revenue founders to one-hundred-person operations. We turn away enterprise scope where the political layer would eat the engagement, and we turn away pure agency work where there is no decision to be made.",
  },
  {
    q: "What does a typical engagement look like?",
    a: "Two weeks of audit, one week of decision and blueprint, then build. Atomic deliveries throughout. Hand-over and a ninety-day follow-up window at the end. Read /process for the long version.",
  },
  {
    q: "How is the work priced?",
    a: "Fixed scope, fixed price. Quoted in GBP. Three published tiers: quiet workflow from £6,000, professional revamp from £24,000, embedded partnership from £6,000 per month. Real quotes follow a twenty-minute scoping call. Read /pricing for detail.",
  },
  {
    q: "How quickly do you reply?",
    a: "Promptly and personally. Every enquiry is read by a senior member of the firm. We write back during UK business hours, and within a working day either side.",
  },
  {
    q: "Are you UK-based? Do you travel?",
    a: "Yes, based in London. We work with clients across the UK, Europe, and North America. Travel costed transparently for on-site work where it earns its keep.",
  },
  {
    q: "What is your AI policy?",
    a: "We follow the policy published at /ai-policy. Headlines: human review for any decision touching money, people, or compliance; no client data sent to a third-party model without written consent; cost and behaviour of every AI workflow tracked and reported back. We align our practice with ISO/IEC 42001, the NIST AI Risk Management Framework, and the UK AI Safety Institute guidance.",
  },
  {
    q: "What accreditations or standards do you align with?",
    a: "We align our practice with ISO/IEC 27001 for information security, ISO/IEC 42001 for AI management, the NIST AI RMF, the OWASP Top 10 for LLM Applications, Cyber Essentials, UK GDPR and the Data Protection Act 2018. Alignment, not certification. We can work cleanly alongside clients who themselves carry these certifications.",
  },
  {
    q: "Do you work with regulated industries?",
    a: "Yes. We have shipped work for financial services, property, healthcare-adjacent operations, and logistics. We will not work in domains where the regulatory footprint is larger than the engagement, and we say so plainly during scoping.",
  },
  {
    q: "Who actually does the work?",
    a: "A small senior team. The person you meet on the scoping call is the person who writes the audit and works alongside your team during build. No bait-and-switch.",
  },
  {
    q: "What happens at the end of an engagement?",
    a: "Full hand-over of documentation, recordings, and source. A ninety-day follow-up window for clarifications. We do not insert ourselves into ongoing relationships you do not want.",
  },
  {
    q: "What if the engagement is not the right fit?",
    a: "We tell you within the first scoping conversation, recommend a better partner where we know one, and the call costs you nothing.",
  },
];

export default function FaqPage() {
  const page = webPageJsonLd({
    path: "/faq",
    name: "FAQ · IMS Consultancy",
    description:
      "Honest answers to the questions clients ask before engaging IMS Consultancy.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "FAQ", path: "/faq" },
    ],
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE}/faq#faqpage`,
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, faqJsonLd]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="faq-heading"
        >
          <div className="relative mx-auto w-full max-w-4xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                FAQ · Twelve questions
              </p>
              <CharSplit
                text={"Honest answers,\nbefore you ask."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                The questions clients ask in the first scoping call, written
                up so the call can start in the second question.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="faq-list-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <h2 id="faq-list-heading" className="sr-only">
            Frequently asked questions
          </h2>
          <div className="mx-auto w-full max-w-3xl">
            <ol className="divide-y divide-mauve-300/12" role="list">
              {FAQS.map((f, i) => (
                <Reveal key={f.q} delay={i * 40}>
                  <li className="py-6 sm:py-8">
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                        <h3 className="font-serif text-[1.125rem] font-medium leading-[1.4] text-paper-ink sm:text-[1.25rem]">
                          {f.q}
                        </h3>
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block h-5 w-5 shrink-0 rounded-full border border-mauve-300/40 text-center text-mauve-200 transition-transform duration-300 group-open:rotate-45"
                        >
                          <svg
                            viewBox="0 0 10 10"
                            className="mx-auto h-full w-full p-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          >
                            <path d="M5 1v8M1 5h8" />
                          </svg>
                        </span>
                      </summary>
                      <p className="mt-4 text-[1rem] leading-[1.7] text-mauve-300 sm:text-[1.0625rem]">
                        {f.a}
                      </p>
                    </details>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="faq-cta-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="faq-cta-heading"
                className="font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.012em]"
              >
                Question that is not here?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Send it directly. You will have a thoughtful, written
                answer.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 inline-block">
                <MagneticButton strength={0.45} radius={120}>
                  <Link
                    href="/contact"
                    data-cursor="cta"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-accent-500 px-8 text-sm font-medium tracking-[0.02em] text-paper-pure transition-all duration-300 hover:bg-accent-400 hover:shadow-[0_8px_32px_-8px_rgba(126, 160, 255,0.55)]"
                  >
                    Ask us anything
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
