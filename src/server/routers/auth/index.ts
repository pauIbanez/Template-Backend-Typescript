import express from "express";
import login from "../../middlewares/auth/login/login";
import sendToken from "../../controllers/auth/sendToken/sendToken";
import tokenValidator from "../../middlewares/auth/tokenValidator/tokenValidator";
import loginDataValidator from "../../middlewares/requestPayloadValidators/loginDataValidator/loginDataValidator";
import { endpoints } from "../../../data/serverConfig/endpoints";
import registrationDataValidator from "../../middlewares/requestPayloadValidators/registrationDataValidator/registrationDataValidator";
import registerUser from "../../middlewares/auth/registerUser/registerUser";
import createUser from "../../middlewares/auth/userCreator/userCreator";
import duplicateKeyChecker from "../../middlewares/auth/keyChecker/duplicateKeyChecker";
import keyCheckerDataValidator from "../../middlewares/requestPayloadValidators/keyCheckerDataValidator/keyCheckerDataValidator";
import verifyUser from "../../controllers/auth/verifyUser/verifyUser";
import sendVerificationEmail from "../../controllers/auth/sendVerificationEmail/sendVerificationEmail";
import userIdDataValidator from "../../middlewares/requestPayloadValidators/userIdDataValidator/userIdDataValidator";

// Router creation
const authRouter = express.Router();

// "routerEndpoints" is used here for clarity, you can also directly import "authEndpoints".
const routerEndpoints = endpoints.auth;

// Router endpoint chain

authRouter.post(routerEndpoints.login, loginDataValidator, login, sendToken);
authRouter.get(routerEndpoints.refreshToken, tokenValidator, sendToken);
authRouter.post(
  routerEndpoints.register,
  registrationDataValidator,
  createUser,
  duplicateKeyChecker,
  registerUser,
  sendVerificationEmail
);

authRouter.post(
  routerEndpoints.checkKeys,
  keyCheckerDataValidator,
  duplicateKeyChecker
);

authRouter.get(routerEndpoints.verifyUser, verifyUser);
authRouter.get(
  routerEndpoints.sendVerificationEmail,
  userIdDataValidator,
  sendVerificationEmail
);

export default authRouter;
