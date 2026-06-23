import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskAnalytics,
  updateTaskStatus,
  getBoardView,

} from "../services/task.service.js";

import {
  createNotification,
} from "../services/notification.service.js";

/*
|--------------------------------------------------------------------------
| Create Task
|--------------------------------------------------------------------------
*/

export const createTaskController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const task =
        await createTask({
          ...req.body,
          createdBy:
            req.user._id,
        });

      /*
      |--------------------------------------------------------------------------
      | Create Notification For Assignee
      |--------------------------------------------------------------------------
      */

      if (task.assignedTo) {

        await createNotification({
          recipient:
            task.assignedTo,

          title:
            "New Task Assigned",

          message:
            `You have been assigned task: ${task.title}`,

          type:
            "TASK",
        });
      }

      res.status(201).json({
        success: true,
        task,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Get All Tasks
|--------------------------------------------------------------------------
*/

export const getTasksController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const tasks =
        await getTasks();

      res.json({
        success: true,
        tasks,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Get Task By ID
|--------------------------------------------------------------------------
*/

export const getTaskController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const task =
        await getTaskById(
          req.params.id
        );

      res.json({
        success: true,
        task,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Update Task
|--------------------------------------------------------------------------
*/

export const updateTaskController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const task =
        await updateTask(
          req.params.id,
          req.body
        );

      res.json({
        success: true,
        task,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Delete Task
|--------------------------------------------------------------------------
*/

export const deleteTaskController =
  async (
    req,
    res,
    next
  ) => {
    try {

      await deleteTask(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Task deleted",
      });

    } catch (error) {
      next(error);
    }
  };
  export const getTaskAnalyticsController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const analytics =
        await getTaskAnalytics();

      res.json({
        success: true,
        analytics,
      });

    } catch (error) {
      next(error);
    }
  };

  export const updateTaskStatusController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const task =
        await updateTaskStatus(
          req.params.id,
          req.body.status
        );

      res.json({
        success: true,
        task,
      });

    } catch (error) {
      next(error);
    }
  };
  
  export const getBoardViewController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const board =
        await getBoardView();

      res.json({
        success: true,
        board,
      });

    } catch (error) {
      next(error);
    }
  };