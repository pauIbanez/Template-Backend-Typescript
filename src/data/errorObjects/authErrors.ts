import ServerError, { ErrorSeverety } from "../../types/errorTypes/ServerError";

export const getNoAuthHeaderError = (): ServerError => ({
  name: "MISSINGAUTH",
  message: "Missing authorization header",
  statusCode: 401,
  messageToSend: "No auth provided",
  severety: ErrorSeverety.low,
});

export const getInvalidTokenError = (): ServerError => ({
  name: "INVALIDTOKEN",
  message: "Invalid Token",
  statusCode: 401,
  messageToSend: "Invalid token",
  severety: ErrorSeverety.low,
});
