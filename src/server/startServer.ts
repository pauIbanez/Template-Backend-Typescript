import debug from "debug";
import { Application } from "express";
import ServerError from "../types/errorTypes/ServerError";

const debugInConsole = debug("backend-template:server");

const startServer = (port: string, app: Application): Promise<void> =>
  new Promise((resolve, reject) => {
    const newPort = +port;
    const server = app.listen(newPort, () => {
      const portString: string = newPort === 80 ? "" : `:${newPort}`;
      debugInConsole(`Server listening on http://localhost${portString}`);
      resolve();
    });

    server.on("error", (error: ServerError) => {
      const messageString =
        error.code === "EADDRINUSE" ? ` Port ${port} in use` : error.message;

      const errorMessage = `Couldn't start the server. ${messageString}`;
      reject(new Error(errorMessage));
    });
  });

export default startServer;
