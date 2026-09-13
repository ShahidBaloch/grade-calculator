import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CalculatorResourceLinks } from "@/config/calculator-links";

export function ResourceLinks({ links }: { links: CalculatorResourceLinks }) {
  if (!links.guide && !links.gradingScale) return null;

  return (
    <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4">
      <h2 className="text-sm font-semibold">Helpful resources</h2>
      <ul className="mt-2 space-y-2">
        {links.guide && (
          <li>
            <Link
              href={links.guide.path}
              className="inline-flex items-center gap-1 text-sm text-[var(--color-primary)] hover:underline"
            >
              {links.guide.title}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </li>
        )}
        {links.gradingScale && (
          <li>
            <Link
              href={links.gradingScale.path}
              className="inline-flex items-center gap-1 text-sm text-[var(--color-primary)] hover:underline"
            >
              {links.gradingScale.title}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
