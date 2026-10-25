"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { percentToLetter } from "@/lib/grading-scales";
import { formatPercent } from "@/config/score-pages";

interface ScoreOutOfCalculatorProps {
  initialScore?: number;
  initialTotal?: number;
}

/** Score out of total → percentage and US A–F letter grade. */
export function ScoreOutOfCalculator({ initialScore = 15, initialTotal = 20 }: ScoreOutOfCalculatorProps) {
  const [score, setScore] = React.useState(String(initialScore));
  const [total, setTotal] = React.useState(String(initialTotal));
  const s = Number(score);
  const t = Number(total);
  const valid = score !== "" && total !== "" && Number.isFinite(s) && Number.isFinite(t) && t > 0 && s >= 0;
  const percent = valid ? (s / t) * 100 : null;
  const letter = percent == null ? null : percentToLetter(percent, "us-lenient").letter;

  return (
    <div className="calculator-print-area space-y-4 rounded-lg border border-[var(--color-border)] p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="score-points">Your score (points earned)</Label>
          <Input
            id="score-points"
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="score-total">Out of (total points)</Label>
          <Input
            id="score-total"
            type="number"
            inputMode="decimal"
            min={1}
            step="any"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
        </div>
      </div>
      <div aria-live="polite" className="rounded-md bg-[var(--color-bg-subtle)] p-4">
        {percent == null ? (
          <p className="text-sm text-[var(--color-text-muted)]">Enter a score and a total greater than 0.</p>
        ) : (
          <>
            <p className="text-2xl font-bold">
              {score} out of {total} = {formatPercent(percent)} ({letter})
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              Letter grade on the common US A–F scale (A 90–100, B 80–89, C 70–79, D 60–69, F below 60).
              {s > t ? " Score is above the total, so extra credit pushes it past 100%." : ""}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
