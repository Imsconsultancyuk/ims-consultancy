import type { Metadata } from "next";
import Link from "next/link";

import { IndustriesHubJsonLd } from "@/components/industry/JsonLd";
import { industries } from "@/lib/industries";
import { HUB_COPY, SITE_URL } from "@/lib/industries/config";

export const metadata: Metadata = {
  title: HUB_COPY.meta.title,
  description: HUB_COPY.meta.description,
  alternates: { canonical: `${SITE_URL}/industries` },
  openGraph: {
    title: HUB_COPY.meta.title,
    description: HUB_COPY.meta.description,
    url: `${SITE_URL}/industries`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HUB_COPY.meta.title,
    description: HUB_COPY.meta.description,
  },
};

export default function IndustriesHubPage() {
  return (
    <main>
      <IndustriesHubJsonLd industries={industries} />

      <section className="bg-paper pb-16 pt-24 text-ink md:pb-24 md:pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-ink-soft">
            {HUB_COPY.eyebrow}
          </p>
          <h1 className="font-industry-display max-w-3xl text-4xl font-semibold leading-[1.1] md:text-6xl">
            {HUB_COPY.h1}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">{HUB_COPY.sub}</p>
          <p className="mt-4 max-w-xl text-sm text-ink-soft">{HUB_COPY.reassurance}</p>
        </div>
      </section>

      <section className="bg-paper pb-24 text-ink">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="flex flex-col gap-3 border-l-4 bg-paper p-6 transition-colors hover:bg-paper-soft"
                style={{ borderLeftColor: `var(--color-signal-${industry.accent})` }}
              >
                <h2 className="font-industry-display text-lg font-medium text-ink">
                  {industry.name}
                </h2>
                <p className="text-sm text-ink-soft">{industry.leakLine}</p>
                <p className="mt-auto text-sm font-medium text-ink-soft">
                  {industry.tools[0].name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
