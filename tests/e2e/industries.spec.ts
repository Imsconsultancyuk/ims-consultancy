import { expect, test } from "@playwright/test";

import { industries } from "../../lib/industries";
import { HUB_COPY } from "../../lib/industries/config";

// IMS-060 AC: "For every slug: page 200s; H1 matches config; console has zero
// errors/warnings; click first tool's 'See it run' -> demo zone armed;
// trigger RUN -> results headline appears with the config's exact text; FAQ
// toggles; all anchor links resolve. One extra spec: dropping a fake OS file
// shows the rejection message."

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

for (const industry of industries) {
  test.describe(`/industries/${industry.slug}`, () => {
    test("loads, H1 matches config, zero console errors/warnings", async ({ page }) => {
      const issues = collectConsoleIssues(page);

      const response = await page.goto(`/industries/${industry.slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(industry.hero.h1);

      expect(issues).toEqual([]);
    });

    test("all in-page anchor links resolve", async ({ page }) => {
      await page.goto(`/industries/${industry.slug}`);

      const hrefs = await page
        .locator('a[href^="#"]')
        .evaluateAll((anchors) => anchors.map((a) => a.getAttribute("href")));

      expect(hrefs.length).toBeGreaterThan(0);
      for (const href of hrefs) {
        const id = (href ?? "").slice(1);
        await expect(page.locator(`#${id}`)).toHaveCount(1);
      }
    });

    test("FAQ accordion toggles open and closed", async ({ page }) => {
      await page.goto(`/industries/${industry.slug}`);

      // Item 0 starts open (static prop); use item 1 to test toggling.
      const secondFaq = page.locator("#faq details").nth(1);
      await expect(secondFaq).not.toHaveAttribute("open", "");

      await secondFaq.locator("summary").click();
      await expect(secondFaq).toHaveAttribute("open", "");

      await secondFaq.locator("summary").click();
      await expect(secondFaq).not.toHaveAttribute("open", "");
    });

    test("first tool arms the demo zone and RUN reveals the exact results headline", async ({
      page,
    }) => {
      // Deterministic timing: reduced motion collapses the processing stages
      // to zero, so RUN completes synchronously (demoReducer RUN action).
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`/industries/${industry.slug}`);

      const firstTool = industry.tools[0];

      await page
        .locator(`#${firstTool.id}`)
        .getByRole("button", { name: "See it run" })
        .click();

      const firstChip = page.locator("[data-sample-chip]").first();
      await expect(firstChip).toHaveAttribute("aria-pressed", "true");

      await firstChip.click();

      await expect(page.locator(".ims-results-panel .font-industry-display")).toHaveText(
        firstTool.demo.result.headline,
      );
    });

    test("dropping a fake OS file shows the rejection message", async ({ page }) => {
      await page.goto(`/industries/${industry.slug}`);

      const dropZone = page.locator(".ims-dropzone");
      await dropZone.scrollIntoViewIfNeeded();

      // A real File object gives DataTransfer.types "Files", matching what a
      // genuine OS drag carries -- exercises DropZone's reject-without-read
      // branch without ever writing/reading anything on disk.
      const dataTransfer = await page.evaluateHandle(() => {
        const transfer = new DataTransfer();
        const file = new File(["not real data"], "leaked-clients.csv", { type: "text/csv" });
        transfer.items.add(file);
        return transfer;
      });

      await dropZone.dispatchEvent("drop", { dataTransfer });

      // getByText (not getByRole("alert")): the alert role's accessible name
      // isn't computed from text content, so a name-filtered role query finds
      // nothing. Next.js also renders its own empty role="alert" route
      // announcer, which a bare getByRole("alert") would also match (strict
      // mode violation) -- getByText naturally excludes it since it's empty.
      await expect(
        page.getByText("Use one of the sample files provided — we never take real data here"),
      ).toBeVisible();
    });
  });
}

test.describe("/industries hub", () => {
  test("loads, H1 matches config, zero console errors/warnings, links to every industry", async ({
    page,
  }) => {
    const issues = collectConsoleIssues(page);

    const response = await page.goto("/industries");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(HUB_COPY.h1);

    expect(issues).toEqual([]);

    for (const industry of industries) {
      await expect(page.locator(`a[href="/industries/${industry.slug}"]`)).toHaveCount(1);
    }
  });
});
