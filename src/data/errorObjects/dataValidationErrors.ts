/* eslint-disable import/prefer-default-export */
import { ErrorSeverety } from "../../types/errorTypes/ServerError";
import ControledError from "./ControledError";

const registrationDataErrors = [
  {
    detection: ["email", "must"],
    name: "INVALIDEMAIL",
    message: "Invalid email",
  },
  {
    detection: ["email", "missing"],
    name: "MISSINGEMAIL",
    message: "Missing email",
  },
  {
    detection: ["firstName"],
    name: "MISSINGFNAME",
    message: "Missing first name",
  },
  {
    detection: ["lastName"],
    name: "MIDDINGLNAME",
    message: "Missing last name",
  },
  {
    detection: ["picture"],
    name: "MISSINGPIC",
    message: "Missing picture",
  },
  {
    detection: ["username"],
    name: "MISSINGUSERNAME",
    message: "Missing username",
  },
  {
    detection: ["password", "missing"],
    name: "MISSINGPASSWORD",
    message: "Missing password",
  },
  {
    detection: ["password", "mist"],
    name: "INVALIDPASSWORD",
    message: "Password must be at least 8 characters",
  },
];

const buildInvalidRegistrationMessage = (details: string[]) => {
  const messages: string[] = [];
  details.forEach((detail) => {
    registrationDataErrors.forEach((error) => {
      let matches = true;

      for (let i = 0; i < error.detection.length; i++) {
        const detectionWord = error.detection[i];
        if (!detail.includes(detectionWord)) {
          matches = false;
        }
      }
      if (matches) {
        messages.push(error.message);
      }
    });
  });

  return messages.join(", ");
};

export const getInvalidRegistrationDataError = (
  details: string[]
): ControledError =>
  new ControledError({
    name: "INVALIDREGISTRATIONDATA",
    message: "Invalid registration payload",
    statusCode: 400,
    messageToSend: `Invalid registration data: ${buildInvalidRegistrationMessage(
      details
    )}`,
    severety: ErrorSeverety.low,
    extraData: {
      errors: buildInvalidRegistrationMessage(details),
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

export const getInvalidGetUserDataError = (
  messages: string[]
): ControledError =>
  new ControledError({
    name: "INVALIDGETUSERDATA",
    message: "Invalid get user data payload",
    statusCode: 400,
    messageToSend: `Invalid data: ${messages.join(", ")}`,
    severety: ErrorSeverety.low,
    extraData: {
      errors: messages.join(", "),
    },
  });
