"use client";

import dynamic from "next/dynamic";
import { CalculatorDeferredShell } from "@/components/calculators/CalculatorDeferredShell";

export const ScoreOutOfCalculatorLazy = dynamic(
  () => import("@/components/calculators/ScoreOutOfCalculator").then((m) => m.ScoreOutOfCalculator),
  { ssr: true, loading: () => <CalculatorDeferredShell /> },
);
