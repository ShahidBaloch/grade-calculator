import { z } from "zod/mini";

export const courseWeightTypeSchema = z.enum(["regular", "honors", "ap", "ib"]);

export const gpaCourseSchema = z.object({
  name: z.optional(z.string()),
  grade: z.union([z.number().check(z.gte(0), z.lte(100)), z.string()]),
  credits: z.number().check(z.gte(0), z.lte(30)),
  courseType: z.optional(courseWeightTypeSchema),
});

export const gpaInputSchema = z.object({
  courses: z.array(gpaCourseSchema).check(z.minLength(1)),
});

export const hsGpaInputSchema = z.object({
  periods: z
    .array(
      z.object({
        name: z.string(),
        courses: z.array(gpaCourseSchema).check(z.minLength(1)),
      }),
    )
    .check(z.minLength(1)),
});

export type GpaInput = z.infer<typeof gpaInputSchema>;
export type HsGpaInput = z.infer<typeof hsGpaInputSchema>;
export type CourseWeightType = z.infer<typeof courseWeightTypeSchema>;
