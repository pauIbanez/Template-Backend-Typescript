import Joi from "joi";

const registrationData = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  picture: Joi.string().required(),
  password: Joi.string().min(8).required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
});

export default registrationData;
