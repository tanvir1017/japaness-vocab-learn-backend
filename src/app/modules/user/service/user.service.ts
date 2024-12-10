import httpStatus from "http-status-codes";
import mongoose from "mongoose";
import AppError from "../../../errors/appError";
import * as AdminInterface from "../../admin/interface/admin.interface";
import { Admin } from "../../admin/model/admin.model";
import * as LernerInterface from "../../lerner/interface/lerner.interface";
import { Lerner } from "../../lerner/model/lerner.model";
import { TUser } from "../interface/user.interface";
import { User } from "../model/user.model";
import constructUrlAndImageUploaderUtil from "../utils/constructCloudinaryUrlAndUploadImage";

// TODO =>  Create admin record in DB simultaneously when creating a new user
const createAdminIntoDB = async (
  file: Express.Multer.File,
  payload: AdminInterface.TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = payload.password;

  //set student role
  userData.role = "admin";
  //setting student email to user
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // * set  generated id

    // * create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    // * create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    // uploading img into cloudinary
    if (file) {
      const imageUploader = await constructUrlAndImageUploaderUtil(
        payload,
        file,
      );
      payload.profileImg = imageUploader.secure_url; // injecting uploaded file
    }

    payload.user = newUser[0]._id; // * reference _id

    // * create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// TODO: Create learner record in DB simultaneously when creating a new user
const createLernerIntoDB = async (
  file: Express.Multer.File,
  payload: LernerInterface.TLerner,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = payload.password;

  //set student role
  userData.role = "lerner";
  //setting student email to user
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // * create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    // * create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create lerner");
    }

    // uploading img into cloudinary
    if (file) {
      const imageUploader = await constructUrlAndImageUploaderUtil(
        payload,
        file,
      );
      payload.profileImg = imageUploader.secure_url; // injecting uploaded file
    }

    payload.user = newUser[0]._id; // * reference _id

    // * create a admin (transaction-2)
    const newLerner = await Lerner.create([payload], { session });

    if (!newLerner.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create lerner");
    }

    await session.commitTransaction();
    await session.endSession();

    return newLerner;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// TODO => change user status from admin only
const changeStatusOfAnUserFromDB = async (
  id: string,
  payload: Pick<TUser, "status">,
) => {
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Id must be provided");
  }
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserServices = {
  createAdminIntoDB,
  createLernerIntoDB,
  changeStatusOfAnUserFromDB,
};
