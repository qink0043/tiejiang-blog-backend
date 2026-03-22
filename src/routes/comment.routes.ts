import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { validateBody } from "../middlewares/validate";
import { CreateCommentDto } from "../dtos/comment.dto";
import { auth } from "../middlewares/auth";

const router = Router();
const commentController = new CommentController();

router.get("/post/:postId", commentController.listByPost);
router.post(
  "/",
  auth,
  validateBody(CreateCommentDto),
  commentController.create,
);

export default router;
