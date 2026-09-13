import type { CalculatorSlug } from "@/types/calculator";
import type { ScaleId } from "@/types/grading-scale";

export interface CountryHubConfig {
  code: string;
  path: string;
  name: string;
  flag: string;
  scaleId: ScaleId;
  description: string;
  gradingScalePath: string;
  featuredCalculators: CalculatorSlug[];
  keywords: string[];
}

export const countryHubs: CountryHubConfig[] = [
  {
    code: "us",
    path: "/us",
    name: "United States",
    flag: "🇺🇸",
    scaleId: "us-standard",
    description:
      "Free grade and GPA calculators for US students and teachers. US Standard 4.0 grading scale.",
    gradingScalePath: "/grading-scales/us",
    featuredCalculators: [
      "ez-grader",
      "gpa-calculator",
      "weighted-gpa-calculator",
      "final-grade-calculator",
      "canvas-grade-calculator",
      "eoc-grade-calculator",
    ],
    keywords: ["grade calculator usa", "us gpa calculator", "easy grader"],
  },
  {
    code: "uk",
    path: "/uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    scaleId: "uk-degree",
    description:
      "Grade calculators and degree classification reference for UK university students.",
    gradingScalePath: "/grading-scales/uk",
    featuredCalculators: [
      "weighted-grade-calculator",
      "final-grade-calculator",
      "gpa-calculator",
      "letter-grade-calculator",
    ],
    keywords: ["uk grade calculator", "degree classification calculator", "uk grading scale"],
  },
  {
    code: "ca",
    path: "/ca",
    name: "Canada",
    flag: "🇨🇦",
    scaleId: "ca-standard",
    description:
      "Canadian grade and GPA calculators with the 4.0 / 4.33 scale reference.",
    gradingScalePath: "/grading-scales/canada",
    featuredCalculators: [
      "gpa-calculator",
      "college-gpa-calculator",
      "weighted-grade-calculator",
      "cumulative-gpa-calculator",
    ],
    keywords: ["canada gpa calculator", "canadian grading scale", "grade calculator canada"],
  },
  {
    code: "au",
    path: "/au",
    name: "Australia",
    flag: "🇦🇺",
    scaleId: "au-seven-point",
    description:
      "Australian grade calculators using the 7.0 GPA scale and HD/D/C/P bands.",
    gradingScalePath: "/grading-scales/australia",
    featuredCalculators: [
      "gpa-calculator",
      "weighted-grade-calculator",
      "letter-grade-calculator",
      "final-grade-calculator",
    ],
    keywords: ["australian gpa calculator", "7 point gpa scale", "grade calculator australia"],
  },
  {
    code: "nz",
    path: "/nz",
    name: "New Zealand",
    flag: "🇳🇿",
    scaleId: "nz-nine-point",
    description:
      "New Zealand grade calculators with the 9-point GPA scale reference.",
    gradingScalePath: "/grading-scales/new-zealand",
    featuredCalculators: [
      "gpa-calculator",
      "weighted-grade-calculator",
      "letter-grade-calculator",
      "cumulative-gpa-calculator",
    ],
    keywords: ["nz gpa calculator", "new zealand grading scale", "grade calculator nz"],
  },
];

export const countryHubByPath = Object.fromEntries(
  countryHubs.map((hub) => [hub.path, hub]),
) as Record<string, CountryHubConfig>;
