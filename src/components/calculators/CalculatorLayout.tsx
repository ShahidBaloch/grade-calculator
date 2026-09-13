import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
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
      <Breadcrumbs items={breadcrumbs} />
      <div className="mt-4 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8">
        <section>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-[var(--color-text-muted)]">{description}</p>
          <div className="mt-6">{calculator}</div>
        </section>
        {content && <aside className="mt-8 lg:mt-14">{content}</aside>}
      </div>
      {below && <div className="mt-12">{below}</div>}
    </div>
  );
}
