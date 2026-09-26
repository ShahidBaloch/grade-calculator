import { auMonashFourPointScale } from "./au-monash-four-point";
import { auSevenPointScale } from "./au-seven-point";
import { auUqSevenPointScale } from "./au-uq-seven-point";
import { caFourThreeThreeScale } from "./ca-four-three-three";
import { caStandardScale } from "./ca-standard";
import { inTenPointScale } from "./in-ten-point";
import { nzNinePointScale } from "./nz-nine-point";
import { pkHecScale } from "./pk-hec";
import { ukDegreeScale } from "./uk-degree";
import { ukGcseScale } from "./uk-gcse";
import { usLenientScale } from "./us-lenient";
import { usStandardScale } from "./us-standard";
import type { CountryCode, GradingScale, ScaleId, ScaleLookupResult } from "@/types/grading-scale";

export const DEFAULT_SCALE_ID: ScaleId = "us-standard";

export const countryDefaults: Record<CountryCode, ScaleId> = {
  US: "us-standard",
  UK: "uk-degree",
  CA: "ca-standard",
  AU: "au-seven-point",
  NZ: "nz-nine-point",
  IN: "in-ten-point",
  PK: "pk-hec",
};

export const gradingScales: Record<ScaleId, GradingScale> = {
  "us-standard": usStandardScale,
  "us-lenient": usLenientScale,
  "uk-degree": ukDegreeScale,
  "uk-gcse": ukGcseScale,
  "ca-standard": caStandardScale,
  "ca-four-three-three": caFourThreeThreeScale,
  "au-seven-point": auSevenPointScale,
  "au-uq-seven-point": auUqSevenPointScale,
  "au-monash-four-point": auMonashFourPointScale,
  "nz-nine-point": nzNinePointScale,
  "in-ten-point": inTenPointScale,
  "pk-hec": pkHecScale,
};

export function getScale(scaleId: ScaleId): GradingScale {
  return gradingScales[scaleId];
}

/** Highest GPA this scale can award (4.0, 7.0, 9.0, …). */
export function getScaleMaxGpa(scaleId: ScaleId): number {
  const scale = getScale(scaleId);
  if (typeof scale.gpaMax === "number") return scale.gpaMax;
  const values = scale.bands.map((band) => band.gpa).filter((n): n is number => n != null);
  return values.length ? Math.max(...values) : 4;
}

export function getScaleForCountry(country: CountryCode): GradingScale {
  return getScale(countryDefaults[country]);
}

export function percentToLetter(percent: number, scaleId: ScaleId = DEFAULT_SCALE_ID): ScaleLookupResult {
  const scale = getScale(scaleId);
  const clamped = Math.min(100, Math.max(0, percent));
  // Bands use integer cutoffs; treat each band as "this grade or higher until the next tier".
  // Avoids mis-mapping values in gaps (e.g. 89.2% between B+ 87–89 and A- 90–92 on US standard).
  const sortedByMin = [...scale.bands].sort((a, b) => b.min - a.min);
  const band = sortedByMin.find((b) => clamped >= b.min) ?? sortedByMin[sortedByMin.length - 1];

  return { letter: band.letter, gpa: band.gpa, band };
}

export function letterToPercent(letter: string, scaleId: ScaleId = DEFAULT_SCALE_ID): number | null {
  const scale = getScale(scaleId);
  const normalized = letter.trim().toUpperCase();
  if (!normalized) return null;

  const exact = scale.bands.find((b) => b.letter.toUpperCase() === normalized);
  if (exact) return (exact.min + exact.max) / 2;

  const bySubstring = scale.bands.find((b) => b.letter.toUpperCase().includes(normalized));
  if (bySubstring) return (bySubstring.min + bySubstring.max) / 2;

  return null;
}

export function getGradeBandClass(letter: string): "a" | "b" | "c" | "d" | "f" {
  const first = letter.trim().charAt(0).toUpperCase();
  if (first === "A" || first === "O" || first === "S" || first === "H") return "a";
  if (first === "B") return "b";
  if (first === "C" || first === "P") return "c";
  if (first === "D") return "d";
  return "f";
}

export function getBandRangeLabel(band: GradingScale["bands"][number]): string {
  return `${band.min}–${band.max}%`;
}
