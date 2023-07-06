import ControledError from "../../../../data/errorObjects/ControledError";
import LoginData from "../../../../types/authTypes/loginData";
import { ErrorSeverety } from "../../../../types/errorTypes/ServerError";

export const validLoginPayload: LoginData = {
  email: "testing@email.com",
  password: "12345Aa",
};

export const invalidLoginPayload = {
  password: "12345Aa",
};

export const invalidLoginDetailsString = '"email" must be a valid email';

export const expectedInvalidLoginDataMessage: ControledError =
  new ControledError({
    name: "INVALIDLOGINDATA",
    message: "Invalid account creation payload",
    statusCode: 400,
    messageToSend: "Invalid login data: Missing username or email",
    severety: ErrorSeverety.low,
    extraData: {
      errors: "Missing username or email",
    },
  });

export const expectedBody = {
  ...validLoginPayload,
};
