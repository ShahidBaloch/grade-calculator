import { getScale } from "@/lib/grading-scales";
import type { ScaleId } from "@/types/grading-scale";

export type GpaCourseDefault = { name: string; grade: string; credits: number };

const DEFAULT_COURSE_NAMES = ["English", "Mathematics", "History"] as const;

export function defaultGradeForScale(scaleId: ScaleId): string {
  const bands = getScale(scaleId).bands;
  const band = bands[Math.min(1, bands.length - 1)] ?? bands[0];
  return band?.letter ?? "B";
}

export function defaultLetterForScale(scaleId: ScaleId): string {
  return defaultGradeForScale(scaleId);
}

export function defaultCoursesForScale(scaleId: ScaleId): GpaCourseDefault[] {
  const bands = getScale(scaleId).bands;
  const picks = [bands[0], bands[Math.min(1, bands.length - 1)], bands[Math.min(2, bands.length - 1)]].filter(
    Boolean,
  );

  return picks.map((band, index) => ({
    name: DEFAULT_COURSE_NAMES[index] ?? `Course ${index + 1}`,
    grade: band.letter,
    credits: scaleId === "in-ten-point" ? 4 - (index === 2 ? 1 : 0) : 3,
  }));
}

export function gradePlaceholderForScale(scaleId: ScaleId): string {
  const samples = getScale(scaleId)
    .bands.slice(0, 3)
    .map((band) => band.letter)
    .join(", ");
  return samples ? `Grade (${samples})` : "Grade";
}

export function letterPlaceholderForScale(scaleId: ScaleId): string {
  const samples = getScale(scaleId)
    .bands.slice(0, 3)
    .map((band) => band.letter)
    .join(", ");
  return samples ? `e.g. ${samples}` : "Enter grade on this scale";
}

export function semesterResultLabel(scaleId: ScaleId): string {
  if (scaleId === "in-ten-point") return "Semester SGPA";
  return "Semester GPA";
}
