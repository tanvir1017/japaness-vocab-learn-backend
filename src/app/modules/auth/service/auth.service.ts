import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import env from "../../../config";
import AppError from "../../../errors/appError";
import { sendEmail } from "../../../utils/send-email";
import { User } from "../../user/model/user.model";
import { PasswordData, TLoginUser } from "../interface/auth.interface";
import { createToken, verifyToken } from "../utils/auth.utils";

// TODO => validate BLOCK | WRONG PASSWORD | EXISTENCE of an user
const validateBlockPasswordExistenceOfAnUser = async (userId: string) => {};

// TODO: Implement function to validate user credentials
const loginValidateUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payload.id);

  //* check if user exists in DB by id
  if (!user) {
    throw new AppError(400, "user doesn't exist");
  }

  //* check if the user is deleted(soft) or not
  if (user.isDeleted) {
    throw new AppError(400, "User is not exist maybe deleted");
  }

  //* check if the user is blocked or not
  if (user.status === "blocked") {
    throw new AppError(400, "User is blocked by admin");
  }

  //* check if password is matched or not
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(400, "Password and user doesn't match");
  }

  //* access granted. and return token to client
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    env.JWT_ACCESS_TOKEN as string,
    env.JWT_ACCESS_EXPIRES_IN as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    env.JWT_REFRESH_TOKEN as string,
    env.JWT_REFRESH_EXPIRES_IN as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// TODO => Change password implementation
const changeOldPassword = async (
  userData: JwtPayload,
  payload: PasswordData,
) => {
  const user = await User.isUserExistByCustomId(userData.userId);

  //* check if user exists in DB by id
  if (!user) {
    throw new AppError(400, "user doesn't exist");
  }

  //* check if the user is deleted(soft) or not
  if (user.isDeleted) {
    throw new AppError(400, "User is not exist maybe deleted");
  }

  //* check if the user is blocked or not
  if (user.status === "blocked") {
    throw new AppError(400, "User is blocked by admin");
  }

  //* check if password is matched or not
  if (!(await User.isPasswordMatched(payload.oldPassword, user.password))) {
    throw new AppError(400, "Password and user doesn't match");
  }

  // TODO => Hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(env.BCRYPT_SALT_ROUNDS),
  );

  const result = await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    { new: true, runValidators: true },
  );

  return null;
};

// TODO => Refresh token generation
const refreshTokenGenerate = async (token: string) => {
  //* Verify token
  const decoded = verifyToken(token, env.JWT_REFRESH_TOKEN as string);

  const { userId, iat } = decoded;

  const user = await User.isUserExistByCustomId(userId);

  //* check if user exists in DB by id
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user doesn't exist");
  }

  //* check if the user is deleted(soft) or not
  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not exist maybe deleted");
  }

  //* check if the user is blocked or not
  if (user.status === "blocked") {
    throw new AppError(httpStatus.BAD_REQUEST, "User is blocked by admin");
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChange(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    env.JWT_ACCESS_TOKEN!,
    env.JWT_ACCESS_EXPIRES_IN!,
  );

  return {
    accessToken,
  };
};

// TODO => Forget Password
const forgetPassword = async (userId: string) => {
  const user = await User.isUserExistByCustomId(userId);

  //* check if user exists in DB by id
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user doesn't exist");
  }

  //* check if the user is deleted(soft) or not
  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not exist maybe deleted");
  }

  //* check if the user is blocked or not
  if (user.status === "blocked") {
    throw new AppError(httpStatus.BAD_REQUEST, "User is blocked by admin");
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };
  const resetToken = createToken(jwtPayload, env.JWT_ACCESS_TOKEN!, "10m");

  const resetUiLink = `${env.FRONTEND_DEV_ENV01}?email=${user.email}&token=${resetToken}`;

  sendEmail(user.email, resetUiLink);
};

// TODO => Reset Password
const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExistByCustomId(payload?.id);

  //* check if user exists in DB by id
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user doesn't exist");
  }

  //* check if the user is deleted(soft) or not
  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not exist maybe deleted");
  }

  //* check if the user is blocked or not
  if (user.status === "blocked") {
    throw new AppError(httpStatus.BAD_REQUEST, "User is blocked by admin");
  }

  //* verify token
  const decoded = verifyToken(token, env.JWT_ACCESS_TOKEN!);
  if (decoded && decoded.userId !== payload.id) {
    throw new AppError(httpStatus.FORBIDDEN, "Forbidden user!");
  }

  // TODO => Hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(env.BCRYPT_SALT_ROUNDS),
  );

  await User.findOneAndUpdate(
    { id: decoded.userId, role: decoded.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

export const AuthServices = {
  loginValidateUser,
  changeOldPassword,
  refreshTokenGenerate,
  forgetPassword,
  resetPassword,
};
