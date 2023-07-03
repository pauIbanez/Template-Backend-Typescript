import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import TokenPayload from "../../../../types/authTypes/TokenPayload";
import {
  userSessionDuration,
  userSessionRefresh,
} from "../../../../data/server-config";

const refreshToken = (req: Request, res: Response) => {
  const { userId } = res.locals;

  const tokenData: TokenPayload = {
    id: userId,
    tokenRefreshTime: userSessionRefresh,
  };

  const newToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
    expiresIn: userSessionDuration,
  });

  res.json({ token: newToken });
};

export default refreshToken;
