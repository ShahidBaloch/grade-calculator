import type { CalculatorResult } from "@/types/calculator";

/** McMaster University official 12-point GPA to US 4.0 equivalent (lookup — not ÷3). */
export const MCMASTER_TWELVE_TO_US_FOUR: ReadonlyArray<{ twelve: number; us4: number }> = [
  { twelve: 12, us4: 4.0 },
  { twelve: 11, us4: 3.9 },
  { twelve: 10, us4: 3.7 },
  { twelve: 9, us4: 3.3 },
  { twelve: 8, us4: 3.0 },
  { twelve: 7, us4: 2.7 },
  { twelve: 6, us4: 2.3 },
  { twelve: 5, us4: 2.0 },
  { twelve: 4, us4: 1.7 },
  { twelve: 3, us4: 1.3 },
  { twelve: 2, us4: 1.0 },
  { twelve: 1, us4: 0.7 },
  { twelve: 0, us4: 0.0 },
];

const TABLE_BY_TWELVE = new Map(MCMASTER_TWELVE_TO_US_FOUR.map((row) => [row.twelve, row.us4]));

function interpolateTwelvePoint(value: number): number {
  const lower = Math.floor(value);
  const upper = Math.ceil(value);
  const lowerGpa = TABLE_BY_TWELVE.get(lower);
  const upperGpa = TABLE_BY_TWELVE.get(upper);
  if (lowerGpa == null || upperGpa == null) {
    return 0;
  }
  if (lower === upper) return lowerGpa;
  const weight = value - lower;
  return lowerGpa + (upperGpa - lowerGpa) * weight;
}

export interface McmasterGpaToUsResult {
  mcmasterTwelve: number;
  usGpa4: number;
  message: string;
  usedLookup: boolean;
}

export function convertMcmasterTwelveToUsFour(
  mcmasterTwelve: number,
): CalculatorResult<McmasterGpaToUsResult> {
  if (!Number.isFinite(mcmasterTwelve) || mcmasterTwelve < 0 || mcmasterTwelve > 12) {
    return { status: "error", errors: ["Enter a McMaster 12-point GPA between 0 and 12"] };
  }

  const rounded = Math.round(mcmasterTwelve * 100) / 100;
  const exact = TABLE_BY_TWELVE.get(Math.round(rounded));
  const usGpa4 =
    exact != null && Math.abs(rounded - Math.round(rounded)) < 0.001
      ? exact
      : interpolateTwelvePoint(rounded);

  const divideByThree = rounded / 3;
  const warnings =
    Math.abs(divideByThree - usGpa4) > 0.05 && rounded >= 6
      ? [
          `Dividing by 3 would give ${divideByThree.toFixed(2)} — McMaster's published table maps ${rounded.toFixed(2)} → ${usGpa4.toFixed(2)} instead.`,
        ]
      : undefined;

  return {
    status: "valid",
    data: {
      mcmasterTwelve: rounded,
      usGpa4,
      usedLookup: true,
      message: `McMaster ${rounded.toFixed(2)} (12-point) → ${usGpa4.toFixed(2)} US 4.0 (official McMaster lookup)`,
    },
    warnings,
  };
}
