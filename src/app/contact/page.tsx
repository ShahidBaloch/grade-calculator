import { ContactForm } from "@/components/content/ContactForm";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { contactPageJsonLd } from "@/lib/seo/jsonld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact GradeCalculator at gradcalc.com for calculator questions, formula corrections, and feedback. Email hello@gradcalc.com or use our form.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }];

  return (
    <>
      <JsonLd data={contactPageJsonLd()} />
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
