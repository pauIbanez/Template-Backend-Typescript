import { NextFunction, Request, Response } from "express";
import { getInvalidAccountCreationDataError } from "../../../../data/errorObjects/accountErrors";
import accountCreationData from "../../../payloadValidators/accountCreationData";

const accountCreationDataValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const joiValidationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error, value } = accountCreationData.validate(
    req.body,
    joiValidationOptions
  );

  if (error) {
    const detailsString = error.details
      .map((detail) => detail.message)
      .join(", ");
    const invalidAccountCreationDataError = getInvalidAccountCreationDataError(
      value.superUserEmail,
      detailsString
    );

    next(invalidAccountCreationDataError);
    return;
  }
  req.body = value;
  next();
};

export default accountCreationDataValidator;
