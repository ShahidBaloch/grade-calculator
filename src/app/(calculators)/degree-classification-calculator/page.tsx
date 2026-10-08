import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { DegreeClassificationCalculator } from "@/components/calculators/DegreeClassificationCalculator";
import { getCalculatorPath } from "@/config/calculators";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "UK Degree Classification Calculator — First, 2:1, 2:2",
  description:
    "Predict your UK degree classification from credit-weighted module marks. Supports Year 2 and Year 3 weighting (e.g. 40/60). Covers First, Upper Second, Lower Second, and Third.",
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
