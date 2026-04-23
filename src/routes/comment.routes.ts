import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { validateBody } from "../middlewares/validate";
import { CreateCommentDto } from "../dtos/comment.dto";

const router = Router();
const commentController = new CommentController();

router.get("/post/:postId", commentController.listByPost);
router.post("/", validateBody(CreateCommentDto), commentController.create);

export default router;
