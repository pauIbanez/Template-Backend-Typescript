import { Request, Response } from "express";
import { getNotFoundError } from "../../../../data/notFoundError";

const notFoundError = (_req: Request, res: Response) => {
  const notFoundErrorResponse = getNotFoundError();

  res.status(404).json(notFoundErrorResponse);
};

export default notFoundError;
