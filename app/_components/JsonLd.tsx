interface JsonLdProps {
  data: object | object[];
}

/**
 * Renders structured data as one <script type="application/ld+json"> holding a
 * single @graph, so every node on the page sits in one document and @id
 * references resolve locally. Server component, safe in layout.tsx or any page.tsx.
 *
 * Pass a single object or an array. Where the shared Organization node is
 * present, the founder Person node it references is added automatically, so no
 * page can ship an org that points at an undefined @id.
 */
export function JsonLd({ data }: JsonLdProps) {
  const blocks = Array.isArray(data) ? data : [data];
  const nodes = blocks.map((block) => {
    const { "@context": _context, ...node } = block as Record<string, unknown>;
    return node;
  });
  const hasOrg = nodes.some((n) => n["@id"] === ORG_ID);
  const hasFounder = nodes.some((n) => n["@id"] === FOUNDER_ID);
  if (hasOrg && !hasFounder) {
    const { "@context": _c, ...founder } = founderJsonLd;
    nodes.push(founder);
  }
  const graph = { "@context": "https://schema.org", "@graph": nodes };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

/* ---------- Shared entity factories ---------- */

const SITE = "https://intelmadesimple.com";

const ORG_ID = `${SITE}/#organization`;
const FOUNDER_ID = `${SITE}/#founder`;

/**
 * The one Organization node for the whole site. The four static flagship pages
 * (public/flagship/*.html) carry the same node, field for field, so a crawler
 * merging the graphs by @id sees one entity. ProfessionalService is an extra
 * @type on this node, not a second entity.
 */
export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: "Intel Made Simple",
  url: `${SITE}/`,
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/logo-512.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE}/img/og-1200.jpg`,
  description:
    "Revenue recovery for UK professional firms. We find the fees and renewals a firm already earned, recover them, and hand over the tools that keep them from leaking again.",
  email: "info@intelmadesimple.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  knowsAbout: [
    "Revenue leakage",
    "Work in progress recovery",
    "Lock-up days",
    "Billing recovery",
    "UK GDPR for AI processing",
  ],
  founder: { "@id": FOUNDER_ID },
};

export const founderJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: "Adam Khalid",
  jobTitle: "Founder and CEO",
  worksFor: { "@id": ORG_ID },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: `${SITE}/`,
  name: "Intel Made Simple",
  publisher: { "@id": ORG_ID },
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
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": ORG_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE}/img/og-1200.jpg`,
      width: 1200,
      height: 630,
    },
    inLanguage: "en-GB",
  };
  if (args.breadcrumbs && args.breadcrumbs.length > 0) {
    block.breadcrumb = {
      "@type": "BreadcrumbList",
      "@id": `${SITE}${args.path}#breadcrumb`,
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
