import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true, index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

boardSchema.index({ team: 1, name: 1 }, { unique: true });

export default mongoose.model("Board", boardSchema);
