import type { GradingScale } from "@/types/grading-scale";

/**
 * HEC Policy Guidelines for the Uniform Semester System, §13.1.
 * Percentage bands and grade-point ranges are the published table.
 * `gpa` is the top of each range, used only when a calculator needs one number.
 */
export const pkHecScale: GradingScale = {
  id: "pk-hec",
  name: "Pakistan HEC 4.0",
  country: "PK",
  gpaMax: 4.0,
  passPercent: 50,
  bands: [
    { letter: "A", min: 85, max: 100, gpa: 4.0, gpaLabel: "3.67–4.00" },
    { letter: "A-", min: 80, max: 84, gpa: 3.66, gpaLabel: "3.34–3.66" },
    { letter: "B+", min: 75, max: 79, gpa: 3.33, gpaLabel: "3.01–3.33" },
    { letter: "B", min: 71, max: 74, gpa: 3.0, gpaLabel: "2.67–3.00" },
    { letter: "B-", min: 68, max: 70, gpa: 2.66, gpaLabel: "2.34–2.66" },
    { letter: "C+", min: 64, max: 67, gpa: 2.33, gpaLabel: "2.01–2.33" },
    { letter: "C", min: 61, max: 63, gpa: 2.0, gpaLabel: "1.67–2.00" },
    { letter: "C-", min: 58, max: 60, gpa: 1.66, gpaLabel: "1.31–1.66" },
    { letter: "D+", min: 54, max: 57, gpa: 1.3, gpaLabel: "1.01–1.30" },
    { letter: "D", min: 50, max: 53, gpa: 1.0, gpaLabel: "0.10–1.00" },
    { letter: "F", min: 0, max: 49, gpa: 0.0, gpaLabel: "0.00" },
  ],
  sources: [
    {
      label: "HEC Policy Guidelines for Uniform Semester System (§13.1 fractionalized grading)",
      href: "https://www.hec.gov.pk/english/services/universities/Documents/Final%20Examination%20Policy%20Guidelines.pdf",
    },
    {
      label: "HEC downloads — Stopping of Conversion of CGPA into Percentage",
      href: "https://www.hec.gov.pk/english/services/students/DES/Pages/Downloads.aspx",
    },
  ],
};
