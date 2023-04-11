import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //find user if exit then dont create it
    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exist", 400));
    } else {
      //hash password
      const hasedPassword = await bcrypt.hash(password, 10);
      //create user
      user = await User.create({
        name: name,
        email: email,
        password: hasedPassword,
      });
      sendCookie(user, res, "Registered successfully", 201);
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //find user in database
    const user = await User.findOne({ email }).select("+password"); //.select() -->this will show password in response (as we have done select:false in user model)
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next(new ErrorHandler("Wrong password", 400));
      } else {
        sendCookie(user, res, `Welcome back ${user.name}`, 200);
      }
    }
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({ success: true, message: "Logged out successfully" });
};

export const getMyDetail = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
