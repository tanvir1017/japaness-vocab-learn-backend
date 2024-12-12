import httpStatus from "http-status-codes";
import AppError from "../../../errors/appError";
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

// * Get all Vocabulary From Db
const getAllVocabularyBasedOnLessonIdFromDB = async (lessonId: string) => {
  const result = await Vocabulary.find({
    lesson: lessonId,
    isDeleted: { $ne: true },
  });
  if (result === null) {
    throw new AppError(httpStatus.NOT_FOUND, "No Vocabulary found");
  }
  return result;
};

// * Get all Vocabulary From Db
const getAllVocabularyFromDB = async () => {
  const result = await Vocabulary.find().populate("lesson");
  return result;
};

// * Get all Vocabulary From Db
const createVocabularyIntoDB = async (
  //user?: JwtPayload,
  payload: TVocabulary,
) => {
  //const userId = await User.findOne({ role: "admin", email: user?.userEmail });
  const userId = "67597eb3dfe3e170e669315c";
  if (!userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only admin can create Vocabulary",
    );
  }
  const result = await Vocabulary.create({ ...payload, user: userId });
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
};
