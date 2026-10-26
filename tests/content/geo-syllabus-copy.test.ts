import { describe, expect, it } from "vitest";
import { calculatorContent } from "@/config/calculator-content";
import { geoCalculatorLocal } from "@/lib/content/geo-calculator-local";

const PAGES = [
  "/ca/final-grade-calculator",
  "/nz/final-grade-calculator",
  "/in/final-grade-calculator",
  "/ca/weighted-grade-calculator",
  "/au/weighted-grade-calculator",
  "/nz/weighted-grade-calculator",
] as const;

describe("country final / weighted grade copy", () => {
  it.each(PAGES)("%s has its own example, table and FAQs", (path) => {
    const slug = path.split("/")[2] as "final-grade-calculator" | "weighted-grade-calculator";
    const local = geoCalculatorLocal(slug, path)!;
    expect(local).not.toBeNull();
    expect(local.workedExample).not.toBe(calculatorContent[slug].workedExample);
    // Scale table + a course-mark table.
    expect(local.sections.length).toBe(2);
    // Local FAQs lead; at most two worldwide FAQs remain, so the page is not a near-copy of the US URL.
    const worldwide = new Set(calculatorContent[slug].faqs.map((f) => f.question));
    const shared = local.faqs.filter((f) => worldwide.has(f.question));
    expect(shared.length).toBeLessThanOrEqual(2);
    expect(local.faqs.length - shared.length).toBeGreaterThanOrEqual(2);
    // No GPA example on a course-mark page.
    expect(local.workedExample).not.toMatch(/GPA on the/);
  });

  it("works the NZ final-exam example on the 9-point bands", () => {
    const local = geoCalculatorLocal("final-grade-calculator", "/nz/final-grade-calculator")!;
    expect(local.workedExample).toContain("88.0% needed");
  });

  it("works the India example on internal + end-semester marks", () => {
    const local = geoCalculatorLocal("weighted-grade-calculator", "/in/weighted-grade-calculator")!;
    expect(local.workedExample).toContain("76.0% course mark, an A");
  });
});
