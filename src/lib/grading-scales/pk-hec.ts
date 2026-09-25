import type { GradingScale } from "@/types/grading-scale";

/** Common HEC Absolute grading on a 4.0 scale used by many Pakistani universities. */
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
    { letter: "B", min: 70, max: 74, gpa: 3.0 },
    { letter: "B-", min: 65, max: 69, gpa: 2.66 },
    { letter: "C+", min: 60, max: 64, gpa: 2.33 },
    { letter: "C", min: 55, max: 59, gpa: 2.0 },
    { letter: "C-", min: 50, max: 54, gpa: 1.66 },
    { letter: "D", min: 45, max: 49, gpa: 1.0 },
    { letter: "F", min: 0, max: 44, gpa: 0.0 },
  ],
  sources: ["HEC Absolute grading (common university tables)", "Confirm your campus policy"],
};
