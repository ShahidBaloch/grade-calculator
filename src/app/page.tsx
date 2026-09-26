import { Suspense } from "react";
import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CalculatorPageSections } from "@/components/calculators/CalculatorPageSections";
import { EzGrader } from "@/components/calculators/EzGrader";
import { GeoQuickLinks } from "@/components/engagement/GeoQuickLinks";
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
      calculator={
        <Suspense fallback={null}>
          <div className="space-y-8">
            <EzGrader slug="ez-grader" />
            <GeoQuickLinks />
          </div>
        </Suspense>
      }
      below={<CalculatorPageSections slug="ez-grader" />}
    />
  );
}
