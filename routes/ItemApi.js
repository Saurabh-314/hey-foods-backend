import { Router } from "express";
import { register, getItemById, updateItem, deleteItem } from "../controller/ItemController.js"
import { auth } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(auth, register);
router.route("/:id").get(auth, getItemById);
router.route("/:id").patch(auth, updateItem);
router.route("/:id").delete(auth, deleteItem);

export default router;