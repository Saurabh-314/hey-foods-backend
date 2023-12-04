import { register } from "../controller/MenuController.js";
import { Router } from "express";
const router = Router();

router.post("/register", register);

export default router;