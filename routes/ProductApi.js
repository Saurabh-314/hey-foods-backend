import { Router } from "express";
import { register, getAllProduct, productById } from "../controller/ProductController.js"
const router = Router();

router.post("/register", register);
router.get("/allproduct", getAllProduct);
router.get("/:id", productById);

export default router;