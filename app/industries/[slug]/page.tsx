import type { CSSProperties } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { TrophyFooter } from "@/app/_components/TrophyFooter";
import { TrophyHeader } from "@/app/_components/TrophyHeader";
import { CTASection } from "@/components/industry/CTASection";
import { DemoArmProvider } from "@/components/industry/demo/DemoContext";
import { PipelineRail } from "@/components/industry/demo/PipelineRail";
import { ResultsPanel } from "@/components/industry/demo/ResultsPanel";
import { SampleFileChip } from "@/components/industry/demo/SampleFileChip";
import { DemoMachineProvider } from "@/components/industry/demo/useDemoMachine";
import { FAQAccordion } from "@/components/industry/FAQAccordion";
import { IndustryHero } from "@/components/industry/IndustryHero";
import { IndustryJsonLd } from "@/components/industry/JsonLd";
import { IndustryNav } from "@/components/industry/IndustryNav";
import { PackageBlock } from "@/components/industry/PackageBlock";
import { PainGrid } from "@/components/industry/PainGrid";
import { ResultsBlock } from "@/components/industry/ResultsBlock";
import { SectionShell } from "@/components/industry/SectionShell";
import { ToolSection } from "@/components/industry/ToolSection";
import { DEMO_SECTION_ID, GDPR_COPY, SITE_URL } from "@/lib/industries/config";
import { getIndustry, industrySlugs } from "@/lib/industries";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

// IMS-056: below-fold, dynamically imported with a sized skeleton so the
// initial JS payload for the route stays under budget without shifting
// layout once each chunk hydrates.
function SectionSkeleton({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg border border-line bg-paper-soft ${className}`}
    />
  );
}

const LiveDemoPlayer = dynamic(
  () => import("@/components/industry/demo/LiveDemoPlayer").then((m) => m.LiveDemoPlayer),
  { loading: () => <SectionSkeleton className="min-h-[220px]" /> },
);

const DropZone = dynamic(
  () => import("@/components/industry/demo/DropZone").then((m) => m.DropZone),
  { loading: () => <SectionSkeleton className="min-h-[160px]" /> },
);

const PrivacyShield = dynamic(
  () => import("@/components/industry/PrivacyShield").then((m) => m.PrivacyShield),
  { loading: () => <SectionSkeleton className="min-h-[420px]" /> },
);

const FlowInfographic = dynamic(
  () => import("@/components/industry/FlowInfographic").then((m) => m.FlowInfographic),
  { loading: () => <SectionSkeleton className="min-h-[220px] sm:min-h-[64px]" /> },
);

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  const url = `${SITE_URL}/industries/${industry.slug}`;

  return {
    title: industry.meta.title,
    description: industry.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: industry.meta.title,
      description: industry.meta.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: industry.meta.title,
      description: industry.meta.description,
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  // Clears the fixed header pill (~76px) plus the sticky industry nav (64px)
  // so every anchor jump on this page lands below both, not underneath them.
  const pageStyle = { "--industry-nav-offset": "9rem" } as CSSProperties;

  return (
    <>
      <IndustryJsonLd industry={industry} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col" style={pageStyle}>
        <IndustryHero
          industry={industry.slug}
          name={industry.name}
          h1={industry.hero.h1}
          sub={industry.hero.sub}
          stats={industry.hero.stats}
          tools={industry.tools}
          accent={industry.accent}
        />
        <IndustryNav />

        <DemoArmProvider>
          <SectionShell
            id="pains"
            tone="paper-soft"
            eyebrow="The leaks"
            heading="Where the margin is going"
          >
            <PainGrid pains={industry.pains} accent={industry.accent} />
          </SectionShell>

          {/* One full band per tool. `id="tools"` stays on the wrapper so the
              sticky nav's scroll-spy still resolves a single "Tools" target. */}
          <div id="tools">
            {industry.tools.map((tool, index) => (
              <ToolSection
                key={tool.id}
                industry={industry.slug}
                tool={tool}
                index={index}
                accent={industry.accent}
                tone={index === 1 ? "dark" : "light"}
              />
            ))}
          </div>

          <DemoMachineProvider industry={industry.slug} tools={industry.tools}>
            <SectionShell
              id="live-demo-preview"
              tone="paper-soft"
              eyebrow="In motion"
              heading="Watch it run"
            >
              <LiveDemoPlayer tools={industry.tools} />
            </SectionShell>

            <SectionShell
              id={DEMO_SECTION_ID}
              eyebrow="Live demo"
              heading="Try it on sample data"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-3">
                  {industry.tools.map((tool) => (
                    <SampleFileChip key={tool.id} tool={tool} accent={industry.accent} />
                  ))}
                </div>
                <DropZone tools={industry.tools} accent={industry.accent} />
                <PipelineRail tools={industry.tools} />
                <ResultsPanel tools={industry.tools} industry={industry.slug} />
              </div>
            </SectionShell>
          </DemoMachineProvider>
        </DemoArmProvider>

        <SectionShell
          id="data-protection"
          tone="paper-soft"
          eyebrow={GDPR_COPY.eyebrow}
          heading={GDPR_COPY.heading}
        >
          <PrivacyShield industry={industry.slug} regulatorLine={industry.regulatorLine} />
        </SectionShell>

        <SectionShell
          id="how-it-works"
          eyebrow="How it fits together"
          heading="From your book to revenue actions"
        >
          <FlowInfographic />
        </SectionShell>

        <SectionShell id="results" tone="paper-soft" eyebrow="Proof" heading="Results">
          <ResultsBlock results={industry.results} />
        </SectionShell>

        <SectionShell id="package" eyebrow="The offer" heading="Package">
          <PackageBlock industry={industry.slug} package={industry.package} />
        </SectionShell>

        <SectionShell id="faq" tone="paper-soft" eyebrow="Questions" heading="Frequently asked">
          <FAQAccordion faqs={industry.faqs} />
        </SectionShell>

        <SectionShell
          id="next-step"
          tone="ink"
          eyebrow="Next step"
          heading="See it on your own book"
        >
          <CTASection industry={industry.slug} related={industry.related} />
        </SectionShell>
      </main>

      <TrophyFooter />
    </>
  );
}
