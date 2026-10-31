import { notFound } from "next/navigation";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { GradingScalePageContent } from "@/components/content/GradingScalePageContent";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { gradingScaleBySlug, gradingScalePages } from "@/config/grading-scale-pages";
import { faqPageJsonLd } from "@/lib/seo/jsonld";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return gradingScalePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const config = gradingScaleBySlug[slug];
  if (!config) return {};
  return createPageMetadata({
    title: pageTitle(config.path, config.title),
    description: pageDescription(config.path, config.description),
    path: config.path,
    keywords: config.keywords,
  });
}

export default async function GradingScalePage({ params }: PageProps) {
  const { slug } = await params;
  const config = gradingScaleBySlug[slug];
  if (!config) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Grading Scales", href: "/grading-scales" },
    { name: config.title, href: config.path },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      {config.faqs && config.faqs.length > 0 && <JsonLd data={faqPageJsonLd(config.faqs)} />}
      <ContentPageLayout title={config.title} description={config.description} breadcrumbs={breadcrumbs}>
        <GradingScalePageContent config={config} />
      </ContentPageLayout>
    </>
  );
}
