import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import { HttpCode } from "../utils/response";

export const validateBody = (dto: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const output = plainToInstance(dto, req.body);
    const errors = await validate(output);

    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) => Object.values(error.constraints || {}))
        .flat()
        .join(", ");
      return next(new AppError(message, HttpCode.BAD_REQUEST));
    }

    req.body = output;
    next();
  };
};
