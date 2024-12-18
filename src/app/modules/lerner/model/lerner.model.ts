import mongoose, { Schema } from "mongoose";
import { TUserName } from "../../../interface/common/common.type";
import { Gender } from "../constant/lerner.constant";
import { LernerModel, TLerner } from "../interface/lerner.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"],
    maxlength: [20, "Name can not be more than 20 characters"],
  },
});

const lernerSchema = new Schema<TLerner, LernerModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: [true, "Name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    profileImg: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// generating full name
// adminSchema.virtual("fullName").get(function () {
//   return (
//     this?.name?.firstName +
//     "" +
//     this?.name?.middleName +
//     "" +
//     this?.name?.lastName
//   );
// });

// filter out deleted documents
lernerSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

lernerSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

lernerSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
lernerSchema.statics.isLernerExists = async function (id: string) {
  const existingUser = await Lerner.findById(id);
  return existingUser;
};

export const Lerner = mongoose.model<TLerner, LernerModel>(
  "Lerner",
  lernerSchema,
);
