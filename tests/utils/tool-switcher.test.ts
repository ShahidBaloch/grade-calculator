import { describe, expect, it } from "vitest";
import { isQuickToolActive } from "@/lib/utils/tool-switcher";

describe("isQuickToolActive", () => {
  it("highlights EZ Grader on the homepage and geo alias", () => {
    expect(isQuickToolActive("/", "/")).toBe(true);
    expect(isQuickToolActive("/us/ez-grader", "/")).toBe(true);
    expect(isQuickToolActive("/gpa-calculator", "/")).toBe(false);
  });

  it("highlights GPA on worldwide and geo copies", () => {
    expect(isQuickToolActive("/gpa-calculator", "/gpa-calculator")).toBe(true);
    expect(isQuickToolActive("/us/gpa-calculator", "/gpa-calculator")).toBe(true);
    expect(isQuickToolActive("/weighted-gpa-calculator", "/gpa-calculator")).toBe(false);
  });

  it("only highlights All on the calculators hub", () => {
    expect(isQuickToolActive("/calculators", "/calculators")).toBe(true);
    expect(isQuickToolActive("/gpa-calculator", "/calculators")).toBe(false);
  });
});
