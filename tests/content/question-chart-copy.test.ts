import { describe, expect, it } from "vitest";
import { questionCharts } from "@/config/question-charts";
import { calculateGradeChart } from "@/lib/calculators/grade-chart";
import { questionChartScenario } from "@/lib/content/question-chart-copy";

function scenario(total: number) {
  const { rows, bands } = calculateGradeChart(total, "us-standard").data!;
  return questionChartScenario(total, rows, bands, "us-standard");
}

describe("questionChartScenario", () => {
  it("is unique for every chart length", () => {
    const texts = questionCharts.map((chart) => scenario(chart.total));
    if (process.env.PRINT_SCENARIOS) texts.forEach((t) => console.log(t + "\n"));
    expect(new Set(texts).size).toBe(texts.length);
  });

  it("uses the chart's real cutoffs", () => {
    expect(scenario(10)).toContain("no score out of 10 lands on A, B+, B, C+, C, D+, or D");
    expect(scenario(10)).toContain("9 out of 10 is 90% (A-), but 9.5 is 95% (A)");
    expect(scenario(100)).toContain("you can miss 10 and still have an A");
    expect(scenario(100)).toContain("a B of any kind takes 80–89 correct (11–20 wrong)");
  });
});
