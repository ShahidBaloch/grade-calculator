import { getCalculatorPath } from "@/config/calculator-paths";
import { calculatorBySlug } from "@/config/calculators";
import { countryHubs } from "@/config/country-hubs";
import { mainCountryPath } from "@/config/country-hub-routes";
import { canonicalPathForSlug, isIndexableGeoCalculator } from "@/lib/seo/canonical-path";
import type { NavLink } from "@/config/navigation";
import { CALCULATOR_SLUGS, type CalculatorSlug } from "@/types/calculator";

/** Slugs with an indexable geo URL for this hub (sitemap + menu). Others use worldwide paths. */
export function selectableCalculatorSlugsForHub(hubPath: string): CalculatorSlug[] {
  return CALCULATOR_SLUGS.filter((slug) => {
    if (slug === "ez-grader") return false;
    return isIndexableGeoCalculator(hubPath, slug);
  });
}

/**
 * Menu rows for a country hub: its geo tools, then the hub's other featured tools (e.g. GCSE on UK)
 * at their single canonical URL. Rows that resolve to the same page are listed once.
 */
export function hubMenuCalculatorSlugs(hubPath: string): CalculatorSlug[] {
  const hub = countryHubs.find((h) => h.path === hubPath);
  if (!hub) return [];
  const seen = new Set<string>();
  return [...selectableCalculatorSlugsForHub(hubPath), ...hub.featuredCalculators].filter((slug) => {
    if (slug === "ez-grader") return false;
    const target = canonicalPathForSlug(slug, hubPath);
    if (seen.has(target)) return false;
    seen.add(target);
    return true;
  });
}

/** Calculators dropdown for a country hub — only tools the visitor can actually open there. */
export function countryCalculatorNavLinks(hubPath: string): NavLink[] {
  const hub = countryHubs.find((h) => h.path === hubPath);
  if (!hub || hubPath === mainCountryPath) return [];

  return [
    ...hubMenuCalculatorSlugs(hubPath).map((slug) => ({
      label: calculatorBySlug[slug].name,
      href: getCalculatorPath(slug),
    })),
    { label: `All ${hub.name} tools`, href: hub.path },
    { label: "All Calculators", href: "/calculators" },
  ];
}
