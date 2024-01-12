import { Router } from "express";
import { register, getOrderById } from "../controller/OrderController.js"
import { auth } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(auth, register);
router.route("/singleOrder").get(auth, getOrderById);

export default router;