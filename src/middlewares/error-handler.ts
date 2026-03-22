import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import { AppResponse, HttpCode } from "../utils/response";
import logger from "../utils/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.code).json(AppResponse.error(err.message, err.code));
  }

  // Handle TypeORM or other unexpected errors
  logger.error("Unhandled Exception: %O", err);

  return res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .json(
      AppResponse.error(
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
      ),
    );
};
