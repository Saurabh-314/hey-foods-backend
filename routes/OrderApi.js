import { Router } from "express";
import { register } from "../controller/OrderController.js"
const router = Router();

router.use("/register", register);

export default router;