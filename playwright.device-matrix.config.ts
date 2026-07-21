import { defineConfig, devices } from "@playwright/test";

// IMS-063 one-off QA tooling — NOT part of the `test:e2e` gate (playwright.config.ts
// is untouched). This environment has no physical iOS Safari / Android Chrome / macOS
// Safari devices, so the 5-target matrix in Doc 1 is approximated with Playwright's own
// engines: chromium/webkit/firefox for the 3 desktop browsers, and chromium+isMobile /
// webkit+isMobile (Pixel 7 / iPhone 14 UA + touch) as engine-based proxies for Android
// Chrome / iOS Safari. Flagged explicitly in docs/qa-device-matrix.md — this is real
// rendering-engine coverage, not a claim of physical-device verification.
export default defineConfig({
  testDir: "./tests/qa",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "desktop-chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "desktop-firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "desktop-safari",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "android-chrome-proxy",
      use: {
        userAgent: devices["Pixel 7"].userAgent,
        isMobile: true,
        hasTouch: true,
        defaultBrowserType: "chromium",
      },
    },
    {
      name: "ios-safari-proxy",
      use: {
        userAgent: devices["iPhone 14"].userAgent,
        isMobile: true,
        hasTouch: true,
        defaultBrowserType: "webkit",
      },
    },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
