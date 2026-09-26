import { describe, expect, it } from "vitest";
import { geoPageHint, pathForTool, quickToolsForCountry } from "@/lib/utils/geo-navigation";

describe("geo navigation", () => {
  it("keeps worldwide paths when location is unknown", () => {
    expect(pathForTool("gpa-calculator", null)).toBe("/gpa-calculator");
    expect(quickToolsForCountry(null).map((item) => item.href)).toEqual([
      "/weighted-grade-calculator",
      "/final-grade-calculator",
      "/gpa-calculator",
    ]);
  });

  it("sends UK visitors to degree class instead of US GPA", () => {
    expect(pathForTool("gpa-calculator", "GB")).toBe("/uk/degree-classification-calculator");
    expect(quickToolsForCountry("GB").some((item) => item.label === "Degree class")).toBe(true);
  });

  it("sends Australian visitors to AU GPA and ATAR", () => {
    expect(pathForTool("gpa-calculator", "AU")).toBe("/au/gpa-calculator");
    expect(quickToolsForCountry("AU").some((item) => item.href === "/au/atar-calculator")).toBe(true);
  });

  it("hints only on worldwide pages that mismatch the country", () => {
    expect(geoPageHint("/gpa-calculator", "GB")?.href).toBe("/uk/degree-classification-calculator");
    expect(geoPageHint("/au/gpa-calculator", "AU")).toBeNull();
    expect(geoPageHint("/", "AU")).toBeNull();
    expect(geoPageHint("/gpa-calculator", "US")).toBeNull();
  });
});
