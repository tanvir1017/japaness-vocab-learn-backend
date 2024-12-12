import httpStatus from "http-status-codes";
import AppError from "../../../errors/appError";
import { TLesson } from "../interface/lesson.interface";
import { Lesson } from "../model/lesson.model";

// * Get single Lesson by Object Id from db
const getSingleLesson = async (id: string) => {
  const result = await Lesson.findById(id);
  return result;
};

// * Get single Lesson by Object Id from db
const getSingleLessonFromDBByLessonNo = async (lessonNo: string) => {
  const result = await Lesson.findOne({ lessonNo });
  return result;
};

// * Get all Lesson From Db
const getAllLessonFromDB = async () => {
  const result = await Lesson.find();
  return result;
};

// * Get all Lesson From Db
const getAllLessonNoListFromDB = async () => {
  const result = await Lesson.find().select({ lessonNo: true, _id: true });
  return result;
};

// * Get all Lesson From Db
const createLessonIntoDB = async (payload: TLesson) => {
  //user?: JwtPayload,
  // const userId = await User.findOne({ role: "admin", email: user?.userEmail });
  // if (!userId) {
  //   throw new AppError(httpStatus.FORBIDDEN, "Only admin can create lesson");
  // }
  const result = await Lesson.create({
    ...payload,
    user: "67597eb3dfe3e170e669315c",
  });
  return result;
};

// * Updating Lesson
const UpdateLessonFromDB = async (id: string, payload: Partial<TLesson>) => {
  if (!Object.entries(payload).length) {
    throw new AppError(httpStatus.BAD_REQUEST, "Request body  is empty");
  }
  const result = await Lesson.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// * Delete Lesson From Db
const deleteLessonFromDB = async (id: string) => {
  const deletedLesson = await Lesson.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedLesson) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Lesson");
  }
  return deletedLesson;
};
export const LessonService = {
  getSingleLessonFromDBByLessonNo,
  getSingleLesson,
  getAllLessonNoListFromDB,
  getAllLessonFromDB,
  UpdateLessonFromDB,
  deleteLessonFromDB,
  createLessonIntoDB,
};
