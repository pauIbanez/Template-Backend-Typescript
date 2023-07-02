import { NextFunction, Request, Response } from "express";
import { getInvalidLoginDataError } from "../../../../data/errorObjects/dataValidationErrors";
import loginData from "../../../../data/joiObjects/loginData";

const loginDataValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const joiValidationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error, value } = loginData.validate(req.body, joiValidationOptions);

  if (error) {
    const invalidLoginDataError = getInvalidLoginDataError(
      error.details.map((detail) => detail.message).join(", ")
    );
    next(invalidLoginDataError);
    return;
  }
  req.body = value;
  next();
};

export default loginDataValidator;
