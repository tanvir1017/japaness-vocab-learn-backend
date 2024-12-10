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
  //** checking user exist or not */
  isUserExistByCustomId: (id: string) => Promise<TUser>;

  //** check password match or not*/
  isPasswordMatched: (
    plainPassword: string,
    hashedPassword: string,
  ) => Promise<boolean>;

  //** check is user blocked or not*/
  isUserVerified: (id: string) => Promise<boolean>;

  //** revalidate jwt issued after password change
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
