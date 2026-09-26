import { Suspense } from "react";
import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CalculatorPageSections } from "@/components/calculators/CalculatorPageSections";
import { EzGrader } from "@/components/calculators/EzGrader";
import { HomepageIntentLinks } from "@/components/engagement/HomepageIntentLinks";
import { CountryRegionShortcuts } from "@/components/engagement/CountryRegionShortcuts";
import { PopularToolsGrid } from "@/components/engagement/PopularToolsGrid";
import { RecentlyUsed } from "@/components/engagement/RecentlyUsed";
import { InlineGuideTeaser } from "@/components/engagement/InlineGuideTeaser";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { calculatorKeywords } from "@/lib/seo/keywords";

export const metadata = createPageMetadata({
  title: "Grade Calculator — EZ Grader & Free Online Tools",
  description:
    "Free EZ grader for teachers plus weighted grades, finals, and GPA for students. Pick your country for the right grading scale — US, UK, Canada, Australia, and more.",
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
      calculator={
        <Suspense fallback={null}>
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
              <strong className="font-medium text-[var(--color-text)]">Teachers:</strong> score tests
              with the EZ Grader below.{" "}
              <strong className="font-medium text-[var(--color-text)]">Students:</strong> use the
              links to weighted averages, final-exam targets, or GPA — start with your country so
              letter grades and GPA points match your school or university.
            </p>
            <CountryRegionShortcuts activePath="/" />
            <HomepageIntentLinks activeHref="/" />
            <EzGrader slug="ez-grader" />
          </div>
        </Suspense>
      }
      aside={
        <div className="space-y-8">
          <RecentlyUsed />
          <section>
            <h2 className="text-xl font-semibold">Popular calculators</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Jump to a tool — links follow your country when you opened a regional page first.
            </p>
            <div className="mt-4">
              <PopularToolsGrid />
            </div>
          </section>
          <InlineGuideTeaser
            title="How to calculate your GPA"
            summary="Step-by-step guide to semester and cumulative GPA with examples."
            href="/guides/how-to-calculate-gpa"
          />
        </div>
      }
      below={<CalculatorPageSections slug="ez-grader" />}
    />
  );
}
