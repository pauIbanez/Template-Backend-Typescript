import ResponseError from "../../../../types/errorTypes/ResponseError";
import RegistrationData from "../../../../types/userTypes/RegistrationData";
import { CreatedUserData } from "../../../../types/userTypes/UserData";

const createdUserEmail = "created@email.com";
const createdUserUsername = "alreadyUsedusername";
const validUserEmail = "valid@email.com";

export const validRegistrationData: RegistrationData = {
  email: validUserEmail,
  firstName: "valid",
  lastName: "data",
  password: "12345678",
  picture: "asda",
  username: "validUsername",
};

export const alreadyCreatedForEmailRegistrationData: RegistrationData = {
  email: createdUserEmail,
  firstName: "valid",
  lastName: "data",
  password: "12345678",
  picture: "asda",
  username: "asdasd",
};

export const alreadyInUseUsernameRegistrationData: RegistrationData = {
  email: "some@email.com",
  firstName: "valid",
  lastName: "data",
  password: "12345678",
  picture: "asda",
  username: createdUserUsername,
};

export const invalidRegistrationData: RegistrationData = {
  email: "invalidemail",
  firstName: "invalid",
  lastName: "data",
  password: "12345678",
  picture: "asda",
  username: "invaliduser",
};

export const createdUser: CreatedUserData = {
  information: {
    email: createdUserEmail,
    username: createdUserUsername,
    firstName: "crated",
    lastName: "user",
    picture: "",
  },
  credentials: {
    email: createdUserEmail,
    username: createdUserUsername,
    password: "something",
  },

  isDisabled: false,
  resetPasswordOnLogin: false,
};

export const expectedInvalidDataError: ResponseError = {
  code: 400,
  error: true,
  message: "Invalid registration data: Invalid email",
};

export const expectedEmailAlreadyInUseError: ResponseError = {
  code: 400,
  error: true,
  message: "Duplicated keys: Email",
};

export const expectedUsernameAlreadyInUseError: ResponseError = {
  code: 400,
  error: true,
  message: "Duplicated keys: Username",
};

export const sucessResponse = {
  message: "User registered sucessfully",
};
