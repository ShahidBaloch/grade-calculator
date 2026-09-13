import { calculatorBySlug, getCalculatorPath } from "@/config/calculators";
import { isCalculatorSlug, type CalculatorSlug } from "@/types/calculator";

export interface RecentCalculator {
  slug: CalculatorSlug;
  path: string;
}

export function serializeRecentCalculator(recent: RecentCalculator): string {
  return JSON.stringify(recent);
}

export function parseRecentCalculator(stored: string | null): RecentCalculator | null {
  if (!stored) return null;
  if (isCalculatorSlug(stored) && calculatorBySlug[stored]) {
    return { slug: stored, path: getCalculatorPath(stored) };
  }
  try {
    const parsed = JSON.parse(stored) as Partial<RecentCalculator>;
    if (
      typeof parsed.slug === "string" &&
      isCalculatorSlug(parsed.slug) &&
      calculatorBySlug[parsed.slug] &&
      typeof parsed.path === "string" &&
      parsed.path.startsWith("/")
    ) {
      const path = parsed.path === "/ez-grader" ? getCalculatorPath(parsed.slug) : parsed.path;
      return { slug: parsed.slug, path };
    }
  } catch {
    return null;
  }
  return null;
}
