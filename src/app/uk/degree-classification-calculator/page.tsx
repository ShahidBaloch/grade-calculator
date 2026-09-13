import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { DegreeClassificationCalculator } from "@/components/calculators/DegreeClassificationCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";

const config = calculatorBySlug["degree-classification-calculator"];
const ukPath = "/uk/degree-classification-calculator";

export const metadata = createPageMetadata({
  title: "UK Degree Classification Calculator — First, 2:1, 2:2",
  description: config.description,
  path: ukPath,
  keywords: calculatorKeywords["degree-classification-calculator"],
  languages: calculatorHreflangLanguages("degree-classification-calculator"),
});

export default function DegreeClassificationPage() {
  return (
    <CalculatorRoute
      slug="degree-classification-calculator"
      path={ukPath}
      calculator={<DegreeClassificationCalculator />}
    />
  );
}
