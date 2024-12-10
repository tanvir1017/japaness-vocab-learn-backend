import { z } from "zod";
import { USER_STATUS } from "../constant/user.constant";

const createUserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "password must be string",
    })
    .min(6, { message: "Password shouldn't be less then 6 characters" })
    .max(18, { message: "Password shouldn't be more than 18 characters" }),
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
