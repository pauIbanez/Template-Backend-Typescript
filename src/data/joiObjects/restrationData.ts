import Joi from "joi";

const registrationData = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  picture: Joi.string().required(),
  phoneNumber: Joi.string()
    .regex(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    )
    .required(),
  password: Joi.string().min(8).required(),
});

export default registrationData;
