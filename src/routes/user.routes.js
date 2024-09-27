import { Router } from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import verifyJWT from "../middleware/auth.middleware.js"

const router = Router()

router.route("/register").post(upload.single("profilepic"), registerUser)
router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)

export default router
