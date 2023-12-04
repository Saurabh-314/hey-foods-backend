import { register } from "../controller/AddressController.js";
import { Router } from "express";
const router = Router();

router.use("/register", register)

export default router;