import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/appError";
import { TUser } from "../interface/user.interface";
import { User } from "../model/user.model";

// TODO =>  get individual information by them self
const getAllUsersFromDb = async () => {
  const allUsers = User.find();
  return allUsers;
};

// TODO =>  get individual information by them self
const getUserFromDbById = async (id: string) => {
  const allUsers = User.findById(id);
  return allUsers;
};

// TODO =>  get individual information by them self
const getUserFromDbByEmail = async (email: string) => {
  const result = User.findOne({ email });
  return result;
};

// TODO: Create user record in DB
const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  if (!Object.keys(payload).length) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Request body  is empty");
  }
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await User.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserFromDb = async (id: string) => {
  if (!id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Id must be provided");
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

// TODO => change user status from admin only
// const changeStatusOfAnUserFromDB = async (
//   id: string,
//   payload: Pick<TUser, "status">,
// ) => {
//   if (!id) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Id must be provided");
//   }
//   const result = await User.findByIdAndUpdate(id, payload, { new: true });
//   return result;
// };

// TODO =>  get individual information by them self
// const getMeFromDB = async (payload: JwtPayload) => {
//   let result = null;
//   if (payload.role === "admin") {
//     result = await Admin.findOne({ email: payload.userEmail }).populate("user");
//     return result;
//   } else {
//     result = await Lerner.findOne({ email: payload.userEmail }).populate(
//       "user",
//     );
//     return result;
//   }
// };

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDb,
  updateUserIntoDB,
  deleteUserFromDb,
  getUserFromDbById,
  getUserFromDbByEmail,
  //changeStatusOfAnUserFromDB,
  //getMeFromDB,
};
