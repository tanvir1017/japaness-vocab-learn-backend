import httpStatus from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { AdminServices } from "../service/admin.service";

const getSingleAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Admin is retrieved succesfully",
    data: result,
  });
});

const getAllAdmins = asyncHandler(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Admins are retrieved succesfully",
    data: result,
  });
});

const updateAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, admin);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Admin is updated succesfully",
    data: result,
  });
});

const deleteAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Admin is deleted succesfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
