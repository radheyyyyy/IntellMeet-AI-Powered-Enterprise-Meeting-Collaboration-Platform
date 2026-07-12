import mongoose from "mongoose";

const actionItemSchema = new mongoose.Schema(
  {
    meeting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
      index: true
    },
    summary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MeetingSummary"
    },
    description: { type: String, required: true, trim: true },
    assigneeName: { type: String, trim: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "DONE", "CANCELLED"],
      default: "OPEN"
    },
    source: { type: String, enum: ["AI", "MANUAL"], default: "AI" }
  },
  { timestamps: true }
);

actionItemSchema.index({ meeting: 1, status: 1 });

export default mongoose.model("ActionItem", actionItemSchema);
