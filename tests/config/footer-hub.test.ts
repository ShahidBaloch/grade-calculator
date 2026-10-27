import { describe, expect, it } from "vitest";
import { footerNavForPath } from "@/config/navigation";

describe("hub-aware footer", () => {
  it("shows US-only calculators on the US hub only", () => {
    const us = footerNavForPath("/gpa-calculator").calculators.map((l) => l.href);
    expect(us).toContain("/uc-gpa-calculator");
    expect(us).toContain("/csu-gpa-calculator");

    const uk = footerNavForPath("/uk/gcse-grade-calculator").calculators.map((l) => l.href);
    expect(uk).not.toContain("/uc-gpa-calculator");
    expect(uk).not.toContain("/csu-gpa-calculator");
    expect(uk.some((href) => href.startsWith("/uk/"))).toBe(true);

    const pk = footerNavForPath("/pk/cgpa-calculator").calculators.map((l) => l.href);
    expect(pk).not.toContain("/uc-gpa-calculator");
    expect(pk.some((href) => href.startsWith("/pk/"))).toBe(true);
  });
});
