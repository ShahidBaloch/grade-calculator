import { ContactForm } from "@/components/content/ContactForm";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Contact Us",
  description: "Get in touch with the GradeCalculator team for questions, feedback, or corrections.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ContentPageLayout
        title="Contact Us"
        description="We'd love to hear from you."
        breadcrumbs={breadcrumbs}
      >
        <div className="space-y-6 text-[var(--color-text-muted)]">
          <p>
            For questions about our calculators, grading scales, or to report an error in our formulas,
            use the form below or email{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-[var(--color-primary)] hover:underline">
              {siteConfig.email}
            </a>
            .
          </p>
          <ContactForm />
          <p>
            We read every message and aim to respond within a few business days. Please do not send
            personal grade information — {siteConfig.name} does not store student data.
          </p>
        </div>
      </ContentPageLayout>
    </>
  );
}
