import { Router } from "express"
import { registerUser } from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const router = Router()

router.route("/register").post(upload.single("profilepic"), registerUser)
// router.route("/login").post(registerUser)

export default router
