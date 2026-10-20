import { z } from "zod";

export const averageGradeItemSchema = z.object({
  name: z.string().optional(),
  score: z.union([z.number(), z.string()]),
  maxPoints: z.number().min(0).optional(),
});

export const averageGradeInputSchema = z.object({
  scoreMode: z.enum(["percentage", "letter", "points"]),
  items: z.array(averageGradeItemSchema).min(1),
});

export type AverageGradeInput = z.infer<typeof averageGradeInputSchema>;
