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
  title: "AI Policy",
  description:
    "How IMS Consultancy uses and governs AI inside its own consultancy and inside the systems it ships. Aligned with ISO/IEC 42001, NIST AI RMF, the EU AI Act, the UK AI Safety Institute, and OWASP LLM Top 10.",
  alternates: { canonical: `${SITE}/ai-policy` },
  openGraph: {
    title: "AI Policy · IMS Consultancy",
    description:
      "Our governance for AI used inside the consultancy and shipped to clients.",
    url: `${SITE}/ai-policy`,
    type: "website",
  },
};

const STANDARDS = [
  {
    name: "ISO/IEC 42001:2023",
    body: "Management-system standard for the responsible development and use of AI. We align our internal AI governance with its lifecycle, risk, and continual-improvement requirements.",
  },
  {
    name: "ISO/IEC 27001",
    body: "Information security management. The control baseline for how we hold client data, including data that flows through AI workflows.",
  },
  {
    name: "NIST AI Risk Management Framework (AI RMF 1.0)",
    body: "Govern, Map, Measure, Manage. We use the framework as the structure for risk assessment on every AI workflow we ship.",
  },
  {
    name: "EU AI Act",
    body: "We treat the EU AI Act's risk-tiering as a baseline for any client deployment that touches EU users or operators, regardless of where the client is headquartered.",
  },
  {
    name: "UK AI Safety Institute and DSIT guidance",
    body: "We track UK government guidance on AI safety, evaluation, and deployment and apply the relevant guidance to high-stakes workflows.",
  },
  {
    name: "OWASP Top 10 for Large Language Model Applications",
    body: "Prompt injection, sensitive information disclosure, supply chain, model denial of service, and the rest. Every LLM workflow we ship is reviewed against the current list.",
  },
  {
    name: "UK GDPR and Data Protection Act 2018",
    body: "Personal data inside AI pipelines is governed by the same lawful-basis, minimisation, and rights regime as any other personal data we process.",
  },
];

const PRINCIPLES = [
  {
    title: "Human review on decisions that matter",
    body: "Any decision that touches money, people, regulatory compliance, or clinical context requires human review before action. No exceptions. The human review step is built into the workflow, not bolted on afterwards.",
  },
  {
    title: "Data minimisation and consent",
    body: "Client data is sent to third-party models only when necessary, only with written consent, and only with the smallest scope that delivers the outcome. Where a self-hosted or smaller model can do the work, we use it.",
  },
  {
    title: "Grounded over generative",
    body: "Where facts matter, we prefer retrieval over open generation. Sources are cited so the user can verify in one click.",
  },
  {
    title: "Observability and audit trail",
    body: "Every AI workflow logs inputs, outputs, model versions, costs, and human review decisions. Audit-grade retention configurable per engagement.",
  },
  {
    title: "Bias and harm review",
    body: "Workflows that produce decisions affecting people receive a documented bias and harm review before launch and on every material change.",
  },
  {
    title: "Reversibility",
    body: "Every workflow has a documented kill-switch and a rollback path. No AI system we ship is load-bearing in a way that cannot be undone.",
  },
  {
    title: "Cost transparency",
    body: "Token, inference, and orchestration costs are tracked per workflow and reported back. Clients always know what each workflow costs to run.",
  },
  {
    title: "Vendor diligence",
    body: "Model providers and third-party AI vendors are reviewed for data-handling practices, training-data position, security posture, and incident history before we route any client data to them.",
  },
];

const INSIDE_THE_CONSULTANCY = [
  "We use AI assistants in our own work. Any output that leaves IMS is reviewed by a human.",
  "We do not paste client confidential data into consumer-grade AI tools.",
  "We use enterprise or self-hosted endpoints for any work involving client data.",
  "We document, on request, which AI tools we used in producing a deliverable.",
];

const CLIENT_RIGHTS = [
  "You can request the list of AI tools and models used in delivering your engagement at any time.",
  "You can require human-only delivery for specific deliverables. We will tell you the cost difference plainly.",
  "You can require self-hosted models for any AI workflow we ship for you, where the work allows it.",
  "You can require data residency in a specific jurisdiction for the AI workflows in your engagement.",
];

