import { percentToLetter } from "@/lib/grading-scales";
import type { ScaleId } from "@/types/grading-scale";
import type { CalculatorResult } from "./types";
import { canvasGradeInputSchema, type CanvasGradeInput } from "./schemas/canvas-grade.schema";

export interface CanvasGroupResult {
  name: string;
  score: number;
  weight: number;
  contribution: number;
}

export interface CanvasGradeResult {
  courseGrade: number;
  letter: string;
  gpa: number;
  totalWeight: number;
  weightWarning?: string;
  groups: CanvasGroupResult[];
}

export function calculateCanvasGrade(
  input: CanvasGradeInput,
  scaleId: ScaleId = "us-standard",
): CalculatorResult<CanvasGradeResult> {
  const parsed = canvasGradeInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", errors: ["Invalid input"] };
  }

  const groups = parsed.data.groups.filter((g) => g.weight > 0);
  if (!groups.length) {
    return { status: "idle", errors: ["Add at least one assignment group with weight"] };
  }

  const totalWeight = groups.reduce((sum, g) => sum + g.weight, 0);
  const weightedSum = groups.reduce((sum, g) => sum + g.score * g.weight, 0);
  const courseGrade = weightedSum / totalWeight;
  const lookup = percentToLetter(courseGrade, scaleId);

  const weightWarning =
    Math.abs(totalWeight - 100) > 0.01
      ? `Assignment group weights total ${totalWeight}% (not 100%). Canvas may normalize differently.`
      : undefined;

  return {
    status: "valid",
    data: {
      courseGrade,
      letter: lookup.letter,
      gpa: lookup.gpa ?? 0,
      totalWeight,
      weightWarning,
      groups: groups.map((g) => ({
        name: g.name,
        score: g.score,
        weight: g.weight,
        contribution: (g.score * g.weight) / totalWeight,
      })),
    },
    warnings: weightWarning ? [weightWarning] : undefined,
  };
}
