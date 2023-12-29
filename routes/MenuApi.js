import { register, updateMenu, deleteMenu, getProductByMenuId } from "../controller/MenuController.js";
import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(auth, register);
router.route("/:id").patch(auth, updateMenu);
router.route("/:id").delete(auth, deleteMenu);
router.route("/products/:id").get(auth, getProductByMenuId);

export default router;