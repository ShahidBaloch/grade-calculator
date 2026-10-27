import { mainCountryPath } from "@/config/country-hub-routes";
import { getCountryPrefixFromPath } from "@/lib/utils/country-path";
import type { CalculatorSlug } from "@/types/calculator";
import { canonicalPathForSlug, isHubOfferedCalculator } from "./canonical-path";

/** US-only tools that should not appear in related links on country hub pages. */
const US_ONLY_RELATED = new Set<CalculatorSlug>([
  "uc-gpa-calculator",
  "csu-gpa-calculator",
  "eoc-grade-calculator",
  "middle-school-gpa-calculator",
]);

const WORLDWIDE_SYLLABUS_RELATED = new Set<CalculatorSlug>([
  "final-grade-calculator",
  "weighted-grade-calculator",
  "test-grade-calculator",
  "average-grade-calculator",
  "grade-chart",
  "percentage-to-letter-grade",
  "letter-grade-calculator",
  "canvas-grade-calculator",
  "grade-percentage-calculator",
  "college-grade-calculator",
]);

/** Trim related-tool cards on geo pages so US-only calculators do not clutter the footer area. */
export function relatedCalculatorSlugsForPage(
  slugs: readonly CalculatorSlug[],
  pagePath?: string,
): CalculatorSlug[] {
  const hub = getCountryPrefixFromPath(pagePath);
  if (!hub || hub === mainCountryPath) return [...slugs];

  return slugs.filter((slug) => {
    if (US_ONLY_RELATED.has(slug)) return false;
    if (isHubOfferedCalculator(hub, slug)) return true;
    const geoTarget = `${hub}/${slug}`;
    if (canonicalPathForSlug(slug, hub) === geoTarget) return true;
    if (WORLDWIDE_SYLLABUS_RELATED.has(slug)) return true;
    return false;
  });
}
