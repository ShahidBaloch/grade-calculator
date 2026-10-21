import { describe, expect, it } from "vitest";
import { calculators, calculatorBySlug } from "@/config/calculators";
import { getCalculatorPath } from "@/config/calculator-paths";
import { countryHubRoutes } from "@/config/country-hub-routes";
import { countryHubs } from "@/config/country-hubs";
import { CALCULATOR_SLUGS } from "@/types/calculator";

// The slim route modules are what client bundles import; they must match the full configs.
describe("client route data stays in sync with page configs", () => {
  it("country hub routes match country hub configs", () => {
    expect(countryHubRoutes.map(({ code, path, gradingScalePath }) => ({ code, path, gradingScalePath }))).toEqual(
      countryHubs.map(({ code, path, gradingScalePath }) => ({ code, path, gradingScalePath })),
    );
  });

  it("calculator slug list matches calculator configs", () => {
    expect([...CALCULATOR_SLUGS].sort()).toEqual(calculators.map((c) => c.slug).sort());
  });

  it("calculator paths match the configured path for every tool", () => {
    const relocated = new Set(["ez-grader", "atar-calculator", "degree-classification-calculator"]);
    for (const slug of CALCULATOR_SLUGS) {
      if (relocated.has(slug)) continue;
      expect(getCalculatorPath(slug)).toBe(calculatorBySlug[slug].path);
    }
  });
});
