import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { EocGradeCalculator } from "@/components/calculators/EocGradeCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";
import { GeoLinkList } from "@/components/content/GeoProgrammaticPage";
import { usEocStateLinkGroup } from "@/lib/seo/geo-programmatic";

const config = calculatorBySlug["eoc-grade-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/eoc-grade-calculator", "EOC Grade Calculator — End of Course Exam"),
  description: pageDescription("/eoc-grade-calculator", config.description),
  path: "/eoc-grade-calculator",
  keywords: calculatorKeywords["eoc-grade-calculator"],
  languages: calculatorHreflangLanguages("eoc-grade-calculator"),
});

export default function EocGradeCalculatorPage() {
  return (
    <CalculatorRoute
      slug="eoc-grade-calculator"
      calculator={<EocGradeCalculator />}
      below={<GeoLinkList group={usEocStateLinkGroup()} />}
    />
  );
}
