import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { getIndustry, industrySlugs } from "@/lib/industries";
import type { Accent } from "@/lib/industries/types";

// Config exports per the opengraph-image file convention — Next.js
// auto-injects the og:image / twitter:image meta tags from these.
export const alt = "IMS Consultancy — AI Revenue Recovery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Metadata route handlers don't inherit generateStaticParams from a
// sibling page.tsx — without this, the route renders dynamically at
// request time instead of being prebuilt per slug (IMS-053 AC: renders
// <1s at build).
export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

// Matches app/globals.css --color-signal-* (Satori renders outside the CSS
// cascade, so the custom properties can't be read here — hardcoded 1:1).
const ACCENT_HEX: Record<Accent, string> = {
  amber: "#d97706",
  emerald: "#059669",
  indigo: "#4f46e5",
  violet: "#7c3aed",
  sky: "#0284c7",
  rose: "#e11d48",
  teal: "#0d9488",
  orange: "#ea580c",
  cyan: "#0891b2",
  fuchsia: "#c026d3",
};

const INK = "#1a1620";
const PAPER = "#f5eff3";

interface OgImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: OgImageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  // Space Grotesk SemiBold, vendored as a static .woff for readFile — the
  // sitewide next/font/google instance in app/layout.tsx has no stable
  // on-disk path this route handler can read (IMS-053 deviation, flagged
  // in the commit: assets/fonts/SpaceGrotesk-SemiBold.woff added outside
  // Doc 1's file map).
  const spaceGrotesk = await readFile(
    join(process.cwd(), "assets/fonts/SpaceGrotesk-SemiBold.woff"),
  );

  const name = industry?.name ?? "IMS Consultancy";
  const headline = industry?.tools[0]?.demo.result.headline ?? "AI revenue recovery";
  const accentHex = industry ? ACCENT_HEX[industry.accent] : ACCENT_HEX.indigo;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: INK,
          padding: "72px",
          fontFamily: "Space Grotesk",
        }}
      >
        <div style={{ width: "96px", height: "10px", background: accentHex, display: "flex" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            gap: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              color: PAPER,
              fontSize: name.length > 24 ? 60 : 76,
              lineHeight: 1.08,
              maxWidth: "980px",
            }}
          >
            {name}
          </div>
          <div style={{ display: "flex", color: accentHex, fontSize: 40 }}>{headline}</div>
        </div>

        <div style={{ display: "flex", color: PAPER, fontSize: 28, opacity: 0.72 }}>
          IMS Consultancy
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: spaceGrotesk,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
