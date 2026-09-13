import Link from "next/link";
import { CalculatorCard } from "@/components/calculators/shared/CalculatorCard";
import { calculatorBySlug } from "@/config/calculators";
import type { CountryHubConfig } from "@/config/country-hubs";

interface CountryHubContentProps {
  hub: CountryHubConfig;
}

export function CountryHubContent({ hub }: CountryHubContentProps) {
  const calculators = hub.featuredCalculators
    .map((slug) => calculatorBySlug[slug])
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <p className="text-4xl">{hub.flag}</p>
      <h1 className="mt-2 text-3xl font-bold">Grade Calculator — {hub.name}</h1>
      <p className="mt-2 max-w-2xl text-[var(--color-text-muted)]">{hub.description}</p>

      <div className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          Grading scale on this page: <strong>{hub.scaleId}</strong> (auto-applied in calculators).
        </p>
        <Link href={hub.gradingScalePath} className="mt-2 inline-block text-sm text-[var(--color-primary)] hover:underline">
          View {hub.name} grading scale reference →
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Popular tools for {hub.name}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <CalculatorCard key={calculator.slug} calculator={calculator} />
          ))}
        </div>
      </section>

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
