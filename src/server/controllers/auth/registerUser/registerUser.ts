import { NextFunction, Request, Response } from "express";
import Users from "../../../../database/models/Users";
import { CreatedUserData } from "../../../../types/userTypes/UserData";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser: CreatedUserData = req.body; // Get the user data from the req.body

    const createdUser = await Users.create(newUser); // Create the user in the Database.

    res.locals.registration = true;
    res.locals.user = createdUser;

    next();
  } catch (error) {
    // If that's not the error simply go next
    next(error);
  }
};

export default registerUser;
