import type { ScaleId } from "@/types/grading-scale";
import { calculateSemesterGpa } from "./gpa";
import type { CalculatorResult } from "./types";
import { gpaInputSchema, type GpaInput } from "./schemas/gpa.schema";
import type { GpaResult } from "./gpa";

export interface WeightedGpaResult extends GpaResult {
  /** Same courses with no Honors/AP/IB bonus — the base 4.0 GPA. */
  unweightedGpa: number;
}

export function calculateWeightedGpa(
  input: GpaInput,
  scaleId: ScaleId = "us-standard",
): CalculatorResult<WeightedGpaResult> {
  const parsed = gpaInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", errors: ["Invalid input"] };
  }

  const weighted = calculateSemesterGpa(parsed.data, scaleId, { useWeightedScale: true });
  if (!weighted.data) return { ...weighted, data: undefined };
  const unweighted = calculateSemesterGpa(parsed.data, scaleId);
  const result: CalculatorResult<WeightedGpaResult> = {
    ...weighted,
    data: { ...weighted.data, unweightedGpa: unweighted.data?.gpa ?? weighted.data.gpa },
  };
  if (result.status === "valid" && weighted.data.gpa > 4.0) {
    return {
      ...result,
      warnings: ["Weighted GPA exceeds 4.0 — some schools cap at 4.0 or 5.0. Check your school's policy."],
    };
  }
  return result;
}
