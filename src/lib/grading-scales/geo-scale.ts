import { countryDefaults, DEFAULT_SCALE_ID } from "./index";
import type { CountryCode, ScaleId } from "@/types/grading-scale";

/** ISO 3166-1 alpha-2 codes from Vercel/Cloudflare geo headers. */
const GEO_COUNTRY_TO_MARKET: Record<string, CountryCode> = {
  US: "US",
  GB: "UK",
  UK: "UK",
  CA: "CA",
  AU: "AU",
  NZ: "NZ",
  IN: "IN",
  PK: "PK",
};

export function getMarketFromGeoCountry(isoCountry: string | null | undefined): CountryCode | null {
  if (!isoCountry) return null;
  return GEO_COUNTRY_TO_MARKET[isoCountry.toUpperCase()] ?? null;
}

export function getScaleIdFromGeoCountry(isoCountry: string | null | undefined): ScaleId | null {
  const market = getMarketFromGeoCountry(isoCountry);
  if (!market) return null;
  return countryDefaults[market];
}

export function getScaleIdFromGeoCountryOrDefault(
  isoCountry: string | null | undefined,
): ScaleId {
  return getScaleIdFromGeoCountry(isoCountry) ?? DEFAULT_SCALE_ID;
}
