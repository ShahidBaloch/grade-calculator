import { describe, expect, it } from "vitest";
import { geoCalculatorHeading } from "@/lib/seo/geo-calculator-heading";

describe("geoCalculatorHeading", () => {
  it("avoids doubling the country when the tool name already includes it", () => {
    expect(
      geoCalculatorHeading("/in", "India", "India CGPA to US 4.0 GPA"),
    ).toBe("India CGPA to US 4.0 GPA");
    expect(
      geoCalculatorHeading("/uk", "United Kingdom", "UK Degree Classification Calculator"),
    ).toBe("UK Degree Classification Calculator");
  });

  it("prefixes generic tool names", () => {
    expect(geoCalculatorHeading("/ca", "Canada", "Final Grade Calculator")).toBe(
      "Canada Final Grade Calculator",
    );
    expect(geoCalculatorHeading("/au", "Australia", "US Letter Grade Calculator")).toBe(
      "Australia Letter Grade Calculator",
    );
  });
});
