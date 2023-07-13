import { MongooseError } from "mongoose";
import ControledError from "../../../../data/errorObjects/ControledError";
import { ErrorSeverety } from "../../../../types/errorTypes/ServerError";
import { CreatedUserData } from "../../../../types/userTypes/UserData";
import EmailData from "../../../utils/email/types";

export const successResponse = {
  message: "User registered sucessfully",
};

export const savingError = {
  message: "Sum error",
};

const createdUserEmail = "testUser@gmail.com";
const createdUserUsername = "testuser";

export const mockMongooseError: MongooseError = {
  name: "MongoServerError",
  message: `E11000 duplicate key error collection: test.users index: information.username_1 dup key: { information.username: "${createdUserUsername}" }`,
};

export const expectedDuplicateUsernameError: ControledError =
  new ControledError({
    name: "DUPLICATEKEY",
    message: "Duplicate key/s: Username",
    severety: ErrorSeverety.low,
    statusCode: 400,
    messageToSend: "Username is already in use",
    extraData: {
      username: createdUserUsername,
    },
  });

export const newUserTest: CreatedUserData = {
  information: {
    email: createdUserEmail,
    username: createdUserUsername,
    firstName: "test",
    lastName: "user",
    picture: "https://something.com/picture/54257455.png",
  },
  credentials: {
    email: createdUserEmail,
    username: createdUserUsername,
    password: "password",
  },
  isDisabled: false,
  resetPasswordOnLogin: false,
};

export const createdUserTest = {
  information: {
    email: createdUserEmail,
    username: createdUserUsername,
    firstName: "test",
    lastName: "user",
    picture: "https://something.com/picture/54257455.png",
  },
  credentials: {
    email: createdUserEmail,
    username: createdUserUsername,
    password: "password",
  },
  isDisabled: false,
  resetPasswordOnLogin: false,
  save: jest.fn(),
};

export const expectedMailData: EmailData = {
  html: expect.any(String),
  internalEmailName: "User Activation email",
  subject: `Hey ${createdUserUsername}! Activate your account!`,
  to: createdUserEmail,
};
