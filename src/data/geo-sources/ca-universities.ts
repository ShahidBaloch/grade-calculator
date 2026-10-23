import { OMSAS_GPA_RULES_SOURCE, OUAC_CONVERSION_SOURCE, type OmsasScaleNumber } from "./omsas";
import type { DroppedCandidate, OfficialSource } from "./types";

/** One row of a university's own percentage → letter (→ points) table. */
export interface UniversityBand {
  letter: string;
  min: number;
  max: number;
  /** Grade points on the university's own scale; absent when the school publishes no points. */
  points?: number;
}

export interface CourseWeightOption {
  label: string;
  weight: number;
}

export type UniversityResultKind =
  /** Credit-weighted grade points (U of T, OMSAS). */
  | "gpa"
  /** Credit-weighted percentage average (UBC, Waterloo, Guelph). */
  | "percent-average";

export interface CaUniversityProfile {
  /** URL segment: /ca/university/{slug}-gpa-calculator */
  slug: "omsas" | "ubc" | "uoft" | "waterloo" | "guelph";
  name: string;
  shortName: string;
  province: string;
  /** Native result the school itself reports. */
  result: UniversityResultKind;
  /** Grades the student types in. */
  gradeInput: "percent" | "percent-or-letter";
  /** Name of the course-weight field on the transcript. */
  weightLabel: string;
  weightOptions: CourseWeightOption[];
  defaultWeight: number;
  /** University's own table; empty for OMSAS (which uses the OUAC table). */
  bands: UniversityBand[];
  /** OUAC scales assigned to this school (percentage scale first). */
  omsasScales: OmsasScaleNumber[];
  /** OMSAS course weight = native weight × factor (e.g. U of T 0.5 half course → OMSAS 1). */
  omsasWeightFactor: number;
  /** Facts copied from the sources, used in page copy. */
  facts: string[];
  sources: OfficialSource[];
}

const CHECKED = "2026-10-20";

const UBC_CALENDAR: OfficialSource = {
  publisher: "The University of British Columbia",
  title: "UBC Vancouver Academic Calendar — Grading Practices: Introduction",
  href: "https://vancouver.calendar.ubc.ca/campus-wide-policies-and-regulations/grading-practices/introduction",
  checked: CHECKED,
};

const UBC_ARTS: OfficialSource = {
  publisher: "UBC Faculty of Arts",
  title: "Promotion, Continuation & Grading — GPA Equivalency",
  href: "https://www.arts.ubc.ca/degree-planning/academic-performance/promotion-continuation-grading/",
  checked: CHECKED,
};

const UOFT_POLICY: OfficialSource = {
  publisher: "University of Toronto Governing Council",
  title: "Grading Practices Policy, University Assessment and (January 1, 2020)",
  href: "https://governingcouncil.utoronto.ca/secretariat/policies/grading-practices-policy-university-assessment-and-january-1-2020",
  checked: CHECKED,
};

const UOFT_ARTSCI: OfficialSource = {
  publisher: "University of Toronto Faculty of Arts & Science",
  title: "Academic Calendar — Academic Record (Grade Point Average)",
  href: "https://artsci.calendar.utoronto.ca/academic-record",
  checked: CHECKED,
};

const WATERLOO_CALENDAR: OfficialSource = {
  publisher: "University of Waterloo",
  title: "Undergraduate Studies Academic Calendar 2023-2024 — Grades",
  href: "https://academic-calendar-archive.uwaterloo.ca/undergraduate-studies/2023-2024/page/Acad-Regs-Grades.html",
  checked: CHECKED,
  edition: "2023-2024 calendar (latest edition published as static pages)",
};

const WATERLOO_SCIENCE: OfficialSource = {
  publisher: "University of Waterloo Science Undergraduate Office",
  title: "Grades and academic standings — calculating your average",
  href: "https://uwaterloo.ca/science-undergraduate-office/academic-information/grades-and-academic-standings",
  checked: CHECKED,
};

const GUELPH_CHECKED = "2026-10-23";
// calendar.uoguelph.ca did not resolve on 2026-10-23, so the pages were read from Internet Archive copies.
const guelphReadVia = (capture: string) =>
  `calendar.uoguelph.ca was unreachable; read from the Internet Archive capture of ${capture}`;

