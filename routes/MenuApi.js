import { register } from "../controller/MenuController.js";
import { Router } from "express";
const router = Router();

router.use("/register", register);

export default router;