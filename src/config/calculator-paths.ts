import type { CalculatorSlug } from "@/types/calculator";

/**
 * Public URL for a tool. Lives apart from `calculators.ts` so client code can
 * resolve links without bundling every calculator's page copy.
 */
export function getCalculatorPath(slug: CalculatorSlug): string {
  if (slug === "ez-grader") return "/";
  if (slug === "atar-calculator") return "/au/atar-calculator";
  if (slug === "degree-classification-calculator") return "/uk/degree-classification-calculator";
  if (slug === "cgpa-to-gpa") return "/in/cgpa-to-gpa";
  return `/${slug}`;
}
