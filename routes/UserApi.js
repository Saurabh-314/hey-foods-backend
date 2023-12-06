import { Router } from "express";
import { register, login,getUserById } from "../controller/UserController.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/:id", getUserById)

export default router;