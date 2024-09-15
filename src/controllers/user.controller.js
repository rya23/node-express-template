import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullname, password } = req.body

    if (
        [username, email, fullname, password].some(
            (field) => field?.trim === ""
        )
    ) {
        throw new ApiError(400, "All values are Required")
    }

    const existedUser = User.findOne({ $or: [{ username }, { email }] })
    if (!existedUser) {
        throw new ApiError(409, "User with email or username already Exists")
    }

    const profilePicLocalPath = req.files?.profilepic[0]?.path
    if (!profilePicLocalPath) {
        throw new ApiError(400, "ProfilePic is Required")
    }
    const profilepic = await uploadOnCloudinary(profilePicLocalPath)

    if (!profilepic) {
        throw new ApiError(400, "ProfilePic is Required")
    }

    const user = await User.create({
        fullname,
        profilepic: profilepic.url,
        email,
        password,
        username: username.toLowerCase(),
    })
    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user "
        )
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User Registered Successfully"))
})

export { registerUser }
