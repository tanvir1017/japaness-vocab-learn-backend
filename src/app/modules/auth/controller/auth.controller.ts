import httpStatus from "http-status-codes";
import env from "../../../config";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { AuthServices } from "../service/auth.service";

const loginValidation = asyncHandler(async (req, res) => {
  const result = await AuthServices.loginValidateUser(req.body);

  const { refreshToken, accessToken, needPasswordChange } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: env.isProd,
    httpOnly: true,
  });
  res.cookie("accessToken", accessToken, {
    secure: env.isDev,
    httpOnly: true,
  });

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User logged in successfully", // returns a success message if the login is successful.
    data: { needPasswordChange, accessToken }, // returns the validated user data or an error message if the login fails.
  });
});

const changePasswordValidation = asyncHandler(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.changeOldPassword(req.user, passwordData);
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Password updated successfully", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshTokenGenerate(refreshToken);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Access token retrieve successfully", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgetPassword(userId);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Forget password link generated successfully", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const token = req.headers.authorization!;
  const result = await AuthServices.resetPassword(req.body, token);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Password rested", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});

export const AuthController = {
  loginValidation,
  changePasswordValidation,
  refreshToken,
  forgetPassword,
  resetPassword,
};
