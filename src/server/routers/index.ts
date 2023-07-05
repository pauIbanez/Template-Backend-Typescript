import express from "express";
import authenticationRouter from "./auth/index";
// import tokenValidator from "../middlewares/auth/tokenValidator/tokenValidator";

const mainRouter = express.Router();

mainRouter.use("/auth", authenticationRouter);

// mainRouter.use(tokenValidator);
// protected routers here

export default mainRouter;
