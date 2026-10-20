import { z } from "zod/mini";

export const canvasGroupSchema = z.object({
  name: z.string(),
  score: z.number().check(z.gte(0), z.lte(100)),
  weight: z.number().check(z.gte(0), z.lte(100)),
});

export const canvasGradeInputSchema = z.object({
  groups: z.array(canvasGroupSchema).check(z.minLength(1)),
});

export type CanvasGradeInput = z.infer<typeof canvasGradeInputSchema>;
