import { calculators, getCalculatorPath } from "../../config/calculators";
import { countryHubs } from "../../config/country-hubs";

import { CALCULATOR_SLUGS } from "../../types/calculator";
import {
  UK_GPA_SLUGS,
  canonicalPathForSlug,
  isIndexableGeoCalculator,
} from "./canonical-path";
import { mainCountryPath } from "../../config/country-hub-routes";

export {
  COUNTRY_SPECIFIC_SLUGS,
  canonicalPathForSlug,
  isCountrySpecificSlug,
} from "./canonical-path";

export function indexableGeoCalculatorPaths(): string[] {
  return countryHubs.flatMap((hub) =>
    hub.featuredCalculators
      .filter((slug) => isIndexableGeoCalculator(hub.path, slug))
      .map((slug) => `${hub.path}/${slug}`),
  );
}

export { isIndexableGeoCalculator } from "./canonical-path";

const STATIC_REDIRECTS: Array<{ source: string; destination: string }> = [
  { source: "/index", destination: "/" },
  { source: "/cgpa-to-gpa", destination: "/in/cgpa-to-gpa" },
  { source: "/letter-grade-to-percentage", destination: "/letter-grade-calculator" },
  { source: "/ez-grader", destination: "/" },
  { source: "/us/ez-grader", destination: "/" },
  { source: "/easy-grader", destination: "/" },
  { source: "/class-average-calculator", destination: "/average-grade-calculator" },
  { source: "/grade-average-calculator", destination: "/average-grade-calculator" },
  { source: "/grade-percentage-chart", destination: "/grade-chart" },
  { source: "/grading-chart", destination: "/grade-chart" },
  { source: "/grade-table", destination: "/grade-chart" },
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
  { source: "/gradebook-calculator", destination: "/weighted-grade-calculator" },
  { source: "/grade-tracker", destination: "/weighted-grade-calculator" },
  { source: "/midterm-calculator", destination: "/final-grade-calculator" },
  { source: "/midterm-grade-calculator", destination: "/final-grade-calculator" },
  { source: "/online-grading-calculator", destination: "/" },
  { source: "/grading-scale", destination: "/grading-scales" },
  { source: "/grade-scale", destination: "/grading-scales" },
  { source: "/grades-from-percentages", destination: "/percentage-to-letter-grade" },
  { source: "/cal-state-gpa-calculator", destination: "/csu-gpa-calculator" },
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

  for (const hub of countryHubs) {
    if (hub.path === mainCountryPath) continue;
    for (const slug of CALCULATOR_SLUGS) {
      const source = `${hub.path}/${slug}`;
      const destination = canonicalPathForSlug(slug, hub.path);
      if (source !== destination) {
        pairs.push({ source, destination });
      }
    }
  }

  const seen = new Set<string>();
  return pairs.filter((pair) => {
    if (pair.source === pair.destination || seen.has(pair.source)) return false;
    seen.add(pair.source);
    return true;
  });
}
