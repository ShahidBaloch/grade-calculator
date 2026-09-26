import type { GradingScale } from "@/types/grading-scale";

export const usStandardScale: GradingScale = {
  id: "us-standard",
  name: "Common US 4.0 GPA Scale",
  country: "US",
  gpaMax: 4.0,
  passPercent: 60,
  bands: [
    { letter: "A+", min: 97, max: 100, gpa: 4.0 },
    { letter: "A", min: 93, max: 96, gpa: 4.0 },
    { letter: "A-", min: 90, max: 92, gpa: 3.7 },
    { letter: "B+", min: 87, max: 89, gpa: 3.3 },
    { letter: "B", min: 83, max: 86, gpa: 3.0 },
    { letter: "B-", min: 80, max: 82, gpa: 2.7 },
    { letter: "C+", min: 77, max: 79, gpa: 2.3 },
    { letter: "C", min: 73, max: 76, gpa: 2.0 },
    { letter: "C-", min: 70, max: 72, gpa: 1.7 },
    { letter: "D+", min: 67, max: 69, gpa: 1.3 },
    { letter: "D", min: 63, max: 66, gpa: 1.0 },
    { letter: "D-", min: 60, max: 62, gpa: 0.7 },
    { letter: "F", min: 0, max: 59, gpa: 0.0 },
  ],
  sources: [
    {
      label: "NCES Condition of Education — GPA is reported by schools, not one national letter table",
      href: "https://nces.ed.gov/programs/coe/",
    },
    "Percentage bands below are a common collegiate example. Your syllabus controls the cutoffs.",
  ],
};
