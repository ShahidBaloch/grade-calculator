import { calculatorBySlug } from "@/config/calculators";
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
    return { slug: stored, path: calculatorBySlug[stored].path };
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
      return { slug: parsed.slug, path: parsed.path };
    }
  } catch {
    return null;
  }
  return null;
}
