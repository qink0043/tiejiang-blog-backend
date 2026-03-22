import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/category.service";
import { AppResponse } from "../utils/response";

export class CategoryController {
  private categoryService = new CategoryService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryService.create(req.body);
      res.json(AppResponse.success(category));
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.categoryService.list();
      res.json(AppResponse.success(categories));
    } catch (error) {
      next(error);
    }
  };
}
