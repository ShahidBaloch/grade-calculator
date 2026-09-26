import { getScale, percentToLetter } from "./index";
import type { GradingScale, ScaleId } from "@/types/grading-scale";

const UQ_LETTER_TO_GPA: Record<string, number> = {
  HD: 7,
  D: 6,
  C: 5,
  P: 4,
};

const MONASH_LETTER_TO_GPA: Record<string, number> = {
  HD: 4,
  D: 3,
  C: 2,
  P: 1,
  NP: 0.7,
  "NEAR PASS": 0.7,
  F: 0.3,
  FAIL: 0.3,
  HF: 0.3,
  "HURDLE FAIL": 0.3,
  WF: 0,
  "WITHDRAWN FAIL": 0,
  N: 0.3,
};

function findBandByLetter(letter: string, scale: GradingScale) {
  const normalized = letter.trim().toUpperCase();
  const exact = scale.bands.find((band) => band.letter.toUpperCase() === normalized);
  if (exact) return exact;

  const byPrefix = scale.bands.find((band) => {
    const bandLetter = band.letter.toUpperCase();
    return bandLetter.startsWith(`${normalized} `) || bandLetter.startsWith(`${normalized}(`);
  });
  if (byPrefix) return byPrefix;

  if (scale.id === "au-uq-seven-point") {
    const fromAlias = UQ_LETTER_TO_GPA[normalized];
    if (fromAlias != null) {
      return scale.bands.find((band) => band.gpa === fromAlias);
    }
    const asNum = Number.parseInt(normalized, 10);
    if (Number.isInteger(asNum) && asNum >= 0 && asNum <= 7) {
      return scale.bands.find((band) => band.gpa === asNum);
    }
  }

  if (scale.id === "au-monash-four-point") {
    const fromAlias = MONASH_LETTER_TO_GPA[normalized];
    if (fromAlias != null) {
      return scale.bands.find((band) => band.gpa === fromAlias);
    }
  }

  return undefined;
}

function directNumericGradePoints(value: number, scaleId: ScaleId): number | null {
  if (scaleId === "au-uq-seven-point") {
    const rounded = Math.round(value);
    if (rounded >= 0 && rounded <= 7 && Math.abs(value - rounded) < 0.001) {
      const band = getScale(scaleId).bands.find((b) => b.gpa === rounded);
      return band?.gpa ?? null;
    }
  }
  return null;
}

/** Resolve a course grade input to GPA/grade points on the selected scale. */
export function resolveGradeToGpaPoints(
  grade: string | number,
  scaleId: ScaleId,
): number | null {
  const scale = getScale(scaleId);

  if (typeof grade === "number") {
    const direct = directNumericGradePoints(grade, scaleId);
    if (direct != null) return direct;
    return percentToLetter(grade, scaleId).gpa;
  }

  const trimmed = grade.trim();
  if (!trimmed) return null;

  const band = findBandByLetter(trimmed, scale);
  if (band?.gpa != null) return band.gpa;

  if (trimmed.endsWith("%")) {
    const parsed = Number.parseFloat(trimmed.replace("%", ""));
    if (Number.isFinite(parsed)) {
      return percentToLetter(parsed, scaleId).gpa;
    }
  }

  if (trimmed.includes("/")) {
    const [earned, max] = trimmed.split("/").map((v) => Number.parseFloat(v.trim()));
    if (Number.isFinite(earned) && Number.isFinite(max) && max > 0) {
      return percentToLetter((earned / max) * 100, scaleId).gpa;
    }
  }

  const asNumber = Number.parseFloat(trimmed);
  if (Number.isFinite(asNumber) && !trimmed.match(/[a-z]/i)) {
    const direct = directNumericGradePoints(asNumber, scaleId);
    if (direct != null) return direct;
    if (asNumber >= 0 && asNumber <= 100) {
      return percentToLetter(asNumber, scaleId).gpa;
    }
  }

  return null;
}