const GUELPH_GRADES: OfficialSource = {
  publisher: "University of Guelph",
  title: "Undergraduate Calendar — VIII. Undergraduate Degree Regulations and Procedures: Grades",
  href: "https://calendar.uoguelph.ca/undergraduate-calendar/undergraduate-degree-regulations-procedures/grades/",
  checked: GUELPH_CHECKED,
  edition: "2026-2027 Academic Calendar",
  readVia: guelphReadVia("2026-06-09"),
};

const GUELPH_GLOSSARY: OfficialSource = {
  publisher: "University of Guelph",
  title: "Undergraduate Calendar — Glossary (Cumulative Average, Semester Average, Weighted Course Total)",
  href: "https://calendar.uoguelph.ca/undergraduate-calendar/glossary/",
  checked: GUELPH_CHECKED,
  edition: "2026-2027 Academic Calendar",
  readVia: guelphReadVia("2026-06-09"),
};

const GUELPH_FAILED_COURSES: OfficialSource = {
  publisher: "University of Guelph",
  title: "Undergraduate Calendar — Failed Courses (Repeating Failed Courses)",
  href: "https://calendar.uoguelph.ca/undergraduate-calendar/undergraduate-degree-regulations-procedures/failed-courses/",
  checked: GUELPH_CHECKED,
  edition: "2026-2027 Academic Calendar",
  readVia: guelphReadVia("2026-04-21"),
};

const GUELPH_DEANS_HONOURS: OfficialSource = {
  publisher: "University of Guelph",
  title: "Undergraduate Calendar — Dean's Honours List",
  href: "https://calendar.uoguelph.ca/undergraduate-calendar/undergraduate-degree-regulations-procedures/deans-honours-list/",
  checked: GUELPH_CHECKED,
  edition: "2026-2027 Academic Calendar",
  readVia: guelphReadVia("2026-04-21"),
};

/** Guelph undergraduate grading system (Senate, effective Spring 1992). No grade points are published. */
export const GUELPH_BANDS: UniversityBand[] = [
  { letter: "A+", min: 90, max: 100 },
  { letter: "A", min: 85, max: 89 },
  { letter: "A-", min: 80, max: 84 },
  { letter: "B+", min: 77, max: 79 },
  { letter: "B", min: 73, max: 76 },
  { letter: "B-", min: 70, max: 72 },
  { letter: "C+", min: 67, max: 69 },
  { letter: "C", min: 63, max: 66 },
  { letter: "C-", min: 60, max: 62 },
  { letter: "D+", min: 57, max: 59 },
  { letter: "D", min: 53, max: 56 },
  { letter: "D-", min: 50, max: 52 },
  { letter: "F", min: 0, max: 49 },
];

/** Guelph Dean's Honours List threshold (semester average, full-time). */
export const GUELPH_DEANS_HONOURS_AVERAGE = 80;

/** UBC Vancouver, "In most faculties, individual courses are normally graded as follows". */
export const UBC_BANDS: UniversityBand[] = [
  { letter: "A+", min: 90, max: 100 },
  { letter: "A", min: 85, max: 89 },
  { letter: "A-", min: 80, max: 84 },
  { letter: "B+", min: 76, max: 79 },
  { letter: "B", min: 72, max: 75 },
  { letter: "B-", min: 68, max: 71 },
  { letter: "C+", min: 64, max: 67 },
  { letter: "C", min: 60, max: 63 },
  { letter: "C-", min: 55, max: 59 },
  { letter: "D", min: 50, max: 54 },
  { letter: "F", min: 0, max: 49 },
];

/**
 * UBC Arts "Percentage equivalencies using a 4.33 GPA scale" (50–90%).
 * UBC itself says the evaluating body's scale decides any official conversion.
 */
export const UBC_ARTS_433_EQUIVALENCY: Record<number, number> = {
  90: 4.33, 89: 4.3, 88: 4.2, 87: 4.1, 86: 4, 85: 3.95, 84: 3.9, 83: 3.85, 82: 3.8, 81: 3.75,
  80: 3.7, 79: 3.6, 78: 3.5, 77: 3.4, 76: 3.3, 75: 3.2, 74: 3.1, 73: 3, 72: 2.95, 71: 2.9,
  70: 2.8, 69: 2.7, 68: 2.65, 67: 2.6, 66: 2.55, 65: 2.5, 64: 2.4, 63: 2.3, 62: 2.2, 61: 2.1,
  60: 2, 59: 1.9, 58: 1.8, 57: 1.7, 56: 1.6, 55: 1.5, 54: 1.4, 53: 1.3, 52: 1.2, 51: 1.1, 50: 1,
};

