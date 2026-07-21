import { expect, test } from "@playwright/test";

import { industries } from "../../lib/industries";

// IMS-063 · Cross-device manual pass. Run with:
//   npx playwright test --config=playwright.device-matrix.config.ts
// See docs/qa-device-matrix.md for the recorded results and the honest
// engine-vs-physical-device scope note.

const BREAKPOINTS = [360, 768, 1280, 1536] as const;
const TOUCH_BREAKPOINTS = [360, 768] as const; // realistic phone/small-tablet widths
const DESKTOP_DND_BREAKPOINTS = [1280, 1536] as const; // realistic desktop widths
// Only these projects have hasTouch: true (see playwright.device-matrix.config.ts) —
// .tap() throws on any other project regardless of viewport width.
const TOUCH_PROJECTS = ["android-chrome-proxy", "ios-safari-proxy"] as const;
const DESKTOP_PROJECTS = ["desktop-chrome", "desktop-firefox", "desktop-safari"] as const;

const industry = industries.find((candidate) => candidate.slug === "mortgage-brokers");
if (!industry) throw new Error("device-matrix: mortgage-brokers fixture missing");
const firstTool = industry.tools[0];

function collectConsoleIssues(page: import("@playwright/test").Page): string[] {
  const issues: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      issues.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on("pageerror", (error) => issues.push(`[pageerror] ${error.message}`));
  return issues;
}

for (const width of BREAKPOINTS) {
  test.describe(`viewport ${width}px`, () => {
    test(`hub + ${industry.slug} — loads clean, no horizontal scroll`, async ({ page }) => {
      const issues = collectConsoleIssues(page);
      await page.setViewportSize({ width, height: 900 });

      for (const path of ["/industries", `/industries/${industry.slug}`]) {
        const response = await page.goto(path);
        expect(response?.status(), `${path} at ${width}px`).toBe(200);

        const overflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        expect(
          overflow.scrollWidth,
          `${path} at ${width}px — scrollWidth ${overflow.scrollWidth} vs clientWidth ${overflow.clientWidth}`,
        ).toBeLessThanOrEqual(overflow.clientWidth + 1);
      }

      expect(issues, `console issues at ${width}px`).toEqual([]);
    });

    test(`${industry.slug} — ink section renders (contrast fix from IMS-061 holds)`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/industries/${industry.slug}`);
      const inkSection = page.locator(".bg-ink").first();
      await inkSection.scrollIntoViewIfNeeded();
      await expect(inkSection).toBeVisible();
      await inkSection.screenshot({
        path: `test-results/qa-screenshots/${test.info().project.name}-${width}px-ink-section.png`,
      });
    });

    test(`${industry.slug} — reduced motion shows static tabbed results`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`/industries/${industry.slug}`);
      await expect(page.getByRole("tablist", { name: "Tool results" })).toBeVisible();
    });

    if ((TOUCH_BREAKPOINTS as readonly number[]).includes(width)) {
      test(`${industry.slug} — sample chip tap-to-run (touch)`, async ({ page }, testInfo) => {
        test.skip(
          !(TOUCH_PROJECTS as readonly string[]).includes(testInfo.project.name),
          "tap requires hasTouch: true — only the touch-proxy projects support it",
        );
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(`/industries/${industry.slug}`);

        await page
          .locator(`#${firstTool.id}`)
          .getByRole("button", { name: "See it run" })
          .click();

        const firstChip = page.locator("[data-sample-chip]").first();
        await firstChip.tap();

        await expect(page.locator(".ims-results-panel .font-industry-display")).toHaveText(
          firstTool.demo.result.headline,
        );
      });
    }

    if ((DESKTOP_DND_BREAKPOINTS as readonly number[]).includes(width)) {
      test(`${industry.slug} — drag sample chip onto drop zone (desktop)`, async ({
        page,
      }, testInfo) => {
        test.skip(
          !(DESKTOP_PROJECTS as readonly string[]).includes(testInfo.project.name),
          "drag-and-drop represents the desktop pointer path — restrict to non-touch desktop projects",
        );
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(`/industries/${industry.slug}`);

        await page
          .locator(`#${firstTool.id}`)
          .getByRole("button", { name: "See it run" })
          .click();

        const dropZone = page.locator(".ims-dropzone");
        await dropZone.scrollIntoViewIfNeeded();

        const sampleId = firstTool.demo.sampleFile.id;
        const dataTransfer = await page.evaluateHandle((id: string) => {
          const transfer = new DataTransfer();
          transfer.setData("text/plain", id);
          return transfer;
        }, sampleId);

        await dropZone.dispatchEvent("dragover", { dataTransfer });
        await dropZone.dispatchEvent("drop", { dataTransfer });

        await expect(page.locator(".ims-results-panel .font-industry-display")).toHaveText(
          firstTool.demo.result.headline,
        );
      });
    }
  });
}
