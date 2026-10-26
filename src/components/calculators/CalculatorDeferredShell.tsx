/**
 * Layout reservation while a calculator chunk loads on the client.
 * No “loading” copy (SEO); not animated (avoid thin-content snapshots). SSR still renders the real tool.
 */
export function CalculatorDeferredShell() {
  return (
    <div
      className="min-h-[12rem] rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)]"
      aria-hidden
    />
  );
}
