import { NextFunction, Request, Response } from "express";
import { getInvalidRegistrationDataError } from "../../../../data/errorObjects/dataValidationErrors";
import registrationData from "../../../../data/joiObjects/restrationData";

const registrationDataValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accountId, userId } = res.locals;

  const joiValidationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error, value } = registrationData.validate(
    req.body,
    joiValidationOptions
  );

  if (error) {
    const detailsString = error.details
      .map((detail) => detail.message)
      .join(", ");
    const invalidRegistrationdataDataError = getInvalidRegistrationDataError(
      accountId,
      userId,
      detailsString
    );

    next(invalidRegistrationdataDataError);
    return;
  }
  req.body = value;
  next();
};

export default registrationDataValidator;
