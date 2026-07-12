import { generateMeetingInsights, getMeetingInsights } from "../ai/meetingAi.service.js";

export const generateMeetingInsightsController = async (req, res, next) => {
  try {
    const result = await generateMeetingInsights({
      meetingId: req.params.meetingId,
      transcript: req.body.transcript,
      userId: req.user._id
    });
    res.status(201).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const getMeetingInsightsController = async (req, res, next) => {
  try {
    const result = await getMeetingInsights(req.params.meetingId);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};
