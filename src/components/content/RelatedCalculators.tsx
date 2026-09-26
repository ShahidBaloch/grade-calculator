import { calculatorBySlug } from "@/config/calculators";
import { CalculatorCard } from "@/components/calculators/shared/CalculatorCard";
import { resolveCalculatorPath } from "@/lib/utils/country-path";
import type { CalculatorSlug } from "@/types/calculator";

export function RelatedCalculators({
  slugs,
  pagePath,
}: {
  slugs: CalculatorSlug[];
  pagePath?: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {slugs.map((slug) => (
        <CalculatorCard
          key={slug}
          calculator={calculatorBySlug[slug]}
          href={resolveCalculatorPath(slug, pagePath)}
        />
      ))}
    </div>
  );
}
