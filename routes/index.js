import { Router } from "express";
import AuthApi from "./AuthApi.js";
import AddressApi from "./AddressApi.js";
import RestaurantApi from "./RestaurantApi.js";
import MenuApi from "./MenuApi.js";

const router = Router();

router.get("/check", (req, res) => {
  res.status(200).json({ msg: "working fine" });
})
router.use("/auth", AuthApi);
router.use("/address",AddressApi);
router.use("/restaurant",RestaurantApi);
router.use("/menu",MenuApi);

export default router;