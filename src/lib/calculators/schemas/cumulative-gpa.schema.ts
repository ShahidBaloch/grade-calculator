import { z } from "zod";
import { gpaCourseSchema } from "./gpa.schema";

export const cumulativeGpaInputSchema = z.object({
  previousGpa: z.number().min(0).max(5).optional(),
  previousCredits: z.number().min(0).optional(),
  courses: z.array(gpaCourseSchema).min(1),
});

export type CumulativeGpaInput = z.infer<typeof cumulativeGpaInputSchema>;
