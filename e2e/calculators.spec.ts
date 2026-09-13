import { test, expect } from "@playwright/test";

test.describe("Core calculator flows", () => {
  test("homepage EZ grader shows score", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.getByRole("spinbutton", { name: "Wrong answers" }).fill("2");
    await expect(page.getByText(/80\.0%/).first()).toBeVisible();
  });

  test("final grade calculator computes required score", async ({ page }) => {
    await page.goto("/final-grade-calculator");
    await page.getByRole("spinbutton", { name: "Current grade (%)" }).fill("85");
    await page.getByRole("spinbutton", { name: "Target grade (%)" }).fill("90");
    await expect(page.locator(".text-5xl").filter({ hasText: /97\.5%/ })).toBeVisible();
  });

  test("GPA calculator shows semester GPA", async ({ page }) => {
    await page.goto("/gpa-calculator");
    await expect(page.getByText("Semester GPA", { exact: true })).toBeVisible();
    await expect(page.locator(".text-5xl").first()).not.toHaveText("—");
  });

  test("weighted grade calculator accepts rows", async ({ page }) => {
    await page.goto("/weighted-grade-calculator");
    await expect(page.getByRole("button", { name: /add row/i })).toBeVisible();
  });

  test("calculators hub lists tools", async ({ page }) => {
    await page.goto("/calculators");
    await expect(page.getByRole("heading", { name: /all grade/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /ez grader/i }).first()).toBeVisible();
  });

  test("navigation header links work", async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("link", { name: "GPA Calculator" }).click();
    } else {
      await page.getByRole("button", { name: "Calculators" }).click();
      await page.getByRole("menuitem", { name: "GPA Calculator", exact: true }).click();
    }
    await expect(page).toHaveURL("/gpa-calculator");
  });
});
