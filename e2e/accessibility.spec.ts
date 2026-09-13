import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const criticalPages = [
  "/",
  "/gpa-calculator",
  "/final-grade-calculator",
  "/weighted-grade-calculator",
  "/test-grade-calculator",
  "/calculators",
  "/faq",
  "/uk",
  "/contact",
  "/canvas-grade-calculator",
  "/eoc-grade-calculator",
];

for (const path of criticalPages) {
  test(`accessibility: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("skip to content link is focusable", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: /skip to content/i });
  await expect(skipLink).toBeFocused();
});
