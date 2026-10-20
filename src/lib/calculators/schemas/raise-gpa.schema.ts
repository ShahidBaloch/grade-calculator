import { z } from "zod/mini";

export const raiseGpaInputSchema = z.object({
  currentGpa: z.number().check(z.gte(0), z.lte(9)),
  currentCredits: z.number().check(z.gte(0), z.lte(500)),
  targetGpa: z.number().check(z.gte(0), z.lte(9)),
  futureCredits: z.number().check(z.gte(0.5), z.lte(200)),
  maxGpa: z.optional(z.number().check(z.gte(1), z.lte(9))),
});

export type RaiseGpaInput = z.infer<typeof raiseGpaInputSchema>;
