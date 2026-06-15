import express from "express";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.get(
  "/admin",
  authenticate,
  authorize(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  (req, res) => {
    res.json({
      success: true,
      message:
        "Admin Route Accessed"
    });
  }
);

export default router;