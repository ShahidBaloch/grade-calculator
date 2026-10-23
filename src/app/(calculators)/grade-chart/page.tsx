import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { GradeChartCalculator } from "@/components/calculators/GradeChartCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";
import { QuestionChartLinks } from "@/components/content/QuestionChartLinks";

const config = calculatorBySlug["grade-chart"];

export const metadata = createPageMetadata({
  title: pageTitle(config.path, config.name),
  description: pageDescription(config.path, config.description),
  path: config.path,
  keywords: calculatorKeywords["grade-chart"],
  languages: calculatorHreflangLanguages("grade-chart"),
});

export default function GradeChartCalculatorPage() {
  return (
    <CalculatorRoute
      slug="grade-chart"
      calculator={<GradeChartCalculator />}
      below={<QuestionChartLinks />}
    />
  );
}
