import { register,getAddress } from "../controller/AddressController.js";
import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(auth, register)
router.route("/getaddress").get(auth, getAddress);

export default router;