import { percentToLetter } from "@/lib/grading-scales";
import type { ScaleId } from "@/types/grading-scale";
import type { CalculatorResult } from "./types";
import { testGradeInputSchema, type TestGradeInput } from "./schemas/test-grade.schema";

export interface TestGradeResult {
  correctAnswers: number;
  basePercent: number;
  finalPercent: number;
  letterGrade: string;
  gpa: number | null;
  bonusApplied: number;
  cappedAt100: boolean;
}

export function calculateTestGrade(
  input: TestGradeInput,
  scaleId: ScaleId = "us-standard",
): CalculatorResult<TestGradeResult> {
  const parsed = testGradeInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", errors: ["Invalid input"] };
  }

  const { inputMode, totalQuestions, bonusPoints } = parsed.data;

  if (totalQuestions < 1) {
    return { status: "error", errors: ["Enter at least 1 question"] };
  }

  const correctAnswers =
    inputMode === "correct"
      ? (parsed.data.correctAnswers ?? 0)
      : totalQuestions - (parsed.data.wrongAnswers ?? 0);

  if (correctAnswers < 0 || correctAnswers > totalQuestions) {
    return {
      status: "error",
      errors: [`Answers must be between 0 and ${totalQuestions}`],
    };
  }

  const basePercent = (correctAnswers / totalQuestions) * 100;
  const rawFinal = basePercent + bonusPoints;
  const cappedAt100 = rawFinal > 100;
  const finalPercent = Math.min(rawFinal, 100);
  const lookup = percentToLetter(finalPercent, scaleId);

  const warnings: string[] = [];
  if (cappedAt100) {
    warnings.push("Score includes bonus points but is capped at 100% for display.");
  }

  return {
    status: warnings.length ? "warning" : "valid",
    data: {
      correctAnswers,
      basePercent,
      finalPercent,
      letterGrade: lookup.letter,
      gpa: lookup.gpa,
      bonusApplied: bonusPoints,
      cappedAt100,
    },
    warnings: warnings.length ? warnings : undefined,
  };
}
