import httpStatus from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { AdminServices } from "../service/admin.service";

/**
 * Handles the retrieval of a single admin based on their ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const getSingleAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extracts the admin ID from the request parameters.
  const result = await AdminServices.getSingleAdminFromDB(id); // Calls the service to fetch the admin.

  // Sends a successful response back to the client.
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Admin is retrieved successfully",
    data: result,
  });
});

/**
 * Retrieves all admins from the database based on query parameters.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const getAllAdmins = asyncHandler(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Admins are retrieved successfully",
    data: result,
  });
});

/**
 * Updates an admin in the database based on their ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const updateAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, admin);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Admin is updated successfully",
    data: result,
  });
});

/**
 * Deletes an admin from the database based on their ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
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
