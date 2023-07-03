/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import dotenv from "dotenv";
dotenv.config();

import debug from "debug";
import chalk from "chalk";
import startServer from "./server/startServer";
import app from "./server";
import connectToDB from "./database";

const debugInConsole = debug("mymenu:root");

const port = process.env.PORT || "4000";
const connectionString = process.env.CONN_STRING;

(async () => {
  try {
    debugInConsole(chalk.white("Starting server..."));
    await startServer(port, app);
    await connectToDB(connectionString);
  } catch (error) {
    debugInConsole(`Error: ${error.message}`);
  }
})();