import type { GradingScale } from "@/types/grading-scale";

export const caStandardScale: GradingScale = {
  id: "ca-standard",
  name: "Illustrative Canadian percentage-to-GPA preset (4.0 cap)",
  country: "CA",
  gpaMax: 4.0,
  passPercent: 50,
  bands: [
    { letter: "A+", min: 90, max: 100, gpa: 4.0 },
    { letter: "A", min: 85, max: 89, gpa: 4.0 },
    { letter: "A-", min: 80, max: 84, gpa: 3.7 },
    { letter: "B+", min: 77, max: 79, gpa: 3.3 },
    { letter: "B", min: 73, max: 76, gpa: 3.0 },
    { letter: "B-", min: 70, max: 72, gpa: 2.7 },
    { letter: "C+", min: 67, max: 69, gpa: 2.3 },
    { letter: "C", min: 63, max: 66, gpa: 2.0 },
    { letter: "C-", min: 60, max: 62, gpa: 1.7 },
    { letter: "D", min: 50, max: 59, gpa: 1.0 },
    { letter: "F", min: 0, max: 49, gpa: 0.0 },
  ],
  sources: [
    "Illustrative planning preset only — not a national Canadian standard",
    "UBC and other schools advise using the evaluating body's scale for admissions conversions",
  ],
};
