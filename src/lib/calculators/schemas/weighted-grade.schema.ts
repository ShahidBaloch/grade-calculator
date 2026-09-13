import { z } from "zod";

export const weightedGradeItemSchema = z.object({
  name: z.string().optional(),
  score: z.union([z.number(), z.string()]),
  maxPoints: z.number().min(0).optional(),
  weight: z.number().min(0),
});

export const weightedGradeInputSchema = z.object({
  globalMode: z.enum(["percentage", "letter", "points"]),
  weightMode: z.enum(["percent", "points"]),
  items: z.array(weightedGradeItemSchema).min(1),
});

export type WeightedGradeInput = z.infer<typeof weightedGradeInputSchema>;
