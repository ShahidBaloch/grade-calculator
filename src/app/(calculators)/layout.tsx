import { Suspense } from "react";

export default function CalculatorsGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-16" aria-busy="true">
          <div className="h-8 w-48 animate-pulse rounded bg-[var(--color-bg-subtle)]" />
          <div className="mt-8 h-64 animate-pulse rounded-lg bg-[var(--color-bg-subtle)]" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
