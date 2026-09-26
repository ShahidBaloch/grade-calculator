import Link from "next/link";
import { CalculatorCard } from "@/components/calculators/shared/CalculatorCard";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { calculatorBySlug } from "@/config/calculators";
import { canonicalPathForSlug } from "@/lib/seo/intent-urls";
import type { CountryHubConfig } from "@/config/country-hubs";
import { getScale } from "@/lib/grading-scales";

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
      <h1 className="mt-4 text-3xl font-bold">{hub.name} grading tools</h1>
      <p className="mt-2 max-w-2xl text-[var(--color-text-muted)]">{hub.description}</p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Calculators</h2>
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
        <section className="mt-8 max-w-2xl">
          <h2 className="text-xl font-semibold">Guides</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-text-muted)]">
            {hub.relatedGuides.map((guide) => (
              <li key={guide.path}>
                <Link href={guide.path} className="text-[var(--color-primary)] hover:underline">
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {hub.faqs && hub.faqs.length > 0 && (
        <section className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold">FAQ for {hub.name}</h2>
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
