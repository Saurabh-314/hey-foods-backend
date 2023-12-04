import { Router } from "express";
import { register } from "../controller/OrderController.js"
const router = Router();

router.post("/register", register);

export default router;