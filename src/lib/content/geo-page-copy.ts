import {
  OMSAS_COURSE_WEIGHTS,
  OMSAS_RULES,
  OMSAS_SCALES,
  OMSAS_UNIVERSITY_SCALES,
  type OmsasScaleNumber,
} from "@/data/geo-sources/omsas";
import {
  caUniversityBySlug,
  GUELPH_DEANS_HONOURS_AVERAGE,
  UBC_ARTS_433_EQUIVALENCY,
  UOFT_STANDING,
  WATERLOO_AVERAGE_FLOOR,
  type CaUniversityProfile,
} from "@/data/geo-sources/ca-universities";
import {
  droppedUsEocCandidates,
  usEocStateRules,
  type UsEocStateRule,
} from "@/data/geo-sources/us-eoc-states";
import type { OfficialSource } from "@/data/geo-sources/types";
import {
  calculateUniversityGpa,
  convertToOmsas,
  normalizeLetter,
  omsasScalesForUniversity,
  type UniversityCourseInput,
} from "@/lib/calculators/ca-university-gpa";
import { calculateEocGrade } from "@/lib/calculators/eoc-grade";
import { calculateAtar } from "@/lib/calculators/atar";
import type { AuAtarState } from "@/data/geo-sources/au-atar-states";
import { eocWeightText } from "@/lib/seo/geo-programmatic";
import type { FaqItem } from "@/types/seo";

export interface GeoPageTable {
  caption: string;
  head: string[];
  rows: string[][];
}

export interface GeoPageSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  quote?: { text: string; cite: string };
  table?: GeoPageTable;
}

export interface GeoPageCopy {
  /** <title> without the site name. */
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  intro: string[];
  steps: string[];
  sections: GeoPageSection[];
  faqs: FaqItem[];
  sources: OfficialSource[];
}

const gpa = (value: number) => value.toFixed(2);
const pts = (value: number) => value.toFixed(1);
const pct = (value: number) => `${Number.isInteger(value) ? value : value.toFixed(2)}%`;

