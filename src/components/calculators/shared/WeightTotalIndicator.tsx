interface WeightTotalIndicatorProps {
  total: number;
  /** When omitted, only the total is shown (no 100% syllabus hint). */
  expectedTotal?: number;
  suffix?: string;
  label?: string;
}

export function WeightTotalIndicator({
  total,
  expectedTotal,
  suffix = "%",
  label = "Weight total",
}: WeightTotalIndicatorProps) {
  const rounded = Math.round(total * 100) / 100;
  const hasExpected = expectedTotal != null;
  const matches = !hasExpected || Math.abs(rounded - expectedTotal) <= 0.01;

  return (
    <p
      className={`text-sm ${matches ? "text-[var(--color-text-muted)]" : "text-[var(--color-warning)]"}`}
      role="status"
    >
      {label}:{" "}
      <span className="font-medium text-[var(--color-text)]">
        {rounded}
        {suffix}
      </span>
      {hasExpected && !matches && (
        <> — your syllabus may expect {expectedTotal}
        {suffix}. We still divide by {rounded}
        {suffix}.</>
      )}
      {hasExpected && matches && (
        <>
          {" "}
          — matches {expectedTotal}
          {suffix}.
        </>
      )}
    </p>
  );
}
