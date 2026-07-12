import express from "express";

import authenticate
  from "../middlewares/auth.middleware.js";

import {
  createTaskController,
  getTasksController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
  getTaskAnalyticsController,
  updateTaskStatusController,
  getBoardViewController,
  getTeamBoardViewController,
} from "../controllers/task.controller.js";

const router =
  express.Router();

/*
|--------------------------------------------------------------------------
| Task Routes
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Create Task
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authenticate,
  createTaskController
);

/*
|--------------------------------------------------------------------------
| Get All Tasks
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  authenticate,
  getTasksController
);

/*
|--------------------------------------------------------------------------
| Task Analytics
|--------------------------------------------------------------------------
|
| IMPORTANT:
| This route MUST be above "/:id"
| otherwise Express will treat
| "analytics" as a task id.
|
*/

router.get(
  "/analytics",
  authenticate,
  getTaskAnalyticsController
);

/*
|--------------------------------------------------------------------------
| Board View
|--------------------------------------------------------------------------
|
| IMPORTANT:
| This route MUST be above "/:id"
| otherwise Express will treat
| "board" as a task id.
|
*/

router.get(
  "/board",
  authenticate,
  getBoardViewController
);

router.get(
  "/board/team/:teamId",
  authenticate,
  getTeamBoardViewController
);

/*
|--------------------------------------------------------------------------
| Update Task Status
|--------------------------------------------------------------------------
|
| This route must also be above
| generic "/:id" routes to avoid
| route matching conflicts.
|
*/

router.patch(
  "/:id/status",
  authenticate,
  updateTaskStatusController
);

/*
|--------------------------------------------------------------------------
| Get Task By ID
|--------------------------------------------------------------------------
*/

router.get(
  "/:id",
  authenticate,
  getTaskController
);

/*
|--------------------------------------------------------------------------
| Update Task
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  authenticate,
  updateTaskController
);

/*
|--------------------------------------------------------------------------
| Delete Task
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  authenticate,
  deleteTaskController
);

export default router;
