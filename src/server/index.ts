import express from "express";
import errorsHandler from "./middlewares/errors/errorsHandler/errorsHandler";
import notFoundError from "./middlewares/errors/notFoundError/notFoundError";
import mainRouter from "./routers";

const morgan = require("morgan");
const cors = require("cors");
const { default: helmet } = require("helmet");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use(mainRouter);

app.use(notFoundError);
app.use(errorsHandler);

export default app;
