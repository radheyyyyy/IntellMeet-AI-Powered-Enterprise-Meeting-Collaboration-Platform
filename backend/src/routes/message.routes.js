import express from "express";

import authenticate from "../middlewares/auth.middleware.js";

import {
  createMessageController,
  getMeetingMessagesController,
  deleteMessageController,
} from "../controllers/message.controller.js";

const router =
  express.Router();

router.post(
  "/",
  authenticate,
  createMessageController
);

router.get(
  "/meeting/:meetingId",
  authenticate,
  getMeetingMessagesController
);

router.delete(
  "/:id",
  authenticate,
  deleteMessageController
);

export default router;