import httpStatus from "http-status-codes";
import mongoose from "mongoose";
import QueryBuilder from "../../../builder/QueryBuilder";
import AppError from "../../../errors/appError";
import { User } from "../../user/model/user.model";
import { AdminSearchableFields } from "../constant/admin.constant";
import { TAdmin } from "../interface/admin.interface";
import { Admin } from "../model/admin.model";

// * get all admin into db
const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fieldLimiting();

  const result = await adminQuery.modelQuery;
  return result;
};
// * get single admin from db
const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id).populate("user");
  return result;
};
// * update admin into db
const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  // * If name is provided and has properties, update the name fields accordingly.
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  // * Update the admin document in the database.
  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true, // Returns the updated document.
    runValidators: true, // Runs the validators on the update.
  });
  return result;
};

// * delete admin into db
const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    // * get user _id from deletedAdmin
    const userId = deletedAdmin.user;

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
