import { Router } from "express";
import { shopRegister, shopLogin, shopInfo, shopUpdate, shopDelete, allCompleteOrders, orderDetails, newOrder, settlePayments, pendingPayment, shopLogout, changePassword, forgetPassword, shopMenuList, shopItemList, shopCategory } from "../controller/RestaurantController.js";
import { restaurantAuth } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/register", shopRegister);
router.post("/login", shopLogin); // user can login with emailID or mobile Number

router.route("/info")
  .get(restaurantAuth, shopInfo)
  .patch(restaurantAuth, shopUpdate)
  .delete(restaurantAuth, shopDelete)

router.route("/category").get(restaurantAuth, shopCategory);
router.route("/shopmenu").get(restaurantAuth, shopMenuList);
router.route("/shopitems").get(restaurantAuth, shopItemList);
router.route("/neworder").get(restaurantAuth, newOrder);
router.route("/orderdetails").get(restaurantAuth, orderDetails);
router.route("/allcompleteorder").get(restaurantAuth, allCompleteOrders);
router.route("/settlePayment").patch(restaurantAuth, settlePayments);
router.route("/pendingpayments").get(restaurantAuth, pendingPayment);
router.route("/changepassword").patch(restaurantAuth, changePassword);
router.route("/forgetpassword").post(restaurantAuth, forgetPassword);
router.route("/logout").post(restaurantAuth, shopLogout);

export default router;