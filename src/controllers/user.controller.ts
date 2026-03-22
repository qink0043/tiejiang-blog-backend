import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { AppResponse } from "../utils/response";

export class UserController {
  private userService = new UserService();

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.register(req.body);
      res.json(AppResponse.success(user, "Registration successful"));
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.login(req.body);
      res.json(AppResponse.success(result, "Login successful"));
    } catch (error) {
      next(error);
    }
  };

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getMe(req.user!.id);
      res.json(AppResponse.success(user));
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.update(req.user!.id, req.body);
      res.json(AppResponse.success(user, "Profile updated"));
    } catch (error) {
      next(error);
    }
  };
}
