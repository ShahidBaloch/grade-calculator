import { getCalculatorPath } from "../../config/calculator-paths";
import { countryHubRoutes, mainCountryPath } from "../../config/country-hub-routes";
import type { CalculatorSlug } from "../../types/calculator";

/**
 * Geo URLs that are a different grading system, so they earn their own page.
 * Every other country copy 301s to the single worldwide URL for that tool.
 */
export const COUNTRY_SPECIFIC_SLUGS: Record<string, readonly CalculatorSlug[]> = {
  "/au": ["gpa-calculator", "cumulative-gpa-calculator", "atar-calculator"],
  "/ca": [
    "gpa-calculator",
    "college-gpa-calculator",
    "cumulative-gpa-calculator",
    "letter-grade-calculator",
  ],
  "/nz": ["gpa-calculator", "cumulative-gpa-calculator", "letter-grade-calculator"],
  "/uk": [
    "degree-classification-calculator",
    "gcse-grade-calculator",
    "weighted-grade-calculator",
    "letter-grade-calculator",
    "final-grade-calculator",
  ],
  "/in": ["gpa-calculator"],
  "/pk": [
    "gpa-calculator",
    "cumulative-gpa-calculator",
    "cgpa-to-percentage",
    "percentage-to-cgpa",
    "cgpa-calculator",
    "sgpa-to-cgpa",
  ],
  "/us": [],
};

export const UK_GPA_SLUGS = new Set<CalculatorSlug>([
  "gpa-calculator",
  "cumulative-gpa-calculator",
  "weighted-gpa-calculator",
  "high-school-gpa-calculator",
  "college-gpa-calculator",
  "raise-gpa-calculator",
]);

/** CA menu rows that all open the same GPA tool — hide duplicates in the country catalog. */
export const CA_GPA_ALIAS = new Set<CalculatorSlug>([
  "high-school-gpa-calculator",
  "weighted-gpa-calculator",
  "raise-gpa-calculator",
]);

/**
 * "College GPA" means university GPA outside North America. On these hubs the worldwide
 * tool would lock the US 4.0 scale, so the hub's own GPA calculator serves the intent.
 */
const UNIVERSITY_GPA_ALIAS_HUBS = new Set(["/au", "/nz", "/in", "/pk"]);

/** Hubs where switching calculators should keep the country in the URL (local scale lock). */
const HUB_NAV_PREFIX_PATHS = new Set(["/ca", "/au", "/nz", "/in", "/pk", "/uk"]);

/** Tools that stay worldwide even when browsing from a country hub. */
const HUB_NAV_EXCLUDED_SLUGS = new Set<CalculatorSlug>([
  "ez-grader",
  "eoc-grade-calculator",
  "uc-gpa-calculator",
  "csu-gpa-calculator",
]);

/** Syllabus / LMS tools that make sense on any country hub. */
const GENERIC_HUB_CALCULATORS = new Set<CalculatorSlug>([
  "test-grade-calculator",
  "weighted-grade-calculator",
  "average-grade-calculator",
  "grade-chart",
  "final-grade-calculator",
  "percentage-to-letter-grade",
  "letter-grade-calculator",
  "canvas-grade-calculator",
  "grade-percentage-calculator",
  "college-grade-calculator",
  "semester-grade-calculator",
]);

/** Region-specific tools — only these hubs may host `/xx/slug` (not every prefix hub). */
const MARKET_BOUND_HUBS: Partial<Record<CalculatorSlug, readonly string[]>> = {
  "cgpa-to-gpa": ["/in", "/pk"],
  "cgpa-to-percentage": ["/in", "/pk"],
  "percentage-to-cgpa": ["/in", "/pk"],
  "sgpa-to-cgpa": ["/in", "/pk"],
  "cgpa-calculator": ["/in", "/pk"],
  "mcmaster-gpa-to-us-gpa": ["/ca"],
  "atar-calculator": ["/au"],
  "gcse-grade-calculator": ["/uk"],
  "degree-classification-calculator": ["/uk"],
  "uk-degree-to-us-gpa-reference": ["/uk"],
  "eoc-grade-calculator": [mainCountryPath],
  "uc-gpa-calculator": [mainCountryPath],
  "csu-gpa-calculator": [mainCountryPath],
  "middle-school-gpa-calculator": [mainCountryPath],
  "high-school-gpa-calculator": [mainCountryPath],
  "weighted-gpa-calculator": [mainCountryPath],
  "raise-gpa-calculator": [mainCountryPath],
};

