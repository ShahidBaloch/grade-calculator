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
    "Contact GradCalc at gradcalc.com for calculator questions, formula corrections, and feedback. Email hello@gradcalc.com or use our form.",
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
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">What we can help with</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Calculator behavior that does not match your syllabus (include the page URL and example inputs).</li>
              <li>Suggested corrections to default grading scales, with a link to an official handbook or exam board source.</li>
              <li>Broken links, accessibility issues, or mobile layout problems on a specific page.</li>
              <li>Partnership or licensing questions about embedding our tools.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">What we cannot do</h2>
            <p className="mt-2">
              {siteConfig.name} is not your school, registrar, or LMS. We cannot change grades on a
              transcript, override university policy, or provide legal or immigration advice. For
              official decisions, contact your institution directly. See our{" "}
              <a href="/disclaimer" className="text-[var(--color-primary)] hover:underline">
                educational disclaimer
              </a>{" "}
              and{" "}
              <a href="/methodology" className="text-[var(--color-primary)] hover:underline">
                methodology
              </a>{" "}
              for how formulas are chosen.
            </p>
          </section>
          <ContactForm />
          <p>
            We read every message and aim to respond within a few business days. Please do not send
            personal grade information — {siteConfig.name} runs calculators in your browser and does
            not store student data. If you contact us about a bug, include your browser, device, and
            the exact numbers you entered so we can reproduce the result.
          </p>
        </div>
      </ContentPageLayout>
    </>
  );
}
