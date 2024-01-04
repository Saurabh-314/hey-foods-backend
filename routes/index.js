import { Router } from "express";
import UserApi from "./UserApi.js";
import AddressApi from "./AddressApi.js";
import RestaurantApi from "./RestaurantApi.js";
import MenuApi from "./MenuApi.js";
import OrderApi from "./OrderApi.js";
import ItemApi from "./ItemApi.js";
import RatingApi from "./RatingApi.js";

const router = Router();

router.use("/user", UserApi);
router.use("/restaurant", RestaurantApi);
router.use("/menu", MenuApi);
router.use("/item", ItemApi);
router.use("/address", AddressApi);
router.use("/order", OrderApi);
router.use("/rating", RatingApi);

export default router;