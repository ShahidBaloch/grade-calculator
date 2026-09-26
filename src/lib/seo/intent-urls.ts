import { calculators, getCalculatorPath } from "../../config/calculators";
import { countryHubs } from "../../config/country-hubs";
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

const UK_GPA_SLUGS = new Set<CalculatorSlug>([
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

export function indexableGeoCalculatorPaths(): string[] {
  return countryHubs.flatMap((hub) =>
    hub.featuredCalculators
      .filter((slug) => isCountrySpecificSlug(hub.path, slug))
      .map((slug) => `${hub.path}/${slug}`),
  );
}

const STATIC_REDIRECTS: Array<{ source: string; destination: string }> = [
  { source: "/letter-grade-to-percentage", destination: "/letter-grade-calculator" },
  { source: "/ez-grader", destination: "/" },
  { source: "/us/ez-grader", destination: "/" },
  { source: "/easy-grader", destination: "/" },
  { source: "/average-grade-calculator", destination: "/weighted-grade-calculator" },
  { source: "/grading-calculator", destination: "/" },
  { source: "/class-grade-calculator", destination: "/weighted-grade-calculator" },
  { source: "/course-grade-calculator", destination: "/weighted-grade-calculator" },
  { source: "/overall-grade-calculator", destination: "/weighted-grade-calculator" },
  { source: "/grade-book-calculator", destination: "/weighted-grade-calculator" },
  { source: "/final-exam-grade-calculator", destination: "/final-grade-calculator" },
  { source: "/exam-grade-calculator", destination: "/test-grade-calculator" },
  { source: "/semester-gpa-calculator", destination: "/gpa-calculator" },
  { source: "/grade-calculator-final", destination: "/final-grade-calculator" },
  { source: "/percent-to-letter-grade", destination: "/percentage-to-letter-grade" },
  { source: "/blackboard-grade-calculator", destination: "/weighted-grade-calculator" },
  { source: "/moodle-grade-calculator", destination: "/weighted-grade-calculator" },
  { source: "/google-classroom-grade-calculator", destination: "/weighted-grade-calculator" },
  { source: "/csu-gpa-calculator", destination: "/uc-gpa-calculator" },
  { source: "/california-gpa-calculator", destination: "/uc-gpa-calculator" },
  { source: "/jr-high-gpa-calculator", destination: "/middle-school-gpa-calculator" },
  { source: "/junior-high-gpa-calculator", destination: "/middle-school-gpa-calculator" },
];

/** 301 map. Sources must not be indexed. */
export function seoRedirects(): Array<{ source: string; destination: string }> {
  const pairs = [...STATIC_REDIRECTS];

  for (const calculator of calculators) {
    const destination = getCalculatorPath(calculator.slug);
    if (calculator.path !== destination) {
      pairs.push({ source: calculator.path, destination });
    }
  }

  for (const hub of countryHubs) {
    for (const slug of hub.featuredCalculators) {
      const source = `${hub.path}/${slug}`;
      const destination = canonicalPathForSlug(slug, hub.path);
      if (source !== destination) pairs.push({ source, destination });
    }
  }

  for (const slug of UK_GPA_SLUGS) {
    pairs.push({
      source: `/uk/${slug}`,
      destination: "/uk/degree-classification-calculator",
    });
  }

  const seen = new Set<string>();
  return pairs.filter((pair) => {
    if (pair.source === pair.destination || seen.has(pair.source)) return false;
    seen.add(pair.source);
    return true;
  });
}
