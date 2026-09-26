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
    title: "Common US 4.0 GPA Scale",
    description:
      "Complete US letter grade to percentage and 4.0 GPA conversion chart. A+, A, A- through F with percentage ranges.",
    keywords: ["grading scale", "us grading scale", "4.0 gpa scale", "letter grade to percentage"],
    intro:
      "The common US 4.0 GPA scale is widely used in American high schools and colleges. Letter grades map to percentage ranges, and each letter converts to GPA points for semester calculations. Percentage cutoffs vary by school, district, college, and instructor — verify your institution's grading policy.",
    notes: [
      "Many schools use plus/minus modifiers (A-, B+, etc.) with the ranges shown below.",
      "NCES standardizes transcript study with A=4, B=3, C=2, D=1, and F=0 on a four-point framework; it does not define one national plus/minus percentage table.",
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
      "UK university degree classifications: First (1st), Upper Second (2:1), Lower Second (2:2), Third, and Fail with percentage boundaries — not US GPA.",
    keywords: ["uk grading scale", "degree classification", "2:1 grade", "first class degree"],
    intro:
      "UK universities classify undergraduate degrees using degree classes rather than a US-style GPA. Percentage marks map to First (70%+), 2:1 (60–69%), 2:2 (50–59%), Third (40–49%), and Fail below 40%.",
    notes: [
      "This table shows UK bands only — it does not assign an official US 4.0 GPA.",
      "Do not self-report converted GPAs (for example 2:1 → 3.7) unless the receiving institution requires it.",
      "For an illustrative US comparison only, open /uk-degree-to-us-gpa-reference.",
      "GCSE uses a separate 9–1 numeric scale — open the GCSE scale page and calculator.",
    ],
  },
  {
    slug: "australia",
    path: "/grading-scales/australia",
    scaleId: "au-seven-point",
    title: "Generic Australian 7-Point Example (Illustrative)",
    description:
      "Illustrative HD, D, C, P, F bands with 7.0 GPA points — not a national standard. Compare UQ and Monash presets for institution-specific tables.",
    keywords: ["australian gpa calculator", "australia grading scale", "hd grade", "7.0 gpa scale"],
    intro:
      "Many planning examples use HD, D, C, P, and F bands mapped to a 7-point GPA. Real universities publish their own scales — UQ uses 7-point GPA, Monash uses 4-point GPA, and UNSW often emphasises WAM. Treat this page as an illustrative example only.",
    notes: [
      "Grade points are not universal across Australian institutions.",
      "UQ publishes a 7-point scale — see the UQ grading scale reference page.",
      "Monash uses a 4-point GPA (maximum 4.0) — see the Monash grading scale reference page.",
      "ATAR is a separate measure for school leavers entering university.",
      "Do not use AU GPA × 4/7 as an official US GPA conversion.",
      "ATAR is a Year 12 rank — do not convert ATAR to GPA or UK classifications.",
    ],
  },
  {
    slug: "australia-uq",
    path: "/grading-scales/australia-uq",
    scaleId: "au-uq-seven-point",
    title: "University of Queensland (UQ) — 7-Point GPA",
    description:
      "UQ numeric grades 1–7 (HD through marginal fail) with illustrative percentage planning bands. Course cut-offs can vary — confirm my.UQ.",
    keywords: ["uq gpa scale", "uq grading scale", "7 point gpa uq"],
    intro:
      "The University of Queensland publishes a 7-point GPA scale for coursework grades. UQ notes that other institutions use different grading scales and GPA calculation methods — always read your own handbook.",
    notes: [
      "UQ GPA uses the numeric course grade (1–7). Grades 3, 2, and 1 are fails/marginal fails — not GPA 0.",
      "Illustrative percentage bands are for planning only; subject cut-offs can differ.",
      "Monash and other universities are not on this 7-point table.",
    ],
  },
  {
    slug: "australia-monash",
    path: "/grading-scales/australia-monash",
    scaleId: "au-monash-four-point",
    title: "Monash University — 4-Point GPA",
    description:
      "Monash HD/D/C/P/NP/F/HF/WF grade points on a 4-point GPA scale (maximum 4.0), per Monash's published GPA methodology.",
    keywords: ["monash gpa scale", "monash grading scale", "monash 4 point gpa"],
    intro:
      "Monash University calculates GPA on a 4-point grading scale with 4.0 as the maximum. This is not the same as the 7-point model used at universities such as UQ.",
    notes: [
      "Near Pass = 0.7, Fail and Hurdle Fail = 0.3, Withdrawn Fail = 0.0 — enter the transcript code (NP, F, HF, WF).",
      "Monash weights grade points by unit credit points in official GPA calculations.",
      "Select this preset in /au GPA calculators when estimating Monash coursework.",
    ],
  },
  {
    slug: "canada",
    path: "/grading-scales/canada",
    scaleId: "ca-standard",
    title: "Illustrative Canadian Percentage-to-GPA Preset (4.0 cap)",
    description:
      "Example Canadian letter bands and 4.0 GPA points for planning — not a single national standard used at every university.",
    keywords: ["canadian grading scale", "canada gpa scale", "letter grade canada"],
    intro:
      "This chart shows one illustrative way to map percentage marks to letter grades and 4.0 GPA points. Canadian universities do not share one official percentage-to-GPA conversion — UBC tells students to use the evaluating body's scale when converting for admissions, and Waterloo, Guelph, McGill, and others publish their own tables.",
    notes: [
      "Label this as a planning preset, not a “standard Canadian conversion.”",
      "Quebec CEGEP and some programs may use different scales.",
      "McMaster uses a separate 12-point GPA — use /mcmaster-gpa-to-us-gpa with McMaster's lookup, not 12 ÷ 3.",
      "If your transcript awards A+ = 4.33 quality points, open the Canada 4.33 reference page.",
    ],
  },
  {
    slug: "canada-433",
    path: "/grading-scales/canada-433",
    scaleId: "ca-four-three-three",
    title: "Illustrative Canadian Preset (A+ = 4.33 GPA)",
    description:
      "Example chart where A+ earns 4.33 quality points — used at some universities, not universal across Canada.",
    keywords: ["canada 4.33 gpa", "canadian a+ 4.33", "ubc grading scale"],
    intro:
      "Several Canadian universities record A+ as 4.33 quality points on a 4.33-cap scale. That is still institution-specific — identical percentage cutoffs are not guaranteed for every program or admissions conversion.",
    notes: [
      "Use this preset when your faculty calendar lists A+ = 4.33.",
      "Ontario and other provinces may still use A+ = 4.0 on a 4.0 scale — use the illustrative 4.0-cap preset instead.",
      "For US or international applications, follow the receiving institution's or credential evaluator's table.",
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
