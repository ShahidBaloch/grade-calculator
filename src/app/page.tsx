import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CalculatorPageSections } from "@/components/calculators/CalculatorPageSections";
import { EzGrader } from "@/components/calculators/EzGrader";
import { GeoQuickLinks } from "@/components/engagement/GeoQuickLinks";
import { QuestionChartLinks } from "@/components/content/QuestionChartLinks";
import { usEocStateLinkGroup } from "@/lib/seo/geo-programmatic";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";

export const metadata = createPageMetadata({
  title: pageTitle("/", "Grade Calculator"),
  description: pageDescription(
    "/",
    "Free grade calculator. Score a test with the EZ Grader, or open weighted grades, finals, and GPA.",
  ),
  path: "/",
  keywords: calculatorKeywords["ez-grader"],
  languages: calculatorHreflangLanguages("ez-grader"),
});

export default function HomePage() {
  return (
    <CalculatorRoute
      slug="ez-grader"
      path="/"
      breadcrumbHome
      focus
      heading="Grade Calculator (EZ Grader)"
      calculator={
        <div className="space-y-8">
          <EzGrader slug="ez-grader" />
          <GeoQuickLinks />
        </div>
      }
      below={
        <div className="space-y-10">
          <CalculatorPageSections slug="ez-grader" />
          <QuestionChartLinks />
          <UsEocLinks />
        </div>
      }
    />
  );
}

/** US EOC tools are the site's strongest pages; link them from the homepage. */
function UsEocLinks() {
  const group = usEocStateLinkGroup();
  return (
    <section aria-labelledby="home-eoc-heading" className="no-print">
      <h2 id="home-eoc-heading" className="text-lg font-semibold">
        EOC grade calculators by state
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        <li>
          <Link
            href="/eoc-grade-calculator"
            prefetch={false}
            className="inline-flex min-h-11 items-center rounded-md border border-[var(--color-border)] px-3 text-sm font-medium hover:bg-[var(--color-bg-subtle)]"
          >
            EOC grade calculator
          </Link>
        </li>
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              prefetch={false}
              className="inline-flex min-h-11 items-center rounded-md border border-[var(--color-border)] px-3 text-sm font-medium hover:bg-[var(--color-bg-subtle)]"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
