import { getGradeBandClass } from "@/lib/grading-scales";
import { formatGpa, formatPercent } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

interface ResultDisplayProps {
  label: string;
  percent?: number | null;
  letterGrade?: string | null;
  gpa?: number | null;
  placeholder?: string;
}

export function ResultDisplay({
  label,
  percent,
  letterGrade,
  gpa,
  placeholder = "—",
}: ResultDisplayProps) {
  const gradeClass = letterGrade ? getGradeBandClass(letterGrade) : null;

  return (
    <div
      aria-live="polite"
      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6"
    >
      <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-1 text-5xl font-bold tracking-tight">
        {percent != null ? formatPercent(percent) : placeholder}
      </p>
      {(letterGrade || gpa != null) && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {letterGrade && (
            <span
              className={cn(
                "inline-flex rounded-md px-3 py-1 text-lg font-semibold",
                gradeClass === "a" && "bg-[var(--grade-a-bg)] text-[var(--grade-a-text)]",
                gradeClass === "b" && "bg-[var(--grade-b-bg)] text-[var(--grade-b-text)]",
                gradeClass === "c" && "bg-[var(--grade-c-bg)] text-[var(--grade-c-text)]",
                gradeClass === "d" && "bg-[var(--grade-d-bg)] text-[var(--grade-d-text)]",
                gradeClass === "f" && "bg-[var(--grade-f-bg)] text-[var(--grade-f-text)]",
              )}
            >
              {letterGrade}
            </span>
          )}
          {gpa != null && (
            <span className="text-sm text-[var(--color-text-muted)]">GPA {formatGpa(gpa)}</span>
          )}
        </div>
      )}
    </div>
  );
}
