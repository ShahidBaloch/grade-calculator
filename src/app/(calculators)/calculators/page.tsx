import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CalculatorCard } from "@/components/calculators/shared/CalculatorCard";
import { CalculatorIntentGuide } from "@/components/engagement/CalculatorIntentGuide";
import { extendedCalculators, mvpCalculators } from "@/config/calculators";
import { createPageMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const regionalCalculatorLinks = [
  { href: "/ca/cumulative-gpa-calculator", label: "Canada cumulative GPA" },
  { href: "/nz/gpa-calculator", label: "New Zealand GPA (9-point)" },
  { href: "/pk/cgpa-calculator", label: "Pakistan semester CGPA" },
  { href: "/pk/percentage-to-cgpa", label: "Pakistan percentage to CGPA" },
] as const;

const featuredGuideLinks = [
  { href: "/guides/final-exam-tips", label: "Final exam study tips" },
  { href: "/guides/gpa-glossary", label: "GPA & grading glossary" },
  { href: "/guides", label: "All guides" },
] as const;

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
          Free tools for tests, class averages, finals, and GPA. Not sure which one? Start below.
        </p>

        <div className="mt-8 max-w-2xl">
          <CalculatorIntentGuide />
        </div>

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

        <section className="mt-10 max-w-2xl" aria-labelledby="regional-calculators-heading">
          <h2 id="regional-calculators-heading" className="text-xl font-semibold">
            Regional GPA tools
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Country hubs use local grading scales. Open the worldwide tool from the homepage if you are not sure
            which preset fits your transcript.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {regionalCalculatorLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-md border border-[var(--color-border)] px-3 text-sm font-medium hover:bg-[var(--color-bg-subtle)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 max-w-2xl" aria-labelledby="calculators-guides-heading">
          <h2 id="calculators-guides-heading" className="text-xl font-semibold">
            Guides
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {featuredGuideLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-md border border-[var(--color-border)] px-3 text-sm font-medium hover:bg-[var(--color-bg-subtle)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
