import express from "express";
import authenticationRouter from "./auth/index";

const mainRouter = express.Router();

mainRouter.use("/auth", authenticationRouter);

export default mainRouter;
