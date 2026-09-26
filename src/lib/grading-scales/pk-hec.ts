import type { GradingScale } from "@/types/grading-scale";

/**
 * HEC Uniform Semester System fractionalized grading (Policy Guidelines §13.1).
 * Percentage bands and grade-point ranges follow the published equivalence table;
 * quality points shown are illustrative tops of each band — campuses may round differently.
 */
export const pkHecScale: GradingScale = {
  id: "pk-hec",
  name: "Pakistan HEC 4.0",
  country: "PK",
  gpaMax: 4.0,
  passPercent: 50,
  bands: [
    { letter: "A", min: 85, max: 100, gpa: 4.0 },
    { letter: "A-", min: 80, max: 84, gpa: 3.66 },
    { letter: "B+", min: 75, max: 79, gpa: 3.33 },
    { letter: "B", min: 71, max: 74, gpa: 3.0 },
    { letter: "B-", min: 68, max: 70, gpa: 2.66 },
    { letter: "C+", min: 64, max: 67, gpa: 2.33 },
    { letter: "C", min: 61, max: 63, gpa: 2.0 },
    { letter: "C-", min: 58, max: 60, gpa: 1.66 },
    { letter: "D+", min: 54, max: 57, gpa: 1.3 },
    { letter: "D", min: 50, max: 53, gpa: 1.0 },
    { letter: "F", min: 0, max: 49, gpa: 0.0 },
  ],
  sources: [
    "HEC Policy Guidelines for Uniform Semester System (§13.1 fractionalized grading)",
    "Confirm your campus marks-to-grade table",
  ],
};
