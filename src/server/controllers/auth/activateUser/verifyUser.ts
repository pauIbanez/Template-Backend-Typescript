import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users from "../../../../database/models/Users";
import { ActivationTokenPayload } from "../../../../types/authTypes/TokenPayload";
import {
  getAlreadyActivatedError,
  getUserNotFoundForIdError,
} from "../../../../data/errorObjects/userErrors";
import { getInvalidVerificationTokenError } from "../../../../data/errorObjects/authErrors";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { verificationToken } = req.params; // Get the activationToken from the request parameters

    let extractedId;

    try {
      const tokenPayload = jwt.verify(
        verificationToken,
        process.env.TOKEN_SECRET
      ); // Verify the token
      extractedId = (tokenPayload as ActivationTokenPayload).id; // Extract the token payload
    } catch (error) {
      // If the validation does not pass write the error and go next.
      const invalidTokenError = getInvalidVerificationTokenError();
      next(invalidTokenError);
    }

    const foundUser = await Users.findById(extractedId);

    if (!foundUser) {
      const userNotFoundError = getUserNotFoundForIdError(extractedId);
      next(userNotFoundError);
      return;
    }

    if (!foundUser.verificationToken) {
      const userAlreadyActiveError = getAlreadyActivatedError(extractedId);
      next(userAlreadyActiveError);
      return;
    }

    delete foundUser.verificationToken;
    foundUser.save();

    res.status(200).json({
      message: "User verificated!",
    });
  } catch (error) {
    // If that's not the error simply go next
    next(error);
  }
};

export default verifyUser;
