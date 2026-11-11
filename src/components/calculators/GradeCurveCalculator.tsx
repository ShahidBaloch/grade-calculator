"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPercent } from "@/config/score-pages";
import { curveScores, parseCurveScores, type CurveMethod } from "@/lib/calculators/grade-curve";
import { percentToLetter } from "@/lib/grading-scales";

const METHODS: Array<{ id: CurveMethod; label: string; hint: string }> = [
  { id: "flat", label: "Add points to every score", hint: "Everyone gets the same number of extra points." },
  { id: "top-to-100", label: "Top score becomes 100", hint: "Adds the gap between the highest score and 100 to every score." },
  { id: "scale-to-top", label: "Grade out of the top score", hint: "Divides every score by the highest score, so the top score is 100%." },
  { id: "square-root", label: "Square root curve", hint: "Curved score = 10 × √(raw score). Helps low scores the most." },
  { id: "target-average", label: "Raise the class average", hint: "Shifts every score so the class average lands on your target." },
];

const FIELD_CLASS =
  "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]";

function letterFor(percent: number) {
  return percentToLetter(Math.min(100, percent), "us-lenient").letter;
}

/** /grade-curve-calculator: curve one score or a whole class list with five common methods. */
export function GradeCurveCalculator() {
  const [scoresText, setScoresText] = React.useState("62, 71, 78, 85, 91");
  const [method, setMethod] = React.useState<CurveMethod>("flat");
  const [points, setPoints] = React.useState("5");
  const [target, setTarget] = React.useState("80");
  const [cap, setCap] = React.useState(true);

  const scores = parseCurveScores(scoresText);
  const result = curveScores(scores, method, {
    points: points === "" ? undefined : Number(points),
    targetAverage: target === "" ? undefined : Number(target),
    cap,
  });
  const active = METHODS.find((m) => m.id === method)!;

  return (
    <div className="calculator-print-area space-y-4 rounded-lg border border-[var(--color-border)] p-4">
      <div className="space-y-1">
        <Label htmlFor="curve-scores">Scores as percentages (one student, or the whole class)</Label>
        <textarea
          id="curve-scores"
          rows={3}
          inputMode="decimal"
          className={FIELD_CLASS}
          value={scoresText}
          onChange={(e) => setScoresText(e.currentTarget.value)}
        />
        <p className="text-xs text-[var(--color-text-muted)]">Separate scores with commas, spaces, or new lines.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="curve-method">Curve method</Label>
          <select
            id="curve-method"
            className={`${FIELD_CLASS} h-11`}
            value={method}
            onChange={(e) => setMethod(e.currentTarget.value as CurveMethod)}
          >
            {METHODS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        {method === "flat" && (
          <div className="space-y-1">
            <Label htmlFor="curve-points">Points to add</Label>
            <Input id="curve-points" type="number" inputMode="decimal" step="any" value={points} onChange={(e) => setPoints(e.currentTarget.value)} />
          </div>
        )}
        {method === "target-average" && (
          <div className="space-y-1">
            <Label htmlFor="curve-target">Target class average (%)</Label>
            <Input id="curve-target" type="number" inputMode="decimal" step="any" value={target} onChange={(e) => setTarget(e.currentTarget.value)} />
          </div>
        )}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">{active.hint}</p>

      <label className="flex min-h-11 items-center gap-2 text-sm">
        <input type="checkbox" className="h-5 w-5" checked={cap} onChange={(e) => setCap(e.currentTarget.checked)} />
        Cap curved scores at 100%
      </label>

      <div aria-live="polite" className="rounded-md bg-[var(--color-bg-subtle)] p-4">
        {!result ? (
          <p className="text-sm text-[var(--color-text-muted)]">
            Enter at least one score{method === "flat" ? " and the points to add" : method === "target-average" ? " and a target average" : ""}.
          </p>
        ) : (
          <>
            <p className="text-2xl font-bold">
              {scores.length === 1
                ? `${formatPercent(scores[0])} → ${formatPercent(result.curved[0])} (${letterFor(result.curved[0])})`
                : `Class average ${formatPercent(result.rawAverage)} → ${formatPercent(result.curvedAverage)}`}
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {result.shift === null
                ? "Each score moves by a different amount with this method."
                : `Every score moves by ${result.shift >= 0 ? "+" : ""}${parseFloat(result.shift.toFixed(2))} points${cap ? ", up to 100%" : ""}.`}{" "}
              Letters use the 10-point scale (A 90, B 80, C 70, D 60).
            </p>
          </>
        )}
      </div>

      {result && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Raw and curved scores</caption>
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th scope="col" className="py-2 pr-4 font-semibold">Raw score</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Raw letter</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Curved score</th>
                <th scope="col" className="py-2 font-semibold">Curved letter</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={index} className="border-b border-[var(--color-border)]">
                  <td className="py-2 pr-4">{formatPercent(score)}</td>
                  <td className="py-2 pr-4">{letterFor(score)}</td>
                  <td className="py-2 pr-4 font-semibold">{formatPercent(result.curved[index])}</td>
                  <td className="py-2 font-semibold">{letterFor(result.curved[index])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
