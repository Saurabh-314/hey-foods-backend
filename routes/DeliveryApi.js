import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import { newOrder, orderApproval } from "../controller/DeliveryController.js";
const router = Router();

router.route("/newOrder").get(auth, newOrder);
router.route("/acceptOrder").patch(auth, orderApproval);

export default router;