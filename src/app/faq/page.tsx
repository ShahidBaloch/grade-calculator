import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteFaqs } from "@/config/site-faq";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about our free grade calculators, GPA tools, grading scales, and privacy.",
  path: "/faq",
  keywords: ["grade calculator faq", "gpa calculator help", "grading scale questions"],
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
