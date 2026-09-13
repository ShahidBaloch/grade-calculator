import type { CalculatorResult } from "./types";
import { raiseGpaInputSchema, type RaiseGpaInput } from "./schemas/raise-gpa.schema";

export interface RaiseGpaResult {
  requiredGpa: number;
  status: "achievable" | "impossible" | "already_met";
  message: string;
  formulaSteps: string[];
}

export function calculateRaiseGpa(input: RaiseGpaInput): CalculatorResult<RaiseGpaResult> {
  const parsed = raiseGpaInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", errors: ["Invalid input"] };
  }

  const { currentGpa, currentCredits, targetGpa, futureCredits } = parsed.data;

  if (futureCredits <= 0) {
    return { status: "error", errors: ["Future credits must be greater than 0"] };
  }

  const totalCredits = currentCredits + futureCredits;
  const requiredGpa =
    (targetGpa * totalCredits - currentGpa * currentCredits) / futureCredits;

  const formulaSteps = [
    `Total credits = ${currentCredits} + ${futureCredits} = ${totalCredits}`,
    `Required GPA = (target × total − current × prior) ÷ future`,
    `Required GPA = (${targetGpa} × ${totalCredits} − ${currentGpa} × ${currentCredits}) ÷ ${futureCredits}`,
    `Required GPA = ${requiredGpa.toFixed(2)}`,
  ];

  if (requiredGpa > 4.0) {
    return {
      status: "valid",
      data: {
        requiredGpa,
        status: "impossible",
        message: `You would need a ${requiredGpa.toFixed(2)} GPA — above a perfect 4.0. Try a lower target or more credits.`,
        formulaSteps,
      },
    };
  }

  if (requiredGpa <= 0) {
    return {
      status: "valid",
      data: {
        requiredGpa: Math.max(0, requiredGpa),
        status: "already_met",
        message: "You've already reached your target GPA!",
        formulaSteps,
      },
    };
  }

  return {
    status: "valid",
    data: {
      requiredGpa,
      status: "achievable",
      message: `You need a ${requiredGpa.toFixed(2)} GPA over your next ${futureCredits} credit hours.`,
      formulaSteps,
    },
  };
}
