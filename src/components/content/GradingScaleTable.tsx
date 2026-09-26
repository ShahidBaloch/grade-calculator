import { getBandRangeLabel } from "@/lib/grading-scales";
import type { GradingScale } from "@/types/grading-scale";

export function GradingScaleTable({ scale }: { scale: GradingScale }) {
  const showGpaColumn = scale.gpaMax != null && scale.id !== "uk-degree";
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
      <table className="w-full min-w-[480px] text-sm">
        <thead className="sticky top-0 bg-[var(--color-bg-muted)]">
          <tr>
            <th scope="col" className="px-4 py-3 text-left font-semibold">Letter / Grade</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold">Percentage</th>
            {showGpaColumn && (
              <th scope="col" className="px-4 py-3 text-left font-semibold">GPA Points</th>
            )}
          </tr>
        </thead>
        <tbody>
          {scale.bands.map((band) => (
            <tr key={band.letter} className="odd:bg-[var(--color-bg-subtle)]">
              <td className="px-4 py-2 font-medium">{band.letter}</td>
              <td className="px-4 py-2">{getBandRangeLabel(band)}</td>
              {showGpaColumn && (
                <td className="px-4 py-2">{band.gpa ?? "—"}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
