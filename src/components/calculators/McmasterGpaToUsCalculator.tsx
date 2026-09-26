"use client";

import * as React from "react";
import { calculatorBySlug } from "@/config/calculators";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { convertMcmasterTwelveToUsFour } from "@/lib/calculators/mcmaster-gpa-to-us";
import { formatGpa } from "@/lib/utils/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";

export function McmasterGpaToUsCalculator() {
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "mcmaster-gpa-to-us-gpa",
    { mcmasterTwelve: 11 },
  );
  const examples = calculatorBySlug["mcmaster-gpa-to-us-gpa"].examples;

  const result = React.useMemo(
    () => convertMcmasterTwelveToUsFour(state.mcmasterTwelve),
    [state.mcmasterTwelve],
  );

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <p className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-3 text-sm text-[var(--color-text-muted)]">
        McMaster publishes a <strong className="font-medium text-[var(--color-text)]">lookup table</strong>{" "}
        from its 12-point GPA to a US 4.0 equivalent. Do not use 12-point GPA ÷ 3 — for example, 11
        maps to 3.9, not 3.67.
      </p>
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) =>
            setState({
              mcmasterTwelve:
                typeof values.mcmasterTwelve === "number" ? values.mcmasterTwelve : state.mcmasterTwelve,
            })
          }
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="mcmaster-twelve">McMaster 12-point GPA (0–12)</Label>
        <Input
          id="mcmaster-twelve"
          type="number"
          min={0}
          max={12}
          step="0.01"
          value={state.mcmasterTwelve}
          onChange={(e) => setState({ ...state, mcmasterTwelve: Number(e.target.value) })}
        />
      </div>

      {result.errors?.[0] && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {result.errors[0]}
        </p>
      )}

      {result.warnings?.[0] && (
        <p className="text-sm text-[var(--color-warning,#b45309)]" role="status">
          {result.warnings[0]}
        </p>
      )}

      {result.data && (
        <div
          aria-live="polite"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6"
        >
          <p className="text-sm text-[var(--color-text-muted)]">US 4.0 equivalent (McMaster table)</p>
          <p className="text-5xl font-bold">{formatGpa(result.data.usGpa4)}</p>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">{result.data.message}</p>
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">
            For graduate or professional applications, use McMaster&apos;s official conversion chart or
            the evaluating institution&apos;s instructions.
          </p>
        </div>
      )}
    </div>
  );
}
