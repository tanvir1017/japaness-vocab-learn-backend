import httpStatus from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "../service/user.service";

const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getUserFromDbById(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

const getSingleUserByMail = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.getUserFromDbByEmail(email);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

const createUser = asyncHandler(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: "User is created successfully",
    data: result,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserIntoDB(id, req.body);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User is update successfully",
    data: result,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDb(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User is deleted successfully",
    data: result,
  });
});

// Todo => Get me route
const getAllUsers = asyncHandler(async (req, res) => {
  const result = await UserServices.getAllUsersFromDb();

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "users retrieve successfully", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});

export const UserControllers = {
  createUser,
  updateUser,
  getAllUsers,
  deleteUser,
  getSingleUser,
  getSingleUserByMail,
};
