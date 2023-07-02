/* eslint-disable import/prefer-default-export */

import chalk from "chalk";
import ServerError, {
  ErrorSeverety,
} from "../../../../types/errorTypes/ServerError";

export const uncontrolledError = {
  message: "Uncontrolled error",
};

export const expectedDebugMessage = chalk.redBright(
  `Unhandled error found!: \n ${uncontrolledError.message}`
);

export const expectedUncontrolledErrorResponse = {
  error: true,
  code: 500,
  message: "Internal server error",
};

export const controlledError: ServerError = {
  message: "Internal message",
  name: "TESTINGERROR",
  severety: ErrorSeverety.high,
  extraData: {
    foo: "bar",
  },
  statusCode: 400,
  messageToSend: "External message",
};

export const expectedControlledErrorResponse = {
  error: true,
  code: controlledError.statusCode,
  message: controlledError.messageToSend,
};
