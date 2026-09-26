import { pkHecScale } from "@/lib/grading-scales/pk-hec";
import type { GradeBand } from "@/types/grading-scale";

const F_BAND = pkHecScale.bands[pkHecScale.bands.length - 1];

export function parseHecGpaRange(band: GradeBand): { min: number; max: number } {
  const label = band.gpaLabel;
  if (label) {
    const range = label.match(/^([\d.]+)\s*[–-]\s*([\d.]+)$/);
    if (range) {
      return { min: parseFloat(range[1]), max: parseFloat(range[2]) };
    }
    const single = parseFloat(label);
    if (!Number.isNaN(single)) {
      return { min: single, max: single };
    }
  }
  const g = band.gpa ?? 0;
  return { min: g, max: g };
}

const bandsByGpaMaxDesc = [...pkHecScale.bands].sort(
  (a, b) => parseHecGpaRange(b).max - parseHecGpaRange(a).max,
);

/** HEC §13.1: CGPA falls in a published grade-point band. */
export function findHecBandByCgpa(cgpa: number): GradeBand {
  if (!Number.isFinite(cgpa) || cgpa < 0) {
    return F_BAND;
  }
  for (const band of bandsByGpaMaxDesc) {
    const { min, max } = parseHecGpaRange(band);
    if (cgpa + 1e-9 >= min && cgpa <= max + 1e-9) {
      return band;
    }
  }
  return F_BAND;
}

export function findHecBandByPercent(percent: number): GradeBand {
  if (!Number.isFinite(percent)) {
    return F_BAND;
  }
  for (const band of pkHecScale.bands) {
    if (percent >= band.min && percent <= band.max) {
      return band;
    }
  }
  if (percent < 0) {
    return F_BAND;
  }
  return pkHecScale.bands[0];
}

/** Minimum percentage of the band that contains this CGPA (HEC §13.1). */
export function hecCgpaToBandMinimumPercent(cgpa: number): number {
  return findHecBandByCgpa(cgpa).min;
}

/**
 * Planning inverse: top of the HEC grade-point range for the percentage band.
 * HEC only defines CGPA → band minimum %; this is not an official reverse rule.
 */
export function hecPercentToPlanningCgpa(percent: number): number {
  const band = findHecBandByPercent(percent);
  return parseHecGpaRange(band).max;
}
