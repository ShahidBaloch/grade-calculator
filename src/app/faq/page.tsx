import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteFaqs } from "@/config/site-faq";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Grade Calculator FAQ — Grading Scales, GPA & Percentages",
  description:
    "Answers to common questions about grading scales, grade percentages (A, B, C), GPA tools, final exam calculators, and privacy. Includes what percentage is each letter grade.",
  path: "/faq",
  keywords: [
    "grade calculator faq",
    "gpa calculator help",
    "grading scale questions",
    "b grade percentage",
    "c grade percentage",
    "what percentage is an a",
    "grade percentages",
  ],
});

export default function FaqPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ContentPageLayout
        title="Frequently Asked Questions"
        description="Everything you need to know about using GradeCalculator."
        breadcrumbs={breadcrumbs}
      >
        <FaqAccordion faqs={siteFaqs} />
      </ContentPageLayout>
    </>
  );
}
