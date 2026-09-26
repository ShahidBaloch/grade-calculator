import { getBandRangeLabel } from "@/lib/grading-scales";
import type { GradingScale } from "@/types/grading-scale";

export function GradingScaleTable({ scale }: { scale: GradingScale }) {
  const showGpaColumn = scale.gpaMax != null && scale.id !== "uk-degree";
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-[var(--color-bg-muted)]">
          <tr>
            <th scope="col" className="px-3 py-3 text-left font-semibold sm:px-4">Letter / Grade</th>
            <th scope="col" className="px-3 py-3 text-left font-semibold sm:px-4">Percentage</th>
            {showGpaColumn && (
              <th scope="col" className="px-3 py-3 text-left font-semibold sm:px-4">Grade points</th>
            )}
          </tr>
        </thead>
        <tbody>
          {scale.bands.map((band) => (
            <tr key={band.letter} className="odd:bg-[var(--color-bg-subtle)]">
              <td className="px-3 py-2 font-medium sm:px-4">{band.letter}</td>
              <td className="px-3 py-2 sm:px-4">{getBandRangeLabel(band)}</td>
              {showGpaColumn && (
                <td className="px-3 py-2 sm:px-4">{band.gpaLabel ?? band.gpa ?? "—"}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
