import httpStatus from "http-status-codes";
import AppError from "../../../errors/appError";
import { TTutorial } from "../../tutorial/interface/tutorial.interface";
import { Tutorial } from "../../tutorial/model/tutorial.model";

// * Get single Tutorial by Object Id from db
const getSingleTutorial = async (id: string) => {
  const result = await Tutorial.findById(id);
  return result;
};

// * Get all Tutorial From Db
const getAllTutorialFromDB = async () => {
  const result = await Tutorial.find({});
  return result;
};

// * Get all Tutorial From Db
const createTutorialIntoDB = async (payload: TTutorial) => {
  const result = await Tutorial.create(payload);
  return result;
};

// * Updating Tutorial
const UpdateTutorialFromDB = async (
  id: string,
  payload: Partial<TTutorial>,
) => {
  if (!Object.entries(payload).length) {
    throw new AppError(httpStatus.BAD_REQUEST, "Request body  is empty");
  }
  const result = await Tutorial.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// * Delete Tutorial From Db
const deleteTutorialFromDB = async (id: string) => {
  const deletedTutorial = await Tutorial.findOneAndDelete({ _id: id });

  if (!deletedTutorial) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Tutorial");
  }
  return deletedTutorial;
};
export const TutorialService = {
  getSingleTutorial,
  getAllTutorialFromDB,
  UpdateTutorialFromDB,
  deleteTutorialFromDB,
  createTutorialIntoDB,
};
