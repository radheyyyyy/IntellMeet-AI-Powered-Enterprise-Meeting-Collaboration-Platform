import Recording from "../models/recording.model.js";
import Meeting from "../models/meeting.model.js";
import AppError from "../utils/AppError.js";

export const createRecording = async ({ meetingId, storageUrl, provider, duration, fileSize, mimeType, uploadedBy }) => {
  const meeting = await Meeting.findById(meetingId);
  if (!meeting) throw new AppError("Meeting not found", 404);

  const recording = await Recording.create({
    meeting: meetingId, storageUrl, provider, duration, fileSize, mimeType, uploadedBy
  });
  meeting.recordingUrl = storageUrl;
  await meeting.save();
  return recording;
};

export const getMeetingRecordings = (meetingId) =>
  Recording.find({ meeting: meetingId }).populate("uploadedBy", "firstName lastName email").sort({ createdAt: -1 });
