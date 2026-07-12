import mongoose from "mongoose";

const recordingSchema = new mongoose.Schema(
  {
    meeting: { type: mongoose.Schema.Types.ObjectId, ref: "Meeting", required: true, index: true },
    storageUrl: { type: String, required: true },
    provider: { type: String, enum: ["LOCAL", "CLOUDINARY"], default: "LOCAL" },
    duration: { type: Number, default: 0 },
    fileSize: { type: Number, default: 0 },
    mimeType: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

recordingSchema.index({ meeting: 1, createdAt: -1 });

export default mongoose.model("Recording", recordingSchema);
