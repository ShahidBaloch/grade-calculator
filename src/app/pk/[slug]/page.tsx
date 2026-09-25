import {
  createGeoCalculatorMetadata,
  generateGeoStaticParams,
  GeoCalculatorPage,
} from "@/lib/seo/geo-calculator-page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return generateGeoStaticParams("pk");
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return createGeoCalculatorMetadata("pk", slug);
}

export default async function PkCalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  return <GeoCalculatorPage country="pk" slug={slug} />;
}
