import { letterToPercent, percentToLetter } from "@/lib/grading-scales";
import type { ScaleId } from "@/types/grading-scale";

export function normalizeLetter(letter: string): string {
  return letter.trim().toUpperCase();
}

export function scoreToPercent(
  score: number | string,
  scaleId: ScaleId,
  options?: { maxPoints?: number },
): number | null {
  if (typeof score === "number") {
    if (options?.maxPoints && options.maxPoints > 0) {
      return (score / options.maxPoints) * 100;
    }
    return score;
  }

  const trimmed = score.trim();
  if (trimmed.endsWith("%")) {
    const parsed = Number.parseFloat(trimmed.replace("%", ""));
    return Number.isFinite(parsed) ? parsed : null;
  }

  if (trimmed.includes("/")) {
    const [earned, max] = trimmed.split("/").map((v) => Number.parseFloat(v.trim()));
    if (Number.isFinite(earned) && Number.isFinite(max) && max > 0) {
      return (earned / max) * 100;
    }
  }

  const asNumber = Number.parseFloat(trimmed);
  if (Number.isFinite(asNumber) && !trimmed.match(/[a-z]/i)) {
    return asNumber;
  }

  return letterToPercent(trimmed, scaleId);
}

export function gradeToGpaPoints(letter: string, scaleId: ScaleId): number | null {
  const percent = scoreToPercent(letter, scaleId);
  if (percent == null) return null;
  return percentToLetter(percent, scaleId).gpa;
}
