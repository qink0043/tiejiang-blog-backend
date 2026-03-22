import { Request, Response, NextFunction } from "express";
import { TagService } from "../services/tag.service";
import { AppResponse } from "../utils/response";

export class TagController {
  private tagService = new TagService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tag = await this.tagService.create(req.body);
      res.json(AppResponse.success(tag));
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tags = await this.tagService.list();
      res.json(AppResponse.success(tags));
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.tagService.delete(Number(req.params.id));
      res.json(AppResponse.success(null, "Tag deleted"));
    } catch (error) {
      next(error);
    }
  };
}
