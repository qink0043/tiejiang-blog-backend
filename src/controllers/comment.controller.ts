import { Request, Response, NextFunction } from "express";
import { CommentService } from "../services/comment.service";
import { AppResponse } from "../utils/response";

export class CommentController {
  private commentService = new CommentService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comment = await this.commentService.create(req.body, req.user!);
      res.json(AppResponse.success(comment));
    } catch (error) {
      next(error);
    }
  };

  listByPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comments = await this.commentService.listByPost(
        Number(req.params.postId),
      );
      res.json(AppResponse.success(comments));
    } catch (error) {
      next(error);
    }
  };
}
