import { z } from "zod/mini";

export const ezGraderInputSchema = z.object({
  totalQuestions: z.int().check(z.gte(1), z.lte(999)),
  wrongAnswers: z.int().check(z.gte(0)),
});

export type EzGraderInput = z.infer<typeof ezGraderInputSchema>;
