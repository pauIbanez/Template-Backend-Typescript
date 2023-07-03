import chalk from "chalk";
import debug from "debug";
import { NextFunction, Request, Response } from "express";

import { buiildResponseError } from "../../../../data/errorObjects/responseErrors";
import ControledError from "../../../../data/errorObjects/controledError";

const debugToConsole = debug("backend-template:errorHandler");

const errorsHandler = (
  err: ControledError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  // Grab the controled error code and message or add the Internal server one in case of uncontroled error
  const code = err.statusCode || 500;
  const message = err.messageToSend || "Internal server error";

  const errorToSend = buiildResponseError(code, message); // Build the response error with the wanted info

  // If the error is uncontroled show in console -> Recommended to change to an acual logger
  if (!err.controled) {
    debugToConsole(
      chalk.redBright(`Unhandled error found!: \n ${err.message}`)
    );
  }
  res.status(code).json(errorToSend); // Send the response with the error and code
};

export default errorsHandler;
