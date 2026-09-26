import { calculateSemesterGpa } from "@/lib/calculators/gpa";
import type { GpaCourseDefault } from "@/lib/calculators/gpa-defaults";
import type { ScaleId } from "@/types/grading-scale";

export function gpaCoursesHaveInvalidGrades(
  courses: GpaCourseDefault[],
  scaleId: ScaleId,
): boolean {
  const result = calculateSemesterGpa({ courses }, scaleId);
  return result.errors?.some((message) => message.toLowerCase().includes("invalid")) ?? false;
}
