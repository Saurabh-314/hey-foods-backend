import { Router } from "express";
import { profile, profileUpdate, restaurantApproval } from "../controller/AdminController.js";
import { auth, restrict } from "../middleware/authMiddleware.js";
const router = Router();


router.route("/profile")
  .get(restrict('admin'), profile)
  .patch(restrict('admin'), profileUpdate)

router.patch("/restaurant-approval-requrest/:id", auth, restrict('admin'), restaurantApproval)

export default router;