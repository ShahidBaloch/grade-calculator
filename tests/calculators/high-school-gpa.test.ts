import { describe, expect, it } from "vitest";
import { calculateHighSchoolGpa } from "@/lib/calculators/high-school-gpa";

describe("calculateHighSchoolGpa", () => {
  it("calculates overall and per-period GPA", () => {
    const result = calculateHighSchoolGpa({
      periods: [
        {
          name: "Fall",
          courses: [{ grade: "A", credits: 1 }, { grade: "B", credits: 1 }],
        },
        {
          name: "Spring",
          courses: [{ grade: "A", credits: 1 }],
        },
      ],
    });
    expect(result.status).toBe("valid");
    expect(result.data?.periods).toHaveLength(2);
    expect(result.data?.gpa).toBeGreaterThan(0);
  });

  it("rejects invalid input", () => {
    const result = calculateHighSchoolGpa({ periods: [] });
    expect(result.status).toBe("error");
  });

  it("applies Honors and AP bonuses only when weighted is on", () => {
    const input = {
      periods: [
        {
          name: "Fall",
          courses: [
            { grade: "A", credits: 1, courseType: "regular" as const },
            { grade: "A", credits: 1, courseType: "ap" as const },
          ],
        },
      ],
    };

    const unweighted = calculateHighSchoolGpa(input, "us-standard", { useWeightedScale: false });
    const weighted = calculateHighSchoolGpa(input, "us-standard", { useWeightedScale: true });

    expect(unweighted.data?.gpa).toBe(4);
    expect(weighted.data?.gpa).toBe(4.5);
  });
});
