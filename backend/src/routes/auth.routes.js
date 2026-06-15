import express from "express";

import {
  signup,
  login,
  getMe,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  signupSchema,
  loginSchema
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

export default router;
