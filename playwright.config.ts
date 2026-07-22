import { defineConfig, devices } from "@playwright/test";

// IMS-060: smoke suite runs against a production build (`next start`), not
// `next dev`, so it exercises the same static output the deploy gate ships —
// build already runs `validate:content` (package.json "build" script).
//
// PLAYWRIGHT_BASE_URL lets IMS-064 run this same suite against a live
// preview deploy (e.g. Cloudflare) instead of localhost; webServer is
// skipped in that case since there's nothing local to boot.
const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "npm run build && npm run start",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
