import { HttpCode } from "./response";

export class AppError extends Error {
  public readonly code: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: HttpCode = HttpCode.INTERNAL_SERVER_ERROR,
    isOperational = true,
  ) {
    super(message);
    this.code = code;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
