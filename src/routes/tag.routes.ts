import { Router } from "express";
import { TagController } from "../controllers/tag.controller";
import { validateBody } from "../middlewares/validate";
import { CreateTagDto } from "../dtos/meta.dto";
import { auth } from "../middlewares/auth";

const router = Router();
const tagController = new TagController();

router.post("/", auth, validateBody(CreateTagDto), tagController.create);
router.get("/", tagController.list);
router.delete("/:id", auth, tagController.delete);

export default router;
