import { describe, expect, it, vi } from "vitest";
import type { ScaleId } from "@/types/grading-scale";

// Fake scales keyed by band count, to exercise fallbacks no real scale reaches.
const fakeBands: Record<string, { letter: string }[]> = {
  "empty": [],
  "one-band": [{ letter: "P" }],
  "two-band": [{ letter: "P" }, { letter: "F" }],
};

vi.mock("@/lib/grading-scales", () => ({
  getScale: (scaleId: string) => ({ bands: fakeBands[scaleId] ?? [] }),
}));

const {
  defaultCoursesForScale,
  defaultGradeForScale,
  defaultLetterForScale,
  gradePlaceholderForScale,
  letterPlaceholderForScale,
  semesterResultLabel,
} = await import("@/lib/calculators/gpa-defaults");

const scale = (id: string) => id as ScaleId;

describe("gpa-defaults fallbacks for small scales", () => {
  it("falls back to B when a scale has no bands", () => {
    expect(defaultGradeForScale(scale("empty"))).toBe("B");
    expect(defaultLetterForScale(scale("empty"))).toBe("B");
    expect(defaultCoursesForScale(scale("empty"))).toEqual([]);
  });

  it("uses generic placeholders when a scale has no bands", () => {
    expect(gradePlaceholderForScale(scale("empty"))).toBe("Grade");
    expect(letterPlaceholderForScale(scale("empty"))).toBe("Enter grade on this scale");
  });

  it("reuses the only band on a one-band scale", () => {
    expect(defaultGradeForScale(scale("one-band"))).toBe("P");
    const courses = defaultCoursesForScale(scale("one-band"));
    expect(courses.map((c) => c.grade)).toEqual(["P", "P", "P"]);
    expect(courses.map((c) => c.name)).toEqual(["English", "Mathematics", "History"]);
  });

  it("clamps picks to the last band on a two-band scale", () => {
    expect(defaultGradeForScale(scale("two-band"))).toBe("F");
    expect(defaultCoursesForScale(scale("two-band")).map((c) => c.grade)).toEqual(["P", "F", "F"]);
    expect(gradePlaceholderForScale(scale("two-band"))).toBe("Grade (P, F)");
    expect(letterPlaceholderForScale(scale("two-band"))).toBe("e.g. P, F");
  });

  it("labels semester results by scale", () => {
    expect(semesterResultLabel("in-ten-point")).toBe("Semester SGPA");
    expect(semesterResultLabel("pk-hec")).toBe("Semester GPA");
    expect(semesterResultLabel("pk-hec", "sgpa")).toBe("Semester SGPA");
    expect(semesterResultLabel(scale("two-band"))).toBe("Semester GPA");
  });

  it("gives India 10-point courses 4/4/3 credits", () => {
    fakeBands["in-ten-point"] = [{ letter: "O" }, { letter: "A+" }, { letter: "A" }];
    expect(defaultCoursesForScale("in-ten-point").map((c) => c.credits)).toEqual([4, 4, 3]);
  });
});
