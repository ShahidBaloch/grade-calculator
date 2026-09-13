import { calculatorBySlug } from "@/config/calculators";
import { CalculatorCard } from "@/components/calculators/shared/CalculatorCard";
import type { CalculatorSlug } from "@/types/calculator";

export function RelatedCalculators({ slugs }: { slugs: CalculatorSlug[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {slugs.map((slug) => (
        <CalculatorCard key={slug} calculator={calculatorBySlug[slug]} />
      ))}
    </div>
  );
}