export default function AiPolicyPage() {
  const page = webPageJsonLd({
    path: "/ai-policy",
    name: "AI Policy · IMS Consultancy",
    description:
      "How IMS Consultancy governs AI used inside the consultancy and inside the systems it ships.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "AI Policy", path: "/ai-policy" },
    ],
  });

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden bg-deep px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="ai-policy-heading"
        >
          <div className="relative mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                AI policy · Governance and standards
              </p>
              <CharSplit
                text={"AI we ship,\nclearly governed."}
                className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
                stagger={0.018}
              />
              <p className="mt-7 text-[1.0625rem] leading-[1.7] text-mauve-300">
                How we use, build, and govern AI both inside the consultancy
                and inside the systems we ship for clients. Effective{" "}
                {EFFECTIVE_DATE}.
              </p>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="ai-standards-heading"
          className="relative bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-4xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Standards we align with
              </p>
              <h2
                id="ai-standards-heading"
                className="mt-5 font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em]"
              >
                The frameworks that shape our practice.
              </h2>
              <p className="mt-5 max-w-2xl text-[1rem] leading-[1.7] text-mauve-300">
                Alignment means our practice is built to satisfy these
                standards. Certification, where stated, means an external
                body has audited us against them. We are explicit about which
                is which.
              </p>
            </Reveal>
            <ul className="mt-12 space-y-8" role="list">
              {STANDARDS.map((s, i) => (
                <Reveal key={s.name} delay={i * 60}>
                  <li className="relative grid gap-3 border-l border-mauve-300/15 pl-6 sm:grid-cols-[14rem_1fr] sm:gap-8 sm:border-l-0 sm:pl-0">
                    <h3 className="font-serif text-[1.125rem] font-medium leading-tight text-paper-ink">
                      {s.name}
                    </h3>
                    <p className="text-[0.9375rem] leading-[1.7] text-mauve-300">
                      {s.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="ai-principles-heading"
          className="relative bg-deep-soft px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-4xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Eight principles inside every AI workflow we ship
              </p>
              <h2
                id="ai-principles-heading"
                className="mt-5 font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em]"
              >
                What you can hold us to.
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2" role="list">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <article className="relative h-full rounded-2xl border border-mauve-300/12 bg-deep/40 p-7 backdrop-blur sm:p-8">
                    <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                      Principle {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-serif text-[1.25rem] font-medium leading-snug text-paper-ink">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-[1.7] text-mauve-300">
                      {p.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="ai-inside-heading"
          className="relative bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                  Inside the consultancy
                </p>
                <h2
                  id="ai-inside-heading"
                  className="mt-5 font-serif text-[clamp(1.625rem,3vw,2.125rem)] font-medium leading-[1.15] tracking-[-0.012em]"
                >
                  How we use AI in our own work.
                </h2>
                <ul className="mt-8 space-y-4" role="list">
                  {INSIDE_THE_CONSULTANCY.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-[0.9375rem] leading-[1.7] text-mauve-300"
                    >
                      <span
                        aria-hidden
                        className="mt-3 inline-block h-[3px] w-3 shrink-0 bg-mauve-200"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                  Your rights as a client
                </p>
                <h2 className="mt-5 font-serif text-[clamp(1.625rem,3vw,2.125rem)] font-medium leading-[1.15] tracking-[-0.012em]">
                  Levers you can pull at any time.
                </h2>
                <ul className="mt-8 space-y-4" role="list">
                  {CLIENT_RIGHTS.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-[0.9375rem] leading-[1.7] text-mauve-300"
                    >
                      <span
                        aria-hidden
                        className="mt-3 inline-block h-[3px] w-3 shrink-0 bg-mauve-200"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          aria-labelledby="ai-questions-heading"
          className="relative bg-deep-soft px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="ai-questions-heading"
                className="font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.012em]"
              >
                A specific question on AI governance?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                We have answered most variants of it before. Send the
                question and you will have a plain-English answer in
                writing.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 inline-block">
                <Link
                  href="/contact"
                  data-cursor="cta"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-8 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.55)]"
                >
                  Ask the question
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
