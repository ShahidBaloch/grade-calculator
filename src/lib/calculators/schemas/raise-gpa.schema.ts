import { z } from "zod";

export const raiseGpaInputSchema = z.object({
  currentGpa: z.number().min(0).max(5),
  currentCredits: z.number().min(0).max(500),
  targetGpa: z.number().min(0).max(5),
  futureCredits: z.number().min(0.5).max(200),
});

export type RaiseGpaInput = z.infer<typeof raiseGpaInputSchema>;
