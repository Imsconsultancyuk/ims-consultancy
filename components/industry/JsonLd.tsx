import type { BreadcrumbList, CollectionPage, FAQPage, Service, WithContext } from "schema-dts";

import { JsonLd, orgJsonLd, websiteJsonLd } from "@/app/_components/JsonLd";
import { SITE_URL } from "@/lib/industries/config";
import type { Industry } from "@/lib/industries/types";

interface IndustryJsonLdProps {
  industry: Industry;
}

/**
 * Structured data for a single industry page (IMS-052). Reuses the sitewide
 * Organization/WebSite nodes (app/_components/JsonLd.tsx) so `Service.provider`
 * resolves by @id reference rather than duplicating the org entity, then adds
 * the three schemas this ticket requires: Service, FAQPage, BreadcrumbList.
 */
export function IndustryJsonLd({ industry }: IndustryJsonLdProps) {
  const pageUrl = `${SITE_URL}/industries/${industry.slug}`;

  const service: WithContext<Service> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `AI Revenue Recovery for ${industry.name}`,
    description: industry.meta.description,
    provider: { "@id": `${SITE_URL}#organization` },
    areaServed: "GB",
    url: pageUrl,
  };

  const faqPage: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industry.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbList: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
      { "@type": "ListItem", position: 3, name: industry.name, item: pageUrl },
    ],
  };

  return <JsonLd data={[orgJsonLd, websiteJsonLd, service, faqPage, breadcrumbList]} />;
}

interface IndustriesHubJsonLdProps {
  industries: Industry[];
}

/** Structured data for the /industries hub (IMS-054): a CollectionPage listing all registered industries in registry order. */
export function IndustriesHubJsonLd({ industries }: IndustriesHubJsonLdProps) {
  const pageUrl = `${SITE_URL}/industries`;

  const collectionPage: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: industries.map((industry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: industry.name,
        url: `${SITE_URL}/industries/${industry.slug}`,
      })),
    },
  };

  return <JsonLd data={[orgJsonLd, websiteJsonLd, collectionPage]} />;
}
