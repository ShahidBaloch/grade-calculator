import { z } from "zod";

export const finalGradeInputSchema = z.object({
  currentGrade: z.number().min(0).max(100),
  desiredGrade: z.number().min(0).max(100),
  finalWeight: z.number().min(0).max(100),
});

export type FinalGradeInput = z.infer<typeof finalGradeInputSchema>;
