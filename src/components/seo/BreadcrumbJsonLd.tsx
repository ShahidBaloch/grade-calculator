import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import type { BreadcrumbItem } from "@/types/seo";
import { JsonLd } from "./JsonLd";

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return <JsonLd data={breadcrumbJsonLd(items)} />;
}
