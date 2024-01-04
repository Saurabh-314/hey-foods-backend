import { register, getAddress, updateAddress, deleteAddress } from "../controller/AddressController.js";
import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(auth, register)
router.route("/").get(auth, getAddress);
router.route("/:id")
  .patch(auth, updateAddress)
  .delete(auth, deleteAddress)

export default router;