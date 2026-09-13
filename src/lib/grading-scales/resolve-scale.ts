import { countryDefaults, DEFAULT_SCALE_ID, gradingScales } from "./index";
import type { CountryCode, ScaleId } from "@/types/grading-scale";

/** Map URL prefixes to locked scale (geo landing pages). */
const PATH_SCALE_LOCKS: Array<{ prefix: string; scaleId: ScaleId }> = [
  { prefix: "/uk/gcse-grade-calculator", scaleId: "uk-gcse" },
  { prefix: "/grading-scales/gcse", scaleId: "uk-gcse" },
  { prefix: "/us", scaleId: "us-standard" },
  { prefix: "/uk", scaleId: "uk-degree" },
  { prefix: "/ca", scaleId: "ca-standard" },
  { prefix: "/au", scaleId: "au-seven-point" },
  { prefix: "/nz", scaleId: "nz-nine-point" },
  { prefix: "/grading-scales/uk", scaleId: "uk-degree" },
  { prefix: "/grading-scales/canada", scaleId: "ca-standard" },
  { prefix: "/grading-scales/australia", scaleId: "au-seven-point" },
  { prefix: "/grading-scales/new-zealand", scaleId: "nz-nine-point" },
];

const VALID_SCALE_IDS = new Set<string>(Object.keys(gradingScales));

export function isValidScaleId(value: string | null | undefined): value is ScaleId {
  return Boolean(value && VALID_SCALE_IDS.has(value));
}

export function getLockedScaleFromPath(pathname: string): ScaleId | null {
  const match = PATH_SCALE_LOCKS.find(({ prefix }) => pathname.startsWith(prefix));
  return match?.scaleId ?? null;
}

/** Soft hint from browser locale — fallback after geo cookie. */
export function getScaleHintFromLocale(): ScaleId | null {
  if (typeof navigator === "undefined") return null;

  const locale = navigator.language.toLowerCase();
  if (locale === "en-gb" || locale.endsWith("-gb")) return countryDefaults.UK;
  if (locale === "en-au" || locale.endsWith("-au")) return countryDefaults.AU;
  if (locale === "en-ca" || locale.endsWith("-ca")) return countryDefaults.CA;
  if (locale === "en-nz" || locale.endsWith("-nz")) return countryDefaults.NZ;

  return null;
}

export function resolveDefaultScaleId({
  pathname,
  userScaleId,
  geoScaleId,
  useLocaleHint = false,
}: {
  pathname: string;
  userScaleId: ScaleId | null;
  geoScaleId: ScaleId | null;
  useLocaleHint?: boolean;
}): ScaleId {
  const locked = getLockedScaleFromPath(pathname);
  if (locked) return locked;
  if (isValidScaleId(userScaleId)) return userScaleId;
  if (isValidScaleId(geoScaleId)) return geoScaleId;
  if (useLocaleHint) {
    const hinted = getScaleHintFromLocale();
    if (hinted) return hinted;
  }
  return DEFAULT_SCALE_ID;
}

export function countryCodeFromScaleId(scaleId: ScaleId): CountryCode {
  return (
    (Object.entries(countryDefaults).find(([, id]) => id === scaleId)?.[0] as CountryCode) ?? "US"
  );
}
