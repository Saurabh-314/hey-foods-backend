import { Router } from "express";
import { shopRegister, shopLogin, shopInfo, shopUpdate, shopDelete, allCompleteOrders, orderDetails, newOrder, settlePayment, pendingPayment, shopLogout, changePassword, forgetPassword, shopMenuList, shopItemList, shopCategory } from "../controller/RestaurantController.js";
import { restaurantAuth } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/register", shopRegister);
router.post("/login", shopLogin); // user can login with emailID or mobile Number

router.route("/info")
  .get(restaurantAuth, shopInfo)
  .patch(restaurantAuth, shopUpdate)
  .delete(restaurantAuth, shopDelete)

router.route("/category").get(restaurantAuth, shopCategory);
router.route("/menu").get(restaurantAuth, shopMenuList);
router.route("/items").get(restaurantAuth, shopItemList);
router.route("/newOrder").get(restaurantAuth, newOrder);
router.route("/orderDetails").get(restaurantAuth, orderDetails);
router.route("/allCompleteOrder").get(restaurantAuth, allCompleteOrders);
router.route("/settlePayment").patch(restaurantAuth, settlePayment);
router.route("/pendingPayments").get(restaurantAuth, pendingPayment);
router.route("/changePassword").patch(restaurantAuth, changePassword);
router.route("/forgetPassword").post(restaurantAuth, forgetPassword);
router.route("/logout").post(restaurantAuth, shopLogout);

export default router;