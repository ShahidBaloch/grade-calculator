import { z } from "zod/mini";
import { gpaCourseSchema } from "./gpa.schema";

/** Max 10 covers India 10-point CGPA; US/PK 4.0 values stay well under this. */
export const cumulativeGpaInputSchema = z.object({
  previousGpa: z.optional(z.number().check(z.gte(0), z.lte(10))),
  previousCredits: z.optional(z.number().check(z.gte(0))),
  courses: z.array(gpaCourseSchema).check(z.minLength(1)),
});

export type CumulativeGpaInput = z.infer<typeof cumulativeGpaInputSchema>;
