import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CanvasGradeCalculator } from "@/components/calculators/CanvasGradeCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorKeywords } from "@/lib/seo/keywords";
import Link from "next/link";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["canvas-grade-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/canvas-grade-calculator", config.name),
  description: pageDescription("/canvas-grade-calculator", config.description),
  path: "/canvas-grade-calculator",
  keywords: calculatorKeywords["canvas-grade-calculator"],
  languages: calculatorHreflangLanguages("canvas-grade-calculator"),
});

export default function CanvasGradeCalculatorPage() {
  return <CalculatorRoute slug="canvas-grade-calculator" calculator={<CanvasGradeCalculator />}
      below={
        <section aria-labelledby="canvas-related-heading" className="no-print">
          <h2 id="canvas-related-heading" className="text-lg font-semibold">Canvas and gradebook help</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            <li><Link href="/guides/canvas-what-if-grades">Canvas What-If grades: test scores before they post</Link></li>
            <li><Link href="/college-grade-calculator">College grade calculator (syllabus weights)</Link></li>
            <li><Link href="/powerschool-grade-calculator">PowerSchool grade calculator</Link></li>
            <li><Link href="/final-grade-calculator">Final grade calculator</Link></li>
          </ul>
        </section>
      }
    />;
}
