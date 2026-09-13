import { formatPercent } from "@/lib/utils/format";

export interface GradeChartRow {
  wrong: number;
  correct: number;
  scorePercent: number;
  letterGrade: string;
}

interface GradeChartProps {
  rows: GradeChartRow[];
  highlightWrong?: number;
}

export function GradeChart({ rows, highlightWrong }: GradeChartProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
      <table className="w-full min-w-[320px] text-sm">
        <thead className="bg-[var(--color-bg-muted)]">
          <tr>
            <th scope="col" className="px-3 py-2 text-left font-medium">Wrong</th>
            <th scope="col" className="px-3 py-2 text-left font-medium">Correct</th>
            <th scope="col" className="px-3 py-2 text-left font-medium">Score %</th>
            <th scope="col" className="px-3 py-2 text-left font-medium">Grade</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const highlighted = highlightWrong === row.wrong;
            return (
              <tr
                key={row.wrong}
                className={highlighted ? "bg-[var(--color-primary-subtle)] font-medium" : "odd:bg-[var(--color-bg-subtle)]"}
              >
                <td className="px-3 py-2">{row.wrong}</td>
                <td className="px-3 py-2">{row.correct}</td>
                <td className="px-3 py-2">{formatPercent(row.scorePercent)}</td>
                <td className="px-3 py-2">{row.letterGrade}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
