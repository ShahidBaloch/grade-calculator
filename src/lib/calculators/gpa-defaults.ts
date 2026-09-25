import type { ScaleId } from "@/types/grading-scale";

export type GpaCourseDefault = { name: string; grade: string; credits: number };

export function defaultCoursesForScale(scaleId: ScaleId): GpaCourseDefault[] {
  if (scaleId === "in-ten-point") {
    return [
      { name: "Physics", grade: "O", credits: 4 },
      { name: "Mathematics", grade: "A+", credits: 4 },
      { name: "Chemistry", grade: "A", credits: 3 },
    ];
  }
  if (scaleId === "pk-hec") {
    return [
      { name: "English", grade: "A", credits: 3 },
      { name: "Mathematics", grade: "B+", credits: 3 },
      { name: "Physics", grade: "A-", credits: 3 },
    ];
  }
  return [
    { name: "English", grade: "A", credits: 3 },
    { name: "Math", grade: "B+", credits: 3 },
    { name: "History", grade: "A-", credits: 3 },
  ];
}

export function gradePlaceholderForScale(scaleId: ScaleId): string {
  if (scaleId === "in-ten-point") return "Grade (O, A+, 85)";
  if (scaleId === "pk-hec") return "Grade (A, B+, 82)";
  return "Grade (A, B+, 92)";
}

export function semesterResultLabel(scaleId: ScaleId): string {
  if (scaleId === "in-ten-point") return "Semester SGPA";
  return "Semester GPA";
}
