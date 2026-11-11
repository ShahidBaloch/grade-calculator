export type CurveMethod = "flat" | "top-to-100" | "scale-to-top" | "square-root" | "target-average";

export interface CurveOptions {
  /** Points added to every score ("flat"). */
  points?: number;
  /** Class average to reach ("target-average"). */
  targetAverage?: number;
  /** Stop curved scores at 100%. */
  cap?: boolean;
}

export interface CurveResult {
  curved: number[];
  rawAverage: number;
  curvedAverage: number;
  /** Points added to every score, for the methods that add the same amount to everyone. */
  shift: number | null;
}

/** "62, 71 78\n85" → [62, 71, 78, 85]. Ignores anything that is not a number from 0 up. */
export function parseCurveScores(text: string): number[] {
  return text
    .split(/[\s,;]+/)
    .filter((part) => part !== "")
    .map(Number)
    .filter((value) => Number.isFinite(value) && value >= 0);
}

function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/** Curve a list of percentage scores. Returns null when there is nothing valid to curve. */
export function curveScores(scores: number[], method: CurveMethod, options: CurveOptions = {}): CurveResult | null {
  if (scores.length === 0) return null;
  const top = Math.max(...scores);
  const rawAverage = mean(scores);
  let shift: number | null = null;
  let apply: (score: number) => number;

  if (method === "flat") {
    const points = options.points ?? 0;
    if (!Number.isFinite(points)) return null;
    shift = points;
    apply = (score) => score + points;
  } else if (method === "top-to-100") {
    shift = 100 - top;
    apply = (score) => score + (100 - top);
  } else if (method === "scale-to-top") {
    if (top <= 0) return null;
    apply = (score) => (score / top) * 100;
  } else if (method === "square-root") {
    apply = (score) => Math.sqrt(score) * 10;
  } else {
    const target = options.targetAverage;
    if (target === undefined || !Number.isFinite(target)) return null;
    shift = target - rawAverage;
    apply = (score) => score + (target - rawAverage);
  }

  const cap = options.cap ?? true;
  const curved = scores.map((score) => {
    const value = Math.max(0, apply(score));
    return cap ? Math.min(100, value) : value;
  });
  return { curved, rawAverage, curvedAverage: mean(curved), shift };
}
