/* eslint-disable no-param-reassign */

import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    information: {
      _id: false,
      firstName: String,
      lastName: String,
      phoneNumber: String,

      email: {
        type: String,
        required: true,
        unique: true,
      },
      picture: String,
    },
    credentials: {
      _id: false,
      email: {
        type: String,
        required: true,
        unique: true,
      },
      otpPassword: String,
      password: String,
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },

    toCompleteRegister: {
      type: Boolean,
      default: true,
    },

    resetPasswordOnLogin: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.credentials;
      },
    },
  }
);

const Users = model("Users", UserSchema, "users");

export default Users;
