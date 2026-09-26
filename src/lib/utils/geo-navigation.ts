import { countryHubs } from "@/config/country-hubs";
import { getCalculatorPath } from "@/config/calculators";
import { getMarketFromGeoCountry } from "@/lib/grading-scales/geo-scale";
import { resolveCalculatorPath } from "@/lib/utils/country-path";
import type { CalculatorSlug } from "@/types/calculator";
import type { CountryCode } from "@/types/grading-scale";

const GPA_SLUGS = new Set<CalculatorSlug>([
  "gpa-calculator",
  "college-gpa-calculator",
  "cumulative-gpa-calculator",
  "weighted-gpa-calculator",
  "high-school-gpa-calculator",
  "raise-gpa-calculator",
]);

export function hubPathForCountry(isoCountry: string | null | undefined): string | null {
  const market = getMarketFromGeoCountry(isoCountry);
  if (!market) return null;
  const hub = countryHubs.find((item) => item.code === market.toLowerCase());
  return hub?.path ?? null;
}

/** Where a tool should open for this visitor. Worldwide URL when location is unknown. */
export function pathForTool(slug: CalculatorSlug, isoCountry: string | null | undefined): string {
  const hubPath = hubPathForCountry(isoCountry);
  if (!hubPath) return getCalculatorPath(slug);
  return resolveCalculatorPath(slug, hubPath);
}

export interface GeoPageHint {
  message: string;
  href: string;
  linkLabel: string;
}

/**
 * One optional line when the open page is a poor match for the visitor's country.
 * No hint on country hubs (the URL already chose the context) or when location is unknown.
 */
export function geoPageHint(
  pathname: string | null | undefined,
  isoCountry: string | null | undefined,
): GeoPageHint | null {
  const market = getMarketFromGeoCountry(isoCountry);
  if (!market || !pathname) return null;

  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/" || countryHubs.some((hub) => path === hub.path || path.startsWith(`${hub.path}/`))) {
    return null;
  }

  if (market === "UK" && isWorldwideGpaPath(path)) {
    return {
      message: "In the UK, results are usually a degree class, not a 4.0 GPA.",
      href: "/uk/degree-classification-calculator",
      linkLabel: "Open the UK calculator",
    };
  }

  if (market === "AU" && isWorldwideGpaPath(path)) {
    return {
      message: "Australian universities use their own GPA scales.",
      href: "/au/gpa-calculator",
      linkLabel: "Open the Australia GPA calculator",
    };
  }

  if (market === "CA" && path === "/gpa-calculator") {
    return {
      message: "Canadian GPA tables differ by university.",
      href: "/ca/gpa-calculator",
      linkLabel: "Open the Canada GPA calculator",
    };
  }

  if (market === "AU" && path === "/atar-calculator") {
    return {
      message: "ATAR rules depend on your state.",
      href: "/au/atar-calculator",
      linkLabel: "Open the Australia ATAR calculator",
    };
  }

  return null;
}

function isWorldwideGpaPath(path: string): boolean {
  return [...GPA_SLUGS].some((slug) => getCalculatorPath(slug) === path);
}

export function quickToolsForCountry(isoCountry: string | null | undefined): Array<{
  href: string;
  label: string;
}> {
  const market: CountryCode | null = getMarketFromGeoCountry(isoCountry);
  const gpaSlug: CalculatorSlug = market === "UK" ? "degree-classification-calculator" : "gpa-calculator";
  const gpaLabel = market === "UK" ? "Degree class" : "GPA";

  const links: Array<{ slug: CalculatorSlug; label: string }> = [
    { slug: "weighted-grade-calculator", label: "Course average" },
    { slug: "final-grade-calculator", label: "Final exam" },
    { slug: gpaSlug, label: gpaLabel },
  ];

  if (market === "AU") {
    links.push({ slug: "atar-calculator", label: "ATAR" });
  }
  if (market === "UK") {
    links.push({ slug: "gcse-grade-calculator", label: "GCSE" });
  }

  return links.map((item) => ({
    label: item.label,
    href: pathForTool(item.slug, isoCountry),
  }));
}
