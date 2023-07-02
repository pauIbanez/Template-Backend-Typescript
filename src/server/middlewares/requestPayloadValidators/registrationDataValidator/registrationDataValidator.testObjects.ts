import RegistrationData from "../../../../types/userTypes/RegistrationData";

export const accountId = "622f00e91e85099995d63b07";
export const userId = "622f00e91e85099995d63b06";

export const validRegistrationPayload: RegistrationData = {
  firstName: "Test",
  lastName: "User",
  password: "123456Aa",
  phoneNumber: "0000000",
  picture: "default.png",
};

export const invalidRegistrationPayload = {
  firstName: "Test",
  password: "123456Aa",
  phoneNumber: "0000000",
  picture: "default.png",
};

export const expectedDetailsString = '"lastName" is required';
