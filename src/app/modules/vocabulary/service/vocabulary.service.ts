import httpStatus, { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../../builder/QueryBuilder";
import AppError from "../../../errors/appError";
import { Lesson } from "../../lesson/model/lesson.model";
import { TVocabulary } from "../interface/vocabulary.interface";
import { Vocabulary } from "../model/vocabulary.model";

// * Get single Vocabulary by Object Id from db
const getSingleVocabulary = async (id: string) => {
  const result = await Vocabulary.findById(id);
  if (result === null) {
    throw new AppError(httpStatus.NOT_FOUND, "No Vocabulary found");
  }
  return result;
};

// * Get single Vocabulary by Object Id from db
const getVocabularyListByLessonIDFromDb = async (lessonID: string) => {
  const result = await Vocabulary.find({ lesson: lessonID }).countDocuments();
  return result;
};

// * Get all Vocabulary From Db
const getAllVocabularyBasedOnLessonIdFromDB = async (
  query: Record<string, unknown>,
  lessonNo: string,
) => {
  const lessonId = await Lesson.findOne({ lessonNo });
  if (!lessonId) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Lesson Not Found By This Lesson No`,
    );
  }

  const vocabQuery = new QueryBuilder(
    Vocabulary.find({
      lesson: lessonId,
      isDeleted: { $ne: true },
    }).populate("lesson"),
    query,
  ).paginate();
  const result = await vocabQuery.modelQuery;
  const meta = await vocabQuery.countTotal();

  if (result === null) {
    throw new AppError(httpStatus.NOT_FOUND, "No Vocabulary found");
  }
  return { meta, result };
};

// * Get all Vocabulary From Db
const getAllVocabularyFromDB = async () => {
  const result = await Vocabulary.find().populate("lesson");
  return result;
};

// * Get all Vocabulary From Db
const createVocabularyIntoDB = async (payload: TVocabulary) => {
  const result = await Vocabulary.create(payload);
  return result;
};

// * Updating Vocabulary
const UpdateVocabularyFromDB = async (
  id: string,
  payload: Partial<TVocabulary>,
) => {
  if (!Object.entries(payload).length) {
    throw new AppError(httpStatus.BAD_REQUEST, "Request body  is empty");
  }
  const result = await Vocabulary.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// * Delete Vocabulary From Db
const deleteVocabularyFromDB = async (id: string) => {
  const deletedVocabulary = await Vocabulary.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedVocabulary) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Vocabulary");
  }
  return deletedVocabulary;
};
export const VocabularyService = {
  getAllVocabularyBasedOnLessonIdFromDB,
  getSingleVocabulary,
  getAllVocabularyFromDB,
  UpdateVocabularyFromDB,
  deleteVocabularyFromDB,
  createVocabularyIntoDB,
  getVocabularyListByLessonIDFromDb,
};
