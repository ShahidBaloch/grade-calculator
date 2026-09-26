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
      <section aria-labelledby="calc-how-heading">
        <h2 id="calc-how-heading" className="text-xl font-semibold">How it works</h2>
        <div className="mt-3">
          <HowItWorks steps={howItWorks} />
        </div>
      </section>
      <section aria-labelledby="calc-formula-heading">
        <h2 id="calc-formula-heading" className="text-xl font-semibold">Formula</h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">{content.formula}</p>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Example: {content.workedExample} Letter cut-offs use the unrounded result.
        </p>
      </section>
      {content.primarySources && content.primarySources.length > 0 && (
        <section aria-labelledby="calc-sources-heading">
          <h2 id="calc-sources-heading" className="text-xl font-semibold">Primary sources</h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Confirm rules with the authority or institution — our models are planning aids only.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
            {content.primarySources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  className="text-[var(--color-primary)] hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section aria-labelledby="calc-faq-heading">
        <h2 id="calc-faq-heading" className="text-xl font-semibold">FAQ</h2>
        <div className="mt-3">
          <FaqAccordion faqs={content.faqs} />
        </div>
      </section>
      <ResourceLinks links={localizedResources} />
      <section aria-labelledby="calc-related-heading">
        <h2 id="calc-related-heading" className="text-xl font-semibold">Related calculators</h2>
        <div className="mt-4">
          <RelatedCalculators slugs={relatedSlugs} pagePath={pagePath} />
        </div>
      </section>
    </div>
  );
}
