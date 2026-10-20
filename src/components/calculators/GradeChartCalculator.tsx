"use client";

import * as React from "react";
import Link from "next/link";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { NumberStepper } from "@/components/calculators/shared/NumberStepper";
import { ResultDisplay } from "@/components/calculators/shared/ResultDisplay";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateGradeChart, GRADE_CHART_MAX_TOTAL } from "@/lib/calculators/grade-chart";
import { formatPercent } from "@/lib/utils/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

const QUICK_TOTALS = [10, 20, 25, 50, 100, 150, 200];

function formatRange(min: number | null, max: number | null) {
  if (min == null || max == null) return "—";
  return min === max ? String(min) : `${min}–${max}`;
}

export function GradeChartCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence("grade-chart", {
    total: 50,
    score: "" as number | "",
  });
  const { total, score } = state;

  const result = React.useMemo(
    () => calculateGradeChart(total, scaleId, score === "" ? null : score),
    [total, scaleId, score],
  );
  const data = result.data;

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <ScaleSelector />

      <div className="space-y-2">
        <Label>Common totals</Label>
        <div className="flex flex-wrap gap-2">
          {QUICK_TOTALS.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={total === value}
              onClick={() => setState({ ...state, total: value })}
              className={`rounded-md border px-3 py-2 text-sm min-h-11 min-w-11 ${
                total === value
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)]"
                  : "border-[var(--color-border)]"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <NumberStepper
          label="Total points or questions"
          value={total}
          min={1}
          max={GRADE_CHART_MAX_TOTAL}
          onChange={(value) => setState({ ...state, total: value })}
        />
        <div className="space-y-2">
          <Label htmlFor="grade-chart-score">Look up a score (optional)</Label>
          <Input
            id="grade-chart-score"
            type="number"
            min={0}
            placeholder={`e.g. ${Math.round(total * 0.85)}`}
            value={score}
            onChange={(e) =>
              setState({ ...state, score: e.target.value === "" ? "" : Number(e.target.value) })
            }
          />
        </div>
      </div>

      {result.errors?.map((e) => (
        <p key={e} className="text-sm text-[var(--color-error)]">{e}</p>
      ))}
      {result.warnings?.map((w) => (
        <p key={w} className="text-sm text-[var(--color-warning)]">{w}</p>
      ))}

      {data?.lookup && (
        <ResultDisplay
          label={`${data.lookup.points} out of ${data.total}`}
          percent={data.lookup.percent}
          letterGrade={data.lookup.letterGrade}
          gpa={data.lookup.gpa}
        />
      )}

      {data && (
        <>
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Points needed for each grade out of {data.total}</h2>
            <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
              <table className="w-full min-w-[320px] text-sm">
                <thead className="bg-[var(--color-bg-muted)]">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left font-medium">Grade</th>
                    <th scope="col" className="px-3 py-2 text-left font-medium">Percent</th>
                    <th scope="col" className="px-3 py-2 text-left font-medium">Points</th>
                    <th scope="col" className="px-3 py-2 text-left font-medium">GPA</th>
                  </tr>
                </thead>
                <tbody>
                  {data.bands.map((band) => (
                    <tr key={band.letter} className="odd:bg-[var(--color-bg-subtle)]">
                      <td className="px-3 py-2 font-medium">{band.letter}</td>
                      <td className="px-3 py-2">
                        {band.minPercent}–{band.maxPercent}%
                      </td>
                      <td className="px-3 py-2">{formatRange(band.minPoints, band.maxPoints)}</td>
                      <td className="px-3 py-2">{band.gpa == null ? "—" : band.gpa.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">
              “—” means no whole-number score out of {data.total} lands in that band. Full scale details:{" "}
              <Link href="/grading-scales" className="underline">
                grading scales by country
              </Link>
              .
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Grade chart: every score out of {data.total}</h2>
            <div className="max-h-[32rem] overflow-auto rounded-lg border border-[var(--color-border)] print:max-h-none">
              <table className="w-full min-w-[280px] text-sm">
                <thead className="sticky top-0 bg-[var(--color-bg-muted)]">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left font-medium">Score</th>
                    <th scope="col" className="px-3 py-2 text-left font-medium">Percent</th>
                    <th scope="col" className="px-3 py-2 text-left font-medium">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row) => {
                    const highlighted = data.lookup != null && data.lookup.points === row.points;
                    return (
                      <tr
                        key={row.points}
                        className={
                          highlighted
                            ? "bg-[var(--color-primary-subtle)] font-medium"
                            : "odd:bg-[var(--color-bg-subtle)]"
                        }
                      >
                        <td className="px-3 py-2">
                          {row.points}/{data.total}
                        </td>
                        <td className="px-3 py-2">{formatPercent(row.percent)}</td>
                        <td className="px-3 py-2">{row.letterGrade}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {getPrimaryFlow("grade-chart") && data && <NextStepCard flow={getPrimaryFlow("grade-chart")!} />}
    </div>
  );
}
