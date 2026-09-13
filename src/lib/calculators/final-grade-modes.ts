import type { FinalGradeStatus } from "@/types/calculator";
import type { ScaleId } from "@/types/grading-scale";
import { scoreToPercent } from "./grade-utils";
import type { CalculatorResult } from "./types";

export interface FinalGradeReverseInput {
  currentGrade: number | string;
  finalScore: number | string;
  finalWeight: number;
}

export interface FinalGradeReverseResult {
  overallGrade: number;
  status: FinalGradeStatus;
  message: string;
  formulaSteps: string[];
}

export interface FinalGradePointsInput {
  currentPoints: number;
  currentMaxPoints: number;
  finalPoints: number;
  finalMaxPoints: number;
  finalWeight: number;
}

export interface FinalGradeDroppedInput {
  testScores: number[];
  finalScore: number;
  finalWeight: number;
  dropLowest: boolean;
}

export function calculateFinalGradeReverse(
  input: FinalGradeReverseInput,
  scaleId: ScaleId = "us-standard",
): CalculatorResult<FinalGradeReverseResult> {
  const { finalWeight } = input;

  if (finalWeight < 1 || finalWeight > 100) {
    return { status: "error", errors: ["Final weight must be between 1% and 100%"] };
  }

  const currentPercent = scoreToPercent(input.currentGrade, scaleId);
  const finalPercent = scoreToPercent(input.finalScore, scaleId);

  if (currentPercent == null || finalPercent == null) {
    return { status: "error", errors: ["Enter valid current and final scores"] };
  }

  const w = finalWeight / 100;
  const overallGrade = currentPercent * (1 - w) + finalPercent * w;

  const formulaSteps = [
    `w = ${finalWeight}% = ${w}`,
    `overall = current × (1 − w) + final × w`,
    `overall = ${currentPercent} × ${(1 - w).toFixed(2)} + ${finalPercent} × ${w}`,
    `overall = ${overallGrade.toFixed(1)}%`,
  ];

  return {
    status: "valid",
    data: {
      overallGrade,
      status: "achievable",
      message: `Your overall course grade would be ${overallGrade.toFixed(1)}%.`,
      formulaSteps,
    },
  };
}

export function calculateFinalGradePoints(
  input: FinalGradePointsInput,
): CalculatorResult<FinalGradeReverseResult> {
  const { currentPoints, currentMaxPoints, finalPoints, finalMaxPoints, finalWeight } = input;

  if (finalWeight < 1 || finalWeight > 100) {
    return { status: "error", errors: ["Final weight must be between 1% and 100%"] };
  }
  if (currentMaxPoints <= 0 || finalMaxPoints <= 0) {
    return { status: "error", errors: ["Point totals must be greater than 0"] };
  }

  const currentPercent = (currentPoints / currentMaxPoints) * 100;
  const finalPercent = (finalPoints / finalMaxPoints) * 100;
  const w = finalWeight / 100;
  const overallGrade = currentPercent * (1 - w) + finalPercent * w;

  const formulaSteps = [
    `Current = ${currentPoints}/${currentMaxPoints} = ${currentPercent.toFixed(1)}%`,
    `Final = ${finalPoints}/${finalMaxPoints} = ${finalPercent.toFixed(1)}%`,
    `Overall = ${currentPercent.toFixed(1)}% × ${(1 - w).toFixed(2)} + ${finalPercent.toFixed(1)}% × ${w}`,
    `Overall = ${overallGrade.toFixed(1)}%`,
  ];

  return {
    status: "valid",
    data: {
      overallGrade,
      status: "achievable",
      message: `Your overall course grade would be ${overallGrade.toFixed(1)}%.`,
      formulaSteps,
    },
  };
}

export function calculateFinalGradeDroppedLowest(
  input: FinalGradeDroppedInput,
): CalculatorResult<FinalGradeReverseResult> {
  const { testScores, finalScore, finalWeight, dropLowest } = input;

  if (!testScores.length) {
    return { status: "error", errors: ["Add at least one test score"] };
  }
  if (finalWeight < 1 || finalWeight > 100) {
    return { status: "error", errors: ["Final weight must be between 1% and 100%"] };
  }

  let scores = [...testScores];
  let dropped: number | null = null;

  if (dropLowest && scores.length > 1) {
    const min = Math.min(...scores);
    dropped = min;
    const index = scores.indexOf(min);
    scores = scores.filter((_, i) => i !== index);
  }

  const testAverage = scores.reduce((a, b) => a + b, 0) / scores.length;
  const testWeight = 100 - finalWeight;
  const wTest = testWeight / 100;
  const wFinal = finalWeight / 100;
  const overallGrade = testAverage * wTest + finalScore * wFinal;

  const formulaSteps = [
    dropLowest && dropped != null ? `Dropped lowest test: ${dropped}%` : "No test dropped",
    `Test average = ${testAverage.toFixed(1)}% (weight ${testWeight}%)`,
    `Final = ${finalScore}% (weight ${finalWeight}%)`,
    `Overall = ${overallGrade.toFixed(1)}%`,
  ];

  return {
    status: "valid",
    data: {
      overallGrade,
      status: "achievable",
      message: `Your overall course grade would be ${overallGrade.toFixed(1)}%.`,
      formulaSteps,
    },
  };
}
