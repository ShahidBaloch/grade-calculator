import type { CountryCode, ScaleId } from "@/types/grading-scale";

export interface CountryConfig {
  code: CountryCode;
  name: string;
  flag: string;
  defaultScaleId: ScaleId;
  hubPath: string;
}

export const countries: CountryConfig[] = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    defaultScaleId: "us-standard",
    hubPath: "/us",
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    defaultScaleId: "ca-standard",
    hubPath: "/ca",
  },
  {
    code: "UK",
    name: "United Kingdom",
    flag: "🇬🇧",
    defaultScaleId: "uk-degree",
    hubPath: "/uk",
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    defaultScaleId: "au-seven-point",
    hubPath: "/au",
  },
  {
    code: "NZ",
    name: "New Zealand",
    flag: "🇳🇿",
    defaultScaleId: "nz-nine-point",
    hubPath: "/nz",
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    defaultScaleId: "in-ten-point",
    hubPath: "/in",
  },
  {
    code: "PK",
    name: "Pakistan",
    flag: "🇵🇰",
    defaultScaleId: "pk-hec",
    hubPath: "/pk",
  },
];

export const countryByCode = Object.fromEntries(
  countries.map((c) => [c.code, c]),
) as Record<CountryCode, CountryConfig>;
