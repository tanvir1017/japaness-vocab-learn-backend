import httpStatus from "http-status-codes";
import env from "../../../config";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { AuthServices } from "../service/auth.service";

// * Login user ADMIN | LERNER
const loginValidation = asyncHandler(async (req, res) => {
  const result = await AuthServices.loginValidateUser(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: env.isProd,
    httpOnly: true,
  });
  // res.cookie("accessToken", accessToken, {
  //   secure: env.isProd,
  //   httpOnly: true,
  // });

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User logged in successfully", // returns a success message if the login is successful.
    data: { accessToken, refreshToken }, // returns the validated user data or an error message if the login fails.
  });
});

// * Refresh toke
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshTokenGenerate(refreshToken);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Access token retrieve successfully",
    data: result,
  });
});

export const AuthController = {
  loginValidation,
  refreshToken,
};
