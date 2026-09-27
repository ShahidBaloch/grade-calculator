import Link from "next/link";
import { calculatorIntents, intentHref } from "@/config/calculator-intents";

/** Short “what do you need?” block — helps users pick the right tool fast. */
export function CalculatorIntentGuide() {
  return (
    <section
      aria-labelledby="intent-guide-heading"
      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4 md:p-5"
    >
      <h2 id="intent-guide-heading" className="text-base font-semibold text-[var(--color-text)]">
        Which calculator do I need?
      </h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        Pick your goal — each tool opens in one click.
      </p>
      <ul className="mt-4 divide-y divide-[var(--color-border)]">
        {calculatorIntents.map((item) => (
          <li key={item.slug} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-[var(--color-text)]">{item.goal}</span>
            <Link
              href={intentHref(item.slug)}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 text-sm font-medium text-[var(--color-primary)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]"
            >
              {item.action}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
