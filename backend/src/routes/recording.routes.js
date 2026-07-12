import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import { createRecordingController, getMeetingRecordingsController } from "../controllers/recording.controller.js";

const router = express.Router();

router.get("/meeting/:meetingId", authenticate, getMeetingRecordingsController);
router.post("/meeting/:meetingId", authenticate, authorize("MANAGER", "ADMIN", "SUPER_ADMIN"), createRecordingController);

export default router;
