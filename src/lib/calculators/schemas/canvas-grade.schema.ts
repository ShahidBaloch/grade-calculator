import { z } from "zod";

export const canvasGroupSchema = z.object({
  name: z.string(),
  score: z.number().min(0).max(100),
  weight: z.number().min(0).max(100),
});

export const canvasGradeInputSchema = z.object({
  groups: z.array(canvasGroupSchema).min(1),
});

export type CanvasGradeInput = z.infer<typeof canvasGradeInputSchema>;
