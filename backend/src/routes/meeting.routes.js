import express from "express";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createMeetingSchema,
  
} from "../validators/meeting.validator.js";

import {
  createMeetingController,
  getMeetingsController,
  getMeetingController,
  joinMeetingController,
} from "../controllers/meeting.controller.js";

const router =
  express.Router();

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
  validate(
    createMeetingSchema
  ),
  createMeetingController
);

router.get(
  "/",
  authenticate,
  getMeetingsController
);

router.get(
  "/:id",
  authenticate,
  getMeetingController
);

export default router;
router.post(
  "/:id/join",
  authenticate,
  joinMeetingController
);