import { ErrorSeverety } from "../../types/errorTypes/ServerError";
import ControledError from "./ControledError";

export const getNoAuthHeaderError = (): ControledError =>
  new ControledError({
    name: "MISSINGAUTH",
    message: "Missing authorization header",
    statusCode: 401,
    messageToSend: "No auth provided",
    severety: ErrorSeverety.low,
  });

export const getInvalidTokenError = (): ControledError =>
  new ControledError({
    name: "INVALIDTOKEN",
    message: "Invalid Token",
    statusCode: 401,
    messageToSend: "Invalid token",
    severety: ErrorSeverety.low,
  });

export const getInvalidVerificationTokenError = (): ControledError =>
  new ControledError({
    name: "INVALIDVERIFICATIONTOKEN",
    message: "Invalid Verification token",
    statusCode: 400,
    messageToSend: "The token is invalid or expired",
    severety: ErrorSeverety.low,
  });
