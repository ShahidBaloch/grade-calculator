import {
  createGeoCalculatorMetadata,
  generateGeoStaticParams,
  GeoCalculatorPage,
} from "@/lib/seo/geo-calculator-page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return generateGeoStaticParams("us");
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return createGeoCalculatorMetadata("us", slug);
}

export default async function UsCalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  return <GeoCalculatorPage country="us" slug={slug} />;
}
