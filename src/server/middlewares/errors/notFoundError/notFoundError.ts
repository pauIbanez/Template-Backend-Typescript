import { Request, Response } from "express";

const notFoundError = (_req: Request, res: Response) => {
  const notFoundErrorResponse = {
    error: true,
    code: 404,
    message: "Resource not found",
  };

  res.status(404).json(notFoundErrorResponse);
};

export default notFoundError;
