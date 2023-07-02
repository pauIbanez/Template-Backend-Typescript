import chalk from "chalk";
import debug from "debug";
import { NextFunction, Request, Response } from "express";
import ServerError from "../../../../types/errorTypes/ServerError";

const debugToConsole = debug("mymenu:a");

const errorsHandler = (
  err: ServerError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  const code = err.statusCode || 500;
  const message = err.messageToSend || "Internal server error";

  const errorToSend = {
    error: true,
    code,
    message,
  };

  if (!err.messageToSend) {
    debugToConsole(
      chalk.redBright(`Unhandled error found!: \n ${err.message}`)
    );
  }
  res.status(code).json(errorToSend);
};

export default errorsHandler;
