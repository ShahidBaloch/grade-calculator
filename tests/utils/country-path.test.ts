import { describe, expect, it } from "vitest";
import { getCountryPrefixFromPath, resolveCalculatorPath, resolveSiteHref } from "@/lib/utils/country-path";

describe("country-path", () => {
  it("detects country hub prefixes", () => {
    expect(getCountryPrefixFromPath("/au/gpa-calculator")).toBe("/au");
    expect(getCountryPrefixFromPath("/gpa-calculator")).toBeNull();
  });

  it("keeps country context for related calculators", () => {
    expect(resolveCalculatorPath("gpa-calculator", "/au/weighted-grade-calculator")).toBe(
      "/au/gpa-calculator",
    );
    expect(resolveCalculatorPath("cumulative-gpa-calculator", "/au/gpa-calculator")).toBe(
      "/au/cumulative-gpa-calculator",
    );
    expect(resolveCalculatorPath("percentage-to-letter-grade", "/uk/letter-grade-calculator")).toBe(
      "/uk/degree-classification-calculator",
    );
    expect(resolveCalculatorPath("gpa-calculator", "/uk/degree-classification-calculator")).toBe(
      "/uk/degree-classification-calculator",
    );
    expect(resolveSiteHref("/gpa-calculator", "/uk")).toBe("/uk/degree-classification-calculator");
  });

  it("rewrites footer calculator links on country pages", () => {
    expect(resolveSiteHref("/percentage-to-letter-grade", "/au/gpa-calculator")).toBe(
      "/au/letter-grade-calculator",
    );
    expect(resolveSiteHref("/cumulative-gpa-calculator", "/au/gpa-calculator")).toBe(
      "/au/cumulative-gpa-calculator",
    );
  });
});
