import { z } from "zod/mini";

export const weightedGradeItemSchema = z.object({
  name: z.optional(z.string()),
  score: z.union([z.number(), z.string()]),
  maxPoints: z.optional(z.number().check(z.gte(0))),
  weight: z.number().check(z.gte(0)),
});

export const weightedGradeInputSchema = z.object({
  globalMode: z.enum(["percentage", "letter", "points"]),
  weightMode: z.enum(["percent", "points"]),
  items: z.array(weightedGradeItemSchema).check(z.minLength(1)),
});

export type WeightedGradeInput = z.infer<typeof weightedGradeInputSchema>;
