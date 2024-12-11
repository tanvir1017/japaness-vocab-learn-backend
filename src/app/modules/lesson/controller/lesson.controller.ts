import httpStatus from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { LessonService } from "../service/lesson.service";

// * Get single/individual Lesson
const getSingleLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await LessonService.getSingleLesson(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Lesson is retrieved successfully",
    data: result,
  });
});

// * Get single/individual Lesson
const getLessonByLessonNo = asyncHandler(async (req, res) => {
  const { lessonNo } = req.params;
  const result = await LessonService.getSingleLessonFromDBByLessonNo(lessonNo);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Lesson is retrieved successfully by LessonNo",
    data: result,
  });
});

// * Get all Lesson from db
const getAllLesson = asyncHandler(async (req, res) => {
  const result = await LessonService.getAllLessonFromDB();

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Lesson is retrieved successfully",
    data: result,
  });
});

// * Get all Lesson from db
const createLesson = asyncHandler(async (req, res) => {
  const result = await LessonService.createLessonIntoDB(req.user, req.body);

  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: "Lesson is created successfully",
    data: result,
  });
});

// * Update Lesson from db
const updateLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const lesson = req.body;
  const result = await LessonService.UpdateLessonFromDB(id, lesson);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Lesson is updated successfully",
    data: result,
  });
});

// * Delete Lesson from db
const deleteLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await LessonService.deleteLessonFromDB(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Lesson is deleted successfully",
    data: result,
  });
});
export const LessonController = {
  getSingleLesson,
  getAllLesson,
  updateLesson,
  getLessonByLessonNo,
  deleteLesson,
  createLesson,
};
