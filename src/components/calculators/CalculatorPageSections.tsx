import { calculatorBySlug } from "@/config/calculators";
import { calculatorResourceLinks, intentMismatchLink } from "@/config/calculator-links";
import { calculatorContent } from "@/config/calculator-content";
import { countryHubByPath } from "@/config/country-hubs";
import { getCalculatorHowItWorks } from "@/lib/content/calculator-how-it-works";
import { getCountryPrefixFromPath } from "@/lib/utils/country-path";
import { CalculatorDetailsAccordion } from "@/components/content/CalculatorDetailsAccordion";
import { ResourceLinks } from "@/components/content/ResourceLinks";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { HowItWorks } from "@/components/content/HowItWorks";
import { RelatedCalculators } from "@/components/content/RelatedCalculators";
import { relatedCalculatorSlugsForPage } from "@/lib/seo/related-calculators";
import { SectionBlock } from "@/components/content/GeoProgrammaticPage";
import { geoCalculatorLocal } from "@/lib/content/geo-calculator-local";
import type { CalculatorSlug } from "@/types/calculator";

export function CalculatorPageSections({
  slug,
  pagePath,
}: {
  slug: CalculatorSlug;
  pagePath?: string;
}) {
  const content = calculatorContent[slug];
  // Country pages swap the US-centred copy for their own scale, example, FAQs and sources.
  const local = geoCalculatorLocal(slug, pagePath);
  const relatedSlugs = relatedCalculatorSlugsForPage(calculatorBySlug[slug].relatedSlugs, pagePath);
  const howItWorks = getCalculatorHowItWorks(slug, pagePath);
  const hub = getCountryPrefixFromPath(pagePath)
    ? countryHubByPath[getCountryPrefixFromPath(pagePath)!]
    : undefined;
  const resourceLinks = calculatorResourceLinks[slug];
  const localizedResources = {
    ...(hub?.gradingScalePath
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
      : resourceLinks),
    otherSystem: intentMismatchLink(slug, pagePath),
  };

  const assumptions =
    local?.assumptions ?? content.assumptions ?? [
      "Letter grades follow the grading scale selected in the calculator.",
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
          formula={local?.formula ?? content.formula}
          workedExample={local?.workedExample ?? content.workedExample}
          primarySources={local?.primarySources ?? content.primarySources}
        />
      </section>
      {local?.sections.map((section, index) => (
        <SectionBlock key={section.heading} section={section} index={index} />
      ))}
      <ResourceLinks links={localizedResources} />
      <section aria-labelledby="calc-faq-heading">
        <h2 id="calc-faq-heading" className="text-lg font-semibold">Common questions</h2>
        <div className="mt-2">
          <FaqAccordion faqs={local?.faqs ?? content.faqs} />
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
