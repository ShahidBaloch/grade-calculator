import { describe, expect, it } from "vitest";
import { mainNav } from "@/config/navigation";
import {
  countryCalculatorNavLinks,
  selectableCalculatorSlugsForHub,
} from "@/lib/utils/hub-calculator-nav";
import { navChildrenFor } from "@/lib/utils/country-nav";

describe("hub calculator nav catalog", () => {
  it("lists only tools with a dedicated hub URL", () => {
    const uk = selectableCalculatorSlugsForHub("/uk");
    expect(uk).toContain("degree-classification-calculator");
    expect(uk).toContain("gcse-grade-calculator");
    expect(uk).not.toContain("gpa-calculator");
    expect(uk).not.toContain("raise-gpa-calculator");
    expect(uk).not.toContain("cgpa-to-gpa");

    const ca = selectableCalculatorSlugsForHub("/ca");
    expect(ca).toContain("gpa-calculator");
    expect(ca).not.toContain("high-school-gpa-calculator");

    const pk = selectableCalculatorSlugsForHub("/pk");
    expect(pk).toContain("cgpa-calculator");
    expect(pk).not.toContain("eoc-grade-calculator");
  });

  it("keeps the same menu while switching tools within a hub", () => {
    const calculatorsNav = mainNav.find((item) => item.href === "/calculators")!;
    const a = navChildrenFor(calculatorsNav, "/uk/degree-classification-calculator")!;
    const b = navChildrenFor(calculatorsNav, "/uk/gcse-grade-calculator")!;
    expect(a).toEqual(b);
    expect(a.length).toBe(countryCalculatorNavLinks("/uk").length);
  });
});
