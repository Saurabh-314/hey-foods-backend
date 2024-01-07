import { Router } from "express";
import { register, login, profile, profileUpdate, orderList } from "../controller/AuthController.js";
import { auth } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);

router.route("/profile")
  .get(auth, profile)
  .patch(auth, profileUpdate)

router.route("/order").get(auth, orderList);


export default router;