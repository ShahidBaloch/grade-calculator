import { test, expect, type Page } from "@playwright/test";

const SITE = "https://www.gradcalc.com";

const caPages = [
  { path: "/ca/university/omsas-gpa-calculator", h1: /OMSAS GPA Calculator/, omsas: "3.73" },
  { path: "/ca/university/ubc-gpa-calculator", h1: /UBC GPA Calculator/, native: "80.00%", omsas: "3.34" },
  { path: "/ca/university/uoft-gpa-calculator", h1: /University of Toronto GPA Calculator/, native: "3.28", omsas: "3.26" },
  { path: "/ca/university/waterloo-gpa-calculator", h1: /Waterloo Average/, native: "78.82%", omsas: "3.27" },
  { path: "/ca/university/guelph-gpa-calculator", h1: /University of Guelph Grade Calculator/, native: "81.78%", omsas: "3.48" },
];

const usPages = [
  { path: "/eoc-grade-calculator/florida", weight: "30", need: "75.3%" },
  { path: "/eoc-grade-calculator/georgia", weight: "10", need: "62.0%" },
  { path: "/eoc-grade-calculator/north-carolina", weight: "20", need: "72.0%" },
  { path: "/eoc-grade-calculator/tennessee", weight: "15", need: "68.7%" },
];

async function checkSeo(page: Page, path: string, market: "en-CA" | "en-US") {
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${path}`);
  await expect(page.locator(`link[rel="alternate"][hreflang="${market}"]`)).toHaveAttribute("href", `${SITE}${path}`);
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", `${SITE}${path}`);
  expect(await page.locator('link[rel="alternate"][hreflang]').count()).toBe(2);
  const visibleWords = await page.evaluate(
    () => document.querySelector("main")?.innerText.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length ?? 0,
  );
  expect(visibleWords).toBeGreaterThanOrEqual(500);
}

test.describe("Canada university GPA pages", () => {
  for (const item of caPages) {
    test(`${item.path} loads, calculates and has correct tags`, async ({ page }) => {
      const response = await page.goto(item.path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(item.h1);
      await checkSeo(page, item.path, "en-CA");
      const omsasCard = page.getByText("OMSAS GPA (4.0)", { exact: true }).locator("..");
      await expect(omsasCard).toContainText(item.omsas);
      if (item.native) await expect(page.getByText(item.native, { exact: true }).first()).toBeVisible();

      // Editing a grade recalculates (after hydration).
      await page.waitForLoadState("networkidle");
      await page.getByRole("textbox", { name: "Course 1 grade" }).fill("50");
      await expect(omsasCard).not.toContainText(item.omsas);
    });
  }

  test("OMSAS page switches scale with the university", async ({ page }) => {
    await page.goto("/ca/university/omsas-gpa-calculator");
    await page.waitForLoadState("networkidle");
    await page.getByLabel("University on your transcript").selectOption("McGill");
    await expect(page.getByText(/letter-grade OMSAS scale/).first()).toBeVisible();
  });
});

test.describe("State EOC pages", () => {
  for (const item of usPages) {
    test(`${item.path} prefills the state weight and solves`, async ({ page }) => {
      const response = await page.goto(item.path);
      expect(response?.status()).toBe(200);
      await checkSeo(page, item.path, "en-US");
      await expect(page.getByRole("spinbutton", { name: /EOC exam weight/i })).toHaveValue(item.weight);
      await page.getByRole("spinbutton", { name: "Current course grade (%)" }).fill("82");
      await page.getByRole("spinbutton", { name: "Target grade (%)" }).fill("80");
      await expect(page.locator(".text-5xl").filter({ hasText: item.need })).toBeVisible();
    });
  }
});

test.describe("Geo page linking", () => {
  test("hubs and parent calculators link the new pages", async ({ page }) => {
    for (const [from, to] of [
      ["/ca", "/ca/university/uoft-gpa-calculator"],
      ["/ca/gpa-calculator", "/ca/university/omsas-gpa-calculator"],
      ["/us", "/eoc-grade-calculator/florida"],
      ["/eoc-grade-calculator", "/eoc-grade-calculator/tennessee"],
    ]) {
      await page.goto(from);
      await expect(page.locator(`a[href="${to}"]`).first()).toBeVisible();
    }
  });

  test("sitemap lists every geo page", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const { path } of [...caPages, ...usPages]) expect(xml).toContain(`${SITE}${path}<`);
  });
});
