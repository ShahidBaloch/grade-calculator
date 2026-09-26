import { Suspense } from "react";
import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CalculatorPageSections } from "@/components/calculators/CalculatorPageSections";
import { EzGrader } from "@/components/calculators/EzGrader";
import { HomepageIntentLinks } from "@/components/engagement/HomepageIntentLinks";
import { PopularToolsGrid } from "@/components/engagement/PopularToolsGrid";
import { RecentlyUsed } from "@/components/engagement/RecentlyUsed";
import { InlineGuideTeaser } from "@/components/engagement/InlineGuideTeaser";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { calculatorKeywords } from "@/lib/seo/keywords";

export const metadata = createPageMetadata({
  title: "Grade Calculator — EZ Grader & Free Online Tools",
  description:
    "Free grade calculator and EZ grader for teachers and students. Score tests instantly, calculate weighted grades, finals, and GPA.",
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
              Free grade and GPA tools — instant results, no sign-up. Grades stay in your browser; see
              our{" "}
              <a href="/privacy-policy" className="text-[var(--color-primary)] hover:underline">
                Privacy Policy
              </a>{" "}
              for cookies, analytics, and ads.
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
