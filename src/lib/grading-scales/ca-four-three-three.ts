import type { GradingScale } from "@/types/grading-scale";

/** Common Canadian university scale where A+ earns 4.33 quality points (UBC, SFU, and others). */
export const caFourThreeThreeScale: GradingScale = {
  id: "ca-four-three-three",
  name: "Canada 4.33 GPA",
  country: "CA",
  gpaMax: 4.33,
  passPercent: 50,
  bands: [
    { letter: "A+", min: 90, max: 100, gpa: 4.33 },
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
  sources: ["Common Canadian 4.33 scale", "Confirm your faculty calendar"],
};
