import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import EmailData from "../../../utils/email/types";
import getUserVerificationEmail from "../../../utils/email/emailBuilders/userActivationEmail";
import sendEmail from "../../../utils/email";
import Users from "../../../../database/models/Users";
import { getUserNotFoundForIdError } from "../../../../data/errorObjects/userErrors";
import { ActivationTokenPayload } from "../../../../types/authTypes/TokenPayload";
import { userActivationExpirationInHours } from "../../../../data/serverConfig/server-config";

const sendVerificationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { registration } = res.locals;
    const { userId } = req.body;

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

        user = foundUser;
      } catch (err) {
        next(err);
      }
    }

    // Create the activationToken Payload.
    const tokenData: ActivationTokenPayload = {
      id: user.id,
    };

    let verificationToken;

    try {
      // Create the token with the created payload.
      verificationToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: `${userActivationExpirationInHours}h`,
      });
    } catch (tokenError) {
      const extensiveError = { ...tokenError };
      extensiveError.regard = "Token";
      throw extensiveError;
    }

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

    try {
      await sendEmail(emailData);
    } catch (emailError) {
      const extensiveError = { ...emailError };
      extensiveError.regard = "Email";
      throw extensiveError;
    }

    const responses = {
      registration: {
        code: 201,
        message: "User registered sucessfully!",
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
