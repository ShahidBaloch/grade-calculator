export interface SgpaTermInput {
  label: string;
  sgpa: number;
  credits: number;
}

export interface SgpaToCgpaResult {
  cgpa: number;
  totalCredits: number;
  weightedPoints: number;
  termsUsed: number;
}

export function calculateSgpaToCgpa(terms: SgpaTermInput[]): {
  status: "valid" | "error";
  data?: SgpaToCgpaResult;
  errors?: string[];
} {
  const errors: string[] = [];
  const used = terms.filter((term) => term.credits > 0 || term.sgpa > 0);

  if (used.length === 0) {
    return { status: "error", errors: ["Add at least one semester with SGPA and credits"] };
  }

  let weightedPoints = 0;
  let totalCredits = 0;

  used.forEach((term, index) => {
    if (!Number.isFinite(term.sgpa) || term.sgpa < 0 || term.sgpa > 10) {
      errors.push(`Semester ${index + 1}: SGPA must be between 0 and 10`);
      return;
    }
    if (!Number.isFinite(term.credits) || term.credits <= 0) {
      errors.push(`Semester ${index + 1}: credits must be greater than 0`);
      return;
    }
    weightedPoints += term.sgpa * term.credits;
    totalCredits += term.credits;
  });

  if (errors.length > 0) {
    return { status: "error", errors };
  }

  if (totalCredits <= 0) {
    return { status: "error", errors: ["Total credits must be greater than 0"] };
  }

  return {
    status: "valid",
    data: {
      cgpa: weightedPoints / totalCredits,
      totalCredits,
      weightedPoints,
      termsUsed: used.length,
    },
  };
}
