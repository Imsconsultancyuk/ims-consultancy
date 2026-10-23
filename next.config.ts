import type { NextConfig } from "next";

// The flagship pages are static HTML synced into public/flagship (see
// homepage-redesign/flagship-preview/build/sync-to-live.mjs). netlify.toml
// rewrites / , /tools, /faq and /contact to them: Next rewrites to public files
// 404 under the Netlify runtime. Every other route is still the Next app.
// No noindex header on /flagship/*: a rewrite can inherit it onto /. Each flagship page carries its own canonical.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/tools.html", destination: "/tools", permanent: true },
      { source: "/faq.html", destination: "/faq", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
