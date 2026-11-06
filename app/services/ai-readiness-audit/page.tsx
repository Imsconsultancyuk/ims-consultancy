import type { Metadata } from "next";
import { ServiceDetail } from "../../_components/ServiceDetail";
import { requireServicePage } from "@/lib/services/catalog";
import { OG_IMAGES } from "@/lib/og";

const SITE = "https://intelmadesimple.com";
const service = requireServicePage("ai-readiness-audit");

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: `${SITE}/services/ai-readiness-audit`, languages: { "en-GB": `${SITE}/services/ai-readiness-audit` } },
  openGraph: {
    title: `${service.metaTitle} | Intel Made Simple`,
    description: service.metaDescription,
    url: `${SITE}/services/ai-readiness-audit`,
    type: "website",
    images: OG_IMAGES,
  },
};

export default function Page(): React.JSX.Element {
  return <ServiceDetail service={service} />;
}
