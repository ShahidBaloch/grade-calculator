import { z } from "zod";

export const raiseGpaInputSchema = z.object({
  currentGpa: z.number().min(0).max(9),
  currentCredits: z.number().min(0).max(500),
  targetGpa: z.number().min(0).max(9),
  futureCredits: z.number().min(0.5).max(200),
  maxGpa: z.number().min(1).max(9).optional(),
});

export type RaiseGpaInput = z.infer<typeof raiseGpaInputSchema>;
