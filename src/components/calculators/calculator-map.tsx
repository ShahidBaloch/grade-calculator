import { CalculatorBySlug } from "@/components/calculators/CalculatorBySlug";
import type { CalculatorSlug } from "@/types/calculator";

export function getCalculatorElement(slug: CalculatorSlug) {
  return <CalculatorBySlug slug={slug} />;
}
