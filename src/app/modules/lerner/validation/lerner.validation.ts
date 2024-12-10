import { z } from "zod";
import { Gender } from "../constant/lerner.constant";

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().max(20),
});

export const createLernerValidationSchema = z.object({
  body: z.object({
    lerner: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      email: z.string().email(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
});

export const updateLernerValidationSchema = z.object({
  body: z.object({
    lerner: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      email: z.string().email().optional(),
    }),
  }),
});

export const LernerValidationViaZod = {
  createLernerValidationSchema,
  updateLernerValidationSchema,
};
