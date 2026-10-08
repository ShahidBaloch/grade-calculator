import { notFound } from "next/navigation";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { GuideArticle } from "@/components/content/GuideArticle";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBySlug, guides } from "@/config/guides";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { howToJsonLd, articleJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/config/site";
import { getEmbeddedCalculator } from "@/lib/seo/guide-components";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guide = guideBySlug[slug];
  if (!guide) return {};
  return createPageMetadata({
    title: pageTitle(guide.path, guide.title),
    description: pageDescription(guide.path, guide.description),
    path: guide.path,
    keywords: guide.keywords,
  });
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = guideBySlug[slug];
  if (!guide) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: guide.title, href: guide.path },
  ];

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            headline: guide.title,
            description: guide.description,
            path: guide.path,
            dateModified: siteConfig.editorial.lastReviewed,
          }),
          howToJsonLd({
            name: guide.title,
            description: guide.description,
            steps: guide.sections.map((s) => s.heading),
          }),
        ]}
      />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ContentPageLayout title={guide.title} description={guide.description} breadcrumbs={breadcrumbs}>
        <GuideArticle
          guide={guide}
          embeddedCalculator={
            guide.embeddedCalculator ? getEmbeddedCalculator(guide.embeddedCalculator) : undefined
          }
        />
      </ContentPageLayout>
    </>
  );
}
