import { Router } from "express";
import { shopRegister, shopLogin, shopInfo, shopUpdate, shopDelete, allCompleteOrders, orderDetails, newOrder, settlePayments, pendingPayment, shopLogout, changePassword, forgetPassword, shopMenuList, shopCategory } from "../controller/RestaurantController.js";
import { auth } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/register", shopRegister);
router.post("/login", shopLogin);

router.route("/info")
  .get(auth, shopInfo)
  .patch(auth, shopUpdate)
  .delete(auth, shopDelete)

router.route("/category").get(auth, shopCategory);
router.route("/shopmenu").get(auth, shopMenuList);
router.route("/neworders").get(auth, newOrder);
router.route("/orderdetails").get(auth, orderDetails);
router.route("/allcompleteorder").get(auth, allCompleteOrders);
router.route("/settlepayments").get(auth, settlePayments);
router.route("/pendingpayments").get(auth, pendingPayment);
router.route("/changepassword").get(auth, changePassword);
router.route("/forgetpassword").get(auth, forgetPassword);
router.route("/logout").get(auth, shopLogout);

export default router;