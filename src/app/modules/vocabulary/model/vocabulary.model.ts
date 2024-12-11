import mongoose from "mongoose";
import { TVocabulary } from "../interface/vocabulary.interface";

const VocabularySchema = new mongoose.Schema<TVocabulary>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: "User",
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Lesson id is required"],
      ref: "Lesson",
    },
    word: { type: String, required: [true, "word is required"] },
    pronunciation: {
      type: String,
      required: [true, "pronunciation  is required"],
    },
    meaning: { type: String, required: [true, "meaning  is required"] },
    whenToSay: { type: String, required: [true, "whenToSay  is required"] },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Vocabulary = mongoose.model<TVocabulary>(
  "Vocabulary",
  VocabularySchema,
);
