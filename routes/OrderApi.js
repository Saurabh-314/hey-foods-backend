import { Router } from "express";
import { register, getOrderById } from "../controller/OrderController.js"
import { auth } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(auth, register);
router.route("/single-order/:id").get(auth, getOrderById);

export default router;