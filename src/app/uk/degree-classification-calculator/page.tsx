import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { DegreeClassificationCalculator } from "@/components/calculators/DegreeClassificationCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";
import { DISTINCT_PAGE_COPY } from "@/lib/seo/page-copy";

const ukPath = "/uk/degree-classification-calculator";

export const metadata = createPageMetadata({
  title: DISTINCT_PAGE_COPY[ukPath].title,
  description: DISTINCT_PAGE_COPY[ukPath].description,
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
