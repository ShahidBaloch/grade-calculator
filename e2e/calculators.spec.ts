import { test, expect } from "@playwright/test";

test.describe("Core calculator flows", () => {
  test("score page answers the query and recalculates", async ({ page }) => {
    await page.goto("/score/18-out-of-20");
    await expect(page).toHaveTitle(/18 out of 20 as a Grade & Percentage — 90% \(A\)/);
    await expect(page.getByRole("heading", { level: 1, name: /18 out of 20/i })).toBeVisible();
    const scales = page.getByRole("table").filter({ hasText: "Grading scale" });
    await expect(scales.getByRole("row")).toHaveCount(4);
    await expect(scales.getByRole("row", { name: /7-point/ })).toContainText("B");
    await page.getByLabel("Your score (points earned)").fill("15");
    await expect(page.getByText(/75%/).first()).toBeVisible();
  });

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

  test("UK hub serves its own GCSE page, and /uk/gcse redirects to it", async ({ page }) => {
    const response = await page.goto("/uk/gcse-grade-calculator");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/uk\/gcse-grade-calculator$/);
    await expect(page.getByRole("heading", { level: 1, name: /gcse/i })).toBeVisible();

    await page.goto("/uk/gcse");
    await expect(page).toHaveURL(/\/uk\/gcse-grade-calculator$/);
  });

  test("GCSE calculator maps a percentage", async ({ page }) => {
    await page.goto("/gcse-grade-calculator");
    await expect(page.getByRole("heading", { level: 1, name: /gcse/i })).toBeVisible();
    await expect(page.getByText("GCSE grade (9–1)").first()).toBeVisible();
  });

  test("ATAR default page shows an estimate", async ({ page }) => {
    await page.goto("/atar-calculator");
    await expect(page).toHaveURL(/\/au\/atar-calculator$/);
    await expect(page.getByRole("heading", { level: 1, name: /atar/i })).toBeVisible();
    await expect(page.getByText("Counted average (planning)").first()).toBeVisible();
    await expect(page.locator(".text-5xl").first()).toHaveText(/^\d+(\.\d)?$/);
    await expect(page.getByText(/Approximate planning ATAR: about\s*\d+/).first()).toBeVisible();
  });

  test("Raise GPA calculator shows a required GPA", async ({ page }) => {
    await page.goto("/raise-gpa-calculator");
    await expect(page.getByRole("heading", { level: 1, name: /raise gpa/i })).toBeVisible();
    await expect(page.getByText("Required GPA").first()).toBeVisible();
    await expect(page.getByText("3.80").first()).toBeVisible();
  });

  test("College GPA calculator shows term GPA and standing", async ({ page }) => {
    await page.goto("/college-gpa-calculator");
    await expect(page.getByRole("heading", { level: 1, name: /college gpa/i })).toBeVisible();
    await expect(page.getByText("College term GPA").first()).toBeVisible();
    await expect(page.getByText(/dean's-list|good academic standing|good-standing/i).first()).toBeVisible();
  });

  test("UK hub redirects US-style GPA URLs to degree classification", async ({ page }) => {
    const response = await page.goto("/uk/gpa-calculator");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(/\/uk\/degree-classification-calculator$/);
    await expect(page.getByRole("heading", { level: 1, name: /degree classification/i })).toBeVisible();
  });

  test("Canada hub 404s an unknown tool slug", async ({ page }) => {
    const response = await page.goto("/ca/not-a-calculator");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: /page not found/i })).toBeVisible();
  });

  test("Canada hub redirects the retired EZ grader URL to the homepage", async ({ page }) => {
    await page.goto("/ca/ez-grader");
    // Any host (local server or production): the path must be the homepage.
    await expect(page).toHaveURL(/^https?:\/\/[^/]+\/$/);
  });

  test("UK hub redirects shared tools to the worldwide calculator URL", async ({ page }) => {
    await page.goto("/uk/weighted-grade-calculator");
    await expect(page).toHaveURL(/\/weighted-grade-calculator$/);
    await expect(page.getByRole("heading", { level: 1, name: /weighted grade/i })).toBeVisible();
  });

  test("Australia ATAR geo copy loads", async ({ page }) => {
    await page.goto("/au/atar-calculator");
    await expect(page).toHaveURL(/\/au\/atar-calculator/);
    await expect(page.getByRole("heading", { level: 1, name: /atar/i })).toBeVisible();
  });

  test("legacy letter-grade URL redirects", async ({ page }) => {
    await page.goto("/letter-grade-to-percentage");
    await expect(page).toHaveURL(/\/letter-grade-calculator$/);
    await expect(page.getByRole("heading", { level: 1, name: /letter grade/i })).toBeVisible();
  });

  test("GCSE 9-1 guide page loads", async ({ page }) => {
    await page.goto("/guides/gcse-9-1-grades");
    await expect(page.getByRole("heading", { level: 1, name: /gcse/i })).toBeVisible();
  });

  test("Raise GPA guide embeds the calculator", async ({ page }) => {
    await page.goto("/guides/how-to-raise-your-gpa");
    await expect(page.getByRole("heading", { name: /try it yourself/i })).toBeVisible();
    await expect(page.getByText("Required GPA").first()).toBeVisible();
  });

  test("legacy ez-grader URL redirects home", async ({ page }) => {
    await page.goto("/ez-grader");
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1, name: /grade calculator/i })).toBeVisible();
  });

  test("easy-grader alias redirects home", async ({ page }) => {
    await page.goto("/easy-grader");
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1, name: /grade calculator/i })).toBeVisible();
  });

  test("average grade calculator averages scores and class-average alias redirects", async ({ page }) => {
    await page.goto("/class-average-calculator");
    await expect(page).toHaveURL(/\/average-grade-calculator$/);
    await expect(page.getByRole("heading", { level: 1, name: /average grade/i })).toBeVisible();
    await page.getByLabel("Paste a class list of scores").fill("90, 80, 70");
    await page.getByRole("button", { name: "Use these scores" }).click();
    await expect(page.getByText("80.0%").first()).toBeVisible();
  });

  test("Pakistan grading scale reference shows D+ and HEC source link", async ({ page }) => {
    await page.goto("/grading-scales/pakistan");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/pakistan/i);
    const scaleTable = page
      .getByRole("table")
      .filter({ has: page.getByRole("columnheader", { name: "Letter / Grade" }) });
    await expect(scaleTable.getByRole("cell", { name: "D+", exact: true })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /HEC Policy Guidelines.*§13\.1/i }),
    ).toHaveAttribute("href", /hec\.gov\.pk/i);
    await expect(scaleTable.getByRole("cell", { name: "3.34–3.66" })).toBeVisible();
  });

  test("Pakistan hub CGPA converter uses HEC §13.1 by default", async ({ page }) => {
    await page.goto("/pk/cgpa-to-percentage");
    const formula = page.getByRole("combobox", { name: "Formula" });
    await expect(formula).toContainText(/HEC §13\.1/i);
    await formula.click();
    await expect(page.getByRole("option", { name: /HEC §13\.1/i, selected: true })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(formula).toHaveAttribute("aria-expanded", "false");
    await page.getByRole("spinbutton", { name: /CGPA/i }).fill("3");
    await expect(page.getByText(/71%/).first()).toBeVisible();
  });

  const smokePages: Array<[string, RegExp]> = [
    ["/test-grade-calculator", /test grade/i],
    ["/cumulative-gpa-calculator", /cumulative gpa/i],
    ["/weighted-gpa-calculator", /weighted gpa/i],
    ["/high-school-gpa-calculator", /high school gpa/i],
    ["/percentage-to-letter-grade", /percentage to letter/i],
    ["/letter-grade-calculator", /letter grade/i],
    ["/canvas-grade-calculator", /canvas/i],
    ["/eoc-grade-calculator", /eoc/i],
    ["/us", /united states/i],
    ["/ca", /canada/i],
    ["/nz", /new zealand/i],
    ["/contact", /contact/i],
  ];

  for (const [path, heading] of smokePages) {
    test(`${path} loads`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
    });
  }

  test("weighted grade HTML is not a loading shell", async ({ page }) => {
    const response = await page.goto("/weighted-grade-calculator");
    expect(response?.ok()).toBe(true);
    const html = await page.content();
    expect(html).not.toMatch(/Loading calculator/i);
    expect(html).not.toMatch(/sr-only">Loading</);
    expect(html).not.toMatch(/<main[^>]*>[\s\S]{0,400}aria-busy="true"/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/weighted grade/i);
    await expect(page.getByRole("button", { name: /add row/i })).toBeVisible();
  });

  test("navigation header links work", async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("dialog").getByRole("link", { name: "GPA Calculator", exact: true }).click();
    } else {
      await page.getByRole("button", { name: "Calculators" }).click();
      await page.getByRole("menuitem", { name: "GPA Calculator", exact: true }).click();
    }
    await expect(page).toHaveURL("/gpa-calculator");
  });
});
