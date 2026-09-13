import type { GradingScale } from "@/types/grading-scale";

export const ukDegreeScale: GradingScale = {
  id: "uk-degree",
  name: "UK Degree Classification",
  country: "UK",
  gpaMax: 4.0,
  passPercent: 40,
  bands: [
    { letter: "First (1st)", min: 70, max: 100, gpa: 4.0 },
    { letter: "Upper Second (2:1)", min: 60, max: 69, gpa: 3.5 },
    { letter: "Lower Second (2:2)", min: 50, max: 59, gpa: 3.0 },
    { letter: "Third", min: 40, max: 49, gpa: 2.3 },
    { letter: "Fail", min: 0, max: 39, gpa: 0.0 },
  ],
  sources: ["UK higher education classification", "QAA guidelines"],
};
