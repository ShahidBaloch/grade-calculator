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
  });

  it("serves UK-scale GCSE, weighted and letter pages under /uk", () => {
    for (const slug of ["gcse-grade-calculator", "weighted-grade-calculator", "letter-grade-calculator"] as const) {
      expect(isIndexableGeoCalculator("/uk", slug)).toBe(true);
      expect(generateGeoStaticParams("uk").map((p) => p.slug)).toContain(slug);
    }
    const redirects = new Map(seoRedirects().map((r) => [r.source, r.destination]));
    expect(redirects.has("/uk/gcse-grade-calculator")).toBe(false);
    expect(redirects.get("/uk/gcse")).toBe("/uk/gcse-grade-calculator");
  });

  it("keeps scale-dependent tools on hubs where letter bands differ (P0 regressions)", () => {
    expect(isIndexableGeoCalculator("/nz", "final-grade-calculator")).toBe(true);
    expect(isIndexableGeoCalculator("/in", "final-grade-calculator")).toBe(true);
    expect(isIndexableGeoCalculator("/au", "final-grade-calculator")).toBe(true);
    expect(isIndexableGeoCalculator("/pk", "final-grade-calculator")).toBe(true);
    expect(isIndexableGeoCalculator("/pk", "cgpa-to-gpa")).toBe(true);
    expect(generateGeoStaticParams("nz").map((p) => p.slug)).toContain("final-grade-calculator");
    expect(generateGeoStaticParams("in").map((p) => p.slug)).toContain("final-grade-calculator");
    expect(generateGeoStaticParams("au").map((p) => p.slug)).toContain("final-grade-calculator");
    expect(generateGeoStaticParams("pk").map((p) => p.slug)).toContain("final-grade-calculator");
    expect(generateGeoStaticParams("pk").map((p) => p.slug)).toContain("cgpa-to-gpa");
    const redirects = new Map(seoRedirects().map((r) => [r.source, r.destination]));
    expect(redirects.has("/nz/final-grade-calculator")).toBe(false);
    expect(redirects.has("/in/final-grade-calculator")).toBe(false);
    expect(redirects.has("/au/final-grade-calculator")).toBe(false);
    expect(redirects.has("/pk/final-grade-calculator")).toBe(false);
    expect(redirects.has("/pk/cgpa-to-gpa")).toBe(false);
    expect(redirects.get("/gcse-grade-calculator")).toBe("/uk/gcse-grade-calculator");
    expect(redirects.get("/grade-calculator")).toBe("/");
    expect(redirects.get("/mcmaster-gpa")).toBe("/ca/mcmaster-gpa-to-us-gpa");
    // AU "college GPA" is university GPA — send it to the AU tool, not the US 4.0 page.
    expect(redirects.get("/au/college-gpa-calculator")).toBe("/au/gpa-calculator");
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
    expect(redirects.get("/in/mcmaster")).toBe("/ca/mcmaster-gpa-to-us-gpa");
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
