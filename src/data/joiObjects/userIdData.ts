import Joi from "joi";
import { JoiObjectId } from "./joiTypes";

const userIdData = Joi.object({
  userId: JoiObjectId().message("Invalid user id"),
});

export default userIdData;
