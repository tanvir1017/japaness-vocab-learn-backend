import httpStatus from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { VocabularyService } from "../service/vocabulary.service";

// * Get single/individual Vocabulary
const getSingleVocabulary = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await VocabularyService.getSingleVocabulary(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Vocabulary is retrieved successfully",
    data: result,
  });
});

// * Get single/individual Vocabulary
const getVocabularyListByLessonID = asyncHandler(async (req, res) => {
  const { lessonID } = req.params;

  const result =
    await VocabularyService.getVocabularyListByLessonIDFromDb(lessonID);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Vocabulary is retrieved successfully",
    data: result,
  });
});

// * Get all Vocabulary from db
const getAllVocabulary = asyncHandler(async (req, res) => {
  const result = await VocabularyService.getAllVocabularyFromDB();

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Vocabulary is retrieved successfully",
    data: result,
  });
});

// * Get all Vocabulary from db
const getAllVocabularyByLessonId = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  const result = await VocabularyService.getAllVocabularyBasedOnLessonIdFromDB(
    req.query,
    lessonId,
  );

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Vocabulary is retrieved successfully",
    data: result,
  });
});

// * Get all Vocabulary from db
const createVocabulary = asyncHandler(async (req, res) => {
  const result = await VocabularyService.createVocabularyIntoDB(
    //req.user,
    req.body,
  );

  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: "Vocabulary is created successfully",
    data: result,
  });
});

// * Update Vocabulary from db
const updateVocabulary = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await VocabularyService.UpdateVocabularyFromDB(id, req.body);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Vocabulary is updated successfully",
    data: result,
  });
});

// * Delete Vocabulary from db
const deleteVocabulary = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await VocabularyService.deleteVocabularyFromDB(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Vocabulary is deleted successfully",
    data: result,
  });
});
export const VocabularyController = {
  getAllVocabularyByLessonId,
  getSingleVocabulary,
  getAllVocabulary,
  updateVocabulary,
  deleteVocabulary,
  createVocabulary,
  getVocabularyListByLessonID,
};
