import { describe, expect, it } from "vitest";
import { countryHubs } from "@/config/country-hubs";
import { mainCountryPath } from "@/config/country-hub-routes";
import { generateGeoStaticParams } from "@/lib/seo/geo-calculator-page";
import { indexableGeoCalculatorPaths, seoRedirects } from "@/lib/seo/intent-urls";
import { canonicalPathForSlug, isIndexableGeoCalculator } from "@/lib/seo/canonical-path";
import { CALCULATOR_SLUGS } from "@/types/calculator";

describe("indexable geo pages (SEO structure)", () => {
  it("static geo routes plus dedicated folders cover sitemap indexable paths", () => {
    const fromParams = countryHubs
      .filter((h) => h.path !== mainCountryPath)
      .flatMap((hub) =>
        generateGeoStaticParams(hub.code).map(({ slug }) => `${hub.path}/${slug}`),
      );
    const dedicated = ["/uk/degree-classification-calculator", "/au/atar-calculator"];
    expect([...fromParams, ...dedicated].sort()).toEqual([...indexableGeoCalculatorPaths()].sort());
  });

  it("does not build indexable geo pages for generic syllabus duplicates", () => {
    expect(isIndexableGeoCalculator("/uk", "final-grade-calculator")).toBe(false);
    expect(isIndexableGeoCalculator("/au", "average-grade-calculator")).toBe(false);
    expect(generateGeoStaticParams("uk").map((p) => p.slug)).not.toContain("final-grade-calculator");
  });

  it("redirects stale hub-prefixed generic URLs to worldwide", () => {
    const redirects = new Map(seoRedirects().map((r) => [r.source, r.destination]));
    expect(redirects.get("/uk/final-grade-calculator")).toBe("/final-grade-calculator");
    expect(redirects.get("/au/average-grade-calculator")).toBe("/average-grade-calculator");
    expect(redirects.get("/uk/gcse-grade-calculator")).toBe("/gcse-grade-calculator");
  });

  it("has no redirect chains", () => {
    const redirects = new Map(seoRedirects().map((r) => [r.source, r.destination]));
    const chains = [...redirects].filter(([, destination]) => redirects.has(destination));
    expect(chains).toEqual([]);
  });

  it("serves McMaster only from the Canada URL", () => {
    const redirects = new Map(seoRedirects().map((r) => [r.source, r.destination]));
    expect(redirects.get("/mcmaster-gpa-to-us-gpa")).toBe("/ca/mcmaster-gpa-to-us-gpa");
    expect(redirects.get("/uk/mcmaster-gpa-to-us-gpa")).toBe("/ca/mcmaster-gpa-to-us-gpa");
    expect(canonicalPathForSlug("mcmaster-gpa-to-us-gpa")).toBe("/ca/mcmaster-gpa-to-us-gpa");
  });

  it("keeps fewer indexable geo URLs than offered menu slugs", () => {
    let indexable = 0;
    for (const hub of countryHubs) {
      if (hub.path === mainCountryPath) continue;
      for (const slug of CALCULATOR_SLUGS) {
        if (isIndexableGeoCalculator(hub.path, slug)) indexable++;
      }
    }
    expect(indexable).toBeLessThan(55);
    expect(indexable).toBeGreaterThan(10);
  });
});
