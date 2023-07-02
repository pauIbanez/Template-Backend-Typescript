/* eslint-disable import/prefer-default-export */

import ServerError, { ErrorSeverety } from "../../types/errorTypes/ServerError";

export const getUserNotFoundForEmailError = (email: string): ServerError => ({
  name: "MISSINGUSER",
  message: "User not found",
  statusCode: 401,
  messageToSend: "Incorrect email or password",
  severety: ErrorSeverety.low,
  extraData: {
    email,
  },
});

export const getUserNotFoundError = (userId: string): ServerError => ({
  name: "MISSINGUSER",
  message: "User not found",
  statusCode: 404,
  messageToSend: "User not found",
  severety: ErrorSeverety.low,
  extraData: {
    userId,
  },
});

export const getUserDisabledError = (userId: string): ServerError => ({
  name: "DISABLEDUSER",
  message: "User disabled",
  statusCode: 401,
  messageToSend: "This user is currently disabled",
  severety: ErrorSeverety.low,
  extraData: {
    userId,
  },
});

export const getUserAlreadyRegisteredError = (userId: string): ServerError => ({
  name: "USERALREADYREGISTERED",
  message: `User for id ${userId} is already registered`,
  statusCode: 403,
  messageToSend: "User already registered",
  severety: ErrorSeverety.low,
  extraData: {
    userId,
  },
});

export const getInvalidPasswordError = (userId: string): ServerError => ({
  name: "BADAUTH",
  message: "Password is not valid",
  statusCode: 401,
  messageToSend: "Incorrect email or password",
  severety: ErrorSeverety.low,
  extraData: {
    userId,
  },
});
