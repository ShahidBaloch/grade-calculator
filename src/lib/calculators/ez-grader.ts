import { percentToLetter } from "@/lib/grading-scales";
import type { ScaleId } from "@/types/grading-scale";
import type { CalculatorResult } from "./types";
import { ezGraderInputSchema, type EzGraderInput } from "./schemas/ez-grader.schema";

export interface EzGraderChartRow {
  wrong: number;
  correct: number;
  scorePercent: number;
  letterGrade: string;
}

export interface EzGraderResult {
  correctAnswers: number;
  scorePercent: number;
  letterGrade: string;
  gpa: number | null;
  chart: EzGraderChartRow[];
}

export function calculateEzGrader(
  input: EzGraderInput,
  scaleId: ScaleId = "us-standard",
): CalculatorResult<EzGraderResult> {
  const parsed = ezGraderInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", errors: ["Invalid input"] };
  }

  const { totalQuestions, wrongAnswers } = parsed.data;

  if (totalQuestions < 1) {
    return { status: "error", errors: ["Enter at least 1 question"] };
  }

  if (wrongAnswers > totalQuestions) {
    return {
      status: "error",
      errors: [`Wrong answers can't exceed total (${totalQuestions})`],
    };
  }

  const correctAnswers = totalQuestions - wrongAnswers;
  const scorePercent = (correctAnswers / totalQuestions) * 100;
  const lookup = percentToLetter(scorePercent, scaleId);

  const chart: EzGraderChartRow[] = Array.from({ length: totalQuestions + 1 }, (_, wrong) => {
    const correct = totalQuestions - wrong;
    const percent = (correct / totalQuestions) * 100;
    const grade = percentToLetter(percent, scaleId);
    return {
      wrong,
      correct,
      scorePercent: percent,
      letterGrade: grade.letter,
    };
  });

  return {
    status: "valid",
    data: {
      correctAnswers,
      scorePercent,
      letterGrade: lookup.letter,
      gpa: lookup.gpa,
      chart,
    },
  };
}
