import { getScale, percentToLetter } from "@/lib/grading-scales";
import type { ScaleId } from "@/types/grading-scale";

/** Percentages people actually look up, from the top of the range to the fail line. */
const SAMPLE_PERCENTS = [100, 97, 95, 93, 92, 90, 89, 87, 85, 83, 80, 79, 77, 75, 73, 70, 69, 67, 65, 63, 60, 59];

/**
 * One row per percentage, one column per scale, so a student can see at a glance that
 * the same 85% is a B on a 10-point scale, a B on plus/minus, and a B on 7-point —
 * while a 92% is an A, an A−, or a B.
 */
export function ScaleComparisonTable({ scaleIds }: { scaleIds: ScaleId[] }) {
  const scales = scaleIds.map((id) => getScale(id));
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
      <table className="w-full text-sm">
        <thead className="bg-[var(--color-bg-muted)]">
          <tr>
            <th scope="col" className="px-3 py-3 text-left font-semibold sm:px-4">
              Percentage
            </th>
            {scales.map((scale) => (
              <th key={scale.id} scope="col" className="px-3 py-3 text-left font-semibold sm:px-4">
                {scale.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SAMPLE_PERCENTS.map((percent) => (
            <tr key={percent} className="odd:bg-[var(--color-bg-subtle)]">
              <td className="px-3 py-2 font-medium sm:px-4">{percent}%</td>
              {scales.map((scale) => {
                const { letter, gpa } = percentToLetter(percent, scale.id);
                return (
                  <td key={scale.id} className="px-3 py-2 sm:px-4">
                    {letter}
                    {gpa != null && (
                      <span className="ml-1 text-xs text-[var(--color-text-muted)]">({gpa.toFixed(1)})</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
