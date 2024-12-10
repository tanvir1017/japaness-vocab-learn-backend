import httpStatus from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { LernerService } from "../service/lerner.service";
const getSingleLerner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = LernerService.getSingleLernerFromDB(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Lerner is retrieved successfully",
    data: result,
  });
});
export const lernerController = {
  getSingleLerner,
};
