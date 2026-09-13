import { z } from "zod";

export const courseWeightTypeSchema = z.enum(["regular", "honors", "ap", "ib"]);

export const gpaCourseSchema = z.object({
  name: z.string().optional(),
  grade: z.union([z.number().min(0).max(100), z.string()]),
  credits: z.number().min(0).max(30),
  courseType: courseWeightTypeSchema.optional(),
});

export const gpaInputSchema = z.object({
  courses: z.array(gpaCourseSchema).min(1),
});

export const hsGpaInputSchema = z.object({
  periods: z
    .array(
      z.object({
        name: z.string(),
        courses: z.array(gpaCourseSchema).min(1),
      }),
    )
    .min(1),
});

export type GpaInput = z.infer<typeof gpaInputSchema>;
export type HsGpaInput = z.infer<typeof hsGpaInputSchema>;
export type CourseWeightType = z.infer<typeof courseWeightTypeSchema>;
