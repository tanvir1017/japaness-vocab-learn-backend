import { Types } from "mongoose";

export type TLesson = {
  title: string;
  lessonNo: string;
  isDeleted: boolean;
  user: Types.ObjectId;
};
