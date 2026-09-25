import {
  createGeoCalculatorMetadata,
  generateGeoStaticParams,
  GeoCalculatorPage,
} from "@/lib/seo/geo-calculator-page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return generateGeoStaticParams("in");
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return createGeoCalculatorMetadata("in", slug);
}

export default async function InCalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  return <GeoCalculatorPage country="in" slug={slug} />;
}
