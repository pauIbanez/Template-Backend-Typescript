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

export const getUserNotFoundError = (userId: string): ControledError =>
  new ControledError({
    name: "MISSINGUSER",
    message: "User not found",
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

export const getDuplicateKeyRegistrationError = (
  error: MongooseError,
  registrarionData?: CreatedUserData
): ControledError =>
  new ControledError({
    name: "DUPLICATEKEY",
    message: `Duplicate key/s: ${
      error.message.includes("username") ? "Username" : ""
    }${error.message.includes("email") ? "Email" : ""}`,
    severety: ErrorSeverety.low,
    statusCode: 400,
    messageToSend: `${
      error.message.includes("username") ? "Username is already in use " : ""
    }${error.message.includes("email") ? "Email is already in use " : ""}`,
    extraData: (() => {
      const createdData: any = {};
      if (error.message.includes("username"))
        createdData.username = registrarionData?.information?.username;
      if (error.message.includes("email"))
        createdData.email = registrarionData?.information?.email;
      return createdData;
    })(),
  });
