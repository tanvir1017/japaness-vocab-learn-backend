import httpStatus from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { TutorialService } from "../../lesson/service/lesson.service";

// * Get single/individual Tutorial
const getSingleTutorial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await TutorialService.getSingleTutorial(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Tutorial is retrieved successfully",
    data: result,
  });
});

// * Get all Tutorial from db
const getAllTutorial = asyncHandler(async (req, res) => {
  const result = await TutorialService.getAllTutorialFromDB();

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Tutorials are retrieved successfully",
    data: result,
  });
});

// * Get all Tutorial from db
const createTutorial = asyncHandler(async (req, res) => {
  const result = await TutorialService.createTutorialIntoDB(req.body);

  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: "Tutorial is created successfully",
    data: result,
  });
});

// * Update Tutorial from db
const updateTutorial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await TutorialService.UpdateTutorialFromDB(id, req.body);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Tutorial is updated successfully",
    data: result,
  });
});

// * Delete Tutorial from db
const deleteTutorial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await TutorialService.deleteTutorialFromDB(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Tutorial is deleted successfully",
    data: result,
  });
});
export const TutorialController = {
  getSingleTutorial,
  getAllTutorial,
  updateTutorial,
  deleteTutorial,
  createTutorial,
};
