import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    meetingCode: {
      type: String,
      required: true,
      unique: true
    },

    scheduledAt: {
      type: Date,
      required: true
    },

    startedAt: {
      type: Date
    },

    endedAt: {
      type: Date
    },

    status: {
      type: String,
      enum: [
        "SCHEDULED",
        "ONGOING",
        "COMPLETED",
        "CANCELLED"
      ],
      default: "SCHEDULED"
    },

    participants: [
      {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    recordingUrl: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Meeting = mongoose.model(
  "Meeting",
  meetingSchema
);

export default Meeting;