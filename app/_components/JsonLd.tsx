interface JsonLdProps {
  data: object | object[];
}

/**
 * Renders one or more JSON-LD structured-data scripts. Server component,
 * safe to use inside layout.tsx or any page.tsx.
 *
 * Pass a single object or an array of objects; each becomes its own
 * <script type="application/ld+json"> for clean parsing.
 */
export function JsonLd({ data }: JsonLdProps) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}

/* ---------- Shared entity factories ---------- */

const SITE = "https://intelmadesimple.com";

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE}#organization`,
  name: "IMS Consultancy",
  alternateName: "Intelligence Made Simple",
  url: SITE,
  logo: `${SITE}/logos/ims-vertical-dark.png`,
  image: `${SITE}/opengraph-image.png`,
  description:
    "A strategic consultancy for business decisions, development, and AI workflows. Honest answers and results that hold up over time.",
  email: "hello@intelmadesimple.com",
  areaServed: "Worldwide",
  serviceType: [
    "Business strategy consulting",
    "Software development",
    "AI workflow integration",
    "Operations automation",
  ],
  knowsAbout: [
    "business strategy",
    "AI workflows",
    "software architecture",
    "operations automation",
    "Next.js",
    "consulting methodology",
  ],
  sameAs: [
    "https://github.com/Imsconsultancyuk",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}#website`,
  url: SITE,
  name: "IMS Consultancy",
  description:
    "Strategic consultancy for business decisions, development, and AI workflows.",
  publisher: { "@id": `${SITE}#organization` },
  inLanguage: "en-GB",
};

export function webPageJsonLd(args: {
  path: string;
  name: string;
  description: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
}) {
  const pageId = `${SITE}${args.path}#webpage`;
  const block: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageId,
    url: `${SITE}${args.path}`,
    name: args.name,
    description: args.description,
    isPartOf: { "@id": `${SITE}#website` },
    about: { "@id": `${SITE}#organization` },
    primaryImageOfPage: `${SITE}/opengraph-image.png`,
    inLanguage: "en-GB",
  };
  if (args.breadcrumbs && args.breadcrumbs.length > 0) {
    block.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: args.breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: `${SITE}${b.path}`,
      })),
    };
  }
  return block;
}
