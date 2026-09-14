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

export interface RemainingWorkResult {
  requiredPercent: number;
  status: "achievable" | "impossible" | "already_met";
  message: string;
  completedWeight: number;
  remainingWeight: number;
  completedAverage: number;
}

/** Solve for the average needed on unfinished weight to hit a desired overall. */
export function calculateRemainingWorkRequired(
  completed: { percent: number; weight: number }[],
  remainingWeight: number,
  desiredOverall: number,
): CalculatorResult<RemainingWorkResult> {
  if (remainingWeight <= 0) {
    return { status: "error", errors: ["Remaining weight must be greater than 0"] };
  }
  if (desiredOverall < 0 || desiredOverall > 100) {
    return { status: "error", errors: ["Desired overall must be between 0 and 100"] };
  }

  let completedWeight = 0;
  let completedSum = 0;
  for (const item of completed) {
    if (item.weight <= 0) continue;
    completedWeight += item.weight;
    completedSum += item.percent * item.weight;
  }

  if (completedWeight <= 0) {
    return { status: "error", errors: ["Enter completed work with weight before planning remaining"] };
  }

  const totalWeight = completedWeight + remainingWeight;
  const requiredPercent = (desiredOverall * totalWeight - completedSum) / remainingWeight;
  const completedAverage = completedSum / completedWeight;

  if (requiredPercent > 100) {
    return {
      status: "valid",
      data: {
        requiredPercent,
        status: "impossible",
        message: `You need ${requiredPercent.toFixed(1)}% on remaining work — not achievable without extra credit.`,
        completedWeight,
        remainingWeight,
        completedAverage,
      },
    };
  }

  if (requiredPercent <= 0) {
    return {
      status: "valid",
      data: {
        requiredPercent: Math.max(0, requiredPercent),
        status: "already_met",
        message: "You've already met your target even if remaining work scores 0%.",
        completedWeight,
        remainingWeight,
        completedAverage,
      },
    };
  }

  return {
    status: "valid",
    data: {
      requiredPercent,
      status: "achievable",
      message: `You need ${requiredPercent.toFixed(1)}% average on the remaining ${remainingWeight}% of the course.`,
      completedWeight,
      remainingWeight,
      completedAverage,
    },
  };
}
