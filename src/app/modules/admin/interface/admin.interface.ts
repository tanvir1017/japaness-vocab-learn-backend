import { Model, Types } from "mongoose";

export type TGender = "male" | "female" | "others";

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TAdmin = {
  user: Types.ObjectId;
  name: TUserName;
  gender: TGender;
  email: string;
  profileImg: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  isUserExists(id: string): Promise<TAdmin | null>;
}
