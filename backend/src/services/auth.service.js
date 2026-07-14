import User from "../models/user.model.js";
import crypto from "crypto";

import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";

import {
  hashPassword,
  comparePassword
} from "../utils/password.js";

import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/jwt.js";

export const registerUser = async (
  data
) => {
  const existingUser =
    await User.findOne({
      email: data.email
    });

  if (existingUser) {
    throw new AppError(
      "User already exists",
      400
    );
  }

  const hashedPassword =
    await hashPassword(
      data.password
    );

  const user =
    await User.create({
      ...data,
      password:
        hashedPassword
    });

  return user;
};

export const loginUser = async (
  email,
  password
) => {
  const user =
    await User.findOne({
      email
    }).select("+password +refreshToken");

  if (!user) {
    throw new AppError(
      "Invalid credentials",
      401
    );
  }

  const isMatch =
    await comparePassword(
      password,
      user.password
    );

  if (!isMatch) {
    throw new AppError(
      "Invalid credentials",
      401
    );
  }

  const accessToken =
    generateAccessToken({
      id: user._id,
      role: user.role
    });

  const refreshToken =
    generateRefreshToken({
      id: user._id
    });

  user.refreshToken =
    refreshToken;

  user.lastLogin =
    new Date();

  await user.save();

  return {
    user,
    accessToken,
    refreshToken
  };
};

export const refreshAccessToken = async (
  refreshToken
) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user =
      await User.findById(decoded.id)
        .select("+refreshToken");

    if (!user || user.refreshToken !== refreshToken) {
      throw new AppError(
        "Invalid refresh token",
        401
      );
    }

    const accessToken =
      generateAccessToken({
        id: user._id,
        role: user.role
      });

    return accessToken;
  } catch (error) {
    throw new AppError(
      "Invalid refresh token",
      401
    );
  }
};
export const logoutUser = async (
  userId
) => {
  await User.findByIdAndUpdate(
    userId,
    {
      refreshToken: null
    }
  );

  return true;
};

const hashResetToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const createPasswordResetToken = async (email) => {
  const user = await User.findOne({ email });

  // Do not reveal whether an account exists.
  if (!user) return null;

  const token = crypto.randomBytes(32).toString("hex");
  const expiresInMinutes = Number(process.env.PASSWORD_RESET_EXPIRE_MINUTES || 30);

  user.passwordResetTokenHash = hashResetToken(token);
  user.passwordResetExpiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
  await user.save();

  return token;
};

export const resetPasswordWithToken = async ({ token, password }) => {
  const user = await User.findOne({
    passwordResetTokenHash: hashResetToken(token),
    passwordResetExpiresAt: { $gt: new Date() }
  }).select("+passwordResetTokenHash +passwordResetExpiresAt");

  if (!user) throw new AppError("Reset token is invalid or expired", 400);

  user.password = await hashPassword(password);
  user.passwordResetTokenHash = undefined;
  user.passwordResetExpiresAt = undefined;
  user.refreshToken = null;
  await user.save();
};

export const changeUserPassword = async ({ userId, currentPassword, newPassword }) => {
  const user = await User.findById(userId).select("+password +refreshToken");
  if (!user) throw new AppError("User not found", 404);

  const matches = await comparePassword(currentPassword, user.password);
  if (!matches) throw new AppError("Current password is incorrect", 400);

  user.password = await hashPassword(newPassword);
  user.refreshToken = null;
  await user.save();
};
