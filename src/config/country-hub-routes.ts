import type { CalculatorSlug } from "@/types/calculator";

/**
 * Routing fields of each country hub, without the hub page copy (FAQs, details,
 * keywords). Client components import this; `country-hubs.ts` holds the content.
 * A test keeps the two in sync.
 */
/** Main market. Pages with no country in the URL belong to this hub. */
export const mainCountryPath = "/us";

export interface CountryHubRoute {
  code: string;
  path: string;
  gradingScalePath: string;
  /** Decides which `/xx/slug` geo pages exist (see canonical-path). */
  featuredCalculators: readonly CalculatorSlug[];
}

export const countryHubRoutes: readonly CountryHubRoute[] = [
  {
    code: "us",
    path: "/us",
    gradingScalePath: "/grading-scales/us",
    featuredCalculators: [
      "gpa-calculator",
      "weighted-gpa-calculator",
      "final-grade-calculator",
      "canvas-grade-calculator",
      "eoc-grade-calculator",
      "uc-gpa-calculator",
      "csu-gpa-calculator",
      "middle-school-gpa-calculator",
    ],
  },
  {
    code: "ca",
    path: "/ca",
    gradingScalePath: "/grading-scales/canada",
    featuredCalculators: [
      "gpa-calculator",
      "mcmaster-gpa-to-us-gpa",
      "college-gpa-calculator",
      "weighted-grade-calculator",
      "cumulative-gpa-calculator",
      "final-grade-calculator",
      "letter-grade-calculator",
    ],
  },
  {
    code: "uk",
    path: "/uk",
    gradingScalePath: "/grading-scales/uk",
    featuredCalculators: [
      "degree-classification-calculator",
      "uk-degree-to-us-gpa-reference",
      "gcse-grade-calculator",
      "weighted-grade-calculator",
      "final-grade-calculator",
      "letter-grade-calculator",
    ],
  },
  {
    code: "au",
    path: "/au",
    gradingScalePath: "/grading-scales/australia-uq",
    featuredCalculators: [
      "atar-calculator",
      "gpa-calculator",
      "cumulative-gpa-calculator",
      "weighted-grade-calculator",
      "letter-grade-calculator",
    ],
  },
  {
    code: "nz",
    path: "/nz",
    gradingScalePath: "/grading-scales/new-zealand",
    featuredCalculators: [
      "gpa-calculator",
      "weighted-grade-calculator",
      "final-grade-calculator",
      "letter-grade-calculator",
      "cumulative-gpa-calculator",
    ],
  },
  {
    code: "in",
    path: "/in",
    gradingScalePath: "/grading-scales/india",
    featuredCalculators: [
      "cgpa-to-percentage",
      "cgpa-calculator",
      "sgpa-to-cgpa",
      "percentage-to-cgpa",
      "cgpa-to-gpa",
      "gpa-calculator",
      "final-grade-calculator",
    ],
  },
  {
    code: "pk",
    path: "/pk",
    gradingScalePath: "/grading-scales/pakistan",
    featuredCalculators: [
      "cgpa-to-percentage",
      "cgpa-calculator",
      "sgpa-to-cgpa",
      "percentage-to-cgpa",
      "gpa-calculator",
      "cumulative-gpa-calculator",
    ],
  },
];
