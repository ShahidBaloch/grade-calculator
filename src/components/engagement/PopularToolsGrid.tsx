import Link from "next/link";
import { getCalculatorPath, mvpCalculators } from "@/config/calculators";

export function PopularToolsGrid() {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {mvpCalculators.map((calculator) => (
        <li key={calculator.slug}>
          <Link
            href={getCalculatorPath(calculator.slug)}
            className="flex min-h-11 items-center rounded-md border border-[var(--color-border)] px-3 py-2 text-sm font-medium hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-primary)]"
          >
            {calculator.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
