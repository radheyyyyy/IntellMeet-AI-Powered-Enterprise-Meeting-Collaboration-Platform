import mongoose from "mongoose";

const boardColumnSchema = new mongoose.Schema(
  {
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true, index: true },
    name: { type: String, required: true, trim: true },
    key: { type: String, required: true, uppercase: true, trim: true },
    position: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

boardColumnSchema.index({ board: 1, key: 1 }, { unique: true });

export default mongoose.model("BoardColumn", boardColumnSchema);
