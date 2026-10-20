import { absoluteUrl } from "@/config/site";
import { caUniversityProfiles, type CaUniversityProfile } from "@/data/geo-sources/ca-universities";
import { usEocStateRules, type UsEocStateRule } from "@/data/geo-sources/us-eoc-states";

/**
 * Geo pages built from verified source data (src/data/geo-sources).
 * Each one is a single-market page with no regional twin, so it stands alone in hreflang:
 * it names its own market and itself as x-default. Country GPA tools that do have twins
 * use the reciprocal group in hreflang.ts instead.
 */
export function caUniversityPath(slug: CaUniversityProfile["slug"]): string {
  return `/ca/university/${slug}-gpa-calculator`;
}

export function usEocStatePath(slug: UsEocStateRule["slug"]): string {
  return `/eoc-grade-calculator/${slug}`;
}

export function caUniversityByPageParam(param: string): CaUniversityProfile | undefined {
  return caUniversityProfiles.find((profile) => `${profile.slug}-gpa-calculator` === param);
}

export function usEocStateByParam(param: string): UsEocStateRule | undefined {
  return usEocStateRules.find((rule) => rule.slug === param);
}

export function standaloneGeoHreflang(path: string, hreflang: "en-CA" | "en-US"): Record<string, string> {
  const url = absoluteUrl(path);
  return { "x-default": url, [hreflang]: url };
}

export function geoProgrammaticPaths(): string[] {
  return [
    ...caUniversityProfiles.map((profile) => caUniversityPath(profile.slug)),
    ...usEocStateRules.map((rule) => usEocStatePath(rule.slug)),
  ];
}

export interface GeoLinkGroup {
  heading: string;
  intro: string;
  links: Array<{ href: string; title: string; description: string }>;
}

export function caUniversityLinkGroup(): GeoLinkGroup {
  return {
    heading: "University GPA calculators",
    intro:
      "Each calculator uses the grading table the university or OUAC publishes — no illustrative presets.",
    links: caUniversityProfiles.map((profile) => ({
      href: caUniversityPath(profile.slug),
      title: `${profile.name} Calculator`,
      description: profile.facts[0],
    })),
  };
}

function weightText(rule: UsEocStateRule): string {
  const { weight } = rule;
  if (weight.kind === "fixed") return `${weight.percent}% of the course grade`;
  if (weight.kind === "minimum") return `at least ${weight.percent}% of the course grade`;
  return `${weight.min}–${weight.max}% of the course grade, set by each district`;
}

export function usEocStateLinkGroup(): GeoLinkGroup {
  return {
    heading: "EOC calculators by state",
    intro: "Each state page opens with the EOC weight its statute or state board rule sets.",
    links: usEocStateRules.map((rule) => ({
      href: usEocStatePath(rule.slug),
      title: `${rule.state} EOC Grade Calculator`,
      description: `${rule.state}: the EOC counts for ${weightText(rule)} (${rule.citation}).`,
    })),
  };
}

export function eocWeightText(rule: UsEocStateRule): string {
  return weightText(rule);
}

/** Link groups a country hub lists below its calculators. */
export function hubGeoLinkGroups(hubPath: string): GeoLinkGroup[] {
  if (hubPath === "/ca") return [caUniversityLinkGroup()];
  if (hubPath === "/us") return [usEocStateLinkGroup()];
  return [];
}
