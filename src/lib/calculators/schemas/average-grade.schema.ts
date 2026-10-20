import { z } from "zod/mini";

export const averageGradeItemSchema = z.object({
  name: z.optional(z.string()),
  score: z.union([z.number(), z.string()]),
  maxPoints: z.optional(z.number().check(z.gte(0))),
});

export const averageGradeInputSchema = z.object({
  scoreMode: z.enum(["percentage", "letter", "points"]),
  items: z.array(averageGradeItemSchema).check(z.minLength(1)),
});

export type AverageGradeInput = z.infer<typeof averageGradeInputSchema>;
