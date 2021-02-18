import { Request, Response, NextFunction } from "express";
import { logger } from "../../utils/logger";

/**
 * Middleware to handle request errors, rather than using the default one provided by Express.
 */
export function handleErrors(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.error(err);

  const statusCode = err.status || 500;
  const errorResponse = {
    message:
      err.message ||
      "Server error, please open a service ticket if the error persists.",
  };

  res.status(statusCode).json(errorResponse);
}
