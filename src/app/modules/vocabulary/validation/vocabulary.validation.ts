import z from "zod";

const createVocabularyValidationSchema = z.object({
  body: z.object({
    word: z.string().min(1, "Word is required"),
    pronunciation: z.string().min(1, "Pronunciation is required"),
    meaning: z.string().min(1, "Meaning is required"),
    whenToSay: z.string().min(1, "When to say is required"),
    lesson: z.string(),
  }),
});

const updateVocabularyValidationSchema = z.object({
  body: z.object({
    word: z.string().min(1, "Word is required").optional(),
    pronunciation: z.string().min(1, "Pronunciation is required").optional(),
    meaning: z.string().min(1, "Meaning is required").optional(),
    whenToSay: z.string().min(1, "When to say is required").optional(),
    lesson: z.string().optional(),
  }),
});

export const VocabularyValidationViaZod = {
  updateVocabularyValidationSchema,
  createVocabularyValidationSchema,
};
