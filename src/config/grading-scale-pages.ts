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
      "Some high schools use a 10-point scale (90–100 = A) — see US Lenient in our calculator settings.",
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
];

export const gradingScaleBySlug = Object.fromEntries(
  gradingScalePages.map((p) => [p.slug, p]),
) as Record<string, GradingScalePageConfig>;
