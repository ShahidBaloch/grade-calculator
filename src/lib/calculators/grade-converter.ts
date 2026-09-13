import { getScale, letterToPercent, percentToLetter } from "@/lib/grading-scales";
import type { ScaleId } from "@/types/grading-scale";
import type { CalculatorResult } from "./types";

export interface PercentToLetterResult {
  percent: number;
  letter: string;
  gpa: number;
  rangeLabel: string;
}

export interface LetterToPercentResult {
  letter: string;
  midpointPercent: number;
  rangeLabel: string;
  gpa: number;
}

export function convertPercentToLetter(
  percent: number,
  scaleId: ScaleId = "us-standard",
): CalculatorResult<PercentToLetterResult> {
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    return { status: "error", errors: ["Enter a percentage between 0 and 100"] };
  }

  const lookup = percentToLetter(percent, scaleId);
  const scale = getScale(scaleId);
  const band = lookup.band;

  return {
    status: "valid",
    data: {
      percent,
      letter: lookup.letter,
      gpa: lookup.gpa ?? 0,
      rangeLabel: `${band.min}–${band.max}%`,
    },
  };
}

export function convertLetterToPercent(
  letter: string,
  scaleId: ScaleId = "us-standard",
): CalculatorResult<LetterToPercentResult> {
  const trimmed = letter.trim();
  if (!trimmed) {
    return { status: "error", errors: ["Enter a letter grade"] };
  }

  const midpoint = letterToPercent(trimmed, scaleId);
  if (midpoint == null) {
    return { status: "error", errors: [`"${trimmed}" is not a valid letter grade on this scale`] };
  }

  const lookup = percentToLetter(midpoint, scaleId);
  const band = lookup.band;

  return {
    status: "valid",
    data: {
      letter: lookup.letter,
      midpointPercent: midpoint,
      rangeLabel: `${band.min}–${band.max}%`,
      gpa: lookup.gpa ?? 0,
    },
  };
}
