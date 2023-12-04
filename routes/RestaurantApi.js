import { Router } from "express";
import { register } from "../controller/RestaurantController.js";
const router = Router();

router.use("/register", register);

export default router;