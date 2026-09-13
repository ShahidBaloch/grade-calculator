import { describe, expect, it } from "vitest";
import {
  getLockedScaleFromPath,
  getScaleHintFromLocale,
  resolveDefaultScaleId,
} from "@/lib/grading-scales/resolve-scale";

describe("resolve-scale", () => {
  it("locks UK scale on /uk paths", () => {
    expect(getLockedScaleFromPath("/uk/degree-classification-calculator")).toBe("uk-degree");
  });

  it("returns null for root calculator paths", () => {
    expect(getLockedScaleFromPath("/gpa-calculator")).toBeNull();
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

  it("uses geo scale before locale hint", () => {
    expect(
      resolveDefaultScaleId({
        pathname: "/",
        userScaleId: null,
        geoScaleId: "uk-degree",
        useLocaleHint: true,
      }),
    ).toBe("uk-degree");
  });

  it("user preference overrides geo", () => {
    expect(
      resolveDefaultScaleId({
        pathname: "/",
        userScaleId: "us-lenient",
        geoScaleId: "uk-degree",
        useLocaleHint: false,
      }),
    ).toBe("us-lenient");
  });

  it("prefers locked path over geo and user preference", () => {
    expect(
      resolveDefaultScaleId({
        pathname: "/au/gpa-calculator",
        userScaleId: "us-standard",
        geoScaleId: "us-standard",
        useLocaleHint: false,
      }),
    ).toBe("au-seven-point");
  });

  it("returns null locale hint in node test env", () => {
    expect(getScaleHintFromLocale()).toBeNull();
  });
});
