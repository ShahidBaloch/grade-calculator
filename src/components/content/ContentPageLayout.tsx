import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import type { BreadcrumbItem } from "@/types/seo";

interface ContentPageLayoutProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  /** Style plain h2/p/ul/ol/table children (.gc-prose) for pages that write unclassed markup. */
  richText?: boolean;
  children: React.ReactNode;
}

export function ContentPageLayout({
  title,
  description,
  breadcrumbs,
  richText = false,
  children,
}: ContentPageLayoutProps) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />
      <header className="print-title mt-4">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 text-lg text-[var(--color-text-muted)]">{description}</p>
        )}
      </header>
      <div className={richText ? "gc-prose mt-6" : "mt-8"}>{children}</div>
    </article>
  );
}
