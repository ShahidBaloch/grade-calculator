import type { GradingScale } from "@/types/grading-scale";

export const nzNinePointScale: GradingScale = {
  id: "nz-nine-point",
  name: "New Zealand 9-Point",
  country: "NZ",
  gpaMax: 9.0,
  passPercent: 50,
  bands: [
    { letter: "A+", min: 90, max: 100, gpa: 9.0 },
    { letter: "A", min: 85, max: 89, gpa: 8.0 },
    { letter: "A-", min: 80, max: 84, gpa: 7.0 },
    { letter: "B+", min: 75, max: 79, gpa: 6.0 },
    { letter: "B", min: 70, max: 74, gpa: 5.0 },
    { letter: "B-", min: 65, max: 69, gpa: 4.0 },
    { letter: "C+", min: 60, max: 64, gpa: 3.0 },
    { letter: "C", min: 55, max: 59, gpa: 2.0 },
    { letter: "C-", min: 50, max: 54, gpa: 1.0 },
    { letter: "F", min: 0, max: 49, gpa: 0.0 },
  ],
  sources: [
    {
      label: "University of Auckland calendar — GPA is a 0–9 average",
      href: "https://www.auckland.ac.nz/en/about-us/about-the-university/the-university/official-publications/university-calendar/current-calendar/general-information/glossary-of-terms.html",
    },
    "Other New Zealand universities publish their own 9-point tables. Confirm the legend on your transcript.",
  ],
};
