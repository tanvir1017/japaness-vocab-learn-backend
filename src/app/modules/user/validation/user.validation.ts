import { z } from "zod";
import { USER_STATUS } from "../constant/user.constant";

const createUserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "password must be string",
    })
    .max(20, { message: "Password cannot be more than 20 characters" })
    .optional(),
});

const changeUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.string(z.enum([...USER_STATUS] as [string, ...string[]])),
  }),
});

export const UserSchemaValidationZOD = {
  createUserValidationSchema,
  changeUserStatusValidationSchema,
};
