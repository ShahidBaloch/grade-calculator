import type { GradingScale } from "@/types/grading-scale";

export const ukGcseScale: GradingScale = {
  id: "uk-gcse",
  name: "UK GCSE (9-1)",
  country: "UK",
  passPercent: 40,
  bands: [
    { letter: "9", min: 90, max: 100, gpa: null },
    { letter: "8", min: 80, max: 89, gpa: null },
    { letter: "7", min: 70, max: 79, gpa: null },
    { letter: "6", min: 60, max: 69, gpa: null },
    { letter: "5", min: 50, max: 59, gpa: null },
    { letter: "4", min: 40, max: 49, gpa: null },
    { letter: "3", min: 30, max: 39, gpa: null },
    { letter: "2", min: 20, max: 29, gpa: null },
    { letter: "1", min: 0, max: 19, gpa: null },
  ],
  sources: ["Ofqual GCSE grading", "England 9-1 scale"],
};
