import jwt from "jsonwebtoken";

// Funtion to generate token and save it in cookie in browser later used for authentication
export const sendCookie = (user,res,message,statusCode = 200) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return res
    .status(statusCode)
    .cookie("token", token, { //saving cookie in browser
      httpOnly: true,
      maxAge: 1000 * 60 * 15, //15 minutes
      sameSite: process.env.NODE_ENV === "Development" ? "lax" :"none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: message,
    });
};
