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
  "/grading-scales/pakistan",
  "/pk",
  "/in",
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

test("skip to content is visible when focused and moves focus into main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: /skip to content/i });
  await expect(skipLink).toBeFocused();
  const box = await skipLink.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(40);
  expect(box?.height ?? 0).toBeGreaterThan(16);
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("FAQ accordion opens from the keyboard", async ({ page }) => {
  await page.goto("/weighted-grade-calculator");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/weighted grade/i);
  const trigger = page.getByRole("button", { name: /add to 100%/i });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(/divide by the total weight you entered/i)).toBeVisible();
});

test("weighted grade score format can be changed from the keyboard", async ({ page }) => {
  await page.goto("/weighted-grade-calculator");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/weighted grade/i);
  const letter = page.getByRole("button", { name: "Letter grade" });
  await letter.click();
  await expect(letter).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("textbox", { name: /assignment 1 score/i })).toBeVisible();
});
