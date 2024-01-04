import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import { register, restaurantRating, itemRating } from "../controller/RatingController.js"
const router = Router();

router.route("/register").post(auth, register);
router.route("/restaurant-rating/:id").get(auth, restaurantRating);
router.route("/item-rating/:id").get(auth, itemRating);

export default router;