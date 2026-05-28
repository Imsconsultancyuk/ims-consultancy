import type { Metadata } from "next";
import Link from "next/link";
import { TrophyHeader } from "../_components/TrophyHeader";
import { TrophyFooter } from "../_components/TrophyFooter";
import { Reveal } from "../_components/Reveal";
import { CharSplit } from "../_components/CharSplit";
import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "../_components/JsonLd";

const SITE = "https://intelmadesimple.com";
const EFFECTIVE_DATE = "28 May 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How IMS Consultancy collects, uses, and protects personal data. UK GDPR and Data Protection Act 2018 compliant. Plain English, no surprises.",
  alternates: { canonical: `${SITE}/privacy` },
  openGraph: {
    title: "Privacy Policy · IMS Consultancy",
    description:
      "How IMS Consultancy handles personal data, in plain English.",
    url: `${SITE}/privacy`,
    type: "website",
  },
};

export default function PrivacyPage() {
  const page = webPageJsonLd({
    path: "/privacy",
    name: "Privacy Policy · IMS Consultancy",
    description:
      "How IMS Consultancy collects, uses, and protects personal data under UK GDPR and the Data Protection Act 2018.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Privacy", path: "/privacy" },
    ],
  });

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden bg-deep px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="privacy-heading"
        >
          <div className="relative mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Privacy policy · UK GDPR
              </p>
              <CharSplit
                text={"How we handle\nyour information."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 text-[1.0625rem] leading-[1.7] text-mauve-300">
                Plain English. No surprises. Effective {EFFECTIVE_DATE}.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="privacy-body-heading"
          className="relative bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <h2 id="privacy-body-heading" className="sr-only">
            Privacy policy detail
          </h2>
          <article className="prose-ims mx-auto w-full max-w-3xl space-y-12 text-[1.0625rem] leading-[1.75] text-paper-ink/95">
            <Section title="1. Who we are">
              <p>
                IMS Consultancy (&ldquo;IMS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a UK-based
                strategic consultancy. This policy explains how we collect,
                use, and protect personal data in the course of running the
                business and delivering client engagements.
              </p>
              <p>
                For any privacy question, contact{" "}
                <a
                  href="mailto:hello@intelmadesimple.com"
                  className="text-mauve-200 underline-offset-4 hover:underline"
                >
                  hello@intelmadesimple.com
                </a>
                .
              </p>
            </Section>

            <Section title="2. The data we collect">
              <ul className="space-y-3">
                <Bullet>
                  <strong>Contact data</strong> you give us through the
                  contact form, email, or a scoping call. Name, email,
                  company, and the description of your enquiry.
                </Bullet>
                <Bullet>
                  <strong>Engagement data</strong> shared with us during a
                  paid engagement. Whatever is necessary to do the work and
                  no more.
                </Bullet>
                <Bullet>
                  <strong>Newsletter data</strong> if you subscribe to the
                  IMS letter. Only your email address.
                </Bullet>
                <Bullet>
                  <strong>Site analytics</strong>. Privacy-respecting,
                  cookie-free analytics covering aggregate page views,
                  referrers, and Core Web Vitals. No fingerprinting and no
                  third-party advertising trackers.
                </Bullet>
                <Bullet>
                  <strong>Technical logs</strong>. IP address and request
                  metadata retained briefly by our hosting provider for
                  security and abuse prevention.
                </Bullet>
              </ul>
            </Section>

            <Section title="3. Lawful bases">
              <p>
                We process personal data under UK GDPR on these lawful bases:
              </p>
              <ul className="space-y-3">
                <Bullet>
                  <strong>Legitimate interests</strong> for responding to
                  enquiries, running the consultancy, and protecting the
                  site against abuse.
                </Bullet>
                <Bullet>
                  <strong>Contract</strong> for delivering paid engagements
                  to clients.
                </Bullet>
                <Bullet>
                  <strong>Consent</strong> for newsletter subscriptions and
                  any optional marketing communication. Withdrawn in one
                  click.
                </Bullet>
                <Bullet>
                  <strong>Legal obligation</strong> for retaining records
                  required by tax, accounting, or anti-money-laundering law.
                </Bullet>
              </ul>
            </Section>

            <Section title="4. How long we keep it">
              <ul className="space-y-3">
                <Bullet>
                  Contact enquiries that do not become engagements: deleted
                  within twelve months.
                </Bullet>
                <Bullet>
                  Engagement records: retained for seven years after the
                  engagement ends, per UK accounting rules.
                </Bullet>
                <Bullet>
                  Newsletter subscriptions: retained until you unsubscribe.
                </Bullet>
                <Bullet>
                  Site analytics and access logs: retained for a maximum of
                  twelve months in anonymised form.
                </Bullet>
              </ul>
            </Section>

            <Section title="5. Who we share it with">
              <p>
                We share personal data only with the small set of vendors
                that make the consultancy run. Each one is bound by a data
                processing agreement and is selected for UK or EU data
                residency where available.
              </p>
              <ul className="space-y-3">
                <Bullet>
                  Hosting and content delivery.
                </Bullet>
                <Bullet>
                  Transactional email and newsletter sending.
                </Bullet>
                <Bullet>
                  Accounting, payments, and bookkeeping.
                </Bullet>
                <Bullet>
                  Privacy-respecting site analytics.
                </Bullet>
              </ul>
              <p>
                We do not sell, rent, or trade personal data to anyone, for
                any reason.
              </p>
            </Section>

            <Section title="6. International transfers">
              <p>
                Where a vendor processes data outside the UK or EEA, we rely
                on the UK Addendum to the EU Standard Contractual Clauses
                and we choose vendors that meet equivalent data-protection
                standards. We will tell you, on request, exactly which
                vendors hold what.
              </p>
            </Section>

            <Section title="7. Your rights">
              <p>Under UK GDPR you have the right to:</p>
              <ul className="space-y-3">
                <Bullet>access the personal data we hold on you,</Bullet>
                <Bullet>request correction of inaccurate data,</Bullet>
                <Bullet>request deletion where lawful bases allow,</Bullet>
                <Bullet>
                  restrict or object to processing for legitimate-interest
                  use,
                </Bullet>
                <Bullet>
                  withdraw consent for any consent-based processing,
                </Bullet>
                <Bullet>
                  request your data in a portable, machine-readable format,
                </Bullet>
                <Bullet>
                  lodge a complaint with the Information Commissioner&rsquo;s
                  Office at ico.org.uk.
                </Bullet>
              </ul>
              <p>
                Email{" "}
                <a
                  href="mailto:hello@intelmadesimple.com"
                  className="text-mauve-200 underline-offset-4 hover:underline"
                >
                  hello@intelmadesimple.com
                </a>{" "}
                and we will respond within thirty days, usually within four
                hours.
              </p>
            </Section>

            <Section title="8. Cookies">
              <p>
                We do not set marketing or tracking cookies. The only
                cookies on the site are essential to deliver the page you
                requested and to remember stated preferences for the
                duration of your visit.
              </p>
            </Section>

            <Section title="9. AI policy">
              <p>
                The use of AI inside both our consultancy and the work we
                deliver is governed by a separate published policy. Read it
                at{" "}
                <Link
                  href="/ai-policy"
                  className="text-mauve-200 underline-offset-4 hover:underline"
                >
                  /ai-policy
                </Link>
                .
              </p>
            </Section>

            <Section title="10. Standards we align with">
              <p>
                The way we hold and process personal data aligns with the
                following standards. Alignment, not certification, except
                where explicitly stated.
              </p>
              <ul className="space-y-3">
                <Bullet>ISO/IEC 27001 information security management.</Bullet>
                <Bullet>ISO/IEC 42001 AI management systems.</Bullet>
                <Bullet>
                  NIST AI Risk Management Framework (AI RMF 1.0).
                </Bullet>
                <Bullet>
                  OWASP Top 10 for Large Language Model Applications.
                </Bullet>
                <Bullet>UK Cyber Essentials baseline controls.</Bullet>
                <Bullet>UK GDPR and Data Protection Act 2018.</Bullet>
              </ul>
            </Section>

            <Section title="11. Changes to this policy">
              <p>
                We may update this policy as the business or the law
                changes. Material changes will be flagged on the homepage
                and on the IMS letter for at least thirty days before they
                take effect.
              </p>
            </Section>
          </article>
        </section>
      </main>

      <TrophyFooter />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section>
        <h3 className="font-serif text-[clamp(1.375rem,2.4vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.01em] text-paper-ink">
          {title}
        </h3>
        <div className="mt-5 space-y-4 text-mauve-300">{children}</div>
      </section>
    </Reveal>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden
        className="mt-3 inline-block h-[3px] w-3 shrink-0 bg-mauve-200"
      />
      <span>{children}</span>
    </li>
  );
}
