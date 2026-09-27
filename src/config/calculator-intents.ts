import { getCalculatorPath, type CalculatorSlug } from "@/config/calculators";

/** Plain-language goals → the right tool (hub / “which calculator?”). */
export const calculatorIntents: { goal: string; slug: CalculatorSlug; action: string }[] = [
  { goal: "Score a quiz or test", slug: "ez-grader", action: "Open EZ grader" },
  { goal: "Average assignments in a class", slug: "weighted-grade-calculator", action: "Weighted grade" },
  { goal: "Find the score I need on a final", slug: "final-grade-calculator", action: "Final grade" },
  { goal: "Calculate semester or term GPA", slug: "gpa-calculator", action: "GPA calculator" },
  { goal: "Score an exam with bonus or wrong answers", slug: "test-grade-calculator", action: "Test grade" },
];

export function intentHref(slug: CalculatorSlug): string {
  return getCalculatorPath(slug);
}
