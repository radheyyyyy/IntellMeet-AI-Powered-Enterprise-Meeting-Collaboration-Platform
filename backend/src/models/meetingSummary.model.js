import mongoose from "mongoose";

const meetingSummarySchema = new mongoose.Schema(
  {
    meeting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
      unique: true,
      index: true
    },
    transcript: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    decisions: [{ type: String, trim: true }],
    risks: [{ type: String, trim: true }],
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("MeetingSummary", meetingSummarySchema);
