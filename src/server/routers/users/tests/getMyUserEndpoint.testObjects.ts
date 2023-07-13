import ResponseError from "../../../../types/errorTypes/ResponseError";
import { CreatedUserData } from "../../../../types/userTypes/UserData";

export const myTestUserId = "622f00e91e85099995d63b01";

export const myTestUser: CreatedUserData = {
  _id: myTestUserId,
  information: {
    email: "mytestUser@email.com",
    username: "myTestuser",
    firstName: "test",
    lastName: "user",
    picture: "picture",
  },
  credentials: {
    email: "mytestUser@email.com",
    username: "myTestuser",
    password: "password",
  },
  isDisabled: false,
  resetPasswordOnLogin: false,
};

export const getTestUsers = () => [
  myTestUser,
  {
    information: {
      email: "notMyTestuser@email.com",
      username: "notMyTestuser",
      firstName: "test",
      lastName: "user2",
      picture: "picture",
    },
    credentials: {
      email: "notMyTestuser@email.com",
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
    email: "mytestUser@email.com",
    username: "myTestuser",
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
