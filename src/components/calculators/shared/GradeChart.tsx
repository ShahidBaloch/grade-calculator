"use client";

import * as React from "react";
import { formatPercent } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";

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

const COLLAPSED_ROWS = 7;

function windowStart(rowCount: number, highlightIndex: number, size: number) {
  const start = Math.max(0, highlightIndex - Math.floor(size / 2));
  return Math.min(start, Math.max(0, rowCount - size));
}

export function GradeChart({ rows, highlightWrong }: GradeChartProps) {
  const [expanded, setExpanded] = React.useState(false);
  const highlightIndex = Math.max(
    0,
    rows.findIndex((row) => row.wrong === highlightWrong),
  );
  const canCollapse = rows.length > COLLAPSED_ROWS;
  const start = !expanded && canCollapse ? windowStart(rows.length, highlightIndex, COLLAPSED_ROWS) : 0;
  const visibleCount = !expanded && canCollapse ? COLLAPSED_ROWS : rows.length;

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
          {rows.map((row, index) => {
            const highlighted = highlightWrong === row.wrong;
            const inWindow = index >= start && index < start + visibleCount;
            return (
              <tr
                key={row.wrong}
                className={[
                  highlighted ? "bg-[var(--color-primary-subtle)] font-medium" : "odd:bg-[var(--color-bg-subtle)]",
                  inWindow ? "" : "hidden print:table-row",
                ].join(" ")}
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
      {canCollapse && (
        <div className="no-print border-t border-[var(--color-border)] p-2 text-center">
          <Button type="button" variant="ghost" size="sm" onClick={() => setExpanded((value) => !value)}>
            {expanded ? "Show fewer rows" : `Show all ${rows.length} rows`}
          </Button>
        </div>
      )}
    </div>
  );
}
