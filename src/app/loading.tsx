export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16" role="status" aria-live="polite">
      <p className="sr-only">Loading</p>
      <div className="h-8 w-48 animate-pulse rounded bg-[var(--color-bg-subtle)]" />
      <div className="mt-4 h-4 w-full max-w-md animate-pulse rounded bg-[var(--color-bg-subtle)]" />
      <div className="mt-8 h-64 animate-pulse rounded-lg bg-[var(--color-bg-subtle)]" />
    </div>
  );
}
