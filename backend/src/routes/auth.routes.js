import express from "express";

import {
  signup,
  login,
  getMe,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  changePassword
} from "../controllers/auth.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema
} from "../validators/auth.validator.js";

import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/signup",
  validate(signupSchema),
  signup
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/me",
  authenticate,
  getMe
);
router.post(
  "/refresh-token",
  refreshToken
);
router.post(
  "/logout",
  authenticate,
  logout
);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword
);

router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword
);

router.patch(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  changePassword
);

export default router;
