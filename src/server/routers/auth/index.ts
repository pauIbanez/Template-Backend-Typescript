import express from "express";
import login from "../../middlewares/auth/login/login";
import sendToken from "../../controllers/auth/sendToken/sendToken";
import tokenValidator from "../../middlewares/auth/tokenValidator/tokenValidator";
import loginDataValidator from "../../middlewares/requestPayloadValidators/loginDataValidator/loginDataValidator";
import { endpoints } from "../../../data/serverConfig/endpoints";

// Router creation
const router = express.Router();

// "routerEndpoints" is used here for clarity, you can also directly import "authEndpoints".
const routerEndpoints = endpoints.auth;

// Router endpoint chain

router.post(routerEndpoints.login, loginDataValidator, login, sendToken);
router.get(routerEndpoints.refreshToken, tokenValidator, sendToken);

export default router;
