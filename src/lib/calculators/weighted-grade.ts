import { percentToLetter } from "@/lib/grading-scales";
import type { ScaleId } from "@/types/grading-scale";
import { scoreToPercent } from "./grade-utils";
import type { CalculatorResult } from "./types";
import {
  weightedGradeInputSchema,
  type WeightedGradeInput,
} from "./schemas/weighted-grade.schema";

export interface WeightedGradeRowResult {
  name?: string;
  normalizedPercent: number;
  weight: number;
  contribution: number;
}

export interface WeightedGradeResult {
  weightedAverage: number;
  letterGrade: string;
  gpa: number | null;
  totalWeight: number;
  rows: WeightedGradeRowResult[];
}

export function calculateWeightedGrade(
  input: WeightedGradeInput,
  scaleId: ScaleId = "us-standard",
): CalculatorResult<WeightedGradeResult> {
  const parsed = weightedGradeInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", errors: ["Invalid input"] };
  }

  const { globalMode, weightMode, items } = parsed.data;
  const warnings: string[] = [];
  const errors: string[] = [];
  const rows: WeightedGradeRowResult[] = [];

  let totalWeight = 0;
  let weightedSum = 0;

  for (const [index, item] of items.entries()) {
    if (item.weight <= 0) continue;

    const maxPoints = globalMode === "points" ? item.maxPoints : undefined;
    const percent = scoreToPercent(item.score, scaleId, { maxPoints });

    if (percent == null) {
      errors.push(`Row ${index + 1}: invalid score or grade`);
      continue;
    }

    const contribution = percent * item.weight;
    totalWeight += item.weight;
    weightedSum += contribution;

    rows.push({
      name: item.name,
      normalizedPercent: percent,
      weight: item.weight,
      contribution,
    });
  }

  if (errors.length) {
    return { status: "error", errors };
  }

  if (totalWeight <= 0) {
    return { status: "error", errors: ["Enter at least one item with weight greater than 0"] };
  }

  if (weightMode === "percent" && Math.abs(totalWeight - 100) > 0.01) {
    warnings.push(`Weights total ${totalWeight}%, not 100%`);
  }

  const weightedAverage = weightedSum / totalWeight;
  const lookup = percentToLetter(weightedAverage, scaleId);

  return {
    status: warnings.length ? "warning" : "valid",
    data: {
      weightedAverage,
      letterGrade: lookup.letter,
      gpa: lookup.gpa,
      totalWeight,
      rows,
    },
    warnings: warnings.length ? warnings : undefined,
  };
}
