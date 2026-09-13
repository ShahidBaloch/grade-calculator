import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/types/seo";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-muted)]">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-4 w-4" aria-hidden />}
              {isLast ? (
                <span className="font-medium text-[var(--color-text)] truncate max-w-[12rem] sm:max-w-none">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-[var(--color-primary)] truncate max-w-[8rem] sm:max-w-none">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
