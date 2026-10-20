import type { OfficialSource } from "./types";

/**
 * OUAC Undergraduate Grade Conversion Table, copied cell by cell.
 * OMSAS (medicine), OLSAS (law) and ORPAS use it to put every Canadian transcript on a 4.0 scale.
 * Do not edit a value without re-reading the source page.
 */
export const OUAC_CONVERSION_SOURCE: OfficialSource = {
  publisher: "Ontario Universities' Application Centre (OUAC)",
  title: "Undergraduate Grade Conversion Table",
  href: "https://www.ouac.on.ca/guide/undergraduate-grade-conversion-table/",
  checked: "2026-10-20",
  edition: "Last updated: September 15, 2025",
  readVia:
    "ouac.on.ca blocks automated requests; read from the Internet Archive capture of 2026-02-19",
};

export const OMSAS_GPA_RULES_SOURCE: OfficialSource = {
  publisher: "Ontario Universities' Application Centre (OUAC)",
  title: "OMSAS – GPA Calculations",
  href: "https://www.ouac.on.ca/guide/omsas-gpa-calculations/",
  checked: "2026-10-20",
  readVia: "Internet Archive capture of 2026-04-28",
};

export type OmsasScaleNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type OmsasScaleKind = "numeric" | "percentage" | "alpha";

export interface OmsasPercentRow {
  min: number;
  max: number;
  points: number;
}

export interface OmsasGradeRow {
  /** Numeric grade (scales 1–2) or letter (scales 7–9) exactly as printed. */
  grade: string;
  points: number;
}

export type OmsasScale =
  | { scale: OmsasScaleNumber; kind: "percentage"; rows: OmsasPercentRow[] }
  | { scale: OmsasScaleNumber; kind: "numeric" | "alpha"; rows: OmsasGradeRow[] };

