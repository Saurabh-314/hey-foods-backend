import { Router } from "express";
import { register } from "../controller/OrderController.js"
import { auth } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(auth, register);

export default router;