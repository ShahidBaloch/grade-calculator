import { z } from "zod/mini";

export const finalGradeInputSchema = z.object({
  currentGrade: z.number().check(z.gte(0), z.lte(100)),
  desiredGrade: z.number().check(z.gte(0), z.lte(100)),
  finalWeight: z.number().check(z.gte(0), z.lte(100)),
});

export type FinalGradeInput = z.infer<typeof finalGradeInputSchema>;
