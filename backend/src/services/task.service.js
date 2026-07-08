import Task from "../models/task.model.js";

export const createTask =
  async (data) => {

    return await Task.create(
      data
    );
  };

export const getTasks =
  async () => {

    return await Task.find()
      .populate(
        "createdBy",
        "firstName lastName email"
      )
      .populate(
        "assignedTo",
        "firstName lastName email"
      )
      .populate(
        "team",
        "name"
      );
  };

export const getTaskById =
  async (taskId) => {

    return await Task.findById(
      taskId
    )
      .populate(
        "createdBy",
        "firstName lastName email"
      )
      .populate(
        "assignedTo",
        "firstName lastName email"
      )
      .populate(
        "team",
        "name"
      );
  };

export const updateTask =
  async (
    taskId,
    data
  ) => {

    return await Task.findByIdAndUpdate(
      taskId,
      data,
      {
        returnDocument:
          "after",
      }
    );
  };

export const deleteTask =
  async (
    taskId
  ) => {

    return await Task.findByIdAndDelete(
      taskId
    );
  };
  export const getTaskAnalytics =
  async () => {

    const totalTasks =
      await Task.countDocuments();

    const todo =
      await Task.countDocuments({
        status: "TODO",
      });

    const inProgress =
      await Task.countDocuments({
        status: "IN_PROGRESS",
      });

    const review =
      await Task.countDocuments({
        status: "REVIEW",
      });

    const done =
      await Task.countDocuments({
        status: "DONE",
      });

    return {
      totalTasks,
      todo,
      inProgress,
      review,
      done,
    };
  };
  export const updateTaskStatus =
  async (
    taskId,
    status
  ) => {

    return await Task.findByIdAndUpdate(
      taskId,
      {
        status,
      },
      {
        returnDocument:
          "after",
      }
    );
  };
  export const getBoardView =
  async () => {

    const todo =
      await Task.find({
        status: "TODO",
      });

    const inProgress =
      await Task.find({
        status: "IN_PROGRESS",
      });

    const review =
      await Task.find({
        status: "REVIEW",
      });

    const done =
      await Task.find({
        status: "DONE",
      });

    return {
      todo,
      inProgress,
      review,
      done,
    };
  };
  export const getTeamBoardView =
  async (
    teamId
  ) => {

    const todo =
      await Task.find({
        team: teamId,
        status: "TODO",
      })
      .populate(
        "assignedTo",
        "firstName lastName"
      );

    const inProgress =
      await Task.find({
        team: teamId,
        status: "IN_PROGRESS",
      })
      .populate(
        "assignedTo",
        "firstName lastName"
      );

    const review =
      await Task.find({
        team: teamId,
        status: "REVIEW",
      })
      .populate(
        "assignedTo",
        "firstName lastName"
      );

    const done =
      await Task.find({
        team: teamId,
        status: "DONE",
      })
      .populate(
        "assignedTo",
        "firstName lastName"
      );

    return {
      todo,
      inProgress,
      review,
      done,
    };
  };