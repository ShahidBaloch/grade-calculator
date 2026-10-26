import { expect, test, type Page } from "@playwright/test";

/**
 * Header nav after a full page load, for each session hub × page type.
 * Countries label and tick must agree, Calculators links must open 200s, and hydration must not error.
 */
const HUBS = [
  { path: "/ca", name: "Canada" },
  { path: "/uk", name: "United Kingdom" },
  { path: "/au", name: "Australia" },
  { path: "/nz", name: "New Zealand" },
  { path: "/in", name: "India" },
  { path: "/pk", name: "Pakistan" },
];
const TARGETS = ["/calculators", "/", "/gpa-calculator", "/guides", "/grading-scales", "/uk/gcse-grade-calculator", "/us"];
const HUB_NAME: Record<string, string> = Object.fromEntries(HUBS.map((h) => [h.path, h.name]));

const checkedHrefs = new Map<string, number>();

async function linkStatus(page: Page, href: string) {
  if (!checkedHrefs.has(href)) {
    const response = await page.request.get(href, { maxRedirects: 0 });
    checkedHrefs.set(href, response.status());
  }
  return checkedHrefs.get(href)!;
}

function expectedCountry(target: string, session: string | null) {
  const urlHub = Object.keys(HUB_NAME).find((p) => target === p || target.startsWith(`${p}/`));
  if (target === "/us" || target.startsWith("/us/")) return null;
  return urlHub ?? session;
}

test.use({ viewport: { width: 1400, height: 900 } });

for (const session of [null, ...HUBS.map((h) => h.path)]) {
  for (const target of TARGETS) {
    test(`session ${session ?? "none"} → ${target}`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });

      if (session) {
        await page.goto(session);
        await page.waitForFunction((hub) => sessionStorage.getItem("gc-preferred-hub") === hub, session);
      }
      await page.goto(target);

      const country = expectedCountry(target, session);
      const nav = page.locator("header nav").first();
      const countriesButton = nav.locator('button[aria-haspopup="menu"]').nth(1);
      await expect(countriesButton.locator("span:not(.sr-only)").first()).toHaveText(
        country ? HUB_NAME[country] : "Countries",
      );

      await countriesButton.click();
      const ticked = page.locator('[role="menuitem"][aria-current]');
      await expect(ticked).toHaveCount(1);
      await expect(ticked).toContainText(country ? HUB_NAME[country] : "United States");
      await page.keyboard.press("Escape");

      await nav.locator('button[aria-haspopup="menu"]').first().click();
      const items = page.locator('[role="menuitem"]');
      await expect(items.first()).toBeVisible();
      const hrefs = await items.evaluateAll((els) => els.map((el) => el.getAttribute("href") ?? ""));
      const labels = await items.allInnerTexts();
      if (country) expect(labels.filter((label) => label.startsWith("US "))).toEqual([]);
      const bad: string[] = [];
      for (const href of hrefs) {
        const status = await linkStatus(page, href);
        if (status !== 200) bad.push(`${href} → ${status}`);
      }
      expect(bad).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}
