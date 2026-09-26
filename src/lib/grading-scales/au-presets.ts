import type { ScaleId } from "@/types/grading-scale";

/** Selectable Australian institution / planning presets (not a national standard). */
export const AU_INSTITUTION_SCALE_IDS: ScaleId[] = [
  "au-uq-seven-point",
  "au-monash-four-point",
  "au-seven-point",
];

export function isAustralianScaleId(scaleId: ScaleId): boolean {
  return AU_INSTITUTION_SCALE_IDS.includes(scaleId);
}
