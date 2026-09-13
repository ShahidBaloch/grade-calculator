import type { ScaleId } from "@/types/grading-scale";
import { calculateSemesterGpa } from "./gpa";
import type { CalculatorResult } from "./types";
import {
  cumulativeGpaInputSchema,
  type CumulativeGpaInput,
} from "./schemas/cumulative-gpa.schema";

export interface CumulativeGpaResult {
  cumulativeGpa: number;
  semesterGpa: number;
  semesterCredits: number;
  previousGpa: number;
  previousCredits: number;
  totalCredits: number;
}

export function calculateCumulativeGpa(
  input: CumulativeGpaInput,
  scaleId: ScaleId = "us-standard",
): CalculatorResult<CumulativeGpaResult> {
  const parsed = cumulativeGpaInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", errors: ["Invalid input"] };
  }

  const { previousGpa = 0, previousCredits = 0, courses } = parsed.data;
  const semesterResult = calculateSemesterGpa({ courses }, scaleId);

  if (semesterResult.status === "error") {
    return { status: "error", errors: semesterResult.errors };
  }

  if (!semesterResult.data) {
    return { status: "idle", errors: ["Add at least one course"] };
  }

  const semesterCredits = semesterResult.data.totalCredits;
  const semesterQP = semesterResult.data.totalQualityPoints;
  const totalCredits = previousCredits + semesterCredits;

  if (totalCredits <= 0) {
    return { status: "error", errors: ["Enter credits for at least one course"] };
  }

  const cumulativeGpa =
    (previousGpa * previousCredits + semesterQP) / totalCredits;

  return {
    status: "valid",
    data: {
      cumulativeGpa,
      semesterGpa: semesterResult.data.gpa,
      semesterCredits,
      previousGpa,
      previousCredits,
      totalCredits,
    },
  };
}
