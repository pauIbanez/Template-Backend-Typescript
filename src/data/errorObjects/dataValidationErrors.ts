/* eslint-disable import/prefer-default-export */
import { ErrorSeverety } from "../../types/errorTypes/ServerError";
import ControledError from "./ControledError";

export const getInvalidRegistrationDataError = (
  details: string
): ControledError =>
  new ControledError({
    name: "INVALIDREGISTRATIONDATA",
    message: "Invalid registration payload",
    statusCode: 400,
    messageToSend: `Invalid registration data: ${details}`,
    severety: ErrorSeverety.low,
    extraData: {
      details,
    },
  });

const loginDataErrors = [
  {
    detection: "email",
    name: "MISSINGEMAIL",
    message: "Missing username or email",
  },
  {
    detection: "password",
    name: "MISSINGPASSWORD",
    message: "Missing password",
  },
];

const buildInvalidLoginMessage = (details: string[]) => {
  const messages: string[] = [];
  details.forEach((detail) => {
    loginDataErrors.forEach((error) => {
      if (detail.includes(error.detection)) {
        messages.push(error.message);
      }
    });
  });

  return messages.join(", ");
};

export const getInvalidLoginDataError = (details: string[]): ControledError =>
  new ControledError({
    name: "INVALIDLOGINDATA",
    message: "Invalid account creation payload",
    statusCode: 400,
    messageToSend: `Invalid login data: ${buildInvalidLoginMessage(details)}`,
    severety: ErrorSeverety.low,
    extraData: {
      errors: buildInvalidLoginMessage(details),
    },
  });
