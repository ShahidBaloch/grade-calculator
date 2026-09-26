import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import type { BreadcrumbItem } from "@/types/seo";

interface ContentPageLayoutProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
}

export function ContentPageLayout({
  title,
  description,
  breadcrumbs,
  children,
}: ContentPageLayoutProps) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />
      <header className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 text-lg text-[var(--color-text-muted)]">{description}</p>
        )}
      </header>
      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">{children}</div>
    </article>
  );
}
