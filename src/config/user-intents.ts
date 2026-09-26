/** Intent-based navigation — helps users pick the right tool without reading the full catalog. */

export interface UserIntentItem {
  href: string;
  label: string;
  /** Shorter label for mobile quick-switch chips. */
  shortLabel?: string;
  description: string;
  /** Extra paths that should highlight this intent (e.g. geo routes). */
  alsoActiveOn?: string[];
}

export interface UserIntentGroup {
  title: string;
  items: UserIntentItem[];
}

export const USER_INTENT_GROUPS: UserIntentGroup[] = [
  {
    title: "I want to…",
    items: [
      {
        href: "/",
        label: "Grade a test or quiz",
        shortLabel: "EZ Grader",
        description: "EZ Grader — enter total questions and wrong answers",
        alsoActiveOn: ["/ez-grader"],
      },
      {
        href: "/weighted-grade-calculator",
        label: "Calculate a course average",
        shortLabel: "Weighted",
        description: "Weighted categories (homework, tests, projects)",
      },
      {
        href: "/final-grade-calculator",
        label: "See what I need on the final",
        shortLabel: "Final",
        description: "Target grade with a known final exam weight",
      },
      {
        href: "/gpa-calculator",
        label: "Calculate semester GPA",
        shortLabel: "GPA",
        description: "Letter grades and credit hours on your scale",
      },
      {
        href: "/percentage-to-letter-grade",
        label: "Turn a % into a letter grade",
        description: "Uses the grading scale you select",
      },
    ],
  },
  {
    title: "Start with your country",
    items: [
      {
        href: "/us",
        label: "United States",
        description: "US 4.0 GPA, finals, EOC, Canvas-style weights",
      },
      {
        href: "/ca",
        label: "Canada",
        description: "Illustrative 4.0 preset and McMaster lookup",
      },
      {
        href: "/uk",
        label: "United Kingdom",
        description: "Degree class, GCSE bands — not US GPA by default",
      },
      {
        href: "/au",
        label: "Australia",
        description: "UQ / Monash GPA presets and ATAR planning",
      },
      {
        href: "/nz",
        label: "New Zealand",
        description: "9-point university GPA example",
      },
    ],
  },
  {
    title: "Specialist tools",
    items: [
      {
        href: "/degree-classification-calculator",
        label: "UK degree classification",
        description: "First, 2:1, 2:2, Third from module marks",
        alsoActiveOn: ["/uk/degree-classification-calculator"],
      },
      {
        href: "/atar-calculator",
        label: "ATAR estimate (Australia)",
        description: "Scaled scores by state — planning only",
        alsoActiveOn: ["/au/atar-calculator"],
      },
      {
        href: "/gcse-grade-calculator",
        label: "GCSE 9–1 bands",
        description: "Percentage to grade 9–1",
      },
      {
        href: "/canvas-grade-calculator",
        label: "Canvas assignment groups",
        description: "Match LMS category weights",
      },
    ],
  },
];

export const COMPACT_INTENT_HREFS = [
  "/",
  "/weighted-grade-calculator",
  "/final-grade-calculator",
  "/gpa-calculator",
  "/calculators",
] as const;

export function isIntentActive(pathname: string, item: UserIntentItem): boolean {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const targets = [item.href, ...(item.alsoActiveOn ?? [])].map((p) =>
    p.replace(/\/$/, "") || "/",
  );
  if (targets.some((t) => normalized === t)) return true;
  if (item.href !== "/" && normalized.endsWith(item.href)) return true;
  for (const extra of item.alsoActiveOn ?? []) {
    if (extra !== "/" && normalized.endsWith(extra)) return true;
  }
  return false;
}
