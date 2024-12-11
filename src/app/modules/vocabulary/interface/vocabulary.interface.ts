import { Types } from "mongoose";

export type TVocabulary = {
  word: string;
  pronunciation: string;
  meaning: string;
  whenToSay: string;
  isDeleted: boolean;
  lesson: Types.ObjectId;
  user: Types.ObjectId;
};
