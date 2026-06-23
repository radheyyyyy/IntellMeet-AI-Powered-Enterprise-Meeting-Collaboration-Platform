import express from "express";

import authenticate
  from "../middlewares/auth.middleware.js";

import {
  createNotificationController,
  getNotificationsController,
  markAsReadController,
  deleteNotificationController,
} from "../controllers/notification.controller.js";

const router =
  express.Router();

router.post(
  "/",
  authenticate,
  createNotificationController
);

router.get(
  "/",
  authenticate,
  getNotificationsController
);

router.patch(
  "/:id/read",
  (req, res, next) => {
    console.log("PATCH ROUTE HIT");
    next();
  },
  authenticate,
  markAsReadController
);

router.delete(
  "/:id",
  authenticate,
  deleteNotificationController
);

export default router;