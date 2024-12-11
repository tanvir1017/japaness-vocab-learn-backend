import mongoose from "mongoose";

import { TLesson } from "../interface/lesson.interface";

const lessonSchema = new mongoose.Schema<TLesson>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    lessonNo: {
      type: String,
      unique: true,
      required: [true, "Lesson Number is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Lesson = mongoose.model<TLesson>("Lesson", lessonSchema);
