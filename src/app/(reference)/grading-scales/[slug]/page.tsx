import { notFound } from "next/navigation";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { GradingScalePageContent } from "@/components/content/GradingScalePageContent";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { gradingScaleBySlug, gradingScalePages } from "@/config/grading-scale-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return gradingScalePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const config = gradingScaleBySlug[slug];
  if (!config) return {};
  return createPageMetadata({
    title: config.title,
    description: config.description,
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
      <ContentPageLayout title={config.title} description={config.description} breadcrumbs={breadcrumbs}>
        <GradingScalePageContent config={config} />
      </ContentPageLayout>
    </>
  );
}
