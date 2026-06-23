import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authenticate = async (
  req,
  res,
  next
) => {
  try {

    const authHeader =
      req.headers.authorization;

    /*
    |--------------------------------------------------------------------------
    | Check Authorization Header
    |--------------------------------------------------------------------------
    */

    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Extract Token
    |--------------------------------------------------------------------------
    */

    const token =
      authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Token missing",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Verify JWT
    |--------------------------------------------------------------------------
    */

    const decoded =
      jwt.verify(
        token,
        process.env
          .JWT_ACCESS_SECRET
      );

    /*
    |--------------------------------------------------------------------------
    | Find User
    |--------------------------------------------------------------------------
    */

    const user =
      await User.findById(
        decoded.id
      ).select(
        "-password -refreshToken"
      );

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "User not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Attach User To Request
    |--------------------------------------------------------------------------
    */

    req.user = user;

    next();

  } catch (error) {

    console.error(
      "Auth Middleware Error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid token",
    });
  }
};

export default authenticate;