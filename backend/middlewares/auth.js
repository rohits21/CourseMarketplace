import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from 'jsonwebtoken'


export const isAuthenticated = catchAsyncError(
    async (req,res,next)=>{
        const {token} = req.cookies;

        if(!token) {
          return next(new ErrorHandler("User not logged in", 400))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded._id)
        next()
    }
)

export const authorizeAdmin = catchAsyncError(
    async (req,res,next) => {
        console.log(req.user)
        if(req.user.Role !== 'admin'){
            return next(new ErrorHandler(`${req.user.Role} is not allowed to access this resource`,403))
        }

        next();
    }
)

export const authorizeSubscribers = (req, res, next) => {
    if (req.user.subscription.status !== "active" && req.user.role !== "admin")
      return next(
        new ErrorHandler(`Only Subscribers can acces this resource`, 403)
      );
  
    next();
  };