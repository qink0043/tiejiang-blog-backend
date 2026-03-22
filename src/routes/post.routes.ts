import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { validateBody } from "../middlewares/validate";
import { CreatePostDto, UpdatePostDto } from "../dtos/post.dto";
import { auth } from "../middlewares/auth";

const router = Router();
const postController = new PostController();

router.get("/", postController.list);
router.get("/:id", postController.getOne);
router.post("/", auth, validateBody(CreatePostDto), postController.create);
router.put("/:id", auth, validateBody(UpdatePostDto), postController.update);
router.delete("/:id", auth, postController.delete);

export default router;
