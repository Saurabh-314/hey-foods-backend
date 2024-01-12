import { Router } from "express";
import AdminApi from "./AdminApi.js";
import AuthApi from "./AuthApi.js";
import AddressApi from "./AddressApi.js";
import RestaurantApi from "./RestaurantApi.js";
import MenuApi from "./MenuApi.js";
import OrderApi from "./OrderApi.js";
import ItemApi from "./ItemApi.js";
import RatingApi from "./RatingApi.js";
import DeliveryApi from "./DeliveryApi.js";

const router = Router();

router.use("/admin", AdminApi);
router.use("/auth", AuthApi);
router.use("/restaurant", RestaurantApi);
router.use("/menu", MenuApi);
router.use("/item", ItemApi);
router.use("/address", AddressApi);
router.use("/order", OrderApi);
router.use("/rating", RatingApi);
router.use("/delivery", DeliveryApi);

export default router;