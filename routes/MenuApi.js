import { register, updateMenu, deleteMenu, getMenu } from "../controller/MenuController.js";
import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(auth, register);
router.route("/allmenu").get(auth, getMenu);
router.route("/:id").patch(auth, updateMenu);
router.route("/:id").delete(auth, deleteMenu);

export default router;