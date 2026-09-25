import { z } from "zod";
import { gpaCourseSchema } from "./gpa.schema";

/** Max 10 covers India 10-point CGPA; US/PK 4.0 values stay well under this. */
export const cumulativeGpaInputSchema = z.object({
  previousGpa: z.number().min(0).max(10).optional(),
  previousCredits: z.number().min(0).optional(),
  courses: z.array(gpaCourseSchema).min(1),
});

export type CumulativeGpaInput = z.infer<typeof cumulativeGpaInputSchema>;
