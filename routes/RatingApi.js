import { Router } from "express";
import { register, restaurantRating, itemRating } from "../controller/RatingController.js"
const router = Router();

router.post("/register", register);
router.get("/restaurant-rating/:id", restaurantRating);
router.get("/item-rating/:id", itemRating);

export default router;