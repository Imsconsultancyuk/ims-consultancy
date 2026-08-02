import type { Metadata } from "next";
import Link from "next/link";
import { TrophyHeader } from "../_components/TrophyHeader";
import { TrophyFooter } from "../_components/TrophyFooter";
import { Reveal } from "../_components/Reveal";
import { CharSplit } from "../_components/CharSplit";
import { ContactForm } from "../_components/ContactForm";
import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../_components/JsonLd";

const SITE = "https://intelmadesimple.com";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with IMS Consultancy. London-based strategic consultancy working with senior operators across the UK, Europe, and North America.",
  alternates: { canonical: `${SITE}/contact` },
  openGraph: {
    title: "Contact · IMS Consultancy",
    description:
      "Start a conversation with IMS Consultancy.",
    url: `${SITE}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  const page = webPageJsonLd({
    path: "/contact",
    name: "Contact · IMS Consultancy",
    description:
      "Contact IMS Consultancy. London-based strategic consultancy.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
  });

  const contactPoint = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE}/contact#contactpage`,
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE}#organization`,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer service",
        email: "info@intelmadesimple.com",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressCountry: "GB",
      },
    },
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, contactPoint]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="contact-heading"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(58, 109, 240,0.28), rgba(58, 109, 240,0.08) 40%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <div className="relative mx-auto w-full max-w-4xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Contact · Thoughtful, considered, prompt
              </p>
              <CharSplit
                text={"Start a conversation."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Tell us what is on your plate. We read every note carefully
                and write back personally with an honest read on whether we
                are the right partner.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="contact-grid-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <h2 id="contact-grid-heading" className="sr-only">
            Reach IMS Consultancy
          </h2>
          <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={120}>
              <aside className="flex flex-col gap-8">
                <div className="rounded-2xl border border-mauve-300/12 bg-deep-soft/55 p-7 backdrop-blur sm:p-8">
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                    Direct email
                  </p>
                  <a
                    href="mailto:info@intelmadesimple.com"
                    data-cursor="link"
                    className="mt-3 inline-block font-serif text-[1.25rem] leading-tight text-paper-ink underline-offset-4 hover:underline"
                  >
                    info@intelmadesimple.com
                  </a>
                  <p className="mt-4 text-[0.9375rem] leading-[1.7] text-mauve-300">
                    Use this if you would rather skip the form.
                  </p>
                </div>

                <div className="rounded-2xl border border-mauve-300/12 bg-deep-soft/55 p-7 backdrop-blur sm:p-8">
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                    Book a 20-minute call
                  </p>
                  <p className="mt-3 font-serif text-[1.25rem] leading-tight text-paper-ink">
                    Quick scoping, no obligation.
                  </p>
                  <p className="mt-4 text-[0.9375rem] leading-[1.7] text-mauve-300">
                    Send a note with two or three time windows that work for
                    you. We will confirm one in our reply.
                  </p>
                </div>

                <div className="rounded-2xl border border-mauve-300/12 bg-deep-soft/55 p-7 backdrop-blur sm:p-8">
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                    Where we are
                  </p>
                  <p className="mt-3 font-serif text-[1.25rem] leading-tight text-paper-ink">
                    London, United Kingdom
                  </p>
                  <p className="mt-4 text-[0.9375rem] leading-[1.7] text-mauve-300">
                    Working with clients across the UK, Europe, and North
                    America. Most engagements run remote with on-site
                    workshops where they earn their keep.
                  </p>
                </div>

                <div className="rounded-2xl border border-mauve-200/25 bg-mauve-200/[0.03] p-7 backdrop-blur sm:p-8">
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                    How we work
                  </p>
                  <p className="mt-3 font-serif text-[1.25rem] leading-snug text-paper-ink">
                    Considered, written replies — never form letters.
                  </p>
                  <p className="mt-4 text-[0.9375rem] leading-[1.7] text-mauve-300">
                    Every note is read by a senior member of the firm. We
                    write back personally with an honest read of the work,
                    even when we suggest you look elsewhere.
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </section>

        <section
          aria-labelledby="contact-after-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="contact-after-heading"
                className="font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.012em]"
              >
                Want to read first?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Three short reads that cover most of what people ask before
                the first call.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/process"
                  data-cursor="link"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-mauve-300/40 bg-deep/40 px-6 text-sm font-medium tracking-[0.02em] text-paper-ink backdrop-blur transition-all duration-300 hover:border-mauve-200 hover:bg-deep/70"
                >
                  Process
                </Link>
                <Link
                  href="/pricing"
                  data-cursor="link"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-mauve-300/40 bg-deep/40 px-6 text-sm font-medium tracking-[0.02em] text-paper-ink backdrop-blur transition-all duration-300 hover:border-mauve-200 hover:bg-deep/70"
                >
                  Pricing
                </Link>
                <Link
                  href="/faq"
                  data-cursor="link"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-mauve-300/40 bg-deep/40 px-6 text-sm font-medium tracking-[0.02em] text-paper-ink backdrop-blur transition-all duration-300 hover:border-mauve-200 hover:bg-deep/70"
                >
                  FAQ
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
