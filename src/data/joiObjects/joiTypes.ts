/* eslint-disable import/prefer-default-export */

import Joi from "joi";

// export const JoiObjectId = (message?: string) =>
//   Joi.alternatives(
//     Joi.string()
//       .regex(/^[0-9a-fA-F]{24}$/, message)
//       .length(24),
//     Joi.object().keys({
//       _bsontype: Joi.allow("ObjectId"),
//     })
//   );

export const JoiObjectId = (message?: string) =>
  Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);
