import { getCalculatorPath } from "../../config/calculator-paths";
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
  "/uk": ["degree-classification-calculator"],
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

const CA_GPA_ALIAS = new Set<CalculatorSlug>([
  "high-school-gpa-calculator",
  "weighted-gpa-calculator",
  "raise-gpa-calculator",
]);

export function isCountrySpecificSlug(hubPath: string, slug: CalculatorSlug): boolean {
  return COUNTRY_SPECIFIC_SLUGS[hubPath]?.includes(slug) ?? false;
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
  if (hubPath && isCountrySpecificSlug(hubPath, slug)) {
    return `${hubPath}/${slug}`;
  }
  return getCalculatorPath(slug);
}
