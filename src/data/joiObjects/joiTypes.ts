/* eslint-disable import/prefer-default-export */

import Joi from "joi";

export const JoiObjectId = (message?: string) =>
  Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);
