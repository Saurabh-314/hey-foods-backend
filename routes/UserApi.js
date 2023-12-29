import { Router } from "express";
import { register, login, profile, profileUpdate } from "../controller/UserController.js";
import { auth, adminOnly } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);


router.route("/profile")
  .get(auth, profile)
  .patch(auth, profileUpdate)


// router.route("/alluser").get(adminOnly, allUser)
// router.route("/allmenu").get(adminOnly, allMenu)
// router.get("/:id", getUserById)


export default router;