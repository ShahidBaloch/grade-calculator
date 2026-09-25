import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { SgpaToCgpaCalculator } from "@/components/calculators/SgpaToCgpaCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";

const config = calculatorBySlug["sgpa-to-cgpa"];

export const metadata = createPageMetadata({
  title: "SGPA to CGPA Calculator — Credit-Weighted",
  description: config.description,
  path: "/sgpa-to-cgpa",
  keywords: calculatorKeywords["sgpa-to-cgpa"],
  languages: calculatorHreflangLanguages("sgpa-to-cgpa"),
});

export default function SgpaToCgpaPage() {
  return <CalculatorRoute slug="sgpa-to-cgpa" calculator={<SgpaToCgpaCalculator />} />;
}
