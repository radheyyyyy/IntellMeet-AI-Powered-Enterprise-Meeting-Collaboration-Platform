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


router.patch(
  "/:id/status",
  authenticate,
  updateTaskStatusController
);


router.get(
  "/board",
  authenticate,
  getBoardViewController
);
export default router;