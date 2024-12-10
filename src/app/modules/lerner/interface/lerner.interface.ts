import { Model, Types } from "mongoose";
import {
  T_GENDER_COMMON__TYPE,
  TUserName,
} from "../../../interface/common/common.type";

export type TLerner = {
  user: Types.ObjectId;
  name: TUserName;
  password: string;
  gender: T_GENDER_COMMON__TYPE;
  email: string;
  profileImg: string;
  isDeleted: boolean;
};

export interface LernerModel extends Model<TLerner> {
  isLernerExists(id: string): Promise<TLerner | null>;
}