function listJoin(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Schools whose own scale carries grade points (U of T 4.0, York 9-point). */
function hasOwnPoints(profile: CaUniversityProfile): boolean {
  return profile.slug !== "omsas" && profile.bands.some((band) => band.points != null);
}

function scaleLabel(scale: OmsasScaleNumber): string {
  const kind = OMSAS_SCALES[scale].kind;
  return `Scale ${scale} (${kind === "alpha" ? "letter" : kind})`;
}

/** Example transcript per school — realistic marks, fed through the real calculator. */
export const CA_EXAMPLE_COURSES: Record<CaUniversityProfile["slug"], UniversityCourseInput[]> = {
  omsas: [
    { name: "Biology (full-year)", grade: "86", weight: 2 },
    { name: "Organic chemistry", grade: "79", weight: 1 },
    { name: "Psychology", grade: "A-", weight: 1 },
    { name: "Physics lab", grade: "91", weight: 0.5 },
  ],
  ubc: [
    { name: "BIOL 112", grade: "84", weight: 3 },
    { name: "CHEM 121", grade: "76", weight: 3 },
    { name: "MATH 100/101", grade: "91", weight: 6 },
    { name: "ENGL 110", grade: "58", weight: 3 },
  ],
  uoft: [
    { name: "BIO130H1", grade: "85", weight: 0.5 },
    { name: "CHM135H1", grade: "78", weight: 0.5 },
    { name: "MAT135Y1", grade: "72", weight: 1 },
    { name: "PSY100H1", grade: "A-", weight: 0.5 },
  ],
  waterloo: [
    { name: "Lecture 1", grade: "85", weight: 0.5 },
    { name: "Lecture 2", grade: "78", weight: 0.5 },
    { name: "Lecture 3", grade: "91", weight: 0.5 },
    { name: "Lecture 4", grade: "74", weight: 0.5 },
    { name: "Lecture 5", grade: "68", weight: 0.5 },
    { name: "Lab", grade: "75", weight: 0.25 },
  ],
  guelph: [
    { name: "Biology", grade: "84", weight: 0.5 },
    { name: "Chemistry", grade: "77", weight: 0.5 },
    { name: "Calculus", grade: "91", weight: 0.5 },
    { name: "Psychology", grade: "72", weight: 0.5 },
    { name: "Seminar", grade: "88", weight: 0.25 },
  ],
  york: [
    { name: "EECS 1012", grade: "84", weight: 3 },
    { name: "MATH 1300", grade: "77", weight: 3 },
    { name: "PSYC 1010 (full year)", grade: "B", weight: 6 },
    { name: "ECON 1000", grade: "68", weight: 3 },
  ],
  mcmaster: [
    { name: "BIOLOGY 1M03", grade: "84", weight: 3 },
    { name: "CHEM 1A03", grade: "77", weight: 3 },
    { name: "MATH 1ZA3", grade: "A", weight: 3 },
    { name: "PSYCH 1X03", grade: "68", weight: 3 },
  ],
  queens: [
    { name: "BIOL 102", grade: "86", weight: 1 },
    { name: "CHEM 112 (full year)", grade: "78", weight: 2 },
    { name: "MATH 121", grade: "A-", weight: 1 },
    { name: "ECON 110", grade: "71", weight: 1 },
  ],
  uottawa: [
    { name: "ADM 1300", grade: "86", weight: 3 },
    { name: "MAT 1320", grade: "77", weight: 3 },
    { name: "PSY 1101", grade: "B+", weight: 3 },
    { name: "ECO 1102", grade: "68", weight: 3 },
  ],
  western: [
    { name: "Biology 1001A", grade: "84", weight: 0.5 },
    { name: "Chemistry 1301A", grade: "76", weight: 0.5 },
    { name: "Calculus 1000A", grade: "91", weight: 0.5 },
    { name: "Psychology 1002A", grade: "68", weight: 0.5 },
    { name: "Writing 1000F", grade: "35", weight: 0.5 },
  ],
  laurier: [
    { name: "BU 111", grade: "83", weight: 0.5 },
    { name: "EC 120", grade: "76", weight: 0.5 },
    { name: "MA 100", grade: "A-", weight: 0.5 },
    { name: "PS 101", grade: "71", weight: 0.5 },
  ],
  tmu: [
    { name: "CPS 109", grade: "84", weight: 1 },
    { name: "MTH 110", grade: "79.5", weight: 1 },
    { name: "PSY 102", grade: "B", weight: 1 },
    { name: "ECN 104", grade: "68", weight: 1 },
  ],
  sfu: [
    { name: "CMPT 120", grade: "A-", weight: 3 },
    { name: "MATH 151", grade: "B+", weight: 3 },
    { name: "PSYC 100", grade: "A", weight: 3 },
    { name: "ECON 103", grade: "C+", weight: 4 },
  ],
  mcgill: [
    { name: "COMP 202", grade: "A-", weight: 3 },
    { name: "MATH 140", grade: "78", weight: 4 },
    { name: "PSYC 100", grade: "B+", weight: 3 },
    { name: "ECON 208", grade: "66", weight: 3 },
  ],
};

/** A school's own grade points: one decimal when exact (3.7, 8.0), two otherwise (3.67, 4.33). */
const ownPts = (value: number) => (Number.isInteger(Math.round(value * 1000) / 100) ? value.toFixed(1) : value.toFixed(2));

/** University the OMSAS page opens with. */
export const OMSAS_DEFAULT_UNIVERSITY = "Toronto";

function exampleSection(profile: CaUniversityProfile): GeoPageSection {
  const courses = CA_EXAMPLE_COURSES[profile.slug];
  const options =
    profile.slug === "omsas"
      ? { omsasScales: omsasScalesForUniversity(OMSAS_DEFAULT_UNIVERSITY)!, omsasUniversity: OMSAS_DEFAULT_UNIVERSITY }
      : {};
  const outcome = calculateUniversityGpa(courses, profile, options);
  if (outcome.status !== "valid") throw new Error(`Example for ${profile.slug} must be valid`);
  const { data } = outcome;

  const head = ["Course", "Grade", profile.weightLabel];
  if (hasOwnPoints(profile)) head.push(`${profile.shortName} points`);
  if (profile.slug === "ubc") head.push("UBC Arts 4.33");
  if (data.omsasGpa != null) head.push("OMSAS points");

  const rows = data.courses.map((course) => {
    const row = [course.name, course.percent != null ? pct(course.percent) : course.grade, String(course.weight)];
    if (hasOwnPoints(profile)) row.push(ownPts(course.points!));
    if (profile.slug === "ubc") row.push(String(course.equivalency433));
    if (course.omsas) {
      row.push(`${pts(course.omsas.points)}${course.omsas.viaLetter ? ` (via ${course.omsas.viaLetter})` : ""}`);
    }
    return row;
  });

  const paragraphs: string[] = [];
  if (data.native.kind === "percent-average") {
    paragraphs.push(
      `Weighted by ${profile.weightLabel.toLowerCase()}, these marks average ${pct(Number(data.native.value.toFixed(2)))}${
        data.native.letter ? ` — an ${data.native.letter} on the ${profile.shortName} letter scale` : ""
      }.`,
    );
  } else if (profile.slug !== "omsas") {
    paragraphs.push(
      `The ${profile.shortName} GPA for these courses is ${gpa(data.native.value)}${profile.gpaScale ? ` on its ${profile.gpaScale} scale` : ""}.`,
    );
  }
  if (data.equivalency433 != null) {
    paragraphs.push(
      `Using the UBC Arts percentage equivalencies, the same courses work out to ${gpa(data.equivalency433)} on a 4.33 scale.`,
    );
  }
  if (data.omsasGpa != null) {
    const omsasGpa = data.omsasGpa;
    paragraphs.push(
      profile.slug === "omsas"
        ? `For a University of Toronto transcript (OUAC Scales 3 and 7), OMSAS converts the percentages with Scale 3 and the letter grade with Scale 7. Weighted by course length, the OMSAS GPA is ${gpa(omsasGpa)}.`
        : `OMSAS would convert the same transcript to ${gpa(omsasGpa)} on its 4.0 scale${
            profile.slug === "uoft" && Math.abs(omsasGpa - data.native.value) > 0.004
              ? ` — not ${gpa(data.native.value)}, because OMSAS gives an 85–89% A 3.9 while U of T gives it 4.0`
              : ""
          }.`,
    );
  }
  paragraphs.push(`Steps: ${data.formulaSteps.join("; ")}.`);

  return {
    heading: "Worked example",
    paragraphs,
    table: { caption: `Example ${profile.shortName} transcript`, head, rows },
  };
}

/** Lead-in for each school's grading-scale table (schools added in the 2026-10 batch). */
const SCALE_NOTES: Partial<Record<CaUniversityProfile["slug"], string>> = {
  mcmaster:
    "This is McMaster's undergraduate 12-point scale with the equivalent percentages the Registrar publishes. Graduate and MBA programs use different cut-offs.",
  queens:
    "This is Queen's official GPA grading scale for Arts and Science, Smith Business, Smith Engineering, Graduate Studies and Health Sciences. B- is the minimum pass in Graduate Studies, and C- in Medicine and Nursing.",
  uottawa:
    "This is the official alphanumeric scale in uOttawa's Academic Regulation A-3. Each grade's numeric value is multiplied by the course units; the OMSAS column is OUAC letter Scale 7, which gives E and F both 0.0.",
  western:
    "These are the undergraduate letter bands in Western's Academic Calendar. Western reports percentage averages rather than grade points; the OMSAS column is OUAC percentage Scale 3 at the bottom of each band.",
  laurier:
    "This is the 12-point grade scale Laurier publishes with its GPA calculator. Each course's grade points are weighted by its credit value.",
  tmu: "This is TMU's undergraduate grading scale for all faculties from September 2013 onward. Percentages are rounded to a whole number before the letter is assigned.",
  sfu: "This is SFU's standard undergraduate letter-grade scale. SFU publishes no official percentage ranges — your course outline sets the cut-offs.",
  mcgill:
    "This is McGill's undergraduate grading table. The letter grade is the official course grade; the percentages are McGill's numerical scale, which Engineering instructors may replace with their own.",
};

function nativeTableSection(profile: CaUniversityProfile): GeoPageSection | null {
  if (profile.slug === "omsas") return null;
  if (profile.slug === "waterloo") {
    const scale3 = OMSAS_SCALES[3];
    if (scale3.kind !== "percentage") return null;
    return {
      heading: "Waterloo percentages on the OMSAS 4.0 scale",
      paragraphs: [
        "Waterloo transcripts show numeric grades only, so there is no Waterloo letter or grade-point table for current courses. When you apply through OUAC, your percentages are converted with percentage Scale 3:",
      ],
      table: {
        caption: "OUAC Scale 3 — percentage to OMSAS 4.0",
        head: ["Waterloo grade", "OMSAS points"],
        rows: scale3.rows.map((row) => [row.min === 0 ? `≤ ${row.max}%` : `${row.min}–${row.max}%`, pts(row.points)]),
      },
    };
  }

  const head = ["Letter", "Percentage"];
  if (hasOwnPoints(profile)) head.push(`${profile.shortName} grade points`);
  if (profile.slug === "ubc") head.push("UBC Arts 4.33 (at the low end)");
  const withOmsas = profile.omsasScales.length > 0;
  if (withOmsas) head.push("OMSAS 4.0");

  // OMSAS reads UBC and letter-only-scale schools (York, Scale 9) by letter, others by percentage.
  const byLetter =
    profile.slug === "ubc" || !profile.omsasScales.some((n) => OMSAS_SCALES[n].kind === "percentage");
  const rows = profile.bands.map((band) => {
    const row = [band.letter, band.min != null ? `${band.min}–${band.max}%` : "Not published"];
    if (hasOwnPoints(profile)) row.push(ownPts(band.points!));
    if (profile.slug === "ubc") {
      row.push(band.min! >= 50 ? String(UBC_ARTS_433_EQUIVALENCY[Math.min(band.min!, 90)]) : "—");
    }
    if (withOmsas) {
      const omsas = convertToOmsas(
        byLetter ? { percent: null, letter: normalizeLetter(band.letter) } : { percent: band.min!, letter: null },
        profile.omsasScales,
      );
      row.push(typeof omsas === "string" ? "—" : pts(omsas.points));
    }
    return row;
  });

  return {
    heading: `${profile.shortName} grading scale`,
    paragraphs: [
      profile.slug === "ubc"
        ? "This is the percentage-to-letter table UBC Vancouver uses in most faculties. Some faculties and graduate programs set a higher pass mark (for example, F below 60% in Medicine, Nursing and graduate master's programs)."
        : profile.slug === "guelph"
          ? "This is the undergraduate grading system Guelph's Senate approved for courses from Spring 1992 onward. Guelph publishes letters and percentages only; the OMSAS column is OUAC Scale 3 at the bottom of each band. Graduate courses use a different scale."
          : profile.slug === "york"
            ? "This is the undergraduate grading scheme in York's current Academic Calendar. Each course grade carries the grade points shown, on a 9-point scale; your GPA is the credit-weighted average of those points. The OMSAS column is OUAC letter Scale 9, which gives E and F both 0.0."
            : profile.slug === "uoft"
              ? "This is the undergraduate Refined Letter Grade Scale from U of T's Grading Practices Policy. Each course grade carries the grade points shown; your GPA is the weighted average of those points."
              : SCALE_NOTES[profile.slug] ?? "",
    ],
    table: { caption: `${profile.shortName} letter grades, percentages and conversions`, head, rows },
  };
}

function omsasTablesSection(): GeoPageSection[] {
  const values = [4.0, 3.9, 3.8, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.7, 0.0];
  const cell = (scale: OmsasScaleNumber, value: number) => {
    const data = OMSAS_SCALES[scale];
    if (data.kind === "percentage") {
      const row = data.rows.find((r) => r.points === value);
      return row ? (row.min === 0 ? `≤ ${row.max}` : `${row.min}–${row.max}`) : "—";
    }
    return data.rows.find((r) => r.points === value)?.grade ?? "—";
  };
  const scales: OmsasScaleNumber[] = [3, 4, 5, 6, 7, 8, 9];
  const byScale = scales.map((scale) => ({
    scale,
    names: OMSAS_UNIVERSITY_SCALES.filter((u) => u.scales.includes(scale)).map((u) => u.name),
  }));

  return [
    {
      heading: "OUAC Undergraduate Grade Conversion Table",
      paragraphs: [
        "OMSAS reads each grade off the scale assigned to your university. Percentage scales 3–6 differ at the top: an 85% is 3.9 on Scales 3, 4 and 6 but 3.7 on Scale 5. Numeric Scales 1 and 2 are not assigned to any university in the current list, so they are left out here.",
      ],
      table: {
        caption: "OMSAS 4.0 value for each grade, by OUAC scale",
        head: ["OMSAS 4.0", ...scales.map((s) => `Scale ${s}`)],
        rows: values.map((value) => [value.toFixed(2), ...scales.map((s) => cell(s, value))]),
      },
    },
    {
      heading: "Which OUAC scale does my university use?",
      paragraphs: byScale
        .filter((group) => group.names.length)
        .map((group) => `${scaleLabel(group.scale)}: ${listJoin(group.names)}.`),
      bullets: [
        "Universities listed under two scales (for example Toronto, Queen's and Waterloo) use the percentage scale for percentage grades and the letter scale for letter grades.",
        "OUAC notes the scales apply only to current grading schemes.",
      ],
    },
  ];
}

function caFaqs(profile: CaUniversityProfile): FaqItem[] {
  const faqs: FaqItem[] = [];
  const s = profile.shortName;
  if (profile.slug === "omsas") {
    faqs.push(
      { question: "How is the OMSAS GPA calculated?", answer: `${OMSAS_RULES.scale} ${OMSAS_RULES.cumulative}` },
      {
        question: "How are courses weighted in the OMSAS GPA?",
        answer: `By length of study: ${OMSAS_COURSE_WEIGHTS.map((w) => `${w.label.toLowerCase()} ${w.weight}`).join(", ")}.`,
      },
      { question: "Do repeated and failed courses count?", answer: `Yes. ${OMSAS_RULES.repeatedCourses} OMSAS also includes ${OMSAS_RULES.allCourses.charAt(0).toLowerCase()}${OMSAS_RULES.allCourses.slice(1)}` },
      { question: "My transcript has letters and percentages — which does OMSAS use?", answer: OMSAS_RULES.bothGradeTypes },
      { question: "Is an 85% the same OMSAS GPA everywhere?", answer: "No. On Scale 3 (for example Toronto, Western, Guelph) 85–89% is 3.9; on Scale 5 an 85% falls in 80–86% and converts to 3.7; on Scale 4 it is 3.9 (84–92%). Pick your university so the right scale is used." },
      { question: "Will every Ontario medical school use this GPA?", answer: `${OMSAS_RULES.schoolDiscretion} Check each school's admission requirements for weighting rules such as dropping lowest years.` },
    );
  } else if (profile.omsasScales.length) {
    const omsasScaleText = listJoin(profile.omsasScales.map(scaleLabel));
    faqs.push({
      question: `What OMSAS scale does ${s} use?`,
      answer: `OUAC lists ${s} under ${omsasScaleText}.${profile.slug === "ubc" ? ` ${OMSAS_RULES.bothGradeTypes}` : ""}`,
    });
  }

  if (profile.slug === "uoft") {
    faqs.push(
      { question: "Is an A+ worth more than an A at U of T?", answer: "No. Both A+ (90–100%) and A (85–89%) earn 4.0 grade points on U of T's undergraduate scale, so the highest possible GPA is 4.0." },
      { question: "How does U of T calculate GPA?", answer: profile.facts[1] },
      { question: "What GPA keeps me in good standing?", answer: `In Arts & Science a cumulative GPA of ${UOFT_STANDING.goodStanding.toFixed(2)} or higher keeps you in good standing. Below that, an annual or sessional GPA of 1.70 decides whether you continue on probation or are suspended.` },
      { question: "What GPA is graduating with distinction?", answer: profile.facts[4] },
    );
  }
  if (profile.slug === "ubc") {
    faqs.push(
      { question: "Does UBC use a 4.0 or 4.33 GPA?", answer: `Neither officially — ${profile.facts[0].charAt(0).toLowerCase()}${profile.facts[0].slice(1)} UBC says you need the evaluating body's scale to convert. UBC Arts publishes 4.33-scale equivalencies (90% = 4.33, 85% = 3.95, 80% = 3.7, 70% = 2.8, 60% = 2.0, 50% = 1.0), which this calculator shows as a planning figure.` },
      { question: "What percentage is an A at UBC?", answer: "In most UBC Vancouver faculties an A+ is 90–100%, an A is 85–89% and an A- is 80–84%. A B+ is 76–79%, one point lower than U of T's 77–79%." },
      { question: "What is a passing grade at UBC?", answer: "In most faculties a D (50–54%) passes and below 50% is an F. Dentistry, Nursing, Medicine and some graduate programs set the fail line at 60%, and doctoral students fail below 68%." },
    );
  }
  if (profile.slug === "waterloo") {
    faqs.push(
      { question: "Does Waterloo have a GPA?", answer: `No. ${profile.facts[0]} If an application asks for a GPA, use the scale that program publishes — for Ontario medical school applications through OMSAS that is the OUAC Scale 3 conversion shown here.` },
      { question: "How is my Waterloo average calculated?", answer: `${profile.facts[1]} For example, five 0.50-unit lectures (85, 78, 91, 74, 68) and one 0.25-unit lab (75) average 78.82.` },
      { question: "Why does a failing mark count as 32?", answer: `${profile.facts[2]} A 20% therefore counts as ${WATERLOO_AVERAGE_FLOOR} in those averages, while OMSAS converts it to 0.0.` },
    );
  }
  if (profile.slug === "guelph") {
    faqs.push(
      { question: "Does Guelph use a GPA?", answer: `No. ${profile.facts[0].split(". ").slice(-1)[0]} If an application asks for a 4.0 GPA, use the scale that program publishes — for Ontario medical schools that is the OUAC Scale 3 conversion shown here.` },
      { question: "How is my Guelph cumulative average calculated?", answer: `${profile.facts[1]} For example, four 0.50-credit courses (84, 77, 91, 72) and one 0.25-credit course (88) average 81.78%.` },
      { question: "What percentage is an A at Guelph?", answer: "An A+ is 90–100%, an A is 85–89% and an A- is 80–84%. A B+ is 77–79%, a B is 73–76% and a B- is 70–72%. The calendar describes 80–100 as Excellent, 70–79 as Good, 60–69 as Acceptable and 50–59 as Minimally Acceptable." },
      { question: "What is a passing grade at Guelph?", answer: "On the undergraduate scale a D- (50–52%) passes and anything below 50% is an F. Some programs limit how many times you can repeat a failed course." },
      { question: "Do repeated courses count in my Guelph average?", answer: profile.facts[2] },
      { question: "What average do I need for the Dean's Honours List?", answer: `A semester average of at least ${GUELPH_DEANS_HONOURS_AVERAGE.toFixed(1)}% as a full-time student. Part-time students need a cumulative average of ${GUELPH_DEANS_HONOURS_AVERAGE.toFixed(1)}% over at least 2.00 credits.` },
    );
  }
  if (profile.slug === "york") {
    faqs.push(
      { question: "What is York University's grading scale?", answer: "A+ is 90–100% (9 points), A is 80–89% (8), B+ is 75–79% (7), B is 70–74% (6), C+ is 65–69% (5), C is 60–64% (4), D+ is 55–59% (3), D is 50–54% (2), E is 40–49% (1) and F is 0–39% (0)." },
      { question: "How is my York GPA calculated?", answer: `${profile.facts[1]} For example, an A and a B+ in two 3.00-credit courses, a B in a 6.00-credit course and a C+ in a 3.00-credit course give (8×3 + 7×3 + 6×6 + 5×3) ÷ 15 = 6.40.` },
      { question: "Is York switching to a 4.0 GPA?", answer: profile.facts[3] },
      { question: "What is a passing grade at York?", answer: profile.facts[2] },
      { question: "What is my York GPA on a 4.0 scale?", answer: "York does not publish an official 9-point to 4.0 conversion for current grades. For Ontario medical school applications OMSAS converts each York letter with OUAC Scale 9 (A+ 4.0, A 3.8, B+ 3.3, B 3.0, C+ 2.3, C 2.0, D+ 1.3, D 1.0, E/F 0.0), which this calculator shows. Other programs may use their own scale." },
    );
  }
  if (SCALE_NOTES[profile.slug]) {
    const scaleAnswer = profile.bands
      .map((band) => {
        const range = band.min != null ? ` (${band.min}–${band.max}%)` : "";
        const value = band.points != null ? ` = ${ownPts(band.points)}` : "";
        return `${band.letter}${range}${value}`;
      })
      .join(", ");
    faqs.push(
      {
        question: `What is the ${s} grading scale?`,
        answer: `${scaleAnswer}.${profile.gradeInput === "letter" ? ` ${s} publishes no official percentage ranges.` : ""}`,
      },
      { question: `How is the ${s} ${profile.result === "gpa" ? "GPA" : "average"} calculated?`, answer: profile.facts[1] },
      { question: `What else changes the ${s} result?`, answer: profile.facts[2] },
    );
  }
  faqs.push({
    question: `Is this an official ${profile.slug === "omsas" ? "OMSAS" : s} calculator?`,
    answer: `No — it is an independent tool built from the published tables listed under Sources, checked on ${profile.sources[0].checked}. Your official ${profile.slug === "omsas" ? "OMSAS GPA appears in your application's Document Tracking section" : "result is the one on your transcript"}.`,
  });
  return faqs;
}

export function buildCaUniversityCopy(profile: CaUniversityProfile): GeoPageCopy {
  const meta: Record<CaUniversityProfile["slug"], { title: string; h1: string; description: string; keywords: string[] }> = {
    omsas: {
      title: "OMSAS GPA Calculator — OUAC 4.0 Conversion Table",
      h1: "OMSAS GPA Calculator",
      description:
        "Calculate your OMSAS GPA with the official OUAC conversion table: pick your university's scale, weight full- and half-year courses, and see your 4.0 GPA.",
      keywords: ["omsas gpa calculator", "ouac gpa conversion", "omsas gpa", "ontario medical school gpa", "convert percentage to gpa canada"],
    },
    ubc: {
      title: "UBC GPA Calculator — Average, 4.33 & OMSAS 4.0",
      h1: "UBC GPA Calculator",
      description:
        "Calculate your UBC credit-weighted average and letter grade, its UBC Arts 4.33 equivalent, and the OMSAS 4.0 GPA, using UBC's published grading tables.",
      keywords: ["ubc gpa calculator", "ubc average calculator", "ubc 4.33 gpa", "4.33 gpa calculator", "ubc grading scale"],
    },
    uoft: {
      title: "U of T GPA Calculator & UofT Grading Scale",
      h1: "University of Toronto GPA Calculator",
      description:
        "Calculate your U of T CGPA (St. George, UTM or UTSC) from percentages or letters on the official Refined Letter Grade Scale, plus the OMSAS 4.0 GPA.",
      keywords: ["uoft gpa calculator", "u of t gpa calculator", "university of toronto gpa calculator", "uoft grading scale", "cgpa uoft", "utm gpa calculator", "utsc gpa calculator"],
    },
    waterloo: {
      title: "Waterloo GPA Calculator — Average & OMSAS 4.0",
      h1: "Waterloo Average & GPA Calculator",
      description:
        "Calculate your University of Waterloo unit-weighted average the way the calendar does (marks under 32 count as 32), then convert it to the OMSAS 4.0 scale.",
      keywords: ["waterloo gpa calculator", "uwaterloo average calculator", "waterloo cumulative average", "waterloo to 4.0 gpa"],
    },
    guelph: {
      title: "Guelph Grade Calculator — Average, Scale & GPA",
      h1: "University of Guelph Grade Calculator",
      description:
        "Calculate your University of Guelph credit-weighted average and letter grade with the official grading scale (A+ = 90–100%), then see the OMSAS 4.0 GPA.",
      keywords: [
        "grade calculator guelph",
        "university of guelph grade calculator",
        "guelph average calculator",
        "guelph grading scale",
        "guelph gpa calculator",
      ],
    },
    york: {
      title: "York GPA Calculator & YorkU Grading Scale",
      h1: "York University GPA Calculator",
      description:
        "Calculate your York University GPA on the official 9-point scale (A+ = 9) from percentages or letters and 3.00/6.00 credits, plus the OMSAS 4.0 conversion.",
      keywords: [
        "york gpa calculator",
        "yorku gpa calculator",
        "york university gpa calculator",
        "yorku grading scale",
        "york university grading scale",
      ],
    },
    mcmaster: {
      title: "McMaster GPA Calculator & 12-Point Grading Scale",
      h1: "McMaster GPA Calculator",
      description:
        "Calculate your McMaster GPA on the official 12-point scale (A+ = 12, 90–100%) from percentages or letters and 3/6 units, plus the OMSAS 4.0 conversion.",
      keywords: ["mcmaster gpa calculator", "mcmaster grading scale", "mcmaster 12 point scale", "mcmaster gpa", "mcmaster cumulative average"],
    },
    queens: {
      title: "Queen's GPA Calculator & Grading Scale (4.3)",
      h1: "Queen's University GPA Calculator",
      description:
        "Calculate your Queen's University GPA on the official 4.3 scale (A+ = 90–100%) from percentages or letters, weighting full-year courses double, plus OMSAS 4.0.",
      keywords: ["queens gpa calculator", "queen's university grading scale", "queens grading scale", "queen's gpa calculator", "queens 4.3 gpa"],
    },
    uottawa: {
      title: "uOttawa GPA Calculator & Grading Scale (10-Pt)",
      h1: "University of Ottawa GPA Calculator",
      description:
        "Calculate your uOttawa CGPA on the official 10-point scale (A+ = 10) from percentages or letters with course units, per Regulation A-3, plus OMSAS 4.0.",
      keywords: ["uottawa gpa calculator", "uottawa grading scale", "uottawa cgpa calculator", "university of ottawa gpa calculator", "uottawa 10 point scale"],
    },
    western: {
      title: "Western (UWO) Average Calculator & Grading Scale",
      h1: "Western University Average Calculator",
      description:
        "Calculate your Western University (UWO) weighted average the way the calendar does (marks below 40 count as 40), with the A+–F scale and an OMSAS 4.0 GPA.",
      keywords: ["western gpa calculator", "uwo gpa calculator", "western university average calculator", "uwo grading scale", "grade calculator uwo"],
    },
    laurier: {
      title: "Laurier GPA Calculator & 12-Point Grading Scale",
      h1: "Wilfrid Laurier GPA Calculator",
      description:
        "Calculate your Wilfrid Laurier GPA on the 12-point scale (A+ = 12) from percentages or letters with 0.25–1.5 credit weights, plus the OMSAS 4.0 conversion.",
      keywords: ["laurier gpa calculator", "laurier grading scale", "wilfrid laurier gpa calculator", "laurier grade calculator", "wlu gpa calculator"],
    },
    tmu: {
      title: "TMU GPA Calculator & Grading Scale (4.33)",
      h1: "Toronto Metropolitan University GPA Calculator",
      description:
        "Calculate your TMU GPA on the official 4.33 scale (A+ = 90–100%) from percentages or letters, rounded first as TMU does, for one- and two-term courses.",
      keywords: ["tmu gpa calculator", "tmu grading scale", "tmu grade calculator", "toronto metropolitan university gpa calculator", "ryerson gpa calculator"],
    },
    sfu: {
      title: "SFU GPA Calculator & SFU Grading Scale (4.33)",
      h1: "SFU GPA Calculator",
      description:
        "Calculate your Simon Fraser University term GPA or CGPA from letter grades and units on SFU's official 4.33 scale (A+ = 4.33), plus the OMSAS 4.0 conversion.",
      keywords: ["sfu gpa calculator", "sfu grading scale", "simon fraser gpa calculator", "calculate gpa sfu", "sfu cgpa calculator"],
    },
    mcgill: {
      title: "McGill GPA Calculator & Grading Scale (4.0)",
      h1: "McGill GPA Calculator",
      description:
        "Calculate your McGill TGPA or CGPA from letters or percentages and credits on McGill's official 4.0 scale — truncated to two decimals, exactly as McGill does.",
      keywords: ["mcgill gpa calculator", "mcgill grading scale", "calculate gpa mcgill", "mcgill grade calculator", "mcgill cgpa calculator"],
    },
  };
  const m = meta[profile.slug];

  const nativeResult =
    profile.slug === "omsas"
      ? "your OMSAS 4.0 GPA"
      : profile.result === "gpa"
        ? `your ${profile.shortName} GPA on its ${profile.gpaScale ?? "4.0"} scale`
        : `your ${profile.shortName} ${profile.weightLabel.toLowerCase()}-weighted percentage average`;

  const gradeWord =
    profile.gradeInput === "percent"
      ? "percentage mark"
      : profile.gradeInput === "letter"
        ? "letter grade"
        : "percentage or letter grade";
  const withOmsas = profile.slug !== "omsas" && profile.omsasScales.length > 0;
  const intro = [
    `${m.h1}: enter each course's ${gradeWord} and its ${profile.weightLabel.toLowerCase()}. The calculator returns ${nativeResult}${
      withOmsas ? ", plus the 4.0 GPA OUAC calculates when you apply to Ontario medical schools through OMSAS" : ""
    }.`,
    profile.facts[0],
    `Every cut-off on this page comes from ${listJoin([...new Set(profile.sources.map((src) => src.publisher))])}; nothing is estimated.`,
  ];

  const steps =
    profile.slug === "omsas"
      ? [
          "Pick the university on your transcript — it sets the OUAC scale.",
          "Enter each course's percentage or letter grade.",
          "Choose the course length: full-year 2, half-year 1, three-quarter 1.5, lab 0.5.",
          "Read your OMSAS GPA, weighted by course length.",
        ]
      : [
          `Enter each course's ${profile.gradeInput === "percent" ? "percentage" : profile.gradeInput === "letter" ? "letter grade" : "percentage or letter"}.`,
          `Choose its ${profile.weightLabel.toLowerCase()} (${profile.weightOptions.map((o) => o.weight).join(", ")}).`,
          `Read ${nativeResult}${profile.slug === "ubc" ? ", letter and 4.33 equivalent" : ""}.`,
          ...(withOmsas ? ["Compare it with the OMSAS 4.0 GPA shown underneath."] : []),
        ];

  const sections: GeoPageSection[] = [
    {
      heading: profile.slug === "omsas" ? "How OMSAS calculates your GPA" : `How ${profile.shortName} grades work`,
      bullets: profile.facts,
    },
  ];
  const native = nativeTableSection(profile);
  if (native) sections.push(native);
  if (profile.slug === "omsas") sections.push(...omsasTablesSection());
  sections.push(exampleSection(profile));

  return {
    ...m,
    intro,
    steps,
    sections,
    faqs: caFaqs(profile),
    sources: profile.sources,
  };
}

/* ───────────────────────── US state EOC pages ───────────────────────── */

function required(classAverage: number, target: number, weight: number): string {
  const result = calculateEocGrade({ currentGrade: classAverage, eocWeight: weight, targetGrade: target });
  if (result.status !== "valid" || !result.data) return "—";
  if (result.data.status === "impossible") return "Not reachable";
  if (result.data.status === "already_met") return "Already met";
  return `${result.data.requiredPercent.toFixed(1)}%`;
}

function weightsToShow(rule: UsEocStateRule): number[] {
  if (rule.weight.kind === "range") return [rule.weight.min, rule.weight.max];
  if (rule.weight.kind === "minimum") return [rule.weight.percent, rule.weight.percent + 10];
  return [rule.weight.percent];
}

export function buildUsEocStateCopy(rule: UsEocStateRule): GeoPageCopy {
  const w = rule.defaultWeight;
  const weightPhrase = eocWeightText(rule);
  const titles: Record<UsEocStateRule["slug"], string> = {
    florida: "Florida EOC Grade Calculator — 30% of Final Grade",
    georgia: "Georgia EOC Calculator — Milestones 10% Minimum",
    "north-carolina": "NC EOC Grade Calculator — 20% of Final Grade",
    tennessee: "Tennessee EOC Grade Calculator — 5–15% Weight",
  };
  const ruleSentence =
    rule.weight.kind === "fixed"
      ? `${rule.state} law fixes the EOC at ${w}% of the final course grade, so this calculator opens at ${w}%.`
      : rule.weight.kind === "minimum"
        ? `${rule.state} sets a floor of ${w}% — your district can count the EOC for more, so check your syllabus and change the weight if it is higher.`
        : `${rule.state} lets each district pick a weight from ${rule.weight.min}% to ${rule.weight.max}%. The calculator opens at ${w}%, the top of the range; enter your district's figure if it is lower.`;

  const exampleClass = 82;
  const exampleTarget = 80;
  const example = calculateEocGrade({ currentGrade: exampleClass, eocWeight: w, targetGrade: exampleTarget });
  const exampleNeed = example.data ? example.data.requiredPercent : 0;
  const altWeight = weightsToShow(rule).find((x) => x !== w);

  const sections: GeoPageSection[] = [
    {
      heading: `${rule.state}'s EOC rule`,
      quote: { text: rule.quote, cite: `${rule.citation} — ${rule.effective}` },
      paragraphs: [ruleSentence],
      bullets: rule.facts,
    },
    {
      heading: `Courses with a ${rule.state} EOC`,
      paragraphs: [
        rule.courses.length
          ? `The rule applies to ${listJoin(rule.courses)}. Other courses use your teacher's own final exam, so use the regular final grade calculator for those.`
          : `The rule covers every course assessed by a ${rule.examName.replace(/s$/, "")}. Your school's course catalog lists which of your courses end with one.`,
      ],
    },
    {
      heading: "EOC score needed for common targets",
      paragraphs: [
        `Required EOC score = (target − class average × (1 − weight)) ÷ weight. The table runs the formula at ${listJoin(
          weightsToShow(rule).map((x) => `${x}%`),
        )} for a few class averages.`,
      ],
      table: {
        caption: `${rule.state} EOC score needed`,
        head: ["Class average", "EOC weight", "Target 70%", "Target 80%", "Target 90%"],
        rows: [70, 80, 90].flatMap((avg) =>
          weightsToShow(rule).map((weight) => [`${avg}%`, `${weight}%`, required(avg, 70, weight), required(avg, 80, weight), required(avg, 90, weight)]),
        ),
      },
    },
    {
      heading: "Worked example",
      paragraphs: [
        `You have an ${exampleClass}% class average going into the ${rule.state} EOC and want to finish the course with at least ${exampleTarget}%. With the EOC worth ${w}%, your classwork carries ${100 - w}% of the grade: ${exampleClass} × ${(1 - w / 100).toFixed(2)} = ${(exampleClass * (1 - w / 100)).toFixed(1)} points. You need ${exampleTarget} − ${(exampleClass * (1 - w / 100)).toFixed(1)} = ${(exampleTarget - exampleClass * (1 - w / 100)).toFixed(1)} more points from the EOC, so the EOC score needed is ${(exampleTarget - exampleClass * (1 - w / 100)).toFixed(1)} ÷ ${(w / 100).toFixed(2)} = ${exampleNeed.toFixed(1)}%.`,
        altWeight
          ? `At ${altWeight}% the same student would need ${required(exampleClass, exampleTarget, altWeight)} — the weight changes the answer a lot, so confirm your district's figure.`
          : `Because the weight is fixed by statute, the answer only changes with your class average and target.`,
      ],
    },
    {
      heading: "How other states weight the EOC",
      table: {
        caption: "Verified statewide EOC weights",
        head: ["State", "EOC share of course grade", "Rule"],
        rows: usEocStateRules.map((other) => [other.state, eocWeightText(other), other.citation]),
      },
      paragraphs: [
        `We only publish a state once its rule is confirmed in the statute or state board text. Not listed: ${listJoin(
          droppedUsEocCandidates.map((d) => d.name),
        )} — none has a statewide course-grade weight we could verify as in force.`,
      ],
    },
  ];

  const faqs: FaqItem[] = [
    {
      question: `How much is the ${rule.state} EOC worth?`,
      answer: `It counts for ${weightPhrase} under ${rule.citation}. ${ruleSentence}`,
    },
    {
      question: `Can my district use a different EOC weight?`,
      answer:
        rule.weight.kind === "fixed"
          ? `No — the ${w}% figure is written into state law for ${listJoin(rule.courses)}. Grades for other courses follow district policy.`
          : rule.weight.kind === "minimum"
            ? `Yes, upward. The state rule sets ${w}% as the minimum, and a district can make the EOC count for more.`
            : `Yes, within ${rule.weight.min}%–${rule.weight.max}%. Each district's board policy sets one figure in that range.`,
    },
    {
      question: `What EOC score do I need to keep a B?`,
      answer: `With an 85% class average and the EOC at ${w}%, you need ${required(85, 80, w)} on the EOC to finish at 80%. With a 78% average you need ${required(78, 80, w)}.`,
    },
    {
      question: "Is the EOC the same as my final exam?",
      answer:
        rule.slug === "georgia"
          ? "In Georgia, yes — the rule says the Milestones EOC shall be used as the final exam in the courses it assesses."
          : "It is the state's end-of-course test. Some schools also give a teacher final; if yours does, ask how the two are combined before you use the calculator.",
    },
    {
      question: "Does the calculator use my state's letter-grade scale?",
      answer:
        "It works in percentages, which is how the EOC weight is applied. Convert the final percentage with your district's grading scale.",
    },
  ];

  return {
    title: titles[rule.slug],
    h1: `${rule.state} EOC Grade Calculator`,
    description: `${rule.state} EOC calculator: the EOC counts for ${weightPhrase}. Enter your average and goal to see the score you need.`,
    keywords: [
      `${rule.state.toLowerCase()} eoc calculator`,
      `${rule.state.toLowerCase()} eoc grade calculator`,
      `${rule.abbreviation.toLowerCase()} eoc percentage of final grade`,
      "eoc calculator",
      "end of course exam calculator",
    ],
    intro: [
      `${rule.state} EOC grade calculator: enter your class average before the ${rule.examName.replace(/s$/, "")} and the course grade you want, and it solves for the EOC score you need.`,
      `${rule.state} sets the weight in ${rule.citation}, and the calculator opens at ${w}% — the figure that rule names.`,
      `Source: ${rule.source.title} (${rule.source.publisher}), checked ${rule.source.checked}.`,
    ],
    steps: [
      "Enter your class average before the EOC.",
      "Enter the report-card grade you want.",
      rule.weight.kind === "fixed" ? `Keep the EOC weight at ${w}%.` : `Check the EOC weight — change it if your district uses a different figure.`,
      "Read the EOC score you need.",
    ],
    sections,
    faqs,
    sources: [rule.source],
  };
}

/* ───────────────────────── Australian state ATAR pages ───────────────────────── */

const ATAR_STATE_META: Record<AuAtarState["slug"], { title: string; h1: string; description: string; keywords: string[] }> = {
  vce: {
    title: "VCE ATAR Calculator — VTAC Aggregate Estimate",
    h1: "VCE ATAR Calculator",
    description:
      "Estimate your VCE ATAR the VTAC way: your best English-group study plus the next three, and 10% of a fifth and sixth study. A planning estimate, not VTAC's.",
    keywords: ["vce atar calculator", "atar calculator vce", "vtac atar calculator", "atar vce calculator", "victoria atar calculator"],
  },
  hsc: {
    title: "HSC ATAR Calculator — UAC Best 10 Units",
    h1: "HSC ATAR Calculator",
    description:
      "Estimate your NSW HSC ATAR the UAC way: your best 2 units of English plus your best 8 other units, with 1-unit Extension courses. A planning estimate only.",
    keywords: ["hsc atar calculator", "atar calculator hsc", "uac atar calculator", "nsw atar calculator", "atar hsc calculator"],
  },
  qce: {
    title: "QCE ATAR Calculator (QLD) — QTAC Best Five",
    h1: "QCE ATAR Calculator (Queensland)",
    description:
      "Estimate your Queensland ATAR the QTAC way: your best five eligible scaled results from General, Applied or VET inputs, with the English C requirement checked.",
    keywords: ["qce atar calculator", "atar calculator qld", "qld atar calculator", "atar calculator qce", "qtac atar calculator"],
  },
  wace: {
    title: "WACE ATAR Calculator — TISC TEA & Bonuses",
    h1: "WACE ATAR Calculator",
    description:
      "Estimate your WA ATAR from your Tertiary Entrance Aggregate: best four scaled scores plus TISC's 10% LOTE, Methods and Specialist bonuses (maximum TEA 430).",
    keywords: ["wace atar calculator", "atar calculator wace", "tisc atar calculator", "wa atar calculator", "tea calculator wa"],
  },
  sace: {
    title: "SACE ATAR Calculator — SATAC 90-Credit Aggregate",
    h1: "SACE ATAR Calculator",
    description:
      "Plan your SACE university aggregate the SATAC way: your best three 20-credit subjects plus a 30-credit flexible option, out of 90. Covers SA and NT (NTCET).",
    keywords: ["sace atar calculator", "atar calculator sace", "satac atar calculator", "sa atar calculator", "sace grade calculator"],
  },
};

export function buildAuAtarStateCopy(state: AuAtarState): GeoPageCopy {
  const m = ATAR_STATE_META[state.slug];
  const outcome = calculateAtar({ subjects: state.subjects, authority: state.authority });
  if (!outcome.data) throw new Error(`Example for ${state.slug} must calculate`);
  const example = outcome.data;
  const showsAtar = example.planningAtarRounded != null;

  return {
    ...m,
    intro: [
      `${m.h1}: enter your scaled ${state.slug === "vce" ? "study scores" : "results"} and the calculator applies ${state.centre}'s rules for which subjects count toward a ${state.region} ATAR, then shows ${showsAtar ? "a planning ATAR" : "your counted average"}.`,
      state.facts[0],
      `The counting rules on this page come from ${state.source.publisher}. The ATAR itself is only an estimate: admissions centres rescale results every year.`,
    ],
    steps: [
      `Enter each ${state.certificate} subject with its scaled score on a 0–100 scale.`,
      state.slug === "hsc"
        ? "Tick English courses and set each course's units (2, or 1 for Extension)."
        : state.slug === "qce"
          ? "Mark each subject General, Applied or VET, and confirm your English result."
          : state.slug === "wace"
            ? "Mark LOTE, Mathematics Methods and Mathematics Specialist rows for the 10% bonuses."
            : state.slug === "vce"
              ? "Name your English-group study (English, EAL, Literature or English Language) so it is counted first."
              : "Add your Stage 2 subjects; the best three 20-credit results count in full.",
      showsAtar ? "Read the counted average and the planning ATAR." : "Read the counted average — SATAC does not recommend predicting an ATAR.",
    ],
    sections: [
      { heading: `How ${state.centre} calculates your ATAR`, bullets: state.facts },
      { heading: "What this calculator models", paragraphs: [state.modelNote] },
      {
        heading: "Worked example",
        paragraphs: [
          state.authority === "satac"
            ? `With the subjects below, the best three results (${example.countedScores.slice(0, 3).map((n) => n.toFixed(1)).join(", ")}) count in full and the next results fill the 30-credit flexible option, for a counted average of ${example.countedAverage.toFixed(2)} on the 0–100 input scale.`
            : `With the subjects below, ${state.centre}'s rules count ${example.countedScores.map((n) => n.toFixed(1)).join(", ")} for a counted average of ${example.countedAverage.toFixed(2)}${
                showsAtar ? ` — a planning ATAR of about ${example.planningAtarRounded}` : ""
              }.`,
          `Steps: ${example.formulaSteps.slice(1).join(" ")}`,
        ],
        table: {
          caption: `Example ${state.certificate} subjects`,
          head: ["Subject", "Scaled score (0–100)"],
          rows: state.subjects.map((s) => [
            `${s.name ?? "Subject"}${s.hscUnits === 1 ? " (1 unit)" : ""}${s.waceBonus === "lote" ? " (LOTE)" : s.waceBonus === "maths-methods" ? " (Methods)" : ""}`,
            String(s.scaledScore),
          ]),
        },
      },
    ],
    faqs: [
      { question: `How is the ${state.certificate} ATAR calculated?`, answer: `${state.facts[0]} ${state.facts[1]}` },
      { question: `Is this an official ${state.centre} ATAR?`, answer: `No. ${state.centre} calculates the official ATAR from your final scaled results. ${state.modelNote}` },
      { question: `What else does ${state.centre} require?`, answer: state.facts[2] },
      {
        question: "Can I convert my ATAR to a GPA?",
        answer: "No. An ATAR is a rank of your Year 12 results against your age group, not a grade average, so there is no valid ATAR-to-GPA or ATAR-to-percentage conversion.",
      },
    ],
    sources: [state.source],
  };
}

export function caUniversityCopyBySlug(slug: CaUniversityProfile["slug"]): GeoPageCopy {
  return buildCaUniversityCopy(caUniversityBySlug[slug]);
}

/** Plain text of everything the page renders, for word-count checks. */
export function geoCopyText(copy: GeoPageCopy): string {
  return [
    copy.h1,
    copy.description,
    ...copy.intro,
    ...copy.steps,
    ...copy.sections.flatMap((s) => [
      s.heading,
      ...(s.paragraphs ?? []),
      ...(s.bullets ?? []),
      s.quote ? `${s.quote.text} ${s.quote.cite}` : "",
      s.table ? [s.table.caption, ...s.table.head, ...s.table.rows.flat()].join(" ") : "",
    ]),
    ...copy.faqs.flatMap((f) => [f.question, f.answer]),
    ...copy.sources.map((src) => `${src.publisher} ${src.title} ${src.checked}`),
  ].join(" ");
}
