import { notFound } from "next/navigation";
import { EocGradeCalculator } from "@/components/calculators/EocGradeCalculator";
import { GeoProgrammaticPage } from "@/components/content/GeoProgrammaticPage";
import { usEocStateRules } from "@/data/geo-sources/us-eoc-states";
import { buildUsEocStateCopy } from "@/lib/content/geo-page-copy";
import {
  eocWeightText,
  standaloneGeoHreflang,
  usEocStateByParam,
  usEocStateLinkGroup,
  usEocStatePath,
} from "@/lib/seo/geo-programmatic";
import { createPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ state: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return usEocStateRules.map((rule) => ({ state: rule.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const rule = usEocStateByParam((await params).state);
  if (!rule) return {};
  const copy = buildUsEocStateCopy(rule);
  const path = usEocStatePath(rule.slug);
  return createPageMetadata({
    title: copy.title,
    description: copy.description,
    path,
    keywords: copy.keywords,
    languages: standaloneGeoHreflang(path, "en-US"),
  });
}

export default async function EocStatePage({ params }: PageProps) {
  const rule = usEocStateByParam((await params).state);
  if (!rule) notFound();
  const copy = buildUsEocStateCopy(rule);
  const path = usEocStatePath(rule.slug);

  return (
    <GeoProgrammaticPage
      copy={copy}
      path={path}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "EOC Grade Calculator", href: "/eoc-grade-calculator" },
        { name: rule.state, href: path },
      ]}
      calculator={
        <EocGradeCalculator
          preset={{
            storageKey: `eoc-grade-calculator:${rule.slug}`,
            eocWeight: rule.defaultWeight,
            weightHint: `${rule.state}: the EOC counts for ${eocWeightText(rule)} (${rule.citation}).`,
          }}
        />
      }
      related={usEocStateLinkGroup()}
    />
  );
}
