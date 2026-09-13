import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { CalculatorPageSections } from "@/components/calculators/CalculatorPageSections";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { calculatorBySlug } from "@/config/calculators";
import { webApplicationJsonLd, faqPageJsonLd, howToJsonLd } from "@/lib/seo/jsonld";
import { calculatorContent } from "@/config/calculator-content";
import type { CalculatorSlug } from "@/types/calculator";

interface CalculatorRouteProps {
  slug: CalculatorSlug;
  calculator: React.ReactNode;
  /** Override when this page is a geo copy (e.g. /uk/...). */
  path?: string;
  breadcrumbHome?: boolean;
  aside?: React.ReactNode;
  below?: React.ReactNode;
}

export function CalculatorRoute({
  slug,
  calculator,
  path,
  breadcrumbHome = false,
  aside,
  below,
}: CalculatorRouteProps) {
  const config = calculatorBySlug[slug];
  const content = calculatorContent[slug];
  const pagePath = path ?? config.path;

  const breadcrumbs = breadcrumbHome
    ? [{ name: "Home", href: "/" }]
    : [
        { name: "Home", href: "/" },
        { name: "Calculators", href: "/calculators" },
        { name: config.name, href: pagePath },
      ];

  return (
    <>
      <JsonLd
        data={[
          webApplicationJsonLd({
            name: config.name,
            description: config.description,
            path: pagePath,
          }),
          howToJsonLd({
            name: `How to use the ${config.name}`,
            description: config.description,
            steps: content.howItWorks,
          }),
          faqPageJsonLd(content.faqs),
        ]}
      />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <CalculatorLayout
        title={config.name}
        description={config.description}
        breadcrumbs={breadcrumbs}
        calculator={calculator}
        content={aside ?? <CalculatorPageSections slug={slug} />}
        below={below}
      />
    </>
  );
}
