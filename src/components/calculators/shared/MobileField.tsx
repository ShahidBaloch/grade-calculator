import type { ReactNode } from "react";

/**
 * Caption for a row input on phones, where the column headers above a row list are hidden and
 * bare numbers ("92", "20") would be ambiguous. From `sm` up the headers take over.
 */
export function MobileField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid content-start gap-1">
      <span aria-hidden="true" className="text-xs text-[var(--color-text-muted)] sm:hidden">
        {label}
      </span>
      {children}
    </div>
  );
}
