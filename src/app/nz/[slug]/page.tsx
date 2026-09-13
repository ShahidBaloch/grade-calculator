import {
  createGeoCalculatorMetadata,
  generateGeoStaticParams,
  GeoCalculatorPage,
} from "@/lib/seo/geo-calculator-page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return generateGeoStaticParams("nz");
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return createGeoCalculatorMetadata("nz", slug);
}

export default async function NzCalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  return <GeoCalculatorPage country="nz" slug={slug} />;
}
