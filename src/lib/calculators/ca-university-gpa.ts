import {
  OMSAS_SCALES,
  OMSAS_UNIVERSITY_SCALES,
  type OmsasScaleNumber,
} from "@/data/geo-sources/omsas";
import {
  UBC_ARTS_433_EQUIVALENCY,
  UBC_BANDS,
  type CaUniversityProfile,
  type UniversityBand,
} from "@/data/geo-sources/ca-universities";

export interface UniversityCourseInput {
  name?: string;
  /** Percentage ("84") or letter ("A-") exactly as on the transcript. */
  grade: string;
  weight: number;
}

export interface ParsedGrade {
  percent: number | null;
  letter: string | null;
}

export interface OmsasConversion {
  points: number;
  scale: OmsasScaleNumber;
  /** Letter OMSAS looked up when it converted a percentage through the school's letter table (UBC). */
  viaLetter?: string;
}

export interface UniversityCourseResult {
  name: string;
  grade: string;
  weight: number;
  /** Points on the school's own scale (U of T). */
  points: number | null;
  percent: number | null;
  /** UBC Arts 4.33 equivalency for this mark. */
  equivalency433: number | null;
  /** Null when the school is not in the OUAC conversion table. */
  omsas: OmsasConversion | null;
}

export interface UniversityGpaResult {
  courses: UniversityCourseResult[];
  totalWeight: number;
  /** School's native result: GPA (U of T, OMSAS) or percentage average (UBC, Waterloo). */
  native: { kind: "gpa"; value: number } | { kind: "percent-average"; value: number; letter: string | null };
  /** Credit-weighted mean of the UBC Arts 4.33 equivalencies (UBC only). */
  equivalency433: number | null;
  /** OMSAS 4.0 GPA, weighted by OMSAS course length; null when the school is not in the OUAC table. */
  omsasGpa: number | null;
  omsasTotalWeight: number;
  formulaSteps: string[];
}

export type UniversityGpaOutcome =
  | { status: "valid"; data: UniversityGpaResult }
  | { status: "idle" }
  | { status: "error"; errors: string[] };

/** Accepts "A-", "A−", "a minus" style input and the E/F row. */
export function normalizeLetter(raw: string): string {
  const compact = raw.trim().toUpperCase().replace(/[−–—]/g, "-").replace(/\s+/g, "");
  if (compact === "F" || compact === "E" || compact === "E/F") return "E/F";
  return compact;
}

export function parseGrade(raw: string): ParsedGrade | null {
  const text = raw.trim().replace(/%$/, "");
  if (text === "") return null;
  if (/^\d+(\.\d+)?$/.test(text)) {
    const percent = Number(text);
    return percent >= 0 && percent <= 100 ? { percent, letter: null } : null;
  }
  const letter = normalizeLetter(text);
  return /^(A\+|A-|A|B\+|B-|B|C\+|C-|C|D\+|D-|D|E\/F)$/.test(letter) ? { percent: null, letter } : null;
}

/** Highest band whose minimum the mark reaches — compares the raw mark, never rounds up. */
export function bandForPercent(bands: UniversityBand[], percent: number): UniversityBand | null {
  return (
    bands
      .filter((band) => band.min != null)
      .sort((a, b) => b.min! - a.min!)
      .find((band) => percent >= band.min!) ?? null
  );
}

function sameLetter(a: string, b: string): boolean {
  return normalizeLetter(a) === normalizeLetter(b);
}

/**
 * The school's band for a typed letter. An exact match comes first so schools that grade E and F
 * separately (York: E = 1, F = 0) keep them apart; OMSAS merges them into E/F either way.
 */
function bandForLetter(bands: UniversityBand[], typed: string): UniversityBand | undefined {
  const exact = typed.trim().toUpperCase().replace(/[−–—]/g, "-").replace(/\s+/g, "");
  return bands.find((band) => band.letter === exact) ?? bands.find((band) => sameLetter(band.letter, typed));
}

/** OUAC scales for a university name as OUAC prints it. */
export function omsasScalesForUniversity(name: string): OmsasScaleNumber[] | null {
  return OMSAS_UNIVERSITY_SCALES.find((row) => row.name === name)?.scales ?? null;
}