/** U of T undergraduate Refined Letter Grade Scale (policy section 1.2.1). */
export const UOFT_BANDS: UniversityBand[] = [
  { letter: "A+", min: 90, max: 100, points: 4.0 },
  { letter: "A", min: 85, max: 89, points: 4.0 },
  { letter: "A-", min: 80, max: 84, points: 3.7 },
  { letter: "B+", min: 77, max: 79, points: 3.3 },
  { letter: "B", min: 73, max: 76, points: 3.0 },
  { letter: "B-", min: 70, max: 72, points: 2.7 },
  { letter: "C+", min: 67, max: 69, points: 2.3 },
  { letter: "C", min: 63, max: 66, points: 2.0 },
  { letter: "C-", min: 60, max: 62, points: 1.7 },
  { letter: "D+", min: 57, max: 59, points: 1.3 },
  { letter: "D", min: 53, max: 56, points: 1.0 },
  { letter: "D-", min: 50, max: 52, points: 0.7 },
  { letter: "F", min: 0, max: 49, points: 0.0 },
];

/** Waterloo: any grade 0–32 counts as 32 in averages for promotions and awards. */
export const WATERLOO_AVERAGE_FLOOR = 32;

/** U of T Arts & Science standing thresholds (cumulative GPA). */
export const UOFT_STANDING = {
  goodStanding: 1.5,
  distinction: 3.2,
  highDistinction: 3.5,
  minimumCreditsForDistinction: 5.0,
} as const;

