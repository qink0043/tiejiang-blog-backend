import { Request, Response, NextFunction } from "express";
import { PostService } from "../services/post.service";
import { AppResponse } from "../utils/response";

export class PostController {
  private postService = new PostService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postService.create(req.body, req.user!);
      res.json(AppResponse.success(post));
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.postService.list({
        ...req.query,
        categoryId: req.query.categoryId
          ? Number(req.query.categoryId)
          : undefined,
        tagId: req.query.tagId ? Number(req.query.tagId) : undefined,
        page: req.query.page ? Number(req.query.page) : 1,
        page_size: req.query.page_size ? Number(req.query.page_size) : 10,
      });
      res.json(AppResponse.success(result));
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postService.getOne(Number(req.params.id));
      res.json(AppResponse.success(post));
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postService.update(
        Number(req.params.id),
        req.body,
      );
      res.json(AppResponse.success(post));
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.postService.delete(Number(req.params.id));
      res.json(AppResponse.success(null, "Post deleted"));
    } catch (error) {
      next(error);
    }
  };
}
