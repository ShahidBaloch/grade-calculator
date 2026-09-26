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

/** Auto-detect grading scale from IP geo for primary English-speaking markets (not IN/PK). */
const AUTO_GEO_MARKETS: Partial<Record<string, CountryCode>> = {
  US: "US",
  CA: "CA",
  GB: "UK",
  UK: "UK",
  AU: "AU",
};

export function getAutoScaleIdFromGeoCountry(isoCountry: string | null | undefined): ScaleId | null {
  if (!isoCountry) return null;
  const market = AUTO_GEO_MARKETS[isoCountry.toUpperCase()];
  if (!market) return null;
  return countryDefaults[market];
}

export function getScaleIdFromGeoCountryOrDefault(
  isoCountry: string | null | undefined,
): ScaleId {
  return getScaleIdFromGeoCountry(isoCountry) ?? DEFAULT_SCALE_ID;
}
