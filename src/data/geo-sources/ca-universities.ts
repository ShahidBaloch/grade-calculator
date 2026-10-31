import { OMSAS_GPA_RULES_SOURCE, OUAC_CONVERSION_SOURCE, type OmsasScaleNumber } from "./omsas";
import type { DroppedCandidate, OfficialSource } from "./types";

/** One row of a university's own percentage → letter (→ points) table. */
export interface UniversityBand {
  letter: string;
  /** Percentage range; absent when the school publishes letters only (SFU). */
  min?: number;
  max?: number;
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
  slug:
    | "omsas"
    | "ubc"
    | "uoft"
    | "waterloo"
    | "guelph"
    | "york"
    | "mcmaster"
    | "queens"
    | "uottawa"
    | "western"
    | "laurier"
    | "tmu"
    | "sfu"
    | "mcgill";
  name: string;
  shortName: string;
  province: string;
  /** Native result the school itself reports. */
  result: UniversityResultKind;
  /** Top of the school's own GPA scale as shown on results ("4.0" when unset). */
  gpaScale?: string;
  /** Grades the student types in ("letter" when the school publishes no percentage table). */
  gradeInput: "percent" | "percent-or-letter" | "letter";
  /** Round a typed percentage to a whole number before reading the letter (TMU, uOttawa). */
  roundPercent?: boolean;
  /** "truncate" when the school cuts the GPA to two decimals instead of rounding (McGill). */
  gpaRounding?: "truncate";
  /** Failing marks below this count as this value in percentage averages (Waterloo 32, Western 40). */
  averageFloor?: number;
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

const YORK_CHECKED = "2026-10-30";

const YORK_CALENDAR: OfficialSource = {
  publisher: "York University",
  title: "Undergraduate Academic Calendar — Grades and Grading Schemes",
  href: "https://calendars.students.yorku.ca/2025-2026/grades-and-grading-schemes",
  checked: YORK_CHECKED,
  edition: "2026-2027 Undergraduate Academic Calendar",
};

const YORK_NEW_SCHEMES: OfficialSource = {
  publisher: "York University Secretariat",
  title: "Implementation of the New Grading Schemes",
  href: "https://www.yorku.ca/secretariat/senate/academic-standards-curriculum-and-pedagogy-committee/implementation-of-the-new-grading-schemes/",
  checked: YORK_CHECKED,
};

/** York undergraduate grading scheme (9-point). E and F are separate grades: E = 1, F = 0. */
export const YORK_BANDS: UniversityBand[] = [
  { letter: "A+", min: 90, max: 100, points: 9 },
  { letter: "A", min: 80, max: 89, points: 8 },
  { letter: "B+", min: 75, max: 79, points: 7 },
  { letter: "B", min: 70, max: 74, points: 6 },
  { letter: "C+", min: 65, max: 69, points: 5 },
  { letter: "C", min: 60, max: 64, points: 4 },
  { letter: "D+", min: 55, max: 59, points: 3 },
  { letter: "D", min: 50, max: 54, points: 2 },
  { letter: "E", min: 40, max: 49, points: 1 },
  { letter: "F", min: 0, max: 39, points: 0 },
];

const BATCH_CHECKED = "2026-10-30";

const MCMASTER_GRADES: OfficialSource = {
  publisher: "McMaster University Office of the Registrar",
  title: "Grades — grade points and equivalent percentages",
  href: "https://registrar.mcmaster.ca/exams-grades/grades/",
  checked: BATCH_CHECKED,
};

const QUEENS_GPA_SCALE: OfficialSource = {
  publisher: "Queen's University Office of the University Registrar",
  title: "Official GPA Grading Scale",
  href: "https://www.queensu.ca/registrar/academic-info/grades/official-gpa-scale",
  checked: BATCH_CHECKED,
};

const UOTTAWA_A3: OfficialSource = {
  publisher: "University of Ottawa",
  title: "Academic Regulation A-3 — Grading System",
  href: "https://www.uottawa.ca/about-us/leadership-governance/policies-regulations/a-3-grading-system",
  checked: BATCH_CHECKED,
  edition: "Approved by the Senate on February 12, 2024, effective May 1, 2024",
};

const WESTERN_CALENDAR: OfficialSource = {
  publisher: "Western University",
  title: "Academic Calendar 2026 — Marks/Grades and Marking Scales",
  href: "https://westerncalendar.uwo.ca/PolicyPages.cfm?ArchiveID=&PolicyCategoryID=5&SelectedCalendar=Live&command=showCategory",
  checked: BATCH_CHECKED,
  edition: "Academic Calendar 2026",
};

const LAURIER_GPA: OfficialSource = {
  publisher: "Wilfrid Laurier University",
  title: "GPA Calculator — 12-point grade scale",
  href: "https://students.wlu.ca/academics/support-and-advising/gpa-calculator/index.html",
  checked: BATCH_CHECKED,
};

const TMU_LEGEND: OfficialSource = {
  publisher: "Toronto Metropolitan University",
  title: "Transcript Legend — undergraduate grading (September 2013 to present)",
  href: "https://www.torontomu.ca/current-students/grades-standings/transcripts/legend/",
  checked: BATCH_CHECKED,
};

const SFU_CALENDAR: OfficialSource = {
  publisher: "Simon Fraser University",
  title: "Undergraduate Grading Systems and Policies",
  href: "https://www.sfu.ca/students/calendar/2026/spring/fees-and-regulations/grading-policy/grading-systems-and-policies.html",
  checked: BATCH_CHECKED,
  edition: "Spring 2026 Calendar",
};

const MCGILL_CATALOGUE: OfficialSource = {
  publisher: "McGill University",
  title: "Course Catalogue — Grading and Grade Point Averages (GPA), Undergraduate",
  href: "https://coursecatalogue.mcgill.ca/en/regulations/undergraduate/student-records/grading-gpa/",
  checked: BATCH_CHECKED,
};

/** McMaster and Laurier publish the same 12-point table. */
const TWELVE_POINT_BANDS: UniversityBand[] = [
  { letter: "A+", min: 90, max: 100, points: 12 },
  { letter: "A", min: 85, max: 89, points: 11 },
  { letter: "A-", min: 80, max: 84, points: 10 },
  { letter: "B+", min: 77, max: 79, points: 9 },
  { letter: "B", min: 73, max: 76, points: 8 },
  { letter: "B-", min: 70, max: 72, points: 7 },
  { letter: "C+", min: 67, max: 69, points: 6 },
  { letter: "C", min: 63, max: 66, points: 5 },
  { letter: "C-", min: 60, max: 62, points: 4 },
  { letter: "D+", min: 57, max: 59, points: 3 },
  { letter: "D", min: 53, max: 56, points: 2 },
  { letter: "D-", min: 50, max: 52, points: 1 },
  { letter: "F", min: 0, max: 49, points: 0 },
];

export const MCMASTER_BANDS = TWELVE_POINT_BANDS;
export const LAURIER_BANDS = TWELVE_POINT_BANDS;

/** Queen's official GPA scale (Arts and Science, Smith Business, Smith Engineering, SGS, Health Sciences). */
export const QUEENS_BANDS: UniversityBand[] = [
  { letter: "A+", min: 90, max: 100, points: 4.3 },
  { letter: "A", min: 85, max: 89.9, points: 4.0 },
  { letter: "A-", min: 80, max: 84.9, points: 3.7 },
  { letter: "B+", min: 77, max: 79.9, points: 3.3 },
  { letter: "B", min: 73, max: 76.9, points: 3.0 },
  { letter: "B-", min: 70, max: 72.9, points: 2.7 },
  { letter: "C+", min: 67, max: 69.9, points: 2.3 },
  { letter: "C", min: 63, max: 66.9, points: 2.0 },
  { letter: "C-", min: 60, max: 62.9, points: 1.7 },
  { letter: "D+", min: 57, max: 59.9, points: 1.3 },
  { letter: "D", min: 53, max: 56.9, points: 1.0 },
  { letter: "D-", min: 50, max: 52.9, points: 0.7 },
  { letter: "F", min: 0, max: 49.9, points: 0 },
];

/** uOttawa Regulation A-3 alphanumeric scale. No B-; E and F are separate grades. */
export const UOTTAWA_BANDS: UniversityBand[] = [
  { letter: "A+", min: 90, max: 100, points: 10 },
  { letter: "A", min: 85, max: 89, points: 9 },
  { letter: "A-", min: 80, max: 84, points: 8 },
  { letter: "B+", min: 75, max: 79, points: 7 },
  { letter: "B", min: 70, max: 74, points: 6 },
  { letter: "C+", min: 65, max: 69, points: 5 },
  { letter: "C", min: 60, max: 64, points: 4 },
  { letter: "D+", min: 55, max: 59, points: 3 },
  { letter: "D", min: 50, max: 54, points: 2 },
  { letter: "E", min: 40, max: 49, points: 1 },
  { letter: "F", min: 0, max: 39, points: 0 },
];

/** Western undergraduate letter bands (no grade points). */
export const WESTERN_BANDS: UniversityBand[] = [
  { letter: "A+", min: 90, max: 100 },
  { letter: "A", min: 80, max: 89 },
  { letter: "B", min: 70, max: 79 },
  { letter: "C", min: 60, max: 69 },
  { letter: "D", min: 50, max: 59 },
  { letter: "F", min: 0, max: 49 },
];

/** Western: failed marks below 40% count as 40% in averages. */
export const WESTERN_AVERAGE_FLOOR = 40;

/** TMU undergraduate scale, September 2013 to present (all faculties). */
export const TMU_BANDS: UniversityBand[] = [
  { letter: "A+", min: 90, max: 100, points: 4.33 },
  { letter: "A", min: 85, max: 89, points: 4.0 },
  { letter: "A-", min: 80, max: 84, points: 3.67 },
  { letter: "B+", min: 77, max: 79, points: 3.33 },
  { letter: "B", min: 73, max: 76, points: 3.0 },
  { letter: "B-", min: 70, max: 72, points: 2.67 },
  { letter: "C+", min: 67, max: 69, points: 2.33 },
  { letter: "C", min: 63, max: 66, points: 2.0 },
  { letter: "C-", min: 60, max: 62, points: 1.67 },
  { letter: "D+", min: 57, max: 59, points: 1.33 },
  { letter: "D", min: 53, max: 56, points: 1.0 },
  { letter: "D-", min: 50, max: 52, points: 0.67 },
  { letter: "F", min: 0, max: 49, points: 0 },
];

/** SFU standard letter grades. The calendar publishes no percentage equivalents. */
export const SFU_BANDS: UniversityBand[] = [
  { letter: "A+", points: 4.33 },
  { letter: "A", points: 4.0 },
  { letter: "A-", points: 3.67 },
  { letter: "B+", points: 3.33 },
  { letter: "B", points: 3.0 },
  { letter: "B-", points: 2.67 },
  { letter: "C+", points: 2.33 },
  { letter: "C", points: 2.0 },
  { letter: "C-", points: 1.67 },
  { letter: "D", points: 1.0 },
  { letter: "F", points: 0 },
];

/** McGill undergraduate scale: no A+; the letter grade is the official course grade. */
export const MCGILL_BANDS: UniversityBand[] = [
  { letter: "A", min: 85, max: 100, points: 4.0 },
  { letter: "A-", min: 80, max: 84, points: 3.7 },
  { letter: "B+", min: 75, max: 79, points: 3.3 },
  { letter: "B", min: 70, max: 74, points: 3.0 },
  { letter: "B-", min: 65, max: 69, points: 2.7 },
  { letter: "C+", min: 60, max: 64, points: 2.3 },
  { letter: "C", min: 55, max: 59, points: 2.0 },
  { letter: "D", min: 50, max: 54, points: 1.0 },
  { letter: "F", min: 0, max: 49, points: 0 },
];

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
    averageFloor: WATERLOO_AVERAGE_FLOOR,
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
  {
    slug: "york",
    name: "York University GPA",
    shortName: "York",
    province: "Ontario",
    result: "gpa",
    gpaScale: "9-point",
    gradeInput: "percent-or-letter",
    weightLabel: "Credits",
    weightOptions: [
      { label: "3.00 (one term)", weight: 3 },
      { label: "6.00 (full year)", weight: 6 },
    ],
    defaultWeight: 3,
    bands: YORK_BANDS,
    omsasScales: [9],
    omsasWeightFactor: 1 / 3,
    facts: [
      "York undergraduate courses use a letter-grade scheme in which each grade carries grade points from 9 (A+, 90–100%) down to 0 (F, 0–39%). There are no minus grades.",
      "Sessional and cumulative grade point averages are credit-weighted: multiply each course's grade points by its credits, add them up, and divide by the total credits. Only courses taken at York count.",
      "A D (50–54%) or better passes. An E (40–49%) is a marginal fail that still earns 1 grade point, while an F (0–39%) earns 0.",
      "York's Senate has approved a new 4.0 grading scheme, but York lists its effective date as still to be determined, so current transcripts use the 9-point scale.",
      "OUAC lists York under letter Scale 9, so OMSAS converts York letters with Scale 9: an A+ is 4.0 and an A (80–89%) is 3.8.",
    ],
    sources: [YORK_CALENDAR, YORK_NEW_SCHEMES, OUAC_CONVERSION_SOURCE],
  },
  {
    slug: "mcmaster",
    name: "McMaster GPA",
    shortName: "McMaster",
    province: "Ontario",
    result: "gpa",
    gpaScale: "12-point",
    gradeInput: "percent-or-letter",
    weightLabel: "Units",
    weightOptions: [
      { label: "3 units (one term)", weight: 3 },
      { label: "6 units (full year)", weight: 6 },
    ],
    defaultWeight: 3,
    bands: MCMASTER_BANDS,
    omsasScales: [7],
    omsasWeightFactor: 1 / 3,
    facts: [
      "McMaster grades undergraduate courses on a 12-point scale: A+ (90–100%) is 12, A (85–89%) is 11 and A- (80–84%) is 10, down to D- (50–52%) at 1 and F (0–49%) at 0.",
      "Course points are a course's units multiplied by the grade point value of its final grade. Your GPA is your total course points divided by your GPA units.",
      "Non-numeric grades such as P, NC, AUD and COM earn no points and are left out of the GPA.",
      "To turn a McMaster 12-point GPA into a US 4.0 figure, use McMaster's published lookup table — dividing by 3 is not accurate.",
      "OUAC lists McMaster under letter Scale 7, so OMSAS converts McMaster letters with Scale 7: an A+ is 4.0 and an A is 3.9.",
    ],
    sources: [MCMASTER_GRADES, OUAC_CONVERSION_SOURCE],
  },
  {
    slug: "queens",
    name: "Queen's University GPA",
    shortName: "Queen's",
    province: "Ontario",
    result: "gpa",
    gpaScale: "4.3",
    gradeInput: "percent-or-letter",
    weightLabel: "Course length",
    weightOptions: [
      { label: "One-term course", weight: 1 },
      { label: "Full-year course", weight: 2 },
    ],
    defaultWeight: 1,
    bands: QUEENS_BANDS,
    omsasScales: [3, 7],
    omsasWeightFactor: 1,
    facts: [
      "Queen's official grading scale runs to 4.3: A+ (90–100%) is 4.3, A (85–89.9%) is 4.0 and A- (80–84.9%) is 3.7, down to D- (50–52.9%) at 0.7 and F (below 50%) at 0.",
      "The scale covers Arts and Science, Smith School of Business, Smith Engineering, the School of Graduate Studies and Health Sciences. Other faculties, such as Law and Education, have their own scales.",
      "Your GPA is the credit-weighted average of your grade points, so a full-year course counts twice as much as a one-term course.",
      "Since January 7, 2014, Queen's no longer prints the cumulative GPA on the official transcript.",
      "OUAC lists Queen's under Scales 3 and 7, so OMSAS converts Queen's percentages with Scale 3 and letter grades with Scale 7.",
    ],
    sources: [QUEENS_GPA_SCALE, OUAC_CONVERSION_SOURCE],
  },
  {
    slug: "uottawa",
    name: "University of Ottawa GPA",
    shortName: "uOttawa",
    province: "Ontario",
    result: "gpa",
    gpaScale: "10-point",
    gradeInput: "percent-or-letter",
    roundPercent: true,
    weightLabel: "Units",
    weightOptions: [
      { label: "3 units (one term)", weight: 3 },
      { label: "6 units (full year)", weight: 6 },
    ],
    defaultWeight: 3,
    bands: UOTTAWA_BANDS,
    omsasScales: [7],
    omsasWeightFactor: 1 / 3,
    facts: [
      "uOttawa's official grading system is alphanumeric: A+ (90–100%) is worth 10, A (85–89%) 9 and A- (80–84%) 8, down to D (50–54%) at 2, E (40–49%) at 1 and F (0–39%) at 0. There is no B-.",
      "Grade points are the course units multiplied by the numeric value of the letter grade. Your CGPA is the sum of all grade points divided by all course units taken, passed or not, rounded to two decimals.",
      "Final course grades are rounded to a whole percentage before the letter is assigned: a first decimal of 5 or higher rounds up.",
      "The minimum passing grade is D for undergraduate courses, except C in Education, the MD program and the PharmD program, and C+ in nursing (NSG) courses.",
      "OUAC lists Ottawa under letter Scale 7, so OMSAS converts uOttawa letters with Scale 7; E and F both become 0.0.",
    ],
    sources: [UOTTAWA_A3, OUAC_CONVERSION_SOURCE],
  },
  {
    slug: "western",
    name: "Western University Average",
    shortName: "Western",
    province: "Ontario",
    result: "percent-average",
    gradeInput: "percent",
    averageFloor: WESTERN_AVERAGE_FLOOR,
    weightLabel: "Course weight",
    weightOptions: [
      { label: "0.5 (half course)", weight: 0.5 },
      { label: "1.0 (full course)", weight: 1 },
    ],
    defaultWeight: 0.5,
    bands: WESTERN_BANDS,
    omsasScales: [3],
    omsasWeightFactor: 2,
    facts: [
      "Western grades undergraduate courses in percentages: A+ is 90–100%, A is 80–89%, B is 70–79%, C is 60–69%, D is 50–59% and F is below 50%.",
      "Failed marks count in averages: marks below 40% are included as 40%, and marks from 40% to 49% as the actual mark.",
      "Cumulative and term averages are calculated to two decimals and rounded to the nearest whole number, with .45 rounded up, for progression, scholarship retention and the Dean's Honour List.",
      "Western reports percentage averages rather than grade points, so if an application asks for a 4.0 GPA, use the scale that program publishes.",
      "OUAC lists Western under percentage Scale 3, so OMSAS converts Western percentages with Scale 3 (an 85–89% is 3.9).",
    ],
    sources: [WESTERN_CALENDAR, OUAC_CONVERSION_SOURCE],
  },
  {
    slug: "laurier",
    name: "Wilfrid Laurier GPA",
    shortName: "Laurier",
    province: "Ontario",
    result: "gpa",
    gpaScale: "12-point",
    gradeInput: "percent-or-letter",
    weightLabel: "Credits",
    weightOptions: [
      { label: "0.5 credit", weight: 0.5 },
      { label: "1.0 credit", weight: 1 },
      { label: "0.25 credit", weight: 0.25 },
      { label: "0.75 credit", weight: 0.75 },
      { label: "1.5 credits", weight: 1.5 },
    ],
    defaultWeight: 0.5,
    bands: LAURIER_BANDS,
    omsasScales: [7],
    omsasWeightFactor: 2,
    facts: [
      "Laurier uses a 12-point grade scale: A+ (90–100%) is 12, A (85–89%) is 11 and A- (80–84%) is 10, down to D- (50–52%) at 1 and F (0–49%) at 0.",
      "Your GPA weights each course by its credit value, so a 0.5-credit course counts half as much as a 1.0-credit course.",
      "Count failed attempts (F, XF and DR are worth 0) but leave out courses graded CR or WD. For a repeated course, use only the grade from the second attempt.",
      "Laurier's own GPA tools are unofficial; your official GPA is the one in LORIS.",
      "OUAC lists Wilfrid Laurier under letter Scale 7, so OMSAS converts Laurier letters with Scale 7: an A+ is 4.0 and an A is 3.9.",
    ],
    sources: [LAURIER_GPA, OUAC_CONVERSION_SOURCE],
  },
  {
    slug: "tmu",
    name: "Toronto Metropolitan University GPA",
    shortName: "TMU",
    province: "Ontario",
    result: "gpa",
    gpaScale: "4.33",
    gradeInput: "percent-or-letter",
    roundPercent: true,
    weightLabel: "Course weight",
    weightOptions: [
      { label: "1 (one-term course)", weight: 1 },
      { label: "2 (two-term course)", weight: 2 },
    ],
    defaultWeight: 1,
    bands: TMU_BANDS,
    omsasScales: [],
    omsasWeightFactor: 1,
    facts: [
      "Since September 2013, TMU has graded undergraduates in all faculties on a 4.33 scale: A+ (90–100%) is 4.33, A (85–89%) is 4.00 and A- (80–84%) is 3.67, down to D- (50–52%) at 0.67 and F (0–49%) at 0.",
      "Your final percentage is rounded to a whole number before it becomes a letter, so 49.5% rounds up to 50% (a D-, which passes) while 49.4% stays 49% (an F).",
      "For GPA, a one-term course is weighted 1 and a two-term course 2.",
      "This page shows TMU's own 4.33 GPA only; it does not convert TMU grades to the OMSAS 4.0 scale.",
    ],
    sources: [TMU_LEGEND],
  },
  {
    slug: "sfu",
    name: "SFU GPA",
    shortName: "SFU",
    province: "British Columbia",
    result: "gpa",
    gpaScale: "4.33",
    gradeInput: "letter",
    weightLabel: "Units",
    weightOptions: [
      { label: "3 units", weight: 3 },
      { label: "4 units", weight: 4 },
      { label: "2 units", weight: 2 },
      { label: "1 unit", weight: 1 },
    ],
    defaultWeight: 3,
    bands: SFU_BANDS,
    omsasScales: [7],
    omsasWeightFactor: 1 / 3,
    facts: [
      "SFU grades undergraduate courses with letter grades worth up to 4.33: A+ is 4.33, A 4.00 and A- 3.67, down to C- at 1.67, D at 1.00 and F at 0.00. There is no D+ or D-.",
      "Each grade's value is multiplied by the course's units to give grade points. Your term GPA is the grade points earned divided by the units completed that term; your CGPA uses every term to date. Both are calculated to two decimals.",
      "SFU's calendar publishes no percentage equivalents — each instructor or department sets the cut-offs, so check your course outline.",
      "OUAC lists Simon Fraser under letter Scale 7, so OMSAS converts SFU letters with Scale 7: an A+ is 4.0 and an A is 3.9.",
    ],
    sources: [SFU_CALENDAR, OUAC_CONVERSION_SOURCE],
  },
  {
    slug: "mcgill",
    name: "McGill GPA",
    shortName: "McGill",
    province: "Quebec",
    result: "gpa",
    gradeInput: "percent-or-letter",
    gpaRounding: "truncate",
    weightLabel: "Credits",
    weightOptions: [
      { label: "3 credits", weight: 3 },
      { label: "4 credits", weight: 4 },
      { label: "6 credits", weight: 6 },
      { label: "1 credit", weight: 1 },
    ],
    defaultWeight: 3,
    bands: MCGILL_BANDS,
    omsasScales: [8],
    omsasWeightFactor: 1 / 3,
    facts: [
      "McGill's official course grade is the letter grade, on a 4.0 scale with no A+: A (85–100%) is 4.0, A- (80–84%) 3.7 and B+ (75–79%) 3.3, down to D (50–54%) at 1.0 and F (0–49%) at 0.",
      "Your GPA is each course's credits times its grade points, added up and divided by your total GPA course credits — and McGill truncates it to two decimals, so 3.596 shows as 3.59, not 3.60.",
      "A to C are satisfactory passes, D is a conditional (non-continuation) pass and F is a failure. Courses that count toward program requirements need a C or better.",
      "Repeated courses all count: earlier D or F grades stay in your CGPA. You need a CGPA of at least 2.00 to graduate.",
      "In Engineering, professors may set their own letter-grade cut-offs, and the Faculty of Law does not use this scale. OUAC lists McGill under letter Scale 8, whose points match McGill's own.",
    ],
    sources: [MCGILL_CATALOGUE, OUAC_CONVERSION_SOURCE],
  },
];

export const caUniversityBySlug = Object.fromEntries(
  caUniversityProfiles.map((profile) => [profile.slug, profile]),
) as Record<CaUniversityProfile["slug"], CaUniversityProfile>;

/** Candidates from the brief that are all published — nothing dropped for Canada. */
export const droppedCaUniversityCandidates: DroppedCandidate[] = [];
