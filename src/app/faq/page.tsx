import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteFaqs } from "@/config/site-faq";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Grade Calculator FAQ — Grading Scales & GPA",
  description:
    "Answers to common questions about grading scales, what percentage each letter grade is, GPA tools, final exam calculators, and privacy.",
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
        description="Everything you need to know about using GradCalc."
        breadcrumbs={breadcrumbs}
      >
        <FaqAccordion faqs={siteFaqs} headingLevel={2} />
      </ContentPageLayout>
    </>
  );
}
