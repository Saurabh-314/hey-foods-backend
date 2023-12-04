import { Router } from "express";
import { register } from "../controller/RatingController.js"
const router = Router();

router.use("/register", register);

export default router;