const GPA_NAV_SLUGS = new Set<CalculatorSlug>([
  "gpa-calculator",
  "cumulative-gpa-calculator",
  "college-gpa-calculator",
  "high-school-gpa-calculator",
  "weighted-gpa-calculator",
  "raise-gpa-calculator",
]);

/** True when this hub should keep `/hub/slug` in nav and serve a geo copy. */
export function isHubOfferedCalculator(hubPath: string, slug: CalculatorSlug): boolean {
  if (!HUB_NAV_PREFIX_PATHS.has(hubPath) || HUB_NAV_EXCLUDED_SLUGS.has(slug)) return false;

  const marketHubs = MARKET_BOUND_HUBS[slug];
  if (marketHubs) return marketHubs.includes(hubPath);

  if (GENERIC_HUB_CALCULATORS.has(slug)) return true;

  const hub = countryHubRoutes.find((h) => h.path === hubPath);
  if (!hub) return false;

  if (COUNTRY_SPECIFIC_SLUGS[hubPath]?.includes(slug)) return true;
  if (hub.featuredCalculators.includes(slug)) return true;

  if (GPA_NAV_SLUGS.has(slug)) {
    if (hubPath === "/uk") return false;
    return (
      hub.featuredCalculators.includes(slug) ||
      Boolean(COUNTRY_SPECIFIC_SLUGS[hubPath]?.includes(slug))
    );
  }

  return false;
}

/**
 * True when `/hub/slug` should be built, sitemapped, and self-canonical (distinct geo intent).
 * Generic syllabus tools stay worldwide even if they appear on a hub menu.
 */
export function isIndexableGeoCalculator(hubPath: string, slug: CalculatorSlug): boolean {
  if (hubPath === mainCountryPath) return false;
  const hub = countryHubRoutes.find((h) => h.path === hubPath);
  if (!hub?.featuredCalculators.includes(slug)) return false;
  if (!isHubOfferedCalculator(hubPath, slug)) return false;
  return isCountrySpecificSlug(hubPath, slug);
}

/**
 * True when this hub has its own indexable URL for the tool (hreflang / sitemap).
 * Stricter than {@link isHubOfferedCalculator} (menu / session nav).
 */
export function isCountrySpecificSlug(hubPath: string, slug: CalculatorSlug): boolean {
  if (hubPath === mainCountryPath) return false;
  if (COUNTRY_SPECIFIC_SLUGS[hubPath]?.includes(slug)) return true;
  if (hubPath === "/uk") return false;
  const hub = countryHubRoutes.find((h) => h.path === hubPath);
  return Boolean(hub?.featuredCalculators.includes(slug));
}

/** The one URL that should rank and that visitors should open for this tool. */
export function canonicalPathForSlug(slug: CalculatorSlug, hubPath?: string | null): string {
  if (slug === "ez-grader") return "/";
  if (hubPath === "/uk" && UK_GPA_SLUGS.has(slug)) {
    return "/uk/degree-classification-calculator";
  }
  if (hubPath === "/ca" && CA_GPA_ALIAS.has(slug)) {
    return "/ca/gpa-calculator";
  }
  if (hubPath && slug === "college-gpa-calculator" && UNIVERSITY_GPA_ALIAS_HUBS.has(hubPath)) {
    return `${hubPath}/gpa-calculator`;
  }
  if (hubPath && isIndexableGeoCalculator(hubPath, slug)) {
    return `${hubPath}/${slug}`;
  }
  return getCalculatorPath(slug);
}
