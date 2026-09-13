import { test, expect } from "@playwright/test";

test.describe("Mobile UX", () => {
  test("homepage calculator is usable on narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.getByRole("spinbutton", { name: "Total questions" })).toBeVisible();
    await expect(page.getByRole("spinbutton", { name: "Wrong answers" })).toBeVisible();
    await page.getByRole("button", { name: /increase wrong answers/i }).click();
    await expect(page.getByText("%").first()).toBeVisible();
  });

  test("mobile tool switcher is visible", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/gpa-calculator");
    await expect(page.getByRole("navigation", { name: "Quick tools" })).toBeVisible();
  });

  test("country hub renders on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/uk");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("United Kingdom");
  });
});
