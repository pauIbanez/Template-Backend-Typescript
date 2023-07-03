import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import TokenPayload from "../../../../types/authTypes/TokenPayload";
import {
  userSessionDuration,
  userSessionRefresh,
} from "../../../../data/server-config";

const sendToken = (req: Request, res: Response) => {
  const { userId } = res.locals; // Grab the userId from the res.locals object

  // Create the new token payload
  const tokenData: TokenPayload = {
    id: userId,
    tokenRefreshTime: userSessionRefresh,
  };

  // Create the token with the created payload
  const newToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
    expiresIn: userSessionDuration,
  });

  res.json({ token: newToken }); // send the token as the response
};

export default sendToken;
