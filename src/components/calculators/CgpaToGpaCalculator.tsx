"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  cgpaToGpaMethods,
  convertCgpa10ToGpa4,
  type CgpaToGpaMethodId,
} from "@/lib/calculators/cgpa-to-gpa";
import { formatGpa } from "@/lib/utils/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";

export function CgpaToGpaCalculator() {
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "cgpa-to-gpa",
    { cgpa: 8.2, methodId: "linear-0.4" as CgpaToGpaMethodId },
  );
  const examples = calculatorBySlug["cgpa-to-gpa"].examples;
  const method = cgpaToGpaMethods.find((m) => m.id === state.methodId) ?? cgpaToGpaMethods[0];

  const result = React.useMemo(
    () => convertCgpa10ToGpa4({ cgpa: state.cgpa, methodId: state.methodId }),
    [state.cgpa, state.methodId],
  );

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) =>
            setState({
              cgpa: typeof values.cgpa === "number" ? values.cgpa : state.cgpa,
              methodId:
                typeof values.methodId === "string"
                  ? (values.methodId as CgpaToGpaMethodId)
                  : state.methodId,
            })
          }
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="cgpa10">10-point CGPA (0–10)</Label>
        <Input
          id="cgpa10"
          type="number"
          min={0}
          max={10}
          step="0.01"
          value={state.cgpa}
          onChange={(e) => setState({ ...state, cgpa: Number(e.target.value) })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cgpa-to-gpa-method">Method</Label>
        <Select
          value={state.methodId}
          onValueChange={(methodId) =>
            setState({ ...state, methodId: methodId as CgpaToGpaMethodId })
          }
        >
          <SelectTrigger id="cgpa-to-gpa-method" aria-label="Method">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cgpaToGpaMethods.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-[var(--color-text-muted)]">{method.description}</p>
      </div>

      {result.errors?.[0] && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {result.errors[0]}
        </p>
      )}

      {result.data && (
        <div
          aria-live="polite"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6"
        >
          <p className="text-sm text-[var(--color-text-muted)]">Estimated US GPA (4.0)</p>
          <p className="text-5xl font-bold">{formatGpa(result.data.gpa4)}</p>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">{result.data.message}</p>
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">
            Educational estimate only. US universities and evaluation services (e.g. WES) may use a
            different table.
          </p>
        </div>
      )}

      {getPrimaryFlow("cgpa-to-gpa") && result.status === "valid" && (
        <NextStepCard flow={getPrimaryFlow("cgpa-to-gpa")!} />
      )}
    </div>
  );
}