export const OMSAS_SCALES: Record<OmsasScaleNumber, OmsasScale> = {
  1: {
    scale: 1,
    kind: "numeric",
    rows: [
      { grade: "9", points: 4.0 },
      { grade: "8", points: 3.7 },
      { grade: "7", points: 3.3 },
      { grade: "6", points: 2.7 },
      { grade: "5", points: 2.3 },
      { grade: "4", points: 1.7 },
      { grade: "3", points: 0.0 },
    ],
  },
  2: {
    scale: 2,
    kind: "numeric",
    rows: [
      { grade: "8", points: 4.0 },
      { grade: "7", points: 3.7 },
      { grade: "6", points: 3.3 },
      { grade: "5", points: 2.7 },
      { grade: "4", points: 2.3 },
      { grade: "3", points: 1.7 },
      { grade: "2", points: 1.3 },
      { grade: "1", points: 0.0 },
    ],
  },
  3: {
    scale: 3,
    kind: "percentage",
    rows: [
      { min: 90, max: 100, points: 4.0 },
      { min: 85, max: 89, points: 3.9 },
      { min: 80, max: 84, points: 3.7 },
      { min: 77, max: 79, points: 3.3 },
      { min: 73, max: 76, points: 3.0 },
      { min: 70, max: 72, points: 2.7 },
      { min: 67, max: 69, points: 2.3 },
      { min: 63, max: 66, points: 2.0 },
      { min: 60, max: 62, points: 1.7 },
      { min: 57, max: 59, points: 1.3 },
      { min: 53, max: 56, points: 1.0 },
      { min: 50, max: 52, points: 0.7 },
      { min: 0, max: 49, points: 0.0 },
    ],
  },
  4: {
    scale: 4,
    kind: "percentage",
    rows: [
      { min: 93, max: 100, points: 4.0 },
      { min: 84, max: 92, points: 3.9 },
      { min: 75, max: 83, points: 3.7 },
      { min: 72, max: 74, points: 3.3 },
      { min: 69, max: 71, points: 3.0 },
      { min: 66, max: 68, points: 2.7 },
      { min: 64, max: 65, points: 2.3 },
      { min: 62, max: 63, points: 2.0 },
      { min: 60, max: 61, points: 1.7 },
      { min: 56, max: 59, points: 1.3 },
      { min: 53, max: 55, points: 1.0 },
      { min: 50, max: 52, points: 0.7 },
      { min: 0, max: 49, points: 0.0 },
    ],
  },
  5: {
    scale: 5,
    kind: "percentage",
    rows: [
      { min: 94, max: 100, points: 4.0 },
      { min: 87, max: 93, points: 3.9 },
      { min: 80, max: 86, points: 3.7 },
      { min: 75, max: 79, points: 3.3 },
      { min: 70, max: 74, points: 3.0 },
      { min: 65, max: 69, points: 2.7 },
      { min: 60, max: 64, points: 2.3 },
      { min: 55, max: 59, points: 2.0 },
      { min: 50, max: 54, points: 1.7 },
      { min: 0, max: 49, points: 0.0 },
    ],
  },
  6: {
    scale: 6,
    kind: "percentage",
    rows: [
      { min: 94, max: 100, points: 4.0 },
      { min: 85, max: 93, points: 3.9 },
      { min: 80, max: 84, points: 3.7 },
      { min: 75, max: 79, points: 3.3 },
      { min: 70, max: 74, points: 3.0 },
      { min: 65, max: 69, points: 2.7 },
      { min: 60, max: 64, points: 2.3 },
      { min: 55, max: 59, points: 2.0 },
      { min: 50, max: 54, points: 1.0 },
      { min: 0, max: 49, points: 0.0 },
    ],
  },
  7: {
    scale: 7,
    kind: "alpha",
    rows: [
      { grade: "A+", points: 4.0 },
      { grade: "A", points: 3.9 },
      { grade: "A-", points: 3.7 },
      { grade: "B+", points: 3.3 },
      { grade: "B", points: 3.0 },
      { grade: "B-", points: 2.7 },
      { grade: "C+", points: 2.3 },
      { grade: "C", points: 2.0 },
      { grade: "C-", points: 1.7 },
      { grade: "D+", points: 1.3 },
      { grade: "D", points: 1.0 },
      { grade: "D-", points: 0.7 },
      { grade: "E/F", points: 0.0 },
    ],
  },
  8: {
    scale: 8,
    kind: "alpha",
    rows: [
      { grade: "A", points: 4.0 },
      { grade: "A-", points: 3.7 },
      { grade: "B+", points: 3.3 },
      { grade: "B", points: 3.0 },
      { grade: "B-", points: 2.7 },
      { grade: "C+", points: 2.3 },
      { grade: "C", points: 2.0 },
      { grade: "C-", points: 1.7 },
      { grade: "D+", points: 1.3 },
      { grade: "D", points: 1.0 },
      { grade: "D-", points: 0.7 },
      { grade: "E/F", points: 0.0 },
    ],
  },
  9: {
    scale: 9,
    kind: "alpha",
    rows: [
      { grade: "A+", points: 4.0 },
      { grade: "A", points: 3.8 },
      { grade: "B+", points: 3.3 },
      { grade: "B", points: 3.0 },
      { grade: "C+", points: 2.3 },
      { grade: "C", points: 2.0 },
      { grade: "D+", points: 1.3 },
      { grade: "D", points: 1.0 },
      { grade: "E/F", points: 0.0 },
    ],
  },
};

