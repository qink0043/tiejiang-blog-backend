import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app-error";
import { HttpCode } from "../utils/response";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/user.entity";

interface JwtPayload {
  id: number;
}

// Extend Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new AppError("Authentication required", HttpCode.UNAUTHORIZED);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret",
    ) as JwtPayload;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: decoded.id } });

    if (!user) {
      throw new AppError("User not found", HttpCode.UNAUTHORIZED);
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", HttpCode.UNAUTHORIZED));
  }
};
