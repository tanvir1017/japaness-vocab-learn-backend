import z from "zod";

const validateLoginUser = z.object({
  body: z.object({
    id: z.string({ required_error: "id must be provided" }),
    password: z.string({ required_error: "password must be provided" }),
  }),
});

const validatePreUser = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password must be provided" }),
    newPassword: z.string({ required_error: "password must be provided" }),
    // confirmPassword: z.string({
    //   required_error: "password and confirm password didn't match",
    // }),
  }),
});

const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh Token Is Required" }),
    //accessToken: z.string({ required_error: "Access Token Is Required" }),
  }),
});

const forgetPasswordValidation = z.object({
  body: z.object({
    id: z.string({ required_error: "User id is required!" }),
  }),
});

const resetPasswordValidation = z.object({
  body: z.object({
    id: z.string({ required_error: "User id is required!" }),
    newPassword: z.string({ required_error: "Password must be provided" }),
  }),
});

export const ValidateAuthUserViaZOD = {
  validateLoginUser,
  validatePreUser,
  refreshTokenValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
};
