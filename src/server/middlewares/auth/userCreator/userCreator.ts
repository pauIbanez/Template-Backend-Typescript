import { NextFunction, Request, Response } from "express";
import hashPassword from "../../../utils/auth/hashPassword/hashPassword";
import RegistrationData from "../../../../types/userTypes/RegistrationData";
import { CreatedUserData } from "../../../../types/userTypes/UserData";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  // Get the Registration data from the request body object.
  const {
    email,
    firstName,
    lastName,
    password,
    phoneNumber,
    picture,
    username,
  }: RegistrationData = req.body;

  try {
    const hashedPassword = await hashPassword(password); // Hash the new user's password.

    // Create the new user object.
    const newUser: CreatedUserData = {
      information: {
        email,
        firstName,
        lastName,
        phoneNumber,
        picture,
        username,
      },
      isDisabled: false,
      resetPasswordOnLogin: false,

      credentials: {
        username,
        email,
        password: hashedPassword,
      },
    };

    // Replace the req.body with the new user object and go next.
    req.body = newUser;
    next();
  } catch (error) {
    next(error); // If anything fails go next with an error.
  }
};

export default createUser;
