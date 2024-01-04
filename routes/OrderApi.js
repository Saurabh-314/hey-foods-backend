import { Router } from "express";
import { register, allOrder, getOrderById } from "../controller/OrderController.js"
import { auth } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(auth, register);
router.route("/allorder").get(auth, allOrder);
router.route("/singleorder/:id").get(auth, getOrderById);

export default router;