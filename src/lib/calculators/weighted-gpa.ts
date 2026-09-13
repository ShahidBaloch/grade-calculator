import type { ScaleId } from "@/types/grading-scale";
import { calculateSemesterGpa } from "./gpa";
import type { CalculatorResult } from "./types";
import { gpaInputSchema, type GpaInput } from "./schemas/gpa.schema";
import type { GpaResult } from "./gpa";

export function calculateWeightedGpa(
  input: GpaInput,
  scaleId: ScaleId = "us-standard",
): CalculatorResult<GpaResult> {
  const parsed = gpaInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", errors: ["Invalid input"] };
  }

  const result = calculateSemesterGpa(parsed.data, scaleId, { useWeightedScale: true });
  if (result.status === "valid" && result.data && result.data.gpa > 4.0) {
    return {
      ...result,
      warnings: ["Weighted GPA exceeds 4.0 — some schools cap at 4.0 or 5.0. Check your school's policy."],
    };
  }
  return result;
}
