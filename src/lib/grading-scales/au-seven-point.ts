import type { GradingScale } from "@/types/grading-scale";

export const auSevenPointScale: GradingScale = {
  id: "au-seven-point",
  name: "Common Australian 7-point example scale",
  country: "AU",
  gpaMax: 7.0,
  passPercent: 50,
  bands: [
    { letter: "HD", min: 85, max: 100, gpa: 7.0 },
    { letter: "D", min: 75, max: 84, gpa: 6.0 },
    { letter: "C", min: 65, max: 74, gpa: 5.0 },
    { letter: "P", min: 50, max: 64, gpa: 4.0 },
    { letter: "F", min: 0, max: 49, gpa: 0.0 },
  ],
  sources: ["Australian university common bands", "TEQSA"],
};
