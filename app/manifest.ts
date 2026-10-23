import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IntelMadeSimple",
    short_name: "IMS",
    description:
      "IMS Consultancy, a UK strategic consultancy for business decisions, development and AI workflows.",
    start_url: "/",
    display: "browser",
    background_color: "#19141a",
    theme_color: "#19141a",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/logo-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
