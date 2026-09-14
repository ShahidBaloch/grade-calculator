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
  cgpaFormulas,
  convertCgpa,
  type CgpaConvertMode,
  type CgpaFormulaId,
} from "@/lib/calculators/cgpa-convert";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";

interface CgpaState {
  mode: CgpaConvertMode;
  formulaId: CgpaFormulaId;
  value: number;
}

export function CgpaToPercentageCalculator() {
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence<CgpaState>(
    "cgpa-to-percentage",
    {
      mode: "cgpa-to-percent",
      formulaId: "india-cbse-9.5",
      value: 8.2,
    },
  );
  const examples = calculatorBySlug["cgpa-to-percentage"].examples;
  const formula = cgpaFormulas.find((f) => f.id === state.formulaId) ?? cgpaFormulas[0];

  const result = React.useMemo(
    () =>
      convertCgpa({
        mode: state.mode,
        formulaId: state.formulaId,
        value: state.value,
      }),
    [state.mode, state.formulaId, state.value],
  );

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) =>
            setState({
              mode:
                values.mode === "percent-to-cgpa" || values.mode === "cgpa-to-percent"
                  ? values.mode
                  : state.mode,
              formulaId:
                typeof values.formulaId === "string"
                  ? (values.formulaId as CgpaFormulaId)
                  : state.formulaId,
              value: typeof values.value === "number" ? values.value : state.value,
            })
          }
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="cgpa-mode">Conversion</Label>
        <Select
          value={state.mode}
          onValueChange={(mode) => setState({ ...state, mode: mode as CgpaConvertMode })}
        >
          <SelectTrigger id="cgpa-mode" aria-label="Conversion">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cgpa-to-percent">CGPA → Percentage</SelectItem>
            <SelectItem value="percent-to-cgpa">Percentage → CGPA</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cgpa-formula">Formula</Label>
        <Select
          value={state.formulaId}
          onValueChange={(formulaId) =>
            setState({ ...state, formulaId: formulaId as CgpaFormulaId })
          }
        >
          <SelectTrigger id="cgpa-formula" aria-label="Formula">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cgpaFormulas.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-[var(--color-text-muted)]">{formula.description}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cgpa-value">
          {state.mode === "cgpa-to-percent" ? `CGPA (0–${formula.scaleMax})` : "Percentage (0–100)"}
        </Label>
        <Input
          id="cgpa-value"
          type="number"
          min={0}
          max={state.mode === "cgpa-to-percent" ? formula.scaleMax : 100}
          step="0.01"
          value={state.value}
          onChange={(e) => setState({ ...state, value: Number(e.target.value) })}
        />
      </div>

      {result.errors?.[0] && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {result.errors[0]}
        </p>
      )}

      {result.data && (
        <div
          aria-live="polite"
          className="print-result rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6"
        >
          <p className="text-sm text-[var(--color-text-muted)]">{result.data.outputLabel}</p>
          <p className="mt-1 text-5xl font-bold tracking-tight">
            {result.data.outputLabel === "Percentage"
              ? `${result.data.output.toFixed(2)}%`
              : result.data.output.toFixed(2)}
          </p>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">{result.data.message}</p>
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">
            Always confirm the official formula on your transcript or university handbook before
            applications.
          </p>
        </div>
      )}

      {getPrimaryFlow("cgpa-to-percentage") && result.status === "valid" && (
        <NextStepCard flow={getPrimaryFlow("cgpa-to-percentage")!} />
      )}
    </div>
  );
}
