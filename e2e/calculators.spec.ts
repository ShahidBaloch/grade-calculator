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

  test("UK degree classification default page predicts a class", async ({ page }) => {
    await page.goto("/degree-classification-calculator");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/degree classification/i);
    await expect(page.getByText("Upper Second (2:1)").first()).toBeVisible();
  });

  test("UK hub GCSE page locks a country path", async ({ page }) => {
    await page.goto("/uk/gcse-grade-calculator");
    await expect(page).toHaveURL(/\/uk\/gcse-grade-calculator/);
    await expect(page.getByRole("heading", { level: 1, name: /gcse/i })).toBeVisible();
  });

  test("GCSE calculator maps a percentage", async ({ page }) => {
    await page.goto("/gcse-grade-calculator");
    await expect(page.getByRole("heading", { level: 1, name: /gcse/i })).toBeVisible();
    await expect(page.getByText("GCSE grade (9–1)").first()).toBeVisible();
  });

  test("ATAR default page shows an estimate", async ({ page }) => {
    await page.goto("/atar-calculator");
    await expect(page.getByRole("heading", { level: 1, name: /atar/i })).toBeVisible();
    await expect(page.getByText("Estimated ATAR").first()).toBeVisible();
    await expect(page.locator(".text-5xl").first()).not.toHaveText("—");
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
