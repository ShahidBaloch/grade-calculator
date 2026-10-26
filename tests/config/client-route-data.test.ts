import { describe, expect, it } from "vitest";
import { calculators, calculatorBySlug } from "@/config/calculators";
import { getCalculatorPath } from "@/config/calculator-paths";
import { countryHubRoutes } from "@/config/country-hub-routes";
import { countryHubs } from "@/config/country-hubs";
import { CALCULATOR_SLUGS } from "@/types/calculator";

// The slim route modules are what client bundles import; they must match the full configs.
describe("client route data stays in sync with page configs", () => {
  it("country hub routes match country hub configs", () => {
    const pick = ({ code, path, gradingScalePath, featuredCalculators }: (typeof countryHubRoutes)[number]) => ({
      code,
      path,
      gradingScalePath,
      featuredCalculators: [...featuredCalculators],
    });
    expect(countryHubRoutes.map(pick)).toEqual(countryHubs.map(pick));
  });

  it("calculator slug list matches calculator configs", () => {
    expect([...CALCULATOR_SLUGS].sort()).toEqual(calculators.map((c) => c.slug).sort());
  });

  it("calculator paths match the configured path for every tool", () => {
    const relocated = new Set([
      "ez-grader",
      "atar-calculator",
      "degree-classification-calculator",
      "mcmaster-gpa-to-us-gpa",
    ]);
    for (const slug of CALCULATOR_SLUGS) {
      if (relocated.has(slug)) continue;
      expect(getCalculatorPath(slug)).toBe(calculatorBySlug[slug].path);
    }
  });
});
