import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { User } from '../models/user.model.js'
import { Course } from "../models/course.model.js";
import {Stats} from "../models/stats.model.js"
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary"


export const registerUser = catchAsyncError(
    async (req, res, next) => {
        const { name, email, password } = req.body;

        console.log(name, email, password);

        if (!name || !email || !password) {
            return next(new ErrorHandler("Please provide all fields", 400))
        }



        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exist"), 409);

        const file = req.file;
        const fileuri = getDataUri(file);
        const mycloud = await cloudinary.v2.uploader.upload(fileuri.content);

        user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url
            }

        })

        sendToken(res, user, "User Registered successfully", 201);


    }
)

export const loginUser = catchAsyncError(
    async (req, res, next) => {

        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Provide email and password", 400))
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Incorrect EMail or Password", 401))
        }

        const isMatch = await user.comparePassword(password);

        console.log("User Controller :: Login User :: isMAtch", isMatch);

        if (isMatch) {
            sendToken(res, user, "Login successful", 200)
        }

        else {
            next(new ErrorHandler("Incorrect Email or Password", 401))
        }


    }
)

export const logoutUser = catchAsyncError(
    (req, res, next) => {
        res.status(200)
            .cookie("token", null, {
                expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            .json({
                success: true,
                message: "User Logeed out Successfully"
            })
    }
)

export const getuserProfile = catchAsyncError(
    async (req, res, next) => {

        const user = await User.findById(req.user._id)

        res.status(200).json({
            success: true,
            user,
            message: "User data fetched successfully"
        })
    }
)

export const changePassword = catchAsyncError(
    async (req, res, next) => {

        const { oldpassword, newpassword } = req.body

        if (!oldpassword || !newpassword) {
            return next(new ErrorHandler("Old Password or new Password missing", 400))
        }

        const user = await User.findById(req.user._id).select("+password");

        const isMatch = await user.comparePassword(oldpassword);

        if (!isMatch) {
            return next(new ErrorHandler("Incorrect Old Password", 401))
        }

        user.password = newpassword;

        await user.save()

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })



    }
)

export const updateUserProfile = catchAsyncError(
    async (req, res, next) => {

        const { name, email } = req.body;
        const user = await User.findById(req.user._id);

        if (name) user.name = name;
        if (email) user.email = email;
        await user.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully"
        })

    }
)

export const updateUserProfilePicture = catchAsyncError(
    async (req, res, next) => {
        const file = req.file;

        const user = await User.findById(req.user._id);
        const oldAvatar = user.avatar;



        const fileuri = getDataUri(file);
        const mycloud = await cloudinary.v2.uploader.upload(fileuri.content);
        await cloudinary.v2.uploader.destroy(oldAvatar.public_id);

        user.avatar = {
            public_id: mycloud.public_id,
            url: mycloud.secure_url
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "User Profile picture updated successfully"
        })


    }
)

export const forgetPassword = catchAsyncError(
    async (req, res, next) => {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) return next(new ErrorHandler("User does not exist", 400))

        const resetToken = await user.getResetToken();
        await user.save()


        const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

        const message = `Click on the link to Reset your password. ${url}. If you have not requested it please report `

        await sendEmail(user.email, "CourseBundler Reset Your Password", message)

        res.status(200).json({
            success: true,
            message: `Reset token has been sent to ${user.email}`
        })
    }
)

export const resetPassword = catchAsyncError(
    async (req, res, next) => {
        const { token } = req.params



        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        });

        if (!user) return next(new ErrorHandler("Invalid Token or time expired", 400))

        const { newpassword } = req.body;

        if (!newpassword) return next(new ErrorHandler("Please provide password", 400))

        user.password = newpassword
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Changes Successfully"
        })
    }
)

export const addToPlaylist = catchAsyncError(
    async (req, res, next) => {

        const { id } = req.body;

        if (!id) return next(new ErrorHandler("Please provide course id", 400))

        const course = await Course.findById(id)

        if (!course) return next(new ErrorHandler("Invalid course id", 404))


        const user = await User.findById(req.user._id);

        const itemExist = user.playlist.find((item) => {
            if (item.course.toString() === course._id.toString()) return true;
        })



        if (itemExist) return next(new ErrorHandler("Course already exist in the playlist", 409))


        user.playlist.push({
            course: course._id,
            poster: course.poster.url
        });
        await user.save();


        res.status(200).json({
            success: true,
            message: "COurse added toplaylist successfully"
        })


    }
)


export const removeFromPlaylist = catchAsyncError(
    async (req, res, next) => {

        const id = req.query.id;

        if (!id) return next(new ErrorHandler("Please provide course id", 400))

        const course = await Course.findById(id)

        if (!course) return next(new ErrorHandler("Invalid course id", 404))


        const user = await User.findById(req.user._id);

        const newPlaylist = user.playlist.filter((item) => {
            if (item.course.toString() !== course._id.toString()) return item;
        })

        user.playlist = newPlaylist;
        await user.save();


        res.status(200).json({
            success: true,
            message: "COurse removed from playlist successfully"
        })


    }
)

export const getAllUser = catchAsyncError(
    async (req, res, next) => {

        const allUsers = await User.find({});

        res.status(200).json({
            success: true,
            users: allUsers

        })
    }
)

export const updateUserRole = catchAsyncError(
    async (req, res, next) => {


        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) return next(new ErrorHandler("User not found", 404))

        if (user.Role === "admin") {
            user.Role = "user"
        } else {
            user.Role = "admin"
        }

        await user.save()

        res.status(200).json({
            success: true,
            message: "User role changed successfully"

        })


    }
)

export const deleteUser = catchAsyncError(
    async (req, res, next) => {
        const id = req.params;

        const user = await User.findById(id);
        if (!user) return next(new ErrorHandler("User not found", 404))

        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        await User.deleteOne({ _id: id });

        res.status(200).json(
            {
                success: true,
                message: "User deletedsuccessfully"
            }
        )
    }
)

export const deleteProfile = catchAsyncError(
    async (req, res, next) => {

        const id = req.user._id;

        const user = await User.findById(id);

        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        await User.deleteOne({ _id: id });

        res.status(200).cookie("token", null, {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).json(
            {
                success: true,
                message: "User deleted successfully"
            }
        )
    }
)


// User.watch().on("change", async () => {
//     const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  
//     const subscription = await User.find({ "subscription.status": "active" });
//     stats[0].users = await User.countDocuments();
//     stats[0].subscription = subscription.length;
//     stats[0].createdAt = new Date(Date.now());
  
//     await stats[0].save();
//   });


