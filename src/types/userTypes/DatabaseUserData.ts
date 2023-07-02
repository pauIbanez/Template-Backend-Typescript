import { Document } from "mongoose";

interface DatabaseUserData extends Document {
  _id?: string;
  id?: string;
  information: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email: string;
    picture?: string;
  };

  credentials: {
    email: string;
    password?: string;
    otpPassword?: string;
  };

  isDisabled: boolean;
  resetPasswordOnLogin: boolean;
  toCompleteRegister: boolean;
}

export default DatabaseUserData;
