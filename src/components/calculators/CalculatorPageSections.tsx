import { calculatorBySlug } from "@/config/calculators";
import { calculatorResourceLinks } from "@/config/calculator-links";
import { calculatorContent } from "@/config/calculator-content";
import { countryHubByPath } from "@/config/country-hubs";
import { getCalculatorHowItWorks } from "@/lib/content/calculator-how-it-works";
import { getCountryPrefixFromPath } from "@/lib/utils/country-path";
import { ResourceLinks } from "@/components/content/ResourceLinks";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { HowItWorks } from "@/components/content/HowItWorks";
import { RelatedCalculators } from "@/components/content/RelatedCalculators";
import { FormulaBreakdown } from "@/components/calculators/shared/FormulaBreakdown";
import type { CalculatorSlug } from "@/types/calculator";

export function CalculatorPageSections({
  slug,
  pagePath,
}: {
  slug: CalculatorSlug;
  pagePath?: string;
}) {
  const content = calculatorContent[slug];
  const relatedSlugs = calculatorBySlug[slug].relatedSlugs;
  const howItWorks = getCalculatorHowItWorks(slug, pagePath);
  const hub = getCountryPrefixFromPath(pagePath)
    ? countryHubByPath[getCountryPrefixFromPath(pagePath)!]
    : undefined;
  const resourceLinks = calculatorResourceLinks[slug];
  const localizedResources = hub?.gradingScalePath
    ? {
        ...resourceLinks,
        gradingScale: resourceLinks.gradingScale
          ? {
              ...resourceLinks.gradingScale,
              path: hub.gradingScalePath,
              title: `${hub.name} grading scale`,
            }
          : undefined,
      }
    : resourceLinks;

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <div className="mt-3">
          <HowItWorks steps={howItWorks} />
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
      <ResourceLinks links={localizedResources} />
      <section>
        <h2 className="text-xl font-semibold">Related calculators</h2>
        <div className="mt-4">
          <RelatedCalculators slugs={relatedSlugs} pagePath={pagePath} />
        </div>
      </section>
    </div>
  );
}
