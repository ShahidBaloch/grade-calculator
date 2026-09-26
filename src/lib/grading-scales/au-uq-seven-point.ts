import type { GradingScale } from "@/types/grading-scale";

/** UQ publishes a 7-point GPA scale; other universities use different methodologies. */
export const auUqSevenPointScale: GradingScale = {
  id: "au-uq-seven-point",
  name: "University of Queensland (UQ) — 7-point GPA",
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
    "https://my.uq.edu.au/information-and-services/manage-my-program/exams-and-assessment/grading-systems",
    "Study (UQ notes other institutions use different GPA scales)",
  ],
};
