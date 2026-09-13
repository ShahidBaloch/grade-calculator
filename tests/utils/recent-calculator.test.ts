import { describe, expect, it } from "vitest";
import { parseRecentCalculator, serializeRecentCalculator } from "@/lib/utils/recent-calculator";

describe("recent calculator storage", () => {
  it("reads a legacy slug string as the worldwide path", () => {
    expect(parseRecentCalculator("gcse-grade-calculator")).toEqual({
      slug: "gcse-grade-calculator",
      path: "/gcse-grade-calculator",
    });
  });

  it("reads a geo path payload", () => {
    const stored = serializeRecentCalculator({
      slug: "gcse-grade-calculator",
      path: "/uk/gcse-grade-calculator",
    });
    expect(parseRecentCalculator(stored)).toEqual({
      slug: "gcse-grade-calculator",
      path: "/uk/gcse-grade-calculator",
    });
  });

  it("maps a legacy EZ Grader slug to the homepage", () => {
    expect(parseRecentCalculator("ez-grader")).toEqual({
      slug: "ez-grader",
      path: "/",
    });
  });

  it("normalizes a stored /ez-grader path", () => {
    expect(parseRecentCalculator(serializeRecentCalculator({ slug: "ez-grader", path: "/ez-grader" }))).toEqual({
      slug: "ez-grader",
      path: "/",
    });
  });

  it("rejects unknown slugs", () => {
    expect(parseRecentCalculator("not-a-tool")).toBeNull();
  });
});
