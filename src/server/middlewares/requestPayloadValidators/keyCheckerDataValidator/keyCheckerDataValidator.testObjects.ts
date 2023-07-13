import ControledError from "../../../../data/errorObjects/ControledError";
import { ErrorSeverety } from "../../../../types/errorTypes/ServerError";

const email = "someemail@email.com";
const username = "username";

export const validKeyCheckerPayload = {
  email,
  username,
};

export const invalidKeyCheckerPayload = {
  email: "invalidEmail",
  username: "username",
};

export const expectedLocals = {
  email,
  username,
  goNext: false,
};

export const expectedError = new ControledError({
  name: "INVALIDKEYCHECKDATA",
  message: "Invalid key check data",
  statusCode: 400,
  messageToSend: `Invalid data: Invalid email`,
  severety: ErrorSeverety.low,
  extraData: {
    errors: "Invalid email",
  },
});
