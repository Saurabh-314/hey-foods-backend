import { Router } from "express";
import { register, getAllItems, getItemById, updateItem, deleteItem } from "../controller/ItemController.js"
import { restaurantAuth } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(restaurantAuth, register);
router.route("/getAllItems").get(getAllItems);
router.route("/:id").get(getItemById);
router.route("/:id").patch(restaurantAuth, updateItem);
router.route("/:id").delete(restaurantAuth, deleteItem);

export default router;