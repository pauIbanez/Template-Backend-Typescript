import ControledError from "../../../../data/errorObjects/ControledError";
import { ErrorSeverety } from "../../../../types/errorTypes/ServerError";
import RegistrationData from "../../../../types/userTypes/RegistrationData";

export const validRegistrationPayload: RegistrationData = {
  firstName: "Test",
  lastName: "User",
  password: "123456Aa",
  picture: "default.png",
  email: "testuser@email.com",
  username: "testuser",
};

export const invalidRegistrationPayload = {
  firstName: "Test",
  lastName: "User",
  password: "asd",
  picture: "default.png",
  email: "email.com",
};

export const expectedBody = {
  ...validRegistrationPayload,
};

export const expectedInvalidRegistrationDataMessage: ControledError =
  new ControledError({
    name: "INVALIDREGISTRATIONDATA",
    message: "Invalid registration payload",
    statusCode: 400,
    messageToSend: expect.stringContaining("Missing username"),
    severety: ErrorSeverety.low,
    extraData: {
      errors: expect.stringContaining("Invalid email"),
    },
  });
