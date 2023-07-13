import RegistrationData from "../../../../types/userTypes/RegistrationData";
import { CreatedUserData } from "../../../../types/userTypes/UserData";

const email = "testuser@email.com";
const firstName = "test";
const lastName = "user";
const password = "12345678";
const picture = "aaaaa";
const username = "testuser";

export const mockHashedPassword = "suchStrongHash";

export const testUserRegistrationData: RegistrationData = {
  email,
  firstName,
  lastName,
  password,
  picture,
  username,
};

export const expectedCreatedUser: CreatedUserData = {
  information: {
    email,
    firstName,
    lastName,
    picture,
    username,
  },
  isDisabled: false,
  resetPasswordOnLogin: false,

  credentials: {
    username,
    email,
    password: mockHashedPassword,
  },
};

export const expectedLocals = {
  email,
  username,
  goNext: true,
};
