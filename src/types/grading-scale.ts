export type CountryCode = "US" | "UK" | "CA" | "AU" | "NZ" | "IN" | "PK";

export type ScaleId =
  | "us-standard"
  | "us-lenient"
  | "uk-degree"
  | "uk-gcse"
  | "ca-standard"
  | "ca-four-three-three"
  | "au-seven-point"
  | "au-uq-seven-point"
  | "au-monash-four-point"
  | "nz-nine-point"
  | "in-ten-point"
  | "pk-hec";

export interface GradeBand {
  letter: string;
  min: number;
  max: number;
  gpa: number | null;
  /** Shown in the reference table when a scale publishes a range instead of one point. */
  gpaLabel?: string;
}

export type ScaleSource = string | { label: string; href: string };

export interface GradingScale {
  id: ScaleId;
  name: string;
  country: CountryCode;
  gpaMax?: number;
  passPercent: number;
  bands: GradeBand[];
  sources: ScaleSource[];
}

export interface ScaleLookupResult {
  letter: string;
  gpa: number | null;
  band: GradeBand;
}
