import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateBody } from "../middlewares/validate";
import { RegisterDto, LoginDto, UpdateUserDto } from "../dtos/user.dto";
import { auth } from "../middlewares/auth";

const router = Router();
const userController = new UserController();

router.post("/register", validateBody(RegisterDto), userController.register);
router.post("/login", validateBody(LoginDto), userController.login);
router.get("/me", auth, userController.getMe);
router.put("/me", auth, validateBody(UpdateUserDto), userController.update);

export default router;
