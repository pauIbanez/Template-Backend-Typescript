import ResponseError from "../../../../types/errorTypes/ResponseError";
import { CreatedUserData } from "../../../../types/userTypes/UserData";

export const myTestUserId = "622f00e91e85099995d63b01";

export const myTestUser: CreatedUserData = {
  _id: myTestUserId,
  information: {
    email: "testuser@email.com",
    username: "testuser",
    firstName: "test",
    lastName: "user",
    picture: "picture",
  },
  credentials: {
    email: "testuser@email.com",
    username: "testuser",
    password: "password",
  },
  isDisabled: false,
  resetPasswordOnLogin: false,
};

export const getTestUsers = () => [
  myTestUser,
  {
    information: {
      email: "testuser2@email.com",
      username: "testuser2",
      firstName: "test",
      lastName: "user2",
      picture: "picture",
    },
    credentials: {
      email: "testuse2r@email.com",
      username: "testuser2",
      password: "password",
    },
    isDisabled: false,
    resetPasswordOnLogin: false,
  },
];

export const expectedCorrectResponse = {
  id: myTestUserId,
  information: {
    email: "testuser@email.com",
    username: "testuser",
    firstName: "test",
    lastName: "user",
    picture: "picture",
  },
};

export const expectedMissingUserError: ResponseError = {
  error: true,
  code: 404,
  message: "User not found",
};

export const expectedInvalidTokenError: ResponseError = {
  error: true,
  code: 401,
  message: "Invalid token",
};

export const expectedNoAuthError: ResponseError = {
  error: true,
  code: 401,
  message: "No auth provided",
};
