import { calculatorBySlug } from "@/config/calculators";
import { CalculatorCard } from "@/components/calculators/shared/CalculatorCard";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
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
      {slugs.map((slug) => {
        const calculator = calculatorBySlug[slug];
        const href = resolveCalculatorPath(slug, pagePath);
        return (
          <CalculatorCard
            key={slug}
            calculator={calculator}
            href={href}
            title={pageTitle(href, calculator.name)}
            description={pageDescription(href, calculator.description)}
          />
        );
      })}
    </div>
  );
}
