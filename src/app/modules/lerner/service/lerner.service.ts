import httpStatus from "http-status-codes";
import mongoose from "mongoose";
import AppError from "../../../errors/appError";
import { User } from "../../user/model/user.model";
import { TLerner } from "../interface/lerner.interface";
import { Lerner } from "../model/lerner.model";

// * Get single lerner by Object Id from db
const getSingleLernerFromDB = async (id: string) => {
  const result = await Lerner.findById(id);
  return result;
};

// * Get single lerner by Object Id from db
const getLernerFromDBByEmail = async (email: string) => {
  const result = await Lerner.findOne({ email });
  return result;
};

// * Get all Lerner From Db
const getAllLernerFromDB = async () => {
  const result = await Lerner.find({});
  return result;
};

// * Updating lerner
const UpdateLernerFromDB = async (id: string, payload: Partial<TLerner>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Lerner.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// * Delete Lerner From Db
const deleteLernerFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedLerner = await Lerner.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedLerner) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete lerner");
    }

    // get user _id from deletedAdmin
    const userId = deletedLerner.user;

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to lerner user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedLerner;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const LernerService = {
  getSingleLernerFromDB,
  deleteLernerFromDB,
  UpdateLernerFromDB,
  getAllLernerFromDB,
  getLernerFromDBByEmail,
};