export const caUniversityProfiles: CaUniversityProfile[] = [
  {
    slug: "omsas",
    name: "OMSAS (Ontario medical school) GPA",
    shortName: "OMSAS",
    province: "Ontario",
    result: "gpa",
    gradeInput: "percent-or-letter",
    weightLabel: "Course length",
    weightOptions: [
      { label: "Half-year / semester (1)", weight: 1 },
      { label: "Full-year (2)", weight: 2 },
      { label: "Three-quarter (1.5)", weight: 1.5 },
      { label: "Lab (0.5)", weight: 0.5 },
    ],
    defaultWeight: 1,
    bands: [],
    omsasScales: [3, 7],
    omsasWeightFactor: 1,
    facts: [
      "OMSAS converts every course grade to a 4.0 scale using the OUAC Undergraduate Grade Conversion Table and the scale listed for your university.",
      "Courses are weighted by length: full-year 2, half-year or semester 1, three-quarter 1.5, lab 0.5.",
      "Where a transcript shows both letters and percentages, OMSAS uses the percentage — except for UBC, where it uses letter grades.",
      "Failed, incomplete and supplementary courses, repeated courses (original and repeat) and courses extra to your degree all count.",
      "Each Ontario medical school may calculate its own GPA from your record; the OMSAS GPA is the common starting point.",
    ],
    sources: [OUAC_CONVERSION_SOURCE, OMSAS_GPA_RULES_SOURCE],
  },
  {
    slug: "ubc",
    name: "UBC GPA & Average",
    shortName: "UBC",
    province: "British Columbia",
    result: "percent-average",
    gradeInput: "percent",
    weightLabel: "Credits",
    weightOptions: [
      { label: "3 credits (one term)", weight: 3 },
      { label: "6 credits (two terms)", weight: 6 },
      { label: "1 credit", weight: 1 },
      { label: "4 credits", weight: 4 },
    ],
    defaultWeight: 3,
    bands: UBC_BANDS,
    omsasScales: [7],
    omsasWeightFactor: 1 / 3,
    facts: [
      "For grading, UBC uses a percentage scale and equivalent letter grades.",
      "In most UBC Vancouver faculties an A+ is 90–100%, an A is 85–89% and an A- is 80–84%; a D is 50–54% and anything below 50% is an F.",
      "UBC does not publish a single official GPA conversion: to find a 4.0 or 4.33 equivalent you need the evaluating body's scale.",
      "UBC Arts publishes percentage equivalencies on a 4.33 scale, from 90% = 4.33 down to 50% = 1.0.",
      "OUAC lists UBC under alpha Scale 7, and OMSAS uses UBC letter grades even when percentages are on the transcript.",
    ],
    sources: [UBC_CALENDAR, UBC_ARTS, OUAC_CONVERSION_SOURCE, OMSAS_GPA_RULES_SOURCE],
  },
  {
    slug: "uoft",
    name: "University of Toronto GPA",
    shortName: "U of T",
    province: "Ontario",
    result: "gpa",
    gradeInput: "percent-or-letter",
    weightLabel: "Course weight",
    weightOptions: [
      { label: "Half course (0.5)", weight: 0.5 },
      { label: "Full course (1.0)", weight: 1 },
    ],
    defaultWeight: 0.5,
    bands: UOFT_BANDS,
    omsasScales: [3, 7],
    omsasWeightFactor: 2,
    facts: [
      "U of T undergraduate courses use the Refined Letter Grade Scale: A+ (90–100%) and A (85–89%) both earn 4.0, and A- (80–84%) earns 3.7.",
      "Your GPA is the weighted sum of grade points — a full-credit course weighs 1.0 and a half-credit course 0.5 — divided by the number of courses that earned grade points.",
      "Arts & Science reports a sessional, an annual and a cumulative GPA.",
      "A cumulative GPA of 1.50 or higher keeps you in good standing in Arts & Science.",
      "Arts & Science graduates with a cumulative GPA of 3.50 or above graduate With High Distinction; 3.20–3.49 is With Distinction (based on at least 5.0 credits).",
    ],
    sources: [UOFT_POLICY, UOFT_ARTSCI, OUAC_CONVERSION_SOURCE],
  },
  {
    slug: "waterloo",
    name: "Waterloo Average & GPA",
    shortName: "Waterloo",
    province: "Ontario",
    result: "percent-average",
    gradeInput: "percent",
    weightLabel: "Unit weight",
    weightOptions: [
      { label: "0.50 units (one-term course)", weight: 0.5 },
      { label: "0.25 units (lab)", weight: 0.25 },
      { label: "1.00 units", weight: 1 },
    ],
    defaultWeight: 0.5,
    bands: [],
    omsasScales: [3, 7],
    omsasWeightFactor: 2,
    facts: [
      "All Waterloo faculties use numeric grades on a scale from 0 to 100, and averages are reported as percentages — Waterloo does not calculate a GPA.",
      "Your average is weighted by unit weight: multiply each grade by its units, add the results, and divide by the total units attempted.",
      "Any grade between 0 and 32 is treated as 32 when averages for promotions and awards are calculated.",
      "Waterloo's letter-grade conversion applies only to courses taken before fall 2001.",
      "OUAC lists Waterloo under Scales 3 and 7, so OMSAS converts Waterloo percentages with percentage Scale 3.",
    ],
    sources: [WATERLOO_CALENDAR, WATERLOO_SCIENCE, OUAC_CONVERSION_SOURCE],
  },
  {
    slug: "guelph",
    name: "University of Guelph Average & GPA",
    shortName: "Guelph",
    province: "Ontario",
    result: "percent-average",
    gradeInput: "percent",
    weightLabel: "Credit weight",
    weightOptions: [
      { label: "0.50 credits (one-semester course)", weight: 0.5 },
      { label: "0.25 credits", weight: 0.25 },
      { label: "0.75 credits", weight: 0.75 },
      { label: "1.00 credits", weight: 1 },
    ],
    defaultWeight: 0.5,
    bands: GUELPH_BANDS,
    omsasScales: [3],
    omsasWeightFactor: 2,
    facts: [
      "Guelph grades undergraduate courses in percentages with matching letter grades: A+ is 90–100%, A is 85–89% and A- is 80–84%, down to D- at 50–52% and F below 50%. The calendar publishes no grade points, so Guelph reports averages, not a GPA.",
      "Your cumulative average is the weighted course total — each course's credit weight multiplied by its grade, added up — divided by your total credit attempts over all semesters. A semester average uses the same formula for one semester.",
      "From Summer 2026, when you repeat a failed course every attempt still counts in that semester's average, but only the highest grade is used in your cumulative average. Courses taken before Summer 2026 are not recalculated this way.",
      "Full-time students with a semester average of at least 80.0% are named to the Dean's Honours List.",
      "OUAC lists Guelph under percentage Scale 3, so OMSAS converts Guelph percentages with Scale 3 (an 85–89% is 3.9).",
    ],
    sources: [GUELPH_GRADES, GUELPH_GLOSSARY, GUELPH_FAILED_COURSES, GUELPH_DEANS_HONOURS, OUAC_CONVERSION_SOURCE],
  },
];

export const caUniversityBySlug = Object.fromEntries(
  caUniversityProfiles.map((profile) => [profile.slug, profile]),
) as Record<CaUniversityProfile["slug"], CaUniversityProfile>;

/** Candidates from the brief that are all published — nothing dropped for Canada. */
export const droppedCaUniversityCandidates: DroppedCandidate[] = [];
