import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CalculatorPageSections } from "@/components/calculators/CalculatorPageSections";
import { EzGrader } from "@/components/calculators/EzGrader";
import { GeoQuickLinks } from "@/components/engagement/GeoQuickLinks";
import { PopularScoreLinks } from "@/components/content/PopularScoreLinks";
import { QuestionChartLinks } from "@/components/content/QuestionChartLinks";
import { usEocStateLinkGroup } from "@/lib/seo/geo-programmatic";
import { AppLink as Link } from "@/components/navigation/AppLink";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";

export const metadata = createPageMetadata({
  title: pageTitle("/", "Grade Calculator"),
  description: pageDescription(
    "/",
    "Free grade calculator for US teachers and students. Score a test with the EZ Grader, then open weighted grades, finals, and GPA.",
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
      heading="Grade Calculator"
      calculator={
        <div className="space-y-8">
          <EzGrader slug="ez-grader" />
          <GeoQuickLinks />
        </div>
      }
      below={
        <div className="space-y-10">
          <CalculatorPageSections slug="ez-grader" />
          <HomeToolLinks />
          <PopularScoreLinks />
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

/** Head-term hub: send "grade calculator" visitors to the dedicated tool for their intent. */
function HomeToolLinks() {
  const tools = [
    { href: "/test-grade-calculator", label: "Test grade calculator" },
    { href: "/weighted-grade-calculator", label: "Weighted grade calculator" },
    { href: "/final-grade-calculator", label: "Final grade calculator" },
    { href: "/college-grade-calculator", label: "College grade calculator" },
    { href: "/grade-percentage-calculator", label: "Grade percentage calculator" },
    { href: "/score", label: "Score out of total" },
    { href: "/gpa-calculator", label: "GPA calculator" },
    { href: "/grading-scales", label: "Grading scale (US A–F)" },
  ];
  return (
    <section aria-labelledby="home-tools-heading" className="no-print">
      <h2 id="home-tools-heading" className="text-lg font-semibold">
        More grade calculators
      </h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        The EZ grader above scores one test by wrong answers. Pick the grading calculator that matches what you need.
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              prefetch={false}
              className="inline-flex min-h-11 items-center rounded-md border border-[var(--color-border)] px-3 text-sm font-medium hover:bg-[var(--color-bg-subtle)]"
            >
              {tool.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
