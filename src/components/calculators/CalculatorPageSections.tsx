import { calculatorBySlug } from "@/config/calculators";
import { calculatorResourceLinks } from "@/config/calculator-links";
import { calculatorContent } from "@/config/calculator-content";
import { ResourceLinks } from "@/components/content/ResourceLinks";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { HowItWorks } from "@/components/content/HowItWorks";
import { RelatedCalculators } from "@/components/content/RelatedCalculators";
import { FormulaBreakdown } from "@/components/calculators/shared/FormulaBreakdown";
import type { CalculatorSlug } from "@/types/calculator";

export function CalculatorPageSections({ slug }: { slug: CalculatorSlug }) {
  const content = calculatorContent[slug];
  const relatedSlugs = calculatorBySlug[slug].relatedSlugs;

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <div className="mt-3">
          <HowItWorks steps={content.howItWorks} />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Formula</h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">{content.formula}</p>
        <div className="mt-3">
          <FormulaBreakdown steps={[content.workedExample]} />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="mt-3">
          <FaqAccordion faqs={content.faqs} />
        </div>
      </section>
      <ResourceLinks links={calculatorResourceLinks[slug]} />
      <section>
        <h2 className="text-xl font-semibold">Related calculators</h2>
        <div className="mt-4">
          <RelatedCalculators slugs={relatedSlugs} />
        </div>
      </section>
    </div>
  );
}
