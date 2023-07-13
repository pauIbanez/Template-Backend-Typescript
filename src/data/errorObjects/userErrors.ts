/* eslint-disable import/prefer-default-export */

import { MongooseError } from "mongoose";
import { ErrorSeverety } from "../../types/errorTypes/ServerError";
import ControledError from "./ControledError";
import { CreatedUserData } from "../../types/userTypes/UserData";

export const getUserNotFoundForUsernameOrEmailError = (
  email: string
): ControledError =>
  new ControledError({
    name: "MISSINGUSER",
    message: "User not found",
    statusCode: 401,
    messageToSend: "Incorrect email or password",
    severety: ErrorSeverety.low,
    extraData: {
      email,
    },
  });

export const getUserNotFoundForIdError = (userId: string): ControledError =>
  new ControledError({
    name: "MISSINGUSER",
    message: "User not found for Id",
    statusCode: 404,
    messageToSend: "User not found",
    severety: ErrorSeverety.low,
    extraData: {
      userId,
    },
  });

export const getUserDisabledError = (userId: string): ControledError =>
  new ControledError({
    name: "DISABLEDUSER",
    message: "User disabled",
    statusCode: 403,
    messageToSend: "This user is currently disabled",
    severety: ErrorSeverety.low,
    extraData: {
      userId,
    },
  });

export const getNotYetActivatedError = (userId: string): ControledError =>
  new ControledError({
    name: "INACTIVEUSER",
    message: "User not active",
    statusCode: 403,
    messageToSend: "This user is not activated yet!",
    severety: ErrorSeverety.low,
    extraData: {
      userId,
    },
  });

export const getInvalidPasswordError = (userId: string): ControledError =>
  new ControledError({
    name: "BADAUTH",
    message: "Password is not valid",
    statusCode: 401,
    messageToSend: "Incorrect email or password",
    severety: ErrorSeverety.low,
    extraData: {
      userId,
    },
  });

const getDuplicateKey = (message: string): string => {
  if (message.includes("username")) {
    return "Username";
  }
  if (message.includes("email")) {
    return "Email";
  }
  return message;
};

export const getDuplicateKeyRegistrationError = (
  error: MongooseError,
  registrarionData?: CreatedUserData
): ControledError =>
  new ControledError({
    name: "DUPLICATEKEY",
    message: `Duplicate key/s: ${getDuplicateKey(error.message)}`,
    severety: ErrorSeverety.low,
    statusCode: 400,
    messageToSend: `${
      error.message.includes("username") ? "Username is already in use" : ""
    }${error.message.includes("email") ? "Email is already in use" : ""}`,
    extraData: {
      duplicatedKey:
        getDuplicateKey(error.message) === "Username"
          ? registrarionData!.information.username
          : registrarionData!.information.email,
    },
  });
