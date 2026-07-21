import { notFound } from "next/navigation";

import { CTASection } from "@/components/industry/CTASection";
import { DemoArmProvider } from "@/components/industry/demo/DemoContext";
import { DropZone } from "@/components/industry/demo/DropZone";
import { LiveDemoPlayer } from "@/components/industry/demo/LiveDemoPlayer";
import { PipelineRail } from "@/components/industry/demo/PipelineRail";
import { ResultsPanel } from "@/components/industry/demo/ResultsPanel";
import { SampleFileChip } from "@/components/industry/demo/SampleFileChip";
import { DemoMachineProvider } from "@/components/industry/demo/useDemoMachine";
import { FAQAccordion } from "@/components/industry/FAQAccordion";
import { FlowInfographic } from "@/components/industry/FlowInfographic";
import { IndustryHero } from "@/components/industry/IndustryHero";
import { IndustryNav } from "@/components/industry/IndustryNav";
import { PackageBlock } from "@/components/industry/PackageBlock";
import { PainGrid } from "@/components/industry/PainGrid";
import { PrivacyShield } from "@/components/industry/PrivacyShield";
import { ResultsBlock } from "@/components/industry/ResultsBlock";
import { SectionShell } from "@/components/industry/SectionShell";
import { ToolGrid } from "@/components/industry/ToolGrid";
import { DEMO_SECTION_ID, GDPR_COPY } from "@/lib/industries/config";
import { getIndustry, industrySlugs } from "@/lib/industries";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <IndustryHero
        industry={industry.slug}
        h1={industry.hero.h1}
        sub={industry.hero.sub}
        stats={industry.hero.stats}
      />
      <IndustryNav />

      <DemoArmProvider>
        <SectionShell id="pains" eyebrow="The leaks" heading="Where the margin is going">
          <PainGrid pains={industry.pains} accent={industry.accent} />
        </SectionShell>

        <SectionShell id="tools" eyebrow="The tools" heading="Three tools built for this book">
          <ToolGrid industry={industry.slug} tools={industry.tools} />
        </SectionShell>

        <DemoMachineProvider industry={industry.slug} tools={industry.tools}>
          <SectionShell id="live-demo-preview" eyebrow="In motion" heading="Watch it run">
            <LiveDemoPlayer tools={industry.tools} />
          </SectionShell>

          <SectionShell id={DEMO_SECTION_ID} eyebrow="Live demo" heading="Try it on sample data">
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

      <SectionShell id="data-protection" eyebrow={GDPR_COPY.eyebrow} heading={GDPR_COPY.heading}>
        <PrivacyShield industry={industry.slug} regulatorLine={industry.regulatorLine} />
      </SectionShell>

      <SectionShell
        id="how-it-works"
        eyebrow="How it fits together"
        heading="From your book to revenue actions"
      >
        <FlowInfographic />
      </SectionShell>

      <SectionShell id="results" eyebrow="Proof" heading="Results">
        <ResultsBlock results={industry.results} />
      </SectionShell>

      <SectionShell id="package" eyebrow="The offer" heading="Package">
        <PackageBlock industry={industry.slug} package={industry.package} />
      </SectionShell>

      <SectionShell id="faq" eyebrow="Questions" heading="Frequently asked">
        <FAQAccordion faqs={industry.faqs} />
      </SectionShell>

      <SectionShell id="next-step" eyebrow="Next step" heading="See it on your own book">
        <CTASection industry={industry.slug} />
      </SectionShell>
    </>
  );
}
