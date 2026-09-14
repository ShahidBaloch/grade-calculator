import { getGradeBandClass } from "@/lib/grading-scales";
import { formatGpa, formatPercent } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

interface ResultDisplayProps {
  label: string;
  percent?: number | null;
  letterGrade?: string | null;
  gpa?: number | null;
  placeholder?: string;
  /** When true, letter grade is the hero (conversion tools). */
  primaryLetter?: boolean;
}

export function ResultDisplay({
  label,
  percent,
  letterGrade,
  gpa,
  placeholder = "—",
  primaryLetter = false,
}: ResultDisplayProps) {
  const gradeClass = letterGrade ? getGradeBandClass(letterGrade) : null;
  const showLetterHero = primaryLetter && Boolean(letterGrade);

  return (
    <div
      aria-live="polite"
      className="print-result rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6"
    >
      <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
      {showLetterHero ? (
        <p
          className={cn(
            "mt-1 inline-flex rounded-md px-4 py-1 text-5xl font-bold tracking-tight",
            gradeClass === "a" && "bg-[var(--grade-a-bg)] text-[var(--grade-a-text)]",
            gradeClass === "b" && "bg-[var(--grade-b-bg)] text-[var(--grade-b-text)]",
            gradeClass === "c" && "bg-[var(--grade-c-bg)] text-[var(--grade-c-text)]",
            gradeClass === "d" && "bg-[var(--grade-d-bg)] text-[var(--grade-d-text)]",
            gradeClass === "f" && "bg-[var(--grade-f-bg)] text-[var(--grade-f-text)]",
            !gradeClass && "text-[var(--color-text)]",
          )}
        >
          {letterGrade}
        </p>
      ) : (
        <p className="mt-1 text-5xl font-bold tracking-tight">
          {percent != null ? formatPercent(percent) : placeholder}
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {showLetterHero && percent != null && (
          <span className="text-sm text-[var(--color-text-muted)]">{formatPercent(percent)}</span>
        )}
        {!showLetterHero && letterGrade && (
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
    </div>
  );
}
