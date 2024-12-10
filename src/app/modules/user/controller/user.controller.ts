import httpStatus from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "../service/user.service";

const createAdmin = asyncHandler(async (req, res) => {
  const file = req.file;
  const { admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    file as Express.Multer.File,
    adminData,
  );

  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});

// Todo => Get me route
// const getMe = asyncHandler(async (req, res) => {
//   const user = req.user;
//   const result = await UserServices.getMeFromDB(user);

//   sendResponse(res, {
//     statuscode: httpStatus.OK,
//     success: true,
//     message: "I found myself successfully", // returns a success message if the login is successful.
//     data: result, // returns the validated user data or an error message if the login fails.
//   });
// });

// Todo => change user status controller
const changeStatus = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.changeStatusOfAnUserFromDB(id, req.body);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Status changed successfully", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});
export const UserControllers = {
  createAdmin,
  changeStatus,
};