/**
 * Convert one course grade to OMSAS 4.0 points.
 * Percentages use the school's percentage scale; letters use its alpha scale. When a school only has an
 * alpha scale but the student types a percentage, a school letter table (UBC) bridges the gap — OMSAS
 * uses UBC letter grades. Without that table we refuse rather than guess.
 */
export function convertToOmsas(
  grade: ParsedGrade,
  scales: OmsasScaleNumber[],
  percentToLetter?: UniversityBand[],
): OmsasConversion | string {
  if (grade.percent != null) {
    const percentScale = scales.map((n) => OMSAS_SCALES[n]).find((scale) => scale.kind === "percentage");
    if (percentScale && percentScale.kind === "percentage") {
      const row = [...percentScale.rows].sort((a, b) => b.min - a.min).find((r) => grade.percent! >= r.min);
      if (row) return { points: row.points, scale: percentScale.scale };
    }
    if (percentToLetter) {
      const band = bandForPercent(percentToLetter, grade.percent);
      if (band) {
        const viaLetter = convertToOmsas({ percent: null, letter: normalizeLetter(band.letter) }, scales);
        if (typeof viaLetter !== "string") return { ...viaLetter, viaLetter: band.letter };
      }
    }
    return "this university is on a letter-grade OMSAS scale — enter the letter from your transcript";
  }

  const alphaScale = scales.map((n) => OMSAS_SCALES[n]).find((scale) => scale.kind === "alpha");
  if (!alphaScale || alphaScale.kind !== "alpha") {
    return "this university is on a percentage OMSAS scale — enter the percentage from your transcript";
  }
  const row = alphaScale.rows.find((r) => sameLetter(r.grade, grade.letter!));
  if (!row) return `${grade.letter} is not a grade on OMSAS Scale ${alphaScale.scale}`;
  return { points: row.points, scale: alphaScale.scale };
}

/** UBC Arts 4.33 equivalency. Marks are whole numbers on UBC transcripts, so we round to the nearest one. */
export function ubcEquivalency433(percent: number): number {
  const whole = Math.round(percent);
  if (whole >= 90) return 4.33;
  // UBC Arts lists 50–90 only; a failing mark (below 50) earns no grade points.
  if (whole < 50) return 0;
  return UBC_ARTS_433_EQUIVALENCY[whole];
}

