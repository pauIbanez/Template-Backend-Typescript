/* eslint-disable import/prefer-default-export */

import chalk from "chalk";
import { ErrorSeverety } from "../../../../types/errorTypes/ServerError";
import ControledError from "../../../../data/errorObjects/ControledError";

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

export const controlledError = new ControledError({
  message: "Internal message",
  name: "TESTINGERROR",
  severety: ErrorSeverety.high,
  extraData: {
    foo: "bar",
  },
  statusCode: 400,
  messageToSend: "External message",
});

export const getNoExtraDataControlledError = () => {
  const error = { ...controlledError };
  delete error.extraData;

  return error;
};

export const expectedControlledErrorResponse = {
  error: true,
  code: controlledError.statusCode,
  message: controlledError.messageToSend,
};

export const expectedErrorInfo = [
  " \n",
  "\x1B[91m\x1B[39m\n\x1B[91m Error: \x1B[39m",
  "\x1B[97mTESTINGERROR\x1B[39m",
  "\x1B[91m\x1B[39m\n\x1B[91m Message: \x1B[39m",
  "\x1B[97mInternal message\x1B[39m",
  "\x1B[91m\x1B[39m\n\x1B[91m Sent message:\x1B[39m",
  "\x1B[97mExternal message\x1B[39m",
  "\x1B[91m\x1B[39m\n\x1B[91m Code:\x1B[39m",
  "\x1B[97m400\x1B[39m",
  "\x1B[91m\x1B[39m\n\x1B[91m Data: \x1B[39m\n\x1B[91m\x1B[39m",
  "\x1B[97m  foo: bar \x1B[39m\n\x1B[97m\x1B[39m",
];

export const expectedNoExtraDataErrorInfo = [
  " \n",
  "\x1B[91m\x1B[39m\n\x1B[91m Error: \x1B[39m",
  "\x1B[97mTESTINGERROR\x1B[39m",
  "\x1B[91m\x1B[39m\n\x1B[91m Message: \x1B[39m",
  "\x1B[97mInternal message\x1B[39m",
  "\x1B[91m\x1B[39m\n\x1B[91m Sent message:\x1B[39m",
  "\x1B[97mExternal message\x1B[39m",
  "\x1B[91m\x1B[39m\n\x1B[91m Code:\x1B[39m",
  "\x1B[97m400\x1B[39m",
  "\x1B[91m\x1B[39m\n\x1B[91m Data: \x1B[39m",
  "\x1B[97mNo Data\x1B[39m",
];
