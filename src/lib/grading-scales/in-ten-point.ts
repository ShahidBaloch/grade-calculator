import type { GradingScale } from "@/types/grading-scale";

/** Common Indian university / UGC-style 10-point letter bands (not CBSE board marks). */
export const inTenPointScale: GradingScale = {
  id: "in-ten-point",
  name: "India 10-Point CGPA",
  country: "IN",
  gpaMax: 10,
  passPercent: 40,
  bands: [
    { letter: "O", min: 90, max: 100, gpa: 10 },
    { letter: "A+", min: 80, max: 89, gpa: 9 },
    { letter: "A", min: 70, max: 79, gpa: 8 },
    { letter: "B+", min: 60, max: 69, gpa: 7 },
    { letter: "B", min: 55, max: 59, gpa: 6 },
    { letter: "C", min: 50, max: 54, gpa: 5 },
    { letter: "P", min: 40, max: 49, gpa: 4 },
    { letter: "F", min: 0, max: 39, gpa: 0 },
  ],
  sources: [
    {
      label: "UGC Choice Based Credit System guidelines (10-point letters; campuses set their own cutoffs)",
      href: "https://www.ugc.gov.in/pdfnews/8023719_Guidelines-for-CBCS.pdf",
    },
    "Letter cutoffs and any CGPA-to-percentage formula come from your university, not from one national UGC multiplier",
  ],
};
