import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  getInvalidTokenError,
  getNoAuthHeaderError,
} from "../../../../data/errorObjects/authErrors";
import TokenPayload from "../../../../types/authTypes/TokenPayload";

const tokenValidator = (req: Request, res: Response, next: NextFunction) => {
  const headerAuth = req.header("Authorization");
  if (!headerAuth) {
    const noAuthHeaderError = getNoAuthHeaderError();
    next(noAuthHeaderError);
    return;
  }

  const token = headerAuth.replace("Bearer ", "");

  try {
    const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);
    const realTokenPayload = tokenPayload as TokenPayload;

    res.locals.userId = realTokenPayload.id;

    next();
  } catch (error) {
    const invalidTokenError = getInvalidTokenError();
    next(invalidTokenError);
  }
};

export default tokenValidator;
