import z from "zod";

const createTutorialValidationSchema = z.object({
  body: z.object({ url: z.string(), title: z.string() }),
});
const updateTutorialValidationSchema = z.object({
  body: z.object({
    url: z.string().optional(),
    title: z.string().optional(),
  }),
});

export const TutorialValidationViaZod = {
  createTutorialValidationSchema,
  updateTutorialValidationSchema,
};
