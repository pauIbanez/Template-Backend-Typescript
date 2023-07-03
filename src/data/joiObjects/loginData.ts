import Joi from "joi";

const loginData = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  withOtp: Joi.boolean(),
});

export default loginData;
