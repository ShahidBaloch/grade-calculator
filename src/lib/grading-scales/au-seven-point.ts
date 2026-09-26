import type { GradingScale } from "@/types/grading-scale";

export const auSevenPointScale: GradingScale = {
  id: "au-seven-point",
  name: "Generic Australian example (7-point HD/D/C/P) — illustrative only",
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
  sources: [
    "Illustrative planning bands only — not UQ, Monash, or any national standard",
    "Monash University uses a separate 4.0 GPA scale — select the Monash preset or /grading-scales/australia-monash",
    {
      label: "TEQSA — Australian higher education quality framework",
      href: "https://www.teqsa.gov.au/",
    },
  ],
};
