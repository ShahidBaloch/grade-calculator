import { notFound } from "next/navigation";
import { AtarCalculator } from "@/components/calculators/AtarCalculator";
import { GeoProgrammaticPage } from "@/components/content/GeoProgrammaticPage";
import { auAtarStates } from "@/data/geo-sources/au-atar-states";
import { buildAuAtarStateCopy } from "@/lib/content/geo-page-copy";
import {
  auAtarStateByParam,
  auAtarStateLinkGroup,
  auAtarStatePath,
  standaloneGeoHreflang,
} from "@/lib/seo/geo-programmatic";
import { createPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ state: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return auAtarStates.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const state = auAtarStateByParam((await params).state);
  if (!state) return {};
  const copy = buildAuAtarStateCopy(state);
  const path = auAtarStatePath(state.slug);
  return createPageMetadata({
    title: copy.title,
    description: copy.description,
    path,
    keywords: copy.keywords,
    languages: standaloneGeoHreflang(path, "en-AU"),
  });
}

export default async function AtarStatePage({ params }: PageProps) {
  const state = auAtarStateByParam((await params).state);
  if (!state) notFound();
  const copy = buildAuAtarStateCopy(state);
  const path = auAtarStatePath(state.slug);

  return (
    <GeoProgrammaticPage
      copy={copy}
      path={path}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Australia", href: "/au" },
        { name: "ATAR Calculator", href: "/au/atar-calculator" },
        { name: state.certificate, href: path },
      ]}
      calculator={<AtarCalculator preset={{ authority: state.authority, subjects: state.subjects }} />}
      related={auAtarStateLinkGroup()}
    />
  );
}
