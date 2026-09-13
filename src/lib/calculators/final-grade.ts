import type { FinalGradeStatus } from "@/types/calculator";
import type { ScaleId } from "@/types/grading-scale";
import { scoreToPercent } from "./grade-utils";
import type { CalculatorResult } from "./types";
import { finalGradeInputSchema, type FinalGradeInput } from "./schemas/final-grade.schema";

export interface FinalGradeResult {
  requiredPercent: number;
  status: FinalGradeStatus;
  message: string;
  currentPercent: number;
  targetPercent: number;
  formulaSteps: string[];
}

export function calculateFinalGradeRequired(
  input: FinalGradeInput,
  scaleId: ScaleId = "us-standard",
): CalculatorResult<FinalGradeResult> {
  const parsed = finalGradeInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", errors: ["Invalid input"] };
  }

  const { currentGrade, desiredGrade, finalWeight } = parsed.data;

  if (finalWeight < 1) {
    return { status: "error", errors: ["Final must be worth at least 1%"] };
  }
  if (finalWeight > 100) {
    return { status: "error", errors: ["Weight can't exceed 100%"] };
  }

  const currentPercent = scoreToPercent(currentGrade, scaleId);
  const targetPercent = scoreToPercent(desiredGrade, scaleId);

  if (currentPercent == null || targetPercent == null) {
    return { status: "error", errors: ["Enter valid current and target grades"] };
  }

  const w = finalWeight / 100;
  const requiredPercent = (targetPercent - currentPercent * (1 - w)) / w;

  const formulaSteps = [
    `w = ${finalWeight}% = ${w}`,
    `required = (target − current × (1 − w)) / w`,
    `required = (${targetPercent} − ${currentPercent} × ${(1 - w).toFixed(2)}) / ${w}`,
    `required = ${requiredPercent.toFixed(1)}%`,
  ];

  if (requiredPercent > 100) {
    return {
      status: "valid",
      data: {
        requiredPercent,
        status: "impossible",
        message: "You need above 100% — target not achievable on the final alone.",
        currentPercent,
        targetPercent,
        formulaSteps,
      },
    };
  }

  if (requiredPercent <= 0) {
    return {
      status: "valid",
      data: {
        requiredPercent: Math.max(0, requiredPercent),
        status: "already_met",
        message: "You've already met your target!",
        currentPercent,
        targetPercent,
        formulaSteps,
      },
    };
  }

  return {
    status: "valid",
    data: {
      requiredPercent,
      status: "achievable",
      message: `You need ${requiredPercent.toFixed(1)}% on your final.`,
      currentPercent,
      targetPercent,
      formulaSteps,
    },
  };
}
