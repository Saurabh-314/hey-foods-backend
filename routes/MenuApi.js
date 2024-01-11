import { register, updateMenu, deleteMenu, allMenu } from "../controller/MenuController.js";
import { Router } from "express";
import { restaurantAuth } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(restaurantAuth, register);
router.route("/allMenu").get(allMenu);
router.route("/").patch(restaurantAuth, updateMenu);
router.route("/").delete(restaurantAuth, deleteMenu);

export default router;