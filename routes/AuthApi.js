import { Router } from "express";
import { register, login, sendOtp, verifyOtp, profile, profileUpdate, orderList, newPassword, changePassword, shopLogout } from "../controller/AuthController.js";
import { auth } from "../middleware/authMiddleware.js";
const router = Router();

//  email route
router.post("/register", register);
router.post("/login", login);

//  mobile number route
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);

router.route("/profile")
  .get(auth, profile)
  .patch(auth, profileUpdate)

router.route("/order").get(auth, orderList);

// forget password 
router.route("/newPassword").post(auth, newPassword);
router.route("/changePassword").post(auth, changePassword);

// logout
router.route("/shopLogout").post(auth, shopLogout);


export default router;