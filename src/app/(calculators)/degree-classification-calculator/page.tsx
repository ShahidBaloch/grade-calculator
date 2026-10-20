import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { DegreeClassificationCalculator } from "@/components/calculators/DegreeClassificationCalculator";
import { calculatorBySlug, getCalculatorPath } from "@/config/calculators";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";

const config = calculatorBySlug["degree-classification-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle(config.path, "UK Degree Classification Calculator — First, 2:1, 2:2"),
  description: pageDescription(config.path, config.description),
  path: getCalculatorPath("degree-classification-calculator"),
  keywords: calculatorKeywords["degree-classification-calculator"],
  languages: calculatorHreflangLanguages("degree-classification-calculator"),
});

export default function DegreeClassificationPage() {
  return (
    <CalculatorRoute
      slug="degree-classification-calculator"
      calculator={<DegreeClassificationCalculator />}
    />
  );
}
