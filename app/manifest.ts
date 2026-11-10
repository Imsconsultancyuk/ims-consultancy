import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Intel Made Simple",
    short_name: "Intel Made Simple",
    description:
      "Revenue recovery for UK professional firms. A free Leak Scan finds unbilled and unchased money; a published-price build recovers it, with a success fee only on what comes back.",
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
