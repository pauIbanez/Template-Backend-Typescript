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

export const getInvalidLoginDataError = (details: string): ControledError =>
  new ControledError({
    name: "INVALIDLOGINDATA",
    message: "Invalid account creation payload",
    statusCode: 400,
    messageToSend: `Invalid login data: ${details}`,
    severety: ErrorSeverety.medium,
    extraData: {
      details,
    },
  });
