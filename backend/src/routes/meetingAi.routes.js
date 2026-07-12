import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import {
  generateMeetingInsightsController,
  getMeetingInsightsController
} from "../controllers/meetingAi.controller.js";

const router = express.Router();

router.get("/:meetingId", authenticate, getMeetingInsightsController);
router.post(
  "/:meetingId/generate",
  authenticate,
  authorize("MANAGER", "ADMIN", "SUPER_ADMIN"),
  generateMeetingInsightsController
);

export default router;
