/* eslint-disable import/prefer-default-export */
import ServerError, { ErrorSeverety } from "../../types/errorTypes/ServerError";

export const getInvalidRegistrationDataError = (
  accountId: string,
  userId: string,
  details: string
): ServerError => ({
  name: "INVALIDREGISTRATIONDATA",
  message: "Invalid registration payload",
  statusCode: 400,
  messageToSend: `Invalid registration data: ${details}`,
  severety: ErrorSeverety.medium,
  extraData: {
    accountId,
    userId,
    details,
  },
});

export const getInvalidLoginDataError = (details: string): ServerError => ({
  name: "INVALIDLOGINDATA",
  message: "Invalid account creation payload",
  statusCode: 400,
  messageToSend: `Invalid login data: ${details}`,
  severety: ErrorSeverety.medium,
  extraData: {
    details,
  },
});