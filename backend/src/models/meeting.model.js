import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    meetingCode: {
      type: String,
      required: true,
      unique: true,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    startedAt: {
      type: Date,
    },

    endedAt: {
      type: Date,
    },

    duration: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "SCHEDULED",
        "ONGOING",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "SCHEDULED",
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    participantCount: {
      type: Number,
      default: 0,
    },

    recordingUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model(
  "Meeting",
  meetingSchema
);

export default Meeting;