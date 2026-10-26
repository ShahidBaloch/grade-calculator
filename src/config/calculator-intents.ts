import { getCalculatorPath } from "@/config/calculators";
import type { CalculatorSlug } from "@/types/calculator";

/** Plain-language goals → the right tool (hub / “which calculator?”). */
export const calculatorIntents: { goal: string; slug: CalculatorSlug; action: string }[] = [
  { goal: "Score a quiz or test", slug: "ez-grader", action: "Open EZ grader" },
  { goal: "Average assignments in a class", slug: "weighted-grade-calculator", action: "Weighted grade" },
  { goal: "Find a test or class average", slug: "average-grade-calculator", action: "Average grade" },
  { goal: "Find the score I need on a final", slug: "final-grade-calculator", action: "Final grade" },
  { goal: "Calculate semester or term GPA", slug: "gpa-calculator", action: "GPA calculator" },
  { goal: "Turn a US percentage into an A–F letter", slug: "percentage-to-letter-grade", action: "US letter grade" },
  { goal: "Calculate India or Pakistan CGPA", slug: "cgpa-calculator", action: "CGPA calculator" },
  { goal: "Score an exam with bonus or wrong answers", slug: "test-grade-calculator", action: "Test grade" },
];

export function intentHref(slug: CalculatorSlug): string {
  return getCalculatorPath(slug);
}
