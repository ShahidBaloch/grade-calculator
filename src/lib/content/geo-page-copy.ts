import {
  OMSAS_COURSE_WEIGHTS,
  OMSAS_RULES,
  OMSAS_SCALES,
  OMSAS_UNIVERSITY_SCALES,
  type OmsasScaleNumber,
} from "@/data/geo-sources/omsas";
import {
  caUniversityBySlug,
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
  omsasScalesForUniversity,
  type UniversityCourseInput,
} from "@/lib/calculators/ca-university-gpa";
import { calculateEocGrade } from "@/lib/calculators/eoc-grade";
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
};

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
  if (profile.slug === "uoft") head.push("U of T points");
  if (profile.slug === "ubc") head.push("UBC Arts 4.33");
  head.push("OMSAS points");

  const rows = data.courses.map((course) => {
    const row = [course.name, course.percent != null ? pct(course.percent) : course.grade, String(course.weight)];
    if (profile.slug === "uoft") row.push(pts(course.points!));
    if (profile.slug === "ubc") row.push(String(course.equivalency433));
    row.push(
      `${pts(course.omsas.points)}${course.omsas.viaLetter ? ` (via ${course.omsas.viaLetter})` : ""}`,
    );
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
    paragraphs.push(`The ${profile.shortName} GPA for these courses is ${gpa(data.native.value)}.`);
  }
  if (data.equivalency433 != null) {
    paragraphs.push(
      `Using the UBC Arts percentage equivalencies, the same courses work out to ${gpa(data.equivalency433)} on a 4.33 scale.`,
    );
  }
  paragraphs.push(
    profile.slug === "omsas"
      ? `For a University of Toronto transcript (OUAC Scales 3 and 7), OMSAS converts the percentages with Scale 3 and the letter grade with Scale 7. Weighted by course length, the OMSAS GPA is ${gpa(data.omsasGpa)}.`
      : `OMSAS would convert the same transcript to ${gpa(data.omsasGpa)} on its 4.0 scale${
          profile.slug === "uoft" && Math.abs(data.omsasGpa - data.native.value) > 0.004
            ? ` — not ${gpa(data.native.value)}, because OMSAS gives an 85–89% A 3.9 while U of T gives it 4.0`
            : ""
        }.`,
  );
  paragraphs.push(`Steps: ${data.formulaSteps.join("; ")}.`);

  return {
    heading: "Worked example",
    paragraphs,
    table: { caption: `Example ${profile.shortName} transcript`, head, rows },
  };
}

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
  if (profile.slug === "uoft") head.push("U of T grade points");
  if (profile.slug === "ubc") head.push("UBC Arts 4.33 (at the low end)");
  head.push("OMSAS 4.0");

  const rows = profile.bands.map((band) => {
    const row = [band.letter, `${band.min}–${band.max}%`];
    if (profile.slug === "uoft") row.push(pts(band.points!));
    if (profile.slug === "ubc") {
      row.push(band.min >= 50 ? String(UBC_ARTS_433_EQUIVALENCY[Math.min(band.min, 90)]) : "—");
    }
    const omsas = convertToOmsas(
      profile.slug === "ubc" ? { percent: null, letter: band.letter === "F" ? "E/F" : band.letter } : { percent: band.min, letter: null },
      profile.omsasScales,
    );
    row.push(typeof omsas === "string" ? "—" : pts(omsas.points));
    return row;
  });

  return {
    heading: `${profile.shortName} grading scale`,
    paragraphs: [
      profile.slug === "ubc"
        ? "This is the percentage-to-letter table UBC Vancouver uses in most faculties. Some faculties and graduate programs set a higher pass mark (for example, F below 60% in Medicine, Nursing and graduate master's programs)."
        : "This is the undergraduate Refined Letter Grade Scale from U of T's Grading Practices Policy. Each course grade carries the grade points shown; your GPA is the weighted average of those points.",
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
  } else {
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
        "Calculate your OMSAS GPA with the official OUAC conversion table: pick your university's scale, weight full-year and half-year courses, and see your 4.0 GPA.",
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
      title: "U of T GPA Calculator — University of Toronto 4.0",
      h1: "University of Toronto GPA Calculator",
      description:
        "Calculate your U of T GPA from percentages or letters with the official Refined Letter Grade Scale and 0.5/1.0 course weights, plus the OMSAS 4.0 conversion.",
      keywords: ["uoft gpa calculator", "u of t gpa calculator", "university of toronto gpa calculator", "uoft grading scale", "cgpa uoft"],
    },
    waterloo: {
      title: "Waterloo GPA Calculator — Average & OMSAS 4.0",
      h1: "Waterloo Average & GPA Calculator",
      description:
        "Calculate your University of Waterloo unit-weighted average the way the calendar does (marks under 32 count as 32), then convert it to the OMSAS 4.0 scale.",
      keywords: ["waterloo gpa calculator", "uwaterloo average calculator", "waterloo cumulative average", "waterloo to 4.0 gpa"],
    },
  };
  const m = meta[profile.slug];

  const nativeResult =
    profile.slug === "omsas"
      ? "your OMSAS 4.0 GPA"
      : profile.result === "gpa"
        ? `your ${profile.shortName} GPA on its 4.0 scale`
        : `your ${profile.shortName} ${profile.weightLabel.toLowerCase()}-weighted percentage average`;

  const intro = [
    `${m.h1}: enter each course's ${profile.gradeInput === "percent" ? "percentage mark" : "percentage or letter grade"} and its ${profile.weightLabel.toLowerCase()}. The calculator returns ${nativeResult}${
      profile.slug === "omsas" ? "" : ", plus the 4.0 GPA OUAC calculates when you apply to Ontario medical schools through OMSAS"
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
          `Enter each course's ${profile.gradeInput === "percent" ? "percentage" : "percentage or letter"}.`,
          `Choose its ${profile.weightLabel.toLowerCase()} (${profile.weightOptions.map((o) => o.weight).join(", ")}).`,
          `Read ${nativeResult}${profile.slug === "ubc" ? ", letter and 4.33 equivalent" : ""}.`,
          "Compare it with the OMSAS 4.0 GPA shown underneath.",
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
