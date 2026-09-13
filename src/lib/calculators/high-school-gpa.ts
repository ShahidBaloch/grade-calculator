import type { ScaleId } from "@/types/grading-scale";
import { calculateSemesterGpa } from "./gpa";
import type { CalculatorResult } from "./types";
import { hsGpaInputSchema, type HsGpaInput } from "./schemas/gpa.schema";
import type { GpaResult } from "./gpa";

export interface HsPeriodGpa {
  name: string;
  gpa: number;
  credits: number;
}

export interface HsGpaResult extends GpaResult {
  periods: HsPeriodGpa[];
}

export function calculateHighSchoolGpa(
  input: HsGpaInput,
  scaleId: ScaleId = "us-standard",
  options?: { useWeightedScale?: boolean },
): CalculatorResult<HsGpaResult> {
  const parsed = hsGpaInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", errors: ["Invalid input"] };
  }

  const periods: HsPeriodGpa[] = [];
  const allCourses = parsed.data.periods.flatMap((period) => period.courses);

  for (const period of parsed.data.periods) {
    const periodResult = calculateSemesterGpa({ courses: period.courses }, scaleId, options);
    if (periodResult.status === "valid" && periodResult.data) {
      periods.push({
        name: period.name,
        gpa: periodResult.data.gpa,
        credits: periodResult.data.totalCredits,
      });
    }
  }

  const overall = calculateSemesterGpa({ courses: allCourses }, scaleId, options);
  if (overall.status !== "valid" || !overall.data) {
    return overall as CalculatorResult<HsGpaResult>;
  }

  return {
    status: "valid",
    data: {
      ...overall.data,
      periods,
    },
  };
}
