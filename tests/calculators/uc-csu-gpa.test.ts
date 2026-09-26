import { describe, expect, it } from "vitest";
import { calculateUcCsuGpa } from "@/lib/calculators/uc-csu-gpa";

describe("calculateUcCsuGpa", () => {
  it("ignores plus and minus and adds one point for UC honors", () => {
    const result = calculateUcCsuGpa({
      system: "uc",
      residency: "resident",
      courses: [
        { grade: "A", year: "10", kind: "regular" },
        { grade: "A", year: "10", kind: "honors" },
        { grade: "B+", year: "11", kind: "ap-ib" },
        { grade: "B", year: "11", kind: "regular" },
      ],
    });

    expect(result.status).toBe("valid");
    expect(result.data?.gradePoints).toBe(14);
    expect(result.data?.honorsPoints).toBe(2);
    expect(result.data?.gpa).toBe(4);
    expect(result.data?.unweightedGpa).toBe(3.5);
  });

  it("caps UC honors at 4 from 10th grade and 8 total", () => {
    const courses = [
      ...Array.from({ length: 6 }, () => ({ grade: "A", year: "10" as const, kind: "honors" as const })),
      ...Array.from({ length: 4 }, () => ({ grade: "A", year: "11" as const, kind: "ap-ib" as const })),
    ];
    const result = calculateUcCsuGpa({ system: "uc", courses });
    expect(result.data?.honorsPoints).toBe(8);
    expect(result.data?.gpa).toBe(4.8);
    expect(result.status).toBe("warning");
  });

  it("caps CSU 10th-grade honors at 2 and includes 12th grade", () => {
    const result = calculateUcCsuGpa({
      system: "csu",
      courses: [
        { grade: "A", year: "10", kind: "honors" },
        { grade: "A", year: "10", kind: "honors" },
        { grade: "A", year: "10", kind: "honors" },
        { grade: "A", year: "12", kind: "ap-ib" },
      ],
    });
    expect(result.data?.courseCount).toBe(4);
    expect(result.data?.honorsPoints).toBe(3);
    expect(result.data?.gpa).toBe(4.75);
  });

  it("leaves 12th grade out of the UC GPA", () => {
    const result = calculateUcCsuGpa({
      system: "uc",
      courses: [
        { grade: "A", year: "11", kind: "regular" },
        { grade: "A", year: "12", kind: "ap-ib" },
      ],
    });
    expect(result.data?.courseCount).toBe(1);
    expect(result.data?.honorsPoints).toBe(0);
    expect(result.warnings?.some((warning) => warning.includes("12th-grade"))).toBe(true);
  });

  it("does not give a UC extra point for C-", () => {
    const result = calculateUcCsuGpa({
      system: "uc",
      courses: [{ grade: "C-", year: "11", kind: "honors" }],
    });
    expect(result.data?.gradePoints).toBe(2);
    expect(result.data?.honorsPoints).toBe(0);
    expect(result.data?.gpa).toBe(2);
  });

  it("gives a CSU extra point for C-", () => {
    const result = calculateUcCsuGpa({
      system: "csu",
      courses: [{ grade: "C-", year: "11", kind: "honors" }],
    });
    expect(result.data?.honorsPoints).toBe(1);
    expect(result.data?.gpa).toBe(3);
  });

  it("withholds school-honors points for nonresident UC", () => {
    const result = calculateUcCsuGpa({
      system: "uc",
      residency: "nonresident",
      courses: [
        { grade: "A", year: "11", kind: "honors" },
        { grade: "A", year: "11", kind: "ap-ib" },
      ],
    });
    expect(result.data?.honorsPoints).toBe(1);
    expect(result.data?.gpa).toBe(4.5);
  });

  it("stays idle until a grade is entered", () => {
    const result = calculateUcCsuGpa({
      system: "uc",
      courses: [{ grade: "", year: "10", kind: "regular" }],
    });
    expect(result.status).toBe("idle");
  });
});