function round(value: number, places = 2): number {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

export function calculateUniversityGpa(
  courses: UniversityCourseInput[],
  profile: CaUniversityProfile,
  options: { omsasScales?: OmsasScaleNumber[]; omsasUniversity?: string } = {},
): UniversityGpaOutcome {
  const omsasScales = options.omsasScales ?? profile.omsasScales;
  // OMSAS reads UBC transcripts by letter; the UBC page (and OMSAS with UBC picked) bridge % → UBC letter.
  // Any other school on a letter-only OUAC scale (York, Scale 9) bridges through its own table.
  const letterOnly = !omsasScales.some((n) => OMSAS_SCALES[n].kind === "percentage");
  const bridge =
    profile.slug === "ubc" || options.omsasUniversity === "UBC"
      ? UBC_BANDS
      : letterOnly && profile.bands.length
        ? profile.bands
        : undefined;
  const errors: string[] = [];
  const results: UniversityCourseResult[] = [];

  for (const [index, course] of courses.entries()) {
    const label = course.name?.trim() || `Course ${index + 1}`;
    if (course.grade.trim() === "") continue;
    const parsed = parseGrade(course.grade);
    if (!parsed) {
      errors.push(`${label}: enter a percentage from 0 to 100 or a letter grade`);
      continue;
    }
    if (profile.gradeInput === "percent" && parsed.percent == null) {
      errors.push(`${label}: ${profile.shortName} reports percentages — enter the mark as a number`);
      continue;
    }
    if (profile.gradeInput === "letter" && parsed.letter == null) {
      errors.push(`${label}: ${profile.shortName} publishes no official percentages — enter the letter grade`);
      continue;
    }
    // Schools that round the final mark to a whole number before reading the letter (TMU, uOttawa).
    if (profile.roundPercent && parsed.percent != null) parsed.percent = Math.round(parsed.percent);
    if (!(course.weight > 0)) {
      errors.push(`${label}: ${profile.weightLabel.toLowerCase()} must be greater than 0`);
      continue;
    }

    // A school missing from the OUAC table gets no OMSAS figure rather than a guessed one.
    const omsas = omsasScales.length ? convertToOmsas(parsed, omsasScales, bridge) : null;
    if (typeof omsas === "string") {
      errors.push(`${label}: ${omsas}`);
      continue;
    }

    let points: number | null = null;
    if (profile.bands.some((band) => band.points != null)) {
      const band =
        parsed.percent != null
          ? bandForPercent(profile.bands, parsed.percent)
          : bandForLetter(profile.bands, course.grade);
      if (!band || band.points == null) {
        errors.push(`${label}: ${parsed.letter} is not on the ${profile.shortName} scale`);
        continue;
      }
      points = band.points;
    }

    results.push({
      name: label,
      grade: course.grade.trim(),
      weight: course.weight,
      points,
      percent: parsed.percent,
      equivalency433: profile.slug === "ubc" && parsed.percent != null ? ubcEquivalency433(parsed.percent) : null,
      omsas,
    });
  }

  if (errors.length) return { status: "error", errors };
  if (results.length === 0) return { status: "idle" };

  const totalWeight = results.reduce((sum, r) => sum + r.weight, 0);
  const omsasWeights = results.map((r) => r.weight * profile.omsasWeightFactor);
  const omsasTotalWeight = omsasWeights.reduce((sum, w) => sum + w, 0);
  const omsasGpa = omsasScales.length
    ? results.reduce((sum, r, i) => sum + r.omsas!.points * omsasWeights[i], 0) / omsasTotalWeight
    : null;
  const steps: string[] = [];

  let native: UniversityGpaResult["native"];
  if (profile.result === "gpa") {
    const raw =
      profile.slug === "omsas"
        ? omsasGpa!
        : results.reduce((sum, r) => sum + (r.points ?? 0) * r.weight, 0) / totalWeight;
    // McGill truncates to two decimals (3.596 → 3.59) instead of rounding.
    const value = profile.gpaRounding === "truncate" ? Math.floor(raw * 100 + 1e-9) / 100 : raw;
    native = { kind: "gpa", value };
    if (profile.slug !== "omsas") {
      steps.push(
        `${profile.shortName} GPA = (${results.map((r) => `${r.points!.toFixed(Number.isInteger(Math.round(r.points! * 1000) / 100) ? 1 : 2)}×${r.weight}`).join(" + ")}) ÷ ${round(totalWeight)} = ${value.toFixed(2)}${profile.gpaRounding === "truncate" ? " (truncated, not rounded)" : ""}`,
      );
    }
  } else {
    const floor = profile.averageFloor ?? 0;
    const marks = results.map((r) => Math.max(r.percent!, floor));
    const value = marks.reduce((sum, mark, i) => sum + mark * results[i].weight, 0) / totalWeight;
    const letter = profile.bands.length ? bandForPercent(profile.bands, value)?.letter ?? null : null;
    native = { kind: "percent-average", value, letter };
    steps.push(
      `${profile.shortName} average = (${marks.map((mark, i) => `${mark}×${results[i].weight}`).join(" + ")}) ÷ ${round(totalWeight)} = ${value.toFixed(2)}%`,
    );
    if (floor && results.some((r) => r.percent! < floor)) {
      steps.push(`Marks below ${floor} count as ${floor} in ${profile.shortName} averages.`);
    }
  }

  const equivalency433 =
    profile.slug === "ubc"
      ? results.reduce((sum, r) => sum + (r.equivalency433 ?? 0) * r.weight, 0) / totalWeight
      : null;
  if (equivalency433 != null) {
    steps.push(
      `UBC Arts 4.33 equivalent = (${results.map((r) => `${r.equivalency433}×${r.weight}`).join(" + ")}) ÷ ${round(totalWeight)} = ${equivalency433.toFixed(2)}`,
    );
  }

  if (omsasGpa != null) {
    steps.push(
      `OMSAS GPA = (${results.map((r, i) => `${r.omsas!.points.toFixed(1)}×${round(omsasWeights[i])}`).join(" + ")}) ÷ ${round(omsasTotalWeight)} = ${omsasGpa.toFixed(2)}`,
    );
  }

  return {
    status: "valid",
    data: {
      courses: results,
      totalWeight,
      native,
      equivalency433,
      omsasGpa,
      omsasTotalWeight,
      formulaSteps: steps,
    },
  };
}
