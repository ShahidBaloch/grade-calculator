import { auSevenPointScale } from "./au-seven-point";
import { caStandardScale } from "./ca-standard";
import { nzNinePointScale } from "./nz-nine-point";
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
};

export const gradingScales: Record<ScaleId, GradingScale> = {
  "us-standard": usStandardScale,
  "us-lenient": usLenientScale,
  "uk-degree": ukDegreeScale,
  "uk-gcse": ukGcseScale,
  "ca-standard": caStandardScale,
  "au-seven-point": auSevenPointScale,
  "nz-nine-point": nzNinePointScale,
};

export function getScale(scaleId: ScaleId): GradingScale {
  return gradingScales[scaleId];
}

export function getScaleForCountry(country: CountryCode): GradingScale {
  return getScale(countryDefaults[country]);
}

export function percentToLetter(percent: number, scaleId: ScaleId = DEFAULT_SCALE_ID): ScaleLookupResult {
  const scale = getScale(scaleId);
  const clamped = Math.min(100, Math.max(0, percent));
  const band =
    scale.bands.find((b) => clamped >= b.min && clamped <= b.max) ??
    scale.bands[scale.bands.length - 1];

  return { letter: band.letter, gpa: band.gpa, band };
}

export function letterToPercent(letter: string, scaleId: ScaleId = DEFAULT_SCALE_ID): number | null {
  const scale = getScale(scaleId);
  const normalized = letter.trim().toUpperCase();
  const band = scale.bands.find((b) => b.letter.toUpperCase() === normalized);
  if (!band) return null;
  return (band.min + band.max) / 2;
}

export function getGradeBandClass(letter: string): "a" | "b" | "c" | "d" | "f" {
  const first = letter.trim().charAt(0).toUpperCase();
  if (first === "A") return "a";
  if (first === "B") return "b";
  if (first === "C") return "c";
  if (first === "D") return "d";
  return "f";
}

export function getBandRangeLabel(band: GradingScale["bands"][number]): string {
  return `${band.min}–${band.max}%`;
}
