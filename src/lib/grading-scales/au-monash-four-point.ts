import type { GradingScale } from "@/types/grading-scale";

/** Monash calculates GPA on a 4-point scale (maximum 4.0), not the 7-point model used at some other universities. */
export const auMonashFourPointScale: GradingScale = {
  id: "au-monash-four-point",
  name: "Monash University — 4-point GPA",
  country: "AU",
  gpaMax: 4.0,
  passPercent: 50,
  bands: [
    { letter: "HD", min: 80, max: 100, gpa: 4.0 },
    { letter: "D", min: 70, max: 79, gpa: 3.0 },
    { letter: "C", min: 60, max: 69, gpa: 2.0 },
    { letter: "P", min: 50, max: 59, gpa: 1.0 },
    { letter: "NP (Near Pass)", min: 45, max: 49, gpa: 0.7 },
    { letter: "F (Fail)", min: 1, max: 44, gpa: 0.3 },
    { letter: "HF (Hurdle Fail)", min: -1, max: -1, gpa: 0.3 },
    { letter: "WF (Withdrawn Fail)", min: -1, max: -1, gpa: 0.0 },
  ],
  sources: [
    "https://www.monash.edu/students/academic-progress/grades-and-results/grade-point-average",
  ],
};
