import { notFound } from "next/navigation";
import { UniversityGpaCalculator } from "@/components/calculators/UniversityGpaCalculator";
import { GeoProgrammaticPage } from "@/components/content/GeoProgrammaticPage";
import { caUniversityProfiles } from "@/data/geo-sources/ca-universities";
import { buildCaUniversityCopy } from "@/lib/content/geo-page-copy";
import {
  caUniversityByPageParam,
  caUniversityLinkGroup,
  caUniversityPath,
  standaloneGeoHreflang,
} from "@/lib/seo/geo-programmatic";
import { createPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ page: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return caUniversityProfiles.map((profile) => ({ page: `${profile.slug}-gpa-calculator` }));
}

export async function generateMetadata({ params }: PageProps) {
  const profile = caUniversityByPageParam((await params).page);
  if (!profile) return {};
  const copy = buildCaUniversityCopy(profile);
  const path = caUniversityPath(profile.slug);
  return createPageMetadata({
    title: copy.title,
    description: copy.description,
    path,
    keywords: copy.keywords,
    languages: standaloneGeoHreflang(path, "en-CA"),
  });
}

export default async function CaUniversityGpaPage({ params }: PageProps) {
  const profile = caUniversityByPageParam((await params).page);
  if (!profile) notFound();
  const copy = buildCaUniversityCopy(profile);
  const path = caUniversityPath(profile.slug);

  return (
    <GeoProgrammaticPage
      copy={copy}
      path={path}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Canada", href: "/ca" },
        { name: copy.h1, href: path },
      ]}
      calculator={<UniversityGpaCalculator slug={profile.slug} />}
      related={caUniversityLinkGroup()}
    />
  );
}
