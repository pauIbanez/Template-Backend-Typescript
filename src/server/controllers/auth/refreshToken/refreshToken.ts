import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import TokenPayload from "../../../../types/authTypes/TokenPayload";

const refreshToken = (req: Request, res: Response) => {
  const { userId } = res.locals;

  const tokenData: TokenPayload = {
    id: userId,
  };

  const newToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
    expiresIn: "2h",
  });

  res.json({ token: newToken });
};

export default refreshToken;
