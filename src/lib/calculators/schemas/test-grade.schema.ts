import { z } from "zod/mini";

export const testGradeInputSchema = z.object({
  inputMode: z.enum(["correct", "wrong"]),
  totalQuestions: z.int().check(z.gte(1), z.lte(999)),
  correctAnswers: z.optional(z.int().check(z.gte(0))),
  wrongAnswers: z.optional(z.int().check(z.gte(0))),
  bonusPoints: z._default(z.number().check(z.gte(0), z.lte(100)), 0),
});

export type TestGradeInput = z.infer<typeof testGradeInputSchema>;
