import mongoose from "mongoose";

const fileSchema =
  new mongoose.Schema(
    {
      fileName: {
        type: String,
        required: true,
      },

      fileUrl: {
        type: String,
        required: true,
      },

      fileType: String,

      uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      meeting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meeting",
      },

      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "File",
  fileSchema
);