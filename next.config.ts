import type { NextConfig } from "next";

// The flagship pages are static HTML synced into public/flagship (see
// homepage-redesign/flagship-preview/build/sync-to-live.mjs). netlify.toml
// rewrites / , /tools, /faq and /contact to them: Next rewrites to public files
// 404 under the Netlify runtime. Every other route is still the Next app.
// No noindex header on /flagship/*: a rewrite can inherit it onto /. Each flagship page carries its own canonical.
// Netlify [[headers]] in netlify.toml reach static files only, not responses from the Next
// function or ISR, so the same baseline is set here for every Next route.
const SECURITY_HEADERS = [
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      { source: "/tools.html", destination: "/tools", permanent: true },
      { source: "/faq.html", destination: "/faq", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
