import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import EmailData from "../../../utils/email/types";
import getUserVerificationEmail from "../../../utils/email/emailBuilders/userVerificationEmail";
import sendEmail from "../../../utils/email";
import Users from "../../../../database/models/Users";
import {
  getAlreadyActivatedError,
  getUserNotFoundForIdError,
} from "../../../../data/errorObjects/userErrors";
import { ActivationTokenPayload } from "../../../../types/authTypes/TokenPayload";
import { userActivationExpirationInHours } from "../../../../data/serverConfig/server-config";
import { getFailToSendVerificationEmailError } from "../../../../data/errorObjects/authErrors";

const sendVerificationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { registration } = res.locals;
    const { userId } = res.locals;

    let user;

    if (registration) {
      user = res.locals.createdUser;
    } else {
      try {
        const foundUser = await Users.findById(userId);
        if (!foundUser) {
          const userNotFoundError = getUserNotFoundForIdError(userId);
          next(userNotFoundError);
          return;
        }

        if (!foundUser.verificationToken) {
          const userAlreadyActiveError = getAlreadyActivatedError(userId);
          next(userAlreadyActiveError);
          return;
        }

        user = foundUser;
      } catch (err) {
        next(err);
      }
    }

    // Create the activationToken Payload.
    const tokenData: ActivationTokenPayload = {
      id: user.id,
    };

    // Create the token with the created payload.
    const verificationToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: `${userActivationExpirationInHours}h`,
    });

    // Add the verificationToken to the created user and save it.
    user.verificationToken = verificationToken;
    user.save();

    // Create the emailData object for the mail function.
    const emailData: EmailData = {
      html: getUserVerificationEmail(verificationToken),
      internalEmailName: "User Activation email",
      subject: `Hey ${user.information.username}! Activate your account!`,
      to: user.information.email,
    };

    let emailCorrectlySent = true;

    try {
      await sendEmail(emailData);
    } catch (err) {
      if (!registration) {
        const emailFailedToSendError = getFailToSendVerificationEmailError(err);
        next(emailFailedToSendError);
        return;
      }
      emailCorrectlySent = false;
    }

    const responses = {
      registration: {
        code: 201,
        message: "User registered sucessfully!",
        verificationTokenEmailSent: emailCorrectlySent,
      },
      noRegistration: {
        code: 200,
        message: "Verification email sent!",
      },
    };

    const response = registration
      ? responses.registration
      : responses.noRegistration;

    res.status(response.code).json({
      message: response.message,
    });
  } catch (error) {
    // If that's not the error simply go next
    next(error);
  }
};

export default sendVerificationEmail;
