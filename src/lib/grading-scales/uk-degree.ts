import type { GradingScale } from "@/types/grading-scale";

export const ukDegreeScale: GradingScale = {
  id: "uk-degree",
  name: "UK Degree Classification (% bands)",
  country: "UK",
  passPercent: 40,
  bands: [
    { letter: "First (1st)", min: 70, max: 100, gpa: null },
    { letter: "Upper Second (2:1)", min: 60, max: 69, gpa: null },
    { letter: "Lower Second (2:2)", min: 50, max: 59, gpa: null },
    { letter: "Third", min: 40, max: 49, gpa: null },
    { letter: "Fail", min: 0, max: 39, gpa: null },
  ],
  sources: [
    {
      label: "QAA — The Frameworks for Higher Education Qualifications",
      href: "https://www.qaa.ac.uk/the-quality-code/qualifications-frameworks",
    },
    "Classification percentages (70 / 60 / 50 / 40) are the common UK pattern. Your programme handbook can differ.",
  ],
};
