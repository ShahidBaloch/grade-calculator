import { describe, expect, it } from "vitest";
import { mainNav } from "@/config/navigation";
import {
  calculatorNavTriggerLabel,
  isCountryLinkActive,
  isNavItemActive,
  isNavLinkCurrent,
  navChildrenFor,
} from "@/lib/utils/country-nav";

describe("isCountryLinkActive", () => {
  it("matches the hub and nested country routes", () => {
    expect(isCountryLinkActive("/us", "/us")).toBe(true);
    expect(isCountryLinkActive("/us", "/us/gpa-calculator")).toBe(true);
    expect(isCountryLinkActive("/uk", "/uk/degree-classification-calculator")).toBe(true);
    expect(isCountryLinkActive("/us", "/grading-scales/us")).toBe(true);
    expect(isCountryLinkActive("/au", "/grading-scales/australia-uq")).toBe(true);
  });

  it("treats worldwide pages as the US hub and leaves other countries unselected", () => {
    expect(isCountryLinkActive("/us", "/")).toBe(true);
    expect(isCountryLinkActive("/us", "/gpa-calculator")).toBe(true);
    expect(isCountryLinkActive("/us", "/grading-scales")).toBe(true);
    expect(isCountryLinkActive("/ca", "/us")).toBe(false);
    expect(isCountryLinkActive("/ca", "/gpa-calculator")).toBe(false);
    expect(isCountryLinkActive("/us", "/pk")).toBe(false);
    expect(isCountryLinkActive("/ca", "/grading-scales/us")).toBe(false);
    expect(isCountryLinkActive("/us", null)).toBe(false);
  });
});

describe("navChildrenFor", () => {
  const calculatorsNav = mainNav.find((item) => item.href === "/calculators")!;

  it("uses the hub-specific selectable catalog, not the worldwide list", () => {
    const pk = navChildrenFor(calculatorsNav, "/pk/cgpa-calculator")!;
    expect(pk.length).toBeLessThan(calculatorsNav.children!.length);
    expect(pk.at(-2)).toEqual({ label: "All Pakistan tools", href: "/pk" });
    expect(pk.at(-1)?.href).toBe("/calculators");
  });

  it("keeps the full calculator list on worldwide pages", () => {
    expect(navChildrenFor(calculatorsNav, "/")).toBe(calculatorsNav.children);
    expect(navChildrenFor(calculatorsNav, "/guides")).toBe(calculatorsNav.children);
  });
});

describe("current page and section", () => {
  const calculatorsNav = mainNav.find((item) => item.href === "/calculators")!;
  const guidesNav = mainNav.find((item) => item.href === "/guides")!;

  it("marks the calculator being viewed, including its country copy", () => {
    expect(isNavLinkCurrent("/gpa-calculator", "/gpa-calculator")).toBe(true);
    expect(isNavLinkCurrent("/cgpa-calculator", "/pk/cgpa-calculator")).toBe(true);
    expect(isNavLinkCurrent("/gpa-calculator", "/pk/cgpa-calculator")).toBe(false);
    expect(isNavLinkCurrent("/pk", "/pk")).toBe(true);
    expect(isNavLinkCurrent("/degree-classification-calculator", "/uk/degree-classification-calculator")).toBe(
      true,
    );
    expect(isNavLinkCurrent("/gpa-calculator", "/uk/degree-classification-calculator")).toBe(false);
    expect(isNavLinkCurrent("/high-school-gpa-calculator", "/ca/gpa-calculator")).toBe(false);
    expect(isNavLinkCurrent("/gpa-calculator", "/ca/gpa-calculator")).toBe(true);
  });

  it("highlights the section the visitor is in", () => {
    expect(isNavItemActive(calculatorsNav, "/pk/cgpa-calculator")).toBe(true);
    expect(isNavItemActive(calculatorsNav, "/calculators")).toBe(true);
    expect(isNavItemActive(calculatorsNav, "/pk")).toBe(false);
    expect(isNavItemActive(calculatorsNav, "/us")).toBe(false);
    expect(isNavItemActive(calculatorsNav, "/guides")).toBe(false);
    expect(isNavItemActive(guidesNav, "/guides/how-to-calculate-gpa")).toBe(true);
  });

  it("names the open calculator in the Calculators nav trigger", () => {
    expect(calculatorNavTriggerLabel(calculatorsNav, "/final-grade-calculator")).toBe("Final Grade Calculator");
    expect(calculatorNavTriggerLabel(calculatorsNav, "/nz/final-grade-calculator")).toBe("Final Grade Calculator");
    expect(calculatorNavTriggerLabel(calculatorsNav, "/calculators")).toBe("Calculators");
    expect(calculatorNavTriggerLabel(calculatorsNav, "/uk")).toBe("Calculators");
    expect(calculatorNavTriggerLabel(calculatorsNav, "/uk/degree-classification-calculator")).toBe(
      "UK Degree Classification Calculator",
    );
  });

  it("highlights Countries on hub routes and leaves worldwide calculator pages on Calculators only", () => {
    const countriesNav = mainNav.find((item) => item.variant === "countries")!;
    expect(isNavItemActive(countriesNav, "/ca/college-gpa-calculator")).toBe(true);
    expect(isNavItemActive(countriesNav, "/ca")).toBe(true);
    expect(isNavItemActive(countriesNav, "/gpa-calculator")).toBe(false);
    expect(isNavItemActive(calculatorsNav, "/ca/college-gpa-calculator")).toBe(true);
  });
});
