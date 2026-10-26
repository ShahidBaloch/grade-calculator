import { AppLink as Link } from "@/components/navigation/AppLink";
import { CalculatorCard } from "@/components/calculators/shared/CalculatorCard";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { calculatorBySlug } from "@/config/calculators";
import { canonicalPathForSlug } from "@/lib/seo/intent-urls";
import { countryHubHeading, type CountryHubConfig } from "@/config/country-hubs";
import { getScale } from "@/lib/grading-scales";
import { GeoLinkList } from "@/components/content/GeoProgrammaticPage";
import { hubGeoLinkGroups } from "@/lib/seo/geo-programmatic";
import { CountrySwitcher } from "@/components/content/CountrySwitcher";

interface CountryHubContentProps {
  hub: CountryHubConfig;
}

export function CountryHubContent({ hub }: CountryHubContentProps) {
  const calculators = hub.featuredCalculators
    .map((slug) => calculatorBySlug[slug])
    .filter(Boolean);
  const scale = getScale(hub.scaleId);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: hub.name, href: hub.path },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />
      <header className="mt-4 max-w-2xl">
        <h1 className="text-3xl font-bold">{countryHubHeading(hub)}</h1>
        <p className="mt-2 text-[var(--color-text-muted)]">{hub.description}</p>
      </header>
      <CountrySwitcher currentPath={hub.path} />

      <section className="mt-8" aria-labelledby="hub-calculators-heading">
        <h2 id="hub-calculators-heading" className="text-xl font-semibold">Calculators</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <CalculatorCard
              key={calculator.slug}
              calculator={calculator}
              href={canonicalPathForSlug(calculator.slug, hub.path)}
            />
          ))}
        </div>
      </section>

      {hubGeoLinkGroups(hub.path).map((group) => (
        <div key={group.heading} className="mt-10 max-w-3xl">
          <GeoLinkList group={group} />
        </div>
      ))}

      <p className="mt-6 max-w-2xl text-sm text-[var(--color-text-muted)]">
        {hub.scaleLockNote ?? (
          <>
            These tools use <strong className="font-medium text-[var(--color-text)]">{scale.name}</strong>.
          </>
        )}{" "}
        <Link href={hub.gradingScalePath} className="text-[var(--color-primary)] hover:underline">
          Grading scale reference
        </Link>
      </p>

      {hub.details?.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="mt-3 max-w-2xl text-sm text-[var(--color-text-muted)]">
          {paragraph}
        </p>
      ))}

      {hub.relatedGuides && hub.relatedGuides.length > 0 && (
        <section className="mt-8 max-w-2xl" aria-labelledby="hub-guides-heading">
          <h2 id="hub-guides-heading" className="text-xl font-semibold">Guides</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-text-muted)]">
            {hub.relatedGuides.map((guide) => (
              <li key={guide.path}>
                <Link href={guide.path} className="inline-flex min-h-6 items-center text-[var(--color-primary)] hover:underline">
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {hub.faqs && hub.faqs.length > 0 && (
        <section className="mt-10 max-w-3xl" aria-labelledby="hub-faq-heading">
          <h2 id="hub-faq-heading" className="text-xl font-semibold">FAQ for {hub.name}</h2>
          <div className="mt-3">
            <FaqAccordion faqs={hub.faqs} />
          </div>
        </section>
      )}

      <section className="mt-10">
        <p className="text-sm text-[var(--color-text-muted)]">
          <Link href="/calculators" className="text-[var(--color-primary)] hover:underline">
            All calculators
          </Link>
        </p>
      </section>
    </div>
  );
}
