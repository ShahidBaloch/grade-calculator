import type { GradingScale } from "@/types/grading-scale";

export const usLenientScale: GradingScale = {
  id: "us-lenient",
  name: "US 10-point letter bands",
  country: "US",
  gpaMax: 4.0,
  passPercent: 60,
  bands: [
    { letter: "A", min: 90, max: 100, gpa: 4.0 },
    { letter: "B", min: 80, max: 89, gpa: 3.0 },
    { letter: "C", min: 70, max: 79, gpa: 2.0 },
    { letter: "D", min: 60, max: 69, gpa: 1.0 },
    { letter: "F", min: 0, max: 59, gpa: 0.0 },
  ],
  sources: ["Common US high school 10-point scale"],
};
