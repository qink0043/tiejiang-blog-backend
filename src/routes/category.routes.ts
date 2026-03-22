import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { validateBody } from "../middlewares/validate";
import { CreateCategoryDto } from "../dtos/meta.dto";
import { auth } from "../middlewares/auth";

const router = Router();
const categoryController = new CategoryController();

router.post(
  "/",
  auth,
  validateBody(CreateCategoryDto),
  categoryController.create,
);
router.get("/", categoryController.list);

export default router;
