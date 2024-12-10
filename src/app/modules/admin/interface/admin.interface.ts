import { Model, Types } from "mongoose";
import {
  T_GENDER_COMMON__TYPE,
  TUserName,
} from "../../../interface/common/common.type";

export type TAdmin = {
  user: Types.ObjectId;
  name: TUserName;
  gender: T_GENDER_COMMON__TYPE;
  password: string;
  email: string;
  profileImg: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  isAdminExist(id: string): Promise<TAdmin | null>;
}
