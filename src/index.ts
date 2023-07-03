/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import dotenv from "dotenv";
dotenv.config();

import debug from "debug";
import chalk from "chalk";
import startServer from "./server/startServer";
import app from "./server";
import connectToDB from "./database";

const debugInConsole = debug("backend-template:root"); // Debug section setup

// Enviroment varialbe grab
const port = process.env.PORT || "4000";
const connectionString = process.env.CONN_STRING;

// Services initialization
(async () => {
  try {
    debugInConsole(chalk.white("Starting server..."));
    await startServer(port, app); // Start the server
    await connectToDB(connectionString); // start the DB connection
  } catch (error) {
    debugInConsole(`Error: ${error.message}`); // Debug any startup failiures to the console
  }
})();
