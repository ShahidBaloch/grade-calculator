"use client";

import * as React from "react";
import type { CalculatorResult } from "@/types/calculator";

export function useCalculator<TInput, TResult>(
  calculate: (input: TInput) => CalculatorResult<TResult>,
  initialInput: TInput,
) {
  const [input, setInput] = React.useState<TInput>(initialInput);
  const result = React.useMemo(() => calculate(input), [calculate, input]);

  const updateInput = React.useCallback((patch: Partial<TInput>) => {
    setInput((prev) => ({ ...prev, ...patch }));
  }, []);

  const setField = React.useCallback(<K extends keyof TInput>(key: K, value: TInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { input, setInput, updateInput, setField, result };
}
