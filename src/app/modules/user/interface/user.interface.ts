import mongoose from "mongoose";
import { USER_ROLE } from "../constant/user.constant";

export interface TUser {
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: "admin" | "lerner";
  status: "not-verified" | "verified" | "blocked";
  isDeleted: boolean;
}

export interface UserModel extends mongoose.Model<TUser> {
  isUserExistByEmail: (email: string) => Promise<TUser>;

  isPasswordMatched: (
    plainPassword: string,
    hashedPassword: string,
  ) => Promise<boolean>;

  isUserVerified: (id: string) => Promise<boolean>;

  isJWTIssuedBeforePasswordChange: (
    passwordChangeTimeStamp: Date,
    jwtIssuedIAT: number,
  ) => boolean;
}

export type WithName = {
  name: {
    firstName: string;
    lastName: string;
  };
};

export type TUserRole = keyof typeof USER_ROLE;
