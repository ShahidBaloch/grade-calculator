export type CountryCode = "US" | "UK" | "CA" | "AU" | "NZ" | "IN" | "PK";

export type ScaleId =
  | "us-standard"
  | "us-lenient"
  | "uk-degree"
  | "uk-gcse"
  | "ca-standard"
  | "ca-four-three-three"
  | "au-seven-point"
  | "nz-nine-point"
  | "in-ten-point"
  | "pk-hec";

export interface GradeBand {
  letter: string;
  min: number;
  max: number;
  gpa: number | null;
}

export interface GradingScale {
  id: ScaleId;
  name: string;
  country: CountryCode;
  gpaMax?: number;
  passPercent: number;
  bands: GradeBand[];
  sources: string[];
}

export interface ScaleLookupResult {
  letter: string;
  gpa: number | null;
  band: GradeBand;
}
