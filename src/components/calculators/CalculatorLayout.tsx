import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/config/site";
import type { BreadcrumbItem } from "@/types/seo";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  calculator: React.ReactNode;
  content?: React.ReactNode;
  below?: React.ReactNode;
}

export function CalculatorLayout({
  title,
  description,
  breadcrumbs,
  calculator,
  content,
  below,
}: CalculatorLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <div className="no-print">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className="mt-4 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8">
        <section>
          <h1 className="text-3xl font-bold tracking-tight print:text-xl">{title}</h1>
          <p className="mt-2 text-[var(--color-text-muted)] print:mt-1 print:text-sm">{description}</p>
          <p className="mt-1 hidden text-xs text-[var(--color-text-muted)] print:block">
            {siteConfig.name} · {siteConfig.url}
          </p>
          <div className="mt-6 print:mt-3">{calculator}</div>
        </section>
        {content && <aside className="no-print mt-8 lg:mt-14">{content}</aside>}
      </div>
      {below && <div className="no-print mt-12">{below}</div>}
    </div>
  );
}
