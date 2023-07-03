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
import {
  userSessionDuration,
  userSessionRefresh,
} from "../../../../data/serverConfig/server-config";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const loginData: LoginData = req.body; // Grab the login data left in the body by the request validator.

  try {
    const foundUser: DatabaseUserData = await Users.findOne({
      "credentials.email": loginData.email,
    }); // Get the user from the database by email.

    // If no user matches the email write the error and go next.
    if (!foundUser) {
      const userNotFoundForEmailError = getUserNotFoundForEmailError(
        loginData.email
      );
      next(userNotFoundForEmailError);
      return;
    }

    // If the user is disabled write the error and go next.
    if (foundUser.isDisabled) {
      const userDisabledError = getUserDisabledError(foundUser.id);
      next(userDisabledError);
      return;
    }

    const invalidPasswordError = getInvalidPasswordError(foundUser.id); // Write the invalid password error.

    if (loginData.withOtp) {
      // If the request is made with OTP and the DB user does not have one go next with the invalid password error written previously.
      if (!foundUser.credentials.otpPassword) {
        next(invalidPasswordError);
        return;
      }

      // Check if the OTP is valid.
      const isPasswordValid = await bcrypt.compare(
        loginData.password,
        foundUser.credentials.otpPassword as string
      );

      // If the password is invalid go next with the invalid password error written previously.
      if (!isPasswordValid) {
        next(invalidPasswordError);
        return;
      }

      // If the password is valid erase the OTP (since it's, well, One time) and save the user back to the DB with the erases OTP.
      foundUser.credentials.otpPassword = "";
      foundUser.save();
    } else {
      // If the  DB user does not have a password go next with the invalid password error written previously.
      if (!foundUser.credentials.password) {
        next(invalidPasswordError);
        return;
      }

      // Check if the password is valid.
      const isPasswordValid = await bcrypt.compare(
        loginData.password.toString(),
        foundUser.credentials.password as string
      );

      // If the  DB user does not have a password go next with the invalid password error written previously.
      if (!isPasswordValid) {
        next(invalidPasswordError);
        return;
      }
    }

    // If every check has passed write the user id in the res.locals object and go next.
    res.locals.userId = foundUser.id;
    next();

    // // If every check is passed, write the payload with the id of the user and a token refresh time.
    // const tokenData: TokenPayload = {
    //   id: foundUser.id,
    //   tokenRefreshTime: userSessionRefresh,
    // };

    // // This created the token with the previously created payload.
    // const newToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
    //   expiresIn: userSessionDuration,
    // });
    // res.json({ token: newToken }); // Send the token as the response.
  } catch (error) {
    next(error); // If anything throws and error, pass it on to the next function.
  }
};

export default login;
