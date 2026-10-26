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

/** Calculators dropdown for a country hub — only tools the visitor can actually open there. */
export function countryCalculatorNavLinks(hubPath: string): NavLink[] {
  const hub = countryHubs.find((h) => h.path === hubPath);
  if (!hub || hubPath === mainCountryPath) return [];

  return [
    ...selectableCalculatorSlugsForHub(hubPath).map((slug) => ({
      label: calculatorBySlug[slug].name,
      href: getCalculatorPath(slug),
    })),
    { label: `All ${hub.name} tools`, href: hub.path },
    { label: "All Calculators", href: "/calculators" },
  ];
}
