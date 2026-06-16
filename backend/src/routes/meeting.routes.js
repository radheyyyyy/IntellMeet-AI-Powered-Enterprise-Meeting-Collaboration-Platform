import express from "express";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createMeetingSchema
} from "../validators/meeting.validator.js";

import {
  createMeetingController,
  getMeetingsController,
  getMeetingController,
  getMeetingByCodeController,
  joinMeetingController,
  leaveMeetingController,
  startMeetingController,
  endMeetingController,
  updateMeetingController,
  deleteMeetingController
} from "../controllers/meeting.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Meeting Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authenticate,
  authorize(
    "MANAGER",
    "ADMIN",
    "SUPER_ADMIN"
  ),
  validate(createMeetingSchema),
  createMeetingController
);

router.get(
  "/",
  authenticate,
  getMeetingsController
);

/*
|--------------------------------------------------------------------------
| Meeting Code Route
|--------------------------------------------------------------------------
*/

router.get(
  "/code/:code",
  authenticate,
  getMeetingByCodeController
);

/*
|--------------------------------------------------------------------------
| Meeting By ID
|--------------------------------------------------------------------------
*/

router.get(
  "/:id",
  authenticate,
  getMeetingController
);

/*
|--------------------------------------------------------------------------
| Meeting Participation
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/join",
  authenticate,
  joinMeetingController
);

router.post(
  "/:id/leave",
  authenticate,
  leaveMeetingController
);

/*
|--------------------------------------------------------------------------
| Meeting Lifecycle
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/start",
  authenticate,
  authorize(
    "MANAGER",
    "ADMIN",
    "SUPER_ADMIN"
  ),
  startMeetingController
);

router.post(
  "/:id/end",
  authenticate,
  authorize(
    "MANAGER",
    "ADMIN",
    "SUPER_ADMIN"
  ),
  endMeetingController
);

/*
|--------------------------------------------------------------------------
| Meeting Management
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  authenticate,
  authorize(
    "MANAGER",
    "ADMIN",
    "SUPER_ADMIN"
  ),
  updateMeetingController
);

router.delete(
  "/:id",
  authenticate,
  authorize(
    "MANAGER",
    "ADMIN",
    "SUPER_ADMIN"
  ),
  deleteMeetingController
);

export default router;