/** "Which scale does my institution use?" — names exactly as OUAC prints them. */
export const OMSAS_UNIVERSITY_SCALES: Array<{ name: string; scales: OmsasScaleNumber[] }> = [
  { name: "Acadia", scales: [7] },
  { name: "Alberta", scales: [7] },
  { name: "Algoma", scales: [3] },
  { name: "Athabasca", scales: [7] },
  { name: "Bishop’s", scales: [3] },
  { name: "Brandon", scales: [7] },
  { name: "Brock", scales: [3] },
  { name: "Calgary", scales: [7] },
  { name: "Cape Breton", scales: [3] },
  { name: "Carleton", scales: [7] },
  { name: "Capilano", scales: [7] },
  { name: "Concordia", scales: [7] },
  { name: "Dalhousie", scales: [3, 7] },
  { name: "Guelph", scales: [3] },
  { name: "Lakehead", scales: [3] },
  { name: "Laurentian", scales: [7] },
  { name: "Laval", scales: [7] },
  { name: "Lethbridge", scales: [7] },
  { name: "Manitoba", scales: [9] },
  { name: "McGill", scales: [8] },
  { name: "McMaster", scales: [7] },
  { name: "Memorial", scales: [6] },
  { name: "Moncton", scales: [7] },
  { name: "Montreal", scales: [7] },
  { name: "Mt. Allison", scales: [7] },
  { name: "Mt. Royal", scales: [7] },
  { name: "Mt. St. Vincent", scales: [7] },
  { name: "New Brunswick", scales: [7] },
  { name: "Nipissing", scales: [3] },
  { name: "OCAD", scales: [3] },
  { name: "Ontario Tech", scales: [7] },
  { name: "Ottawa", scales: [7] },
  { name: "Prince Edward Island", scales: [3] },
  { name: "Quebec", scales: [7] },
  { name: "Queen’s", scales: [3, 7] },
  { name: "Quest", scales: [8] },
  { name: "Regina", scales: [3] },
  { name: "RMC", scales: [4, 7] },
  { name: "Royal Roads", scales: [7] },
  { name: "Saskatchewan", scales: [3] },
  { name: "Sherbrooke", scales: [7] },
  { name: "Simon Fraser", scales: [7] },
  { name: "St. Francis Xavier", scales: [3] },
  { name: "St. Mary’s", scales: [7] },
  { name: "St. Thomas", scales: [7] },
  { name: "Ste-Anne", scales: [7] },
  { name: "Thompson Rivers", scales: [7] },
  { name: "Toronto", scales: [3, 7] },
  { name: "Toronto Met", scales: [7] },
  { name: "Trent", scales: [3] },
  { name: "Trinity Western", scales: [7] },
  { name: "UBC", scales: [7] },
  { name: "UNBC", scales: [7] },
  { name: "Victoria", scales: [3, 7] },
  { name: "Waterloo", scales: [3, 7] },
  { name: "Western", scales: [3] },
  { name: "Wilfrid Laurier", scales: [7] },
  { name: "Windsor", scales: [3, 7] },
  { name: "Winnipeg", scales: [7] },
  { name: "York", scales: [9] },
];

/** OMSAS course weights ("Courses are weighted according to the length of study"). */
export const OMSAS_COURSE_WEIGHTS = [
  { label: "Full-year course", weight: 2 },
  { label: "Half-year or semester course", weight: 1 },
  { label: "Three-quarter course", weight: 1.5 },
  { label: "Lab course", weight: 0.5 },
] as const;

/** Rules quoted from OMSAS – GPA Calculations. */
export const OMSAS_RULES = {
  scale:
    "OMSAS uses a 4.0 scale. We will convert your grades using the Undergraduate Grade Conversion Table and the scale noted for your university in the table. Do not attempt to reconcile alpha grades to any of the percentage scales.",
  bothGradeTypes:
    "Where both letter and percentage grades are reported on the transcript, we will use the percentage grade, except for the University of British Columbia, where we will use letter grades.",
  repeatedCourses:
    "We will include the original and repeated grade in the OMSAS GPA if both grades appear on your official transcript.",
  allCourses:
    "All courses and grades, including failed, incomplete and supplementary courses, and courses extra to degree requirements.",
  cumulative:
    "We calculate the cumulative average by adding all the course weights and all the converted grades, then dividing the total course weights into the total converted grades.",
  schoolDiscretion:
    "Each medical school may use a different GPA than OMSAS calculates, based on its own admission criteria.",
  conversionTableNote: "The Conversion Table is used for converting individual grades only.",
} as const;
