import { describe, expect, it } from "vitest";
import {
  getMarketFromGeoCountry,
  getScaleIdFromGeoCountry,
  getScaleIdFromGeoCountryOrDefault,
} from "@/lib/grading-scales/geo-scale";

describe("geo-scale", () => {
  it("maps US to us-standard", () => {
    expect(getScaleIdFromGeoCountry("US")).toBe("us-standard");
  });

  it("maps GB to uk-degree", () => {
    expect(getScaleIdFromGeoCountry("GB")).toBe("uk-degree");
    expect(getMarketFromGeoCountry("GB")).toBe("UK");
  });

  it("maps AU to au-seven-point", () => {
    expect(getScaleIdFromGeoCountry("AU")).toBe("au-seven-point");
  });

  it("returns null for unsupported countries", () => {
    expect(getScaleIdFromGeoCountry("DE")).toBeNull();
  });

  it("falls back to US default", () => {
    expect(getScaleIdFromGeoCountryOrDefault("FR")).toBe("us-standard");
  });
});
