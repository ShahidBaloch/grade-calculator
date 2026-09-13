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

  it("rejects unknown slugs", () => {
    expect(parseRecentCalculator("not-a-tool")).toBeNull();
  });
});
