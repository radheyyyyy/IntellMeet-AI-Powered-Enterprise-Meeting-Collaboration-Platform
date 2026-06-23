import mongoose from "mongoose";

const taskSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        default: "",
      },

      team: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      assignedTo: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      status: {
        type: String,
        enum: [
          "TODO",
          "IN_PROGRESS",
          "REVIEW",
          "DONE",
        ],
        default: "TODO",
      },

      priority: {
        type: String,
        enum: [
          "LOW",
          "MEDIUM",
          "HIGH",
          "URGENT",
        ],
        default: "MEDIUM",
      },

      dueDate: {
        type: Date,
      },

      isArchived: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const Task =
  mongoose.model(
    "Task",
    taskSchema
  );

export default Task;