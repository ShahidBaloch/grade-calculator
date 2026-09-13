import { z } from "zod";

export const ezGraderInputSchema = z.object({
  totalQuestions: z.number().int().min(1).max(999),
  wrongAnswers: z.number().int().min(0),
});

export type EzGraderInput = z.infer<typeof ezGraderInputSchema>;
