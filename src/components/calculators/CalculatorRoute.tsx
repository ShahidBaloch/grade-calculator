import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { CalculatorPageSections } from "@/components/calculators/CalculatorPageSections";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { calculatorBySlug, getCalculatorPath } from "@/config/calculators";
import { countryHubByPath } from "@/config/country-hubs";
import { webApplicationJsonLd, howToJsonLd } from "@/lib/seo/jsonld";
import { calculatorContent } from "@/config/calculator-content";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import type { CalculatorSlug } from "@/types/calculator";

interface CalculatorRouteProps {
  slug: CalculatorSlug;
  calculator: React.ReactNode;
  /** Override when this page is a geo copy (e.g. /uk/...). */
  path?: string;
  breadcrumbHome?: boolean;
  aside?: React.ReactNode;
  below?: React.ReactNode;
  focus?: boolean;
}

export function CalculatorRoute({
  slug,
  calculator,
  path,
  breadcrumbHome = false,
  aside,
  below,
  focus = false,
}: CalculatorRouteProps) {
  const config = calculatorBySlug[slug];
  const content = calculatorContent[slug];
  const pagePath = path ?? getCalculatorPath(slug);
  const geoSegment = pagePath.split("/").filter(Boolean)[0];
  const geoHub = geoSegment ? countryHubByPath[`/${geoSegment}`] : undefined;
  const description = pageDescription(pagePath, config.description);
  const title = pageTitle(pagePath, config.name);
  const breadcrumbs = breadcrumbHome
    ? [{ name: "Home", href: "/" }]
    : geoHub
      ? [
          { name: "Home", href: "/" },
          { name: geoHub.name, href: geoHub.path },
          { name: config.name, href: pagePath },
        ]
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
            name: title,
            description,
            path: pagePath,
          }),
          howToJsonLd({
            name: `How to use the ${title}`,
            description,
            steps: content.howItWorks,
          }),
        ]}
      />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <CalculatorLayout
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        focus={focus}
        calculator={calculator}
        content={aside ?? <CalculatorPageSections slug={slug} pagePath={pagePath} />}
        below={below}
      />
    </>
  );
}
