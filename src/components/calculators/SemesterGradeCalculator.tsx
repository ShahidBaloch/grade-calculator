"use client";

import { WeightedGradeCalculator, type WeightedRow } from "@/components/calculators/WeightedGradeCalculator";

/** A common high school split (two quarters + semester exam), so the page opens on a semester grade. */
const semesterParts: WeightedRow[] = [
  { name: "Quarter 1", score: 88, weight: 40, maxPoints: 100 },
  { name: "Quarter 2", score: 84, weight: 40, maxPoints: 100 },
  { name: "Semester exam", score: 80, weight: 20, maxPoints: 100 },
];

/** /semester-grade-calculator: the weighted-category engine, framed for quarter grades and a semester exam. */
export function SemesterGradeCalculator() {
  return <WeightedGradeCalculator storageKey="semester-grade-calculator" initialItems={semesterParts} />;
}
