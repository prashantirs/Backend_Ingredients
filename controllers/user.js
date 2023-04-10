import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  //find user if exit then dont create it
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "User already exist",
    });
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
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  //find user in database
  const user = await User.findOne({ email }).select("+password"); //.select() -->this will show password in response (as we have done select:false in user model)
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong password",
      });
    } else {
      sendCookie(user, res, `Welcome back ${user.name}`, 200);
    }
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({ success: true, message: "Logged out successfully" });
};
export const getMyDetail = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
