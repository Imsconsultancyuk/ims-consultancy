import type { Metadata } from "next";
import Image from "next/image";

import { HeroCue } from "@/components/solutions/HeroCue";
import { SolutionsFunnel } from "@/components/solutions/SolutionsFunnel";
import { SolutionsMore } from "@/components/solutions/SolutionsMore";
import { solutionSectors } from "@/lib/industries/solutions";
import { OG_IMAGES } from "@/lib/og";

import { CharSplit } from "../_components/CharSplit";
import { JsonLd, orgJsonLd, webPageJsonLd, websiteJsonLd } from "../_components/JsonLd";
import { LeakLine } from "../_components/LeakLine";
import { Reveal } from "../_components/Reveal";
import { TrophyFooter } from "../_components/TrophyFooter";
import { TrophyHeader } from "../_components/TrophyHeader";

const SITE = "https://intelmadesimple.com";

export const metadata: Metadata = {
  title: "Business Solutions by Industry",
  description:
    "Pick your industry to see the money that goes missing, the three AI tools that recover it, and a live run of each on sample data. White-label available.",
  alternates: { canonical: `${SITE}/solutions`, languages: { "en-GB": `${SITE}/solutions` } },
  openGraph: {
    title: "Business Solutions by Industry | Intel Made Simple",
    description:
      "Ten professional industries and sole traders. Three tools each, a live example of every one, and tokenised client data.",
    url: `${SITE}/solutions`,
    type: "website",
    images: OG_IMAGES,
  },
};

const FAQ = [
  {
    q: "Which industries do the business solutions cover?",
    a: "Law firms, accountancy firms, wealth managers and IFAs, mortgage and finance brokers, commercial insurance brokers, commercial property firms, executive search and recruitment firms, M&A advisory and business brokers, private healthcare groups, B2B SaaS companies, and sole traders and small businesses. Each has three tools built around the records that industry already keeps.",
  },
  {
    q: "What does the live example on each tool show?",
    a: "A scripted run of the tool on a made-up file. You see the file go in, four stages of work, and the result it produces, with the same layout you would get on your own records. The names, figures and files are synthetic. None of it is a client result.",
  },
  {
    q: "How is client personal data protected?",
    a: "Names, emails, phone numbers and reference numbers are replaced with tokens before any AI model sees them. The real values stay in an encrypted vault and are put back only inside your own environment. Our setup is aligned with UK GDPR, with a data processing agreement and no use of your data for model training.",
  },
  {
    q: "What does white label mean here?",
    a: "The tools run under your business name, so your clients see your brand on the follow-ups and reports. Sole traders can run them as their own service. Other firms can offer them to their own clients. White-label pricing is agreed per project after a call.",
  },
  {
    q: "What does it cost to start?",
    a: "The Leak Scan is free. After that a stage build is £1,500, or £699 on your first project with code NEWPARTNER26, and the full system is £6,000. Success fees on recovered money are 25% up to £5,000 a month, 20% from £5,000 to £20,000 and 15% above that, for 12 months. If nothing is recovered, the fee is nothing.",
  },
] as const;

export default function SolutionsPage() {
  const page = webPageJsonLd({
    path: "/solutions",
    name: "Business Solutions by Industry | Intel Made Simple",
    description:
      "Industry-by-industry AI tools that find recoverable revenue in the records a firm already keeps, with a live example of each and tokenised client data.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Business solutions", path: "/solutions" },
    ],
  });

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE}/solutions#collection`,
    url: `${SITE}/solutions`,
    name: "Business solutions by industry",
    isPartOf: { "@id": `${SITE}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: solutionSectors.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${s.name}: ${s.tools.map((t) => t.name).join(", ")}`,
        url: `${SITE}/solutions#${s.slug}`,
      })),
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE}/solutions#faq`,
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, collection, faq]} />
      <TrophyHeader />

      <main id="main" className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pb-14 pt-32 text-paper-ink sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44"
          aria-label="Business solutions by industry"
        >
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <LeakLine />
            <Reveal className="max-w-3xl">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                Business solutions
              </p>
              <CharSplit
                as="h1"
                text="Find the money your records are hiding."
                className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.022em]"
                stagger={0.02}
              />
              <p className="mt-6 max-w-lg text-[1.0625rem] leading-[1.65] text-mauve-300">
                Pick your industry. See the three tools built for it.
              </p>
              <div className="mt-9">
                <HeroCue />
              </div>
            </Reveal>
            <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[14px] border border-paper-ink/10 lg:block">
              <Image
                src="/img/hero-vault-1000.webp"
                alt=""
                fill
                priority
                aria-hidden
                sizes="(min-width: 1024px) 34vw, 0px"
                className="object-cover"
              />
            </div>
          </div>
        </header>

        <SolutionsFunnel sectors={solutionSectors} />

        <SolutionsMore faq={FAQ} sectors={solutionSectors} />
      </main>

      <TrophyFooter />
    </>
  );
}
