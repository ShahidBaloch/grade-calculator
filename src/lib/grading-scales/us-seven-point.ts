import type { GradingScale } from "@/types/grading-scale";

/**
 * The stricter "7-point" scale some US districts (historically many in the Southeast) use:
 * each letter spans seven percentage points and anything under 70% fails.
 */
export const usSevenPointScale: GradingScale = {
  id: "us-seven-point",
  name: "US 7-point scale (A 93+, B 85+)",
  country: "US",
  gpaMax: 4.0,
  passPercent: 70,
  bands: [
    { letter: "A", min: 93, max: 100, gpa: 4.0 },
    { letter: "B", min: 85, max: 92, gpa: 3.0 },
    { letter: "C", min: 77, max: 84, gpa: 2.0 },
    { letter: "D", min: 70, max: 76, gpa: 1.0 },
    { letter: "F", min: 0, max: 69, gpa: 0.0 },
  ],
  sources: [
    "District 7-point scale as commonly published in US high school handbooks (A 93–100, B 85–92, C 77–84, D 70–76, F below 70). Cutoffs vary by district.",
  ],
};
