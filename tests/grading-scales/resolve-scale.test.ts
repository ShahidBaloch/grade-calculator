import { describe, expect, it } from "vitest";
import {
  getLockedScaleFromPath,
  getScaleHintFromLocale,
  resolveDefaultScaleId,
} from "@/lib/grading-scales/resolve-scale";

describe("resolve-scale", () => {
  it("locks India and Pakistan hub paths", () => {
    expect(getLockedScaleFromPath("/in/cgpa-to-percentage")).toBe("in-ten-point");
    expect(getLockedScaleFromPath("/pk/gpa-calculator")).toBe("pk-hec");
    expect(getLockedScaleFromPath("/grading-scales/india")).toBe("in-ten-point");
    expect(getLockedScaleFromPath("/grading-scales/pakistan")).toBe("pk-hec");
  });

  it("locks UK scale on /uk paths", () => {
    expect(getLockedScaleFromPath("/uk/degree-classification-calculator")).toBe("uk-degree");
  });

  it("locks US and sibling grading-scale reference pages", () => {
    expect(getLockedScaleFromPath("/grading-scales/us")).toBe("us-standard");
    expect(getLockedScaleFromPath("/grading-scales/uk")).toBe("uk-degree");
    expect(getLockedScaleFromPath("/grading-scales/canada")).toBe("ca-standard");
  });

  it("locks US recording scales on core North American calculator paths", () => {
    expect(getLockedScaleFromPath("/")).toBe("us-standard");
    expect(getLockedScaleFromPath("/gpa-calculator")).toBe("us-standard");
    expect(getLockedScaleFromPath("/weighted-grade-calculator")).toBe("us-standard");
    expect(getLockedScaleFromPath("/college-gpa-calculator")).toBe("us-standard");
  });

  it("locks UK recording scales on degree and GCSE paths", () => {
    expect(getLockedScaleFromPath("/degree-classification-calculator")).toBe("uk-degree");
    expect(getLockedScaleFromPath("/gcse-grade-calculator")).toBe("uk-gcse");
  });

  it("does not lock South Asian or ATAR-only paths to US standard", () => {
    expect(getLockedScaleFromPath("/atar-calculator")).toBeNull();
    expect(getLockedScaleFromPath("/cgpa-calculator")).toBeNull();
  });

  it("locks US standard on the Canvas grade calculator", () => {
    expect(getLockedScaleFromPath("/canvas-grade-calculator")).toBe("us-standard");
  });

  it("locks Canadian and GCSE scales on their geo paths", () => {
    expect(getLockedScaleFromPath("/ca/gpa-calculator")).toBe("ca-standard");
    expect(getLockedScaleFromPath("/uk/gcse-grade-calculator")).toBe("uk-gcse");
    expect(getLockedScaleFromPath("/uk/gpa-calculator")).toBe("uk-degree");
  });

  it("defaults to US standard without geo or user preference", () => {
    expect(
      resolveDefaultScaleId({
        pathname: "/",
        userScaleId: null,
        geoScaleId: null,
        useLocaleHint: false,
      }),
    ).toBe("us-standard");
  });

  it("uses geo scale before locale hint on unlocked paths", () => {
    expect(
      resolveDefaultScaleId({
        pathname: "/cgpa-calculator",
        userScaleId: null,
        geoScaleId: "ca-standard",
        useLocaleHint: true,
      }),
    ).toBe("ca-standard");
  });

  it("user preference overrides geo on unlocked paths", () => {
    expect(
      resolveDefaultScaleId({
        pathname: "/cgpa-calculator",
        userScaleId: "us-lenient",
        geoScaleId: "ca-standard",
        useLocaleHint: false,
      }),
    ).toBe("us-lenient");
  });

  it("defaults Australian hub paths to the generic example without hard-locking scale selection", () => {
    expect(getLockedScaleFromPath("/au/gpa-calculator")).toBeNull();
    expect(
      resolveDefaultScaleId({
        pathname: "/au/gpa-calculator",
        userScaleId: null,
        geoScaleId: null,
        useLocaleHint: false,
      }),
    ).toBe("au-seven-point");
  });

  it("locks institution-specific Australian grading scale reference pages", () => {
    expect(getLockedScaleFromPath("/grading-scales/australia-uq")).toBe("au-uq-seven-point");
    expect(getLockedScaleFromPath("/grading-scales/australia-monash")).toBe("au-monash-four-point");
  });

  it("hints primary market scales from browser locale when available", () => {
    const hint = getScaleHintFromLocale();
    expect(
      hint === null ||
        hint === "us-standard" ||
        hint === "ca-standard" ||
        hint === "uk-degree" ||
        hint === "au-seven-point",
    ).toBe(true);
  });
});
