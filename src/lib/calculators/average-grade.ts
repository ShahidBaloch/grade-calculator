import { percentToLetter } from "@/lib/grading-scales";
import type { ScaleId } from "@/types/grading-scale";
import { scoreToPercent } from "./grade-utils";
import type { CalculatorResult } from "./types";
import { averageGradeInputSchema, type AverageGradeInput } from "./schemas/average-grade.schema";

export interface AverageGradeResult {
  /** Simple mean of each score's percentage — every row counts equally. */
  average: number;
  /** Σ earned ÷ Σ possible — only in points mode, where it can differ from the mean. */
  totalPointsAverage: number | null;
  median: number;
  highest: number;
  lowest: number;
  count: number;
  letterGrade: string;
  gpa: number | null;
  percents: number[];
}

export function calculateAverageGrade(
  input: AverageGradeInput,
  scaleId: ScaleId = "us-standard",
): CalculatorResult<AverageGradeResult> {
  const parsed = averageGradeInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", errors: ["Invalid input"] };
  }

  const { scoreMode, items } = parsed.data;
  const errors: string[] = [];
  const warnings: string[] = [];
  const percents: number[] = [];
  let earnedTotal = 0;
  let possibleTotal = 0;

  for (const [index, item] of items.entries()) {
    if (typeof item.score === "string" && item.score.trim() === "") continue;

    if (scoreMode === "points" && !(item.maxPoints && item.maxPoints > 0)) {
      errors.push(`Row ${index + 1}: enter max points greater than 0`);
      continue;
    }

    const maxPoints = scoreMode === "points" ? item.maxPoints : undefined;
    // scoreToPercent only applies maxPoints to numeric scores.
    const score = scoreMode === "points" ? Number(item.score) : item.score;
    const percent = Number.isNaN(score) ? null : scoreToPercent(score, scaleId, { maxPoints });
    if (percent == null || !Number.isFinite(percent) || percent < 0) {
      errors.push(`Row ${index + 1}: invalid score or grade`);
      continue;
    }

    percents.push(percent);
    if (scoreMode === "points" && maxPoints) {
      earnedTotal += Number(score);
      possibleTotal += maxPoints;
    }
  }

  if (errors.length) {
    return { status: "error", errors };
  }
  if (percents.length === 0) {
    return { status: "error", errors: ["Enter at least one score"] };
  }
  if (percents.some((p) => p > 100)) {
    warnings.push("Some scores are above 100% — check for extra credit or a typo.");
  }

  const average = percents.reduce((sum, p) => sum + p, 0) / percents.length;
  const sorted = [...percents].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  const totalPointsAverage =
    scoreMode === "points" && possibleTotal > 0 ? (earnedTotal / possibleTotal) * 100 : null;
  const lookup = percentToLetter(average, scaleId);

  return {
    status: warnings.length ? "warning" : "valid",
    data: {
      average,
      totalPointsAverage,
      median,
      highest: sorted[sorted.length - 1],
      lowest: sorted[0],
      count: percents.length,
      letterGrade: lookup.letter,
      gpa: lookup.gpa,
      percents,
    },
    warnings: warnings.length ? warnings : undefined,
  };
}

/** Split a pasted list ("85, 92 78\n64") into score strings. Keeps "18/20" and "B+" tokens intact. */
export function parseScoreList(text: string): string[] {
  return text
    .split(/[\s,;]+/)
    .map((token) => token.trim())
    .filter(Boolean);
}
