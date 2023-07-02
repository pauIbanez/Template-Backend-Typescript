import Joi from "joi";

const loginData = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  withOtp: Joi.boolean(),
});

export default loginData;
