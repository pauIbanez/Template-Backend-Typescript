import express from "express";
import login from "../../controllers/auth/login/login";
import refreshToken from "../../controllers/auth/refreshToken/refreshToken";
import tokenValidator from "../../middlewares/auth/tokenValidator/tokenValidator";
import loginDataValidator from "../../middlewares/requestPayloadValidators/loginDataValidator/loginDataValidator";

const router = express.Router();

router.post("/login", loginDataValidator, login);
router.get("/refreshToken", tokenValidator, refreshToken);

export default router;
