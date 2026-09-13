import { calculatorComponentBySlug } from "@/components/calculators/calculator-map";
import type { CalculatorSlug } from "@/types/calculator";

export function getEmbeddedCalculator(slug: CalculatorSlug) {
  const Component = calculatorComponentBySlug[slug];
  return <Component />;
}
