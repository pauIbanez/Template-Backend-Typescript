import RegistrationData from "../../../../types/userTypes/RegistrationData";
import { CreatedUserData } from "../../../../types/userTypes/UserData";

const email = "testuser@email.com";
const firstName = "test";
const lastName = "user";
const password = "12345678";
const phoneNumber = "45687563";
const picture = "aaaaa";
const username = "testuser";

export const mockHashedPassword = "suchStrongHash";

export const testUserRegistrationData: RegistrationData = {
  email,
  firstName,
  lastName,
  password,
  phoneNumber,
  picture,
  username,
};

export const expectedCreatedUser: CreatedUserData = {
  information: {
    email,
    firstName,
    lastName,
    phoneNumber,
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
