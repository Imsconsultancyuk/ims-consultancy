import type { Metadata } from "next";
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
  title: "Terms",
  description:
    "Terms of use for the IMS Consultancy site and the standard terms applied to engagements. Plain English, no boilerplate hiding the important bits.",
  alternates: { canonical: `${SITE}/terms` },
  openGraph: {
    title: "Terms · IMS Consultancy",
    description:
      "Terms of use for the IMS Consultancy site and standard engagement terms.",
    url: `${SITE}/terms`,
    type: "website",
  },
};

export default function TermsPage() {
  const page = webPageJsonLd({
    path: "/terms",
    name: "Terms · IMS Consultancy",
    description:
      "Terms of use for the IMS Consultancy site and standard engagement terms.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Terms", path: "/terms" },
    ],
  });

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden bg-deep px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="terms-heading"
        >
          <div className="relative mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Terms · Site and engagement
              </p>
              <CharSplit
                text={"Short terms.\nWritten plainly."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 text-[1.0625rem] leading-[1.7] text-mauve-300">
                These cover the site you are reading and the standard terms
                that sit alongside every IMS engagement letter. Effective{" "}
                {EFFECTIVE_DATE}.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="terms-body-heading"
          className="relative bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <h2 id="terms-body-heading" className="sr-only">
            Terms detail
          </h2>
          <article className="mx-auto w-full max-w-3xl space-y-12 text-[1.0625rem] leading-[1.75] text-paper-ink/95">
            <Section title="1. About IMS Consultancy">
              <p>
                IMS Consultancy is a UK-based strategic consultancy. This
                page covers (a) terms of use for visitors to the site at
                intelmadesimple.com and (b) the standard terms that apply
                alongside every engagement letter we sign with a client.
                Where an engagement letter conflicts with these terms, the
                engagement letter wins.
              </p>
            </Section>

            <Section title="2. Site use">
              <p>
                You are welcome to read, link to, share, and reference any
                public page on this site. You agree not to attempt to break,
                scrape at high volume, probe for vulnerabilities, or
                otherwise misuse the site. Suspicious traffic is rate-limited
                and logged for security purposes.
              </p>
              <p>
                Content on this site is provided in good faith. It is not
                legal, financial, medical, or regulated advice. Read it for
                what it is.
              </p>
            </Section>

            <Section title="3. Intellectual property">
              <p>
                The brand, the writing, the design, and the code that runs
                this site are owned by IMS Consultancy. You may quote short
                passages with attribution. Reproduction at scale, including
                training of third-party models on this content without
                separate permission, is not permitted.
              </p>
              <p>
                Standard AI bot crawl permissions are documented in the
                robots policy. We allow standard discovery so that AI search
                surfaces can answer questions about IMS. We do not consent
                to bulk training use.
              </p>
            </Section>

            <Section title="4. Engagement terms">
              <p>The following apply to every engagement we accept:</p>
              <ul className="space-y-3">
                <Bullet>
                  Fixed scope, fixed price. Quoted in GBP. Half on start,
                  half on hand-over.
                </Bullet>
                <Bullet>
                  The first two weeks of any engagement are funded by IMS.
                  You decide whether to continue with everything you need to
                  decide cleanly. No penalty if you walk away.
                </Bullet>
                <Bullet>
                  Confidentiality is mutual and indefinite. Anything we
                  learn about your business that is not publicly known stays
                  that way.
                </Bullet>
                <Bullet>
                  We retain the right to reference the engagement in
                  anonymised case-study form unless the engagement letter
                  states otherwise.
                </Bullet>
                <Bullet>
                  Code, deliverables, and documentation produced for the
                  engagement transfer to you on final payment. The same
                  applies to source files and recordings.
                </Bullet>
                <Bullet>
                  Where we use open-source or third-party software, the
                  applicable licence applies and is documented in the
                  hand-over.
                </Bullet>
              </ul>
            </Section>

            <Section title="5. Liability">
              <p>
                Liability is capped at the fees paid for the engagement that
                gives rise to the claim. We do not exclude liability for
                fraud, wilful misconduct, death, or personal injury caused
                by our negligence, or for any other liability that cannot be
                limited by law.
              </p>
            </Section>

            <Section title="6. Sub-processors and tooling">
              <p>
                The list of vendors that support the consultancy and the
                tools we use inside engagements is available on request.
                Where AI is used as part of an engagement, the AI policy at
                /ai-policy applies in full.
              </p>
            </Section>

            <Section title="7. Governing law">
              <p>
                These terms and any engagement letter signed with IMS are
                governed by the laws of England and Wales. The courts of
                England and Wales have exclusive jurisdiction.
              </p>
            </Section>

            <Section title="8. Contact">
              <p>
                For any question about these terms email{" "}
                <a
                  href="mailto:info@intelmadesimple.com"
                  className="text-mauve-200 underline-offset-4 hover:underline"
                >
                  info@intelmadesimple.com
                </a>
                . We reply personally to every note we receive.
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
