import Link from "next/link";
import { CalculatorCard } from "@/components/calculators/shared/CalculatorCard";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { calculatorBySlug } from "@/config/calculators";
import type { CountryHubConfig } from "@/config/country-hubs";
import { getScale } from "@/lib/grading-scales";
import { faqPageJsonLd } from "@/lib/seo/jsonld";

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
      {hub.faqs && hub.faqs.length > 0 && <JsonLd data={faqPageJsonLd(hub.faqs)} />}
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />
      <p className="mt-6 text-4xl" aria-hidden>
        {hub.flag}
      </p>
      <h1 className="mt-2 text-3xl font-bold">Grade Calculator — {hub.name}</h1>
      <p className="mt-2 max-w-2xl text-[var(--color-text-muted)]">{hub.description}</p>
      {hub.details?.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
          {paragraph}
        </p>
      ))}

      <div className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          {hub.scaleLockNote ?? (
            <>
              Featured tools on this hub lock to <strong>{scale.name}</strong>. Worldwide default
              pages keep a scale selector.
            </>
          )}
        </p>
        <Link href={hub.gradingScalePath} className="mt-2 inline-block text-sm text-[var(--color-primary)] hover:underline">
          View {hub.name} grading scale reference →
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Popular tools for {hub.name}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <CalculatorCard
              key={calculator.slug}
              calculator={calculator}
              href={`${hub.path}/${calculator.slug}`}
            />
          ))}
        </div>
      </section>

      {hub.faqs && hub.faqs.length > 0 && (
        <section className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold">FAQ for {hub.name}</h2>
          <div className="mt-3">
            <FaqAccordion faqs={hub.faqs} />
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold">All calculators</h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          <Link href="/calculators" className="text-[var(--color-primary)] hover:underline">
            Browse the full calculator suite →
          </Link>
        </p>
      </section>
    </div>
  );
}
