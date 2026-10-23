import type { NextConfig } from "next";

// The flagship pages are static HTML synced into public/flagship (see
// homepage-redesign/flagship-preview/build/sync-to-live.mjs). They take over
// /, /tools, /faq and /contact; every other route is still the Next app.
const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/flagship/index.html" },
        { source: "/tools", destination: "/flagship/tools.html" },
        { source: "/faq", destination: "/flagship/faq.html" },
        { source: "/contact", destination: "/flagship/contact.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      { source: "/tools.html", destination: "/tools", permanent: true },
      { source: "/faq.html", destination: "/faq", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/flagship/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
    ];
  },
};

export default nextConfig;
