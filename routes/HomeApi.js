import { Router } from "express";
import { getAllProducts, findMyProduct } from "../controller/HomeController.js";
import { auth } from "../middleware/authMiddleware.js";
const router = Router();

router.get("/getAllProducts", getAllProducts);
router.get("/findMyProduct", findMyProduct);

export default router;