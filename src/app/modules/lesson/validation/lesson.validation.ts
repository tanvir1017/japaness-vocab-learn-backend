import { z } from "zod";

export const LessonSchema = z.object({});

export const createLessonValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    lessonNo: z.string().min(1, "Lesson number is required"),
  }),
});

export const updateLessonValidationSchema = z.object({
  body: z.object({
    title: z.string().min(5, "Title is required").optional(),
    lessonNo: z.string().min(1, "Lesson number is required").optional(),
  }),
});

export const LessonValidationViaZod = {
  createLessonValidationSchema,
  updateLessonValidationSchema,
};
