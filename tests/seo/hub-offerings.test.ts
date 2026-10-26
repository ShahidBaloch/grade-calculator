import { describe, expect, it } from "vitest";
import { countryHubs } from "@/config/country-hubs";
import { mainCountryPath } from "@/config/country-hub-routes";
import { CALCULATOR_SLUGS, type CalculatorSlug } from "@/types/calculator";
import { canonicalPathForSlug, isHubOfferedCalculator } from "@/lib/seo/canonical-path";
import { selectableCalculatorSlugsForHub } from "@/lib/utils/hub-calculator-nav";

/** Slugs that must never appear under this hub (menu or `/hub/slug` geo page). */
const FORBIDDEN_ON_HUB: Record<string, CalculatorSlug[]> = {
  "/ca": [
    "atar-calculator",
    "gcse-grade-calculator",
    "degree-classification-calculator",
    "uk-degree-to-us-gpa-reference",
    "cgpa-to-gpa",
    "cgpa-calculator",
    "cgpa-to-percentage",
    "percentage-to-cgpa",
    "sgpa-to-cgpa",
    "eoc-grade-calculator",
    "uc-gpa-calculator",
    "csu-gpa-calculator",
    "middle-school-gpa-calculator",
    "high-school-gpa-calculator",
    "weighted-gpa-calculator",
    "raise-gpa-calculator",
  ],
  "/uk": [
    "cgpa-to-gpa",
    "cgpa-calculator",
    "cgpa-to-percentage",
    "percentage-to-cgpa",
    "sgpa-to-cgpa",
    "mcmaster-gpa-to-us-gpa",
    "atar-calculator",
    "gpa-calculator",
    "cumulative-gpa-calculator",
    "college-gpa-calculator",
    "high-school-gpa-calculator",
    "weighted-gpa-calculator",
    "raise-gpa-calculator",
    "eoc-grade-calculator",
    "uc-gpa-calculator",
    "csu-gpa-calculator",
    "middle-school-gpa-calculator",
  ],
  "/au": [
    "mcmaster-gpa-to-us-gpa",
    "gcse-grade-calculator",
    "degree-classification-calculator",
    "uk-degree-to-us-gpa-reference",
    "cgpa-to-gpa",
    "cgpa-calculator",
    "cgpa-to-percentage",
    "percentage-to-cgpa",
    "sgpa-to-cgpa",
    "eoc-grade-calculator",
    "uc-gpa-calculator",
    "csu-gpa-calculator",
    "middle-school-gpa-calculator",
    "high-school-gpa-calculator",
    "weighted-gpa-calculator",
    "raise-gpa-calculator",
  ],
  "/nz": [
    "mcmaster-gpa-to-us-gpa",
    "atar-calculator",
    "gcse-grade-calculator",
    "degree-classification-calculator",
    "uk-degree-to-us-gpa-reference",
    "cgpa-to-gpa",
    "cgpa-calculator",
    "cgpa-to-percentage",
    "percentage-to-cgpa",
    "sgpa-to-cgpa",
    "eoc-grade-calculator",
    "uc-gpa-calculator",
    "csu-gpa-calculator",
    "middle-school-gpa-calculator",
    "high-school-gpa-calculator",
    "weighted-gpa-calculator",
    "raise-gpa-calculator",
  ],
  "/in": [
    "mcmaster-gpa-to-us-gpa",
    "atar-calculator",
    "gcse-grade-calculator",
    "degree-classification-calculator",
    "uk-degree-to-us-gpa-reference",
    "eoc-grade-calculator",
    "uc-gpa-calculator",
    "csu-gpa-calculator",
    "middle-school-gpa-calculator",
    "high-school-gpa-calculator",
    "weighted-gpa-calculator",
    "raise-gpa-calculator",
  ],
  "/pk": [
    "cgpa-to-gpa",
    "mcmaster-gpa-to-us-gpa",
    "atar-calculator",
    "gcse-grade-calculator",
    "degree-classification-calculator",
    "uk-degree-to-us-gpa-reference",
    "eoc-grade-calculator",
    "uc-gpa-calculator",
    "csu-gpa-calculator",
    "middle-school-gpa-calculator",
    "high-school-gpa-calculator",
    "weighted-gpa-calculator",
    "raise-gpa-calculator",
  ],
};

describe("hub calculator offerings (all countries)", () => {
  const hubs = countryHubs.filter((h) => h.path !== mainCountryPath);

  for (const hub of hubs) {
    describe(hub.path, () => {
      const forbidden = new Set(FORBIDDEN_ON_HUB[hub.path] ?? []);

      it("does not offer foreign or US-only tools in the menu", () => {
        const menu = selectableCalculatorSlugsForHub(hub.path);
        for (const slug of forbidden) {
          expect(menu, `${slug} on ${hub.path}`).not.toContain(slug);
        }
      });

      it("does not assign a geo URL to forbidden tools", () => {
        for (const slug of forbidden) {
          expect(isHubOfferedCalculator(hub.path, slug)).toBe(false);
          expect(canonicalPathForSlug(slug, hub.path)).not.toBe(`${hub.path}/${slug}`);
        }
      });
    });
  }

  it("does not invent geo URLs for another market's tools", () => {
    expect(canonicalPathForSlug("cgpa-to-gpa", "/uk")).toBe("/cgpa-to-gpa");
    expect(canonicalPathForSlug("atar-calculator", "/ca")).toBe("/au/atar-calculator");
    expect(canonicalPathForSlug("mcmaster-gpa-to-us-gpa", "/in")).toBe("/mcmaster-gpa-to-us-gpa");
    expect(canonicalPathForSlug("gcse-grade-calculator", "/au")).toBe("/gcse-grade-calculator");
    expect(canonicalPathForSlug("cgpa-to-gpa", "/pk")).toBe("/cgpa-to-gpa");
    expect(canonicalPathForSlug("high-school-gpa-calculator", "/au")).toBe("/high-school-gpa-calculator");
    expect(canonicalPathForSlug("atar-calculator", "/ca")).not.toBe("/ca/atar-calculator");
  });

  it("every hub menu slug resolves to a real hub page, not an alias target", () => {
    for (const hub of hubs) {
      for (const slug of selectableCalculatorSlugsForHub(hub.path)) {
        expect(canonicalPathForSlug(slug, hub.path)).toBe(`${hub.path}/${slug}`);
      }
    }
  });

  it("market-bound tools only prefix on allowed hubs", () => {
    const bound: Array<[CalculatorSlug, string[]]> = [
      ["cgpa-to-gpa", ["/in"]],
      ["mcmaster-gpa-to-us-gpa", ["/ca"]],
      ["atar-calculator", ["/au"]],
      ["gcse-grade-calculator", ["/uk"]],
      ["degree-classification-calculator", ["/uk"]],
    ];
    for (const hub of hubs) {
      for (const [slug, allowed] of bound) {
        const offered = isHubOfferedCalculator(hub.path, slug);
        expect(offered).toBe(allowed.includes(hub.path));
      }
    }
  });

  it("does not generate impossible geo static params", () => {
    for (const hub of hubs) {
      for (const slug of CALCULATOR_SLUGS) {
        const geo = `${hub.path}/${slug}`;
        const canonical = canonicalPathForSlug(slug, hub.path);
        if (canonical !== geo && isHubOfferedCalculator(hub.path, slug)) {
          throw new Error(`Inconsistent: ${hub.path} offers ${slug} but canonical is ${canonical}`);
        }
      }
    }
  });
});
