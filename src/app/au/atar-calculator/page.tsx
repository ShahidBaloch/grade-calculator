import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { AtarCalculator } from "@/components/calculators/AtarCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";
import { DISTINCT_PAGE_COPY } from "@/lib/seo/page-copy";

const auPath = "/au/atar-calculator";

export const metadata = createPageMetadata({
  title: DISTINCT_PAGE_COPY[auPath].title,
  description: DISTINCT_PAGE_COPY[auPath].description,
  path: auPath,
  keywords: calculatorKeywords["atar-calculator"],
  languages: calculatorHreflangLanguages("atar-calculator"),
});

export default function AtarCalculatorPage() {
  return <CalculatorRoute slug="atar-calculator" path={auPath} calculator={<AtarCalculator />} />;
}
