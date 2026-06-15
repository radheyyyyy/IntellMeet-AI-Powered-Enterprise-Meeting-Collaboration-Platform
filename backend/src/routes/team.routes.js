import express from "express";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createTeamSchema
} from "../validators/team.validator.js";

import {
  createTeamController,
  getTeamsController,
  getTeamController,
  updateTeamController,
  deleteTeamController,
  addMemberController,
  removeMemberController,

} from "../controllers/team.controller.js";

const router =
  express.Router();

/*
|--------------------------------------------------------------------------
| Team Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authenticate,
  authorize(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  validate(
    createTeamSchema
  ),
  createTeamController
);

router.get(
  "/",
  authenticate,
  getTeamsController
);

router.get(
  "/:id",
  authenticate,
  getTeamController
);


router.put(
  "/:id",
  authenticate,
  authorize(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  updateTeamController
);
export default router;

router.delete(
  "/:id",
  authenticate,
  authorize(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  deleteTeamController
);

router.post(
  "/:id/members",
  authenticate,
  authorize(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  addMemberController
);

router.delete(
  "/:id/members/:userId",
  authenticate,
  authorize(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  removeMemberController
);