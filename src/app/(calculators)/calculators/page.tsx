import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CalculatorCard } from "@/components/calculators/shared/CalculatorCard";
import { extendedCalculators, mvpCalculators } from "@/config/calculators";
import { createPageMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata = createPageMetadata({
  title: "All Grade Calculators",
  description:
    "Free online grade calculators: EZ grader, weighted grades, final exam, GPA, and more.",
  path: "/calculators",
  keywords: ["grade calculators", "gpa calculator", "ez grader"],
});

const allGrade = [...mvpCalculators, ...extendedCalculators].filter((c) => c.category === "grade");
const allGpa = [...mvpCalculators, ...extendedCalculators].filter((c) => c.category === "gpa");
const conversionCalculators = extendedCalculators.filter((c) => c.category === "conversion");

export default function CalculatorsHubPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Calculators", href: "/calculators" }];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-bold">All Grade & GPA Calculators</h1>
        <p className="mt-2 max-w-2xl text-[var(--color-text-muted)]">
          Pick a calculator. On the homepage, links follow your location. Open a country page when you
          need that country’s scale.
        </p>

        <section id="grade" className="mt-10">
          <h2 className="text-xl font-semibold">Grade Calculators</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allGrade.map((calculator) => (
              <CalculatorCard key={calculator.slug} calculator={calculator} />
            ))}
          </div>
        </section>

        <section id="gpa" className="mt-10">
          <h2 className="text-xl font-semibold">GPA Calculators</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allGpa.map((calculator) => (
              <CalculatorCard key={calculator.slug} calculator={calculator} />
            ))}
          </div>
        </section>

        {conversionCalculators.length > 0 && (
          <section id="conversion" className="mt-10">
            <h2 className="text-xl font-semibold">Grade Converters</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {conversionCalculators.map((calculator) => (
                <CalculatorCard key={calculator.slug} calculator={calculator} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
