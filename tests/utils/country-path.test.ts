import { describe, expect, it } from "vitest";
import { getCountryPrefixFromPath, resolveCalculatorPath } from "@/lib/utils/country-path";

describe("country-path", () => {
  it("detects country hub prefixes", () => {
    expect(getCountryPrefixFromPath("/au/gpa-calculator")).toBe("/au");
    expect(getCountryPrefixFromPath("/gpa-calculator")).toBeNull();
  });

  it("keeps country context for related calculators", () => {
    expect(resolveCalculatorPath("gpa-calculator", "/au/weighted-grade-calculator")).toBe(
      "/au/gpa-calculator",
    );
    expect(resolveCalculatorPath("percentage-to-letter-grade", "/uk/letter-grade-calculator")).toBe(
      "/uk/degree-classification-calculator",
    );
  });
});
