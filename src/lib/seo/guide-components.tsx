import { getCalculatorElement } from "@/components/calculators/calculator-map";
import type { CalculatorSlug } from "@/types/calculator";

export function getEmbeddedCalculator(slug: CalculatorSlug) {
  return getCalculatorElement(slug);
}
