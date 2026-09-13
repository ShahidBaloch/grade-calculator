import {
  createGeoCalculatorMetadata,
  generateGeoStaticParams,
  GeoCalculatorPage,
} from "@/lib/seo/geo-calculator-page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return generateGeoStaticParams("au");
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return createGeoCalculatorMetadata("au", slug);
}

export default async function AuCalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  return <GeoCalculatorPage country="au" slug={slug} />;
}
