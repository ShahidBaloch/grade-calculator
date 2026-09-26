import { GeoPageHint } from "@/components/engagement/GeoPageHint";
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
  /** Homepage: calculator only, no side column. */
  focus?: boolean;
}

export function CalculatorLayout({
  title,
  description,
  breadcrumbs,
  calculator,
  content,
  below,
  focus = false,
}: CalculatorLayoutProps) {
  const shell = focus ? "mx-auto max-w-3xl px-4 py-6 md:py-8" : "mx-auto max-w-7xl px-4 py-6 md:py-8";

  return (
    <div className={shell}>
      <div className="no-print">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className={focus ? "mt-4" : "mt-4 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10"}>
        <section>
          <h1 className="text-3xl font-bold tracking-tight print:text-xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-[var(--color-text-muted)] print:mt-1 print:text-sm">
            {description}
          </p>
          <GeoPageHint />
          <p className="mt-1 hidden text-xs text-[var(--color-text-muted)] print:block">
            {siteConfig.name} · {siteConfig.url}
          </p>
          <div className="mt-6 print:mt-3">{calculator}</div>
        </section>
        {content && !focus && (
          <aside className="no-print mt-10 lg:mt-14">{content}</aside>
        )}
      </div>
      {below && <div className="no-print mt-12">{below}</div>}
    </div>
  );
}
