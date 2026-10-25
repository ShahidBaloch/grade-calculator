"use client";

import { WeightedGradeCalculator, type WeightedRow } from "@/components/calculators/WeightedGradeCalculator";

/** Typical college syllabus categories, so the page opens on a class grade, not a generic gradebook. */
const collegeSyllabus: WeightedRow[] = [
  { name: "Exams", score: 84, weight: 40, maxPoints: 100 },
  { name: "Homework", score: 95, weight: 25, maxPoints: 100 },
  { name: "Labs", score: 90, weight: 20, maxPoints: 100 },
  { name: "Participation", score: 100, weight: 15, maxPoints: 100 },
];

/** /college-grade-calculator: the weighted-category engine, framed for a college syllabus. */
export function CollegeGradeCalculator() {
  return <WeightedGradeCalculator storageKey="college-grade-calculator" initialItems={collegeSyllabus} />;
}
