import mongoose from "mongoose";
import { TTutorial } from "../interface/tutorial.interface";

const tutorialSchema = new mongoose.Schema<TTutorial>(
  {
    url: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
  },
  { timestamps: true },
);

export const Tutorial = mongoose.model<TTutorial>("Tutorial", tutorialSchema);
