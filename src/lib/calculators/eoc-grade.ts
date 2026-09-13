import { calculateFinalGradeRequired } from "./final-grade";
import type { ScaleId } from "@/types/grading-scale";
import type { CalculatorResult } from "./types";
import type { FinalGradeResult } from "./final-grade";

export interface EocGradeInput {
  currentGrade: number;
  eocWeight: number;
  targetGrade: number;
}

export function calculateEocGrade(
  input: EocGradeInput,
  scaleId: ScaleId = "us-standard",
): CalculatorResult<FinalGradeResult> {
  const { currentGrade, eocWeight, targetGrade } = input;

  if (eocWeight < 1 || eocWeight > 100) {
    return { status: "error", errors: ["EOC weight must be between 1% and 100%"] };
  }

  return calculateFinalGradeRequired(
    { currentGrade, desiredGrade: targetGrade, finalWeight: eocWeight },
    scaleId,
  );
}
