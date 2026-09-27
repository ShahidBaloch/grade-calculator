import { calculatorBySlug } from "@/config/calculators";
import { calculatorResourceLinks } from "@/config/calculator-links";
import { calculatorContent } from "@/config/calculator-content";
import { countryHubByPath } from "@/config/country-hubs";
import { getCalculatorHowItWorks } from "@/lib/content/calculator-how-it-works";
import { getCountryPrefixFromPath } from "@/lib/utils/country-path";
import { CalculatorDetailsAccordion } from "@/components/content/CalculatorDetailsAccordion";
import { ResourceLinks } from "@/components/content/ResourceLinks";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { HowItWorks } from "@/components/content/HowItWorks";
import { RelatedCalculators } from "@/components/content/RelatedCalculators";
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

  const assumptions =
    content.assumptions ?? [
      "Letter grades follow the grading scale selected in the calculator.",
      "Zero total weight or credits returns an error — we never divide by zero.",
      "Sample numbers on first load are examples only; replace them with your data.",
    ];

  return (
    <div className="space-y-8">
      <section aria-labelledby="calc-how-heading">
        <h2 id="calc-how-heading" className="text-lg font-semibold">Quick steps</h2>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">Enter your numbers — results update as you type.</p>
        <div className="mt-3">
          <HowItWorks steps={howItWorks} />
        </div>
      </section>
      <section aria-labelledby="calc-details-heading">
        <h2 id="calc-details-heading" className="sr-only">Formula and assumptions</h2>
        <CalculatorDetailsAccordion
          assumptions={assumptions}
          formula={content.formula}
          workedExample={content.workedExample}
          primarySources={content.primarySources}
        />
      </section>
      <ResourceLinks links={localizedResources} />
      <section aria-labelledby="calc-faq-heading">
        <h2 id="calc-faq-heading" className="text-lg font-semibold">Common questions</h2>
        <div className="mt-2">
          <FaqAccordion faqs={content.faqs} />
        </div>
      </section>
      <section aria-labelledby="calc-related-heading">
        <h2 id="calc-related-heading" className="text-lg font-semibold">Related tools</h2>
        <div className="mt-3">
          <RelatedCalculators slugs={relatedSlugs} pagePath={pagePath} />
        </div>
      </section>
    </div>
  );
}
