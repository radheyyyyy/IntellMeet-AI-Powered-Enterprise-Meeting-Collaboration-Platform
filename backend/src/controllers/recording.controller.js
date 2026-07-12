import { createRecording, getMeetingRecordings } from "../services/recording.service.js";

export const createRecordingController = async (req, res, next) => {
  try {
    const recording = await createRecording({
      meetingId: req.params.meetingId,
      storageUrl: req.body.storageUrl,
      provider: req.body.provider || "LOCAL",
      duration: req.body.duration || 0,
      fileSize: req.body.fileSize || 0,
      mimeType: req.body.mimeType,
      uploadedBy: req.user._id
    });
    res.status(201).json({ success: true, recording });
  } catch (error) { next(error); }
};

export const getMeetingRecordingsController = async (req, res, next) => {
  try { res.json({ success: true, recordings: await getMeetingRecordings(req.params.meetingId) }); }
  catch (error) { next(error); }
};
