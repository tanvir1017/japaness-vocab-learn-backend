import httpStatus from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { LernerService } from "../service/lerner.service";

// * Get single/individual Lerner
const getSingleLerner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await LernerService.getSingleLernerFromDB(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Lerner is retrieved successfully",
    data: result,
  });
});

// * Get all Lerner from db
const getAllLerner = asyncHandler(async (req, res) => {
  const result = await LernerService.getAllLernerFromDB();

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Lerner is retrieved successfully",
    data: result,
  });
});

// * Update Lerner from db
const updateLerner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { lerner } = req.body;
  const result = await LernerService.UpdateLernerFromDB(id, lerner);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Lerner is updated successfully",
    data: result,
  });
});

// * Delete Lerner from db
const deleteLerner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await LernerService.deleteLernerFromDB(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Lerner is deleted successfully",
    data: result,
  });
});
export const LernerController = {
  getSingleLerner,
  getAllLerner,
  updateLerner,
  deleteLerner,
};
