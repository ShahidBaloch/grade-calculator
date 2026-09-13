export type CountryCode = "US" | "UK" | "CA" | "AU" | "NZ";

export type ScaleId =
  | "us-standard"
  | "us-lenient"
  | "uk-degree"
  | "uk-gcse"
  | "ca-standard"
  | "au-seven-point"
  | "nz-nine-point";

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
