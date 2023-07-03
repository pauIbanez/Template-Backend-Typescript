/* eslint-disable no-param-reassign */

import mongoose from "mongoose";
import debug from "debug";
import chalk from "chalk";

const debugInConsole = debug("backend-template:database"); // Debug section setup

// This promise resolved when the DB connection starts correctly and rejects if there is an error
const connectToDB = (connectionString: string | undefined): Promise<void> =>
  new Promise((resolve, reject) => {
    debugInConsole(chalk.whiteBright("Connecting to database..."));
    mongoose
      .connect(connectionString)
      .then(() => {
        debugInConsole(
          chalk.whiteBright("Connection to database ") +
            chalk.greenBright("SUCCESSFULL")
        );
        resolve(); // Resolve on correct connection
      })
      .catch((error) => {
        const newError = {
          ...error,
          message: `Database error: ${error.message}`,
        };
        reject(newError); // Reject with an error on failiure
      });
  });

// These are global mongoose settings on JSON convert
mongoose.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

export default connectToDB;
