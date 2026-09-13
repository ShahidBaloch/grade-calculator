import { z } from "zod";

export const testGradeInputSchema = z.object({
  inputMode: z.enum(["correct", "wrong"]),
  totalQuestions: z.number().int().min(1).max(999),
  correctAnswers: z.number().int().min(0).optional(),
  wrongAnswers: z.number().int().min(0).optional(),
  bonusPoints: z.number().min(0).max(100).default(0),
});

export type TestGradeInput = z.infer<typeof testGradeInputSchema>;
