import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../../../../database/models/Users";
import LoginData from "../../../../types/authTypes/loginData";
import {
  getInvalidPasswordError,
  getUserDisabledError,
  getUserNotFoundForEmailError,
} from "../../../../data/errorObjects/userErrors";

import DatabaseUserData from "../../../../types/userTypes/DatabaseUserData";
import TokenPayload from "../../../../types/authTypes/TokenPayload";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const loginData: LoginData = req.body;

  try {
    const foundUser: DatabaseUserData = await Users.findOne({
      "credentials.email": loginData.email,
    });

    if (!foundUser) {
      const userNotFoundForEmailError = getUserNotFoundForEmailError(
        loginData.email
      );
      next(userNotFoundForEmailError);
      return;
    }

    if (foundUser.isDisabled) {
      const userDisabledError = getUserDisabledError(foundUser.id);
      next(userDisabledError);
      return;
    }

    const invalidPasswordError = getInvalidPasswordError(foundUser.id);

    if (loginData.withOtp) {
      if (!foundUser.credentials.otpPassword) {
        next(invalidPasswordError);
        return;
      }

      const isPasswordValid = await bcrypt.compare(
        loginData.password,
        foundUser.credentials.otpPassword as string
      );

      if (!isPasswordValid) {
        next(invalidPasswordError);
        return;
      }

      foundUser.credentials.otpPassword = "";
      foundUser.save();
    } else {
      if (!foundUser.credentials.password) {
        next(invalidPasswordError);
        return;
      }

      const isPasswordValid = await bcrypt.compare(
        loginData.password.toString(),
        foundUser.credentials.password as string
      );

      if (!isPasswordValid) {
        next(invalidPasswordError);
        return;
      }
    }

    const tokenData: TokenPayload = {
      id: foundUser.id,
    };

    const newToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
    });
    res.json({ token: newToken });
  } catch (error) {
    next(error);
  }
};

export default login;
