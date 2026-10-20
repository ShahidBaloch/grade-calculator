import { getScale, percentToLetter } from "@/lib/grading-scales";
import type { ScaleId } from "@/types/grading-scale";
import type { CalculatorResult } from "./types";

export const GRADE_CHART_MAX_TOTAL = 500;

export interface GradeChartPointsRow {
  points: number;
  percent: number;
  letterGrade: string;
}

export interface GradeChartBand {
  letter: string;
  minPercent: number;
  maxPercent: number;
  gpa: number | null;
  /** Whole-point range out of the total that earns this letter; null when no whole score lands in the band. */
  minPoints: number | null;
  maxPoints: number | null;
}

export interface GradeChartResult {
  total: number;
  rows: GradeChartPointsRow[];
  bands: GradeChartBand[];
  lookup: { points: number; percent: number; letterGrade: string; gpa: number | null } | null;
}

export function calculateGradeChart(
  total: number,
  scaleId: ScaleId = "us-standard",
  score?: number | null,
): CalculatorResult<GradeChartResult> {
  if (!Number.isInteger(total) || total < 1 || total > GRADE_CHART_MAX_TOTAL) {
    return { status: "error", errors: [`Enter a whole-number total from 1 to ${GRADE_CHART_MAX_TOTAL}`] };
  }

  const rows: GradeChartPointsRow[] = [];
  for (let points = total; points >= 0; points--) {
    const percent = (points / total) * 100;
    rows.push({ points, percent, letterGrade: percentToLetter(percent, scaleId).letter });
  }

  const bands: GradeChartBand[] = getScale(scaleId)
    .bands.filter((band) => band.min >= 0 && band.max > 0)
    .sort((a, b) => b.min - a.min)
    .map((band) => {
      const pointsInBand = rows.filter((row) => row.letterGrade === band.letter);
      return {
        letter: band.letter,
        minPercent: band.min,
        maxPercent: band.max,
        gpa: band.gpa,
        minPoints: pointsInBand.length ? pointsInBand[pointsInBand.length - 1].points : null,
        maxPoints: pointsInBand.length ? pointsInBand[0].points : null,
      };
    });

  let lookup: GradeChartResult["lookup"] = null;
  const warnings: string[] = [];
  if (score != null && Number.isFinite(score)) {
    if (score < 0) {
      return { status: "error", errors: ["Score can't be negative"] };
    }
    if (score > total) warnings.push(`Score is above the total of ${total} — extra credit?`);
    const percent = (score / total) * 100;
    const grade = percentToLetter(percent, scaleId);
    lookup = { points: score, percent, letterGrade: grade.letter, gpa: grade.gpa };
  }

  return {
    status: warnings.length ? "warning" : "valid",
    data: { total, rows, bands, lookup },
    warnings: warnings.length ? warnings : undefined,
  };
}
