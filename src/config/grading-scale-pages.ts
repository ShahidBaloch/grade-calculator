import type { ScaleId } from "@/types/grading-scale";

export interface GradingScalePageConfig {
  slug: string;
  path: string;
  scaleId: ScaleId;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  notes: string[];
}

export const gradingScalePages: GradingScalePageConfig[] = [
  {
    slug: "us",
    path: "/grading-scales/us",
    scaleId: "us-standard",
    title: "US Grading Scale (4.0 GPA)",
    description:
      "Complete US letter grade to percentage and 4.0 GPA conversion chart. A+, A, A- through F with percentage ranges.",
    keywords: ["grading scale", "us grading scale", "4.0 gpa scale", "letter grade to percentage"],
    intro:
      "The US Standard 4.0 scale is the most common grading system in American high schools and colleges. Letter grades map to percentage ranges, and each letter converts to GPA points for semester calculations.",
    notes: [
      "Many schools use plus/minus modifiers (A-, B+, etc.) with the ranges shown below.",
      "Some high schools use a 10-point scale (90–100 = A) — see US 10-point letter bands in our calculator settings.",
      "Weighted GPA (honors/AP) may add extra points beyond this table.",
    ],
  },
  {
    slug: "uk",
    path: "/grading-scales/uk",
    scaleId: "uk-degree",
    title: "UK Degree Classification Scale",
    description:
      "UK university degree classifications: First (1st), Upper Second (2:1), Lower Second (2:2), Third, and Fail with percentage boundaries.",
    keywords: ["uk grading scale", "degree classification", "2:1 grade", "first class degree"],
    intro:
      "UK universities classify undergraduate degrees using degree classes rather than a single GPA number. A First Class (1st) typically requires 70% or above.",
    notes: [
      "UK marking is often stricter — 70%+ is considered excellent (First Class).",
      "GCSE uses a separate 9–1 numeric scale — open the GCSE scale page and calculator.",
      "Postgraduate programmes may use different criteria.",
    ],
  },
  {
    slug: "australia",
    path: "/grading-scales/australia",
    scaleId: "au-seven-point",
    title: "Australian GPA Scale (7.0)",
    description:
      "Australian university grading: HD, D, C, P, F bands with percentage ranges and 7.0 GPA points.",
    keywords: ["australian gpa calculator", "australia grading scale", "hd grade", "7.0 gpa scale"],
    intro:
      "Australian universities commonly use a 7.0 GPA scale with High Distinction (HD), Distinction (D), Credit (C), and Pass (P) bands. The pass mark is typically 50%.",
    notes: [
      "Exact boundaries can vary slightly between universities.",
      "Some institutions use a 4.0 scale — check your transcript.",
      "ATAR is a separate measure for school leavers entering university.",
    ],
  },
  {
    slug: "canada",
    path: "/grading-scales/canada",
    scaleId: "ca-standard",
    title: "Canadian Grading Scale (4.0)",
    description:
      "Canadian letter grade to percentage and 4.0 GPA conversion chart for universities and colleges.",
    keywords: ["canadian grading scale", "canada gpa scale", "letter grade canada"],
    intro:
      "Canadian universities typically use a 4.0 GPA scale with letter grades. Some provinces and institutions use a 4.33 scale for A+ grades.",
    notes: [
      "Provincial standards vary — always confirm with your institution.",
      "Quebec CEGEP and some programs may use different scales.",
      "Our calculators support the Canadian Standard 4.0 preset.",
      "If your transcript awards A+ = 4.33 quality points, open the Canada 4.33 GPA reference page.",
    ],
  },
  {
    slug: "canada-433",
    path: "/grading-scales/canada-433",
    scaleId: "ca-four-three-three",
    title: "Canadian Grading Scale (4.33 GPA)",
    description:
      "Canadian letter grade chart where A+ = 4.33 GPA points — common at several universities.",
    keywords: ["canada 4.33 gpa", "canadian a+ 4.33", "ubc grading scale"],
    intro:
      "Many Canadian universities cap quality points at 4.33 and assign A+ = 4.33, A = 4.0, and so on. Percentage cutoffs often match the Canada Standard table; the difference is how A+ converts to GPA points on your transcript.",
    notes: [
      "Use this preset when your faculty calendar lists A+ = 4.33.",
      "Ontario and other provinces may still use A+ = 4.0 on a 4.0 scale — use Canada Standard instead.",
      "Canada hub calculators lock to Canada Standard; compare both tables before official submissions.",
    ],
  },
  {
    slug: "new-zealand",
    path: "/grading-scales/new-zealand",
    scaleId: "nz-nine-point",
    title: "New Zealand GPA Scale (9.0)",
    description:
      "New Zealand university grading bands with percentage ranges and 9-point GPA conversion.",
    keywords: ["nz grading scale", "new zealand gpa", "9 point gpa scale"],
    intro:
      "New Zealand universities commonly use a 9-point GPA scale. Letter grades map to percentage bands similar to other Commonwealth systems.",
    notes: [
      "NCEA uses a separate standards-based system for secondary school.",
      "University boundaries may vary slightly by institution.",
      "Our calculators use the NZ 9-point preset for university-style grading.",
    ],
  },
  {
    slug: "gcse",
    path: "/grading-scales/gcse",
    scaleId: "uk-gcse",
    title: "UK GCSE Grading Scale (9–1)",
    description:
      "England GCSE 9–1 percentage bands used in our educational converter, plus how they relate to the old A*–G letters.",
    keywords: ["gcse grading scale", "gcse 9-1", "gcse grade boundaries"],
    intro:
      "England’s GCSE 9–1 scale replaced A*–G. Grade 9 is the highest. Grade 4 is commonly a standard pass and grade 5 a strong pass. Official boundaries move every series.",
    notes: [
      "This table is an educational default for planning, not a live awarding-body boundary set.",
      "Wales and Northern Ireland may still use different letter systems.",
      "University admissions use A-levels or equivalents, not this GCSE converter.",
    ],
  },
  {
    slug: "india",
    path: "/grading-scales/india",
    scaleId: "in-ten-point",
    title: "India 10-Point CGPA Scale",
    description:
      "India university 10-point CGPA letter bands (O–F) with percentage ranges used in our calculators.",
    keywords: ["india cgpa scale", "10 point cgpa", "ugc grading scale", "cbse cgpa"],
    intro:
      "Many Indian universities use a 10-point CGPA with letter bands such as O, A+, A, and B+. Percentage conversion is separate — CBSE/UGC often uses ×9.5.",
    notes: [
      "Board marksheets and university CGPA tables are not identical — check your institution.",
      "Use the CGPA to Percentage calculator for ×9.5, ×10, and SPPU-style formulas.",
      "US applications may need a separate 4.0 conversion via WES or the target school.",
    ],
  },
  {
    slug: "pakistan",
    path: "/grading-scales/pakistan",
    scaleId: "pk-hec",
    title: "Pakistan HEC 4.0 Grading Scale",
    description:
      "Pakistan HEC Absolute grading bands on a 4.0 GPA scale with common percentage ranges.",
    keywords: ["hec grading scale", "pakistan gpa scale", "hec absolute grading"],
    intro:
      "Pakistani universities commonly follow HEC Absolute grading on a 4.0 scale (A typically 85–100%). HEC’s semester-system policy maps GPA/CGPA bands to percentage ranges rather than one universal linear rule.",
    notes: [
      "Some campuses publish slightly different A− / B+ quality points — verify your handbook.",
      "The CGPA to Percentage calculator includes a linear ×25 shortcut for planning; match your official equivalence table when it differs.",
    ],
  },
];

export const gradingScaleBySlug = Object.fromEntries(
  gradingScalePages.map((p) => [p.slug, p]),
) as Record<string, GradingScalePageConfig>;
