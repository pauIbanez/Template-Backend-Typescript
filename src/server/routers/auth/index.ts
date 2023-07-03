import express from "express";
import login from "../../controllers/auth/login/login";
import refreshToken from "../../controllers/auth/refreshToken/refreshToken";
import tokenValidator from "../../middlewares/auth/tokenValidator/tokenValidator";
import loginDataValidator from "../../middlewares/requestPayloadValidators/loginDataValidator/loginDataValidator";
import { endpoints } from "../../../data/server-config";

// Router creation
const router = express.Router();

// "routerEndpoints" is used here for clarity, you can also directly import "authEndpoints".
const routerEndpoints = endpoints.auth;

// Router endpoint chain

router.post(routerEndpoints.login, loginDataValidator, login);
router.get(routerEndpoints.refreshToken, tokenValidator, refreshToken);

export default router;
